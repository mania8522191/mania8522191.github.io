"""Swap the background of the catalog's pages (お品書き, FF47_CATALOG in js/data.js) for a new picture, and make from
the same picture the background an item's picture widens over when its goods are taken out (img/goods-bg.webp), so
the page and what widens beside it are one picture.

usage: python tools/catalog_bg.py <picture> <ad folder> [--out DIR]
FF47:  python tools/catalog_bg.py 202608/11/webbg.jpg 202608/CMYK/ADs

The picture is laid from each page's top left at the page's height: a 3:2 picture shows its left two thirds on the
page and the rest as the picture widens (the frame is never wider than 3:2, css/goods.css). The pages are read as
they were first published (img/z/ at ORIGINAL in git), so running it again starts from them, not from its own output.

A page's old background is the bottom layer the ads share. Where an ad PSD in the folder is that page (its merged
picture matches), its other layers say exactly what is content: the published pixels stay where the content is
solid, and the PSD's own drawing of the soft edges and shadows goes over the new picture elsewhere. A page with no
PSD (FF47's keychains and mini blocks) takes its goods from their cut-out pieces (GOODS parts, tools/goods_pieces.py)
and its words and shadows from where it is darker than the old background (the published pages were sharpened, so
what is a little lighter is a rim round the words, not content). Writes img/z/ (full size) and img/ (1200) as
work_images.py does. Needs psd-tools and numpy; about a minute a PSD.
"""
import io
import os
import subprocess
import sys

import numpy as np
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import common as C   # noqa: E402

ORIGINAL = '7fb1ac3'   # the commit with the catalog's pages as first published
PAGE = 1200            # a page's side on the site, and the widening background's height
BG_Q = 82              # the widening background's WebP quality: its halftone dots stay clean
MATCH = 5              # a PSD is a page when their 150 px greys differ by less than this (the others differ by 30+)


def smooth(x, lo, hi):
    t = np.clip((x - lo) / (hi - lo), 0, 1)
    return t * t * (3 - 2 * t)


def grey(im):
    return np.asarray(im.convert('L').resize((150, 150), Image.BOX), np.float32)


def published(name):
    """A page as first published (its full-size copy), from git."""
    data = subprocess.run(['git', '-C', C.ROOT, 'show', f'{ORIGINAL}:img/z/{name}'], capture_output=True, check=True).stdout
    return Image.open(io.BytesIO(data)).convert('RGB')


def bottom_layer(psd):
    """The ad's background: its bottom layer, a picture over the whole canvas."""
    b = psd[0]
    if b.kind != 'pixel' or b.bbox != (0, 0, psd.width, psd.height):
        sys.exit(f'{psd.name if hasattr(psd, "name") else "a PSD"}: its bottom layer is not a background over the whole canvas')
    return b


def content(psd, bottom, n):
    """Every layer but the background: its colour times its alpha, and the alpha, at n x n (multiplied before scaling,
    so the edges stay true)."""
    rgba = psd.composite(layer_filter=lambda layer: layer.is_visible() and layer is not bottom)
    a = np.asarray(rgba, np.float32)
    pm = a[..., :3] * a[..., 3:] / 255
    pm = np.stack([np.asarray(Image.fromarray(pm[..., k]).resize((n, n), Image.LANCZOS), np.float32) for k in range(3)], -1)
    return pm, np.asarray(rgba.getchannel('A').resize((n, n), Image.LANCZOS), np.float32)[..., None] / 255


def pieces(pg, n):
    """The cut-out goods on page pg (their parts are in the page's 1200 px), as one alpha at n x n."""
    k = n / PAGE
    out = np.zeros((n, n), np.float32)
    for g in C.load('GOODS'):
        if g.get('pg') != pg:
            continue
        for i, (x, y, w, h) in enumerate(g['parts'], 1):
            with Image.open(os.path.join(C.ROOT, 'img', f'goods-{g["slug"]}-{i}.webp')) as im:
                a = im.getchannel('A').resize((round(w * k), round(h * k)), Image.LANCZOS)
            layer = Image.new('L', (n, n))
            layer.paste(a, (round(x * k), round(y * k)))
            out = np.maximum(out, np.asarray(layer, np.float32) / 255)
    return out


def main(argv):
    root = C.out_root(argv)
    if len(argv) != 3:
        C.usage(__doc__)
    from psd_tools import PSDImage
    cat = C.load('FF47_CATALOG')
    names = [f'{cat["id"]}{"_p" + str(k) if k else ""}.webp' for k in range(len(cat['dims']))]
    pages = [published(name) for name in names]
    n = pages[0].width   # the full size; every page is the same square
    picture = C.open_rgb(argv[1])
    # the ads: which PSD is which page; the old background is the bottom layer they share
    psds, old = {}, None
    for f in sorted(os.listdir(argv[2])):
        if not f.lower().endswith('.psd'):
            continue
        psd = PSDImage.open(os.path.join(argv[2], f))
        g = grey(psd.topil())
        diffs = [np.abs(g - grey(p)).mean() for p in pages]
        k = int(np.argmin(diffs))
        if diffs[k] >= MATCH:
            print(f'{f}: not a page of the catalog')
            continue
        psds[k] = (f, psd)
        if old is None:
            old = np.asarray(bottom_layer(psd).topil().convert('RGB').resize((n, n), Image.LANCZOS), np.float32)
    if old is None:
        sys.exit('no ad PSD in the folder is a page of the catalog')
    new = np.asarray(picture.resize((round(picture.width * n / picture.height), n), Image.LANCZOS).crop((0, 0, n, n)), np.float32)
    for k, (name, page) in enumerate(zip(names, pages)):
        P = np.asarray(page, np.float32)
        if k in psds:
            f, psd = psds[k]
            pm, a = content(psd, bottom_layer(psd), n)
            w = smooth(a, .5, .95)   # the published pixels where solid, the PSD's soft edges and shadows elsewhere
            out = w * (P + (new - old) * (1 - a)) + (1 - w) * (pm + new * (1 - a))
            how = f
        else:
            dark = np.clip(np.clip(old - P - 4, 0, None) / np.maximum(old, 1), 0, 1).max(-1)
            a = np.maximum(dark, pieces(k, n))[..., None]
            w = smooth(a, .05, .25)   # where faint (a shadow's edge), the new picture darkened: no old grain stays
            out = w * (P + (new - old) * (1 - a)) + (1 - w) * (new * (1 - a))
            how = 'its goods (their pieces) and where it is darker'
        im = Image.fromarray(np.clip(out + .5, 0, 255).astype(np.uint8))
        z = C.save_webp(im, os.path.join(root, 'img', 'z', name), C.ZOOM_Q) // 1024
        p = C.save_webp(C.fit_long(im, PAGE), os.path.join(root, 'img', name), C.PAGE_Q) // 1024
        print(f'{name}: from {how}; {z} KB full size, {p} KB page')
    bg = picture.resize((round(picture.width * PAGE / picture.height), PAGE), Image.LANCZOS)
    kb = C.save_webp(bg, os.path.join(root, 'img', 'goods-bg.webp'), BG_Q) // 1024
    print(f'img/goods-bg.webp: {bg.width} x {bg.height}, {kb} KB')


if __name__ == '__main__':
    main(sys.argv)
