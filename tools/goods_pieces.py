"""Make a goods item's pictures for the site from its ad PSD (the FF47 ones: 202608/CMYK/ADs/<n>.psd, and for the
keychains and the mini blocks the Melonbooks ads, ADs/melon/g.psd and e.psd): the goods alone, without the ad's
background, words and header, transparent round them.

usage: python tools/goods_pieces.py <slug> <ad.psd> [--scale R] [--save] [--out DIR]

  img/goods-<slug>.webp       the goods card's picture, 1400 x 1050 (4:3, its frame's shape): the ad's canvas the
                              picture's width, its goods where the ad has them, cut where the ad cuts them (a paper
                              bag only peeks in, as on the catalog's page), so every card shows its goods at the
                              catalog's one scale
  img/goods-<slug>-<n>.webp   each piece (n from the bottom), whole, the set 1400 px on its long side: the item page
                              lays them together, and each can be taken with the mouse and moved

A piece is one picture layer of the ad's goods. A feathered black shadow kept as a layer of its own (the black layer
just under its goods) is merged into its goods' piece; where the ad cut such a shadow off at the canvas edge but the
goods go on past it, the shadow is made whole again (the goods' outline blurred, fitted to the part that is there).
Left out: the background (a layer over the whole canvas), text layers, the header group (群組 2) and its dates,
hidden layers. Each piece is cut to what shows: its goods with their soft edge and shadow, but not a stray faint mark
far off (one keychain layer has one, its full height above the goods), and rid of stray specks (the keychains' ring
photos have white dust round them, unseen on the ads' light ground but plain on the site's dark one).

  --scale R  the ad draws its goods R times as big as the catalog's ads (the Melonbooks ads: 2.2, by the keychain
             both have): the card shows them whole, at the catalog's scale, in the middle
  --save     write "dims" (the set's size on the item page) and "parts" ([[x, y, w, h], ...]: each piece's place in
             it) into the item in GOODS in js/data.js (the item must already be there)
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

LONG = 1400   # the set's long side on the item page, as the goods pictures were
COVER = (1400, 1050)   # the card's picture, 4:3 like its frame
REF = 6000    # the catalog's ads' canvas width: a cover is one of them wide
Q = 88
EDGE = 64     # a shadow this near the canvas edge was cut there
REACH = 240   # how far past the goods (their solid part) a soft edge or shadow may reach
SOLID = 96    # solid: less see-through than this (alpha)
LONELY = 61   # a light solid pixel with less than SPECK of this square round it solid is a stray speck
SPECK = 0.15


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
            if (l.bbox[0] <= 0 and l.bbox[1] <= 0 and l.bbox[2] >= psd.width and l.bbox[3] >= psd.height) or l.name.startswith('(五)'):
                continue   # the background (the whole canvas, or past it); the header's dates
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
    return [cut(*cut(im, box, despeck=False)) for im, box in out]   # cut to what shows, then without stray specks


def cut(im, box, despeck=True):
    """a piece cut to what shows (shows), with its new box in the PSD; first rid of stray specks (despeck)"""
    if despeck:
        im = despecked(im)
    b = shows(im)
    return im.crop(b), (box[0] + b[0], box[1] + b[1], box[0] + b[2], box[1] + b[3])


def shows(im):
    """the box of what shows in a piece: everything not quite clear (a soft edge, a shadow's blur) within REACH of
    its solid part; a faint mark farther off is left out"""
    a = np.asarray(im.getchannel('A'))
    ys, xs = np.nonzero(a > 40)
    near = np.zeros(a.shape, dtype=bool)
    near[max(0, ys.min() - REACH):ys.max() + 1 + REACH, max(0, xs.min() - REACH):xs.max() + 1 + REACH] = True
    ys, xs = np.nonzero((a > 6) & near)
    return int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1


def despecked(im):
    """the piece without stray specks, such as the white dust round the keychains' rings, often in the goods' own soft
    shadow: unseen on the ads' light ground, plain on the site's dark one. A speck is solid (alpha over SOLID), light
    (not a shadow's black) and alone: in the LONELY px square round it, less than SPECK of the pixels are solid (by
    the goods, or along a ring or a chain, far more are). A speck, with its soft rim, becomes what is round it: black
    (the shadow's colour), as see-through as its neighbours on average, so nothing where there is no shadow"""
    a = np.asarray(im).astype(np.float64)
    solid = a[..., 3] > SOLID
    speck = solid & (a[..., :3].mean(axis=2) > 60) & (box_mean(solid.astype(np.float64), LONELY) < SPECK)
    if not speck.any():
        return im
    speck = np.asarray(Image.fromarray(speck.astype(np.uint8) * 255).filter(ImageFilter.MaxFilter(5))) > 0
    keep = (~speck).astype(np.float64)
    round_it = box_mean(a[..., 3] * keep, 25) / np.maximum(box_mean(keep, 25), 1e-6)
    a[speck, :3] = 0
    a[speck, 3] = round_it[speck]
    print(f'  stray specks taken out ({int(speck.sum())} px)')
    return Image.fromarray(np.clip(a + .5, 0, 255).astype(np.uint8), 'RGBA')


def box_mean(x, k):
    """the mean of x over the k by k box round each pixel (k odd; past the edges, the edge goes on)"""
    p = k // 2
    c = np.pad(x, ((p + 1, p), (p + 1, p)), mode='edge').cumsum(0).cumsum(1)
    return (c[k:, k:] - c[:-k, k:] - c[k:, :-k] + c[:-k, :-k]) / (k * k)


def cover(ps, psd, scale):
    """the goods card's picture (COVER): the catalog's ads (scale 1) show their canvas the cover's width, the goods
    where the ad has them and cut where it cuts them (a paper bag only peeks in, as on the catalog's page), a band of
    the canvas as tall as the goods (from their top when they are taller: what is cut then is a bag at the bottom),
    kept to the canvas's edge where the ad cuts at that edge. An ad drawing its goods `scale` times as big shows them
    whole at the catalog's scale (REF px of their canvas the cover's width), in the middle"""
    cw, ch = COVER
    out = Image.new('RGBA', COVER, (0, 0, 0, 0))
    if scale != 1:
        c = cw / (REF * scale)
        x0, y0 = min(b[0] for _, b in ps), min(b[1] for _, b in ps)
        x1, y1 = max(b[2] for _, b in ps), max(b[3] for _, b in ps)
        ox, oy = (cw - (x1 - x0) * c) / 2 - x0 * c, (ch - (y1 - y0) * c) / 2 - y0 * c
        window = None
    else:
        W, H = psd.width, psd.height
        c, wh = cw / W, ch * W / cw   # the band's height in the canvas
        gy0 = max(0, min(b[1] for _, b in ps))
        gy1 = min(H, max(b[3] for _, b in ps))
        if gy1 - gy0 > wh or gy0 == 0:
            top = gy0
        elif gy1 == H:
            top = H - wh
        else:
            top = (gy0 + gy1 - wh) / 2
        window = (0, top, W, top + wh)
        ox, oy = 0, -top * c
    for im, b in ps:
        if window:   # only what lies in the band
            l, t = max(b[0], window[0]), max(b[1], window[1])
            r, btm = min(b[2], window[2]), min(b[3], window[3])
            if r <= l or btm <= t:
                continue
            im, b = im.crop((round(l - b[0]), round(t - b[1]), round(r - b[0]), round(btm - b[1]))), (l, t, r, btm)
        x, y = round(b[0] * c + ox), round(b[1] * c + oy)
        w, h = round(b[2] * c + ox) - x, round(b[3] * c + oy) - y
        layer = Image.new('RGBA', COVER, (0, 0, 0, 0))
        layer.paste(im.resize((max(1, w), max(1, h)), Image.LANCZOS), (x, y))
        out = Image.alpha_composite(out, layer)
    return out


def main(argv):
    root = C.out_root(argv)
    save = C.flag(argv, '--save')
    scale = float(C.option(argv, '--scale', 1))
    if len(argv) != 2:
        C.usage(__doc__)
    slug, path = argv
    if save and not C.find(C.load('GOODS'), 'slug', slug):
        sys.exit(f'{slug} is not in GOODS yet: add its line to js/data.js first, then run again with --save')
    psd = PSDImage.open(path)
    ps = pieces(psd)
    size = C.save_webp(cover(ps, psd, scale), os.path.join(root, 'img', f'goods-{slug}.webp'), Q, alpha_quality=100)
    print(f'img/goods-{slug}.webp {COVER[0]}x{COVER[1]} ({size // 1024} KB)')
    # the pieces, whole, at the item page's scale: the set LONG px on its long side
    x0, y0 = min(b[0] for _, b in ps), min(b[1] for _, b in ps)
    x1, y1 = max(b[2] for _, b in ps), max(b[3] for _, b in ps)
    k = LONG / max(x1 - x0, y1 - y0)
    parts = []
    for n, (im, b) in enumerate(ps, 1):
        small = im.resize((max(1, round(im.width * k)), max(1, round(im.height * k))), Image.LANCZOS)
        parts.append([round((b[0] - x0) * k), round((b[1] - y0) * k), small.width, small.height])
        C.save_webp(small, os.path.join(root, 'img', f'goods-{slug}-{n}.webp'), Q, alpha_quality=100)
    item = {'dims': [round((x1 - x0) * k), round((y1 - y0) * k)], 'parts': parts}
    print(f'{len(ps)} piece{"s" if len(ps) > 1 else ""}', json.dumps(item))
    if save:
        items = C.load('GOODS')
        C.find(items, 'slug', slug).update(item)
        C.save('GOODS', items)


if __name__ == '__main__':
    main(sys.argv[1:])
