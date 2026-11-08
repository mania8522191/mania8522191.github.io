"""Build the two files the page loads, site.css and site.js, from the source files in css/ and js/.

The styles and scripts are kept as small files, one per part of the site (css/*.css, js/*.js). The page loads them
joined into one stylesheet and one script, in the order below. As one script, the start-up runs exactly as it did
when everything was inside index.html: all of the code runs before any timer, event or promise callback.
Loaded as separate files, those could run between two files, before the page has been set up.

    python tools/build.py           build site.css and site.js, then update their version stamps in index.html
    python tools/build.py --check   only check that both are up to date (exit code 1 if not)

Both then list leftovers: code, styles, texts, data fields and pictures that nothing uses, and styles that never
apply (tools/check_code.py and tools/check_images.py). With --check, leftovers also give exit code 1.
Run it after changing anything in css/ or js/; the tools that write js/data.js (with --save) run it themselves.
Never edit site.css or site.js by hand: they are rebuilt from the sources. The version stamp (?v=) makes a returning
visitor's browser fetch the new copy instead of a cached old one.
"""
import hashlib
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # for check_code and check_images, also under python -I

# the order matters: later CSS rules win over earlier ones; scripts use what the earlier ones define
CSS = ['base', 'home', 'artbook', 'works', 'goods', 'nav', 'game', 'lightbox', 'about', 'motion', 'responsive']
JS = ['data', 'core', 'i18n', 'game', 'lightbox', 'menu', 'goods', 'wall', 'work', 'artbook', 'book3d', 'motion',
      'home', 'router', 'about', 'lang-switch', 'sound', 'main']
REF = re.compile(r'((?:href|src)=")(site\.(?:css|js))(?:\?v=\w*)?(")')


def joined(kind, names):
    out = [f'/* Built by tools/build.py from {kind}/*.{kind} in this order: {", ".join(names)}. Edit those files, not this one. */\n']
    for n in names:
        text = open(os.path.join(ROOT, kind, f'{n}.{kind}'), encoding='utf-8').read().replace('\r\n', '\n')
        if not text.endswith('\n'):
            text += '\n'
        out.append(f'\n/* ==================== {kind}/{n}.{kind} ==================== */\n{text}')
    return ''.join(out)


def build(check=False):
    """Returns the names of the files that were (or, with check, would be) changed."""
    stale = []
    for name, text in (('site.css', joined('css', CSS)), ('site.js', joined('js', JS))):
        path = os.path.join(ROOT, name)
        old = open(path, encoding='utf-8').read().replace('\r\n', '\n') if os.path.exists(path) else None
        if old != text:
            stale.append(name)
            if not check:
                open(path, 'w', encoding='utf-8', newline='').write(text)
    page = os.path.join(ROOT, 'index.html')
    s = open(page, encoding='utf-8').read()

    def stamp(m):
        f = os.path.join(ROOT, m.group(2))
        data = open(f, 'rb').read().replace(b'\r\n', b'\n') if os.path.exists(f) else b''
        return f'{m.group(1)}{m.group(2)}?v={hashlib.sha1(data).hexdigest()[:8]}{m.group(3)}'

    t = REF.sub(stamp, s)
    if t != s:
        stale.append('index.html (stamps)')
        if not check:
            open(page, 'w', encoding='utf-8', newline='').write(t)
    return stale


def report():
    """List the leftovers: code nothing uses (check_code.py), pictures and sounds (check_images.py). Returns how many."""
    import check_code
    import check_images
    found = check_code.findings() + check_images.findings()
    if not found:
        print('no leftovers: every function, style, text, data field, picture and sound is in use')
        return 0
    print(f'leftovers ({len(found)}): clean them up before going live (if one is in fact used, improve tools/check_code.py)')
    for f in found:
        print('  ' + f)
    return len(found)


if __name__ == '__main__':
    check = '--check' in sys.argv
    stale = build(check)
    if check:
        print('out of date: ' + ', '.join(stale) + ' (run python tools/build.py)' if stale else 'site.css, site.js and stamps are up to date')
    else:
        print('built: ' + ', '.join(stale) if stale else 'nothing to build: already up to date')
    left = report()
    sys.exit(1 if check and (stale or left) else 0)
