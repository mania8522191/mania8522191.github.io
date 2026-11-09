/* Image viewer (lightbox): fit, zoom into the full-size copy, drag to pan */
/* ---------- image viewer: fit, click to zoom into the high-resolution copy, drag to pan ---------- */
const zv = $('#zv'), zvStage = $('#zv-stage'), zvImg = $('#zv-img'), zvZoomBtn = $('#zv-zoom'), zvTags = $('#zv-tags');
const ZV_SETS = {
  proc: () => {   // a work's process animations; the full-size one, where there is one, on zoom
    const w = WORKS[byId[lastWork]], list = w.proc || [];
    return list.map(([f, W, H, ZW, ZH], n) => ({
      src: `img/proc/${f}`, zsrc: ZW ? `img/proc/z/${f}` : null, eager: true,
      w: W, h: H, zw: ZW || W,
      no: `${n + 1} / ${list.length}`, cap: `${w.t} · ${tr('proc.h')}`,
      alt: tr('proc.alt', { t: w.t }),
    }));
  },
  work: () => {
    const w = WORKS[byId[lastWork]];
    return w.dims.map(([W, H, ZW, ZH], n) => ({
      src: src(w.id, n), zsrc: ZW ? src(w.id, n).replace('img/', 'img/z/') : null,
      w: W, h: H, zw: ZW || W,
      no: `${n + 1} / ${w.dims.length}`, cap: w.t,
      alt: w.dims.length > 1 ? tr('zv.workAlt', { t: w.t, n: n + 1 }) : w.t,
    }));
  },
  shots: () => SHOTS.map((s, i) => ({ src: `img/shot${i + 1}.webp`, w: 1600, h: 900, zw: 1600, no: `${no2(i + 1)} / ${no2(SHOTS.length)}`, cap: tr(s), alt: tr(s) })),
  chars: () => artChars.map((n) => (CHAR_CARD.has(n)
    ? { src: `img/cards/pair${n}.webp`, w: PAIR_W[n], h: 1364, zw: PAIR_W[n], no: `No.${no2(n)}`, cap: `char${n} · CARD`, alt: tr('chars.pairAlt', { n }),
        tags: { cols: `500fr 48fr ${PAIR_W[n] - 548}fr`, l: tr('pair.art'), r: `${tr('pair.card')} · ${CARD_NAMES[`char${n}`] || `char${n}`}` } }
    : { src: `img/char${n}.webp`, w: 500, h: 1364, zw: 500, no: `No.${no2(n)}`, cap: `char${n}`, alt: tr('chars.full', { n }) })),
  book: () => {
    const b = BOOKS[byBook[lastBook]], blur = b.blur || [];
    const pages = b.pages.map((d, n) => [d, n]).filter(([, n]) => !blur.includes(n));   // the cover spread, then the inside pages
    return pages.map(([[W, H, ZW], n], k) => ({
      src: `img/ab/${b.slug}_p${n}.webp`, zsrc: ZW ? `img/ab/x/${b.slug}_p${n}.webp` : null, eager: true,   // x: the full-size spread
      w: W, h: H, zw: ZW || W,
      no: `${k + 1} / ${pages.length}`, cap: bkName(b),
      alt: tr(n ? 'bk.pageAlt' : 'bk.coverAlt', { t: bkName(b), n }),
    }));
  },
  cards: () => DECK.map((f, i) => {
    const c = tr('cat.' + CAT(f)), name = CARD_NAMES[f] || c;
    return { src: `img/cards/${f}.webp`, w: 336, h: 960, zw: 420, no: `${no2(i + 1)} / ${no2(DECK.length)}`, cap: `${c} · ${name}`, alt: tr('cards.alt', { c, name }) };
  }),
};
let zvKind = '', zvSet = [], zvAt = 0, zvFrom = null, zoomed = false, zvToken = 0;

function zvFit(it) {
  const sw = zvStage.clientWidth - (innerWidth > 640 ? 128 : 24), sh = zvStage.clientHeight - 32 - (it.tags ? 40 : 0);
  const r = it.h / it.w;
  if (r > 2.9) return Math.max(80, Math.min(sw, it.zw, 1000));   // long process strips: fit the width, scroll down
  return Math.max(80, Math.min(sw, sh / r, it.zw));
}
function zvSize() {
  const it = zvSet[zvAt];
  const fit = zvFit(it);
  const w = zoomed ? it.zw : fit;   // zoomed: the picture at its actual size, 100%
  zvImg.style.width = `${Math.round(w)}px`;
  zvImg.style.height = `${Math.round(w * it.h / it.w)}px`;
  zvTags.style.width = `${Math.round(w)}px`;
  /* the zoom button says what it does: show the actual size, or fit the window (at that share of the actual size).
     A picture that already fits at its actual size has nothing to zoom. */
  const can = zoomed || it.zw > fit + 1;
  zvZoomBtn.hidden = !can;
  zvStage.classList.toggle('nozoom', !can);
  zvZoomBtn.textContent = zoomed ? tr('zv.unzoom', { p: Math.round((fit / it.zw) * 100) }) : tr('zv.zoom');
}
function zvHiRes() {
  const it = zvSet[zvAt];
  if (!it.zsrc || zvImg.getAttribute('src') === it.zsrc) return;
  const t = ++zvToken;
  const pre = new Image();
  pre.src = it.zsrc;
  $('#zv-load').hidden = false;
  pre.decode()
    .then(() => { if (t === zvToken) zvImg.src = it.zsrc; })
    .catch(() => {})
    .finally(() => { if (t === zvToken) $('#zv-load').hidden = true; });
}
function zvZoom(on, cx, cy) {
  if (on === zoomed || zvStage.classList.contains('nozoom')) return;
  const a = zvImg.getBoundingClientRect(), s = zvStage.getBoundingClientRect();
  const px = cx ?? s.left + s.width / 2, py = cy ?? s.top + s.height / 2;   // this point stays put
  const fx = Math.min(1, Math.max(0, (px - a.left) / a.width)), fy = Math.min(1, Math.max(0, (py - a.top) / a.height));
  zoomed = on;
  zv.classList.toggle('zoomed', on);
  zvZoomBtn.setAttribute('aria-pressed', String(on));
  zvImg.style.transition = 'none';
  zvImg.style.transform = '';
  zvSize();
  const b = zvImg.getBoundingClientRect();
  zvStage.scrollLeft += b.left + fx * b.width - px;
  zvStage.scrollTop += b.top + fy * b.height - py;
  if (!CALM) {   // tween from the old box to the new one
    const c = zvImg.getBoundingClientRect();
    zvImg.style.transformOrigin = '0 0';
    zvImg.style.transform = `translate(${a.left - c.left}px, ${a.top - c.top}px) scale(${a.width / c.width})`;
    void zvImg.offsetWidth;
    zvImg.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
    zvImg.style.transform = 'none';
  }
  if (on) zvHiRes();
}
function zvShow(i, opening) {
  zvAt = (i + zvSet.length) % zvSet.length;
  const it = zvSet[zvAt];
  ++zvToken;
  $('#zv-load').hidden = true;
  zoomed = false;
  zv.classList.remove('zoomed');
  zvZoomBtn.setAttribute('aria-pressed', 'false');
  zvImg.style.transition = 'none';
  zvImg.style.transform = '';
  zvImg.src = it.src;
  zvImg.alt = it.alt;
  $('#zv-cap').replaceChildren(el('span', '', it.no), document.createTextNode(it.cap));
  zvTags.hidden = !it.tags;
  if (it.tags) {
    zvTags.style.gridTemplateColumns = it.tags.cols;
    zvTags.children[0].textContent = it.tags.l; zvTags.children[1].textContent = it.tags.r;
    zvTags.classList.remove('swap'); void zvTags.offsetWidth; zvTags.classList.add('swap');
  }
  zvSize();
  if (it.eager && zvFit(it) * (devicePixelRatio || 1) > it.w) zvHiRes();   // shown bigger than the page image: get the full size now, not only on zoom
  zvStage.scrollTo(0, 0);
  zvImg.classList.remove('swap');
  if (!opening) { void zvImg.offsetWidth; zvImg.classList.add('swap'); }   // the next one swaps in; the first one flies in (zvFly)
  $('#zv-prev').hidden = $('#zv-next').hidden = zvSet.length < 2;
  if (zvKind === 'shots') showShot(zvAt, false);
}
/* the picture that was clicked, where it is on the screen (null if it is not showing) */
function zvRectOf(e) {
  if (!e || !e.isConnected || e.closest('[hidden]')) return null;
  const r = (e.tagName === 'IMG' ? e : e.querySelector('img') || e).getBoundingClientRect();
  return r.width && r.height && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth ? r : null;
}
/* opening, the picture flies from the one that was clicked to its place in the viewer; closing, back again. With
   nothing on screen to fly from, it grows from a little smaller instead. Returns how long it takes (ms). */
function zvFly(out) {
  if (CALM || !zvImg.animate) return 0;
  const c = zvImg.getBoundingClientRect(), a = zvRectOf(zvFrom), to = a && c.width;
  const away = to
    ? { transform: `translate(${(a.left - c.left).toFixed(1)}px,${(a.top - c.top).toFixed(1)}px) scale(${(a.width / c.width).toFixed(4)},${(a.height / c.height).toFixed(4)})`, opacity: 1 }
    : { transform: 'scale(.92)', opacity: 0 };
  const here = { transform: 'none', opacity: 1 }, ms = out ? 380 : 520;
  zvImg.style.transformOrigin = to ? '0 0' : '50% 50%';
  zvImg.animate(out ? [here, away] : [away, here], { duration: ms, easing: out ? 'cubic-bezier(.4,0,.2,1)' : 'cubic-bezier(.16,1,.3,1)', fill: out ? 'forwards' : 'backwards' });
  return ms;
}
let zvShut = 0;   // the closing timer
function zvOpen(kind, i, from) {
  clearTimeout(zvShut);   // opened again while closing
  zv.classList.remove('zv-out');
  zvImg.getAnimations().forEach((x) => x.cancel());
  zvKind = kind;
  zvSet = ZV_SETS[kind]();
  zvFrom = from;
  zv.hidden = false;
  document.documentElement.classList.add('zv-open');
  const hint = $('#zv-hint');
  hint.style.animation = 'none'; void hint.offsetWidth; hint.style.animation = '';
  zvShow(i, true);
  zvFly(false);
  $('#zv-close').focus({ preventScroll: true });
}
function zvClose() {
  if (zv.hidden || zv.classList.contains('zv-out')) return;
  ++zvToken;
  const done = () => {
    zv.hidden = true;
    zv.classList.remove('zv-out');
    zvImg.getAnimations().forEach((x) => x.cancel());
    document.documentElement.classList.remove('zv-open');
    if (zvFrom && zvFrom.isConnected) zvFrom.focus({ preventScroll: true });
  };
  if (CALM) { done(); return; }
  zv.classList.add('zv-out');
  zvShut = setTimeout(done, zvFly(true) || 380);
}
/* a click toggles zoom at that point (outside the picture it closes); a mouse drag pans instead */
let drag = null;
zvStage.addEventListener('pointerdown', (e) => {
  if (!zoomed || e.pointerType !== 'mouse' || e.button !== 0) return;
  drag = { x: e.clientX, y: e.clientY, l: zvStage.scrollLeft, t: zvStage.scrollTop, moved: false };
  zvStage.setPointerCapture(e.pointerId);
});
zvStage.addEventListener('pointermove', (e) => {
  if (!drag) return;
  const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
  if (Math.abs(dx) + Math.abs(dy) > 4) { drag.moved = true; zvStage.classList.add('drag'); }
  zvStage.scrollLeft = drag.l - dx;
  zvStage.scrollTop = drag.t - dy;
});
const endDrag = () => { zvStage.classList.remove('drag'); setTimeout(() => { drag = null; }, 0); };
zvStage.addEventListener('pointerup', endDrag);
zvStage.addEventListener('pointercancel', endDrag);
zvStage.addEventListener('click', (e) => {
  if (drag && drag.moved) return;
  if (e.target.closest('#zv-tags')) return;
  const r = zvImg.getBoundingClientRect();
  const onImg = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
  if (onImg) zvZoom(!zoomed, e.clientX, e.clientY);
  else if (!zoomed) zvClose();
});
zvZoomBtn.addEventListener('click', () => zvZoom(!zoomed));
$('#zv-close').addEventListener('click', zvClose);
$('#zv-prev').addEventListener('click', () => zvShow(zvAt - 1));
$('#zv-next').addEventListener('click', () => zvShow(zvAt + 1));
addEventListener('keydown', (e) => {
  if (zv.hidden) return;
  if (e.key === 'Escape') zvClose();
  else if (e.key === 'ArrowLeft' && zvSet.length > 1) zvShow(zvAt - 1);
  else if (e.key === 'ArrowRight' && zvSet.length > 1) zvShow(zvAt + 1);
  else if (e.key === 'z' || e.key === '+' || e.key === '-') zvZoom(!zoomed);
});
addEventListener('resize', () => { if (!zv.hidden) zvSize(); });
addEventListener('hashchange', zvClose);

$('#wk-tl-jump').addEventListener('click', () => $('#wk-tl').scrollIntoView({ behavior: CALM ? 'auto' : 'smooth', block: 'center' }));
$('#shot-big').addEventListener('click', (e) => zvOpen('shots', shotAt, e.currentTarget));
charList.addEventListener('click', (e) => { const b = e.target.closest('.char-btn'); if (b) zvOpen('chars', artChars.indexOf(+b.dataset.n), b); });
$('#wk-imgs').addEventListener('click', (e) => {
  const im = e.target.closest('img');
  if (im) zvOpen('work', [...$('#wk-imgs').children].indexOf(im), im);
});
$('#wk-proc-box').addEventListener('click', (e) => {
  const im = e.target.closest('img');
  if (im) zvOpen('proc', [...$('#wk-proc-box').querySelectorAll('img')].indexOf(im), im);
});
