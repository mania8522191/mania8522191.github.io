"""After a push: wait for GitHub Pages to publish the commit, then check the live site serves the same files.

usage: python tools/check_deploy.py [commit] [extra file ...]

  commit       the commit to wait for (default: the current one, HEAD)
  extra file   more files to compare besides index.html, site.css, site.js, css/ and js/, e.g. img/z/o-56.webp

Polls the GitHub Actions runs of the repository every 20 s (up to 15 min), then compares each file's SHA-256
with the live copy. Exit code 0 when the deploy succeeded and every file matches. A deploy that timed out on
GitHub's side can be retried with an empty commit: git commit --allow-empty -m "Redeploy" && git push.
"""
import hashlib
import json
import os
import subprocess
import sys
import time
import urllib.request

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import common as C   # noqa: E402

REPO = 'mania8522191/mania8522191.github.io'
SITE = 'https://mania8522191.github.io/'


def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'site-deploy-check', 'Cache-Control': 'no-cache'})
    return urllib.request.urlopen(req, timeout=30).read()


def main(argv):
    sha = argv[0] if argv and not os.path.exists(os.path.join(C.ROOT, argv[0])) else 'HEAD'
    extra = argv[1:] if sha != 'HEAD' else argv
    sha = subprocess.run(['git', '-C', C.ROOT, 'rev-parse', sha], capture_output=True, text=True, check=True).stdout.strip()
    state = None
    for _ in range(45):
        runs = json.loads(get(f'https://api.github.com/repos/{REPO}/actions/runs?per_page=10'))['workflow_runs']
        run = next((r for r in runs if r['head_sha'] == sha), None)
        state = (run['status'], run['conclusion']) if run else ('not started', None)
        print(time.strftime('%H:%M:%S'), sha[:7], *state, flush=True)
        if run and run['status'] == 'completed':
            break
        time.sleep(20)
    files = ['index.html', 'site.css', 'site.js'] + [f'{d}/{f}' for d in ('css', 'js') for f in sorted(os.listdir(os.path.join(C.ROOT, d)))] + extra
    bad = []
    for _ in range(6):   # the CDN can lag a little behind the deploy
        bad = []
        for f in files:
            local = hashlib.sha256(open(os.path.join(C.ROOT, f), 'rb').read().replace(b'\r\n', b'\n') if not f.startswith(('img/', 'audio/'))
                                   else open(os.path.join(C.ROOT, f), 'rb').read()).hexdigest()   # pictures and sounds as they are
            live = hashlib.sha256(get(f'{SITE}{f}?nocache={int(time.time())}')).hexdigest()
            if live != local:
                bad.append(f)
        if not bad:
            break
        time.sleep(15)
    print(f'deploy: {state[1]} | {len(files) - len(bad)}/{len(files)} files match' + (f' | differ: {", ".join(bad)}' if bad else ''))
    return 0 if state[1] == 'success' and not bad else 1


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
