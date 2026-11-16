/* Work page */
/* ---------- single work page. A collection ("pieces": true, each page a piece of its own) shows its finished pieces
   as covers on a collage like the works wall's; each piece has a page of its own (#w-<id>/<n>) with its other
   versions ("alt") and its sketch ("sk") beside it, where it has them ---------- */
function renderWork(i, piece = -1) {
  const w = WORKS[i], one = w.pieces && piece >= 0, px = one && w.px && w.px[piece];   // px: a piece posted on pixiv by itself
  $('#wk-lab').textContent = w.lab;
  $('#wk-ym').textContent = w.ym;
  $('#wk-ym').hidden = !w.ym;
  $('#wk-link').href = 'https://www.pixiv.net/artworks/' + (px || w.id);
  $('#wk-link-li').hidden = !px && (w.cat !== 'fan' || !/^\d+$/.test(w.id));   // the original pieces, and fan pieces not posted there (f-…), are not on pixiv
  $('#wk-all-li').hidden = !one;   // a piece's page: back to the whole collection
  $('#wk-all').href = '#w-' + w.id;

  const tags = $('#wk-tags');
  tags.replaceChildren(...w.tags.map((t) => { const li = document.createElement('li'); li.textContent = '#' + t; return li; }));

  const box = $('#wk-imgs');
  box.removeAttribute('style');   // a collage's height, a piece page's columns
  box.className = !w.pieces ? 'proj-imgs' : one ? 'pc-pair' : 'pc-wall';
  if (one) {
    box.replaceChildren(...pieceFigs(w, piece));
    box.style.setProperty('--cols', Math.min(2, box.children.length));
  } else if (w.pieces) box.replaceChildren(...w.dims.map(([W, H], n) => pieceCover(w, n, W, H)));
  else box.replaceChildren(...w.dims.map(([W, H], n) => {
    const img = document.createElement('img');
    const r = W / H;
    img.src = src(w.id, n);
    img.width = W; img.height = H;
    img.loading = n < 2 ? 'eager' : 'lazy';
    img.decoding = 'async';
    if (n) img.dataset.rv = 'up';
    img.style.aspectRatio = `${W} / ${H}`;
    if (r < 0.5) {
      img.style.width = `min(100%, 760px, ${W}px)`;
    } else {
      img.style.width = `min(100%, ${W}px, calc((100vh - 150px) * ${r.toFixed(4)}))`;
      img.style.width = `min(100%, ${W}px, calc((100svh - 150px) * ${r.toFixed(4)}))`;
    }
    return img;
  }));

  /* process timelapse: a thumbnail card that opens YouTube (artifact pages cannot embed players);
     the self-hosted copy swaps in the YouTube player on click */
  $('#wk-tl').hidden = $('#wk-tl-li').hidden = !w.yt;
  if (w.yt) {
    const url = `https://www.youtube.com/watch?v=${w.yt.id}`;
    const card = el('a', 'tl-card');
    card.href = url; card.target = '_blank'; card.rel = 'noopener';
    const im = el('img');
    im.src = `img/yt/${w.yt.id}.webp`; im.width = 1280; im.height = 720; im.alt = ''; im.loading = 'lazy';
    card.append(im, el('span', 'tl-play'), el('span', 'tl-dur', w.yt.dur));
    if (window.SELF_HOSTED) ytInline(card, w.yt.id, w.yt.t);
    $('#wk-tl-box').replaceChildren(card);
    $('#wk-tl-title').textContent = w.yt.t;
    $('#wk-tl-link').href = url;
  } else {
    $('#wk-tl-box').replaceChildren();
  }

  /* process animations (stage-by-stage) the artist made for this piece */
  $('#wk-proc').hidden = !w.proc;
  $('#wk-proc-box').replaceChildren(...(w.proc || []).map(([f, W, H]) => {
    const im = el('img'); im.src = `img/proc/${f}`; im.width = W; im.height = H; im.loading = 'lazy'; im.decoding = 'async';
    if (W > H * 1.2) im.className = 'wide';
    return im;
  }));

  /* previous / next: on a piece's page, the collection's other pieces; otherwise they stay inside Fan Art or
     Original Art and follow the wall's order */
  $('#wk-prev .lbl').textContent = one ? '← Previous Piece' : '← Previous Project';
  $('#wk-next .lbl').textContent = one ? 'Next Piece →' : 'Next Project →';
  if (one) {
    const m = w.dims.length, p = (piece - 1 + m) % m, nx = (piece + 1) % m;
    $('#wk-prev').href = `#w-${w.id}/${p + 1}`; $('#wk-prev-t').textContent = `No.${no2(p + 1)}`;
    $('#wk-next').href = `#w-${w.id}/${nx + 1}`; $('#wk-next-t').textContent = `No.${no2(nx + 1)}`;
  } else {
    const list = wallSort === 'old' ? [...CAT_LIST[w.cat]].reverse() : CAT_LIST[w.cat], k = list.indexOf(w);
    $('#wk-prev').href = '#w-' + list[(k - 1 + list.length) % list.length].id;
    $('#wk-next').href = '#w-' + list[(k + 1) % list.length].id;
  }
  workText(i, piece);
}
/* a collection's piece on its collage: a cover like the wall's, linking to the piece's page */
function pieceCover(w, n, W, H) {
  const a = makeCover(`#w-${w.id}/${n + 1}`, [[src(w.id, n), W, H]], w.pos, n < 4);
  a.dataset.n = n;
  a.dataset.date = madeOn(w);   // one date for them all: the collage pairs them in order
  return a;
}
const PIECE_SEED = (WALL_SEED ^ 0x9e3779b9) >>> 0;   // an arrangement of its own, kept while browsing like the wall's
function layoutPieces() {
  const box = $('#wk-imgs');
  if (VIEWS.work.hidden || !box.classList.contains('pc-wall') || !box.clientWidth) return;
  const order = [...box.querySelectorAll('.cover')];
  collage(box, order, buildUnits(order), PIECE_SEED, null);
}
addEventListener('resize', () => requestAnimationFrame(layoutPieces));
if (document.fonts) document.fonts.ready.then(layoutPieces);
/* the pictures on a piece's page: the finished one, its other versions, its sketch */
function pieceImgs(w, n) {
  const sk = w.sk && w.sk[n];
  return [
    { k: 'final', src: src(w.id, n), d: w.dims[n] },
    ...((w.alt && w.alt[n]) || []).map((d, j) => ({ k: 'alt', j: j + 1, src: `img/${w.id}_a${n}_${j + 1}.webp`, d })),
    ...(sk ? [{ k: 'sketch', src: `img/${w.id}_s${n}.webp`, d: sk }] : []),
  ];
}
/* a piece's page: its pictures, each with its caption (written by workText) */
function pieceFigs(w, n) {
  return pieceImgs(w, n).map((p, j) => {
    const f = el('figure', 'pc-fig'), img = el('img');
    img.src = p.src;
    [img.width, img.height] = p.d;
    img.decoding = 'async';
    if (j) f.dataset.rv = 'up';
    f.append(el('figcaption', 'pc-cap'), img);
    return f;
  });
}
/* the words on a work page; also run on a language switch so the images and the video player stay put */
function workText(i, piece = -1) {
  const w = WORKS[i], t = L(w.t), one = w.pieces && piece >= 0;
  $('#wk-title').textContent = t;
  $('#wk-date').textContent = tr(w.cat === 'original' ? 'wk.made' : 'wk.posted', { d: dot(w.d) });
  $('#wk-pages').textContent = one ? `No.${no2(piece + 1)} / ${no2(w.dims.length)}` : pagesText(w.dims.length);
  if (!one) {   // the names of the works before and after this one (a piece's page shows the pieces' numbers)
    for (const k of ['prev', 'next']) $(`#wk-${k}-t`).textContent = L(WORKS[byId[$(`#wk-${k}`).getAttribute('href').slice(3)]].t);   // href: #w-<id>
  }
  const box = $('#wk-imgs');
  if (one) {   // a piece's page: each picture's caption and description
    const figs = box.querySelectorAll('.pc-fig');
    pieceImgs(w, piece).forEach((p, j) => {
      figs[j].querySelector('.pc-cap').textContent = tr('wk.' + p.k, { n: p.j });
      figs[j].querySelector('img').alt = tr(`wk.${p.k}Alt`, { t, n: piece + 1, k: p.j });
    });
  } else if (w.pieces) {   // a collection's covers: the piece's number, and how many pictures its page has
    box.querySelectorAll('.cover').forEach((a) => {
      const n = +a.dataset.n, m = pieceImgs(w, n).length;
      coverText(a, `No.${no2(n + 1)}`, `${dot(madeOn(w))}${m > 1 ? ' · ' + tr('cover.pages', { n: m }) : ''}`, tr('wk.finalAlt', { t, n: n + 1 }));
    });
    layoutPieces();   // after the words: on touch screens they sit under the pictures and add to the covers' height
  } else {
    box.querySelectorAll('img').forEach((img, n) => { img.alt = w.dims.length > 1 ? tr('wk.imgAlt', { t, n: n + 1, m: w.dims.length }) : t; });
  }
  /* cross-link: goods made from this piece, or the goods page for the catalog itself */
  const gl = $('#wk-goods');
  const made = GOODS.filter((g) => g.works.includes(w.id));
  gl.replaceChildren();
  if (w.id === '148499079') {
    const a = el('a', '', tr('wk.goodsLink')); a.href = '#goods'; gl.append(a);
  } else if (made.length) {
    gl.append(document.createTextNode(tr('wk.madeGoods')));
    made.forEach((g, k) => {
      if (k) gl.append(document.createTextNode(tr('list.sep')));
      const a = el('a', '', L(g.name)); a.href = '#g-' + g.slug; gl.append(a);
    });
  }
  gl.hidden = !gl.childNodes.length;

  const procs = $('#wk-proc-box').querySelectorAll('img');
  procs.forEach((im, n) => { im.alt = tr('proc.alt', { t }) + (procs.length > 1 ? ` (${n + 1}/${procs.length})` : ''); });
  const card = $('#wk-tl-box .tl-card');
  if (card) card.setAttribute('aria-label', tr('tl.play', { t: w.yt.t }));
}
/* a YouTube card that plays here, in its own place, when clicked (the work page's timelapse, the home page's latest
   videos). Changing page only hides a view, so a player still going is put back to its card then: no sound left
   playing on a page you have left. */
const ytPlaying = new Map();   // player -> its card
function ytInline(card, id, t) {
  card.addEventListener('click', (e) => {
    e.preventDefault();
    const f = el('iframe');
    f.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    f.title = t;
    f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    f.allowFullscreen = true;
    card.replaceWith(f);
    ytPlaying.set(f, card);
  });
}
/* put playing videos back to their cards (those inside box, or all): on a page change, and when the home page's
   video window shuts (js/home.js) */
function ytStop(box) {
  ytPlaying.forEach((card, f) => { if (!box || box.contains(f)) { f.replaceWith(card); ytPlaying.delete(f); } });
}
addEventListener('hashchange', () => ytStop());
