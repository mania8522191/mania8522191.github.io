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
   `ev`, "FF47") is a section under its heading; the FF47 catalog (FF47_CATALOG) comes first in its event and opens
   its own page (#g-ff47-catalog). Only events that have goods or the catalog are listed ---------- */
const goodsList = $('#g-list'), goodsBar = $('#g-events'), goodsNav = $('#g-events-in');
const goodsHeadings = new Map();   // each event's heading, in the order shown
const goodsEditions = [...new Set([...GOODS.map((g) => g.ev), FF47_CATALOG.ev])];   // GOODS lists the newest event first
let goodsOrder = 'new';
/* a goods card: its picture, then its name, contents and price (fillGoodsCard, again in another language) */
function goodsCard(g, i) {
  const a = el('a', 'g-card');
  a.href = '#g-' + g.slug;
  a.id = 'gc-' + g.slug;
  a.dataset.rv = 'clip';
  a.dataset.d = `${(i % 3) * 0.1}s`;
  const box = el('span', 'g-img mask');
  const img = el('img');
  img.src = `img/goods-${g.slug}.webp`; img.width = g.dims[0]; img.height = g.dims[1];
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

/* the catalog's place in its event: its first page whole, its name and how many pages, an arrow to its page */
function catalogCover() {
  const a = el('a', 'catalog-cover');
  a.id = 'gc-ff47-catalog';
  a.href = '#g-ff47-catalog';
  const img = el('img');
  img.src = src(FF47_CATALOG.id, 0);
  [img.width, img.height] = FF47_CATALOG.dims[0];
  img.alt = '';
  const caption = el('span', 'catalog-caption');
  const title = el('span', 'g-name', tr('goods.catalog'));
  title.dataset.i18n = 'goods.catalog';
  const count = el('span', 'g-meta', pagesText(FF47_CATALOG.dims.length));
  count.id = 'catalog-cover-count';
  caption.append(title, count);
  const arrow = el('span', 'catalog-arrow', '→');
  arrow.setAttribute('aria-hidden', 'true');
  a.append(img, caption, arrow);
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
    if (code === FF47_CATALOG.ev) section.append(catalogCover());
    const items = GOODS.filter((g) => g.ev === code);
    if (items.length) {
      const grid = el('div', 'g-grid');
      grid.append(...items.map(goodsCard));
      section.append(grid);
    }
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
/* ---------- the FF47 catalog's page: its date, page count and tags, then its pages one under another, as on a work's
   page; a page opens in a picture window ---------- */
function renderCatalog() {
  const catalog = FF47_CATALOG;
  $('#catalog-date').textContent = tr('wk.posted', { d: dot(catalog.d) });
  $('#catalog-count').textContent = pagesText(catalog.dims.length);
  $('#catalog-tags').replaceChildren(...catalog.tags.map((tag) => el('li', '', '#' + tag)));
  $('#catalog-pages').replaceChildren(...catalog.dims.map(([width, height], i) => {
    const img = el('img');
    img.src = src(catalog.id, i);
    img.width = width; img.height = height;
    img.alt = tr('wk.imgAlt', { t: tr('goods.catalog'), n: i + 1, m: catalog.dims.length });
    img.loading = i < 2 ? 'eager' : 'lazy';
    img.decoding = 'async';
    if (i) img.dataset.rv = 'up';
    return img;
  }));
}
$('#catalog-pages').addEventListener('click', (e) => {
  if (e.target.matches('img')) zvOpen('catalog', [...e.currentTarget.children].indexOf(e.target), e.target);
});

/* ---------- goods item page ---------- */
/* goods in pieces: a piece taken with the mouse (or a pen) follows it about the picture, lifted in front of the
   others, and stays where it is let go, never past the picture's edges (onto the words beside it). A finger still
   scrolls the page */
const itStage = $('#it-stage');
let itTop = 0;
itStage.addEventListener('pointerdown', (e) => {
  const p = e.target.closest('img');
  if (!p || e.pointerType === 'touch' || e.button !== 0) return;
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
/* the item's picture as the page shows it, for the morph from and to its card (js/router.js) */
const itemPic = () => (itStage.hidden ? $('#it-img') : itStage);
function renderItem(i) {
  const g = GOODS[i];
  $('#it-lab').textContent = L(g.eyebrow);
  $('#it-title').textContent = L(g.name);
  $('#it-price').replaceChildren(...price(g, true).childNodes);
  /* the picture: the goods laid together; or, for goods in pieces (parts), each piece where the ad has it, to be
     taken with the mouse and moved about (below) */
  const img = $('#it-img'), [W, H] = g.dims;
  img.src = `img/goods-${g.slug}.webp`; img.width = W; img.height = H;
  img.alt = tr('item.imgAlt', { t: L(g.name) });
  img.hidden = !!g.parts; itStage.hidden = !g.parts;
  itStage.setAttribute('aria-label', img.alt);
  itStage.style.setProperty('--ar', `${W} / ${H}`);
  itStage.replaceChildren(...(g.parts || []).map(([x, y, w, h], n) => {
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
