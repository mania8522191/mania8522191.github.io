/* Image viewer: windows on the Work and Art Book pages (move, resize, maximize, minimize, side by side); a pop-up on the game page */
/* ---------- picture windows: on the Work and Art Book pages each picture opens in a window of its own over the page,
   below the header, and so does an art book's 3D cover (js/book3d.js). Drag the bar to move a window, an edge or a
   corner to resize it; maximize fills the screen below the header (so does a double-click on the bar); minimize tucks
   it into the dock at the bottom left, and a click there brings it back as it was. Any number stay open side by side
   while you look round that part of the site; going to another part (another link in the header) closes them all.
   On the game page a picture opens in a pop-up over the page instead, one at a time. In both: click to zoom into the
   high-resolution copy, drag to pan. ---------- */
const zwLayer = $('#zw-layer'), zvDock = $('#zv-dock');
const ZV_MIN_W = 240, ZV_MIN_H = 180;   // the smallest a window can be made
const ZV_POP = new Set(['shots', 'chars', 'cards']);   // the game page's pictures: the pop-up
const ZV_SETS = {   // what a window steps through; made again in another language
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
const zvWins = [];   // the open windows (those in the dock too) and the pop-up
let zvTop = 0;       // the stacking order: the window in front has the highest
const zvShown = () => zvWins.filter((o) => !o.chip && !o.shut).sort((a, b) => a.el.style.zIndex - b.el.style.zIndex);   // on screen, back to front
const zvFull = (w) => zvBox(w, 0, 0, zwLayer.clientWidth, zwLayer.clientHeight);   // the whole screen below the header
const zvInWin = (e) => e.target instanceof Element && !!e.target.closest('.zw');   // a key or click in a window

/* ---- a picture's size in its window ---- */
function zvFit(w, it, live) {
  /* from the window's size, not from the picture's area as it is now: that can be short of a scrollbar along the
     bottom for a moment, brought by a picture still at its old size. While the window glides (live), as it is now. */
  const bd = w.pop ? 0 : 2, W = live ? w.el.clientWidth : w.box.w - bd, H = live ? w.el.clientHeight : w.box.h - bd;   // inside the border
  const side = w.set.length > 1 && W > 430 ? 112 : 24;   // the picture's side margins, with room for the arrows (css/lightbox.css)
  const sw = W - (w.stage.offsetWidth - w.stage.clientWidth) - side, sh = H - w.bar.offsetHeight - 32 - (it.tags ? 40 : 0);
  const r = it.h / it.w;
  if (r > 2.9) return Math.max(40, Math.min(sw, it.zw, 1000));   // long process strips: fit the width, scroll down
  return Math.max(40, Math.min(sw, sh / r, it.zw));
}
function zvSize(w, live) {
  const it = w.set[w.at], fit = zvFit(w, it, live);
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
/* the words for the picture a window shows, in the language chosen */
function zvText(w) {
  const it = w.set[w.at];
  w.img.alt = it.alt;
  w.cap.replaceChildren(el('span', '', it.no), document.createTextNode(it.cap));
  w.tags.hidden = !it.tags;
  if (it.tags) {
    w.tags.style.gridTemplateColumns = it.tags.cols;
    w.tags.children[0].textContent = it.tags.l; w.tags.children[1].textContent = it.tags.r;
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

/* ---- windows: their place and size, moving, resizing, maximize, minimize ---- */
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
  if (sized && !w.el.classList.contains('glide')) w.fit();   // gliding, it follows the frame as it goes (zvGlide)
}
/* move or resize a window smoothly; what it shows follows the size as it goes */
function zvGlide(w, fn) {
  if (CALM) { fn(); return; }
  clearTimeout(w.glide);
  w.el.classList.add('glide');
  fn();
  const t0 = performance.now(), step = (now) => {
    if (!w.el.classList.contains('glide')) return;
    w.fit(true);
    if (now - t0 < 520) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
  w.glide = setTimeout(() => { w.el.classList.remove('glide'); w.fit(); }, 540);
}
/* where a window goes, its size from what it shows (w.want; most of a phone's screen): in the middle of the given half
   of the screen (side 'l' or 'r'), or else where it covers the other windows least, nearest the middle */
function zvPlace(w, side) {
  const LW = zwLayer.clientWidth, lh = zwLayer.clientHeight;
  const lw = side ? Math.floor(LW / 2) : LW, ax = side === 'r' ? LW - lw : 0;   // the area it goes in
  if (!w.box) zvBox(w, 0, 0, 600, 400);   // a new one: some size for now, to measure the frame round what it shows
  let [W, H] = LW <= 640 ? [lw - 16, lh * 0.86] : w.want(side ? lw - 24 : Math.max(480, lw * 0.72), lh * 0.88, side);
  W = Math.round(W); H = Math.round(H);
  w.auto = true;   // put here, not by the visitor: the next window opened may move it aside (zvPut)
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
/* a new window goes in. The pop-up fills the screen below the header. A window opened beside one other that is still
   where it was put goes side by side with it: that one glides to the left half, this one opens in the right.
   Otherwise it goes where it covers the others least. */
function zvPut(w) {
  zwLayer.append(w.el);
  zvWins.push(w);
  if (w.pop) { zvFull(w); document.documentElement.classList.add('zv-open'); }
  else {
    const shown = zvShown().filter((o) => o !== w);
    const mate = shown.length === 1 && shown[0].auto && zwLayer.clientWidth >= 1000 ? shown[0] : null;
    if (mate) zvGlide(mate, () => zvPlace(mate, 'l'));
    zvPlace(w, mate ? 'r' : '');
  }
  zvFront(w);
  w.el.focus({ preventScroll: true });
}
function zvFront(w) {
  if (w.el.classList.contains('front')) return;
  zvWins.forEach((o) => o.el.classList.toggle('front', o === w));
  w.el.style.zIndex = ++zvTop;
}
/* a window that is open already comes to the front, or back from the dock */
function zvBack(w) {
  if (w.chip) zvRestore(w);
  else { zvFront(w); w.el.focus({ preventScroll: true }); }
}
/* drag the bar to move a window (d = ''), an edge or a corner to resize it (d = n, e, s, w, ne, se, sw or nw) */
function zvGrab(w, e, d) {
  if (e.button !== 0 || w.shut || w.pop || (d && w.max)) return;
  e.preventDefault();
  if (!w.el.contains(document.activeElement)) w.el.focus({ preventScroll: true });
  w.auto = false;   // the visitor's place for it from now on
  w.el.classList.remove('glide');
  const t = e.currentTarget, sx = e.clientX, sy = e.clientY, L = zwLayer.getBoundingClientRect();
  const lw = zwLayer.clientWidth, lh = zwLayer.clientHeight;
  let { x, y, w: W, h: H } = w.box;
  t.setPointerCapture(e.pointerId);
  w.el.classList.add(d ? 'sizing' : 'moving');
  const move = (ev) => {
    const dx = ev.clientX - sx, dy = ev.clientY - sy;
    if (!d) {
      if (w.max) {   // a full window dragged by its bar goes back to its own size, held at the same place on the bar
        if (Math.abs(dx) + Math.abs(dy) < 6) return;
        const k = (sx - L.left - x) / W;
        zvMaxSet(w, false);
        ({ w: W, h: H } = w.prev);
        x = sx - L.left - k * W; y = 0;
      }
      zvBox(w, x + dx, y + dy, W, H);
      return;
    }
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
/* maximize: the window fills the screen below the header; again, it goes back to where it was */
function zvMaxSet(w, on) {
  w.max = on;
  w.el.classList.toggle('max', on);
  const b = w.el.querySelector('.zv-max'), t = tr(on ? 'zv.unmax' : 'zv.max');
  b.title = t;
  b.setAttribute('aria-label', t);
}
function zvMax(w, on = !w.max) {
  if (w.pop || w.shut || w.chip || on === w.max) return;
  if (on) w.prev = { ...w.box };
  zvMaxSet(w, on);
  w.auto = false;
  zvGlide(w, () => (on ? zvFull(w) : zvBox(w, w.prev.x, w.prev.y, w.prev.w, w.prev.h)));
}
/* minimize: the window shrinks into a chip in the dock and waits there, hidden but as it was */
function zvChipFill(w) {
  if (!w.chip) return;
  const { src, pos, name, full } = w.badge(), im = w.chip.querySelector('img');   // its picture (and the part of it to show), its name
  if (im.getAttribute('src') !== src) im.src = src;
  im.style.objectPosition = pos || '';
  w.chip.querySelector('.zv-chip-t').textContent = name;
  w.chip.querySelector('.zv-chip-b').title = full;
}
function zvMin(w) {
  if (w.shut || w.chip || w.pop) return;
  const had = w.el.contains(document.activeElement);
  const chip = $('#zv-chip-tpl').content.firstElementChild.cloneNode(true);
  w.chip = chip;
  textsIn(chip);
  zvChipFill(w);
  chip.querySelector('.zv-chip-b').addEventListener('click', () => zvRestore(w));
  chip.querySelector('.zv-chip-x').addEventListener('click', () => zvClose(w));
  zvDock.append(chip);
  w.land();
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
  if (w.max) zvFull(w); else zvBox(w, w.box.x, w.box.y, w.box.w, w.box.h);   // the screen may have changed meanwhile
  zvFront(w);
  if (!CALM && w.el.animate && b.width) {
    const a = w.el.getBoundingClientRect();
    w.morph = w.el.animate([{ transform: `translate(${(b.left - a.left).toFixed(1)}px,${(b.top - a.top).toFixed(1)}px) scale(${(b.width / a.width).toFixed(4)},${(b.height / a.height).toFixed(4)})`, opacity: 0 }, { transform: 'none', opacity: 1 }],
      { duration: 460, easing: 'cubic-bezier(.16,1,.3,1)' });
  }
  w.el.focus({ preventScroll: true });
}
function zvClose(w) {
  if (w.shut) return;
  w.shut = true;
  const had = w.el.contains(document.activeElement) || (w.chip && w.chip.contains(document.activeElement));
  const done = () => {
    w.end();
    w.el.remove();
    if (w.chip) w.chip.remove();
    const i = zvWins.indexOf(w);
    if (i < 0) return;   // all closed meanwhile (zvCloseAll)
    zvWins.splice(i, 1);
    if (w.pop) document.documentElement.classList.remove('zv-open');
    const next = zvShown().pop();
    if (next) zvFront(next);
    if (!had) return;
    if (next) next.el.focus({ preventScroll: true });   // the keyboard goes on in the window now in front, or on what this one came from
    else if (w.from && w.from.isConnected && !w.from.closest('[hidden]')) (w.from.closest('button') || w.from).focus({ preventScroll: true });
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
  setTimeout(done, w.leave(true) || 380);
}
/* going to another part of the site: every window closes at once (under the curtain, or as the page changes) */
function zvCloseAll() {
  zvWins.splice(0).forEach((w) => { w.shut = true; w.end(); w.el.remove(); if (w.chip) w.chip.remove(); });
  document.documentElement.classList.remove('zv-open');
}
let zvPart = '';
function zvPage(next) {   // every page change (js/router.js: apply)
  const a = [...document.querySelectorAll('.nav a')].find((x) => x.dataset.v.split(' ').includes(next));
  const part = a ? a.dataset.v : next;   // the part of the site: the header link the page lights up (Work: the wall and the works' pages)
  if (part !== zvPart) zvCloseAll();
  zvPart = part;
}
function zvKey(w, e) {
  if (e.altKey || e.metaKey || e.ctrlKey) return;
  if (e.key === 'Escape') zvClose(w);
  else if (!w.keys(e)) return;
  e.preventDefault();
}
/* another language: what the windows say, in it (the marked texts change with the page's) */
function zvLang() {
  zvWins.forEach((w) => { w.lang(); zvMaxSet(w, w.max); zvChipFill(w); });
}

/* a window's frame from the template in index.html: the bar with its caption and the minimize, maximize and close
   buttons, the edges that resize it. What it shows goes in after the bar; the hooks it sets say how it behaves:
   fit (what it shows takes the window's size), want (the size it would like), keys, leave (flying out on closing),
   land (anything flying lands now), end (stop all on closing), badge (its chip in the dock), lang */
function zvFrame(kind, from, pop) {
  const el = $('#zv-tpl').content.firstElementChild.cloneNode(true);
  const w = { el, bar: el.querySelector('.zv-bar'), cap: el.querySelector('.zv-cap'), kind, from, pop: !!pop,
    box: null, prev: null, max: false, auto: false, glide: 0, chip: null, morph: null, shut: false };
  el.classList.toggle('pop', w.pop);
  if (w.pop) el.setAttribute('aria-modal', 'true');
  zvMaxSet(w, false);
  el.addEventListener('pointerdown', () => zvFront(w), true);   // whatever is pressed, its window comes to the front
  el.addEventListener('focusin', () => zvFront(w));
  el.addEventListener('keydown', (e) => zvKey(w, e));
  el.addEventListener('wheel', (e) => { if (!e.ctrlKey && !(w.scrolls && w.scrolls(e))) e.preventDefault(); }, { passive: false });   // the page behind does not scroll
  w.bar.addEventListener('pointerdown', (e) => { if (!e.target.closest('button')) zvGrab(w, e, ''); });
  w.bar.addEventListener('dblclick', (e) => { if (!e.target.closest('button')) zvMax(w); });
  el.querySelectorAll('.zv-rs').forEach((h) => h.addEventListener('pointerdown', (e) => zvGrab(w, e, h.dataset.d)));
  el.querySelector('.zv-min').addEventListener('click', () => zvMin(w));
  el.querySelector('.zv-max').addEventListener('click', () => zvMax(w));
  el.querySelector('.zv-close').addEventListener('click', () => zvClose(w));
  return w;
}
/* a picture's window (the pop-up for the game page's), with the zoom button, the picture, the arrows */
function zvMake(kind, key, set, from) {
  const w = zvFrame(kind, from, ZV_POP.has(kind)), parts = $('#zv-pic-tpl').content.cloneNode(true), q = (s) => w.el.querySelector(s);
  w.el.querySelector('.zv-min').before(parts.querySelector('.zv-zoom'));
  w.bar.after(...parts.children);
  textsIn(w.el);
  w.el.dataset.i18nAria = 'zv.label';
  w.el.setAttribute('aria-label', tr('zv.label'));
  w.el.classList.toggle('multi', set.length > 1);
  q('.zv-prev').hidden = q('.zv-next').hidden = set.length < 2;
  Object.assign(w, {
    stage: q('.zv-stage'), img: q('.zv-img'), tags: q('.zv-tags'), zoomBtn: q('.zv-zoom'), zoomT: q('.zv-zoom .zv-t'), load: q('.zv-load'),
    key, set, at: 0, at0: 0, zoomed: false, token: 0, ghost: null, pan: null,
    fit: (live) => { if (w.img.getAttribute('src')) zvSize(w, live); },
    want: (maxW, maxH, side) => {
      const it = w.set[w.at], r = it.h / it.w;
      const fw = w.stage.offsetWidth - w.stage.clientWidth + 2 + (w.set.length > 1 ? 112 : 24), fh = w.bar.offsetHeight + 2 + 32 + (it.tags ? 40 : 0);   // scrollbar room, border, margins
      const pw = Math.min(maxW - fw, it.zw, r > 2.9 ? 1000 : (maxH - fh) / r);
      return [Math.min(maxW, Math.max(side ? 0 : 480, pw + fw)), r > 2.9 ? maxH : Math.min(maxH, Math.max(320, pw * r + fh))];
    },
    keys: (e) => {
      if (e.key === 'ArrowLeft' && w.set.length > 1) zvShow(w, w.at - 1);
      else if (e.key === 'ArrowRight' && w.set.length > 1) zvShow(w, w.at + 1);
      else if (e.key === 'z' || e.key === '+' || e.key === '-') zvZoom(w, !w.zoomed);
      else return false;
      return true;
    },
    scrolls: (e) => {   // a picture bigger than its window scrolls
      const s = w.stage;
      return s.contains(e.target) && (s.scrollHeight > s.clientHeight + 1 || s.scrollWidth > s.clientWidth + 1);
    },
    leave: (out) => zvFly(w, out),
    land: () => zvGhostOut(w),
    end: () => { ++w.token; zvGhostOut(w); },
    badge: () => { const it = w.set[w.at]; return { src: it.src, name: it.cap, full: `${it.no} · ${it.cap}` }; },
    lang: () => { w.set = ZV_SETS[w.kind](w.key); zvText(w); zvSize(w); },
  });
  w.zoomBtn.addEventListener('click', () => zvZoom(w, !w.zoomed));
  q('.zv-prev').addEventListener('click', () => zvShow(w, w.at - 1));
  q('.zv-next').addEventListener('click', () => zvShow(w, w.at + 1));
  /* a click toggles zoom at that point (in the pop-up, a click beside the picture closes it); a mouse drag pans */
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
    else if (w.pop && !w.zoomed) zvClose(w);
  });
  return w;
}
/* open a picture: in a new window, or the one it is open in already (in the dock too) comes to the front */
function zvOpen(kind, i, from) {
  const key = kind === 'work' || kind === 'proc' ? lastWork : kind === 'book' ? lastBook : '';
  const set = ZV_SETS[kind](key), at = (i + set.length) % set.length;
  const same = zvWins.find((o) => !o.shut && o.kind === kind && o.key === key && o.at === at);
  if (same) { same.from = from; same.at0 = at; zvBack(same); return; }
  const w = zvMake(kind, key, set, from);
  w.at = w.at0 = at;
  zvPut(w);
  zvShow(w, at, true);
  zvFly(w, false);
}
addEventListener('resize', () => zvWins.forEach((w) => (w.pop || w.max ? zvFull(w) : zvBox(w, w.box.x, w.box.y, w.box.w, w.box.h))));
addEventListener('keydown', (e) => {   // the pop-up takes the keys wherever the focus is (a window, when the focus is in it)
  const p = zvWins.find((o) => o.pop && !o.shut);
  if (p && !zvInWin(e)) zvKey(p, e);
});

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
