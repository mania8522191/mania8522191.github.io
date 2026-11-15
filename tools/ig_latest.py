"""The latest Instagram posts, for the home page: ig-latest.json at the site's root, and their pictures in img/ig/.

usage: python tools/ig_latest.py   (IG_TOKEN must hold the access token; without it this does nothing)

Reads the account's newest posts through Meta's Instagram API (Unified Login: the token is made in the Meta app's
dashboard, tools/README.md says how) and keeps the six newest, newest first. Each post's picture is saved in img/ig/
as Instagram serves it, because the picture links Instagram hands out stop working after a while: a video or reel
gives its cover, an album its first picture. Pictures of posts no longer listed are deleted. Writes only when the
list changed, and keeps the old list when Instagram gives no posts at all.

.github/workflows/ig-latest.yml runs this every hour with the IG_TOKEN secret and commits what changed. When Instagram
is busy or the network fails, the list stays as it is until the next hour. When the token itself stops working, the
list also stays, and the run fails once a day (around 09:00 in Taiwan, or whenever it is run by hand), so GitHub
sends an email. The token is never printed. It needs nothing but Python's own modules, so it runs there as it is.
"""
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

API = 'https://graph.facebook.com/v27.0'
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'ig-latest.json')
PICS = os.path.join(ROOT, 'img', 'ig')
N = 6
LOUD_HOUR = 1   # UTC: a token that stopped working fails the scheduled run in this hour only, so one email a day
PASSING = {1, 2, 4, 17, 32, 341, 613}   # Meta's error codes for a failure that passes: busy, too many calls
FIELDS = 'id,media_type,media_url,thumbnail_url,permalink,timestamp,children{media_type,media_url,thumbnail_url}'
HEAD = {'User-Agent': 'site-latest-posts'}


class Passing(Exception):
    """A failure the next run will likely not meet: the network, or Meta busy."""


class Broken(Exception):
    """A failure that stays until someone fixes it: the token, or the app's setup."""


def call(path, **params):
    """One Graph API call. The token goes in the address, which is never printed."""
    params['access_token'] = os.environ['IG_TOKEN']
    req = urllib.request.Request(f'{API}/{path}?{urllib.parse.urlencode(params)}', headers=HEAD)
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        try:
            err = json.loads(e.read())['error']
        except (ValueError, KeyError, TypeError):
            raise Passing(f'HTTP {e.code}') from None
        msg = f"{err.get('message', 'no message')} (code {err.get('code')})"
        raise (Passing if err.get('code') in PASSING or e.code >= 500 else Broken)(msg) from None
    except OSError as e:   # no network, a timeout
        raise Passing(str(getattr(e, 'reason', e))) from None


def picture(m):
    """(link to the post's picture, kind) for one post from the API, or None when it has nothing to show."""
    kind = {'VIDEO': 'video', 'CAROUSEL_ALBUM': 'album'}.get(m.get('media_type'), 'image')
    if kind == 'video':
        src = m.get('thumbnail_url')
    elif kind == 'album':   # its first picture, or the cover when that is a video
        first = ((m.get('children') or {}).get('data') or [{}])[0]
        src = (first.get('thumbnail_url') if first.get('media_type') == 'VIDEO' else first.get('media_url')) or m.get('media_url')
    else:
        src = m.get('media_url')
    return (src, kind) if src else None


def ending(data):
    """The file ending for a picture's bytes, or None when they are not a JPEG, WebP or PNG picture."""
    if data[:3] == b'\xff\xd8\xff':
        return '.jpg'
    if data[:4] == b'RIFF' and data[8:12] == b'WEBP':
        return '.webp'
    if data[:8] == b'\x89PNG\r\n\x1a\n':
        return '.png'
    return None


def saved(pid):
    """The picture already saved for a post (img/ig/<id>.jpg ...), or None."""
    for end in ('.jpg', '.webp', '.png'):
        if os.path.exists(os.path.join(PICS, pid + end)):
            return f'img/ig/{pid}{end}'
    return None


def read_posts():
    """(username, the newest posts, the new pictures to save as {path: bytes}). Nothing is written here, so a
    failure halfway leaves no picture behind."""
    acc = call('me/assigned_instagram_accounts', fields='id,username').get('data') or []
    if not acc:
        raise Broken('the token reaches no Instagram account; is the account added to the app as an Instagram tester?')
    posts, new = [], {}
    for m in call(f"{acc[0]['id']}/media", fields=FIELDS, limit=N + 6).get('data') or []:
        found = picture(m)
        if not found or not m.get('permalink'):
            continue
        img = saved(m['id'])
        if not img:
            try:
                with urllib.request.urlopen(urllib.request.Request(found[0], headers=HEAD), timeout=60) as r:
                    data = r.read()
            except OSError as e:
                raise Passing(f'a picture did not download ({getattr(e, "reason", e)})') from None
            end = ending(data)
            if not end:
                print(f"::warning::post {m['id']}: its picture is not a JPEG, WebP or PNG file, so it is left out")
                continue
            img = f"img/ig/{m['id']}{end}"
            new[os.path.join(ROOT, *img.split('/'))] = data
        posts.append({'id': m['id'], 'url': m['permalink'], 'd': (m.get('timestamp') or '')[:10], 'kind': found[1], 'img': img})
        if len(posts) == N:
            break
    return acc[0].get('username', ''), posts, new


def main():
    if not os.environ.get('IG_TOKEN'):
        print('IG_TOKEN is not set: nothing to do (tools/README.md says how to set it up)')
        return 0
    old = json.load(open(OUT, encoding='utf-8')) if os.path.exists(OUT) else None
    try:
        user, posts, new = read_posts()
    except Passing as e:
        print(f'::warning::Instagram could not be read this time ({e}); the list stays as it is')
        return 0
    except Broken as e:
        loud = os.environ.get('GITHUB_EVENT_NAME') != 'schedule' or time.gmtime().tm_hour == LOUD_HOUR
        print(f"::{'error' if loud else 'warning'}::Instagram: {e}. The list stays as it is; "
              'tools/README.md says how to make a new token.')
        return 1 if loud else 0
    if not posts:
        print('::warning::Instagram gave no posts with a picture; the list stays as it is')
        return 0
    os.makedirs(PICS, exist_ok=True)
    for path, data in new.items():
        with open(path, 'wb') as f:
            f.write(data)
    keep = {p['img'].rsplit('/', 1)[1] for p in posts}
    for f in os.listdir(PICS):
        if f not in keep:
            os.remove(os.path.join(PICS, f))
    listed = {'user': user, 'posts': posts}
    if listed == old:
        print('no new posts')
        return 0
    with open(OUT, 'w', encoding='utf-8', newline='\n') as f:
        f.write(json.dumps(listed, ensure_ascii=False, indent=1) + '\n')
    print('updated:', ', '.join(p['id'] for p in posts))
    return 0


if __name__ == '__main__':
    sys.exit(main())
