"""Make a work's pictures for the site, one page per source picture, in page order.

usage: python tools/work_images.py <work id> <picture> [<picture> ...] [--long N | --width N] [--save] [--out DIR]

  img/<id>.webp, img/<id>_p1.webp, ...        page copies, long side 1200 (WebP q86)
  img/z/<id>.webp, img/z/<id>_p1.webp, ...    full size for the zoom view, never shrunk (WebP q88)

  --long N    page copies with long side N instead of 1200
  --width N   page copies N px wide instead (long strips, e.g. --width 900)
  --save      write the sizes into the work's "dims" in js/data.js (the work must already be there)
  --out DIR   write under DIR instead of the site, to try it out

Prints the work's "dims": [[W, H, ZW, ZH], ...] per page (page copy size, full size).
A page whose source is no bigger than its page copy gets no zoom copy and just [W, H].
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import common as C   # noqa: E402


def main(argv):
    out = C.out_root(argv)
    save = C.flag(argv, '--save')
    long_side = int(C.option(argv, '--long', C.PAGE_LONG))
    width = C.option(argv, '--width')
    if len(argv) < 2:
        C.usage(__doc__)
    wid, sources = argv[0], argv[1:]
    dims = []
    for n, path in enumerate(sources):
        name = f'{wid}{"_p" + str(n) if n else ""}.webp'
        im = C.open_rgb(path)
        page = C.fit_width(im, int(width)) if width and im.width > int(width) else (im.copy() if width else C.fit_long(im, long_side))
        kb = C.save_webp(page, os.path.join(out, 'img', name), C.PAGE_Q) // 1024
        if page.size == im.size:
            dims.append([page.width, page.height])
            print(f'{name}: {im.width}x{im.height}, page copy {kb} KB (the source is no bigger, so no zoom copy)')
            continue
        mb = C.save_webp(im, os.path.join(out, 'img', 'z', name), C.ZOOM_Q) / 1e6
        dims.append([page.width, page.height, im.width, im.height])
        print(f'{name}: page {page.width}x{page.height} {kb} KB | zoom {im.width}x{im.height} {mb:.1f} MB')
    print('"dims":', dims)
    if save:
        works = C.load('WORKS')
        w = C.find(works, 'id', wid)
        if not w:
            sys.exit(f'{wid} is not in WORKS yet: add its line to js/data.js first, then run again with --save')
        w['dims'] = dims
        C.save('WORKS', works)
        print(f'saved into WORKS: {wid}')


if __name__ == '__main__':
    main(sys.argv[1:])
