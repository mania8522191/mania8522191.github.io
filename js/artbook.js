/* Art books: the list and the book page */
/* ---------- art books: one per Fancy Frontier, on a timeline with a year bar and sort menu like the works wall ---------- */
const NSFW_URL = 'https://drive.google.com/drive/folders/13iLkmzd5KRhpaBNY8aJSam84H7y5rGQI?usp=sharing';
const abList = $('#ab-list'), abYearsIn = $('#ab-years-in'), abYearsBar = $('#ab-years'), abYearsProg = $('#ab-years-prog');
const abHead = new Map();
let abSort = 'new', abBuilt = false, lastBook = null;
const abBooks = () => (abSort === 'old' ? [...BOOKS].reverse() : BOOKS);   // BOOKS is newest first
function abVars() {
  const ys = BOOKS.map((b) => b.ym.slice(0, 4)).sort();
  return { n: BOOKS.length, a: ys[0], b: ys[ys.length - 1] };
}
/* a book's name stays on one line: when it is too long for the line, its font shrinks to fit (down to a floor) */
function fitLine(el) {
  el.style.fontSize = '';
  const w = el.clientWidth, sw = el.scrollWidth;
  el._fitW = w;
  if (w && sw > w + 1) el.style.fontSize = `${Math.max(el._fitMin || 9, parseFloat(getComputedStyle(el).fontSize) * w / sw * 0.985).toFixed(2)}px`;
}
const fitRO = 'ResizeObserver' in window
  ? new ResizeObserver((es) => es.forEach((e) => { if (e.target.clientWidth !== e.target._fitW) fitLine(e.target); }))   // a new width, not just a new font
  : null;
function fitWatch(el, min) {
  el.classList.add('fit');
  el._fitMin = min;
  fitLine(el);
  if (fitRO) fitRO.observe(el);
  return el;
}
if (!fitRO) addEventListener('resize', () => document.querySelectorAll('.fit').forEach(fitLine));
if (document.fonts) document.fonts.ready.then(() => document.querySelectorAll('.fit').forEach(fitLine));   // measured again in the real font
function renderBooks() {
  abBuilt = true;
  const list = abBooks();
  abHead.clear();
  abYearsIn.replaceChildren();
  abList.replaceChildren(...[...new Set(list.map((b) => b.ym.slice(0, 4)))].map((y) => {
    const sec = el('section', 'ab-year');
    const hd = el('div', 'wall-year'); hd.dataset.y = y; hd.dataset.rv = 'year'; hd.setAttribute('aria-hidden', 'true');
    hd.append(el('span', 'wy-n', y), el('span', 'wy-line'), el('span', 'wy-c'));
    const grid = el('div', 'ab-grid');
    list.filter((b) => b.ym.startsWith(y)).forEach((b, k) => {
      const a = el('a', 'ab-card'); a.id = 'abc-' + b.slug; a.href = '#ab-' + b.slug; a.dataset.rv = 'up'; a.dataset.d = `${(k * 0.12).toFixed(2)}s`;
      const fr = el('span', 'ab-stage'), box = b3Lazy(b3Make(b, false));
      fr.style.aspectRatio = b3StageRatio(b);
      fr.append(box);
      b3Hover(a, box, b);
      const info = el('span', 'ab-info'), cap = el('span', 'ab-cap');
      cap.append(el('span', 'ab-ev', b.ev));
      if (b.blur) cap.append(el('span', 'ab-r18', '18+'));
      cap.append(el('span', 'ab-line'), el('span', 'ab-ym', b.ym));
      info.append(fitWatch(el('span', 'ab-t', b.t), 9), cap);
      a.append(fr, info);
      grid.append(a);
    });
    sec.append(hd, grid);
    abHead.set(y, hd);
    const btn = el('button', '', y); btn.type = 'button'; btn.dataset.y = y; abYearsIn.append(btn);
    return sec;
  }));
  abText();
}
/* the words on the art book list; also run on a language switch */
function abText() {
  $('#ab-sub').textContent = tr('ab.sub', abVars());
  abHead.forEach((hd, y) => {
    const n = BOOKS.filter((b) => b.ym.startsWith(y)).length;
    hd.querySelector('.wy-c').textContent = LANG === 'en' && n === 1 ? '1 book' : tr('ab.count', { n });
  });
  abYearsIn.querySelectorAll('button').forEach((b) => b.setAttribute('aria-label', tr('years.go', { y: b.dataset.y })));
  abList.querySelectorAll('.ab-card').forEach((a) => { const b = BOOKS[byBook[a.id.slice(4)]]; a.setAttribute('aria-label', tr('ab.card', { t: bkName(b), d: b.ym })); });
  const { a, b } = abVars();
  abSortText(abSort, a, b);
}
const abSortText = sortControl($('#ab-sort'), (dir) => {
  if (dir === abSort) return;
  const was = yearSpots(abYearsIn);
  abSort = dir;
  renderBooks();
  watch(prime(abList));   // the books come back in, in the new order
  slideYears(abYearsIn, was);
  abYearsUpdate();
  const top = abList.getBoundingClientRect().top + scrollY - $('.site-head').offsetHeight - abYearsBar.offsetHeight - 14;
  if (scrollY > top + 4) scrollTo({ top, behavior: CALM ? 'auto' : 'smooth' });
});
abYearsIn.addEventListener('click', (e) => {
  const b = e.target.closest('button');
  if (!b) return;
  const top = abHead.get(b.dataset.y).getBoundingClientRect().top + scrollY - $('.site-head').offsetHeight - abYearsBar.offsetHeight - 14;
  scrollTo({ top, behavior: CALM ? 'auto' : 'smooth' });
});
/* the year in view lights up in the bar and the gold line shows how far down the list you are */
let abRaf = 0;
function abYearsUpdate() {
  abRaf = 0;
  if (VIEWS.artbook.hidden) return;
  const line = abYearsBar.getBoundingClientRect().bottom + 48;
  let cur = '';
  for (const [y, hd] of abHead) { if (cur && hd.getBoundingClientRect().top > line) break; cur = y; }
  abYearsIn.querySelectorAll('button').forEach((b) => {
    const on = String(b.dataset.y === cur);
    if (b.getAttribute('aria-current') === on) return;
    b.setAttribute('aria-current', on);
    if (on === 'true' && abYearsIn.scrollWidth > abYearsIn.clientWidth) abYearsIn.scrollTo({ left: b.offsetLeft - (abYearsIn.clientWidth - b.offsetWidth) / 2, behavior: CALM ? 'auto' : 'smooth' });
  });
  const r = abList.getBoundingClientRect();
  abYearsProg.style.transform = `scaleX(${Math.min(1, Math.max(0, (line - r.top) / r.height)).toFixed(4)})`;
}
addEventListener('scroll', () => { if (!abRaf) abRaf = requestAnimationFrame(abYearsUpdate); }, { passive: true });

/* ---------- single art book: the cover as a 3D book, then under "Preview" the cover spread and the inside pages; blurred pages lead to the album ---------- */
fitWatch($('#bk-title'), 9); fitWatch($('#bk-prev-t'), 10); fitWatch($('#bk-next-t'), 10);
function renderBook(i) {
  const b = BOOKS[i], blur = b.blur || [];
  $('#bk-title').textContent = b.t;
  fitLine($('#bk-title'));
  $('#bk-r18').hidden = !blur.length;
  $('#bk-cover').replaceChildren(...b3Hero(b));
  $('#bk-imgs').replaceChildren(...b.pages.map(([W, H], n) => {
    const img = el('img');
    img.src = `img/ab/${b.slug}_p${n}.webp`; img.width = W; img.height = H; img.dataset.n = n;
    img.loading = n < 2 ? 'eager' : 'lazy'; img.decoding = 'async';
    img.style.aspectRatio = `${W} / ${H}`;
    if (!blur.includes(n)) { img.dataset.rv = 'up'; return img; }
    const a = el('a', 'bk-blur'); a.href = NSFW_URL; a.target = '_blank'; a.rel = 'noopener'; a.dataset.rv = 'up';
    const tag = el('span', 'nsfw-tag', '18+'); tag.setAttribute('aria-hidden', 'true');
    a.append(img, tag);
    return a;
  }));
  const list = abBooks(), k = list.indexOf(b);   // previous / next follow the list's order
  const p = list[(k - 1 + list.length) % list.length], nx = list[(k + 1) % list.length];
  $('#bk-prev').href = '#ab-' + p.slug; $('#bk-prev-t').textContent = p.t;
  $('#bk-next').href = '#ab-' + nx.slug; $('#bk-next-t').textContent = nx.t;
  fitLine($('#bk-prev-t')); fitLine($('#bk-next-t'));
  bookText(i);
}
function bookText(i) {
  const b = BOOKS[i], blur = b.blur || [];
  $('#bk-date').textContent = tr('bk.date', { d: b.ym });
  $('#bk-ev').textContent = `Fancy Frontier ${b.ev.slice(2)}`;
  $('#bk-pages').textContent = pagesText(b.pages.length);
  const spec = (k, v) => { const d = el('div'); d.append(el('dt', '', tr('bk.spec.' + k)), el('dd', '', v)); return d; };
  $('#bk-spec').replaceChildren(   // size, pages, printing from the book's 品書; the cover paper is its material
    spec('size', tr('bk.size.' + b.size)),
    spec('pages', tr('bk.pp', { n: b.pp })),
    spec('print', tr('bk.print.' + b.print)),
    spec('cover', tr('bk.mat.' + (b.mat || 'gloss')) + (b.foil ? tr('bk.foil.' + b.foil) : '')),
  );
  $('#bk-spec').setAttribute('aria-label', tr('bk.spec'));
  $('#bk-imgs').querySelectorAll('img').forEach((img) => {
    const n = +img.dataset.n;
    img.alt = tr(n === 0 ? 'bk.coverAlt' : blur.includes(n) ? 'bk.blurAlt' : 'bk.pageAlt', { t: bkName(b), n });
  });
  const hero = $('#bk-cover .bk-stage');
  if (hero) { hero.setAttribute('aria-label', tr('b3.book', { t: bkName(b) })); $('#bk-cover .bk-hint span').textContent = tr('b3.open'); }
}
$('#bk-imgs').addEventListener('click', (e) => {
  const im = e.target.closest('img');
  if (!im || im.closest('.bk-blur')) return;   // a blurred page is a link to the album
  zvOpen('book', [...$('#bk-imgs').querySelectorAll(':scope > img')].indexOf(im), im);
});
