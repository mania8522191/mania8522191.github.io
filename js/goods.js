/* Goods: prices, the goods list, goods item pages */
/* price: [original struck] NT$x [/ 款] [場次價] */
function price(g, label) {
  const p = el('span', 'price');
  if (g.was) p.appendChild(el('s', '', `NT$${g.was}`));
  p.appendChild(document.createTextNode(`NT$${g.price}`));
  if (g.unit) p.appendChild(el('small', '', tr('price.per')));
  if (label) p.appendChild(el('small', '', tr('price.event')));
  return p;
}

/* ---------- goods list: by event, on a timeline with a bar and a sort menu like the art books'. Each event (a goods'
   `ev`, "FF47") is a section under its heading: its catalog (FF47_CATALOG), which opens its own page
   (#g-ff47-catalog) with the event's goods under its pages; an event without a catalog lists its goods here. Only
   events that have goods or a catalog are listed ---------- */
const goodsList = $('#g-list'), goodsBar = $('#g-events'), goodsNav = $('#g-events-in');
const goodsHeadings = new Map();   // each event's heading, in the order shown
const goodsEditions = [...new Set([...GOODS.map((g) => g.ev), FF47_CATALOG.ev])];   // GOODS lists the newest event first
let goodsOrder = 'new', catalogCard = null;
/* a goods card: its page of the catalog (pg), then its name, contents and price (fillGoodsCard, again in another
   language) */
function goodsCard(g, i) {
  const a = el('a', 'g-card');
  a.href = '#g-' + g.slug;
  a.id = 'gc-' + g.slug;
  a.dataset.rv = 'clip';
  a.dataset.d = `${(i % 3) * 0.1}s`;
  const box = el('span', 'g-img mask');
  const img = el('img');
  img.src = src(FF47_CATALOG.id, g.pg); [img.width, img.height] = FF47_CATALOG.dims[g.pg];
  img.alt = ''; img.loading = i < 3 ? 'eager' : 'lazy'; img.decoding = 'async';
  box.appendChild(img);
  a.append(box, el('span', 'g-name'), el('span', 'g-meta'), el('span', 'price'));
  fillGoodsCard(a, g);
  return a;
}
function fillGoodsCard(a, g) {
  a.querySelector('.g-name').textContent = L(g.name);
  a.querySelector('.g-meta').textContent = L(g.meta);
  a.querySelector('.price').replaceWith(price(g, false));
}
/* goods as cards, three to a row */
function goodsGrid(items) {
  const grid = el('div', 'g-grid');
  grid.append(...items.map(goodsCard));
  return grid;
}

/* the catalog's place in its event: its first three pages dealt as a hand of cards, as a collection's cover on the
   works wall, in page order from left to right, the first on top and each next one under it; then its name, how many
   pages, and an arrow to its page */
function catalogCover() {
  const a = el('a', 'catalog-cover');
  a.id = 'gc-ff47-catalog';
  a.href = '#g-ff47-catalog';
  const hand = handOf(FF47_CATALOG.dims.slice(0, 3).map(([W, H], n) => [src(FF47_CATALOG.id, n), W, H]), true);
  const fan = el('span', 'catalog-hand frame fan');
  fan.style.cssText = `--ar:${hand.r.toFixed(4)};--cw:${hand.cwp}`;
  fan.innerHTML = hand.cards;
  fan.append(...[...fan.children].reverse());   // the first page last, so in front
  const caption = el('span', 'catalog-caption');
  const title = el('span', 'g-name', tr('goods.catalog'));
  title.dataset.i18n = 'goods.catalog';
  const count = el('span', 'g-meta', pagesText(FF47_CATALOG.dims.length));
  count.id = 'catalog-cover-count';
  const arrow = el('span', 'catalog-arrow', '→');
  arrow.setAttribute('aria-hidden', 'true');
  caption.append(title, count, arrow);
  a.append(fan, caption);
  return a;
}
/* the list in the order picked (the newest event first, or the oldest), and the bar's buttons to match */
function renderGoods() {
  const editions = goodsOrder === 'new' ? goodsEditions : [...goodsEditions].reverse();
  goodsHeadings.clear();
  goodsNav.replaceChildren();
  goodsList.replaceChildren(...editions.map((code) => {
    const section = el('section', 'ab-year');
    const heading = el('h2', 'wall-year');
    heading.dataset.rv = 'year';
    heading.append(el('span', 'wy-n', code), el('span', 'wy-line'));
    goodsHeadings.set(code, heading);
    section.append(heading);
    const button = el('button', '', code);
    button.type = 'button';
    button.dataset.y = code;
    goodsNav.append(button);
    if (code === FF47_CATALOG.ev) section.append(catalogCard || (catalogCard = catalogCover()));   // dealt once a page load
    else section.append(goodsGrid(GOODS.filter((g) => g.ev === code)));
    return section;
  }));
  goodsText();
}
/* the words that change with the language: the sort menu's, and the catalog's page count */
function goodsText() {
  goodsSortText(goodsOrder, goodsEditions[goodsEditions.length - 1], goodsEditions[0]);
  const count = $('#catalog-cover-count');
  if (count) count.textContent = pagesText(FF47_CATALOG.dims.length);
}
/* the bar: a button goes to its event, the one in view lights up; another order lays the list out again, and the
   buttons slide to their new places */
const goodsYearsUpdate = timelineNavigation(goodsBar, goodsList, goodsHeadings);
const goodsSortText = sortControl($('#g-sort'), (dir) => {
  if (dir === goodsOrder) return;
  const was = yearSpots(goodsNav);
  goodsOrder = dir;
  renderGoods();
  watch(prime(goodsList));
  slideYears(goodsNav, was);
  const top = goodsList.getBoundingClientRect().top + scrollY - $('.site-head').offsetHeight - goodsBar.offsetHeight - 14;
  if (scrollY > top) scrollTo({ top, behavior: CALM ? 'auto' : 'smooth' });
  goodsYearsUpdate();
});
/* ---------- the FF47 catalog's page: its date and page count; its pages side by side, to be dragged left and right;
   then the event's goods, the cards that open their item pages ---------- */
const catalogPages = $('#catalog-pages');
/* made once (its words then follow the language: catalogText, and the cards in js/lang-switch.js); `fresh`, not back
   from one of its goods: from the first page */
function renderCatalog(fresh) {
  const catalog = FF47_CATALOG;
  if (!catalogPages.children.length) {
    catalogPages.replaceChildren(...catalog.dims.map(([width, height], i) => {
      const img = el('img');
      img.src = src(catalog.id, i);
      img.width = width; img.height = height;
      img.loading = i < 3 ? 'eager' : 'lazy';
      img.decoding = 'async';
      img.draggable = false;
      return img;
    }));
    $('#catalog-goods').replaceChildren(...GOODS.filter((g) => g.ev === catalog.ev).map(goodsCard));
  }
  if (fresh) catalogPages.scrollLeft = 0;
  catalogText();
  catalogAt();
}
/* the words that change with the language: the date, the page count, each page's description */
function catalogText() {
  const catalog = FF47_CATALOG, m = catalog.dims.length;
  $('#catalog-date').textContent = tr('wk.posted', { d: dot(catalog.d) });
  $('#catalog-count').textContent = pagesText(m);
  [...catalogPages.children].forEach((img, i) => { img.alt = tr('wk.imgAlt', { t: tr('goods.catalog'), n: i + 1, m }); });
}
/* the pages side by side: the mouse drags them left and right (a finger swipes them, a trackpad scrolls them), and
   each comes to rest in the middle (scroll snap); a drag of a fifth of a page or more goes on to the next one. The
   arrows under them turn a page, and the count between shows the page in the middle. A page clicked without being
   dragged opens in a picture window */
let catalogDrag = null;
const catalogStep = () => { const [a, b] = catalogPages.children; return b ? b.offsetLeft - a.offsetLeft : 0; };
function catalogAt() {
  const step = catalogStep(), n = catalogPages.children.length;
  const i = step ? Math.min(n - 1, Math.max(0, Math.round(catalogPages.scrollLeft / step))) : 0;
  $('#catalog-at').textContent = `${i + 1} / ${n}`;
  $('#catalog-prev').disabled = i === 0;
  $('#catalog-next').disabled = i === n - 1;
  return i;
}
function catalogGo(i) {
  const n = catalogPages.children.length;
  catalogPages.scrollTo({ left: Math.min(n - 1, Math.max(0, i)) * catalogStep(), behavior: CALM ? 'auto' : 'smooth' });
}
catalogPages.addEventListener('pointerdown', (e) => {
  if (e.pointerType !== 'touch' && e.button === 0) catalogDrag = { x: e.clientX, left: catalogPages.scrollLeft, id: e.pointerId, moved: false };
});
catalogPages.addEventListener('pointermove', (e) => {
  const d = catalogDrag;
  if (!d || e.pointerId !== d.id || (!d.moved && Math.abs(e.clientX - d.x) < 6)) return;
  if (!d.moved) {   // a drag, not a click: the pages follow the mouse, unsnapped
    d.moved = true;
    catalogTo = null;   // (taken again while still gliding)
    catalogPages.setPointerCapture(d.id);
    catalogPages.classList.add('held');
  }
  catalogPages.scrollLeft = d.left - (e.clientX - d.x);
});
/* let go, the pages glide to the page in the middle with snapping off, and it comes back once they are there: not at
   the first scrollend, which can be the drag's own last move, so that snapping came back as the glide began and the
   pages jumped instead (it depended on how the mouse was let go) */
let catalogTo = null;   // where the pages are gliding to (scrollLeft)
function catalogRest() {
  if (catalogTo === null || (catalogDrag && catalogDrag.moved) || Math.abs(catalogPages.scrollLeft - catalogTo) > 1) return;
  catalogTo = null;
  catalogPages.classList.remove('held');
}
catalogPages.addEventListener('scrollend', catalogRest);
const catalogLetGo = (e) => {
  const d = catalogDrag;
  if (!d || e.pointerId !== d.id) return;
  catalogDrag = null;
  if (!d.moved) return;
  const step = catalogStep(), n = catalogPages.children.length, went = catalogPages.scrollLeft - d.left;
  let to = Math.round(catalogPages.scrollLeft / step);
  if (to === Math.round(d.left / step) && Math.abs(went) >= step / 5) to += Math.sign(went);
  to = Math.min(n - 1, Math.max(0, to));
  const target = catalogTo = to * step;
  catalogGo(to);
  catalogRest();   // already there: no glide, no scrollend
  setTimeout(() => {   // a glide cut short by another scroll: snapping comes back all the same
    if (catalogTo !== target || (catalogDrag && catalogDrag.moved)) return;
    catalogTo = null;
    catalogPages.classList.remove('held');
  }, 1500);
};
catalogPages.addEventListener('pointerup', catalogLetGo);
catalogPages.addEventListener('pointercancel', catalogLetGo);
catalogPages.addEventListener('scroll', catalogAt, { passive: true });
$('#catalog-prev').addEventListener('click', () => catalogGo(catalogAt() - 1));
$('#catalog-next').addEventListener('click', () => catalogGo(catalogAt() + 1));
catalogPages.addEventListener('click', (e) => {
  if (e.target.matches('img')) zvOpen('catalog', [...catalogPages.children].indexOf(e.target), e.target);
});

/* ---------- goods item page ---------- */
/* the picture: the item's page of the catalog, which the page morph lands on from the goods' card (js/router.js).
   A click (or Enter) takes the goods out, a step at a time: the page grows to the right, still a square, its words
   going under it (a View Transition morphs the page into its new place); then the page fades from over the cut-out
   goods (tools/goods_pieces.py) and the background, which lie just as it draws them, so only its words go; then the
   picture widens to the right over the background as the goods move together to its middle across (each keeps its
   place in the group; what is centred is the part of them inside the frame); then the background fades from round them. Then a piece taken with the mouse (or a pen)
   follows it about the room, lifted in front of the others, its middle never past the room's edges; a finger still
   scrolls the page. ✕ goes back the same steps: the pieces go home as the background fades in, the picture narrows to
   the page, the page fades in over them, the page shrinks back */
const itGd = $('#v-item .gd'), itStage = $('#it-stage'), itPage = $('#it-page'), itGoods = $('#it-goods');
const FADE = 600, WIDEN = 700, BG = 800;   // ms (css/goods.css): the page's fade, the widening (and the goods' move), the background's fade
let itTop = 0, itStep = 0;   // the pieces' stacking; the steps under way (a newer open or close calls off the older)
/* the picture's next step after ms, unless an open or a close has begun since */
function itemLater(ms, step) {
  const s = itStep;
  setTimeout(() => { if (s === itStep) step(); }, ms);
}
const itemPic = () => (itGd.classList.contains('open') ? null : itPage);   // what the page morph lands on, while it is the page
/* a change of the picture's layout, morphing the page into its new place (no morph: at once) */
function itemSwap(change, then) {
  if (!VT) { change(); then(); return; }
  itPage.style.viewTransitionName = 'gd-page';
  document.documentElement.classList.add('gd-swap');
  document.startViewTransition(change).finished.catch(() => {}).finally(() => {
    itPage.style.viewTransitionName = '';
    document.documentElement.classList.remove('gd-swap');
    then();
  });
}
function itemOpen() {
  if (itGd.classList.contains('open')) return;
  const s = ++itStep;
  itemSwap(() => {
    itGd.classList.add('open'); itStage.removeAttribute('role'); itStage.tabIndex = -1;
    /* the grown picture in view: where it was if it fits there, else as near as the screen lets it, never under the header */
    const r = itStage.getBoundingClientRect(), top = $('.site-head').getBoundingClientRect().bottom + 16;
    scrollBy(0, r.top - Math.max(top, Math.min(r.top, innerHeight - 16 - r.height)));
  }, () => {
    if (s !== itStep) return;
    itGd.classList.add('plain');   // the page's words fade; the goods and the background stay
    itemLater(CALM ? 0 : FADE, () => {
      itGd.classList.add('wide');   // the picture widens to the right over the background, the goods move to its middle
      itemCentre();
      itemLater(CALM ? 0 : WIDEN, () => { itGoods.classList.remove('glide'); itGd.classList.add('cut'); });
    });
  });
}
/* a piece's shape, row by row: where it is at least half opaque, as [left, right] in its own width (0–1), null for a
   clear row; read once from its picture (the site's own, so a canvas may read it) */
const itInk = new Map();
const idle = (f) => (window.requestIdleCallback ? requestIdleCallback(f, { timeout: 3000 }) : setTimeout(f, 400));
function itemInk(p) {
  if (itInk.has(p.src)) return itInk.get(p.src);
  if (!p.complete || !p.naturalWidth) return null;
  const w = Math.min(256, p.naturalWidth), h = Math.max(1, Math.round(w * p.naturalHeight / p.naturalWidth)), c = el('canvas');
  c.width = w; c.height = h;
  const g = c.getContext('2d', { willReadFrequently: true });
  g.drawImage(p, 0, 0, w, h);
  let px;
  try { px = g.getImageData(0, 0, w, h).data; } catch (_) { return null; }
  const rows = [];
  for (let y = 0; y < h; y++) {
    let a = -1, b = -1;
    for (let x = 0; x < w; x++) if (px[(y * w + x) * 4 + 3] >= 128) { if (a < 0) a = x; b = x; }
    rows.push(a < 0 ? null : [a / w, (b + 1) / w]);
  }
  itInk.set(p.src, rows);
  return rows;
}
/* the goods together to the middle of the frame across, each keeping its place in the group (the room: the frame's
   whole width already, the clip only shows it). What is centred is what of them lies within the frame's height, by
   their shapes: a piece reaching out under it (the big bag) still moves whole, to be dragged in, but its unseen part
   doesn't pull the group off the middle */
function itemCentre() {
  const ps = [...itGoods.children], sq = itGoods.getBoundingClientRect(), room = itStage.getBoundingClientRect();
  if (!ps.length || !sq.width) return;
  let a = Infinity, b = -Infinity;
  ps.forEach((p) => {
    const r = p.getBoundingClientRect(), rows = itemInk(p) || [[0, 1]], n = rows.length;
    const to = Math.min(n, Math.ceil((room.bottom - r.top) / r.height * n));
    for (let y = Math.max(0, Math.floor((room.top - r.top) / r.height * n)); y < to; y++) {
      if (rows[y]) { a = Math.min(a, r.left + rows[y][0] * r.width); b = Math.max(b, r.left + rows[y][1] * r.width); }
    }
  });
  if (a > b) return;   // none of them in the frame
  const d = ((room.left + room.right) / 2 - (a + b) / 2) / sq.width * 100;
  if (!CALM) itGoods.classList.add('glide');
  ps.forEach((p) => { p.style.left = `${(parseFloat(p.style.left) + d).toFixed(3)}%`; p.dataset.mid = p.style.cssText; });   // (where ✕ gathers them first)
}
function itemClose(now) {
  if (!itGd.classList.contains('open')) return;
  ++itStep;
  const shut = () => { itGd.classList.remove('open', 'wide', 'plain'); itStage.setAttribute('role', 'button'); itStage.tabIndex = 0; };
  const ps = [...itGoods.querySelectorAll('img')];
  itGoods.classList.remove('glide', 'home');   // (a close cut short leaves its class)
  itGd.classList.remove('cut');
  if (now || !VT || CALM) { ps.forEach((p) => { p.style.cssText = p.dataset.home; }); shut(); return; }
  /* the other way: the pieces gather into their group in the middle as the background fades back in; the picture
     narrows to the page as they move home with it; the page fades in over them; it shrinks */
  itGoods.classList.add('home');
  ps.forEach((p) => { p.style.cssText = p.dataset.mid || p.dataset.home; });
  itemLater(BG, () => {
    itGoods.classList.replace('home', 'glide');
    ps.forEach((p) => { p.style.cssText = p.dataset.home; });
    itGd.classList.remove('wide');
    itemLater(WIDEN, () => {
      itGoods.classList.remove('glide');
      itGd.classList.remove('plain');
      itemLater(FADE, () => itemSwap(shut, () => {}));
    });
  });
}
itStage.addEventListener('click', () => itemOpen());
itStage.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === ' ') && !itGd.classList.contains('open')) { e.preventDefault(); itemOpen(); }
});
$('#it-out').addEventListener('click', () => itemClose());
itGoods.addEventListener('pointerdown', (e) => {
  const p = e.target.closest('img');
  if (!p || !itGd.classList.contains('cut') || e.pointerType === 'touch' || e.button !== 0) return;
  e.preventDefault();
  /* places in % of the page's square; the room is the whole picture, the square at its left */
  const sq = itGoods.getBoundingClientRect(), room = itStage.getBoundingClientRect();
  const x0 = parseFloat(p.style.left), y0 = parseFloat(p.style.top);
  const pw = p.offsetWidth / sq.width * 100, ph = p.offsetHeight / sq.height * 100;
  const xMax = room.width / sq.width * 100 - pw / 2, yMax = room.height / sq.height * 100 - ph / 2;
  p.style.zIndex = ++itTop;
  p.classList.add('held');
  p.setPointerCapture(e.pointerId);
  const move = (m) => {
    const x = x0 + (m.clientX - e.clientX) / sq.width * 100, y = y0 + (m.clientY - e.clientY) / sq.height * 100;
    p.style.left = `${Math.min(xMax, Math.max(-pw / 2, x)).toFixed(3)}%`;
    p.style.top = `${Math.min(yMax, Math.max(-ph / 2, y)).toFixed(3)}%`;
  };
  const up = () => {
    p.classList.remove('held');
    p.removeEventListener('pointermove', move); p.removeEventListener('pointerup', up); p.removeEventListener('pointercancel', up);
  };
  p.addEventListener('pointermove', move); p.addEventListener('pointerup', up); p.addEventListener('pointercancel', up);
});
function renderItem(i) {
  const g = GOODS[i];
  $('#it-lab').textContent = L(g.eyebrow);
  $('#it-title').textContent = L(g.name);
  $('#it-price').replaceChildren(...price(g, true).childNodes);
  /* the picture: its page of the catalog, and under it the cut-out pieces (parts), in the page's pixels */
  const [W, H] = FF47_CATALOG.dims[g.pg];
  itemClose(true);
  itPage.src = src(FF47_CATALOG.id, g.pg); itPage.width = W; itPage.height = H;
  itPage.alt = tr('item.imgAlt', { t: L(g.name) });
  itGoods.replaceChildren(...g.parts.map(([x, y, w, h], n) => {
    const p = el('img');
    p.src = `img/goods-${g.slug}-${n + 1}.webp`; p.width = w; p.height = h; p.alt = ''; p.draggable = false; p.decoding = 'async';
    p.style.cssText = p.dataset.home = `left:${(x / W * 100).toFixed(3)}%;top:${(y / H * 100).toFixed(3)}%;width:${(w / W * 100).toFixed(3)}%`;
    return p;
  }));
  /* their shapes read ahead while nothing moves, so the widening doesn't wait on them (itemCentre) */
  for (const p of itGoods.children) p.decode().then(() => idle(() => itemInk(p)), () => {});

  const rows = [];
  if (g.size) rows.push([tr('spec.size'), L(g.size)]);
  if (g.spec) rows.push([tr('spec.spec'), L(g.spec)]);
  if (g.items) rows.push([tr('spec.' + g.list_title), L(g.items)]);
  if (g.note) rows.push([tr('spec.offer'), L(g.note)]);
  rows.push([tr('spec.debut'), tr('event')]);
  $('#it-spec').replaceChildren(...rows.map(([k, v], n) => {
    const d = el('div');
    d.dataset.rv = 'up';
    d.dataset.d = `${n * 0.07}s`;
    const dd = el('dd');
    if (Array.isArray(v)) { const ol = el('ol'); v.forEach((t) => ol.appendChild(el('li', '', t))); dd.appendChild(ol); }
    else dd.textContent = v;
    d.append(el('dt', '', k), dd);
    return d;
  }));

  $('#it-works-box').hidden = !g.works.length;
  $('#it-works').replaceChildren(...g.works.filter((id) => id in byId).map((id, n) => {
    const w = WORKS[byId[id]];
    const a = el('a'); a.href = '#w-' + id;
    a.dataset.rv = 'up'; a.dataset.d = `${n * 0.1}s`;
    const im = el('img'); im.src = src(id, 0); im.alt = ''; im.loading = 'lazy'; im.style.objectPosition = w.pos;
    a.append(im, el('span', '', L(w.t)));
    return a;
  }));

  const p = GOODS[(i - 1 + GOODS.length) % GOODS.length];
  const nx = GOODS[(i + 1) % GOODS.length];
  $('#it-prev').href = '#g-' + p.slug; $('#it-prev-t').textContent = L(p.name);
  $('#it-next').href = '#g-' + nx.slug; $('#it-next-t').textContent = L(nx.name);
}
