/* Works wall: categories, year headers and bar, sort menu, the cover layout */
/* ---------- cover wall: masonry; wide works span two columns so every cover shows its art at a similar
   scale, tall ones keep one full column, nothing is cropped, and later covers fill any hole ---------- */
const wall = $('#wall');
/* a cover: a picture that links on, with its words over it on hover (under it on touch screens); it flies in from
   a direction of its own, new on every visit. The wall's works, and a collection's pieces on its work page.
   `pics`: [src, width, height] of one picture, or of three dealt as a hand of cards (a collection on the wall). */
function makeCover(href, pics, pos, eager) {
  const fan = pics.length > 1 && handOf(pics, eager);
  const r = fan ? fan.r : pics[0][1] / pics[0][2], a = el('a', 'cover');
  a.href = href;
  a.dataset.rv = 'fly';
  a.dataset.d = `${(Math.random() * 0.22).toFixed(2)}s`;
  a.dataset.r = r.toFixed(4);
  if (fan) a.dataset.cw = fan.cw.toFixed(4);   // a card's share of the hand's width: the wall sizes the hand by its cards
  a.style.cssText = `--ar:${r.toFixed(4)};--pos:${pos}`;
  const ang = Math.random() * Math.PI * 2, dist = (150 + Math.random() * 150) * (innerWidth < 700 ? 0.55 : 1);
  a.style.setProperty('--fx', `${Math.round(Math.cos(ang) * dist)}px`);
  a.style.setProperty('--fy', `${Math.round(Math.sin(ang) * dist)}px`);
  a.style.setProperty('--fr', `${(Math.random() * 24 - 12).toFixed(1)}deg`);
  const art = fan ? `<span class="frame mask fan" style="--cw:${fan.cwp}">${fan.cards}` : `<span class="frame mask">${picTag(pics[0], eager)}`;
  a.innerHTML = `${art}<span class="ov" aria-hidden="true"><span class="ov-t"></span><span class="ov-m"></span></span></span><span class="cap" aria-hidden="true"><span class="cap-t"></span><span class="cap-m"></span></span>`;
  return a;
}
/* a picture [src, width, height] as an img tag */
function picTag([s, W, H], eager) {
  return `<img src="${s}" width="${W}" height="${H}" alt="" loading="${eager ? 'eager' : 'lazy'}" decoding="async">`;
}
/* pictures dealt as a hand of cards (dealCards), each on a card of its own shape: the cards (for a .frame.fan whose
   --cw is cwp, a card's share of the hand's width), the hand's width / height (r) and that share as a number (cw).
   A collection's cover on the works wall, a multi-picture post's on Home, the catalog's on the goods page */
function handOf(pics, eager) {
  const fan = dealCards(pics.map(([, W, H]) => W / H)), pct = (v) => `${(v * 100).toFixed(2)}%`;
  const cards = pics.map((p, k) => `<span class="fan-c" style="left:${pct(fan.cards[k].l)};top:${pct(fan.cards[k].t)};--r:${fan.cards[k].r.toFixed(1)}deg;--ca:${(p[1] / p[2]).toFixed(4)}">${picTag(p, eager)}</span>`).join('');
  return { r: fan.r, cw: fan.cw, cwp: pct(fan.cw), cards };
}
/* cards dealt loosely, from left to right and top to bottom: each a bit right of and below the one before and over
   it (the last in front), each at a slight turn of its own that grows from left to right, with a little chance in
   every step and turn so they never lie quite even (new on every page load, like the wall). Every card keeps its
   picture's shape at one width, so a squarer picture is a shorter card; the steps go between the cards' middles.
   Returns the box around them (width / height), a card's width (cw), and each card's top left corner before it
   turns (l, t) and its turn in degrees (r): fractions of that box. as: each card's width / height. */
function dealCards(as) {
  const hs = as.map((a) => 1 / a), hm = hs.reduce((s, h) => s + h, 0) / hs.length, wobble = (m) => (Math.random() * 2 - 1) * m;
  const cards = hs.map((h, k) => ({ h, mx: 0.5 + k * (0.34 + wobble(0.07)), my: hm / 2 + k * hm * (0.09 + wobble(0.04)), r: -8 + k * 7 + wobble(3) }));
  const xs = [], ys = [];
  for (const c of cards) {   // each card's corners, turned about its middle
    const t = c.r * Math.PI / 180, s = Math.sin(t), co = Math.cos(t);
    for (const [px, py] of [[-0.5, -c.h / 2], [0.5, -c.h / 2], [-0.5, c.h / 2], [0.5, c.h / 2]]) {
      xs.push(c.mx + px * co - py * s);
      ys.push(c.my + px * s + py * co);
    }
  }
  const x0 = Math.min(...xs), y0 = Math.min(...ys), W = Math.max(...xs) - x0, H = Math.max(...ys) - y0;
  return { r: W / H, cw: 1 / W, cards: cards.map((c) => ({ l: (c.mx - 0.5 - x0) / W, t: (c.my - c.h / 2 - y0) / H, r: c.r })) };
}
/* a collection on the wall shows three of its pieces, any of them whatever its shape, a new pick on every page load,
   in number order along the deal (the last in front) */
function coverPieces(w) {
  const pool = w.dims.map((d, n) => n);
  for (let k = pool.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [pool[k], pool[j]] = [pool[j], pool[k]]; }
  return pool.length >= 3 ? pool.slice(0, 3).sort((a, b) => a - b) : pool.slice(0, 1);
}
function coverText(a, t, meta, label) {
  a.querySelector('.ov-t').textContent = a.querySelector('.cap-t').textContent = t;
  a.querySelector('.ov-m').textContent = a.querySelector('.cap-m').textContent = meta;
  a.setAttribute('aria-label', label);
}
WORKS.forEach((w) => {
  const picks = w.pieces ? coverPieces(w) : [0];
  const a = makeCover('#w-' + w.id, picks.map((n) => [src(w.id, n), w.dims[n][0], w.dims[n][1]]), w.pos, false);
  a.id = 'c-' + w.id;
  a.dataset.n = picks[picks.length - 1];   // the picture in front: the page morph lands on its piece (js/router.js)
  a.dataset.date = madeOn(w);   // finished: the wall's order and its year headers
  a.dataset.cat = w.cat;
  fillCover(a, w);
  wall.appendChild(a);
});
/* a work cover's words; again on a language change (a collection's title is in three languages) */
function fillCover(a, w) {
  const meta = `${dot(madeOn(w))}${w.dims.length > 1 ? ' · ' + tr('cover.pages', { n: w.dims.length }) : ''}${w.yt ? ' · ' + tr('cover.video') : ''}`;
  coverText(a, L(w.t), meta, `${L(w.t)} (${dot(madeOn(w))})`);
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
const allCovers = [...wall.querySelectorAll('.cover')].sort((a, b) => byMade(WORKS[byId[a.id.slice(2)]], WORKS[byId[b.id.slice(2)]]));
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
/* a timeline's bar (the art books', the goods'): a button scrolls to its year; the one in view lights up in the
   bar, and the gold line shows how far down the list you are. headings: each button's key to its heading, in
   the order shown. Returns the update, to call when the list is shown or laid out again */
function timelineNavigation(bar, list, headings) {
  const nav = bar.querySelector('.years-in');
  const progress = bar.querySelector('.years-prog i');
  nav.addEventListener('click', (e) => {
    const button = e.target.closest('button');
    if (!button) return;
    const heading = headings.get(button.dataset.y);
    const top = heading.getBoundingClientRect().top + scrollY - $('.site-head').offsetHeight - bar.offsetHeight - 14;
    scrollTo({ top, behavior: CALM ? 'auto' : 'smooth' });
  });
  let frame = 0;
  function update() {
    frame = 0;
    if (!bar.offsetHeight || !headings.size) return;
    const line = bar.getBoundingClientRect().bottom + 48;
    let current;
    for (const [key, heading] of headings) {
      if (current && heading.getBoundingClientRect().top > line) break;
      current = key;
    }
    for (const button of nav.querySelectorAll('button')) {
      const on = String(button.dataset.y === current);
      if (button.getAttribute('aria-current') === on) continue;
      button.setAttribute('aria-current', on);
      if (on === 'true' && nav.scrollWidth > nav.clientWidth) {
        nav.scrollTo({ left: nav.scrollLeft + button.getBoundingClientRect().left - nav.getBoundingClientRect().left - (nav.clientWidth - button.offsetWidth) / 2, behavior: CALM ? 'auto' : 'smooth' });
      }
    }
    const rect = list.getBoundingClientRect();
    progress.style.transform = `scaleX(${Math.min(1, Math.max(0, (line - rect.top) / rect.height)).toFixed(4)})`;
  }
  const schedule = () => { if (!frame && bar.offsetHeight) frame = requestAnimationFrame(update); };
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  return update;
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
  const list = CAT_LIST[wallCat] || CAT_LIST.fan, ys = list.map((w) => madeOn(w).slice(0, 4)).sort();
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
  if (VIEWS.works.hidden || wall.hidden) return;
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
/* units in date order: a wide work alone (and a collection's hand of cards: across a whole lane its cards come out
   about as big as the covers around them); a single-column work beside the next single-column one of the same year.
   When that one is far taller or shorter, the closest in height among the next few takes its place, so a long work
   is not left beside a short one; if even that is far shorter, the works after it stack under the short one */
function buildUnits(order) {
  const items = order.map((el) => ({ el, r: +el.dataset.r, wide: +el.dataset.r >= 1.4 || 'cw' in el.dataset, y: el.dataset.date.slice(0, 4) }));
  const units = [], used = new Set();
  const fits = (c, y) => c.y === y && !c.wide;   // single-column, same year
  for (let k = 0; k < items.length; k++) {
    if (used.has(k)) continue;
    const a = items[k];
    if (a.wide) { units.push({ a }); continue; }
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
  if (VIEWS.works.hidden || !wall.clientWidth) return;
  wallUnits = wallUnits || buildUnits(wallOrder);
  collage(wall, wallOrder, wallUnits, WALL_SEED, yearHead);
  yearNow = '';
  yearsUpdate();
}
/* place the covers of `order` (grouped into `units`) on `box`, the same way everywhere: the wall (with its year
   headers, `heads`) and a collection's pieces (no headers) */
function collage(box, order, units, seed, heads) {
  const rand = seeded(seed);
  const W = box.clientWidth;
  const lanes = W >= 680 ? 2 : 1;
  const gap = W >= 1000 ? 26 : W >= 600 ? 18 : 12;
  const laneW = (W - (lanes - 1) * gap) / lanes;
  const colW = (laneW - gap) / 2;
  const touch = matchMedia('(hover: none)').matches;
  const plan = units.map((u) => {
    const card = u.a.el.dataset.cw;   // a hand of cards: as wide as makes each card the size of a one-column cover
    const p = { u, wa: u.pair ? colW * (0.9 + rand() * 0.1) : card ? Math.min(laneW, colW * (0.9 + rand() * 0.1) / card) : laneW * (0.86 + rand() * 0.14) };
    if (u.b) p.wb = colW * (0.9 + rand() * 0.1);
    p.ex = u.sa || u.sb || [];
    p.we = p.ex.map(() => colW * (0.9 + rand() * 0.1));
    u.a.el.style.width = `${Math.round(p.wa)}px`;
    if (u.b) u.b.el.style.width = `${Math.round(p.wb)}px`;
    p.ex.forEach((c, i) => { c.el.style.width = `${Math.round(p.we[i])}px`; });
    return p;
  });
  const h = new Map(order.map((el) => [el, el.offsetHeight]));   // one layout pass for every cover
  const laneH = new Array(lanes).fill(0);
  const tilt = () => (rand() < 0.5 ? (rand() - 0.5) * 2 : 0);
  const fresh = new Array(lanes).fill(true);   // nothing placed in this lane since the last year header
  const perYear = new Map();
  plan.forEach((p) => { const y = p.u.a.el.dataset.date.slice(0, 4); perYear.set(y, (perYear.get(y) || 0) + 1); });
  let z = 1, curYear = '';
  plan.forEach((p, k) => {
    const yr = p.u.a.el.dataset.date.slice(0, 4);
    const hd = yr !== curYear && heads && heads.get(yr);
    curYear = yr;
    if (hd) {
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
    /* the only unit of its year: centre it rather than leave a lane empty. Only under a year header, which levels the
       lanes first: without one (a tag's page) a centred cover reached into the other lane, over what was there */
    const lone = heads && lanes === 2 && perYear.get(yr) === 1;
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
  box.style.height = `${Math.ceil(Math.max(...laneH))}px`;
}
let wallRaf = 0;
addEventListener('resize', () => { cancelAnimationFrame(wallRaf); wallRaf = requestAnimationFrame(layoutWall); });
if (document.fonts) document.fonts.ready.then(layoutWall);
