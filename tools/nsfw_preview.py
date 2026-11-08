"""Make one of the three blurred previews in the NSFW section (they lead to the cloud album).

usage: python tools/nsfw_preview.py <1|2|3> <picture> [--out DIR]

  img/nsfw/nsfw<n>.webp   600 px wide, so heavily blurred that only colour and rough shapes are left (WebP q80)

The blur is baked into the published file: the sharp picture never goes on the site.
If the picture's shape changes, update the width/height on its <img> in index.html.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import common as C   # noqa: E402

W = 600


def main(argv):
    out = C.out_root(argv)
    if len(argv) != 2 or argv[0] not in ('1', '2', '3'):
        C.usage(__doc__)
    n, path = argv
    from PIL import Image
    with Image.open(path) as im:
        im.draft('RGB', (1400, 1400))   # a big JPEG is decoded small: the blur needs no detail
        im = im.convert('RGB')
    im = im.resize((W, round(im.height * W / im.width)), Image.LANCZOS)
    p = os.path.join(out, 'img', 'nsfw', f'nsfw{n}.webp')
    kb = C.save_webp(C.heavy_blur(im, 14), p, 80) // 1024
    print(f'nsfw{n}.webp: {im.width}x{im.height}, {kb} KB')


if __name__ == '__main__':
    main(sys.argv[1:])
