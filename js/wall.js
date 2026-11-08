/* Works wall: categories, year headers and bar, sort menu, the cover layout */
/* ---------- cover wall: masonry; wide works span two columns so every cover shows its art at a similar
   scale, tall ones keep one full column, nothing is cropped, and later covers fill any hole ---------- */
const wall = $('#wall');
WORKS.forEach((w, i) => {
  const [W, H] = w.dims[0];
  const r = W / H;

  const a = document.createElement('a');
  a.className = 'cover';
  a.id = 'c-' + w.id;
  a.href = '#w-' + w.id;
  a.dataset.rv = 'fly';
  a.dataset.d = `${(Math.random() * 0.22).toFixed(2)}s`;
  a.dataset.r = r.toFixed(4);
  a.dataset.date = w.d;
  a.dataset.cat = w.cat;
  a.style.cssText = `--ar:${r.toFixed(4)};--pos:${w.pos}`;
  {   // a different direction for every cover, and every visit
    const ang = Math.random() * Math.PI * 2, dist = (150 + Math.random() * 150) * (innerWidth < 700 ? 0.55 : 1);
    a.style.setProperty('--fx', `${Math.round(Math.cos(ang) * dist)}px`);
    a.style.setProperty('--fy', `${Math.round(Math.sin(ang) * dist)}px`);
    a.style.setProperty('--fr', `${(Math.random() * 24 - 12).toFixed(1)}deg`);
  }
  a.innerHTML = `<span class="frame mask"><img src="${src(w.id, 0)}" width="${W}" height="${H}" alt="" loading="${i < 4 ? 'eager' : 'lazy'}" decoding="async"><span class="ov" aria-hidden="true"><span class="ov-t"></span><span class="ov-m"></span></span></span><span class="cap" aria-hidden="true"><span class="cap-t"></span><span class="cap-m"></span></span>`;
  a.querySelector('.ov-t').textContent = w.t;
  a.querySelector('.cap-t').textContent = w.t;
  fillCover(a, w);
  wall.appendChild(a);
});
function fillCover(a, w) {
  const meta = `${dot(w.d.slice(0, 7))}${w.dims.length > 1 ? ' · ' + tr('cover.pages', { n: w.dims.length }) : ''}${w.yt ? ' · ' + tr('cover.video') : ''}`;
  a.setAttribute('aria-label', `${w.t} (${dot(w.d)})`);
  a.querySelector('.ov-m').textContent = meta;
  a.querySelector('.cap-m').textContent = meta;
}
/* Collage layout on a tight skeleton. Two lanes on wide screens (one on narrow ones), each two columns
   wide: a wide work fills a lane; single-column works go side by side with the next one in date order,
   so every cover keeps its whole picture and detail reads at one scale. Units go strictly in date order
   (newest or oldest first, as chosen), top left first, each into the shorter lane.
   On top of that, chance decides each cover's exact size (86-100% of its slot), its offset in the slot,
   the gaps, a small stagger between partners, an occasional tuck over the cover above or spill toward the
   next lane, and a slight tilt that straightens on hover. Touch screens get no overlaps, because their
   titles sit under the pictures. A new seed per page load gives a new arrangement; it stays put while
   browsing, so a cover is where you left it. */
const WALL_SEED = (Math.random() * 2 ** 32) >>> 0;
function seeded(seed) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
/* the wall shows one category at a time (Fan Art / Original Art); the other category's covers are hidden */
const allCovers = [...wall.querySelectorAll('.cover')].sort((a, b) => b.dataset.date.localeCompare(a.dataset.date) || b.id.localeCompare(a.id));
let wallOrder = [], wallCat = '', wallSort = 'new';   // wallSort: 'new' newest first, 'old' oldest first
let wallUnits = null;
/* the wall doubles as the timeline: a header opens every year, and the year bar above jumps between them */
let YEARS = [];   // in wall order
const yearHead = new Map();
const yearsIn = $('#years-in'), yearsBar = $('#years'), yearsProg = $('#years-prog');
/* show one category on the wall; returns whether it changed */
const nsfwBox = $('#nsfw');
function setCat(cat) {
  if (!CAT_LIST[cat] && cat !== 'nsfw') cat = 'fan';
  if (cat === wallCat) return false;
  wallCat = cat;
  indexWall();
  return true;
}
/* newest first or oldest first; returns whether it changed */
function setSort(dir) {
  if (dir === wallSort || (dir !== 'new' && dir !== 'old')) return false;
  wallSort = dir;
  if (wallCat) indexWall(); else sortText();
  return true;
}
/* a SORT pill and its menu (works wall, art books): open / close, newest or oldest first, Esc and arrow keys;
   the tap that closes it does not also open what is underneath. Returns the function that writes its words. */
function sortControl(box, onPick) {
  const btn = box.querySelector('.sortx-btn'), menu = box.querySelector('.sortx-menu');
  const open = (on) => {
    box.classList.toggle('open', on);
    btn.setAttribute('aria-expanded', String(on));
    if (on) menu.querySelector('[aria-checked="true"]').focus({ preventScroll: true });
  };
  btn.addEventListener('click', () => open(!box.classList.contains('open')));
  menu.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-sort]');
    if (!b) return;
    open(false);
    btn.focus({ preventScroll: true });
    onPick(b.dataset.sort);
  });
  document.addEventListener('click', (e) => {
    if (!box.classList.contains('open') || box.contains(e.target)) return;
    open(false);
    e.preventDefault(); e.stopPropagation();
  }, true);
  addEventListener('keydown', (e) => {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') { open(false); btn.focus(); }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const opts = [...menu.querySelectorAll('button')], k = opts.indexOf(document.activeElement);
      opts[(k + (e.key === 'ArrowDown' ? 1 : opts.length - 1)) % opts.length].focus();
    }
  });
  /* current order on the pill; each option shows which way its years run (a: earliest, b: latest) */
  return (dir, a, b) => {
    box.dataset.dir = dir;
    menu.querySelectorAll('button[data-sort]').forEach((x) => {
      x.setAttribute('aria-checked', String(x.dataset.sort === dir));
      x.querySelector('.sortx-hint').textContent = x.dataset.sort === 'new' ? `${b} → ${a}` : `${a} → ${b}`;
    });
    const v = tr(dir === 'new' ? 'sort.new' : 'sort.old');
    box.querySelector('.sortx-v').textContent = v;
    btn.setAttribute('aria-label', tr('sort.label', { v }));
  };
}
/* after a re-sort the year buttons slide from where they were to their new places */
const yearSpots = (bar) => new Map([...bar.querySelectorAll('button')].map((y) => [y.dataset.y, y.getBoundingClientRect().left]));
function slideYears(bar, was) {
  if (CALM) return;
  bar.querySelectorAll('button').forEach((y, i) => {
    const dx = (was.get(y.dataset.y) ?? y.getBoundingClientRect().left) - y.getBoundingClientRect().left;
    if (Math.abs(dx) > 1) y.animate([{ transform: `translateX(${dx}px)` }, { transform: 'none' }], { duration: 750, delay: i * 25, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' });
  });
}
const worksSortText = sortControl($('#sort'), (dir) => {
  const was = yearSpots(yearsIn);
  if (!setSort(dir)) return;
  const els = prime(wall);   // the covers fly back in, in the new order
  layoutWall();
  watch(els);
  slideYears(yearsIn, was);
  const top = wall.getBoundingClientRect().top + scrollY - $('.site-head').offsetHeight - yearsBar.offsetHeight - 14;
  if (scrollY > top + 4) scrollTo({ top, behavior: CALM ? 'auto' : 'smooth' });   // start of the wall in its new order
});
function sortText() {
  const { a, b } = catVars();
  worksSortText(wallSort, a, b);
}
/* the covers of the category in date order, with their year headers and year bar */
function indexWall() {
  wallOrder = allCovers.filter((c) => c.dataset.cat === wallCat);
  if (wallSort === 'old') wallOrder.reverse();
  allCovers.forEach((c) => { c.hidden = c.dataset.cat !== wallCat; });
  const nsfw = wallCat === 'nsfw';   // no wall, year bar or sort menu: the blurred previews and the album link instead
  wall.hidden = yearsBar.hidden = nsfw;
  nsfwBox.hidden = !nsfw;
  YEARS = [...new Set(wallOrder.map((c) => c.dataset.date.slice(0, 4)))];
  yearHead.forEach((hd) => hd.remove());
  yearHead.clear();
  yearsIn.replaceChildren();
  YEARS.forEach((y) => {
    const hd = el('div', 'wall-year'); hd.dataset.y = y; hd.dataset.rv = 'year'; hd.setAttribute('aria-hidden', 'true');
    hd.append(el('span', 'wy-n', y), el('span', 'wy-line'), el('span', 'wy-c'));
    wall.appendChild(hd); yearHead.set(y, hd);
    const b = el('button', '', y); b.type = 'button'; b.dataset.y = y;
    yearsIn.appendChild(b);
  });
  wallUnits = null;
  yearNow = '';
  yearText();
  catText();
  sortText();
}
/* {n} works between {a} and {b} for the category on the wall */
function catVars() {
  const list = CAT_LIST[wallCat] || CAT_LIST.fan, ys = list.map((w) => w.d.slice(0, 4)).sort();
  return { n: list.length, a: ys[0], b: ys[ys.length - 1] };
}
function catText() {
  const sub = $('#works-sub');
  sub.dataset.i18n = wallCat === 'nsfw' ? 'nsfw.sub' : 'works.sub';
  sub.textContent = tr(sub.dataset.i18n, catVars());
  $('#cats').querySelectorAll('a').forEach((a) => {
    a.setAttribute('aria-current', String(a.dataset.cat === (wallCat || 'fan')));
    if (CAT_LIST[a.dataset.cat]) a.querySelector('.cats-n').textContent = CAT_LIST[a.dataset.cat].length;
  });
}
function yearText() {
  yearHead.forEach((hd, y) => {
    const n = wallOrder.filter((c) => c.dataset.date.startsWith(y)).length;
    hd.querySelector('.wy-c').textContent = LANG === 'en' && n === 1 ? '1 work' : tr('wall.count', { n });
  });
  yearsIn.querySelectorAll('button').forEach((b) => b.setAttribute('aria-label', tr('years.go', { y: b.dataset.y })));
}
yearsIn.addEventListener('click', (e) => {
  const b = e.target.closest('button');
  if (!b) return;
  const head = $('.site-head').offsetHeight, bar = yearsBar.offsetHeight;
  const top = yearHead.get(b.dataset.y).getBoundingClientRect().top + scrollY - head - bar - 14;
  scrollTo({ top, behavior: CALM ? 'auto' : 'smooth' });
});
let yearsRaf = 0, yearNow = '';
function yearsUpdate() {
  yearsRaf = 0;
  if (VIEWS.home.hidden || wall.hidden) return;
  const line = yearsBar.getBoundingClientRect().bottom + 48;
  let cur = YEARS[0];
  for (const y of YEARS) { if (yearHead.get(y).getBoundingClientRect().top <= line) cur = y; else break; }
  if (cur !== yearNow) {
    yearNow = cur;
    yearsIn.querySelectorAll('button').forEach((b) => {
      const on = b.dataset.y === cur;
      b.setAttribute('aria-current', String(on));
      if (on && yearsIn.scrollWidth > yearsIn.clientWidth) yearsIn.scrollTo({ left: b.offsetLeft - (yearsIn.clientWidth - b.offsetWidth) / 2, behavior: CALM ? 'auto' : 'smooth' });
    });
  }
  const wr = wall.getBoundingClientRect();
  yearsProg.style.transform = `scaleX(${Math.min(1, Math.max(0, (line - wr.top) / wr.height)).toFixed(4)})`;
}
addEventListener('scroll', () => { if (!yearsRaf) yearsRaf = requestAnimationFrame(yearsUpdate); }, { passive: true });
/* units in date order: a wide work alone; a single-column work beside the next single-column one of the same year.
   When that one is far taller or shorter, the closest in height among the next few takes its place, so a long work
   is not left beside a short one; if even that is far shorter, the works after it stack under the short one */
function buildUnits() {
  const items = wallOrder.map((el) => ({ el, r: +el.dataset.r, y: el.dataset.date.slice(0, 4) }));
  const units = [], used = new Set();
  const fits = (c, y) => c.y === y && c.r < 1.4;   // single-column, same year
  for (let k = 0; k < items.length; k++) {
    if (used.has(k)) continue;
    const a = items[k];
    if (a.r >= 1.4) { units.push({ a }); continue; }
    let pick = -1, pickQ = Infinity;
    for (let j = k + 1, n = 0; j < items.length && n < 3; j++) {
      if (used.has(j)) continue;
      if (!fits(items[j], a.y)) break;   // never past a wide work or into the next year
      n++;
      const q = Math.max(a.r, items[j].r) / Math.min(a.r, items[j].r);   // how much taller one is than the other
      if (pick < 0 || q < pickQ - 0.25) { pick = j; pickQ = q; }
      if (pickQ < 1.5) break;   // close enough: keep the date order
    }
    if (pick < 0) { units.push({ a, b: null, pair: true }); continue; }
    used.add(pick);
    const u = { a, b: items[pick], pair: true };
    if (pickQ > 1.8) {   // still a long one beside a short one: fill the short side's column with the next works
      let room = Math.abs(1 / a.r - 1 / u.b.r);   // the height left beside the long one, in column widths
      const more = [];
      for (let j = Math.max(k, pick) + 1; j < items.length && room > 0.6; j++) {
        if (used.has(j)) continue;
        const c = items[j];
        if (!fits(c, a.y) || 1 / c.r > room + 0.3) break;
        used.add(j);
        more.push(c);
        room -= 1 / c.r + 0.1;
      }
      if (more.length) u[a.r < u.b.r ? 'sb' : 'sa'] = more;   // under whichever of the two is shorter
    }
    units.push(u);
  }
  return units;
}
function placeCover(el, x, y, tilt) {
  el.style.left = `${Math.round(x)}px`;
  el.style.top = `${Math.round(y)}px`;
  el.style.setProperty('--tilt', `${tilt ? tilt.toFixed(2) : 0}deg`);
}
function layoutWall() {
  if (VIEWS.home.hidden || !wall.clientWidth) return;
  const rand = seeded(WALL_SEED);
  wallUnits = wallUnits || buildUnits();
  const W = wall.clientWidth;
  const lanes = W >= 680 ? 2 : 1;
  const gap = W >= 1000 ? 26 : W >= 600 ? 18 : 12;
  const laneW = (W - (lanes - 1) * gap) / lanes;
  const colW = (laneW - gap) / 2;
  const touch = matchMedia('(hover: none)').matches;
  const plan = wallUnits.map((u) => {
    const p = { u, wa: u.pair ? colW * (0.9 + rand() * 0.1) : laneW * (0.86 + rand() * 0.14) };
    if (u.b) p.wb = colW * (0.9 + rand() * 0.1);
    p.ex = u.sa || u.sb || [];
    p.we = p.ex.map(() => colW * (0.9 + rand() * 0.1));
    u.a.el.style.width = `${Math.round(p.wa)}px`;
    if (u.b) u.b.el.style.width = `${Math.round(p.wb)}px`;
    p.ex.forEach((c, i) => { c.el.style.width = `${Math.round(p.we[i])}px`; });
    return p;
  });
  const h = new Map(wallOrder.map((el) => [el, el.offsetHeight]));   // one layout pass for every cover
  const laneH = new Array(lanes).fill(0);
  const tilt = () => (rand() < 0.5 ? (rand() - 0.5) * 2 : 0);
  const fresh = new Array(lanes).fill(true);   // nothing placed in this lane since the last year header
  const perYear = new Map();
  plan.forEach((p) => { const y = p.u.a.el.dataset.date.slice(0, 4); perYear.set(y, (perYear.get(y) || 0) + 1); });
  let z = 1, curYear = '';
  plan.forEach((p, k) => {
    const yr = p.u.a.el.dataset.date.slice(0, 4);
    if (yr !== curYear) {
      curYear = yr;
      const hd = yearHead.get(yr);
      const top = k === 0 ? 0 : Math.max(...laneH) + gap * 2.6;
      hd.style.top = `${Math.round(top)}px`;
      laneH.fill(top + hd.offsetHeight + gap * 1.1);
      fresh.fill(true);
    }
    let L = 0;
    if (lanes === 2 && k > 0) {
      const d = laneH[1] - laneH[0];
      L = d < -60 ? 1 : 0;   // the shorter lane, the left one when they are level, so the order reads left to right
    }
    const lone = lanes === 2 && perYear.get(yr) === 1;   // the only unit of its year: centre it rather than leave a lane empty
    const x0 = lone ? (W - laneW) / 2 + (rand() - 0.5) * gap * 3 : L * (laneW + gap);
    const tuck = !touch && !fresh[L] && laneH[L] > 0 && rand() < 0.25 ? 8 + rand() * 14 : 0;   // never into a year header
    const y0 = laneH[L] === 0 ? rand() * gap : laneH[L] + (tuck ? -tuck : gap * (0.55 + rand() * 0.9));
    const { u } = p;
    let bottom;
    if (u.pair) {
      const ya = y0 + rand() * 24;
      const xa = u.b ? x0 + (colW - p.wa) * rand() : x0 + (laneW - p.wa) / 2 + (rand() - 0.5) * gap;   // a lone one sits mid-lane
      placeCover(u.a.el, xa, ya, tilt());
      let botA = ya + h.get(u.a.el), botB = botA;
      if (u.b) {
        const yb = y0 + rand() * 24, xb = x0 + colW + gap + (colW - p.wb) * rand();
        placeCover(u.b.el, xb, yb, tilt());
        botB = yb + h.get(u.b.el);
      }
      if (p.ex.length) {   // the works stacked under the short one, beside the long one
        const cx = u.sa ? x0 : x0 + colW + gap;
        let yy = u.sa ? botA : botB;
        p.ex.forEach((c, i) => {
          const y = yy + gap * (0.6 + rand() * 0.6);
          placeCover(c.el, cx + (colW - p.we[i]) * rand(), y, tilt());
          yy = y + h.get(c.el);
        });
        if (u.sa) botA = yy; else botB = yy;
      }
      bottom = Math.max(botA, botB);
    } else {
      const spill = !touch && lanes === 2 && !lone && rand() < 0.18 ? (L === 0 ? 1 : -1) * (6 + rand() * 16) : 0;
      const xa = Math.min(W - p.wa, Math.max(0, x0 + (laneW - p.wa) * rand() + spill));
      placeCover(u.a.el, xa, y0, tilt());
      bottom = y0 + h.get(u.a.el);
    }
    u.a.el.style.zIndex = String(++z);
    if (u.b) u.b.el.style.zIndex = String(++z);
    p.ex.forEach((c) => { c.el.style.zIndex = String(++z); });
    laneH[L] = bottom;
    fresh[L] = false;
  });
  wall.style.height = `${Math.ceil(Math.max(...laneH))}px`;
  yearNow = '';
  yearsUpdate();
}
let wallRaf = 0;
addEventListener('resize', () => { cancelAnimationFrame(wallRaf); wallRaf = requestAnimationFrame(layoutWall); });
if (document.fonts) document.fonts.ready.then(layoutWall);
