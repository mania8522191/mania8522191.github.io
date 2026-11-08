"""Which pictures in img/ and sounds in audio/ does the site use? Lists files nothing refers to, and references to
files that are missing.

usage: python tools/check_images.py

It works out every picture the pages can ask for: the paths written in index.html and js/, plus the ones the
scripts build from the data (works, process animations, art books, goods, the game page). Sounds are named in full
in js/ (js/sound.js). tools/build.py runs it every time it builds. It only reports; delete files yourself (they stay
in the git history).
"""
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import common as C   # noqa: E402


def js(name):
    return open(os.path.join(C.ROOT, 'js', name), encoding='utf-8').read()


def const(text, name):
    m = re.search(rf'^const {name} = (.*?);(?:\s*//.*)?$', text, re.M)
    if not m:
        sys.exit(f'{name} not found: the scripts changed, update this tool')
    v = m.group(1)
    if v.startswith('new Set('):
        v = v[len('new Set('):-1]
    return json.loads(v.replace("'", '"'))


def referenced():
    refs = set()
    texts = [open(os.path.join(C.ROOT, 'index.html'), encoding='utf-8').read()] + \
            [js(f) for f in os.listdir(os.path.join(C.ROOT, 'js')) if f.endswith('.js')]
    for t in texts:   # paths written out in full
        refs |= set(re.findall(r'img/[\w./-]+\.(?:webp|png|jpg|gif|svg)', t))
    for w in C.load('WORKS'):
        for n, d in enumerate(w['dims']):
            name = f'{w["id"]}{"_p" + str(n) if n else ""}.webp'
            refs.add(f'img/{name}')
            if len(d) > 2 and d[2]:
                refs.add(f'img/z/{name}')
        for p in w.get('proc') or []:
            refs.add(f'img/proc/{p[0]}')
            if len(p) > 3 and p[3]:
                refs.add(f'img/proc/z/{p[0]}')
        if w.get('yt'):
            refs.add(f'img/yt/{w["yt"]["id"]}.webp')
    for b in C.load('BOOKS'):
        s = b['slug']
        for n, d in enumerate(b['pages']):
            refs.add(f'img/ab/{s}_p{n}.webp')
            if len(d) > 2 and d[2]:
                refs.add(f'img/ab/x/{s}_p{n}.webp')
        refs |= {f'img/ab/z/{s}_p0.webp', f'img/ab/x/{s}_p0.webp'}   # the 3D book on the book page, the 3D viewer
        if b.get('foil'):
            refs.add(f'img/ab/{s}_foil.webp')
    for g in C.load('GOODS'):
        refs.add(f'img/goods-{g["slug"]}.webp')
    game = js('game.js')
    art, cards, pairs = const(game, 'CHAR_ART'), const(game, 'CHAR_CARD'), const(game, 'PAIR_W')
    refs |= {f'img/char{n}.webp' for n in art} | {'img/char0.webp'}
    refs |= {f'img/cards/char{n}.webp' for n in cards} | {f'img/cards/pair{n}.webp' for n in pairs}
    refs |= {f'img/cards/{c}.webp' for g in const(game, 'DECK_GROUPS') for c in g['cards']}
    for i in range(1, len(const(game, 'SHOTS')) + 1):
        refs |= {f'img/shot{i}.webp', f'img/shot{i}-t.webp'}
    return refs


def in_img(folder='img'):
    """Every file under img/ (or another folder), as img/... paths."""
    out = set()
    for d, _, fs in os.walk(os.path.join(C.ROOT, folder)):
        for f in fs:
            out.add(os.path.relpath(os.path.join(d, f), C.ROOT).replace(os.sep, '/'))
    return out


def sounds():
    """The audio/... paths written in index.html and js/."""
    texts = [open(os.path.join(C.ROOT, 'index.html'), encoding='utf-8').read()] + \
            [js(f) for f in os.listdir(os.path.join(C.ROOT, 'js')) if f.endswith('.js')]
    return {p for t in texts for p in re.findall(r'audio/[\w./-]+\.(?:mp3|ogg|m4a|wav|opus)', t)}


def findings():
    """One line per problem, for tools/build.py: pictures and sounds nothing uses, and ones the pages ask for that are missing."""
    out = []
    for refs, files in ((referenced(), in_img()), (sounds(), in_img('audio'))):
        out += [f'{f}: not used by any page' for f in sorted(files - refs)] + [f'{f}: missing' for f in sorted(refs - files)]
    return out


def main():
    named, have = sounds(), in_img('audio')
    print(f'{len(have)} files in audio/, {len(named)} named in the scripts' + ''.join(f'\n  {f}: not used' for f in sorted(have - named)) +
          ''.join(f'\n  {f}: missing' for f in sorted(named - have)))
    refs, files = referenced(), in_img()
    unused, missing = sorted(files - refs), sorted(refs - files)
    size = sum(os.path.getsize(os.path.join(C.ROOT, f)) for f in unused)
    print(f'{len(files)} files in img/, {len(refs)} referenced')
    print(f'unused ({len(unused)}, {size / 1e6:.1f} MB):' if unused else 'unused: none')
    for f in unused:
        print('  ' + f)
    print(f'missing ({len(missing)}):' if missing else 'missing: none')
    for f in missing:
        print('  ' + f)
    return 1 if missing or named - have else 0


if __name__ == '__main__':
    sys.exit(main())
