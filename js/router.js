/* Page changes: hash routing, the category curtain, page morphs, the nav underline */
/* ---------- hash routing: #home (the carousel), #work #fanart #original #nsfw (the wall), #artbook #ab-<book> #goods #about #contact #w-<work id> #g-<goods slug> ---------- */
let view = null, lastWork = null, lastItem = null;
function parse() {
  const h = decodeURIComponent(location.hash.slice(1));
  if (h === 'about' || h === 'contact' || h === 'goods' || h === 'game') return { h, next: h, idx: -1 };
  if (h === 'work' || h === 'timeline') return { h, next: 'works', idx: -1 };   // #timeline: an old address of the wall
  if (h === 'fanart' || h === 'original' || h === 'nsfw') return { h, next: 'works', idx: -1, cat: h === 'fanart' ? 'fan' : h };
  if (h.startsWith('w-') && h.slice(2) in byId) return { h, next: 'work', idx: byId[h.slice(2)] };
  if (h.startsWith('g-') && h.slice(2) in bySlug) return { h, next: 'item', idx: bySlug[h.slice(2)] };
  if (h === 'artbook') return { h, next: 'artbook', idx: -1 };
  if (h.startsWith('ab-') && h.slice(3) in byBook) return { h, next: 'book', idx: byBook[h.slice(3)] };
  return { h, next: 'home', idx: -1 };
}

/* swap the DOM to the requested view, then start watching its reveal elements */
function apply({ h, next, idx, cat }) {
  const from = view;
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
    renderWork(idx); lastWork = WORKS[idx].id; scrollTo(0, 0); els = prime(root);
  } else if (next === 'item') {
    renderItem(idx); lastItem = GOODS[idx].slug; scrollTo(0, 0); els = prime(root);
  } else if (next === 'works') {
    /* #fanart / #original pick the category; back from a work page shows that work's category */
    const switched = setCat(cat || (from === 'work' && lastWork ? WORKS[byId[lastWork]].cat : wallCat));
    layoutWall();
    const cover = from === 'work' && lastWork && document.getElementById('c-' + lastWork);
    if (cover && !cover.hidden) { cover.scrollIntoView({ block: 'center' }); els = pending(root); }
    else {
      scrollTo({ top: 0, behavior });
      els = !same ? prime(root) : switched ? [...pending(root), ...prime(wall), ...prime(nsfwBox)] : pending(root);   // a new category flies in
    }
  } else if (next === 'book') {
    renderBook(idx); lastBook = BOOKS[idx].slug; scrollTo(0, 0); els = prime(root);
  } else if (next === 'artbook') {
    if (!abBuilt) renderBooks();
    const card = from === 'book' && lastBook && document.getElementById('abc-' + lastBook);
    if (card) { card.scrollIntoView({ block: 'center' }); els = pending(root); }
    else { scrollTo({ top: 0, behavior }); els = same ? pending(root) : prime(root); }
    abYearsUpdate();
  } else if (next === 'goods') {
    const card = from === 'item' && lastItem && document.getElementById('gc-' + lastItem);
    if (card) { card.scrollIntoView({ block: 'center' }); els = pending(root); }
    else { scrollTo({ top: 0, behavior }); els = same ? pending(root) : prime(root); }
  } else {
    scrollTo({ top: 0, behavior }); els = same ? pending(root) : prime(root);
  }
  view = next;
  evenIntros();
  if (next === 'about') preloadAbout();
  heroPlay();   // the carousel moves on only while the home page is shown
  watch(els);
  parallax();
}

/* category switch: the curtain covers the page, the new page is put in place underneath, the curtain lifts */
const curtainEl = $('#curtain');
const CUR_NAME = { home: 'HOME', works: 'WORK', artbook: 'ART BOOK', goods: 'GOODS', game: 'GAME', about: 'ABOUT', contact: 'CONTACT' };
const TOP_VIEWS = new Set(['home', 'works', 'artbook', 'goods', 'game', 'about', 'contact']);
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
  const r = parse();
  const from = view;
  if (from !== null && from !== r.next && !CALM && TOP_VIEWS.has(r.next) && !(from === 'work' && r.next === 'works') && !(from === 'item' && r.next === 'goods') && !(from === 'book' && r.next === 'artbook')) { curtainTo(r); return; }
  if (from === null || from === r.next || !VT) { apply(r); return; }
  const pick = (fwd) => {
    if (from === 'works' && r.next === 'work') return fwd ? document.querySelector(`#c-${WORKS[r.idx].id} img`) : document.querySelector('#wk-imgs img');
    if (from === 'goods' && r.next === 'item') return fwd ? document.querySelector(`#gc-${GOODS[r.idx].slug} img`) : $('#it-img');
    if (from === 'work' && r.next === 'works') return fwd ? document.querySelector('#wk-imgs img') : lastWork && document.querySelector(`#c-${lastWork} img`);
    if (from === 'item' && r.next === 'goods') return fwd ? $('#it-img') : lastItem && document.querySelector(`#gc-${lastItem} img`);
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
      try { await Promise.race([b.decode ? b.decode() : b3Load(b), sleep(450)]); } catch (_) { /* show it as is */ }
    }
  });
  t.ready.catch(() => {});   // a newer page change can cut this one short; that is fine
  t.finished.catch(() => {}).finally(() => {
    named.forEach((n) => { n.style.viewTransitionName = ''; });
    document.querySelectorAll('.rv-now').forEach((n) => n.classList.remove('rv-now'));
  });
}
