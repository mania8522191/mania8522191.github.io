"""The latest posts on X, for the home page: x-latest.json at the site's root, and their pictures in img/x/.

usage: python tools/x_latest.py   (X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN and X_ACCESS_SECRET must hold the X app's
keys; without them this does nothing)

Reads the account's own posts through the X API, signed in as the account itself (its app's access token), so X bills
them at its owned-reads price. X bills every post it returns, so:
- it asks only for posts newer than the newest one already seen ("since" in the list), and an hour without a new
  post costs nothing;
- reposts and replies are not asked for, and quotes are left out (showing the post they quote would cost more);
- the only extra it asks for is each post's pictures.
Keeps the five newest posts with a picture, newest first: posts of words only stay off the site (the user's wish).
When fewer than five are listed, it reads one page further back, at most once a day ("back", "backed"), until the
list is full or the account's first post is reached ("end"). A post's pictures (a video's cover) are saved in
img/x/ at the size they were posted, because the picture links X hands out can stop working; the pictures of posts no
longer listed are deleted. Each post keeps all its pictures ("imgs": path, width, height), so the site can show them
whole, a post of several dealt as a hand of cards like a collection on the works wall.
Each post also keeps its reposts ("rt") and likes ("like"). A new post comes with them; the listed ones are read
again once a day ("counted"), just those posts and nothing else, which X bills like any read (about US$0.2 a month).
A post deleted on X stays listed until newer ones push it out. Writes only when the list changed.

.github/workflows/x-latest.yml runs this every hour with the four secrets and commits what changed. When X is busy or
the network fails, the list stays as it is until the next hour. When the keys stop working or the credits run out,
the list also stays, and the run fails once a day (around 09:00 in Taiwan, or whenever it is run by hand), so GitHub
sends an email. The keys are never printed. It needs nothing but Python's own modules, so it runs there as it is.
"""
import base64
import hashlib
import hmac
import html
import json
import os
import re
import secrets
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

API = 'https://api.x.com/2'
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'x-latest.json')
PICS = os.path.join(ROOT, 'img', 'x')
N = 5
LOUD_HOUR = 1   # UTC: keys that stopped working fail the scheduled run in this hour only, so one email a day
KEYS = ('X_API_KEY', 'X_API_SECRET', 'X_ACCESS_TOKEN', 'X_ACCESS_SECRET')
COUNTS_EVERY = 24 * 3600   # seconds: how often the listed posts' reposts and likes are read again (each read is billed)
HEAD = {'User-Agent': 'site-latest-posts'}


class Passing(Exception):
    """A failure the next run will likely not meet: the network, or X busy."""


class Broken(Exception):
    """A failure that stays until someone fixes it: the keys, the app's setup, or no credits left."""


def q(s):
    return urllib.parse.quote(str(s), safe='')


def signed(url, params):
    """The OAuth 1.0a header for a GET to url with params, signed with the app's keys and the account's token."""
    env = os.environ
    oauth = {'oauth_consumer_key': env['X_API_KEY'], 'oauth_nonce': secrets.token_hex(16), 'oauth_signature_method': 'HMAC-SHA1',
             'oauth_timestamp': str(int(time.time())), 'oauth_token': env['X_ACCESS_TOKEN'], 'oauth_version': '1.0'}
    pairs = sorted((q(k), q(v)) for k, v in {**params, **oauth}.items())
    base = '&'.join(['GET', q(url), q('&'.join(f'{k}={v}' for k, v in pairs))])
    key = f"{q(env['X_API_SECRET'])}&{q(env['X_ACCESS_SECRET'])}"
    oauth['oauth_signature'] = base64.b64encode(hmac.new(key.encode(), base.encode(), hashlib.sha1).digest()).decode()
    return 'OAuth ' + ', '.join(f'{q(k)}="{q(v)}"' for k, v in sorted(oauth.items()))


def call(path, **params):
    """One X API call. The keys go in a header, which is never printed."""
    url = f'{API}/{path}'
    req = urllib.request.Request(f'{url}?{urllib.parse.urlencode(params)}' if params else url,
                                 headers={**HEAD, 'Authorization': signed(url, params)})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        try:
            err = json.loads(e.read())
            msg = f"{err.get('title') or err.get('error') or 'error'}: {err.get('detail') or err.get('errors') or ''}"
        except ValueError:
            msg = 'no details'
        msg = f'HTTP {e.code}, {msg}'[:300]
        raise (Passing if e.code == 429 or e.code >= 500 else Broken)(msg) from None
    except OSError as e:   # no network, a timeout
        raise Passing(str(getattr(e, 'reason', e))) from None


def ending(data):
    """The file ending for a picture's bytes, or None when they are not a JPEG, WebP or PNG picture."""
    if data[:3] == b'\xff\xd8\xff':
        return '.jpg'
    if data[:4] == b'RIFF' and data[8:12] == b'WEBP':
        return '.webp'
    if data[:8] == b'\x89PNG\r\n\x1a\n':
        return '.png'
    return None


def size(data):
    """(width, height) of a JPEG, PNG or WebP picture from its bytes, or (0, 0)."""
    try:
        if data[:8] == b'\x89PNG\r\n\x1a\n':
            return int.from_bytes(data[16:20], 'big'), int.from_bytes(data[20:24], 'big')
        if data[:4] == b'RIFF' and data[8:12] == b'WEBP':
            kind = data[12:16]
            if kind == b'VP8X':
                return int.from_bytes(data[24:27], 'little') + 1, int.from_bytes(data[27:30], 'little') + 1
            if kind == b'VP8 ':
                return int.from_bytes(data[26:28], 'little') & 0x3fff, int.from_bytes(data[28:30], 'little') & 0x3fff
            if kind == b'VP8L':
                b = int.from_bytes(data[21:25], 'little')
                return (b & 0x3fff) + 1, ((b >> 14) & 0x3fff) + 1
        if data[:2] == b'\xff\xd8':   # JPEG: the first frame header (SOF) holds the size
            k = 2
            while k + 9 < len(data):
                if data[k] != 0xff:
                    k += 1
                    continue
                marker, length = data[k + 1], int.from_bytes(data[k + 2:k + 4], 'big')
                if 0xc0 <= marker <= 0xcf and marker not in (0xc4, 0xc8, 0xcc):
                    return int.from_bytes(data[k + 7:k + 9], 'big'), int.from_bytes(data[k + 5:k + 7], 'big')
                k += 2 + length
    except (IndexError, ValueError):
        pass
    return 0, 0


def saved(name):
    """A picture already saved (img/x/<name>.jpg ...), as (path, its bytes), or None."""
    for end in ('.jpg', '.webp', '.png'):
        path = os.path.join(PICS, name + end)
        if os.path.exists(path):
            return f'img/x/{name}{end}', open(path, 'rb').read()
    return None


def picture(name, src, new):
    """(path, bytes) of one picture: the one saved already as img/x/<name>.*, or fetched from src (and put into new as
    {file path: bytes}); None when it is not a JPEG, WebP or PNG picture."""
    have = saved(name)
    if have:
        return have
    try:
        data = download(src)
    except OSError as e:
        raise Passing(f'a picture did not download ({getattr(e, "reason", e)})') from None
    end = ending(data)
    if not end:
        print(f'::warning::{name}: not a JPEG, WebP or PNG picture, so it is left out')
        return None
    path = f'img/x/{name}{end}'
    new[os.path.join(ROOT, *path.split('/'))] = data
    return path, data


def download(src):
    """A picture's bytes at the size it was posted (name=orig), or as linked when X has no such size."""
    base, dot, ext = src.rpartition('.')
    tries = [f'{base}?format={ext}&name=orig', src] if dot and '/' not in ext and '?' not in src else [src]
    for k, link in enumerate(tries):
        try:
            with urllib.request.urlopen(urllib.request.Request(link, headers=HEAD), timeout=60) as r:
                return r.read()
        except urllib.error.HTTPError:
            if k == len(tries) - 1:
                raise
    return b''


def metrics(t):
    """A post's (reposts, likes)."""
    m = t.get('public_metrics') or {}
    return m.get('retweet_count', 0), m.get('like_count', 0)


def words(t):
    """A post's words as shown: X's links (t.co, which stand for its pictures and other pages) left out."""
    return re.sub(r'\s*https://t\.co/\w+', '', html.unescape(t.get('text') or '')).strip()


PARAMS = {'exclude': 'retweets,replies', 'expansions': 'attachments.media_keys',
          'tweet.fields': 'created_at,attachments,referenced_tweets,public_metrics', 'media.fields': 'type,url,preview_image_url'}


def with_pictures(got, user, new):
    """The posts in one API answer that the site shows: the account's own, not quotes, with a picture (posts of words
    only stay off the site, the user's wish). Each keeps all its pictures, up to X's four (a video's cover stands for
    it), as [path, width, height]: img/x/<id>.* for the first, <id>_2.* and on for the rest. A picture already saved
    is not fetched again; a new one goes into new as {file path: bytes}."""
    media = {m['media_key']: m for m in (got.get('includes') or {}).get('media') or []}
    out = []
    for t in got.get('data') or []:
        keys = (t.get('attachments') or {}).get('media_keys') or []
        if not keys or any(r.get('type') == 'quoted' for r in t.get('referenced_tweets') or []):
            continue
        imgs = []
        for k, key in enumerate(keys[:4]):
            m = media.get(key) or {}
            src = m.get('url') or m.get('preview_image_url')
            got_pic = src and picture(t['id'] if k == 0 else f"{t['id']}_{k + 1}", src, new)
            if got_pic:
                w, h = size(got_pic[1])
                if w and h:
                    imgs.append([got_pic[0], w, h])
        if not imgs:
            continue
        rt, like = metrics(t)
        out.append({'id': t['id'], 'url': f"https://x.com/{user or 'i'}/status/{t['id']}", 'd': (t.get('created_at') or '')[:10],
                    'text': words(t), 'imgs': imgs, 'rt': rt, 'like': like})
    return out


def read_posts(old):
    """(user, uid, the newest posts, the newest post id seen, the new pictures to save as {path: bytes}, when the
    counts were read, how far back the list has been filled from). Nothing is written here, so a failure halfway
    leaves no picture behind."""
    old = old or {}
    if old.get('uid'):
        uid, user = old['uid'], old.get('user', '')
    else:
        me = call('users/me').get('data') or {}
        if not me.get('id'):
            raise Broken('the keys reach no account')
        uid, user = me['id'], me.get('username', '')
    since = old.get('since')
    got = call(f'users/{uid}/tweets', **PARAMS, max_results=10 if old else 20, **({'since_id': since} if since else {}))
    for t in got.get('data') or []:
        since = max(since or '0', t['id'], key=int)
    new = {}
    fresh = with_pictures(got, user, new)
    known = {p['id'] for p in fresh}
    listed = [p for p in old.get('posts', []) if p['id'] not in known and (p.get('imgs') or p.get('img'))]
    if any('imgs' not in p for p in listed):   # listed before all pictures and their sizes were kept: read them once more
        ids = [int(p['id']) for p in listed]
        again = with_pictures(call(f'users/{uid}/tweets', **PARAMS, max_results=min(100, len(ids) + 10),
                                   since_id=str(min(ids) - 1), until_id=str(max(ids) + 1)), user, new)
        by = {p['id']: p for p in again}
        listed = [by[p['id']] for p in listed if p['id'] in by]
        known |= set(by)
    posts = (fresh + listed)[:N]
    # fewer than five with pictures: one page further back, at most once a day, until the account's start ("end")
    back, backed = old.get('back'), old.get('backed', 0)
    if len(posts) < N and back != 'end' and time.time() - backed >= COUNTS_EVERY:
        ids = [int(p['id']) for p in old.get('posts', []) + posts] + ([int(back)] if back else [])
        page = call(f'users/{uid}/tweets', **PARAMS, max_results=20, **({'until_id': str(min(ids))} if ids else {}))
        older = with_pictures(page, user, new)
        known |= {p['id'] for p in older}
        posts = (posts + [p for p in older if p['id'] not in {q['id'] for q in posts}])[:N]
        seen = [int(t['id']) for t in page.get('data') or []]
        back = str(min(seen)) if seen and (page.get('meta') or {}).get('next_token') else 'end'
        backed = int(time.time())
    counted = old.get('counted', 0)
    kept = [int(p['id']) for p in posts if p['id'] not in known]
    if kept and time.time() - counted >= COUNTS_EVERY:   # once a day: the listed posts' counts again, and nothing more
        again = call(f'users/{uid}/tweets', **{'exclude': 'retweets,replies', 'max_results': min(100, len(kept) + 10),
                                              'since_id': str(min(kept) - 1), 'until_id': str(max(kept) + 1),
                                              'tweet.fields': 'public_metrics'})
        now = {t['id']: metrics(t) for t in again.get('data') or []}
        for p in posts:
            if p['id'] in now:
                p['rt'], p['like'] = now[p['id']]
        counted = int(time.time())
    return user, uid, since, posts, new, counted, back, backed


def main():
    if not all(os.environ.get(k) for k in KEYS):
        print('the X keys are not set: nothing to do (tools/README.md says how to set them up)')
        return 0
    old = json.load(open(OUT, encoding='utf-8')) if os.path.exists(OUT) else None
    try:
        user, uid, since, posts, new, counted, back, backed = read_posts(old)
    except Passing as e:
        print(f'::warning::X could not be read this time ({e}); the list stays as it is')
        return 0
    except Broken as e:
        loud = os.environ.get('GITHUB_EVENT_NAME') != 'schedule' or time.gmtime().tm_hour == LOUD_HOUR
        print(f"::{'error' if loud else 'warning'}::X: {e}. The list stays as it is; tools/README.md says what to check.")
        return 1 if loud else 0
    if not posts:
        print('::warning::X gave no posts of the account\'s own with a picture; the list stays as it is')
        return 0
    os.makedirs(PICS, exist_ok=True)
    for path, data in new.items():
        with open(path, 'wb') as f:
            f.write(data)
    keep = {i[0].rsplit('/', 1)[1] for p in posts for i in p['imgs']}
    for f in os.listdir(PICS):
        if f not in keep:
            os.remove(os.path.join(PICS, f))
    listed = {'user': user, 'uid': uid, 'since': since, 'counted': counted, 'back': back, 'backed': backed, 'posts': posts}
    if listed == old:
        print('no new posts')
        return 0
    with open(OUT, 'w', encoding='utf-8', newline='\n') as f:
        f.write(json.dumps(listed, ensure_ascii=False, indent=1) + '\n')
    print('updated:', ', '.join(p['id'] for p in posts))
    return 0


if __name__ == '__main__':
    sys.exit(main())
