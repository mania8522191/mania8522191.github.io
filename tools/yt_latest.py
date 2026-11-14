"""The latest drawing videos on the YouTube channel, for the home page: yt-latest.json at the site's root.

usage: python tools/yt_latest.py

Reads the channel's public feed (no key needed: its 15 newest uploads, live streams included) and keeps the three
newest drawing videos, newest first. A drawing video is one whose title has one of the words in DRAWING (PROCESS,
插圖, 畫圖 ...); Shorts are left out. So a parrot outing, a game-coding video or a trip does not show. A drawing video
titled some other way can be let in by adding its word to DRAWING.

When the feed holds fewer than three drawing videos (a run of other uploads), the ones already listed fill the rest,
so the list never shrinks. Writes the file only when the list changed.

.github/workflows/yt-latest.yml runs this on GitHub every hour and commits the file when it changed, so a new drawing
video shows on the home page within the hour. It needs nothing but Python's own modules, so it runs there as it is.
"""
import json
import os
import re
import urllib.request
import xml.etree.ElementTree as ET

CHANNEL = 'UC2fBXSYjP6cigLvflw88E4w'   # youtube.com/@mania852
FEED = f'https://www.youtube.com/feeds/videos.xml?channel_id={CHANNEL}'
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'yt-latest.json')
N = 3
DRAWING = re.compile(r'PROCESS|TIMELAPSE|插圖|插畫|畫圖|繪圖|繪畫|作畫|イラスト|お絵描き|drawing|illustration|painting', re.I)
NS = {'a': 'http://www.w3.org/2005/Atom', 'yt': 'http://www.youtube.com/xml/schemas/2015'}


def main():
    try:
        req = urllib.request.Request(FEED, headers={'User-Agent': 'site-latest-videos'})
        feed = urllib.request.urlopen(req, timeout=30).read()
        entries = ET.fromstring(feed).findall('a:entry', NS)
    except Exception as e:   # YouTube's feed fails now and then: try again next hour
        print(f'::warning::could not read the feed ({e}); the list stays as it is')
        return
    found = []
    for e in entries:
        t = e.find('a:title', NS).text or ''
        if '/shorts/' in e.find('a:link', NS).get('href', '') or not DRAWING.search(t):
            continue
        found.append({'id': e.find('yt:videoId', NS).text, 't': t, 'd': e.find('a:published', NS).text[:10]})
    old = json.load(open(OUT, encoding='utf-8'))['videos'] if os.path.exists(OUT) else []
    if len(found) < N:   # too few in the feed: keep the ones listed before
        seen = {v['id'] for v in found}
        found += [v for v in old if v['id'] not in seen]
        found.sort(key=lambda v: v['d'], reverse=True)
    videos = found[:N]
    if not videos:
        print('::warning::no drawing videos found; the list stays as it is')
        return
    if videos == old:
        print('no new drawing videos')
        return
    with open(OUT, 'w', encoding='utf-8', newline='\n') as f:
        f.write(json.dumps({'channel': CHANNEL, 'videos': videos}, ensure_ascii=False, indent=1) + '\n')
    print('updated:', ', '.join(v['id'] for v in videos))


if __name__ == '__main__':
    main()
