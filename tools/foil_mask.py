"""Make the foil mask of an art book's front cover from the foil layer in its cover PSD (FF43: the "燙藍" layer).

usage: python tools/foil_mask.py <slug> <cover.psd> <layer name> [--bleed 41] [--rtl] [--out DIR]

  img/ab/<slug>_foil.webp   1280 x 1280 for the front cover: opaque where the foil is (the site uses it as a mask)

The PSD is the cover spread plus a bleed on every side (41 px on the user's books); the layer may be hidden.
The front cover is the right half of the spread; --rtl takes the left half (right-bound books, like FF45).
Afterwards give the book "foil":"blue" in js/data.js (the colour the site draws; blue is the only one so far).
"""
import os
import sys

from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import common as C   # noqa: E402

SIZE = 1280


def main(argv):
    out = C.out_root(argv)
    bleed = int(C.option(argv, '--bleed', 41))
    rtl = C.flag(argv, '--rtl')
    if len(argv) != 3:
        C.usage(__doc__)
    slug, path, name = argv
    from psd_tools import PSDImage
    psd = PSDImage.open(path)
    layer = next((l for l in psd.descendants() if l.name == name), None)
    if layer is None:
        sys.exit(f'no layer named {name!r}; layers: {[l.name for l in psd.descendants()]}')
    px = layer.topil()
    alpha = px.getchannel('A') if 'A' in px.getbands() else px.convert('L')
    full = Image.new('L', psd.size, 0)
    full.paste(alpha, (layer.left, layer.top))
    W, H = psd.size
    spread = full.crop((bleed, bleed, W - bleed, H - bleed))
    half = spread.width // 2
    front = spread.crop((0, 0, half, spread.height) if rtl else (spread.width - half, 0, spread.width, spread.height))
    mask = front.resize((SIZE, SIZE), Image.LANCZOS)
    rgba = Image.new('RGBA', mask.size, (0, 0, 0, 0))
    rgba.putalpha(mask)
    p = os.path.join(out, 'img', 'ab', f'{slug}_foil.webp')
    kb = C.save_webp(rgba, p, 90) // 1024
    cover = sum(i * c for i, c in enumerate(mask.histogram())) / (255 * SIZE * SIZE)
    print(f'{os.path.basename(p)}: {SIZE}x{SIZE}, {kb} KB, foil covers {cover:.1%} of the front cover')


if __name__ == '__main__':
    main(sys.argv[1:])
