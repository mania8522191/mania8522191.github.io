/* The message board's back end, a Cloudflare Worker (tools/README.md: 留言板).
   Visitors' posts wait here until the site's owner accepts them on the review page (the site's #board-admin); the
   board shows only accepted ones. D1 (DB) keeps the posts and their pictures' details (schema.sql), KV (PICS) the
   pictures: each as sent (<id>/o) and a small copy for the board (<id>/s), both made in the sender's browser.
   The secrets are set with `npx wrangler secret put <NAME>`, never written in a file here: ADMIN_PASSWORD (the review
   page's), TURNSTILE_SECRET (the spam check), RESEND_API_KEY and NOTIFY_EMAIL (an e-mail on each new post; without
   them none is sent).

   GET    /posts?before=<at>             accepted posts, newest first, a page at a time
   GET    /pic/<id>/<o|s>                an accepted post's picture
   POST   /posts                         a new post (form: name, text, lang, ts = the Turnstile token, o0 s0 … o3 s3)
   POST   /admin/login                   {password} → {token}; the rest need "Authorization: Bearer <token>"
   GET    /admin/posts?state=wait|shown  the posts waiting (or shown), and how many wait
   GET    /admin/pic/<id>/<o|s>          any post's picture
   POST   /admin/posts/<id>/accept       show it on the board
   POST   /admin/posts/<id>/reply        the owner's reply (form: text, drop = its pictures to remove, o0 s0 …)
   DELETE /admin/posts/<id>              a post and its pictures, for good */

const PICS_MAX = 4;            // pictures in a post, and in a reply
const SENT_MAX = 8 << 20;      // bytes: a visitor's picture as sent (the browser makes it smaller first)
const OWN_MAX = 24 << 20;      // the owner's picture in a reply, as it is (a KV value holds up to 25 MiB)
const SMALL_MAX = 1 << 20;     // the small copy on the board
const SMALL_SIDE = 2400;       // and its longest side at most
const NAME_MAX = 40, TEXT_MAX = 2000, REPLY_MAX = 4000;   // characters
const PAGE = 12;               // posts per page
const WAIT_MAX = 200;          // posts waiting at most: more are turned away until some are reviewed
const MIN = 6e4, DAY = 864e5;

const enc = new TextEncoder();
const hex = (b) => [...b].map((x) => x.toString(16).padStart(2, '0')).join('');
const newId = (n) => hex(crypto.getRandomValues(new Uint8Array(n)));
const chars = (s) => [...s].length;
const json = (data, status = 200, cache = 'no-store') =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': cache } });
const fail = (error, status = 400) => json({ error }, status);

/* text as typed, without control characters, invisible marks and direction overrides, at most two empty lines in a row */
const BAD = /[\u0000-\u0008\u000b-\u001f\u007f-\u009f\u200b-\u200f\u2028-\u202e\u2060-\u2069\ufeff]/g;
const clean = (s) => String(s || '').replace(/\r\n?/g, '\n').replace(BAD, '').replace(/[ \t]+$/gm, '').replace(/\n{4,}/g, '\n\n\n').trim();
const oneLine = (s) => clean(s).replace(/\s+/g, ' ');

async function hmac(key, msg) {
  const k = await crypto.subtle.importKey('raw', enc.encode(key), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return new Uint8Array(await crypto.subtle.sign('HMAC', k, enc.encode(msg)));
}
const b64url = (b) => btoa(String.fromCharCode(...b)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
function same(a, b) {   // two strings, compared in the same time whatever they hold
  const x = enc.encode(a), y = enc.encode(b);
  let d = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) d |= (x[i] || 0) ^ (y[i] || 0);
  return d === 0;
}
function b64(b) {
  let s = '';
  for (let i = 0; i < b.length; i += 0x8000) s += String.fromCharCode(...b.subarray(i, i + 0x8000));
  return btoa(s);
}

/* the review page's key: good for 30 days, and no more once the password changes */
const sign = (env, exp) => hmac(env.ADMIN_PASSWORD, 'board admin ' + exp).then(b64url);
async function isAdmin(req, env) {
  const m = /^Bearer (\d+)\.([\w-]+)$/.exec(req.headers.get('Authorization') || '');
  return !!(m && env.ADMIN_PASSWORD && +m[1] > Date.now() && same(m[2], await sign(env, m[1])));
}

/* the sender's address, hashed (it is never kept as it is), to slow down floods */
async function sender(req, env) {
  return hex(await hmac('board ' + (env.ADMIN_PASSWORD || ''), req.headers.get('CF-Connecting-IP') || 'local')).slice(0, 24);
}
async function tooMany(env, ip, kind, rules) {   // rules: [[how many, in how many ms], …]
  for (const [n, ms] of rules) {
    const r = await env.DB.prepare('SELECT COUNT(*) AS c FROM hits WHERE ip = ? AND kind = ? AND at > ?').bind(ip, kind, Date.now() - ms).first();
    if (r.c >= n) return true;
  }
  return false;
}
const hit = (env, ip, kind) => env.DB.prepare('INSERT INTO hits (ip, kind, at) VALUES (?, ?, ?)').bind(ip, kind, Date.now());

/* the Turnstile check the form's widget did in the sender's browser */
async function human(req, env, token) {
  if (!env.TURNSTILE_SECRET || !token) return false;
  const body = new FormData();
  body.append('secret', env.TURNSTILE_SECRET);
  body.append('response', String(token));
  const ip = req.headers.get('CF-Connecting-IP');
  if (ip) body.append('remoteip', ip);
  const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  const d = await r.json().catch(() => ({}));
  if (d.success !== true) console.log('turnstile refused', JSON.stringify(d['error-codes'] || []), d.hostname || '');   // (the Workers logs)
  return d.success === true;
}

/* what a picture is and its size, read from the file itself: a JPEG, PNG, WebP or GIF; anything else is null */
function picInfo(b) {
  const be16 = (i) => (b[i] << 8) | b[i + 1], le16 = (i) => b[i] | (b[i + 1] << 8), le24 = (i) => le16(i) | (b[i + 2] << 16);
  const be32 = (i) => ((b[i] << 24) | (b[i + 1] << 16) | (b[i + 2] << 8) | b[i + 3]) >>> 0;
  const ascii = (i, n) => String.fromCharCode(...b.subarray(i, i + n));
  let r = null;
  if (b.length > 24 && ascii(0, 8) === '\x89PNG\r\n\x1a\n') r = { type: 'image/png', w: be32(16), h: be32(20) };
  else if (b.length > 10 && /^GIF8[79]a$/.test(ascii(0, 6))) r = { type: 'image/gif', w: le16(6), h: le16(8) };
  else if (b.length > 30 && ascii(0, 4) === 'RIFF' && ascii(8, 4) === 'WEBP') {
    const k = ascii(12, 4);
    if (k === 'VP8 ') r = { type: 'image/webp', w: le16(26) & 0x3fff, h: le16(28) & 0x3fff };
    else if (k === 'VP8L') { const v = (b[21] | (b[22] << 8) | (b[23] << 16) | (b[24] << 24)) >>> 0; r = { type: 'image/webp', w: (v & 0x3fff) + 1, h: ((v >>> 14) & 0x3fff) + 1 }; }
    else if (k === 'VP8X') r = { type: 'image/webp', w: le24(24) + 1, h: le24(27) + 1 };
  } else if (b.length > 4 && b[0] === 0xff && b[1] === 0xd8) {
    for (let i = 2; i + 9 < b.length;) {   // the segments, up to the frame's header (SOF), which has the size
      if (b[i] !== 0xff) return null;
      const m = b[i + 1];
      if (m === 0xff) { i++; continue; }
      if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) { r = { type: 'image/jpeg', w: be16(i + 7), h: be16(i + 5) }; break; }
      i += 2 + (m === 0x01 || (m >= 0xd0 && m <= 0xd8) ? 0 : be16(i + 2));
    }
  }
  return r && r.w > 0 && r.h > 0 ? r : null;
}
async function readPic(o, s, max) {   // a picture as sent and its small copy, from the form
  if (!(o instanceof Blob) || !(s instanceof Blob)) return { error: 'pic' };
  if (o.size > max || s.size > SMALL_MAX) return { error: 'big' };
  const ob = new Uint8Array(await o.arrayBuffer()), sb = new Uint8Array(await s.arrayBuffer());
  const oi = picInfo(ob), si = picInfo(sb);
  if (!oi || !si || Math.max(si.w, si.h) > SMALL_SIDE || Math.max(oi.w, oi.h) > 20000) return { error: 'pic' };
  return { id: newId(16), ob, sb, oi, si };
}
async function readPics(form, max) {
  const pics = [];
  for (let n = 0; form.has('o' + n); n++) {
    if (n >= PICS_MAX) return { error: 'pics' };
    const p = await readPic(form.get('o' + n), form.get('s' + n), max);
    if (p.error) return p;
    pics.push(p);
  }
  return { pics };
}
const savePics = (env, pics) => Promise.all(pics.flatMap((p) => [env.PICS.put(`${p.id}/o`, p.ob), env.PICS.put(`${p.id}/s`, p.sb)]));
const dropPics = (env, ids) => Promise.all(ids.flatMap((id) => [env.PICS.delete(`${id}/o`), env.PICS.delete(`${id}/s`)]));
const picRow = (env, p, post, who, n) => env.DB.prepare('INSERT INTO pics (id, post, who, n, type, w, h, stype, sw, sh) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
  .bind(p.id, post, who, n, p.oi.type, p.oi.w, p.oi.h, p.si.type, p.si.w, p.si.h);

/* ---------- the board ---------- */
async function list(env, state, before, admin) {
  const rows = (await env.DB.prepare('SELECT id, at, name, text, lang, reply, reply_at FROM posts WHERE state = ? AND at < ? ORDER BY at DESC LIMIT ?')
    .bind(state, before || 9e15, PAGE + 1).all()).results;
  const more = rows.length > PAGE;
  if (more) rows.pop();
  const ids = rows.map((r) => r.id);
  const pics = ids.length ? (await env.DB.prepare(`SELECT id, post, who, n, w, h, sw, sh FROM pics WHERE post IN (${ids.map(() => '?').join(',')}) ORDER BY n`)
    .bind(...ids).all()).results : [];
  const posts = rows.map((r) => ({ ...r, pics: pics.filter((p) => p.post === r.id).map(({ post, ...p }) => p) }));
  if (!admin) return json({ posts, more }, 200, 'public, max-age=30');
  const wait = (await env.DB.prepare("SELECT COUNT(*) AS c FROM posts WHERE state = 'wait'").first()).c;
  return json({ posts, more, wait });
}

async function pic(env, id, size, admin) {
  const row = /^[0-9a-f]{32}$/.test(id) && await env.DB.prepare('SELECT pics.type, pics.stype, posts.state FROM pics JOIN posts ON posts.id = pics.post WHERE pics.id = ?').bind(id).first();
  if (!row || (row.state !== 'shown' && !admin)) return fail('gone', 404);
  const data = await env.PICS.get(`${id}/${size}`, 'arrayBuffer');
  if (!data) return fail('gone', 404);
  return new Response(data, { headers: {
    'Content-Type': size === 'o' ? row.type : row.stype,
    'Cache-Control': admin ? 'private, no-store' : 'public, max-age=31536000, immutable',
    'X-Content-Type-Options': 'nosniff',
    'Content-Security-Policy': "default-src 'none'",
  } });
}

async function newPost(req, env, ctx) {
  const ip = await sender(req, env);
  if (await tooMany(env, ip, 'post', [[3, 10 * MIN], [10, DAY]])) return fail('slow', 429);
  let form;
  try { form = await req.formData(); } catch (e) { return fail('form'); }
  if (!(await human(req, env, form.get('ts')))) return fail('human', 403);
  const name = oneLine(form.get('name')), text = clean(form.get('text'));
  if (!name || chars(name) > NAME_MAX) return fail('name');
  if (chars(text) > TEXT_MAX) return fail('long');
  const { pics, error } = await readPics(form, SENT_MAX);
  if (error) return fail(error);
  if (!text && !pics.length) return fail('empty');
  if ((await env.DB.prepare("SELECT COUNT(*) AS c FROM posts WHERE state = 'wait'").first()).c >= WAIT_MAX) return fail('full', 503);
  const id = newId(9), at = Date.now(), lang = ['zh', 'en', 'ja'].includes(form.get('lang')) ? form.get('lang') : 'zh';
  await savePics(env, pics);
  await env.DB.batch([
    env.DB.prepare("INSERT INTO posts (id, at, name, text, lang, state) VALUES (?, ?, ?, ?, ?, 'wait')").bind(id, at, name, text, lang),
    ...pics.map((p, n) => picRow(env, p, id, 'guest', n)),
    hit(env, ip, 'post'),
    env.DB.prepare('DELETE FROM hits WHERE at < ?').bind(at - 2 * DAY),
  ]);
  ctx.waitUntil(notify(env, name, text, pics).catch((e) => console.error('mail', e)));
  return json({ ok: true }, 201);
}

/* the e-mail to the owner on each new post, with its pictures' small copies attached (Resend; its test sender
   onboarding@resend.dev writes only to the address of the Resend account itself, which is NOTIFY_EMAIL) */
async function notify(env, name, text, pics) {
  if (!env.RESEND_API_KEY || !env.NOTIFY_EMAIL) return;
  const esc = (s) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
  const link = `${env.SITE}/#board-admin`, words = text || '（只有圖片）', count = pics.length ? `圖片 ${pics.length} 張（在附件）` : '';
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Board <onboarding@resend.dev>',
      to: [env.NOTIFY_EMAIL],
      subject: `留言板有新留言待審核：${name}`,
      text: `${name}\n\n${words}\n\n${count}\n\n審核：${link}`,
      html: `<p><b>${esc(name)}</b></p><p style="white-space:pre-wrap">${esc(words)}</p><p>${count}</p><p><a href="${link}">打開審核頁</a></p>`,
      attachments: pics.map((p, n) => ({ filename: `${n + 1}.${p.si.type.split('/')[1].replace('jpeg', 'jpg')}`, content: b64(p.sb) })),
    }),
  });
  if (!r.ok) console.error('resend', r.status, await r.text());
}

/* ---------- the review page ---------- */
async function login(req, env) {
  if (!env.ADMIN_PASSWORD) return fail('setup', 503);
  const ip = await sender(req, env);
  if (await tooMany(env, ip, 'login', [[5, 15 * MIN]])) return fail('slow', 429);
  const { password } = await req.json().catch(() => ({}));
  if (!same(b64url(await hmac('board', String(password || ''))), b64url(await hmac('board', env.ADMIN_PASSWORD)))) {
    await hit(env, ip, 'login').run();
    return fail('password', 401);
  }
  const exp = Date.now() + 30 * DAY;
  return json({ token: `${exp}.${await sign(env, exp)}` });
}

async function accept(env, id) {
  const r = await env.DB.prepare("UPDATE posts SET state = 'shown', shown_at = ? WHERE id = ? AND state = 'wait'").bind(Date.now(), id).run();
  return r.meta.changes ? json({ ok: true }) : fail('gone', 404);
}

async function reply(req, env, id) {
  if (!(await env.DB.prepare('SELECT id FROM posts WHERE id = ?').bind(id).first())) return fail('gone', 404);
  let form;
  try { form = await req.formData(); } catch (e) { return fail('form'); }
  const text = clean(form.get('text'));
  if (chars(text) > REPLY_MAX) return fail('long');
  const mine = (await env.DB.prepare("SELECT id, n FROM pics WHERE post = ? AND who = 'reply' ORDER BY n").bind(id).all()).results;
  const drop = String(form.get('drop') || '').split(','), gone = mine.filter((p) => drop.includes(p.id)), kept = mine.filter((p) => !drop.includes(p.id));
  const { pics, error } = await readPics(form, OWN_MAX);
  if (error) return fail(error);
  if (kept.length + pics.length > PICS_MAX) return fail('pics');
  await savePics(env, pics);
  const from = mine.length ? mine[mine.length - 1].n + 1 : 0, any = text || kept.length + pics.length;
  await env.DB.batch([
    env.DB.prepare('UPDATE posts SET reply = ?, reply_at = ? WHERE id = ?').bind(text || null, any ? Date.now() : null, id),
    ...gone.map((p) => env.DB.prepare('DELETE FROM pics WHERE id = ?').bind(p.id)),
    ...pics.map((p, k) => picRow(env, p, id, 'reply', from + k)),
  ]);
  await dropPics(env, gone.map((p) => p.id));
  return json({ ok: true });
}

async function remove(env, id) {
  const ids = (await env.DB.prepare('SELECT id FROM pics WHERE post = ?').bind(id).all()).results.map((p) => p.id);
  const r = await env.DB.batch([env.DB.prepare('DELETE FROM pics WHERE post = ?').bind(id), env.DB.prepare('DELETE FROM posts WHERE id = ?').bind(id)]);
  await dropPics(env, ids);
  return r[1].meta.changes ? json({ ok: true }) : fail('gone', 404);
}

async function route(req, env, ctx, url, allowed) {
  const p = url.pathname.replace(/\/+$/, '') || '/', m = req.method;
  let x;
  if (m === 'GET' && p === '/') return json({ board: true });
  if (m === 'GET' && p === '/posts') return list(env, 'shown', +url.searchParams.get('before'), false);
  if (m === 'GET' && (x = /^\/pic\/(\w+)\/([os])$/.exec(p))) return pic(env, x[1], x[2], false);
  if (m === 'POST' && req.headers.get('Origin') && !allowed) return fail('origin', 403);   // a form on another site
  if (m === 'POST' && p === '/posts') return newPost(req, env, ctx);
  if (m === 'POST' && p === '/admin/login') return login(req, env);
  if (!p.startsWith('/admin/')) return fail('gone', 404);
  if (!(await isAdmin(req, env))) return fail('auth', 401);
  if (m === 'GET' && p === '/admin/posts') return list(env, url.searchParams.get('state') === 'shown' ? 'shown' : 'wait', +url.searchParams.get('before'), true);
  if (m === 'GET' && (x = /^\/admin\/pic\/(\w+)\/([os])$/.exec(p))) return pic(env, x[1], x[2], true);
  if (m === 'POST' && (x = /^\/admin\/posts\/(\w+)\/accept$/.exec(p))) return accept(env, x[1]);
  if (m === 'POST' && (x = /^\/admin\/posts\/(\w+)\/reply$/.exec(p))) return reply(req, env, x[1]);
  if (m === 'DELETE' && (x = /^\/admin\/posts\/(\w+)$/.exec(p))) return remove(env, x[1]);
  return fail('gone', 404);
}

export default {
  async fetch(req, env, ctx) {
    const origin = req.headers.get('Origin') || '', allowed = String(env.ORIGINS || '').split(/\s+/).includes(origin);
    const cors = allowed ? { 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'GET, POST, DELETE', 'Access-Control-Allow-Headers': 'Authorization, Content-Type', 'Access-Control-Max-Age': '86400' } : {};
    let res;
    if (req.method === 'OPTIONS') res = new Response(null, { status: allowed ? 204 : 403 });
    else {
      try { res = await route(req, env, ctx, new URL(req.url), allowed); } catch (e) { console.error(e); res = fail('server', 500); }
    }
    for (const [k, v] of Object.entries(cors)) res.headers.set(k, v);
    res.headers.append('Vary', 'Origin');
    return res;
  },
};
