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
  heroCap.querySelector('.hero-cap-t').textContent = s.w.t;
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
  SLIDES.forEach((s, i) => s.dot.setAttribute('aria-label', tr('home.dot', { n: i + 1, t: s.w.t })));
}
heroPick();

/* ---------- under the carousel, the latest three videos on the YouTube channel, newest first: yt-latest.json, which
   .github/workflows/yt-latest.yml brings up to date every hour (tools/yt_latest.py). A click plays one here. ---------- */
const ytGrid = $('#yt-grid');
function ytText() {
  ytGrid.querySelectorAll('.tl-card').forEach((c) => c.setAttribute('aria-label', tr('tl.play', { t: c.dataset.t })));
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
      if (window.SELF_HOSTED) ytInline(card, v.id, v.t);
      item.append(card, el('p', 'yt-t', v.t), el('p', 'yt-d', dot(v.d)));
      return item;
    }));
    ytText();
    $('#home-yt').hidden = !videos.length;
  })
  .catch(() => {});   // no list: the section stays hidden
