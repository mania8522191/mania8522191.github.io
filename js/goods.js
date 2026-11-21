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
const GOODS_COVER = [1400, 1050];   // a card's picture (tools/goods_pieces.py): 4:3, its frame's shape
let goodsOrder = 'new', catalogCard = null;
/* a goods card: its picture, then its name, contents and price (fillGoodsCard, again in another language) */
function goodsCard(g, i) {
  const a = el('a', 'g-card');
  a.href = '#g-' + g.slug;
  a.id = 'gc-' + g.slug;
  a.dataset.rv = 'clip';
  a.dataset.d = `${(i % 3) * 0.1}s`;
  const box = el('span', 'g-img mask');
  const img = el('img');
  img.src = `img/goods-${g.slug}.webp`; [img.width, img.height] = GOODS_COVER;
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

/* the catalog's place in its event: three of its pages dealt as a hand of cards, as a collection's cover on the works
   wall (a new pick on every page load), in page order from left to right, the first on top and each next one under
   it; then its name, how many pages, and an arrow to its page */
function catalogCover() {
  const a = el('a', 'catalog-cover');
  a.id = 'gc-ff47-catalog';
  a.href = '#g-ff47-catalog';
  const hand = handOf(coverPieces(FF47_CATALOG).map((n) => [src(FF47_CATALOG.id, n), ...FF47_CATALOG.dims[n].slice(0, 2)]), true);
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
/* ---------- the FF47 catalog's page: its date, page count and tags; its pages side by side, to be dragged left and
   right; then the event's goods, the cards that open their item pages ---------- */
const catalogPages = $('#catalog-pages');
/* made once (its words then follow the language: catalogText, and the cards in js/lang-switch.js); `fresh`, not back
   from one of its goods: from the first page */
function renderCatalog(fresh) {
  const catalog = FF47_CATALOG;
  if (!catalogPages.children.length) {
    $('#catalog-tags').replaceChildren(...catalog.tags.map((tag) => el('li', '', '#' + tag)));
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
    catalogPages.setPointerCapture(d.id);
    catalogPages.classList.add('held');
  }
  catalogPages.scrollLeft = d.left - (e.clientX - d.x);
});
const catalogLetGo = (e) => {
  const d = catalogDrag;
  if (!d || e.pointerId !== d.id) return;
  catalogDrag = null;
  if (!d.moved) return;
  const step = catalogStep(), went = catalogPages.scrollLeft - d.left;
  let to = Math.round(catalogPages.scrollLeft / step);
  if (to === Math.round(d.left / step) && Math.abs(went) >= step / 5) to += Math.sign(went);
  catalogGo(to);
  const snap = () => catalogPages.classList.remove('held');   // snapping again once it has come to rest
  catalogPages.addEventListener('scrollend', snap, { once: true });
  setTimeout(snap, 900);
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
/* the goods in pieces, whole, each where the ad has it: a piece taken with the mouse (or a pen) follows it about the
   picture, lifted in front of the others, and stays where it is let go, never past the picture's edges (onto the
   words beside it). A finger still scrolls the page; goods of one piece stay put. The picture is also what the page
   morph lands on from the goods' card (js/router.js) */
const itStage = $('#it-stage');
let itTop = 0;
itStage.addEventListener('pointerdown', (e) => {
  const p = e.target.closest('img');
  if (!p || !itStage.children[1] || e.pointerType === 'touch' || e.button !== 0) return;
  e.preventDefault();
  const box = itStage.getBoundingClientRect(), x0 = parseFloat(p.style.left), y0 = parseFloat(p.style.top);
  const pw = p.offsetWidth / box.width * 100, ph = p.offsetHeight / box.height * 100;
  p.style.zIndex = ++itTop;
  p.classList.add('held');
  p.setPointerCapture(e.pointerId);
  const move = (m) => {
    const x = x0 + (m.clientX - e.clientX) / box.width * 100, y = y0 + (m.clientY - e.clientY) / box.height * 100;
    p.style.left = `${Math.min(100 - pw, Math.max(0, x)).toFixed(3)}%`;
    p.style.top = `${Math.min(100 - ph, Math.max(0, y)).toFixed(3)}%`;
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
  /* the picture: each piece (parts) where the ad has it, in the set's box (dims) */
  const [W, H] = g.dims;
  itStage.setAttribute('aria-label', tr('item.imgAlt', { t: L(g.name) }));
  itStage.style.setProperty('--ar', `${W} / ${H}`);
  itStage.replaceChildren(...g.parts.map(([x, y, w, h], n) => {
    const p = el('img');
    p.src = `img/goods-${g.slug}-${n + 1}.webp`; p.width = w; p.height = h; p.alt = ''; p.draggable = false; p.decoding = 'async';
    p.style.cssText = `left:${(x / W * 100).toFixed(3)}%;top:${(y / H * 100).toFixed(3)}%;width:${(w / W * 100).toFixed(3)}%`;
    return p;
  }));

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
