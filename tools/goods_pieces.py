"""Make a goods item's pictures for the site from its ad PSD (the FF47 ones: 202608/CMYK/ADs/<n>.psd): the goods
alone, without the ad's background, words and header, transparent round them.

usage: python tools/goods_pieces.py <slug> <ad.psd> [--save] [--out DIR]

  img/goods-<slug>.webp       the goods laid together as in the ad, 1400 px on the long side: the goods card, and the
                              item page's picture when it is one piece
  img/goods-<slug>-<n>.webp   each piece (n from the bottom) at the same scale: the item page lays them together, and
                              each can be taken with the mouse and moved

A piece is one picture layer of the ad's goods. A feathered black shadow kept as a layer of its own (the black layer
just under its goods) is merged into its goods' piece; where the ad cut such a shadow off at the canvas edge but the
goods go on past it, the shadow is made whole again (the goods' outline blurred, fitted to the part that is there).
Left out: the full-canvas background, text layers, the header group (群組 2) and its dates, hidden layers.

  --save     write "dims" (and "parts": [[x, y, w, h], ...] in the card picture's pixels, where there are two pieces
             or more) into the item in GOODS in js/data.js (the item must already be there)
  --out DIR  write under DIR instead of the site, to try it out

Needs psd-tools and numpy (pip install psd-tools numpy).
"""
import json
import os
import sys

import numpy as np
from PIL import Image, ImageFilter
from psd_tools import PSDImage

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import common as C   # noqa: E402

LONG = 1400   # the set's long side, as the goods pictures were
Q = 88
EDGE = 64     # a shadow this near the canvas edge was cut there


def goods_layers(psd):
    """the goods' picture layers, bottom first"""
    found = []

    def walk(layers, header):
        for l in layers:
            if l.is_group():
                if l.visible:
                    walk(l, header or l.name == '群組 2')
                continue
            if header or not l.visible or l.kind not in ('pixel', 'smartobject', 'shape'):
                continue
            if l.bbox == (0, 0, psd.width, psd.height) or l.name.startswith('(五)'):
                continue   # the background; the header's dates
            found.append(l)
    walk(psd, False)
    return found


def is_shadow(l):
    """a feathered black shadow: all its pixels black"""
    im = l.topil().convert('RGBA')
    im.thumbnail((300, 300))
    a = np.asarray(im).astype(np.float32)
    seen = a[..., 3] > 5
    return bool(seen.any()) and float(a[..., :3].max(axis=2)[seen].mean()) < 4


def overlap(a, b):
    x0, y0, x1, y1 = max(a[0], b[0]), max(a[1], b[1]), min(a[2], b[2]), min(a[3], b[3])
    return 0 if x1 <= x0 or y1 <= y0 else (x1 - x0) * (y1 - y0) / ((a[2] - a[0]) * (a[3] - a[1]))


def cut_off(sh, it, W, H):
    """the shadow ends at a canvas edge that its goods go on past"""
    s, g = sh.bbox, it.bbox
    return (s[0] <= EDGE and g[0] < s[0]) or (s[1] <= EDGE and g[1] < s[1]) or \
           (s[2] >= W - EDGE and g[2] > s[2]) or (s[3] >= H - EDGE and g[3] > s[3])


def place(im, box, frame):
    out = Image.new(im.mode, (frame[2] - frame[0], frame[3] - frame[1]), 0 if im.mode == 'L' else (0, 0, 0, 0))
    out.paste(im, (box[0] - frame[0], box[1] - frame[1]))
    return out


def whole_shadow(sh, it, W, H):
    """the shadow made whole under its goods: fitted at 1/8 size on the part inside the canvas (blur, shift,
    strength), then drawn at full size from the goods' outline. Returns (image, frame)."""
    m = 400
    frame = (min(sh.bbox[0], it.bbox[0]) - m, min(sh.bbox[1], it.bbox[1]) - m,
             max(sh.bbox[2], it.bbox[2]) + m, max(sh.bbox[3], it.bbox[3]) + m)
    q = 8
    small = lambda im: np.asarray(im.resize(((im.width + q - 1) // q, (im.height + q - 1) // q), Image.BOX), dtype=np.float32) / 255
    a_it = place(it.composite().convert('RGBA').getchannel('A'), it.bbox, frame)
    a_sh = place(sh.composite().convert('RGBA').getchannel('A'), sh.bbox, frame)
    P, S = small(a_it), small(a_sh)
    ys, xs = np.mgrid[0:S.shape[0], 0:S.shape[1]]
    inside = (xs * q + frame[0] >= EDGE) & (xs * q + frame[0] < W - EDGE) & (ys * q + frame[1] >= EDGE) & (ys * q + frame[1] < H - EDGE)
    pil_p = Image.fromarray((P * 255).astype(np.uint8))
    best = None
    for sig in range(2, 21):
        B = np.asarray(pil_p.filter(ImageFilter.GaussianBlur(sig)), dtype=np.float32) / 255
        for dx in range(-10, 11):
            for dy in range(-10, 11):
                M = np.roll(np.roll(B, dy, axis=0), dx, axis=1)
                sel = inside & ((M > .01) | (S > .01))
                mm, ss = M[sel], S[sel]
                k = float((mm * ss).sum() / max((mm * mm).sum(), 1e-6))
                err = float(((np.clip(k * mm, 0, 1) - ss) ** 2).mean())
                if best is None or err < best[0]:
                    best = (err, sig, dx, dy, k)
    err, sig, dx, dy, k = best
    arr = np.clip(np.asarray(a_it.filter(ImageFilter.GaussianBlur(sig * q)), dtype=np.float32) * k, 0, 255).astype(np.uint8)
    shadow = Image.new('RGBA', a_it.size, (0, 0, 0, 0))
    shadow.putalpha(Image.fromarray(np.roll(np.roll(arr, dy * q, axis=0), dx * q, axis=1)))
    print(f'  {it.name}: its shadow {sh.name} made whole (blur {sig * q} px, shift {dx * q},{dy * q}, strength {k:.2f}, fit {err:.4f})')
    return shadow, frame


def pieces(psd):
    """[(RGBA image, box in the PSD)] bottom first, each trimmed to what shows"""
    ls, out, i = goods_layers(psd), [], 0
    while i < len(ls):
        l, up = ls[i], ls[i + 1] if i + 1 < len(ls) else None
        if up is not None and is_shadow(l) and overlap(l.bbox, up.bbox) > .8:
            if cut_off(l, up, psd.width, psd.height):
                sh, frame = whole_shadow(l, up, psd.width, psd.height)
            else:
                frame = (min(l.bbox[0], up.bbox[0]), min(l.bbox[1], up.bbox[1]), max(l.bbox[2], up.bbox[2]), max(l.bbox[3], up.bbox[3]))
                sh = place(l.composite().convert('RGBA'), l.bbox, frame)
                print(f'  {up.name}: with its shadow {l.name}')
            out.append((Image.alpha_composite(sh, place(up.composite().convert('RGBA'), up.bbox, frame)), frame))
            i += 2
        else:
            out.append((l.composite().convert('RGBA'), l.bbox))
            i += 1
    trimmed = []
    for im, box in out:
        b = im.getchannel('A').point(lambda a: 255 if a > 6 else 0).getbbox()
        trimmed.append((im.crop(b), (box[0] + b[0], box[1] + b[1], box[0] + b[2], box[1] + b[3])))
    return trimmed


def main(argv):
    root = C.out_root(argv)
    save = C.flag(argv, '--save')
    if len(argv) != 2:
        C.usage(__doc__)
    slug, path = argv
    if save and not C.find(C.load('GOODS'), 'slug', slug):
        sys.exit(f'{slug} is not in GOODS yet: add its line to js/data.js first, then run again with --save')
    ps = pieces(PSDImage.open(path))
    x0, y0 = min(b[0] for _, b in ps), min(b[1] for _, b in ps)
    x1, y1 = max(b[2] for _, b in ps), max(b[3] for _, b in ps)
    k = LONG / max(x1 - x0, y1 - y0)
    W, H = round((x1 - x0) * k), round((y1 - y0) * k)
    whole, parts = Image.new('RGBA', (W, H), (0, 0, 0, 0)), []
    for n, (im, b) in enumerate(ps, 1):
        x, y = round((b[0] - x0) * k), round((b[1] - y0) * k)
        small = im.resize((max(1, round(im.width * k)), max(1, round(im.height * k))), Image.LANCZOS)
        layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        layer.paste(small, (x, y))
        whole = Image.alpha_composite(whole, layer)
        parts.append([x, y, small.width, small.height])
        if len(ps) > 1:
            C.save_webp(small, os.path.join(root, 'img', f'goods-{slug}-{n}.webp'), Q, alpha_quality=100)
    size = C.save_webp(whole, os.path.join(root, 'img', f'goods-{slug}.webp'), Q, alpha_quality=100)
    print(f'img/goods-{slug}.webp {W}x{H} ({size // 1024} KB), {len(ps)} piece{"s" if len(ps) > 1 else ""}')
    item = {'dims': [W, H], **({'parts': parts} if len(ps) > 1 else {})}
    print(json.dumps(item))
    if save:
        items = C.load('GOODS')
        g = C.find(items, 'slug', slug)
        g['dims'] = item['dims']
        if 'parts' in item:
            g['parts'] = parts
        else:
            g.pop('parts', None)
        C.save('GOODS', items)


if __name__ == '__main__':
    main(sys.argv[1:])
