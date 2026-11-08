"""Make a process animation (the stages of a picture, one after another) for a work page.

usage: python tools/process_anim.py <name> <stage picture> [<stage picture> ...] [--save <work id>] [--out DIR]
       python tools/process_anim.py <name> <animation.gif> [--save <work id>] [--out DIR]

  img/proc/<name>.webp     on the work page: 1000 px wide (2000 for wide pictures), WebP q82
  img/proc/z/<name>.webp   full size for the zoom view, never shrunk, WebP q82

<name> is the file name, e.g. o-54 or 151696428_p1 (".webp" is added). Stage pictures are given in order and must
all be the same size; each shows for 1.5 s. A GIF keeps its own timing. The animation loops.

  --save <work id>   add (or update) the entry in that work's "proc" list in js/data.js
  --out DIR          write under DIR instead of the site, to try it out

Prints the "proc" entry: [file, W, H, ZW, ZH] (no ZW, ZH when the full size is no bigger than the page one).
"""
import os
import sys

from PIL import Image, ImageSequence

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import common as C   # noqa: E402


def frames_of(paths):
    if len(paths) == 1 and paths[0].lower().endswith('.gif'):
        with Image.open(paths[0]) as g:
            out = [(f.convert('RGB').copy(), f.info.get('duration', C.PROC_FRAME_MS)) for f in ImageSequence.Iterator(g)]
        return [f for f, _ in out], [d for _, d in out]
    frames = [C.open_rgb(p) for p in paths]
    sizes = {f.size for f in frames}
    if len(sizes) != 1:
        sys.exit(f'the stage pictures are not all the same size: {sorted(sizes)}')
    return frames, [C.PROC_FRAME_MS] * len(frames)


def main(argv):
    out = C.out_root(argv)
    work = C.option(argv, '--save')
    if len(argv) < 2:
        C.usage(__doc__)
    name = argv[0] if argv[0].endswith('.webp') else argv[0] + '.webp'
    frames, durations = frames_of(argv[1:])
    W, H = frames[0].size
    pw = 2000 if W > H * 1.2 else 1000            # wide pieces get more width on the page
    small = [f.resize((pw, round(H * pw / W)), Image.LANCZOS) for f in frames] if W > pw else frames
    page = os.path.join(out, 'img', 'proc', name)
    os.makedirs(os.path.dirname(page), exist_ok=True)
    small[0].save(page, 'WEBP', save_all=True, append_images=small[1:], duration=durations, loop=0, quality=C.PROC_Q, method=6)
    entry = [name, small[0].width, small[0].height]
    msg = f'{name}: {len(frames)} frames | page {entry[1]}x{entry[2]} {os.path.getsize(page) / 1e6:.1f} MB'
    if W > small[0].width:
        z = os.path.join(out, 'img', 'proc', 'z', name)
        os.makedirs(os.path.dirname(z), exist_ok=True)
        frames[0].save(z, 'WEBP', save_all=True, append_images=frames[1:], duration=durations, loop=0, quality=C.PROC_Q, method=4)
        entry += [W, H]
        msg += f' | zoom {W}x{H} {os.path.getsize(z) / 1e6:.1f} MB'
    print(msg)
    print('"proc" entry:', entry)
    if work:
        works = C.load('WORKS')
        w = C.find(works, 'id', work)
        if not w:
            sys.exit(f'{work} is not in WORKS')
        procs = w.setdefault('proc', [])
        old = next((i for i, p in enumerate(procs) if p[0] == name), None)
        if old is None:
            procs.append(entry)
        else:
            procs[old] = entry
        C.save('WORKS', works)
        print(f'saved into WORKS: {work}')


if __name__ == '__main__':
    main(sys.argv[1:])
