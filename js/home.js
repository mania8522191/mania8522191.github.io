/* Home: a carousel of featured works under the name. Every visit shows HERO_N of the works in HOME_SLIDES (data.js),
   picked and ordered at random. A dot for each work picks it; a swipe or the arrow keys go to the next or previous one.
   It moves on by itself, except while the visitor is on its controls or prefers less motion. */
const heroSlides = $('#hero-slides'), heroDots = $('#hero-dots'), heroCap = $('#hero-cap');
const HERO_N = 5;       // how many works a visit shows
const HERO_MS = 6500;   // how long each work stays before the next one fades in
const heroPool = HOME_SLIDES.filter((s) => s.id in byId);
for (let i = heroPool.length - 1; i > 0; i--) {   // a new pick and order on every visit
  const j = Math.floor(Math.random() * (i + 1));
  [heroPool[i], heroPool[j]] = [heroPool[j], heroPool[i]];
}
const SLIDES = heroPool.slice(0, HERO_N).map((s) => ({ w: WORKS[byId[s.id]], pos: s.pos, keep: s.keep, turn: s.turn }));
/* pos says where the crop centres on the screen; a turned picture needs it in its own, unturned terms */
function turnPos(pos, turn) {
  const [x, y] = pos.split(' ').map(parseFloat);
  return turn === 90 ? `${y}% ${100 - x}%` : turn === -90 ? `${100 - y}% ${x}%` : pos;
}
let heroAt = -1, heroTimer = 0, heroHover = false, heroFocus = false, heroX = null;

SLIDES.forEach((s, i) => {
  s.box = el('div', 'hero-slide');
  s.img = el('img');
  s.img.alt = '';   // the title is in the link under the carousel
  s.img.decoding = 'async';
  s.img.style.objectPosition = s.turn ? turnPos(s.pos || '50% 50%', s.turn) : s.pos || s.w.pos || '';
  if (s.keep && !s.turn) {   // sized and placed by heroFit, over a blurred copy that fills whatever it leaves uncovered
    s.bg = el('img', 'hero-bg');
    s.bg.alt = '';
    s.bg.decoding = 'async';
    s.bg.style.objectPosition = s.img.style.objectPosition;
    s.box.append(s.bg);
    s.img.classList.add('hero-fit');
  }
  if (s.turn) {   // shown on its side: a box as tall as the screen is wide, turned around its centre
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
  heroSlides.append(s.box);
  heroDots.append(s.dot);
});

/* a picture is fetched only when its slide is next: the page copy, or the full-size one when it shows wider than
   that (sizes, from heroFit) on the screen's pixels */
function heroLoad(s) {
  if (s.img.src) return;
  const [w, h, zw] = s.w.dims[0], page = src(s.w.id, 0);
  s.img.width = w;
  s.img.height = h;
  s.img.sizes = '100vw';   // until heroFit knows how wide it shows
  heroFit(s);
  s.img.srcset = zw ? `${page} ${w}w, ${page.replace('img/', 'img/z/')} ${zw}w` : `${page} ${w}w`;
  s.img.src = page;
  if (s.bg) s.bg.src = page;
}

/* sizes: how wide the picture shows, so the browser picks a copy sharp enough for the screen's pixel density.
   A slide with keep (HOME_SLIDES: left, top, right, bottom in %) is also scaled and placed here so that part of
   the picture stays in view, above the title and the dots at the foot. On a screen too wide for that part, the
   picture is shown a little smaller than the screen and the blurred copy behind it fills the sides. */
function heroFit(s) {
  let W = heroSlides.clientWidth, H = heroSlides.clientHeight;
  if (!s || !W || !H) return;
  const d = s.w.dims[0], w = d[2] || d[0], h = d[3] || d[1];   // its shape (both copies have the same)
  if (s.turn) [W, H] = [H, W];   // a turned picture covers the screen on its side
  if (!s.keep || s.turn) { s.img.sizes = `${Math.ceil(Math.max(W, H * w / h))}px`; return; }   // cover: wider than the screen when the picture is wider
  const [x1, y1, x2, y2] = s.keep.map((v) => v / 100);
  const room = Math.min(H, heroCap.offsetTop - 12);   // where the kept part has to end: above the title
  const k = Math.min(Math.max(W / w, H / h), W / ((x2 - x1) * w), room / ((y2 - y1) * h));   // cover, unless the part would not fit
  const dw = w * k, dh = h * k;
  const [px, py] = (s.pos || '50% 50%').split(' ').map((v) => parseFloat(v) / 100);
  /* one axis: keep [a, b] of the picture between 0 and end; if the picture is as long as the screen, leave no gap */
  const along = (size, len, a, b, end, want) => {
    let lo = -a * len, hi = end - b * len;
    if (len < size) return Math.min(hi, Math.max(lo, (end - len) / 2));
    if (Math.max(lo, size - len) <= Math.min(hi, 0)) { lo = Math.max(lo, size - len); hi = Math.min(hi, 0); }
    return Math.min(hi, Math.max(lo, (size - len) * want));
  };
  const st = s.img.style;
  s.img.sizes = `${Math.ceil(dw)}px`;
  st.width = `${dw.toFixed(1)}px`;
  st.height = `${dh.toFixed(1)}px`;
  st.left = `${along(W, dw, x1, x2, W, px).toFixed(1)}px`;
  st.top = `${along(H, dh, y1, y2, room, py).toFixed(1)}px`;
}
const heroRefit = () => SLIDES.forEach((s) => { if (s.img.src) heroFit(s); });
if ('ResizeObserver' in window) new ResizeObserver(heroRefit).observe(heroSlides);   // also when the home page is shown again
else addEventListener('resize', heroRefit);

function heroShow(i) {
  const s = SLIDES[i];
  if (!s || i === heroAt) return;
  const first = heroAt < 0;
  if (!first) SLIDES[heroAt].box.classList.remove('on');
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
heroText();
if (SLIDES.length) {
  SLIDES[0].img.fetchPriority = 'high';
  heroShow(0);
}
