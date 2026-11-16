"""Make a work's pictures for the site, one page per source picture, in page order.

usage: python tools/work_images.py <work id> <picture> [<picture> ...] [--long N | --width N] [--save] [--out DIR]
       python tools/work_images.py <work id> --sketches <sketch or -> [...] [--save] [--out DIR]
       python tools/work_images.py <work id> --alts <No.> <version> [<version> ...] [--save] [--out DIR]

  img/<id>.webp, img/<id>_p1.webp, ...        page copies, long side 1200 (WebP q86)
  img/z/<id>.webp, img/z/<id>_p1.webp, ...    full size for the zoom view, never shrunk (WebP q88)

  --long N      page copies with long side N instead of 1200
  --width N     page copies N px wide instead (long strips, e.g. --width 900)
  --sketches    for a collection ("pieces": true, each page its own piece): the pieces' sketches instead, one per
                page in page order, "-" for a piece without one. img/<id>_s<n>.webp and img/z/<id>_s<n>.webp
                (n counts pages from 0); their sizes go into the work's "sk", 0 where there is none
  --alts N      for a collection: the other versions (差分) of piece No.N (as numbered on the site, from 1), shown
                between its finished picture and its sketch. img/<id>_a<n>_<k>.webp and img/z/... (n counts pages
                from 0, k versions from 1); their sizes go into the work's "alt" under "<n>"
  --save        write the sizes into the work's "dims" (or "sk", "alt") in js/data.js (the work must already be there)
  --out DIR     write under DIR instead of the site, to try it out

Prints the work's "dims": [[W, H, ZW, ZH], ...] per page (page copy size, full size).
A page whose source is no bigger than its page copy gets no zoom copy and just [W, H].
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import common as C   # noqa: E402


def picture(out, name, path, long_side, width):
    """The page copy (and the full-size zoom copy, if the source is bigger) of one picture; returns its sizes."""
    im = C.open_rgb(path)
    page = C.fit_width(im, int(width)) if width and im.width > int(width) else (im.copy() if width else C.fit_long(im, long_side))
    kb = C.save_webp(page, os.path.join(out, 'img', name), C.PAGE_Q) // 1024
    if page.size == im.size:
        print(f'{name}: {im.width}x{im.height}, page copy {kb} KB (the source is no bigger, so no zoom copy)')
        return [page.width, page.height]
    mb = C.save_webp(im, os.path.join(out, 'img', 'z', name), C.ZOOM_Q) / 1e6
    print(f'{name}: page {page.width}x{page.height} {kb} KB | zoom {im.width}x{im.height} {mb:.1f} MB')
    return [page.width, page.height, im.width, im.height]


def main(argv):
    out = C.out_root(argv)
    save = C.flag(argv, '--save')
    sketches = C.flag(argv, '--sketches')
    alts = C.option(argv, '--alts')
    long_side = int(C.option(argv, '--long', C.PAGE_LONG))
    width = C.option(argv, '--width')
    if len(argv) < 2:
        C.usage(__doc__)
    wid, sources = argv[0], argv[1:]
    if sketches:
        field = 'sk'
        sizes = [0 if path == '-' else picture(out, f'{wid}_s{n}.webp', path, long_side, width) for n, path in enumerate(sources)]
    elif alts:
        field, piece = 'alt', int(alts) - 1
        sizes = [picture(out, f'{wid}_a{piece}_{k}.webp', path, long_side, width) for k, path in enumerate(sources, 1)]
    else:
        field = 'dims'
        sizes = [picture(out, f'{wid}{"_p" + str(n) if n else ""}.webp', path, long_side, width) for n, path in enumerate(sources)]
    print(f'"{field}":', sizes)
    if save:
        works = C.load('WORKS')
        w = C.find(works, 'id', wid)
        if not w:
            sys.exit(f'{wid} is not in WORKS yet: add its line to js/data.js first, then run again with --save')
        if sketches and len(sources) != len(w['dims']):
            sys.exit(f'{wid} has {len(w["dims"])} pages: give one sketch (or -) for each')
        if alts:
            if not 0 <= piece < len(w['dims']):
                sys.exit(f'{wid} has pieces No.1 to No.{len(w["dims"])}')
            versions = dict(w.get('alt') or {}, **{str(piece): sizes})
            w['alt'] = dict(sorted(versions.items(), key=lambda kv: int(kv[0])))
        else:
            w[field] = sizes
        C.save('WORKS', works)
        print(f'saved into WORKS: {wid}')


if __name__ == '__main__':
    main(sys.argv[1:])
