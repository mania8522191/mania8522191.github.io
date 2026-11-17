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

/* ---------- the newest posts on X, the account's own with a picture (no reposts, replies, quotes, or posts of words
   only): x-latest.json, with their pictures in img/x/, which .github/workflows/x-latest.yml brings up to date every
   hour (tools/x_latest.py). Each shows its picture with its first words under it, then its date with its reposts and
   likes (read again once a day). A click opens the post on X. ---------- */
const xGrid = $('#x-grid');
function xText() {
  xGrid.querySelectorAll('.x-item').forEach((a) => {
    const s = tr('x.stats', { rt: a.dataset.rt, like: a.dataset.like });
    a.setAttribute('aria-label', `${tr('x.post', { d: dot(a.dataset.d) })} ${s}`);
    a.querySelector('.st-row').title = s;
  });
  statText(xGrid);
}
fetch('x-latest.json', { cache: 'no-cache' })
  .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
  .then(({ posts }) => {
    const shown = posts.filter((p) => p.img);
    xGrid.replaceChildren(...shown.map((p) => {
      const a = el('a', `x-item x-${p.kind}`), pic = el('span', 'x-pic'), im = el('img');
      a.href = p.url; a.target = '_blank'; a.rel = 'noopener';
      a.dataset.d = p.d; a.dataset.rt = p.rt || 0; a.dataset.like = p.like || 0;
      im.alt = ''; im.loading = 'lazy'; im.decoding = 'async'; im.src = p.img;
      pic.append(im);
      a.append(pic, el('span', 'x-t', p.text), dateLine('x-d', p.d, [['rt', p.rt], ['heart', p.like]]));
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
  s.pop.style.bottom = `${snsDock.offsetHeight - s.btn.offsetTop - b}px`;
  inner.style.maxHeight = `${Math.max(160, s.btn.getBoundingClientRect().bottom - $('.site-head').getBoundingClientRect().bottom - 14)}px`;
  return [inner.offsetWidth + 2, inner.offsetHeight + 2];
}
/* the ring opens into the window, or the window closes back into the ring, from wherever it is now. On the way it
   also takes on the window's darker ground and deeper shadow, or gives them back for the button's, so that where the
   window ends as the ring, the button takes over looking just the same */
function snsMove(s, open) {
  const pop = s.pop, b = `${s.btn.offsetWidth}px`, dock = getComputedStyle(snsDock), now = getComputedStyle(pop);
  const ring = { width: b, height: b, backgroundColor: dock.getPropertyValue('--ring-bg').trim(), boxShadow: dock.getPropertyValue('--ring-shadow').trim() };
  const from = pop.hidden ? ring : { width: now.width, height: now.height, backgroundColor: now.backgroundColor, boxShadow: now.boxShadow };
  if (pop.anim) pop.anim.cancel();
  pop.hidden = false;
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
