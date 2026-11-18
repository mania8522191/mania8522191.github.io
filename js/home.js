/* Home: a carousel of featured works under the name. On every visit, and every time Home is pressed, it shows HERO_N
   of the works in HOME_SLIDES (data.js), picked and ordered at random. A dot for each work picks it; a swipe or the
   arrow keys go to the next or previous one. It moves on by itself, except while the visitor is on its controls or
   prefers less motion. */
const heroSlides = $('#hero-slides'), heroDots = $('#hero-dots'), heroCap = $('#hero-cap');
const HERO_N = 5;       // how many works a pick shows
const HERO_MS = 6500;   // how long each work stays before the next one fades in
let SLIDES = [], heroCur = null, heroAt = -1, heroPicks = 0, heroTimer = 0, heroHover = false, heroFocus = false, heroX = null;

/* pos says where the crop centres on the screen; a turned picture needs it in its own, unturned terms */
function turnPos(pos, turn) {
  const [x, y] = pos.split(' ').map(parseFloat);
  return turn === 90 ? `${y}% ${100 - x}%` : turn === -90 ? `${100 - y}% ${x}%` : pos;
}

/* one slide: the picture in its box (on its side if turn says so), and its dot */
function heroMake(item, i) {
  const s = { w: WORKS[byId[item.id]], pos: item.pos, turn: item.turn };
  s.box = el('div', 'hero-slide');
  s.img = el('img');
  s.img.alt = '';   // the title is in the link under the carousel
  s.img.decoding = 'async';
  s.img.style.objectPosition = s.turn ? turnPos(s.pos || '50% 50%', s.turn) : s.pos || s.w.pos || '';
  if (s.turn) {   // a box as tall as the screen is wide, turned around its centre
    const t = el('div', 'hero-turn');
    t.style.setProperty('--turn', `${s.turn}deg`);
    t.append(s.img);
    s.box.classList.add('turned');
    s.box.append(t);
  } else s.box.append(s.img);
  s.dot = el('button', 'hero-dot');
  s.dot.type = 'button';
  s.dot.append(el('i'));
  s.dot.addEventListener('click', () => { heroShow(i); heroPlay(); });
  return s;
}

/* a new pick of works in a new order. The work on screen, if any, stays until the new first picture is ready and
   then fades out under it; the new first work is never the one that was showing. */
function heroPick() {
  const pick = ++heroPicks, was = heroCur, old = SLIDES;
  const pool = HOME_SLIDES.filter((s) => s.id in byId);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  if (was && pool.length > 1 && pool[0].id === was.w.id) pool.push(pool.shift());
  SLIDES = pool.slice(0, HERO_N).map(heroMake);
  old.forEach((s) => { if (s !== was) s.box.remove(); });
  heroSlides.append(...SLIDES.map((s) => s.box));
  heroDots.replaceChildren(...SLIDES.map((s) => s.dot));
  heroAt = -1;
  heroText();
  if (!SLIDES.length) return;
  if (!was) {
    SLIDES[0].img.fetchPriority = 'high';
    heroShow(0);
    return;
  }
  heroLoad(SLIDES[0]);
  Promise.race([SLIDES[0].img.decode(), sleep(900)]).catch(() => {}).then(() => {
    if (pick !== heroPicks) return;   // a newer pick has taken over
    if (heroCur === was) heroShow(0);   // unless the visitor has already chosen one with a dot
    setTimeout(() => was.box.remove(), 1500);   // once it has faded
    heroPlay();
  });
}

/* a picture is fetched only when its slide is next: the page copy, or the full-size one when it shows wider than
   that (sizes, from heroSizes) on the screen's pixels */
function heroLoad(s) {
  if (s.img.src) return;
  const [w, h, zw] = s.w.dims[0], page = src(s.w.id, 0);
  s.img.width = w;
  s.img.height = h;
  s.img.sizes = '100vw';   // until heroSizes knows how wide it shows
  heroSizes(s);
  s.img.srcset = zw ? `${page} ${w}w, ${page.replace('img/', 'img/z/')} ${zw}w` : `${page} ${w}w`;
  s.img.src = page;
}

/* sizes: how wide the picture shows, so the browser picks a copy sharp enough for the screen's pixel density.
   Covering the screen, a picture wider than the screen's shape shows wider than the screen. */
function heroSizes(s) {
  let W = heroSlides.clientWidth, H = heroSlides.clientHeight;
  if (!s || !W || !H) return;
  const d = s.w.dims[0], w = d[2] || d[0], h = d[3] || d[1];   // its shape (both copies have the same)
  if (s.turn) [W, H] = [H, W];   // a turned picture covers the screen on its side
  s.img.sizes = `${Math.ceil(Math.max(W, H * w / h))}px`;
}
const heroRefit = () => SLIDES.forEach((s) => { if (s.img.src) heroSizes(s); });
if ('ResizeObserver' in window) new ResizeObserver(heroRefit).observe(heroSlides);   // also when the home page is shown again
else addEventListener('resize', heroRefit);

function heroShow(i) {
  const s = SLIDES[i];
  if (!s || s === heroCur) return;
  const first = !heroCur;
  if (heroCur) heroCur.box.classList.remove('on');
  heroCur = s;
  heroAt = i;
  heroLoad(s);
  heroLoad(SLIDES[(i + 1) % SLIDES.length]);   // the next one, in the background
  s.box.classList.add('on');
  SLIDES.forEach((x, k) => x.dot.setAttribute('aria-current', String(k === i)));
  heroCap.href = '#w-' + s.w.id;
  heroCap.querySelector('.hero-cap-t').textContent = L(s.w.t);
  if (!first && !CALM) heroCap.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 900, easing: 'cubic-bezier(.16,1,.3,1)' });
}
const heroStep = (d) => { heroShow((heroAt + d + SLIDES.length) % SLIDES.length); heroPlay(); };

/* the timer runs only while the home page is shown in a visible tab */
function heroPlay() {
  clearTimeout(heroTimer);
  if (view === 'home') heroRefit();   // the home page may have been hidden (unmeasurable) until now
  if (CALM || heroHover || heroFocus || document.hidden || view !== 'home' || SLIDES.length < 2) return;
  heroTimer = setTimeout(() => heroStep(1), HERO_MS);
}
document.addEventListener('visibilitychange', heroPlay);
for (const c of [heroDots, heroCap]) {   // hold still while the visitor is on the dots or the title
  c.addEventListener('pointerenter', () => { heroHover = true; heroPlay(); });
  c.addEventListener('pointerleave', () => { heroHover = false; heroPlay(); });
  c.addEventListener('focusin', (e) => { heroFocus = e.target.matches(':focus-visible'); heroPlay(); });
  c.addEventListener('focusout', () => { heroFocus = false; heroPlay(); });
}
hero.addEventListener('pointerdown', (e) => { heroX = e.pointerType === 'mouse' ? null : e.clientX; });
hero.addEventListener('pointercancel', () => { heroX = null; });
hero.addEventListener('pointerup', (e) => {
  if (heroX === null) return;
  const dx = e.clientX - heroX;
  heroX = null;
  if (Math.abs(dx) > 50 && SLIDES.length > 1) heroStep(dx < 0 ? 1 : -1);
});
addEventListener('keydown', (e) => {
  if (view !== 'home' || SLIDES.length < 2 || e.altKey || e.metaKey || e.ctrlKey || document.documentElement.classList.contains('menu-open')) return;
  if (e.key === 'ArrowRight') heroStep(1);
  if (e.key === 'ArrowLeft') heroStep(-1);
});

/* the dots' names, again after a language change */
function heroText() {
  SLIDES.forEach((s, i) => s.dot.setAttribute('aria-label', tr('home.dot', { n: i + 1, t: L(s.w.t) })));
}
heroPick();

/* the corner buttons shown, top to bottom (each with its window; see below). Instagram's is left out for now, at the
   user's wish (2026-11-17): its list is still kept up to date on GitHub; put 'ig' back between them to show it again */
const SNS_ON = ['x', 'yt'];
/* counts under a video or a post, each after its mark: views, likes (thumb: YouTube, heart: X), reposts; written
   short in the page's language (1.2萬, 1.2K, 1.2万), again on a language change */
const STAT_ICON = {
  view: '<path d="M1.5 12S5.3 5 12 5s10.5 7 10.5 7-3.8 7-10.5 7S1.5 12 1.5 12Z"/><circle cx="12" cy="12" r="3"/>',
  thumb: '<path d="M7 10.5V20H3.5v-9.5H7Zm0 0 3.6-7a2.2 2.2 0 0 1 3.2 2.5L13 9.5h5.6a2 2 0 0 1 2 2.4l-1.4 6.5a2 2 0 0 1-2 1.6H7"/>',
  heart: '<path d="M12 20s-7.5-4.4-7.5-10.2A4.1 4.1 0 0 1 8.6 5.6c1.5 0 2.7.8 3.4 1.9.7-1.1 1.9-1.9 3.4-1.9a4.1 4.1 0 0 1 4.1 4.2C19.5 15.6 12 20 12 20Z"/>',
  rt: '<path d="M4.5 10V8.5a3 3 0 0 1 3-3h11m0 0-3-3m3 3-3 3M19.5 14v1.5a3 3 0 0 1-3 3h-11m0 0 3 3m-3-3 3-3"/>',
};
function stats(pairs) {
  const row = el('span', 'st-row');
  row.innerHTML = pairs.map(([k, n]) => `<span class="st"><svg viewBox="0 0 24 24" aria-hidden="true">${STAT_ICON[k]}</svg><span class="st-n" data-n="${Number(n) || 0}"></span></span>`).join('');
  return row;
}
function statText(box) {
  const f = new Intl.NumberFormat(HTML_LANG[LANG], { notation: 'compact', maximumFractionDigits: 1 });
  box.querySelectorAll('.st-n').forEach((s) => { s.textContent = f.format(+s.dataset.n); });
}
/* a card's date, with its counts at the other end of the line */
function dateLine(cls, d, pairs) {
  const p = el('span', cls);
  p.append(el('span', '', dot(d)), stats(pairs));
  return p;
}

/* ---------- the latest three videos on the YouTube channel, newest first, with their views and likes: yt-latest.json,
   which .github/workflows/yt-latest.yml brings up to date every hour (tools/yt_latest.py). A click opens the video on
   YouTube in a new tab. ---------- */
const ytGrid = $('#yt-grid');
function ytText() {
  ytGrid.querySelectorAll('.yt-item').forEach((it) => {
    const c = it.querySelector('.tl-card'), s = tr('yt.stats', { v: it.dataset.v, l: it.dataset.l });
    c.setAttribute('aria-label', `${tr('tl.play', { t: c.dataset.t })} ${s}`);
    it.querySelector('.st-row').title = s;
  });
  statText(ytGrid);
}
fetch('yt-latest.json', { cache: 'no-cache' })
  .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
  .then(({ videos }) => {
    ytGrid.replaceChildren(...videos.slice(0, 3).map((v) => {
      const item = el('div', 'yt-item'), card = el('a', 'tl-card'), im = el('img');
      card.href = `https://www.youtube.com/watch?v=${v.id}`; card.target = '_blank'; card.rel = 'noopener';
      card.dataset.t = v.t;
      im.width = 1280; im.height = 720; im.alt = ''; im.loading = 'lazy';
      const hq = () => { im.src = `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`; };   // a video without a full-size picture
      im.addEventListener('error', hq, { once: true });
      im.addEventListener('load', () => { if (im.naturalWidth < 200 && !im.src.includes('hqdefault')) hq(); });   // YouTube's stand-in is 120 px
      im.src = `https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`;
      card.append(im, el('span', 'tl-play'));
      item.dataset.v = v.v || 0; item.dataset.l = v.l || 0;
      item.append(card, el('p', 'yt-t', v.t), dateLine('yt-d', v.d, [['view', v.v], ['thumb', v.l]]));
      return item;
    }));
    ytText();
    $('#yt-btn').hidden = !videos.length;
    snsFit();
  })
  .catch(() => {});   // no list: no button

/* ---------- the newest posts on Instagram: ig-latest.json, with their pictures in img/ig/, which
   .github/workflows/ig-latest.yml brings up to date every hour (tools/ig_latest.py). A click opens the post on
   Instagram. ---------- */
const igGrid = $('#ig-grid');
function igText() {
  igGrid.querySelectorAll('.ig-item').forEach((a) => a.setAttribute('aria-label', tr('ig.post', { d: dot(a.dataset.d) })));
}
if (SNS_ON.includes('ig')) fetch('ig-latest.json', { cache: 'no-cache' })
  .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
  .then(({ posts }) => {
    igGrid.replaceChildren(...posts.map((p) => {
      const a = el('a', p.kind === 'image' ? 'ig-item' : `ig-item ig-${p.kind}`), im = el('img');
      a.href = p.url; a.target = '_blank'; a.rel = 'noopener';
      a.dataset.d = p.d;
      im.alt = ''; im.loading = 'lazy'; im.decoding = 'async'; im.src = p.img;
      a.append(im);
      return a;
    }));
    igText();
    $('#ig-btn').hidden = !posts.length;
    snsFit();
  })
  .catch(() => {});   // no list yet (before the IG_TOKEN secret is set): no button

/* ---------- the newest five posts on X, the account's own with a picture (no reposts, replies, quotes, or posts of
   words only): x-latest.json, with their pictures in img/x/, which .github/workflows/x-latest.yml brings up to date
   every hour (tools/x_latest.py). Each is a cover like the works wall's with its picture whole; a post of several
   pictures deals up to three of them as a hand of cards, like the doodle collections. Under each, its first words,
   its date, and its reposts and likes (read again once a day). A click opens the post on X. ---------- */
const xWall = $('#x-wall');
const X_SEED = (WALL_SEED ^ 0x85ebca6b) >>> 0;   // an arrangement of its own, kept while the page is open
function xText() {
  xWall.querySelectorAll('.cover').forEach((a) => {
    const d = dot(a.dataset.d), s = tr('x.stats', { rt: a.dataset.rt, like: a.dataset.like });
    const row = stats([['rt', a.dataset.rt], ['heart', a.dataset.like]]);
    row.title = s;
    a.querySelector('.cap-m').replaceChildren(el('span', '', d), row);
    a.setAttribute('aria-label', `${tr('x.post', { d })} ${s}`);
  });
  statText(xWall);
}
/* up to three of a post's pictures, a new pick on every page load, in their order */
function xPicks(imgs) {
  const pool = imgs.map((_, k) => k);
  for (let k = pool.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [pool[k], pool[j]] = [pool[j], pool[k]]; }
  return pool.slice(0, 3).sort((a, b) => a - b).map((k) => imgs[k]);
}
/* the layout: random, but balanced first ("亂中有序", the user's wish); the time order comes second. Rows that each
   fill the window's width: the pictures in a row share one height, so no row leaves a hole at its end. Every order of
   the posts and every way to cut it into rows is tried (at most four to a row, two on phones; a row of one only for a
   wide picture); the ones whose rows come closest to a comfortable height win, with a small price on each post out of
   time order, and one of the best few is taken at random. Then each cover shrinks a little in its place, moves a
   little in it, and some turn slightly, as on the works wall.
   A hand of cards is sized by its cards, as the works wall sizes a collection: each card as tall as the pictures
   beside it, so the hand stands taller than they do, and they sit at its middle. */
function xLayout() {
  const W = xWall.clientWidth;
  if (!W) return;
  const rand = seeded(X_SEED), items = [...xWall.querySelectorAll('.cover')], n = items.length;
  if (!n) return;
  const wide = W >= 600, gap = wide ? 18 : 12, most = wide ? 4 : 2, target = wide ? 230 : 160;
  const rb = items.map((el) => +el.dataset.r || 1);   // each cover's width / height
  const r = items.map((el, i) => {   // its width beside pictures 1 tall: a hand's, its width over a card's height
    if (!('cw' in el.dataset)) return rb[i];
    const hs = [...el.querySelectorAll('.fan-c')].map((c) => 1 / parseFloat(c.style.getPropertyValue('--ca')));
    return 1 / +el.dataset.cw / (hs.reduce((s, v) => s + v, 0) / hs.length);
  });
  const t = r.map((v, i) => v / rb[i]);   // and its height there: 1, or more for a hand
  let all = [], strict = true;
  const cut = (order) => {   // every way to cut this order into rows
    for (let mask = 0; mask < 1 << (n - 1); mask++) {
      const rows = [[order[0]]];
      for (let i = 1; i < n; i++) { if (mask & (1 << (i - 1))) rows.push([]); rows[rows.length - 1].push(order[i]); }
      if (rows.some((row) => row.length > most || (strict && row.length === 1 && r[row[0]] < 1.25 && n > 1))) continue;
      const hs = rows.map((row) => (W - gap * (row.length - 1)) / row.reduce((s, i) => s + r[i], 0));
      let cost = hs.reduce((s, h) => s + ((h - target) / target) ** 2 * 100, 0);
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (order[j] < order[i]) cost += 2;
      all.push({ rows, hs, cost });
    }
  };
  const perms = (rest, done) => {
    if (!rest.length) { cut(done); return; }
    rest.forEach((x, i) => perms([...rest.slice(0, i), ...rest.slice(i + 1)], [...done, x]));
  };
  perms(items.map((_, i) => i), []);
  if (!all.length) { strict = false; perms(items.map((_, i) => i), []); }   // no wide picture to stand alone: let one that is not
  all.sort((a, b) => a.cost - b.cost);
  const near = all.filter((l) => l.cost <= all[0].cost + 6).slice(0, 6);
  const pick = near[Math.floor(rand() * near.length)] || all[0];
  let y = 0;
  pick.rows.forEach((row, k) => {
    const h = pick.hs[k], band = h * Math.max(...row.map((i) => t[i]));
    let x = 0, bottom = 0;
    row.forEach((i) => {
      const el = items[i], slot = r[i] * h, w = slot * (0.9 + rand() * 0.08);
      el.style.width = `${Math.round(w)}px`;
      const top = y + (band - h * t[i]) / 2 + (h - w / r[i]) * t[i] * rand() + rand() * 8;
      placeCover(el, x + (slot - w) * rand(), top, rand() < 0.5 ? (rand() - 0.5) * 2 : 0);
      bottom = Math.max(bottom, top + el.offsetHeight);
      x += slot + gap;
    });
    y = bottom + gap;
  });
  xWall.style.height = `${Math.ceil(y - gap)}px`;
}
fetch('x-latest.json', { cache: 'no-cache' })
  .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
  .then(({ posts }) => {
    const shown = posts.filter((p) => p.imgs && p.imgs.length).slice(0, 5);
    xWall.replaceChildren(...shown.map((p) => {
      const a = makeCover(p.url, xPicks(p.imgs), '50% 50%', false);
      a.target = '_blank'; a.rel = 'noopener';
      delete a.dataset.rv;   // no scroll reveal in a window
      a.dataset.d = p.d; a.dataset.rt = p.rt || 0; a.dataset.like = p.like || 0;
      a.querySelector('.cap-t').textContent = p.text;
      return a;
    }));
    xText();
    $('#x-btn').hidden = !shown.length;
    snsFit();
  })
  .catch(() => {});   // no list yet (before the X secrets are set): no button

/* ---------- on the home page, a round button in the corner for each of those: its ring opens into its window, which
   stretches from the button toward the top left with the ring's curve at every corner, the logo staying at the bottom
   right. The same button closes it back into the ring, and so do a right-click anywhere outside it, a tap outside it
   on a touch screen, and Esc. ---------- */
const snsDock = $('#sns-dock');
const SNS = SNS_ON.map((k) => ({ btn: $(`#${k}-btn`), pop: $(`#home-${k}`) }));
let snsAt = null;   // the open one
/* where a window sits (its bottom right corner on its button's) and how big it is open: its contents, no taller than
   the room between the header and the button (more than that scrolls with the wheel or a finger, with no scrollbar);
   and the gold line round it */
function snsSize(s) {
  const inner = s.pop.firstElementChild, b = s.btn.offsetWidth;
  if (inner.contains(xWall)) xLayout();
  s.pop.style.bottom = `${snsDock.offsetHeight - s.btn.offsetTop - b}px`;
  inner.style.maxHeight = `${Math.max(160, s.btn.getBoundingClientRect().bottom - $('.site-head').getBoundingClientRect().bottom - 14)}px`;
  return [inner.offsetWidth + 2, inner.offsetHeight + 2];
}
/* the ring opens into the window, or the window closes back into the ring, from wherever it is now. On the way it
   also takes on the window's ground and deeper shadow, or gives them back for the button's (the same see-through
   ground as the event pill, for now), so that where the window ends as the ring, the button takes over looking just
   the same */
function snsMove(s, open) {
  const pop = s.pop, b = `${s.btn.offsetWidth}px`, dock = getComputedStyle(snsDock), now = getComputedStyle(pop);
  const ring = { width: b, height: b, backgroundColor: dock.getPropertyValue('--ring-bg').trim(), boxShadow: dock.getPropertyValue('--ring-shadow').trim() };
  const from = pop.hidden ? ring : { width: now.width, height: now.height, backgroundColor: now.backgroundColor, boxShadow: now.boxShadow };
  if (pop.anim) pop.anim.cancel();
  if (pop.hidden) { pop.hidden = false; pop.querySelector('.sns-body').scrollTop = 0; }   // opened again: from its top
  const [w, h] = open ? snsSize(s) : [s.btn.offsetWidth, s.btn.offsetWidth];
  pop.style.width = `${w}px`; pop.style.height = `${h}px`;
  const rest = getComputedStyle(pop);
  const to = open ? { width: `${w}px`, height: `${h}px`, backgroundColor: rest.backgroundColor, boxShadow: rest.boxShadow } : ring;
  s.btn.classList.add('morph');
  snsOver();
  const done = (a) => {
    pop.anim = null;
    if (!open) { pop.hidden = true; s.btn.classList.remove('morph'); if (a) a.cancel(); snsOver(); }   // the button's ring takes over
  };
  if (CALM) { done(); return; }
  const a = pop.anim = pop.animate([from, to], { duration: 550, easing: 'cubic-bezier(.16,1,.3,1)', fill: open ? 'none' : 'forwards' });
  a.finished.then(() => { if (pop.anim === a) done(a); }, () => {});   // cancelled: a newer move took over
}
/* a button below a window that is out (open, or on its way) sits above it, so the window's shadow does not dim it;
   a button above one stays under it, as the window grows over it */
function snsOver() {
  SNS.forEach((o) => o.btn.classList.toggle('over', SNS.some((s) => !s.pop.hidden && s.btn.offsetTop < o.btn.offsetTop)));
}
/* the window's gold line lights up while the pointer is on the window or its button, and dims when it leaves */
SNS.forEach((s) => [s.pop, s.btn].forEach((e) => {
  e.addEventListener('pointerenter', () => s.pop.classList.add('lit'));
  e.addEventListener('pointerleave', () => s.pop.classList.remove('lit'));
}));
/* the open window fits its contents again: when they change size (another screen size, another language), when the
   screen gets taller or shorter, when a button comes */
function snsFit() {
  if (!snsAt || snsAt.pop.anim) return;
  const [w, h] = snsSize(snsAt);
  snsAt.pop.style.width = `${w}px`; snsAt.pop.style.height = `${h}px`;
}
const snsWatch = new ResizeObserver(() => requestAnimationFrame(snsFit));
SNS.forEach((s) => snsWatch.observe(s.pop.firstElementChild));
addEventListener('resize', snsFit);
/* open s (one of SNS), or shut the open one (null) */
function snsSet(s) {
  if (s === snsAt) return;
  if (snsAt) { snsAt.btn.setAttribute('aria-expanded', 'false'); snsMove(snsAt, false); }
  snsAt = s;
  if (s) { s.btn.setAttribute('aria-expanded', 'true'); snsMove(s, true); }
  snsDock.classList.toggle('open', !!s);   // the speech bubble steps aside (css/home.css .sns-tip)
}
SNS.forEach((s) => s.btn.addEventListener('click', () => snsSet(snsAt === s ? null : s)));
const snsOut = (e) => snsAt && e.target instanceof Element && !e.target.closest('.sns-dock');
document.addEventListener('contextmenu', (e) => { if (snsOut(e)) { e.preventDefault(); snsSet(null); } });
document.addEventListener('click', (e) => { if (snsOut(e) && matchMedia('(hover: none)').matches) snsSet(null); });
addEventListener('keydown', (e) => { if (e.key === 'Escape' && snsAt) { const b = snsAt.btn; snsSet(null); b.focus(); } });
/* the buttons are there on the home page only (js/router.js); leaving it shuts the window at once */
function snsShow(on) {
  snsDock.hidden = !on;
  if (!on && snsAt) { const p = snsAt.pop; snsSet(null); if (p.anim) p.anim.finish(); }
}
