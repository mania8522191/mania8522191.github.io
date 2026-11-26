/* Board (#board): visitors' posts, and the form to send one; the review page (#board-admin), where the site's owner
   accepts, answers or deletes them. The back end is worker/ (a Cloudflare Worker; tools/README.md: 留言板): a post
   waits there unseen until it is accepted. A visitor's picture is drawn again in their browser before it is sent, at
   most 4096 px on its long side (so a photo's hidden details, such as where it was taken, never leave it), with a small
   copy for the board; the owner's own pictures in a reply go as they are, with a small copy */
const BD_LOCAL = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);   // the local preview: the back end of `npm run dev`
const BD_API = BD_LOCAL ? 'http://127.0.0.1:8787' : 'https://board.mania8522191.workers.dev';
const BD_TS_KEY = BD_LOCAL ? '1x00000000000000000000AA' : '0x4AAAAAAGT-3-bQwD_zvJc5';   // Turnstile's site key, widget "board" (locally Cloudflare's test key: always passes)
const BD_PICS = 4, BD_SENT = 8 << 20, BD_OWN = 24 << 20, BD_SMALL = 1 << 20;   // what the back end takes
const BD_ERRS = new Set(['name', 'empty', 'long', 'pics', 'pic', 'big', 'human', 'wait', 'slow', 'full', 'net', 'password', 'auth', 'setup', 'gone']);
const bdForm = $('#bd-form'), bdPosts = $('#bd-posts'), bdRvPosts = $('#bd-rv-posts'), bdThumbsEl = $('#bd-thumbs'), bdDrop = $('#bd-drop');
const bdById = new Map();   // every post drawn, for its pictures' windows (js/lightbox.js: ZV_SETS.board)
let bdShown = [], bdRv = [], bdLoaded = 0, bdBusy = false, bdTs = null, bdTsToken = '', bdKeyNow = '', bdState = 'wait', bdKey = '';
try { bdKey = localStorage.getItem('bdKey') || ''; } catch (e) { /* no storage: the password each visit */ }
const bdPicked = [];   // the form's pictures: { url (to show it), ready (the copies to send) }

/* a line under a form: what happened, or what went wrong (in red) */
function bdSay(box, key, vars) {
  box.textContent = key ? tr(key, vars) : '';
  box.classList.toggle('err', !!key && key.startsWith('board.e.'));
}
const bdErr = (e) => 'board.e.' + (BD_ERRS.has(e && e.message) ? e.message : 'server');
const bdDate = (ms, time) => {
  const d = new Date(ms), p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}.${p(d.getMonth() + 1)}.${p(d.getDate())}${time ? ` ${p(d.getHours())}:${p(d.getMinutes())}` : ''}`;
};
async function bdCall(path, opt = {}) {
  const headers = { ...(opt.headers || {}) };
  if (path.startsWith('/admin/') && bdKey) headers.Authorization = 'Bearer ' + bdKey;
  let r;
  try { r = await fetch(BD_API + path, { ...opt, headers }); } catch (e) { throw new Error('net'); }
  const d = await r.json().catch(() => ({}));
  if (r.status === 401 && path !== '/admin/login') bdLogout();
  if (!r.ok) throw new Error(d.error || 'server');
  return d;
}
/* a form with pictures, saying how much of it has gone */
function bdSend(path, fd, progress) {
  return new Promise((ok, no) => {
    const x = new XMLHttpRequest();
    x.open('POST', BD_API + path);
    if (path.startsWith('/admin/')) x.setRequestHeader('Authorization', 'Bearer ' + bdKey);
    x.upload.addEventListener('progress', (e) => { if (e.lengthComputable) progress(Math.round((e.loaded / e.total) * 100)); });
    x.addEventListener('load', () => {
      let d = {};
      try { d = JSON.parse(x.responseText); } catch (e) { /* not an answer: an error */ }
      if (x.status === 401) bdLogout();
      if (x.status >= 200 && x.status < 300) ok(d); else no(new Error(d.error || 'server'));
    });
    x.addEventListener('error', () => no(new Error('net')));
    x.send(fd);
  });
}

/* ---------- a post ---------- */
const bdUrl = (q, size) => `${BD_API}/pic/${q.id}/${size}`;
function bdSrc(img, q, admin) {   // its small copy; the review page's come with the key (a waiting post's are not public)
  if (!admin) { img.src = bdUrl(q, 's'); return; }
  if (q.blob) { img.src = q.blob; return; }
  fetch(`${BD_API}/admin/pic/${q.id}/s`, { headers: { Authorization: 'Bearer ' + bdKey } })
    .then((r) => (r.ok ? r.blob() : Promise.reject(new Error('gone'))))
    .then((b) => { q.blob = URL.createObjectURL(b); img.src = q.blob; })
    .catch(() => { /* gone: the list shows it on its next load */ });
}
const bdOrder = (p) => [...p.pics.filter((q) => q.who === 'guest'), ...p.pics.filter((q) => q.who === 'reply')];
function bdItems(id) {   // a post's pictures in a window: the visitor's, then the reply's
  const p = bdById.get(id), list = p ? bdOrder(p) : [];
  return list.map((q, k) => ({
    src: q.blob || bdUrl(q, 's'), zsrc: q.blob ? null : bdUrl(q, 'o'), eager: true,
    w: q.sw, h: q.sh, zw: q.blob ? q.sw : q.w,
    no: `${k + 1} / ${list.length}`, cap: q.who === 'reply' ? `${tr('board.after')} · ${p.name}` : p.name,
    alt: `${p.name} · ${k + 1}`,
  }));
}
function bdOpen(id, at, from) { bdKeyNow = id; zvOpen('board', at, from); }
function bdPic(p, q, at, admin) {
  const b = el('button', 'bd-pic'), img = el('img');
  b.type = 'button';
  img.alt = `${p.name} · ${at + 1}`;
  img.width = q.sw;
  img.height = q.sh;
  img.loading = 'lazy';
  img.decoding = 'async';
  bdSrc(img, q, admin);
  b.append(img);
  b.addEventListener('click', () => bdOpen(p.id, at, img));
  if (!admin) return b;
  const box = el('div', 'bd-pw'), save = el('button', 'bd-orig', tr('board.orig'));   // the review page: save it as it was sent, to paint over it
  save.type = 'button';
  save.dataset.i18n = 'board.orig';
  save.addEventListener('click', () => bdSaveOrig(p, q, at));
  box.append(b, save);
  return box;
}
function bdRow(p, list, from, admin) {
  const row = el('div', 'bd-pics');
  row.dataset.n = list.length;
  list.forEach((q, k) => row.append(bdPic(p, q, from + k, admin)));
  return row;
}
/* the visitor's picture with the owner's paintover over it: drag across it (or press the arrow keys) to move the line */
function bdCompare(p, a, b, at, admin) {
  const fig = el('figure', 'bd-cmp'), pa = el('img', 'bd-a'), pb = el('img', 'bd-b');
  fig.style.aspectRatio = `${a.sw} / ${a.sh}`;
  fig.style.width = `min(100%, calc(min(72vh, 680px) * ${(a.sw / a.sh).toFixed(4)}))`;   // a tall one no taller than the screen
  bdSrc(pa, a, admin);
  bdSrc(pb, b, admin);
  const line = el('span', 'bd-line'), la = el('span', 'bd-la', tr('board.before')), lb = el('span', 'bd-lb', tr('board.after'));
  line.setAttribute('aria-hidden', 'true');
  line.innerHTML = '<i><svg viewBox="0 0 24 24"><path d="M9 7l-5 5 5 5M15 7l5 5-5 5"/></svg></i>';
  la.dataset.i18n = pa.dataset.i18nAlt = 'board.before';
  lb.dataset.i18n = pb.dataset.i18nAlt = 'board.after';
  pa.alt = la.textContent;
  pb.alt = lb.textContent;
  const range = el('input');
  Object.assign(range, { type: 'range', min: 0, max: 100, step: 1, value: 50 });
  range.dataset.i18nAria = 'board.cmp';
  range.setAttribute('aria-label', tr('board.cmp'));
  const zoom = el('button', 'bd-zoom');
  zoom.type = 'button';
  zoom.dataset.i18nAria = zoom.dataset.i18nTitle = 'board.zoom';
  zoom.title = tr('board.zoom');
  zoom.setAttribute('aria-label', zoom.title);
  zoom.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.5 3.5a7 7 0 1 0 0 14a7 7 0 1 0 0-14ZM15.5 15.5 20.5 20.5M10.5 7.5v6M7.5 10.5h6"/></svg>';
  zoom.addEventListener('click', () => bdOpen(p.id, at, pb));
  const put = (v) => { const x = Math.max(0, Math.min(100, v)); fig.style.setProperty('--x', `${x}%`); range.value = x; };
  const toward = (e) => { const r = fig.getBoundingClientRect(); put(((e.clientX - r.left) / r.width) * 100); };
  range.addEventListener('input', () => put(+range.value));
  fig.addEventListener('pointerdown', (e) => {
    if (e.button !== 0 || e.target.closest('.bd-zoom')) return;
    toward(e);
    fig.setPointerCapture(e.pointerId);
    fig.classList.add('drag');
  });
  fig.addEventListener('pointermove', (e) => { if (fig.hasPointerCapture(e.pointerId)) toward(e); });
  const end = () => fig.classList.remove('drag');
  fig.addEventListener('pointerup', end);
  fig.addEventListener('pointercancel', end);   // (a swipe up or down: the page scrolls)
  fig.append(pa, pb, line, la, lb, range, zoom);
  return fig;
}
function bdReplyBox(p, admin) {
  const guest = p.pics.filter((q) => q.who === 'guest'), mine = p.pics.filter((q) => q.who === 'reply');
  const box = el('div', 'bd-reply'), k = el('p', 'bd-rk'), who = el('span', '', tr('board.reply'));
  who.dataset.i18n = 'board.reply';
  k.append(who);
  if (p.reply_at) k.append(el('time', 'bd-date', bdDate(p.reply_at)));
  box.append(k);
  if (p.reply) box.append(el('p', 'bd-words', p.reply));
  const a = guest[0], b = mine[0];
  const pair = a && b && Math.abs(a.sw / a.sh - b.sw / b.sh) <= 0.04 * (a.sw / a.sh);   // the same picture painted over: one over the other
  if (pair) box.append(bdCompare(p, a, b, guest.length, admin));
  const rest = pair ? mine.slice(1) : mine;
  if (rest.length) box.append(bdRow(p, rest, guest.length + mine.length - rest.length, admin));
  return box;
}
function bdCard(p, admin) {
  bdById.set(p.id, p);
  const li = el('li', 'bd-post'), head = el('div', 'bd-head');
  head.append(el('span', 'bd-who', p.name), el('time', 'bd-date', bdDate(p.at, admin)));
  li.append(head);
  if (p.text) li.append(el('p', 'bd-words', p.text));
  const guest = p.pics.filter((q) => q.who === 'guest');
  if (guest.length) li.append(bdRow(p, guest, 0, admin));
  if (p.reply || p.pics.some((q) => q.who === 'reply')) li.append(bdReplyBox(p, admin));
  if (admin) li.append(...bdTools(p, li));
  return li;
}
function bdReveal(els) {   // new posts tween in as they scroll into view, as the rest of the page does (js/motion.js)
  if (!io) return;
  els.forEach((e) => { e.dataset.rv = 'up'; e.classList.add('rv-pre'); });
  watch(els);
}

/* ---------- the board ---------- */
async function bdLoad(more) {
  const last = more && bdShown[bdShown.length - 1], note = $('#bd-empty');
  try {
    const d = await bdCall('/posts' + (last ? `?before=${last.at}` : ''));
    if (!more) { bdShown = []; bdPosts.replaceChildren(); }
    bdShown.push(...d.posts);
    const cards = d.posts.map((p) => bdCard(p, false));
    bdPosts.append(...cards);
    bdReveal(cards);
    $('#bd-more').hidden = !d.more;
    note.dataset.i18n = 'board.empty';
    note.hidden = bdShown.length > 0;
    bdLoaded = Date.now();
  } catch (e) {
    note.dataset.i18n = bdErr(e);
    note.hidden = false;
  }
  note.textContent = tr(note.dataset.i18n);
}
$('#bd-more').addEventListener('click', () => bdLoad(true));
function boardShow(admin) {   // js/router.js: apply (#board-admin: the review page)
  $('#bd-grid').hidden = admin;
  $('#bd-admin').hidden = !admin;
  if (admin) { bdAdminView(); return; }
  bdTsLoad();
  if (Date.now() - bdLoaded > 60000) bdLoad(false);
}

/* the spam check (Cloudflare Turnstile), loaded the first time the board is opened */
function bdTsLoad() {
  if (bdTs || !BD_TS_KEY) return;
  bdTs = 'loading';
  window.bdTsReady = () => {
    bdTs = turnstile.render('#bd-ts', {
      sitekey: BD_TS_KEY, theme: 'dark', size: 'flexible', language: { zh: 'zh-tw', en: 'en', ja: 'ja' }[LANG],
      callback: (t) => { bdTsToken = t; },
      'expired-callback': () => { bdTsToken = ''; },
      'error-callback': () => { bdTsToken = ''; },
    });
  };
  const s = el('script');
  s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=bdTsReady';
  s.async = true;
  document.head.append(s);
}
function bdTsReset() {   // a token is good for one post
  bdTsToken = '';
  if (bdTs && bdTs !== 'loading' && window.turnstile) turnstile.reset(bdTs);
}

/* ---------- the form ---------- */
/* a picture drawn again, at most side px on its long side, as WebP (JPEG on white where the browser cannot write it),
   made smaller till it is under max bytes */
async function bdDraw(bmp, side, q, max) {
  let k = Math.min(1, side / Math.max(bmp.width, bmp.height));
  for (;;) {
    const w = Math.max(1, Math.round(bmp.width * k)), h = Math.max(1, Math.round(bmp.height * k)), c = el('canvas');
    c.width = w;
    c.height = h;
    const g = c.getContext('2d');
    g.drawImage(bmp, 0, 0, w, h);
    let blob = await new Promise((r) => c.toBlob(r, 'image/webp', q));
    if (!blob || blob.type !== 'image/webp') {
      g.globalCompositeOperation = 'destination-over';
      g.fillStyle = '#fff';
      g.fillRect(0, 0, w, h);
      blob = await new Promise((r) => c.toBlob(r, 'image/jpeg', q));
    }
    if (!blob) throw new Error('pic');
    if (blob.size <= max || k < 0.1) return { blob };
    if (q > 0.65) q -= 0.1; else k *= 0.8;
  }
}
async function bdPrep(file, max, own) {   // the two copies to send: as sent (o) and small (s)
  const bmp = await createImageBitmap(file);
  try {
    const s = await bdDraw(bmp, 1200, 0.85, BD_SMALL);
    const asIs = own && file.size <= max && /^image\/(jpeg|png|webp|gif)$/.test(file.type);   // the owner's own picture, untouched
    return { o: asIs ? { blob: file } : await bdDraw(bmp, own ? 1e5 : 4096, 0.92, max), s };
  } finally {
    bmp.close();
  }
}
function bdThumb(url, label, drop) {   // a picture picked, with its × to take it out
  const li = el('li'), img = el('img'), x = el('button', 'bd-x', '×');
  img.src = url;
  img.alt = '';
  x.type = 'button';
  x.dataset.i18nAria = 'board.remove';
  x.setAttribute('aria-label', label);
  x.addEventListener('click', drop);
  li.append(img, x);
  return li;
}
function bdThumbs() {
  bdThumbsEl.replaceChildren(...bdPicked.map((q) => bdThumb(q.url, tr('board.remove'), () => bdUnpick(q))));
  $('#bd-add').hidden = bdPicked.length >= BD_PICS;
}
function bdUnpick(q) {
  const i = bdPicked.indexOf(q);
  if (i < 0) return;
  bdPicked.splice(i, 1);
  URL.revokeObjectURL(q.url);
  bdThumbs();
}
function bdPick(files) {
  const st = $('#bd-status');
  for (const f of files) {
    if (!/^image\//.test(f.type)) continue;
    if (bdPicked.length >= BD_PICS) { bdSay(st, 'board.e.pics'); break; }
    const q = { url: URL.createObjectURL(f), ready: bdPrep(f, BD_SENT, false) };
    q.ready.catch(() => { bdUnpick(q); bdSay(st, 'board.e.pic'); });
    bdPicked.push(q);
  }
  bdThumbs();
}
const bdFile = $('#bd-file'), bdName = $('#bd-name');
$('#bd-add').addEventListener('click', () => bdFile.click());
bdFile.addEventListener('change', () => { bdPick([...bdFile.files]); bdFile.value = ''; });
bdForm.addEventListener('paste', (e) => {
  const files = [...(e.clipboardData ? e.clipboardData.files : [])];
  if (files.length) { e.preventDefault(); bdPick(files); }
});
/* a file dragged anywhere over the board: the picture box lights up, and dropped, it is added (never opened in place of the page) */
VIEWS.board.addEventListener('dragover', (e) => {
  if (!e.dataTransfer.types.includes('Files')) return;
  e.preventDefault();
  bdDrop.classList.toggle('over', !$('#bd-grid').hidden);
});
VIEWS.board.addEventListener('dragleave', (e) => { if (!VIEWS.board.contains(e.relatedTarget)) bdDrop.classList.remove('over'); });
VIEWS.board.addEventListener('drop', (e) => {
  if (!e.dataTransfer.types.includes('Files')) return;
  e.preventDefault();
  bdDrop.classList.remove('over');
  if (!$('#bd-grid').hidden) bdPick([...e.dataTransfer.files]);
});
try { bdName.value = localStorage.getItem('bdName') || ''; } catch (e) { /* not kept */ }
bdName.addEventListener('change', () => { try { localStorage.setItem('bdName', bdName.value.trim()); } catch (e) { /* not kept */ } });
[bdName, $('#bd-text')].forEach((f) => f.addEventListener('input', () => { if ($('#bd-status').classList.contains('err')) bdSay($('#bd-status'), ''); }));   // typing again: the error goes
bdForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (bdBusy) return;
  const st = $('#bd-status'), send = $('#bd-send'), name = bdName.value.trim(), text = $('#bd-text').value.trim();
  if (!name) { bdSay(st, 'board.e.name'); bdName.focus(); return; }
  if (!text && !bdPicked.length) { bdSay(st, 'board.e.empty'); return; }
  if (!bdTsToken) { bdSay(st, 'board.e.wait'); return; }
  bdBusy = true;
  send.disabled = true;
  bdSay(st, 'board.sending', { p: 0 });
  try {
    const fd = new FormData();
    fd.append('name', name);
    fd.append('text', text);
    fd.append('lang', LANG);
    fd.append('ts', bdTsToken);
    (await Promise.all(bdPicked.map((q) => q.ready))).forEach((m, n) => { fd.append('o' + n, m.o.blob, 'o' + n); fd.append('s' + n, m.s.blob, 's' + n); });
    await bdSend('/posts', fd, (p) => bdSay(st, 'board.sending', { p }));
    $('#bd-text').value = '';
    bdPicked.splice(0).forEach((q) => URL.revokeObjectURL(q.url));
    bdThumbs();
    bdSay(st, 'board.sent');
  } catch (err) {
    bdSay(st, bdErr(err));
  } finally {
    bdBusy = false;
    send.disabled = false;
    bdTsReset();
  }
});

/* ---------- the review page ---------- */
function bdLogout() {
  bdKey = '';
  try { localStorage.removeItem('bdKey'); } catch (e) { /* nothing kept */ }
  bdAdminView();
}
function bdAdminView() {   // the password, or the posts
  $('#bd-login').hidden = !!bdKey;
  $('#bd-review').hidden = !bdKey;
  if (bdKey) bdReview(false);
}
$('#bd-login').addEventListener('submit', async (e) => {
  e.preventDefault();
  const st = $('#bd-login-st'), pw = $('#bd-pw');
  bdSay(st, '');
  try {
    const d = await bdCall('/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: pw.value }) });
    bdKey = d.token;
    try { localStorage.setItem('bdKey', bdKey); } catch (err) { /* kept for this visit only */ }
    pw.value = '';
    bdAdminView();
  } catch (err) {
    bdSay(st, bdErr(err));
  }
});
$('#bd-logout').addEventListener('click', bdLogout);
const bdTabs = document.querySelectorAll('.bd-tabs [role="tab"]');
bdTabs.forEach((t) => t.addEventListener('click', () => {
  bdState = t.dataset.state;
  bdTabs.forEach((x) => x.setAttribute('aria-selected', String(x === t)));
  bdReview(false);
}));
async function bdReview(more) {
  const st = $('#bd-rv-st'), last = more && bdRv[bdRv.length - 1];
  try {
    const d = await bdCall(`/admin/posts?state=${bdState}${last ? `&before=${last.at}` : ''}`);
    if (!more) {
      bdRv.forEach((p) => p.pics.forEach((q) => { if (q.blob) URL.revokeObjectURL(q.blob); }));
      bdRv = [];
      bdRvPosts.replaceChildren();
    }
    bdRv.push(...d.posts);
    bdRvPosts.append(...d.posts.map((p) => bdCard(p, true)));
    $('#bd-wait-n').textContent = d.wait;
    $('#bd-rv-more').hidden = !d.more;
    $('#bd-rv-empty').hidden = bdRv.length > 0;
    bdSay(st, '');
  } catch (err) {
    bdSay(st, bdErr(err));
  }
}
$('#bd-rv-more').addEventListener('click', () => bdReview(true));
function bdBtn(key, cls, fn) {
  const b = el('button', 'btn' + (cls ? ' ' + cls : ''), tr(key));
  b.type = 'button';
  b.dataset.i18n = key;
  b.addEventListener('click', fn);
  return b;
}
function bdGone(p, li) {   // accepted or deleted: off this list (and the board loads again when it is next opened)
  li.remove();
  bdRv = bdRv.filter((x) => x !== p);
  if (bdState === 'wait') $('#bd-wait-n').textContent = Math.max(0, +$('#bd-wait-n').textContent - 1);
  $('#bd-rv-empty').hidden = bdRv.length > 0;
  bdLoaded = 0;
}
function bdTools(p, li) {   // accept, delete, and the reply
  const bar = el('div', 'bd-tools'), st = el('p', 'bd-status');
  st.setAttribute('role', 'status');
  if (bdState === 'wait') {
    bar.append(bdBtn('board.accept', '', async () => {
      try { await bdCall(`/admin/posts/${p.id}/accept`, { method: 'POST' }); bdGone(p, li); } catch (e) { bdSay(st, bdErr(e)); }
    }));
  }
  bar.append(bdBtn('board.delete', 'ghost', async () => {
    if (!confirm(tr('board.sure'))) return;
    try { await bdCall(`/admin/posts/${p.id}`, { method: 'DELETE' }); bdGone(p, li); } catch (e) { bdSay(st, bdErr(e)); }
  }));
  return [bar, bdEditor(p), st];
}
/* the owner's reply: words, and pictures (a paintover first: it goes over the visitor's first picture, to compare) */
function bdEditor(p) {
  const box = el('details', 'bd-edit'), sum = el('summary', '', tr('board.replyEdit')), inside = el('div', 'bd-edit-in');
  sum.dataset.i18n = 'board.replyEdit';
  const ta = el('textarea'), thumbs = el('ul', 'bd-thumbs'), file = el('input'), add = el('button', 'bd-add'), st = el('p', 'bd-status');
  ta.rows = 4;
  ta.maxLength = 4000;
  ta.value = p.reply || '';
  ta.dataset.i18nAria = 'board.replyEdit';
  ta.setAttribute('aria-label', tr('board.replyEdit'));
  Object.assign(file, { type: 'file', accept: 'image/*', multiple: true, hidden: true });
  add.type = 'button';
  const addT = el('span', '', tr('board.addPic'));
  addT.dataset.i18n = 'board.addPic';
  add.append(el('span', '', '＋'), addT);
  const drop = new Set(), fresh = [], mine = p.pics.filter((q) => q.who === 'reply');
  const draw = () => {
    thumbs.replaceChildren(
      ...mine.map((q) => {
        const li = bdThumb('', tr('board.remove'), () => { if (!drop.delete(q.id)) drop.add(q.id); draw(); });
        bdSrc(li.querySelector('img'), q, true);
        li.classList.toggle('off', drop.has(q.id));
        return li;
      }),
      ...fresh.map((q) => {
        const li = bdThumb(q.url, tr('board.remove'), () => { fresh.splice(fresh.indexOf(q), 1); URL.revokeObjectURL(q.url); draw(); });
        li.classList.add('new');
        return li;
      }),
    );
    add.hidden = mine.length - drop.size + fresh.length >= BD_PICS;
  };
  add.addEventListener('click', () => file.click());
  file.addEventListener('change', () => {
    for (const f of file.files) {
      if (!/^image\//.test(f.type) || mine.length - drop.size + fresh.length >= BD_PICS) continue;
      const q = { url: URL.createObjectURL(f), ready: bdPrep(f, BD_OWN, true) };
      q.ready.catch(() => { fresh.splice(fresh.indexOf(q), 1); draw(); bdSay(st, 'board.e.pic'); });
      fresh.push(q);
    }
    file.value = '';
    draw();
  });
  const save = bdBtn('board.save', '', async () => {
    save.disabled = true;
    try {
      const fd = new FormData();
      fd.append('text', ta.value.trim());
      fd.append('drop', [...drop].join(','));
      (await Promise.all(fresh.map((q) => q.ready))).forEach((m, n) => { fd.append('o' + n, m.o.blob, 'o' + n); fd.append('s' + n, m.s.blob, 's' + n); });
      await bdSend(`/admin/posts/${p.id}/reply`, fd, (pc) => bdSay(st, 'board.sending', { p: pc }));
      bdSay(st, 'board.saved');
      bdLoaded = 0;
      setTimeout(() => bdReview(false), 700);   // the post again, with its reply as the board shows it
    } catch (e) {
      bdSay(st, bdErr(e));
    } finally {
      save.disabled = false;
    }
  });
  draw();
  inside.append(ta, thumbs, add, file, save, st);
  box.append(sum, inside);
  return box;
}
async function bdSaveOrig(p, q, at) {   // a picture as it was sent, saved (to paint over it)
  try {
    const r = await fetch(`${BD_API}/admin/pic/${q.id}/o`, { headers: { Authorization: 'Bearer ' + bdKey } });
    if (!r.ok) throw new Error('gone');
    const b = await r.blob(), a = el('a');
    a.href = URL.createObjectURL(b);
    a.download = `${p.name}-${at + 1}.${(b.type.split('/')[1] || 'jpg').replace('jpeg', 'jpg')}`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 10000);
  } catch (e) { /* gone: the list shows it on its next load */ }
}
