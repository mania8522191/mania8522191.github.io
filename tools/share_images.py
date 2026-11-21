"""Make the pictures a link to the site shows on other sites (its share previews), from tools/share_image.html,
drawn by Google Chrome in the site's own fonts:

  img/share-og.jpg   1200 x 630: Facebook, Threads, LINE, Discord, Messenger and Instagram's messages (og:image).
                     They write the site's name and words under the picture, and some crop it to a square in the
                     middle, so the works fill the middle, three as a hand of cards, and the name sits small under them
  img/share-x.jpg    1200 x 600: X (twitter:image). X shows the picture alone, with the site's address over its bottom
                     left, so the name goes large at the top left and the works to the right

usage: python tools/share_images.py [--out DIR]

The works: WORKS below (from the home page's slides), the first on top. YouTube shows no picture for a link (only the
site's small icon, img/favicon.png). Needs Google Chrome (the CHROME setting, or its usual place) and the network:
the page takes its fonts from Google Fonts, as the site does. After a change, the other sites may keep showing the
old picture for a while: Facebook's Sharing Debugger can fetch it again.
"""
import os
import subprocess
import sys
import tempfile

from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import common as C   # noqa: E402

WORKS = ['137308455', '147595537', '146541232']   # 7th Anniversary, Lollipop, Jubilee
KINDS = {'og': (1200, 630), 'x': (1200, 600)}
CHROMES = [os.environ.get('CHROME', ''), r'C:\Program Files\Google\Chrome\Application\chrome.exe',
           r'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
           '/usr/bin/google-chrome']


def main(argv):
    root = C.out_root(argv)
    if argv:
        C.usage(__doc__)
    chrome = next((c for c in CHROMES if c and os.path.exists(c)), None)
    if not chrome:
        sys.exit('Google Chrome not found: set CHROME to its program')
    page = 'file:///' + os.path.join(os.path.dirname(os.path.abspath(__file__)), 'share_image.html').replace('\\', '/')
    with tempfile.TemporaryDirectory() as tmp:
        for kind, (w, h) in KINDS.items():
            png = os.path.join(tmp, kind + '.png')
            # the fonts and pictures load before the shot: virtual time waits while anything is still coming
            subprocess.run([chrome, '--headless=new', '--hide-scrollbars', '--force-device-scale-factor=1', f'--window-size={w},{h}',
                            '--virtual-time-budget=15000', f'--user-data-dir={os.path.join(tmp, "profile")}', f'--screenshot={png}',
                            f'{page}#{kind}:{",".join(WORKS)}'], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            im = Image.open(png).convert('RGB')
            if im.size != (w, h):
                sys.exit(f'{kind}: Chrome drew {im.size[0]} x {im.size[1]}, not {w} x {h}')
            path = os.path.join(root, 'img', f'share-{kind}.jpg')
            im.save(path, 'JPEG', quality=90, optimize=True, progressive=True)
            print(f'img/share-{kind}.jpg {w}x{h} ({os.path.getsize(path) // 1024} KB)')


if __name__ == '__main__':
    main(sys.argv[1:])
