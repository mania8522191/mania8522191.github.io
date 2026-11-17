"""The latest posts on X, for the home page: x-latest.json at the site's root, and their pictures in img/x/.

usage: python tools/x_latest.py   (X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN and X_ACCESS_SECRET must hold the X app's
keys; without them this does nothing)

Reads the account's own posts through the X API, signed in as the account itself (its app's access token), so X bills
them at its owned-reads price. X bills every post it returns, so:
- it asks only for posts newer than the newest one already seen ("since" in the list), and an hour without a new
  post costs nothing;
- reposts and replies are not asked for, and quotes are left out (showing the post they quote would cost more);
- the only extra it asks for is each post's pictures.
Keeps the six newest, newest first. A post's first picture (a video's cover) is saved in img/x/ at the size it was
posted, because the picture links X hands out can stop working; the pictures of posts no longer listed are deleted.
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
N = 6
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


def read_posts(old):
    """(user, the newest posts, the newest post id seen, the new pictures to save as {path: bytes}). Nothing is
    written here, so a failure halfway leaves no picture behind."""
    if old and old.get('uid'):
        uid, user = old['uid'], old.get('user', '')
    else:
        me = call('users/me').get('data') or {}
        if not me.get('id'):
            raise Broken('the keys reach no account')
        uid, user = me['id'], me.get('username', '')
    params = {'exclude': 'retweets,replies', 'max_results': 10 if old else 20, 'expansions': 'attachments.media_keys',
              'tweet.fields': 'created_at,attachments,referenced_tweets,public_metrics', 'media.fields': 'type,url,preview_image_url'}
    since = (old or {}).get('since')
    if since:
        params['since_id'] = since
    got = call(f'users/{uid}/tweets', **params)
    media = {m['media_key']: m for m in (got.get('includes') or {}).get('media') or []}
    fresh, new = [], {}
    for t in got.get('data') or []:
        since = max(since or '0', t['id'], key=int)
        if any(r.get('type') == 'quoted' for r in t.get('referenced_tweets') or []):
            continue
        keys = (t.get('attachments') or {}).get('media_keys') or []
        first = media.get(keys[0]) if keys else None
        rt, like = metrics(t)
        post = {'id': t['id'], 'url': f"https://x.com/{user or 'i'}/status/{t['id']}", 'd': (t.get('created_at') or '')[:10],
                'text': words(t), 'kind': 'text', 'rt': rt, 'like': like}
        if first:
            post['kind'] = 'album' if len(keys) > 1 else 'image' if first.get('type') == 'photo' else 'video'
            src = first.get('url') or first.get('preview_image_url')
            if src:
                try:
                    data = download(src)
                except OSError as e:
                    raise Passing(f'a picture did not download ({getattr(e, "reason", e)})') from None
                end = ending(data)
                if end:
                    post['img'] = f"img/x/{t['id']}{end}"
                    new[os.path.join(ROOT, *post['img'].split('/'))] = data
                else:
                    print(f"::warning::post {t['id']}: its picture is not a JPEG, WebP or PNG file, so it is shown without it")
        if post['text'] or post.get('img'):
            fresh.append(post)
    known = {p['id'] for p in fresh}
    posts = (fresh + [p for p in (old or {}).get('posts', []) if p['id'] not in known])[:N]
    counted = (old or {}).get('counted', 0)
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
    return user, uid, since, posts, new, counted


def main():
    if not all(os.environ.get(k) for k in KEYS):
        print('the X keys are not set: nothing to do (tools/README.md says how to set them up)')
        return 0
    old = json.load(open(OUT, encoding='utf-8')) if os.path.exists(OUT) else None
    try:
        user, uid, since, posts, new, counted = read_posts(old)
    except Passing as e:
        print(f'::warning::X could not be read this time ({e}); the list stays as it is')
        return 0
    except Broken as e:
        loud = os.environ.get('GITHUB_EVENT_NAME') != 'schedule' or time.gmtime().tm_hour == LOUD_HOUR
        print(f"::{'error' if loud else 'warning'}::X: {e}. The list stays as it is; tools/README.md says what to check.")
        return 1 if loud else 0
    if not posts:
        print('::warning::X gave no posts of the account\'s own; the list stays as it is')
        return 0
    os.makedirs(PICS, exist_ok=True)
    for path, data in new.items():
        with open(path, 'wb') as f:
            f.write(data)
    keep = {p['img'].rsplit('/', 1)[1] for p in posts if p.get('img')}
    for f in os.listdir(PICS):
        if f not in keep:
            os.remove(os.path.join(PICS, f))
    listed = {'user': user, 'uid': uid, 'since': since, 'counted': counted, 'posts': posts}
    if listed == old:
        print('no new posts')
        return 0
    with open(OUT, 'w', encoding='utf-8', newline='\n') as f:
        f.write(json.dumps(listed, ensure_ascii=False, indent=1) + '\n')
    print('updated:', ', '.join(p['id'] for p in posts))
    return 0


if __name__ == '__main__':
    sys.exit(main())
