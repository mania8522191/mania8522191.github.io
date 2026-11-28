/* Goods: prices, the goods list, goods item pages */
/* price: [original struck] NT$x [/ 款] [場次價] */
function price(g, label) {
  const p = el('span', 'price');
  if (g.was) p.appendChild(el('s', '', `NT$${g.was}`));
  p.appendChild(document.createTextNode(`NT$${g.price}`));
  for (const key of [g.unit && 'price.per', label && 'price.event'].filter(Boolean)) {
    const note = el('small', '', tr(key));
    note.dataset.i18n = key; p.appendChild(note);
  }
  return p;
}

/* ---------- goods list: by year, on a timeline with a bar and a sort menu like the art books'. Each event (a goods'
   `ev`, "FF47") is under its year's heading: its catalog, which opens its own page (#g-ff47-catalog)
   with the event's goods under its pages; an event without a catalog lists its goods there. Only events that have
   goods or a catalog are listed ---------- */
const goodsList = $('#g-list'), goodsBar = $('#g-years'), goodsNav = $('#g-years-in');
const goodsHeadings = new Map();   // each year's heading, in the order shown
const catalogByEvent = new Map(CATALOGS.map((c) => [c.ev, c]));
const catalogSlug = (c) => c.ev.toLowerCase() + '-catalog';
const catalogName = (c) => tr('goods.catalog', { ev: c.ev });
const goodsEditions = [...new Set([...GOODS.map((g) => g.ev), ...catalogByEvent.keys()])];
function evYear(ev) {
  const date = catalogByEvent.get(ev)?.d || BOOKS.find((b) => b.ev === ev)?.ym || EVENTS.find((e) => e.name === evName(ev))?.from;
  return date ? date.slice(0, 4) : String(GOODS.find((g) => g.ev === ev && g.year)?.year || ev);
}
const goodsYears = [...new Set(goodsEditions.map(evYear))].sort().reverse();
const catalogCards = new Map();
let goodsOrder = 'new', currentCatalog = null;

/* A standalone product photo or the matching event's catalog page, in the same [path, width, height] format. */
function goodsImage(g) {
  if (g.image) return g.image;
  const catalog = catalogByEvent.get(g.ev), dims = catalog?.dims[g.pg];
  return dims ? [src(catalog.id, g.pg), dims[0], dims[1]] : null;
}
/* a goods card: its page of the catalog (pg), then its name, contents and price (fillGoodsCard, again in another
   language) */
function goodsCard(g, i, inCatalog = false) {
  const a = el('a', 'g-card');
  a.href = '#g-' + g.slug;
  a.id = 'gc-' + g.slug;
  a.dataset.rv = 'clip';
  a.dataset.d = `${(i % 3) * 0.1}s`;
  const box = el('span', 'g-img mask');
  const media = goodsImage(g);
  if (media) {
    const img = el('img');
    img.width = media[1]; img.height = media[2];
    img.alt = ''; img.decoding = 'async';
    if (inCatalog) img.dataset.src = media[0];
    else { img.loading = i < 3 ? 'eager' : 'lazy'; img.src = media[0]; }
    box.appendChild(img);
    a.appendChild(box);
  }
  a.append(el('span', 'g-name'), el('span', 'g-meta'), price(g, false));
  fillGoodsCard(a, g);
  return a;
}
function fillGoodsCard(a, g) {
  a.querySelector('.g-name').textContent = L(g.name);
  a.querySelector('.g-meta').textContent = L(g.meta);
}
/* goods as cards, three to a row */
function goodsGrid(items) {
  const grid = el('div', 'g-grid');
  grid.append(...items.map((g, i) => goodsCard(g, i)));
  return grid;
}

/* the catalog's place in its year: its first three pages dealt as a hand of cards, as a collection's cover on the
   works wall, in page order from left to right, the first on top and each next one under it; then its event's full
   name (as big as an art book's event under its name), its own name, how many pages, and an arrow to its page */
function catalogCover(catalog) {
  const a = el('a', 'catalog-cover');
  a.id = 'gc-' + catalogSlug(catalog);
  a.href = '#g-' + catalogSlug(catalog);
  const hand = handOf(catalog.dims.slice(0, 3).map(([W, H], n) => [src(catalog.id, n), W, H]), true);
  const fan = el('span', 'catalog-hand frame fan');
  fan.style.cssText = `--ar:${hand.r.toFixed(4)};--cw:${hand.cwp}`;
  fan.innerHTML = hand.cards;
  fan.append(...[...fan.children].reverse());   // the first page last, so in front
  const caption = el('span', 'catalog-caption');
  const title = el('span', 'g-name');
  const count = el('span', 'g-meta');
  const arrow = el('span', 'catalog-arrow', '→');
  arrow.setAttribute('aria-hidden', 'true');
  caption.append(el('span', 'catalog-ev', evName(catalog.ev)), title, count, arrow);
  a.append(fan, caption);
  return a;
}
/* the list in the order picked (the newest year first, or the oldest; its events the same way), and the bar's
   buttons to match */
function renderGoods() {
  const years = goodsOrder === 'new' ? goodsYears : [...goodsYears].reverse();
  goodsHeadings.clear();
  goodsNav.replaceChildren();
  goodsList.replaceChildren(...years.map((y) => {
    const section = el('section', 'ab-year');
    const heading = el('h2', 'wall-year');
    heading.dataset.rv = 'year';
    heading.append(el('span', 'wy-n', y), el('span', 'wy-line'));
    goodsHeadings.set(y, heading);
    section.append(heading);
    const button = el('button', '', y);
    button.type = 'button';
    button.dataset.y = y;
    goodsNav.append(button);
    const events = goodsEditions.filter((code) => evYear(code) === y);
    (goodsOrder === 'new' ? events : events.reverse()).forEach((code) => {
      const catalog = catalogByEvent.get(code);
      if (catalog) {
        if (!catalogCards.has(code)) catalogCards.set(code, catalogCover(catalog));
        section.append(catalogCards.get(code));
      } else {
        section.append(el('h3', 'catalog-ev', evName(code)), goodsGrid(GOODS.filter((g) => g.ev === code)));
      }
    });
    return section;
  }));
  goodsText();
}
/* the words that change with the language: the sort menu's, the bar's buttons, and the catalog's page count */
function goodsText() {
  goodsSortText(goodsOrder, goodsYears[goodsYears.length - 1], goodsYears[0]);
  goodsNav.querySelectorAll('button').forEach((b) => b.setAttribute('aria-label', tr('years.go', { y: b.dataset.y })));
  catalogCards.forEach((card, ev) => {
    const catalog = catalogByEvent.get(ev);
    card.querySelector('.g-name').textContent = catalogName(catalog);
    card.querySelector('.g-meta').textContent = pagesText(catalog.dims.length);
  });
}
/* the bar: a button goes to its year, the one in view lights up; another order lays the list out again, and the
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
/* ---------- an event's catalog page: its date and page count; its pages side by side, to be dragged left and right;
   then the event's goods, the cards that open their item pages ---------- */
const catalogPages = $('#catalog-pages');
function loadCatalogImage(img) {
  if (!img?.dataset.src) return;
  img.src = img.dataset.src;
  delete img.dataset.src;
  catalogObserver?.unobserve(img);
}
const catalogObserver = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
  for (const entry of entries) if (entry.isIntersecting) loadCatalogImage(entry.target);
}, { rootMargin: '40px' }) : null;
function watchCatalogImages(root) {
  for (const img of root.querySelectorAll('img[data-src]')) {
    if (catalogObserver) catalogObserver.observe(img);
    else { img.loading = 'lazy'; loadCatalogImage(img); }
  }
}
/* rebuilt when the event changes (catalogText and js/lang-switch.js update the words); `fresh`, not back
   from one of its goods: from the first page */
function renderCatalog(catalog, fresh) {
  if (currentCatalog !== catalog) {
    catalogObserver?.disconnect();
    currentCatalog = catalog;
    catalogDrag = catalogTo = null;
    catalogPages.classList.remove('held');
    $('#catalog-event').textContent = evName(catalog.ev);
    $('#catalog-pixiv').href = 'https://www.pixiv.net/artworks/' + catalog.id;
    catalogPages.replaceChildren(...catalog.dims.map(([width, height], i) => {
      const img = el('img');
      if (i === 0) { img.fetchPriority = 'high'; img.src = src(catalog.id, i); }
      else img.dataset.src = src(catalog.id, i);
      img.width = width; img.height = height;
      img.decoding = 'async';
      img.draggable = false;
      return img;
    }));
    const grid = $('#catalog-goods');
    grid.replaceChildren(...GOODS.filter((g) => g.ev === catalog.ev).map((g, i) => goodsCard(g, i, true)));
    watchCatalogImages(grid);
  }
  if (fresh) catalogPages.scrollLeft = 0;
  catalogText();
  catalogAt();
}
// Load the other visible pages once the cover is ready. Scrolling and the arrows can request a page sooner.
function catalogCoverReady(e) {
  if (e.target === catalogPages.firstElementChild) watchCatalogImages(catalogPages);
}
catalogPages.addEventListener('load', catalogCoverReady, true);
catalogPages.addEventListener('error', catalogCoverReady, true);
/* the words that change with the language: the date, the page count, each page's description */
function catalogText() {
  if (!currentCatalog) return;
  const catalog = currentCatalog, m = catalog.dims.length;
  $('#catalog-title').textContent = catalogName(catalog);
  $('#catalog-date').textContent = tr('wk.posted', { d: dot(catalog.d) });
  $('#catalog-count').textContent = pagesText(m);
  [...catalogPages.children].forEach((img, i) => { img.alt = tr('wk.imgAlt', { t: catalogName(catalog), n: i + 1, m }); });
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
  loadCatalogImage(catalogPages.children[i]);
  $('#catalog-at').textContent = `${i + 1} / ${n}`;
  $('#catalog-prev').disabled = i === 0;
  $('#catalog-next').disabled = i === n - 1;
  return i;
}
function catalogGo(i) {
  const n = catalogPages.children.length;
  loadCatalogImage(catalogPages.children[i]);
  catalogPages.scrollTo({ left: Math.min(n - 1, Math.max(0, i)) * catalogStep(), behavior: CALM ? 'auto' : 'smooth' });
}
catalogPages.addEventListener('pointerdown', (e) => {
  if (catalogPages.childElementCount > 1 && e.pointerType !== 'touch' && e.button === 0) catalogDrag = { x: e.clientX, left: catalogPages.scrollLeft, id: e.pointerId, moved: false };
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
const itHint = itGd.querySelector('.gd-hint');
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
async function itemOpen() {
  if (!itGoods.childElementCount || itGd.classList.contains('open') || itStage.hasAttribute('aria-busy')) return;
  const s = ++itStep;
  itStage.setAttribute('aria-busy', 'true');
  const bg = itStage.querySelector('.gd-bg');
  const pictures = [...itGoods.children];
  if (bg.dataset.src) pictures.push(bg);
  const ready = await Promise.allSettled(pictures.map((img) => {
    if (!img.hasAttribute('src') || (img.complete && !img.naturalWidth)) img.src = img.dataset.src;
    return img.decode();
  }));
  if (s !== itStep) return;
  itStage.removeAttribute('aria-busy');
  if (view !== 'item') return;
  if (ready.some((result) => result.status === 'rejected')) {
    itHint.dataset.i18n = 'item.retry';
    setText(itHint, tr('item.retry'));
    itStage.setAttribute('aria-label', tr('item.retry'));
    return;
  }
  itHint.dataset.i18n = 'item.takeOut';
  setText(itHint, tr('item.takeOut'));
  itemSwap(() => {
    if (s !== itStep) return;
    itGd.classList.add('open'); itStage.removeAttribute('role'); itStage.removeAttribute('aria-label'); itStage.tabIndex = -1;
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
  const s = ++itStep;
  itStage.removeAttribute('aria-busy');
  if (!itGd.classList.contains('open')) return;
  const shut = () => {
    if (s !== itStep) return;
    itGd.classList.remove('open', 'wide', 'plain');
    itStage.setAttribute('role', 'button');
    itStage.setAttribute('aria-label', tr('item.takeOut'));
    itStage.tabIndex = 0;
  };
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
  /* the picture: its page of the catalog, and under it the cut-out pieces (parts), in the page's pixels */
  itemClose(true);
  const catalog = catalogByEvent.get(g.ev), media = goodsImage(g);
  const parts = media ? (g.parts || []) : [];
  const interactive = parts.length > 0;
  itStage.closest('figure').hidden = !media;
  itHint.hidden = !interactive;
  itHint.dataset.i18n = 'item.takeOut';
  setText(itHint, tr('item.takeOut'));
  if (media) [itPage.src, itPage.width, itPage.height] = media;
  else itPage.removeAttribute('src');
  const bg = itStage.querySelector('.gd-bg');
  bg.removeAttribute('src');
  bg.dataset.src = interactive ? catalog?.bg || '' : '';
  bg.hidden = !bg.dataset.src;
  bg.loading = 'eager';   // the source is set only after the visitor opens the item
  if (interactive) {
    itStage.setAttribute('role', 'button');
    itStage.tabIndex = 0;
  } else {
    itStage.removeAttribute('role');
    itStage.removeAttribute('aria-label');
    itStage.removeAttribute('tabindex');
  }
  itGoods.replaceChildren(...parts.map(([x, y, w, h], n) => {
    const p = el('img');
    const [, W, H] = media;
    p.dataset.src = `img/goods-${g.slug}-${n + 1}.webp`; p.width = w; p.height = h; p.alt = ''; p.draggable = false; p.decoding = 'async';
    p.style.cssText = p.dataset.home = `left:${(x / W * 100).toFixed(3)}%;top:${(y / H * 100).toFixed(3)}%;width:${(w / W * 100).toFixed(3)}%`;
    return p;
  }));
  $('#it-price').replaceChildren(...price(g, true).childNodes);
  const rows = [
    ['spec.size', g.size], ['spec.spec', g.spec], ['spec.' + g.list_title, g.items],
    ['spec.offer', g.note], ['spec.debut', catalog?.debut || evName(g.ev)],
  ].filter(([, value]) => value);
  $('#it-spec').replaceChildren(...rows.map(([key, value], n) => {
    const d = el('div');
    d.dataset.rv = 'up';
    d.dataset.d = `${n * 0.07}s`;
    const dt = el('dt', '', tr(key)), dd = el('dd');
    dt.dataset.i18n = key;
    dd._value = value;
    d.append(dt, dd);
    return d;
  }));

  $('#it-works-box').hidden = !g.works?.length;
  $('#it-works').replaceChildren(...(g.works || []).filter((id) => id in byId).map((id, n) => {
    const w = WORKS[byId[id]];
    const a = el('a'); a.href = '#w-' + id;
    a.dataset.rv = 'up'; a.dataset.d = `${n * 0.1}s`;
    const im = el('img'); im.src = src(id, 0); im.alt = ''; im.loading = 'lazy'; im.style.objectPosition = w.pos;
    a.append(im, el('span'));
    return a;
  }));

  const p = GOODS[(i - 1 + GOODS.length) % GOODS.length];
  const nx = GOODS[(i + 1) % GOODS.length];
  $('#it-prev').href = '#g-' + p.slug;
  $('#it-next').href = '#g-' + nx.slug;
  itemText(i);
}

function itemText(i) {
  const g = GOODS[i];
  $('#it-lab').textContent = L(g.eyebrow);
  $('#it-title').textContent = L(g.name);
  linkLine($('#it-books'), tr('item.books'), (g.books || []).filter((s) => s in byBook).map((s) => [BOOKS[byBook[s]].t, '#ab-' + s]));
  itPage.alt = tr('item.imgAlt', { t: L(g.name) });
  if (itStage.getAttribute('role') === 'button') itStage.setAttribute('aria-label', tr(itHint.dataset.i18n));
  $('#it-spec').querySelectorAll('dd').forEach((dd) => {
    const value = L(dd._value);
    if (!Array.isArray(value)) { dd.textContent = value; return; }
    const list = dd.firstElementChild || dd.appendChild(el('ol'));
    while (list.childElementCount > value.length) list.lastElementChild.remove();
    value.forEach((t, index) => { (list.children[index] || list.appendChild(el('li'))).textContent = t; });
  });
  $('#it-works').querySelectorAll('a').forEach((a) => { a.lastElementChild.textContent = L(WORKS[byId[a.hash.slice(3)]].t); });
  $('#it-prev-t').textContent = L(GOODS[(i - 1 + GOODS.length) % GOODS.length].name);
  $('#it-next-t').textContent = L(GOODS[(i + 1) % GOODS.length].name);
}
