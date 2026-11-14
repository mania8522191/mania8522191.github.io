"""The latest videos on the YouTube channel, for the home page: yt-latest.json at the site's root.

usage: python tools/yt_latest.py

Reads the channel's public feed (no key needed) and keeps the newest three videos, newest first. Shorts are left out,
as on the channel's own Videos tab. Writes the file only when the list changed.

.github/workflows/yt-latest.yml runs this on GitHub every hour and commits the file when it changed, so a new upload
shows on the home page within the hour. It needs nothing but Python's own modules, so it runs there as it is.
"""
import json
import os
import urllib.request
import xml.etree.ElementTree as ET

CHANNEL = 'UC2fBXSYjP6cigLvflw88E4w'   # youtube.com/@mania852
FEED = f'https://www.youtube.com/feeds/videos.xml?channel_id={CHANNEL}'
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'yt-latest.json')
N = 3
NS = {'a': 'http://www.w3.org/2005/Atom', 'yt': 'http://www.youtube.com/xml/schemas/2015'}


def main():
    try:
        req = urllib.request.Request(FEED, headers={'User-Agent': 'site-latest-videos'})
        feed = urllib.request.urlopen(req, timeout=30).read()
        entries = ET.fromstring(feed).findall('a:entry', NS)
    except Exception as e:   # YouTube's feed fails now and then: try again next hour
        print(f'::warning::could not read the feed ({e}); the list stays as it is')
        return
    videos = []
    for e in entries:
        if '/shorts/' in e.find('a:link', NS).get('href', ''):
            continue
        videos.append({'id': e.find('yt:videoId', NS).text, 't': e.find('a:title', NS).text, 'd': e.find('a:published', NS).text[:10]})
        if len(videos) == N:
            break
    if not videos:
        print('::warning::the feed had no videos; the list stays as it is')
        return
    text = json.dumps({'channel': CHANNEL, 'videos': videos}, ensure_ascii=False, indent=1) + '\n'
    old = open(OUT, encoding='utf-8').read() if os.path.exists(OUT) else ''
    if text == old:
        print('no new videos')
        return
    with open(OUT, 'w', encoding='utf-8', newline='\n') as f:
        f.write(text)
    print('updated:', ', '.join(v['id'] for v in videos))


if __name__ == '__main__':
    main()
