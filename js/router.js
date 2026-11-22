/* Page changes: hash routing, the category curtain, page morphs, the nav underline */
/* ---------- hash routing: #home (the carousel), #work #fanart #original #nsfw (the wall), #artbook #ab-<book> #goods #event #about #contact #w-<work id> (#w-<id>/<n>: piece n of a collection) #t-<tag> (every work with it) #g-<goods slug> ---------- */
let view = null, lastWork = null, lastPiece = -1, lastItem = null;
/* where each page was scrolled when it was left (by its address), to come back to it there. The site places the page
   itself on every change, so the browser's own scroll restoration is off: on Back it scrolled the page being left
   first, under the picture about to go back into its list, and then the list was not where it had been */
const leftAt = new Map();
let shownAt = null;   // the address of the page on screen
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
/* back to a list (or a collection's grid) from one of its pages: just where it was left, so the picture goes back
   into its place; if it does not show there (another page was opened since), it comes to the middle of the screen */
function backTo(e) {
  const y = leftAt.get(location.hash);
  if (y != null) scrollTo(0, y);
  if (!onScreen(e)) e.scrollIntoView({ block: 'center' });
}
function parse() {
  let h = location.hash.slice(1);
  try { h = decodeURIComponent(h); } catch (e) { /* malformed shared URL: fall back to the home page */ }
  if (h === 'w-' + FF47_CATALOG.id) {
    history.replaceState(null, '', '#g-ff47-catalog');
    h = 'g-ff47-catalog';
  }
  if (h === 'g-ff47-catalog') return { h, next: 'catalog', idx: -1 };
  if (h === 'about' || h === 'contact' || h === 'goods' || h === 'game' || h === 'event') return { h, next: h, idx: -1 };
  if (h === 'work' || h === 'timeline') return { h, next: 'works', idx: -1 };   // #timeline: an old address of the wall
  if (h === 'fanart' || h === 'original' || h === 'nsfw') return { h, next: 'works', idx: -1, cat: h === 'fanart' ? 'fan' : h };
  if (h.startsWith('w-')) {
    if (h.slice(2) in MOVED) { history.replaceState(null, '', '#w-' + MOVED[h.slice(2)]); return parse(); }   // now a collection's piece
    const [id, pn] = h.slice(2).split('/'), n = Number(pn);
    if (id in byId) {
      const w = WORKS[byId[id]];
      return { h, next: 'work', idx: byId[id], piece: w.pieces && Number.isInteger(n) && n >= 1 && n <= w.dims.length ? n - 1 : -1 };
    }
  }
  if (h.startsWith('t-') && tagWorks(h.slice(2)).length) return { h, next: 'tag', idx: -1, tag: h.slice(2) };
  if (h.startsWith('g-') && h.slice(2) in bySlug) return { h, next: 'item', idx: bySlug[h.slice(2)] };
  if (h === 'artbook') return { h, next: 'artbook', idx: -1 };
  if (h.startsWith('ab-') && h.slice(3) in byBook) return { h, next: 'book', idx: byBook[h.slice(3)] };
  return { h, next: 'home', idx: -1 };
}

/* swap the DOM to the requested view, then start watching its reveal elements */
function apply({ h, next, idx, cat, piece = -1, tag }) {
  const from = view, fromPiece = lastPiece;
  zvPage(next);   // another part of the site: the picture windows close
  const same = from === next;
  for (const [k, v] of Object.entries(VIEWS)) v.hidden = k !== next;
  document.querySelectorAll('.nav a, .m-nav a').forEach((a) => {
    a.toggleAttribute('aria-current', a.dataset.v.split(' ').includes(next));
    if (a.hasAttribute('aria-current')) a.setAttribute('aria-current', 'page');
  });
  moveInk(from === null);
  const root = VIEWS[next];
  if (!same) { root.style.animation = 'none'; void root.offsetWidth; root.style.animation = ''; }
  const behavior = same && !CALM ? 'smooth' : 'auto';
  let els;
  if (next === 'work') {
    /* back from a piece's page to its collection: the grid as it was left, that piece's tile in view (backTo) */
    const back = from === 'work' && lastWork === WORKS[idx].id && piece < 0 && fromPiece >= 0;
    renderWork(idx, piece); lastWork = WORKS[idx].id; lastPiece = piece;
    const tile = back && $(`#wk-imgs [data-n="${fromPiece}"]`);
    if (tile) { backTo(tile); els = [...pending(root), ...prime($('#wk-imgs'))]; } else { scrollTo(0, 0); els = prime(root); }
  } else if (next === 'tag') {
    /* back from one of its works: the page as it was left, that work's cover in view (backTo); another tag (from a
       work page's tags): a new page, from the top */
    const again = tag === tagNow;
    if (!again) renderTag(tag);
    layoutTag();
    const cover = again && from === 'work' && lastWork && document.getElementById('tc-' + lastWork);
    if (cover) { backTo(cover); els = pending(root); } else { scrollTo(0, 0); els = same ? pending(root) : prime(root); }
  } else if (next === 'item') {
    renderItem(idx); lastItem = GOODS[idx].slug; scrollTo(0, 0); els = prime(root);
  } else if (next === 'works') {
    /* #fanart / #original pick the category; back from a work page shows that work's category */
    const switched = setCat(cat || (from === 'work' && lastWork ? WORKS[byId[lastWork]].cat : wallCat));
    layoutWall();
    const cover = from === 'work' && lastWork && document.getElementById('c-' + lastWork);
    if (cover && !cover.hidden) { backTo(cover); els = pending(root); }
    else {
      scrollTo({ top: 0, behavior });
      els = !same ? prime(root) : switched ? [...pending(root), ...prime(wall), ...prime(nsfwBox)] : pending(root);   // a new category flies in
    }
  } else if (next === 'book') {
    renderBook(idx); lastBook = BOOKS[idx].slug; scrollTo(0, 0); els = prime(root);
  } else if (next === 'artbook') {
    if (!abBuilt) renderBooks();
    const card = from === 'book' && lastBook && document.getElementById('abc-' + lastBook);
    if (card) { backTo(card); els = pending(root); }
    else { scrollTo({ top: 0, behavior }); els = same ? pending(root) : prime(root); }
    abYearsUpdate();
  } else if (next === 'catalog') {
    /* back from one of its goods: the page as it was left, that goods' card in view (backTo) */
    const back = from === 'item' && lastItem && GOODS[bySlug[lastItem]].ev === FF47_CATALOG.ev;
    renderCatalog(!back);
    const card = back && document.getElementById('gc-' + lastItem);
    if (card) { backTo(card); els = pending(root); } else { scrollTo(0, 0); els = same ? pending(root) : prime(root); }
  } else if (next === 'goods') {
    if (!goodsHeadings.size) renderGoods();
    const card = from === 'catalog' ? $('#gc-ff47-catalog') : from === 'item' && lastItem && goodsList.querySelector('#gc-' + lastItem);
    if (card) { backTo(card); els = pending(root); }
    else { scrollTo({ top: 0, behavior }); els = same ? pending(root) : prime(root); }
  } else {
    scrollTo({ top: 0, behavior }); els = same ? pending(root) : prime(root);
  }
  if (next === 'goods') goodsYearsUpdate();
  view = next;
  evenIntros();
  if (next === 'about') preloadAbout();
  if (next === 'home' && from !== null) heroPick();   // every press of Home: a new pick of works for the carousel
  heroPlay();   // the carousel moves on only while the home page is shown
  snsShow(next === 'home');   // and the corner buttons for the latest videos and posts are there
  watch(els);
  parallax();
}

/* category switch: the curtain covers the page, the new page is put in place underneath, the curtain lifts */
const curtainEl = $('#curtain');
const CUR_NAME = { home: 'HOME', works: 'WORK', artbook: 'ART BOOK', goods: 'GOODS', event: 'EVENT', game: 'GAME', about: 'ABOUT', contact: 'CONTACT' };
const TOP_VIEWS = new Set(['home', 'works', 'artbook', 'goods', 'event', 'game', 'about', 'contact']);
let curtainBusy = false;
function curtainTo(r) {
  curtainBusy = true;
  const shown = location.hash;   // the address this curtain is for
  const key = r.next;
  $('#curtain-t').replaceChildren(...[...CUR_NAME[key]].map((ch, i) => { const sp = el('span', '', ch === ' ' ? '\u00a0' : ch); sp.style.setProperty('--i', i); return sp; }));
  $('#curtain-s').textContent = tr('cur.' + key);
  curtainEl.classList.remove('cur-in', 'cur-out');
  curtainEl.hidden = false;
  void curtainEl.offsetWidth;
  curtainEl.classList.add('cur-in');   // not 'in': that name is the page's 1400px content container
  setTimeout(() => {
    apply(r);
    setTimeout(() => {
      curtainEl.classList.add('cur-out');
      setTimeout(() => {
        curtainEl.hidden = true;
        curtainEl.classList.remove('cur-in', 'cur-out');
        curtainBusy = false;
        if (location.hash !== shown) route();   // another tab was chosen while the curtain was up
      }, 700);
    }, 400);
  }, 540);
}
const navEl = $('.nav'), navInk = el('span', 'nav-ink');
navInk.setAttribute('aria-hidden', 'true');
navEl.appendChild(navInk);
navEl.classList.add('has-ink');
function moveInk(instant) {
  const a = navEl.querySelector('a[aria-current="page"]');
  if (!a) { navInk.style.opacity = '0'; return; }
  if (instant) navInk.style.transition = 'none';
  navInk.style.opacity = '1';
  navInk.style.width = `${a.offsetWidth}px`;
  navInk.style.transform = `translateX(${a.offsetLeft}px)`;
  if (instant) { void navInk.offsetWidth; navInk.style.transition = ''; }
}
addEventListener('resize', () => moveInk(true));
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => moveInk(true));

/* page change: cross-fade with the View Transitions API, and morph the clicked image into the next page */
function route() {
  if (curtainBusy) return;
  if (shownAt !== null && shownAt !== location.hash) leftAt.set(shownAt, scrollY);   // the page being left
  const r = parse();
  shownAt = location.hash;   // (parse may have rewritten an old address)
  const from = view;
  if (from !== null && from !== r.next && !CALM && TOP_VIEWS.has(r.next) && !((from === 'work' || from === 'tag') && r.next === 'works') && !((from === 'item' || from === 'catalog') && r.next === 'goods') && !(from === 'book' && r.next === 'artbook')) { curtainTo(r); return; }
  /* inside a collection: between its grid and a piece's page, the picture morphs too */
  const hop = from === 'work' && r.next === 'work' && WORKS[r.idx].id === lastWork && (r.piece < 0) !== (lastPiece < 0);
  const fromPiece = lastPiece;
  if (from === null || (from === r.next && !hop) || !VT) { apply(r); return; }
  /* the picture a work page shares with its wall cover: the cover's picture in front (a collection's cover deals a
     random three, the last on top), and on the page its first one, or on a collection's page that same piece */
  const coverPic = (id, on = 'c') => [...document.querySelectorAll(`#${on}-${id} img`)].pop();   // on the wall, or a tag's page (tc)
  const pagePic = (id, on = 'c') => $(`#wk-imgs [data-n="${$(`#${on}-${id}`).dataset.n}"] img`) || $('#wk-imgs img');
  const pick = (fwd) => {
    if (hop) {
      const tile = $(`#wk-imgs [data-n="${r.piece < 0 ? fromPiece : r.piece}"] img`), big = $('#wk-imgs .pc-fig img');
      return r.piece >= 0 === fwd ? tile : big;   // to a piece: from its tile to its picture; back: the other way
    }
    if (from === 'works' && r.next === 'work') return fwd ? coverPic(WORKS[r.idx].id) : pagePic(WORKS[r.idx].id);
    if ((from === 'catalog' || from === 'goods') && r.next === 'item') return fwd ? document.querySelector(`#gc-${GOODS[r.idx].slug} img`) : itemPic();
    if (from === 'work' && r.next === 'works') return fwd ? pagePic(lastWork) : lastWork && coverPic(lastWork);
    if (from === 'tag' && r.next === 'work') return fwd ? coverPic(WORKS[r.idx].id, 'tc') : pagePic(WORKS[r.idx].id, 'tc');
    if (from === 'work' && r.next === 'tag') return fwd ? pagePic(lastWork, $('#tc-' + lastWork) ? 'tc' : 'c') : coverPic(lastWork, 'tc');   // (a tag's page not made yet: the wall's cover says which piece)
    if (from === 'item' && (r.next === 'catalog' || r.next === 'goods')) return fwd ? itemPic() : lastItem && document.querySelector(`#gc-${lastItem} img`);
    if (from === 'artbook' && r.next === 'book') return fwd ? document.querySelector(`#abc-${BOOKS[r.idx].slug} .b3`) : document.querySelector('#bk-cover .b3');
    if (from === 'book' && r.next === 'artbook') return fwd ? document.querySelector('#bk-cover .b3') : lastBook && document.querySelector(`#abc-${lastBook} .b3`);
    return null;
  };
  const named = [];
  const a = pick(true);
  if (onScreen(a)) { a.style.viewTransitionName = 'shared'; named.push(a); }
  const t = document.startViewTransition(async () => {
    apply(r);
    if (!named.length) return;
    named[0].style.viewTransitionName = '';
    const b = pick(false);
    if (onScreen(b)) {
      b.style.viewTransitionName = 'shared'; named.push(b); showNow(b);
      const ready = b.decode ? b.decode() : b3Load(b);   // a picture, or a 3D book
      try { await Promise.race([ready, sleep(450)]); } catch (_) { /* show it as is */ }
    }
  });
  t.ready.catch(() => {});   // a newer page change can cut this one short; that is fine
  t.finished.catch(() => {}).finally(() => {
    named.forEach((n) => { n.style.viewTransitionName = ''; });
    document.querySelectorAll('.rv-now').forEach((n) => n.classList.remove('rv-now'));
  });
}
