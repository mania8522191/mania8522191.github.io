"""Look for leftovers in the site's code: things nothing uses any more, and styles that never take effect.

usage: python tools/check_code.py

tools/build.py runs this (together with check_images.py) every time it builds, so leftovers show up right after a
change instead of piling up. It reports:
  - css/ and js/ files that tools/build.py leaves out (the page never loads them)
  - functions and variables in js/ that nothing uses
  - CSS classes and ids that no page or script puts on an element
  - CSS declarations that a later rule with the same selector, in the same @media, always overrides
  - custom properties (--name) set but never read, or read but never set; @keyframes nothing plays
  - texts in js/i18n.js missing in a language, written twice, never used, or asked for but not there
  - fields in js/data.js (WORKS, GOODS, BOOKS) that no script reads, and HOME_SLIDES entries that are not works
A name put together while the page runs, such as 'bk.size.' + b.size or `b3-${face}`, counts as used when its
prefix is put together that way somewhere. The tool only reports. If it lists something that is in fact used
(a way of using it that the tool does not know), teach the tool instead of leaving the warning.
"""
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import build   # noqa: E402  (where the site is, and the order of css/ and js/)

ROOT = build.ROOT
DECL = re.compile(r'(?<![\w$.])(?:function\s*\*?\s*([A-Za-z_$][\w$]*)\s*\(|(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=|class\s+([A-Za-z_$][\w$]*))')


def read(path):
    return open(os.path.join(ROOT, path), encoding='utf-8').read().replace('\r\n', '\n')


def line(text, i):
    return text.count('\n', 0, i) + 1


def _blank(m):
    return m.group(1) + '\n' * m.group(2).count('\n')


def no_comments(text, kind):
    """The text with its comments blanked out; their line breaks stay, so line numbers stay right."""
    if kind == 'html':
        return re.sub(r'()(<!--.*?-->)', _blank, text, flags=re.S)
    if kind == 'css':
        return re.sub(r'()(/\*.*?\*/)', _blank, text, flags=re.S)
    text = re.sub(r'(^|[\s;{}(,])(/\*.*?\*/)', _blank, text, flags=re.S | re.M)   # not the /* in 'image/*'
    return re.sub(r'(^|\s)//[^\n]*', r'\1', text, flags=re.M)                     # not the // in 'https://'


def has(name, text):
    return re.search(r'(?<![\w-])' + re.escape(name) + r'(?![\w-])', text) is not None


def built(name, text, sep):
    """True if name looks put together while the page runs: its prefix up to the last sep, then ' + or ${."""
    core = name.rstrip(sep)
    cut = core.rfind(sep)
    if cut < 1:
        return False
    return re.search(re.escape(name[:cut + 1]) + r"""(?:['"`]\s*\+|\$\{)""", text) is not None


def rules(css):
    """(context, selector, body, position) of every style rule; the context is the @media / @supports around it."""
    out, stack = [], []
    for m in re.finditer(r'([^{}]*)([{}])', css):
        pre, brace = m.group(1), m.group(2)
        if brace == '{':
            stack.append((pre.strip(), m.start(1) + len(pre) - len(pre.lstrip())))
        elif stack:
            sel, at = stack.pop()
            ctx = tuple(x for x, _ in stack)
            if not sel.startswith('@') and not any(x.startswith('@keyframes') for x in ctx):
                out.append((ctx, sel, pre, at))
    return out


def declarations(body):
    """(property, !important?) of each declaration; semicolons inside url(...) or quotes do not split."""
    parts, depth, quote, cur = [], 0, None, ''
    for ch in body:
        if quote:
            quote = None if ch == quote else quote
        elif ch in '"\'':
            quote = ch
        elif ch == '(':
            depth += 1
        elif ch == ')':
            depth -= 1
        elif ch == ';' and depth == 0:
            parts.append(cur)
            cur = ''
            continue
        cur += ch
    parts.append(cur)
    return [(p.split(':', 1)[0].strip().lower(), '!important' in p) for p in parts if ':' in p]


def findings():
    """One line per leftover found."""
    out = []
    css = {n: no_comments(read(f'css/{n}.css'), 'css') for n in build.CSS}
    js = {n: no_comments(read(f'js/{n}.js'), 'js') for n in build.JS}
    html = no_comments(read('index.html'), 'html')
    page = html + '\n' + '\n'.join(js.values())   # where class names, ids and texts can come from

    for kind, names in (('css', build.CSS), ('js', build.JS)):
        for f in sorted(os.listdir(os.path.join(ROOT, kind))):
            if f.endswith('.' + kind) and f[:-len(kind) - 1] not in names:
                out.append(f'{kind}/{f}: not in the list in tools/build.py, so the page never loads it')

    # functions and variables
    uses = page.replace('...', '   ')   # ...name (spread) is a use of name
    seen = set()
    for n, s in js.items():
        for m in DECL.finditer(s):
            name = next(g for g in m.groups() if g)
            if name not in seen:
                seen.add(name)
                if len(re.findall(r'(?<![\w$.])' + re.escape(name) + r'(?![\w$])', uses)) < 2:
                    out.append(f'js/{n}.js:{line(s, m.start())}: {name} is never used')

    # classes, ids, and declarations a later rule always overrides
    names, last = {}, {}
    for n in build.CSS:
        for ctx, sel, body, at in rules(css[n]):
            where = f'css/{n}.css:{line(css[n], at)}'
            bare = re.sub(r'\[[^\]]*\]', '', sel)
            for x in re.findall(r'([.#])(-?[A-Za-z_][\w-]*)', bare):
                names.setdefault(''.join(x), where)
            sel = re.sub(r'\s*([,>+~])\s*', r'\1', ' '.join(sel.split()))
            for prop, important in dict(declarations(body)).items():   # twice in one rule = a fallback, e.g. vh then svh
                key = (ctx, sel, prop)
                if key in last:
                    was, was_important = last[key]
                    if was_important and not important:
                        out.append(f'{where}: {sel} {{{prop}}} never applies: {was} has it with !important')
                        continue
                    out.append(f'{was}: {sel} {{{prop}}} never applies: {where} overrides it')
                last[key] = (where, important)
    for x, where in names.items():
        if not has(x[1:], page) and not built(x[1:], page, '-'):
            out.append(f'{where}: {x} is never put on the page')

    # custom properties; a name ending in ${ (`--s-${face}`) is a prefix
    sets, set_pre, reads, read_pre = {}, {}, {}, {}
    sources = [(f'css/{n}.css', css[n], 'css') for n in build.CSS] + \
              [(f'js/{n}.js', js[n], 'js') for n in build.JS] + [('index.html', html, 'html')]
    for f, s, kind in sources:
        for m in re.finditer(r'var\(\s*(--[\w-]+)(\$\{)?', s):
            (read_pre if m.group(2) else reads).setdefault(m.group(1), f'{f}:{line(s, m.start())}')
        for m in re.finditer(r'getPropertyValue\(\s*[\'"`](--[\w-]+)', s):
            reads.setdefault(m.group(1), f'{f}:{line(s, m.start())}')
        setter = (r'(?<![\w-])(--[\w-]+)()\s*:' if kind == 'css' else
                  r'(?<!var\()(?<!Value\(\')(?<!Value\(")(?<![\w-])(--[\w-]+)(\$\{|(?=\s*:|[\'"`]))')
        for m in re.finditer(setter, s):
            (set_pre if m.group(2) else sets).setdefault(m.group(1), f'{f}:{line(s, m.start())}')
    for k, at in sets.items():
        if k not in reads and not any(k.startswith(p) for p in read_pre):
            out.append(f'{at}: {k} is set but never read')
    for p, at in set_pre.items():
        if not any(r.startswith(p) for r in reads) and not any(q.startswith(p) or p.startswith(q) for q in read_pre):
            out.append(f'{at}: {p}... is set but never read')
    for k, at in reads.items():
        if k not in sets and not any(k.startswith(p) for p in set_pre):
            out.append(f'{at}: {k} is read but never set')
    for p, at in read_pre.items():
        if not any(s.startswith(p) for s in sets) and not any(q.startswith(p) or p.startswith(q) for q in set_pre):
            out.append(f'{at}: {p}... is read but never set')

    every = '\n'.join(css.values()) + '\n' + page
    for n in build.CSS:
        for m in re.finditer(r'@keyframes\s+([\w-]+)', css[n]):
            if len(re.findall(r'(?<![\w-])' + re.escape(m.group(1)) + r'(?![\w-])', every)) < 2:
                out.append(f'css/{n}.css:{line(css[n], m.start())}: @keyframes {m.group(1)} is never played')

    # texts: I18N = { "zh": { "key": "text", ... }, "en": {...}, ... }, one key per line
    src = js['i18n']
    a = src.find('const I18N = {')
    b = src.find('\n};', a)
    keys, lang = {}, None
    for ln in src[a:b].split('\n') if a >= 0 else []:
        m = re.match(r'\s*"(\w+)"\s*:\s*\{\s*$', ln)
        if m:
            lang = m.group(1)
            keys[lang] = []
            continue
        m = re.match(r'\s*"([^"]+)"\s*:', ln)
        if m and lang:
            keys[lang].append(m.group(1))
    if len(keys) < 2 or not all(keys.values()):
        out.append('js/i18n.js: could not read the I18N texts (their layout changed): update tools/check_code.py')
    else:
        order = list(dict.fromkeys(k for ks in keys.values() for k in ks))
        for lg, ks in keys.items():
            out += [f'js/i18n.js: "{k}" is written twice in {lg}' for k in dict.fromkeys(ks) if ks.count(k) > 1]
            out += [f'js/i18n.js: "{k}" is missing in {lg}' for k in order if k not in ks]
        rest = src[:a] + src[b:] + '\n' + html + '\n' + '\n'.join(v for n, v in js.items() if n != 'i18n')
        for k in order:
            if not re.search(r'[\'"`]' + re.escape(k) + r'[\'"`]', rest) and not built(k, rest, '.'):
                out.append(f'js/i18n.js: "{k}" is never used')
        asked = {k for _, k in re.findall(r'\btr\(\s*([\'"`])([^\'"`$]+)\1(?!\s*\+)', rest)}
        asked |= {k for _, k in re.findall(r'\.dataset\.i18n\w*\s*=\s*([\'"`])([^\'"`$]+)\1', rest)}
        asked |= set(re.findall(r'data-i18n(?:-\w+)?="([^"]+)"', html))
        out += [f'"{k}" is asked for, but js/i18n.js does not have it' for k in sorted(asked - set(order))]

    # data fields, and the home carousel's works
    data = read('js/data.js')
    code = '\n'.join(v for n, v in js.items() if n != 'data') + '\n' + html

    def listed(name):
        head = f'const {name} = '
        return json.JSONDecoder().raw_decode(data[data.index(head) + len(head):])[0] if head in data else None

    for name in ('WORKS', 'GOODS', 'BOOKS'):
        items = listed(name)
        if items is None:
            out.append(f'js/data.js: {name} not found: update tools/check_code.py')
            continue
        for k in dict.fromkeys(k for it in items for k in it):
            e = re.escape(k)
            if not re.search(rf'\.{e}(?![\w$])|[\'"`]{e}[\'"`]|[{{,]\s*{e}\s*[,}}=]', code):
                out.append(f'js/data.js: the {name} field "{k}" is never read')
    works = {w['id'] for w in listed('WORKS') or []}
    for s in listed('HOME_SLIDES') or []:
        if s.get('id') not in works:
            out.append(f'js/data.js: HOME_SLIDES has "{s.get("id")}", which is not a work in WORKS')
    return out


def main():
    found = findings()
    print('\n'.join(found) if found else 'no leftovers in the code')
    return 1 if found else 0


if __name__ == '__main__':
    sys.exit(main())
