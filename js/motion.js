/* Motion: reduced-motion switch, scroll reveals, hero parallax */
/* ---------- motion ---------- */
const CALM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const VT = !!document.startViewTransition && !CALM;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const onScreen = (e) => { if (!e) return false; const r = e.getBoundingClientRect(); return r.width > 0 && r.bottom > 0 && r.top < innerHeight; };

/* static elements that tween in as they scroll into view: [selector, kind, delay] */
[['.sec-title', 'track'], ['.cats', 'up', 0.08],['.sec-sub', 'up', 0.15],['.g-shop', 'up'], ['.group-t', 'up'],
 ['.facts', 'up', 0.3], ['.gd-actions', 'up', 0.35], ['#it-works-box', 'up'], ['.proj-nav', 'up']]
  .forEach(([sel, kind, d]) => document.querySelectorAll(sel).forEach((e) => { e.dataset.rv = kind; if (d) e.dataset.d = d + 's'; }));
document.querySelectorAll('.about-txt p').forEach((e, i) => { e.dataset.rv = 'up'; e.dataset.d = (0.15 + i * 0.12) + 's'; });
document.querySelectorAll('.g-head').forEach((h) => [...h.children].forEach((e, i) => { e.dataset.rv = 'up'; e.dataset.d = (i * 0.08) + 's'; }));
document.querySelectorAll('.channels').forEach((ul) => ul.querySelectorAll('li').forEach((li, i) => { li.dataset.rv = 'x'; li.dataset.d = (i * 0.07) + 's'; }));
document.querySelectorAll('.facts dd').forEach((dd) => { if (+dd.textContent < 1000) dd.dataset.count = dd.textContent; });

const io = !CALM && 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('rv-in');
        io.unobserve(e.target);
        if (e.target.querySelector('[data-count]')) countUp(e.target);
      }
    }, { rootMargin: '0px 0px -8% 0px' })
  : null;

/* put a view's reveal elements in their start state; returns the ones to watch */
function prime(root) {
  if (!io) return [];
  const els = [...root.querySelectorAll('[data-rv]')];
  for (const t of els) {
    io.unobserve(t);
    if (t.dataset.d) t.style.setProperty('--d', t.dataset.d);
    t.classList.remove('rv-in', 'rv-now');
    t.classList.add('rv-pre');
  }
  return els;
}
const pending = (root) => (io ? [...root.querySelectorAll('[data-rv]:not(.rv-in)')] : []);
const watch = (els) => { if (io) els.forEach((t) => io.observe(t)); };
/* the element a page morph lands on must be in place at once, without its own tween */
function showNow(e) {
  const r = e && e.closest('[data-rv]');
  if (!r) return;
  if (io) io.unobserve(r);
  r.classList.add('rv-pre', 'rv-in', 'rv-now');
}
function countUp(root) {
  root.querySelectorAll('[data-count]').forEach((dd) => {
    const to = +dd.dataset.count, t0 = performance.now(), dur = 1500;
    const step = (now) => {
      const k = Math.min(1, (now - t0) / dur);
      dd.textContent = String(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) requestAnimationFrame(step);
    };
    dd.textContent = '0';
    requestAnimationFrame(step);
  });
}

/* hero parallax: the art drifts slower than the page, the name lifts and fades */
const hero = $('.hero'), heroMedia = $('.hero-media'), heroTxt = $('.hero-txt');
let rafId = 0;
function parallax() {
  rafId = 0;
  if (view !== 'home') return;
  const y = Math.max(0, scrollY), h = hero.offsetHeight;
  if (y > h + 60) return;
  heroMedia.style.transform = `translate3d(0,${(y * 0.35).toFixed(1)}px,0)`;
  heroTxt.style.transform = `translate3d(0,${(y * 0.18).toFixed(1)}px,0)`;
  heroTxt.style.opacity = Math.max(0, 1 - y / (h * 0.8)).toFixed(3);
}
if (!CALM) addEventListener('scroll', () => { if (!rafId) rafId = requestAnimationFrame(parallax); }, { passive: true });
