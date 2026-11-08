"""Shared helpers for the site's tools: where things are, reading and writing js/data.js, making pictures.

The tools are run from anywhere, e.g. `python tools/work_images.py ...`; paths given to them are used as they are.
"""
import json
import os
import sys

from PIL import Image, ImageChops, ImageEnhance, ImageFilter, ImageStat

Image.MAX_IMAGE_PIXELS = None   # the artwork is big on purpose

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))   # the site (this repository)
DATA = os.path.join(ROOT, 'js', 'data.js')

PAGE_LONG = 1200    # a work's page copy: long side
PAGE_Q = 86         # ... and its WebP quality
ZOOM_Q = 88         # full-size copy for the zoom view (never shrunk)
PROC_Q = 82         # process animations
PROC_FRAME_MS = 1500
BOOK_W = 1400       # art book spreads on the book page
BOOK_Z = 2560       # the cover spread for the 3D book on the book page; also the zoom width given in BOOKS
BOOK_Q, BOOK_BLUR_Q, BOOK_Z_Q, BOOK_X_Q = 85, 80, 84, 82


# ---------- data (js/data.js holds WORKS, GOODS, BOOKS as JSON, one item per line) ----------

def _locate(s, name):
    head = f'const {name} = '
    start = s.index(head) + len(head)
    value, length = json.JSONDecoder().raw_decode(s[start:])
    return value, start, start + length


def load(name):
    """One list from js/data.js: 'WORKS', 'GOODS' or 'BOOKS'."""
    return _locate(open(DATA, encoding='utf-8').read(), name)[0]


def save(name, items):
    """Write one list back to js/data.js, one item per line, then rebuild site.js and list any leftovers (tools/build.py)."""
    s = open(DATA, encoding='utf-8').read()
    _, a, b = _locate(s, name)
    body = '[\n' + ',\n'.join('  ' + json.dumps(x, ensure_ascii=False, separators=(',', ':')) for x in items) + '\n]'
    open(DATA, 'w', encoding='utf-8', newline='').write(s[:a] + body + s[b:])
    import build
    build.build()
    build.report()


def find(items, key, value):
    """The item whose `key` is `value`, or None."""
    return next((x for x in items if x.get(key) == value), None)


# ---------- pictures ----------

def open_rgb(path):
    with Image.open(path) as im:
        return im.convert('RGB')


def fit_long(im, n):
    """Scaled down so its longer side is n px (never enlarged)."""
    s = n / max(im.size)
    if s >= 1:
        return im.copy()
    return im.resize((max(1, round(im.width * s)), max(1, round(im.height * s))), Image.LANCZOS)


def fit_width(im, w):
    """Scaled to w px wide (art book spreads)."""
    return im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)


def size_at_width(size, w):
    return [w, round(size[1] * w / size[0])]


def heavy_blur(im, radius):
    """Only colour and rough masses survive: shrink to 1/24, scale back up, blur, darken a little.
    Used for adult pages and the NSFW previews; the blur is baked into the published file."""
    W, H = im.size
    tiny = im.resize((max(1, W // 24), max(1, H // 24)), Image.BOX)
    out = tiny.resize((W, H), Image.BICUBIC).filter(ImageFilter.GaussianBlur(radius))
    return ImageEnhance.Brightness(out).enhance(0.82)


def save_webp(im, path, quality, method=6, **kw):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im.save(path, 'WEBP', quality=quality, method=method, **kw)
    return os.path.getsize(path)


def difference(a, b):
    """How different two pictures look: mean difference of 96 px wide thumbnails, 0 (same) to 255."""
    a = a.convert('RGB').resize((96, max(1, round(96 * a.height / a.width))), Image.BILINEAR)
    b = b.convert('RGB').resize(a.size, Image.BILINEAR)
    return sum(ImageStat.Stat(ImageChops.difference(a, b)).mean) / 3


def out_root(argv):
    """--out DIR writes the pictures under DIR instead of the site (to try a tool without touching the site)."""
    if '--out' in argv:
        i = argv.index('--out')
        d = argv[i + 1]
        del argv[i:i + 2]
        return d
    return ROOT


def flag(argv, name):
    if name in argv:
        argv.remove(name)
        return True
    return False


def option(argv, name, default=None):
    if name in argv:
        i = argv.index(name)
        v = argv[i + 1]
        del argv[i:i + 2]
        return v
    return default


def usage(doc):
    print(doc.strip())
    sys.exit(2)
