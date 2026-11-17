"""The latest drawing videos on the YouTube channel, for the home page: yt-latest.json at the site's root.

usage: python tools/yt_latest.py

Reads the channel's public feed (no key needed: its 15 newest uploads, live streams included) and keeps the three
newest drawing videos, newest first. A drawing video is one whose title has one of the words in DRAWING (PROCESS,
插圖, 畫圖 ...); Shorts are left out. So a parrot outing, a game-coding video or a trip does not show. A drawing video
titled some other way can be let in by adding its word to DRAWING.

When the feed holds fewer than three drawing videos (a run of other uploads), the ones already listed fill the rest,
so the list never shrinks. Each video keeps its views ("v") and likes ("l") as the feed gives them. Writes the file
when the list changed, and for new counts alone at most every six hours ("at"), so views going up do not make a
commit every hour.

.github/workflows/yt-latest.yml runs this on GitHub every hour and commits the file when it changed, so a new drawing
video shows on the home page within about an hour and a half (GitHub can start a scheduled run half an hour late). It
also runs when this script or the workflow is pushed, so a change to DRAWING shows at once. It needs nothing but
Python's own modules, so it runs there as it is.
"""
import json
import os
import re
import time
import urllib.request
import xml.etree.ElementTree as ET

CHANNEL = 'UC2fBXSYjP6cigLvflw88E4w'   # youtube.com/@mania852
FEED = f'https://www.youtube.com/feeds/videos.xml?channel_id={CHANNEL}'
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'yt-latest.json')
N = 3
DRAWING = re.compile(r'PROCESS|TIMELAPSE|插圖|插畫|畫圖|繪圖|繪畫|作畫|イラスト|お絵描き|drawing|illustration|painting', re.I)
NS = {'a': 'http://www.w3.org/2005/Atom', 'yt': 'http://www.youtube.com/xml/schemas/2015', 'm': 'http://search.yahoo.com/mrss/'}
COUNTS_EVERY = 6 * 3600   # seconds: how often new counts alone are written


def counts(e):
    """(views, likes) of a feed entry; the feed's star rating count is the likes. 0 when the feed leaves them out."""
    stats, stars = e.find('m:group/m:community/m:statistics', NS), e.find('m:group/m:community/m:starRating', NS)
    num = lambda x, k: int(x.get(k, 0)) if x is not None and str(x.get(k, '0')).isdigit() else 0
    return num(stats, 'views'), num(stars, 'count')


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
        v, likes = counts(e)
        found.append({'id': e.find('yt:videoId', NS).text, 't': t, 'd': e.find('a:published', NS).text[:10], 'v': v, 'l': likes})
    prev = json.load(open(OUT, encoding='utf-8')) if os.path.exists(OUT) else {}
    old = prev.get('videos', [])
    if len(found) < N:   # too few in the feed: keep the ones listed before
        seen = {v['id'] for v in found}
        found += [v for v in old if v['id'] not in seen]
        found.sort(key=lambda v: v['d'], reverse=True)
    videos = found[:N]
    if not videos:
        print('::warning::no drawing videos found; the list stays as it is')
        return
    same = lambda vs: [(v['id'], v['t'], v['d']) for v in vs]
    now = int(time.time())
    if videos == old or (same(videos) == same(old) and now - prev.get('at', 0) < COUNTS_EVERY):
        print('no new drawing videos' + ('' if videos == old else '; new counts wait for the next six-hourly write'))
        return
    with open(OUT, 'w', encoding='utf-8', newline='\n') as f:
        f.write(json.dumps({'channel': CHANNEL, 'at': now, 'videos': videos}, ensure_ascii=False, indent=1) + '\n')
    print('updated:', ', '.join(f"{v['id']} ({v['v']} views, {v['l']} likes)" for v in videos))


if __name__ == '__main__':
    main()
