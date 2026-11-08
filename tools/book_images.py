"""Make an art book's pictures for the site from its spreads (the gpt/AB-JPG files), the cover spread first.

usage: python tools/book_images.py <slug> <cover spread> <spread> [<spread> ...] [--blur 1,2] [--save] [--out DIR]

  img/ab/<slug>_p<n>.webp     1400 px wide, shown on the book page (WebP q85)
  img/ab/z/<slug>_p0.webp     the cover spread 2560 px wide, for the 3D book on the book page (q84)
  img/ab/x/<slug>_p<n>.webp   full size, for the 3D viewer (cover) and the zoom view (inside pages), never shrunk (q82)

  --blur 1,2   adult pages (by page number; the cover is 0): only a heavily blurred copy is made (q80), never a
               sharp or full-size one. They lead to the NSFW album on the site.
  --save       write the sizes into the book's "pages" (and "blur") in js/data.js (the book must already be there)
  --out DIR    write under DIR instead of the site, to try it out

Prints the book's "pages": [[W, H, ZW, ZH], ...] (ZW, ZH: the 2560 px size the zoom view opens at); blurred pages [W, H].
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import common as C   # noqa: E402


def main(argv):
    out = C.out_root(argv)
    save = C.flag(argv, '--save')
    blur = [int(n) for n in C.option(argv, '--blur', '').split(',') if n.strip()]
    if len(argv) < 2:
        C.usage(__doc__)
    slug, spreads = argv[0], argv[1:]
    if 0 in blur:
        sys.exit('the cover (page 0) cannot be a blurred page')
    ab = os.path.join(out, 'img', 'ab')
    pages = []
    for n, path in enumerate(spreads):
        name = f'{slug}_p{n}.webp'
        im = C.open_rgb(path)
        page = C.fit_width(im, C.BOOK_W)
        if n in blur:
            kb = C.save_webp(C.heavy_blur(page, 32), os.path.join(ab, name), C.BOOK_BLUR_Q) // 1024
            pages.append([page.width, page.height])
            print(f'{name}: blurred {page.width}x{page.height} {kb} KB (no sharp copies)')
            continue
        kb = C.save_webp(page, os.path.join(ab, name), C.BOOK_Q) // 1024
        if n == 0:
            C.save_webp(C.fit_width(im, C.BOOK_Z), os.path.join(ab, 'z', name), C.BOOK_Z_Q)
        mb = C.save_webp(im, os.path.join(ab, 'x', name), C.BOOK_X_Q) / 1e6
        pages.append([page.width, page.height] + C.size_at_width(im.size, C.BOOK_Z))
        print(f'{name}: page {page.width}x{page.height} {kb} KB | full {im.width}x{im.height} {mb:.1f} MB')
    print('"pages":', pages)
    if save:
        books = C.load('BOOKS')
        b = C.find(books, 'slug', slug)
        if not b:
            sys.exit(f'{slug} is not in BOOKS yet: add its line to js/data.js first, then run again with --save')
        b['pages'] = pages
        if blur:
            b['blur'] = blur
        else:
            b.pop('blur', None)
        C.save('BOOKS', books)
        print(f'saved into BOOKS: {slug}')


if __name__ == '__main__':
    main(sys.argv[1:])
