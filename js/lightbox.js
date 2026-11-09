/* Image viewer: windows that move, resize, minimize into the dock and stay open side by side; fit, zoom, pan */
/* ---------- image viewer: each picture opens in a window of its own, over the page below the header. Drag the bar
   to move it, an edge or a corner to resize it; minimize tucks it into the dock at the bottom left, and a click there
   brings it back as it was. Any number stay open side by side while the page goes on. In each: click to zoom into the
   high-resolution copy, drag to pan. ---------- */
const zwLayer = $('#zw-layer'), zvDock = $('#zv-dock');
const ZV_MIN_W = 240, ZV_MIN_H = 180;   // the smallest a window can be made
const ZV_SETS = {   // what a window steps through; made again in another language (zvLang)
  proc: (id) => {   // a work's process animations; the full-size one, where there is one, on zoom
    const w = WORKS[byId[id]], list = w.proc || [];
    return list.map(([f, W, H, ZW, ZH], n) => ({
      src: `img/proc/${f}`, zsrc: ZW ? `img/proc/z/${f}` : null, eager: true,
      w: W, h: H, zw: ZW || W,
      no: `${n + 1} / ${list.length}`, cap: `${w.t} · ${tr('proc.h')}`,
      alt: tr('proc.alt', { t: w.t }),
    }));
  },
  work: (id) => {
    const w = WORKS[byId[id]];
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
  book: (slug) => {
    const b = BOOKS[byBook[slug]], blur = b.blur || [];
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
const zvWins = [];   // the open windows, those in the dock too
let zvTop = 0;       // the stacking order: the window in front has the highest
const zvShown = () => zvWins.filter((o) => !o.chip && !o.shut).sort((a, b) => a.el.style.zIndex - b.el.style.zIndex);   // on screen, back to front

function zvFit(w, it) {
  const W = w.box.w - 2, H = w.box.h - 2;   // inside the border
  const side = w.set.length > 1 && W > 430 ? 112 : 24;   // the picture's side margins, with room for the arrows (css/lightbox.css)
  /* from the window's size, not from the picture's area as it is now: that can be on its way (a window gliding
     aside), or short of a scrollbar along the bottom for a moment, brought by a picture still at its old size */
  const sw = W - (w.stage.offsetWidth - w.stage.clientWidth) - side, sh = H - w.bar.offsetHeight - 32 - (it.tags ? 40 : 0);
  const r = it.h / it.w;
  if (r > 2.9) return Math.max(40, Math.min(sw, it.zw, 1000));   // long process strips: fit the width, scroll down
  return Math.max(40, Math.min(sw, sh / r, it.zw));
}
function zvSize(w) {
  const it = w.set[w.at], fit = zvFit(w, it);
  const px = w.zoomed ? it.zw : fit;   // zoomed: the picture at its actual size, 100%
  w.img.style.width = `${Math.round(px)}px`;
  w.img.style.height = `${Math.round(px * it.h / it.w)}px`;
  w.tags.style.width = `${Math.round(px)}px`;
  /* the zoom button says what it does: show the actual size, or fit the window (at that share of the actual size).
     A picture that already fits at its actual size has nothing to zoom. */
  const can = w.zoomed || it.zw > fit + 1;
  w.zoomBtn.hidden = !can;
  w.stage.classList.toggle('nozoom', !can);
  const t = w.zoomed ? tr('zv.unzoom', { p: Math.round((fit / it.zw) * 100) }) : tr('zv.zoom');
  w.zoomT.textContent = t;
  w.zoomBtn.title = t;   // a narrow window shows only the icon
}
function zvHiRes(w) {
  const it = w.set[w.at];
  if (!it.zsrc || w.img.getAttribute('src') === it.zsrc) return;
  const t = ++w.token, pre = new Image();
  pre.src = it.zsrc;
  w.load.hidden = false;
  pre.decode()
    .then(() => { if (t === w.token) w.img.src = it.zsrc; })
    .catch(() => {})
    .finally(() => { if (t === w.token) w.load.hidden = true; });
}
function zvZoom(w, on, cx, cy) {
  if (on === w.zoomed || w.stage.classList.contains('nozoom')) return;
  const { img, stage } = w;
  const a = img.getBoundingClientRect(), s = stage.getBoundingClientRect();
  const px = cx ?? s.left + s.width / 2, py = cy ?? s.top + s.height / 2;   // this point stays put
  const fx = Math.min(1, Math.max(0, (px - a.left) / a.width)), fy = Math.min(1, Math.max(0, (py - a.top) / a.height));
  w.zoomed = on;
  w.el.classList.toggle('zoomed', on);
  w.zoomBtn.setAttribute('aria-pressed', String(on));
  img.style.transition = 'none';
  img.style.transform = '';
  zvSize(w);
  const b = img.getBoundingClientRect();
  stage.scrollLeft += b.left + fx * b.width - px;
  stage.scrollTop += b.top + fy * b.height - py;
  if (!CALM) {   // tween from the old box to the new one
    const c = img.getBoundingClientRect();
    img.style.transformOrigin = '0 0';
    img.style.transform = `translate(${a.left - c.left}px, ${a.top - c.top}px) scale(${a.width / c.width})`;
    void img.offsetWidth;
    img.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
    img.style.transform = 'none';
  }
  if (on) zvHiRes(w);
}
/* the words for the picture a window shows, in the language chosen; its chip in the dock too */
function zvText(w) {
  const it = w.set[w.at];
  w.img.alt = it.alt;
  w.cap.replaceChildren(el('span', '', it.no), document.createTextNode(it.cap));
  w.tags.hidden = !it.tags;
  if (it.tags) {
    w.tags.style.gridTemplateColumns = it.tags.cols;
    w.tags.children[0].textContent = it.tags.l; w.tags.children[1].textContent = it.tags.r;
  }
  if (w.chip) {
    w.chip.querySelector('.zv-chip-t').textContent = it.cap;
    w.chip.querySelector('.zv-chip-b').title = `${it.no} · ${it.cap}`;
  }
}
function zvShow(w, i, opening) {
  w.at = (i + w.set.length) % w.set.length;
  const it = w.set[w.at];
  ++w.token;
  w.load.hidden = true;
  w.zoomed = false;
  w.el.classList.remove('zoomed');
  w.zoomBtn.setAttribute('aria-pressed', 'false');
  w.img.style.transition = 'none';
  w.img.style.transform = '';
  w.img.src = it.src;
  zvText(w);
  if (it.tags) { w.tags.classList.remove('swap'); void w.tags.offsetWidth; w.tags.classList.add('swap'); }
  zvSize(w);
  if (it.eager && zvFit(w, it) * (devicePixelRatio || 1) > it.w) zvHiRes(w);   // shown bigger than the page image: get the full size now, not only on zoom
  w.stage.scrollTo(0, 0);
  w.img.classList.remove('swap');
  if (!opening) { void w.img.offsetWidth; w.img.classList.add('swap'); }   // the next one swaps in; the first one flies in (zvFly)
  if (w.kind === 'shots') showShot(w.at, false);
}
/* the picture that was clicked, where it is on the screen (null if it is not showing) */
function zvRectOf(e) {
  if (!e || !e.isConnected || e.closest('[hidden]')) return null;
  const r = (e.tagName === 'IMG' ? e : e.querySelector('img') || e).getBoundingClientRect();
  return r.width && r.height && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth ? r : null;
}
/* opening, the picture flies from the one that was clicked to its place in the window; closing, back again. A copy
   flies, fixed to the screen, while the picture itself waits hidden: moved inside the window's scrolling area, the
   picture would make its scrollbars come and go. A picture bigger than its window (zoomed in, a long strip), or with
   nothing on screen to fly to, just fades with the window. Returns how long it takes (ms). */
function zvGhostOut(w) {
  if (w.ghost) { w.ghost.remove(); w.ghost = null; }
  w.img.style.visibility = '';
}
function zvFly(w, out) {
  zvGhostOut(w);
  if (CALM || !w.img.animate) return 0;
  const c = w.img.getBoundingClientRect(), s = w.stage.getBoundingClientRect();
  const a = zvRectOf(!out || w.at === w.at0 || w.kind === 'shots' ? w.from : null);   // shots: the page keeps showing the one in the window
  if (!a || !c.width || c.left < s.left - 1 || c.top < s.top - 1 || c.right > s.right + 1 || c.bottom > s.bottom + 1) return 0;
  const ghost = w.img.cloneNode(false);
  ghost.className = 'zv-ghost';
  ghost.style.cssText = `left:${c.left}px;top:${c.top}px;width:${c.width}px;height:${c.height}px`;
  document.body.append(ghost);
  w.ghost = ghost;
  w.img.style.visibility = 'hidden';
  const away = { transform: `translate(${(a.left - c.left).toFixed(1)}px,${(a.top - c.top).toFixed(1)}px) scale(${(a.width / c.width).toFixed(4)},${(a.height / c.height).toFixed(4)})` };
  const here = { transform: 'none' }, ms = out ? 380 : 520;
  const fly = ghost.animate(out ? [here, away] : [away, here], { duration: ms, easing: out ? 'cubic-bezier(.4,0,.2,1)' : 'cubic-bezier(.16,1,.3,1)', fill: 'both' });
  if (!out) fly.finished.then(() => { if (w.ghost === ghost) zvGhostOut(w); }, () => {});   // landed: the picture itself takes over
  return ms;
}

/* a window's place and size: on the screen below the header, with enough of it showing that its bar can be reached */
function zvBox(w, x, y, W, H) {
  const lw = zwLayer.clientWidth, lh = zwLayer.clientHeight;
  W = Math.round(Math.max(ZV_MIN_W, Math.min(W, lw)));
  H = Math.round(Math.max(ZV_MIN_H, Math.min(H, lh)));
  x = Math.round(Math.min(Math.max(x, 80 - W), lw - 80));
  y = Math.round(Math.min(Math.max(y, 0), lh - 48));
  const sized = !w.box || W !== w.box.w || H !== w.box.h;
  w.box = { x, y, w: W, h: H };
  Object.assign(w.el.style, { left: `${x}px`, top: `${y}px`, width: `${W}px`, height: `${H}px` });
  if (sized && w.img.getAttribute('src')) zvSize(w);
}
/* where a window goes, shaped about like its picture and as big as fits it (most of a phone's screen): in the middle
   of the given half of the screen (side 'l' or 'r'), or else where it covers the other windows least, nearest the
   middle */
function zvPlace(w, side) {
  const LW = zwLayer.clientWidth, lh = zwLayer.clientHeight, it = w.set[w.at], r = it.h / it.w;
  const lw = side ? Math.floor(LW / 2) : LW, ax = side === 'r' ? LW - lw : 0;   // the area it goes in
  if (!w.box) zvBox(w, 0, 0, 600, 400);   // a new one: some size for now, to measure the frame around the picture
  const fw = w.stage.offsetWidth - w.stage.clientWidth + 2 + (w.set.length > 1 ? 112 : 24);   // scrollbar room, border, margins
  const fh = w.bar.offsetHeight + 2 + 32 + (it.tags ? 40 : 0);
  let W, H;
  if (LW <= 640) { W = lw - 16; H = lh * 0.86; }
  else {
    const maxW = side ? lw - 24 : Math.max(480, lw * 0.72), maxH = lh * 0.88;
    const pw = Math.min(maxW - fw, it.zw, r > 2.9 ? 1000 : (maxH - fh) / r);
    W = Math.min(maxW, Math.max(side ? 0 : 480, pw + fw));
    H = r > 2.9 ? maxH : Math.min(maxH, Math.max(320, pw * r + fh));
  }
  W = Math.round(W); H = Math.round(H);
  w.auto = true;   // put here, not by the visitor: the next picture opened may move it aside (zvOpen)
  if (side) { zvBox(w, ax + (lw - W) / 2, (lh - H) / 2, W, H); return; }
  const others = zvShown().filter((o) => o !== w).map((o) => o.box);
  const mx = Math.max(0, lw - W), my = Math.max(0, lh - H), nx = LW <= 640 ? 0 : 10;   // phones: always centred left to right
  let best = null;
  for (let i = 0; i <= nx; i++) {
    for (let j = 0; j <= 6; j++) {
      const x = Math.round(nx ? mx * i / nx : mx / 2), y = Math.round(my * j / 6);
      let cover = 0;
      for (const o of others) cover += Math.max(0, Math.min(x + W, o.x + o.w) - Math.max(x, o.x)) * Math.max(0, Math.min(y + H, o.y + o.h) - Math.max(y, o.y));
      const off = Math.hypot(x - mx / 2, y - my / 2);
      if (!best || cover < best.cover || (cover === best.cover && off < best.off)) best = { x, y, cover, off };
    }
  }
  zvBox(w, best.x, best.y, W, H);
}
function zvFront(w) {
  if (w.el.classList.contains('front')) return;
  zvWins.forEach((o) => o.el.classList.toggle('front', o === w));
  w.el.style.zIndex = ++zvTop;
}
/* drag the bar to move a window (d = ''), an edge or a corner to resize it (d = n, e, s, w, ne, se, sw or nw) */
function zvGrab(w, e, d) {
  if (e.button !== 0 || w.shut) return;
  e.preventDefault();
  if (!w.el.contains(document.activeElement)) w.el.focus({ preventScroll: true });
  w.auto = false;   // the visitor's place for it from now on
  w.el.classList.remove('glide');
  const t = e.currentTarget, { x, y, w: W, h: H } = w.box, sx = e.clientX, sy = e.clientY;
  const lw = zwLayer.clientWidth, lh = zwLayer.clientHeight;
  t.setPointerCapture(e.pointerId);
  w.el.classList.add(d ? 'sizing' : 'moving');
  const move = (ev) => {
    const dx = ev.clientX - sx, dy = ev.clientY - sy;
    if (!d) { zvBox(w, x + dx, y + dy, W, H); return; }
    let l = x, tp = y, r = x + W, b = y + H;   // an edge that was off the screen does not jump back on
    if (d.includes('w')) l = Math.min(Math.max(x + dx, Math.min(0, x)), r - ZV_MIN_W);
    if (d.includes('e')) r = Math.max(Math.min(r + dx, Math.max(lw, r)), l + ZV_MIN_W);
    if (d.includes('n')) tp = Math.min(Math.max(y + dy, 0), b - ZV_MIN_H);
    if (d.includes('s')) b = Math.max(Math.min(b + dy, Math.max(lh, b)), tp + ZV_MIN_H);
    zvBox(w, l, tp, r - l, b - tp);
  };
  const up = () => {
    t.removeEventListener('pointermove', move);
    t.removeEventListener('pointerup', up);
    t.removeEventListener('pointercancel', up);
    w.el.classList.remove('moving', 'sizing');
  };
  t.addEventListener('pointermove', move);
  t.addEventListener('pointerup', up);
  t.addEventListener('pointercancel', up);
}
function zvKey(w, e) {
  if (e.altKey || e.metaKey || e.ctrlKey) return;
  if (e.key === 'Escape') zvClose(w);
  else if (e.key === 'ArrowLeft' && w.set.length > 1) zvShow(w, w.at - 1);
  else if (e.key === 'ArrowRight' && w.set.length > 1) zvShow(w, w.at + 1);
  else if (e.key === 'z' || e.key === '+' || e.key === '-') zvZoom(w, !w.zoomed);
  else return;
  e.preventDefault();
}
/* a new window from the template in index.html, with its own controls */
function zvMake(kind, key, set, from) {
  const node = $('#zv-tpl').content.firstElementChild.cloneNode(true);
  const q = (s) => node.querySelector(s);
  const w = {
    el: node, bar: q('.zv-bar'), cap: q('.zv-cap'), stage: q('.zv-stage'), img: q('.zv-img'), tags: q('.zv-tags'),
    zoomBtn: q('.zv-zoom'), zoomT: q('.zv-zoom .zv-t'), load: q('.zv-load'),
    kind, key, set, at: 0, at0: 0, from, zoomed: false, token: 0, box: null, auto: false, glide: 0, chip: null, ghost: null, morph: null, pan: null, shut: false,
  };
  node.setAttribute('aria-label', tr('zv.label'));
  textsIn(node);
  node.classList.toggle('multi', set.length > 1);
  q('.zv-prev').hidden = q('.zv-next').hidden = set.length < 2;
  node.addEventListener('pointerdown', () => zvFront(w), true);   // whatever is pressed, its window comes to the front
  node.addEventListener('focusin', () => zvFront(w));
  node.addEventListener('keydown', (e) => zvKey(w, e));
  node.addEventListener('wheel', (e) => {   // the page behind does not scroll; a picture bigger than its window does
    const s = w.stage;
    if (!e.ctrlKey && !(s.contains(e.target) && (s.scrollHeight > s.clientHeight + 1 || s.scrollWidth > s.clientWidth + 1))) e.preventDefault();
  }, { passive: false });
  w.bar.addEventListener('pointerdown', (e) => { if (!e.target.closest('button')) zvGrab(w, e, ''); });
  node.querySelectorAll('.zv-rs').forEach((h) => h.addEventListener('pointerdown', (e) => zvGrab(w, e, h.dataset.d)));
  w.zoomBtn.addEventListener('click', () => zvZoom(w, !w.zoomed));
  q('.zv-min').addEventListener('click', () => zvMin(w));
  q('.zv-close').addEventListener('click', () => zvClose(w));
  q('.zv-prev').addEventListener('click', () => zvShow(w, w.at - 1));
  q('.zv-next').addEventListener('click', () => zvShow(w, w.at + 1));
  /* a click toggles zoom at that point; a mouse drag pans instead */
  const st = w.stage;
  st.addEventListener('pointerdown', (e) => {
    if (!w.zoomed || e.pointerType !== 'mouse' || e.button !== 0) return;
    w.pan = { x: e.clientX, y: e.clientY, l: st.scrollLeft, t: st.scrollTop, moved: false };
    st.setPointerCapture(e.pointerId);
  });
  st.addEventListener('pointermove', (e) => {
    const p = w.pan;
    if (!p) return;
    const dx = e.clientX - p.x, dy = e.clientY - p.y;
    if (Math.abs(dx) + Math.abs(dy) > 4) { p.moved = true; st.classList.add('drag'); }
    st.scrollLeft = p.l - dx;
    st.scrollTop = p.t - dy;
  });
  const endPan = () => { st.classList.remove('drag'); setTimeout(() => { w.pan = null; }, 0); };
  st.addEventListener('pointerup', endPan);
  st.addEventListener('pointercancel', endPan);
  st.addEventListener('click', (e) => {
    if ((w.pan && w.pan.moved) || e.target.closest('.zv-tags')) return;
    const r = w.img.getBoundingClientRect();
    if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) zvZoom(w, !w.zoomed, e.clientX, e.clientY);
  });
  zwLayer.append(node);
  zvWins.push(w);
  return w;
}
/* open a picture in a new window; one that is open already (in the dock too) comes to the front instead */
function zvOpen(kind, i, from) {
  const key = kind === 'work' || kind === 'proc' ? lastWork : kind === 'book' ? lastBook : '';
  const set = ZV_SETS[kind](key), at = (i + set.length) % set.length;
  const same = zvWins.find((o) => !o.shut && o.kind === kind && o.key === key && o.at === at);
  if (same) {
    same.from = from; same.at0 = at;
    if (same.chip) zvRestore(same);
    else { zvFront(same); same.el.focus({ preventScroll: true }); }
    return;
  }
  const w = zvMake(kind, key, set, from);
  w.at = w.at0 = at;
  const shown = zvShown().filter((o) => o !== w);
  const mate = shown.length === 1 && shown[0].auto && zwLayer.clientWidth >= 1000 ? shown[0] : null;
  if (mate) {   // one window open, where it was put: side by side, it glides to the left half and this one opens in the right
    mate.el.classList.add('glide');
    zvPlace(mate, 'l');
    clearTimeout(mate.glide);
    mate.glide = setTimeout(() => mate.el.classList.remove('glide'), 600);
    zvPlace(w, 'r');
  } else zvPlace(w);
  zvShow(w, at, true);
  zvFront(w);
  w.el.focus({ preventScroll: true });
  zvFly(w, false);
}
function zvClose(w) {
  if (w.shut) return;
  w.shut = true;
  ++w.token;
  const had = w.el.contains(document.activeElement) || (w.chip && w.chip.contains(document.activeElement));
  const done = () => {
    zvGhostOut(w);
    w.el.remove();
    if (w.chip) w.chip.remove();
    zvWins.splice(zvWins.indexOf(w), 1);
    const next = zvShown().pop();
    if (next) zvFront(next);
    if (!had) return;
    if (next) next.el.focus({ preventScroll: true });   // the keyboard goes on in the window now in front, or on the picture this one came from
    else if (w.from && w.from.isConnected && !w.from.closest('[hidden]')) w.from.focus({ preventScroll: true });
  };
  if (CALM || !w.el.animate) { done(); return; }
  if (w.chip) {   // closed from the dock: the chip goes; the window stays hidden, even halfway into the dock
    w.el.classList.add('mini');
    w.chip.style.pointerEvents = 'none';
    w.chip.animate([{ opacity: 0, transform: 'scale(.9)' }], { duration: 200, easing: 'ease-in', fill: 'forwards' }).finished.then(done, done);
    return;
  }
  if (w.morph) w.morph.cancel();
  w.el.classList.add('zw-out');
  setTimeout(done, zvFly(w, true) || 380);
}
/* minimize: the window shrinks into a chip in the dock and waits there, hidden but as it was */
function zvMin(w) {
  if (w.shut || w.chip) return;
  const had = w.el.contains(document.activeElement);
  const chip = $('#zv-chip-tpl').content.firstElementChild.cloneNode(true);
  w.chip = chip;
  chip.querySelector('img').src = w.set[w.at].src;
  zvText(w);
  chip.querySelector('.zv-chip-b').addEventListener('click', () => zvRestore(w));
  chip.querySelector('.zv-chip-x').addEventListener('click', () => zvClose(w));
  zvDock.append(chip);
  zvGhostOut(w);
  w.el.classList.remove('front');
  const next = zvShown().pop();
  if (next) zvFront(next);
  const hide = () => { if (w.chip === chip) w.el.classList.add('mini'); };
  if (w.morph) w.morph.cancel();
  if (CALM || !w.el.animate) hide();
  else {
    const a = w.el.getBoundingClientRect(), b = chip.getBoundingClientRect();
    w.el.classList.add('flying');
    w.morph = w.el.animate([{ transform: 'none', opacity: 1 }, { transform: `translate(${(b.left - a.left).toFixed(1)}px,${(b.top - a.top).toFixed(1)}px) scale(${(b.width / a.width).toFixed(4)},${(b.height / a.height).toFixed(4)})`, opacity: 0 }],
      { duration: 420, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' });
    w.morph.finished.then(hide, () => {});
  }
  if (had) chip.querySelector('.zv-chip-b').focus({ preventScroll: true });
}
/* back from the dock: the window grows out of its chip to where it was, as it was */
function zvRestore(w) {
  const chip = w.chip;
  if (!chip || w.shut) return;
  w.chip = null;
  const b = chip.getBoundingClientRect();
  chip.remove();
  if (w.morph) w.morph.cancel();
  w.el.classList.remove('mini', 'flying');
  zvBox(w, w.box.x, w.box.y, w.box.w, w.box.h);   // the screen may have changed meanwhile
  zvFront(w);
  if (!CALM && w.el.animate && b.width) {
    const a = w.el.getBoundingClientRect();
    w.morph = w.el.animate([{ transform: `translate(${(b.left - a.left).toFixed(1)}px,${(b.top - a.top).toFixed(1)}px) scale(${(b.width / a.width).toFixed(4)},${(b.height / a.height).toFixed(4)})`, opacity: 0 }, { transform: 'none', opacity: 1 }],
      { duration: 460, easing: 'cubic-bezier(.16,1,.3,1)' });
  }
  w.el.focus({ preventScroll: true });
}
/* another language: the windows' sets made again, their words in it (the marked texts change with the page's) */
function zvLang() {
  zvWins.forEach((w) => { w.set = ZV_SETS[w.kind](w.key); zvText(w); zvSize(w); });
}
addEventListener('resize', () => zvWins.forEach((w) => zvBox(w, w.box.x, w.box.y, w.box.w, w.box.h)));

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
