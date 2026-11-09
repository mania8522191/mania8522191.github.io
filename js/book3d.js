/* 3D books: the cover spread folded round a CSS 3D book, its lighting and materials, the 3D viewer */
/* ---------- the cover as a physical book: the spread folds round a CSS 3D block; enlarged, it turns as you drag ---------- */
const B3_REST = { rx: -12, ry: -28 }, B3_HOVER = { rx: -9, ry: -18 }, B3_VIEW = { rx: -12, ry: -34 };   // turned to show the page edges
const B3_FACES = { front: [0, 0, 1], back: [0, 0, -1], fore: [1, 0, 0], head: [0, -1, 0], tail: [0, 1, 0] };
const B3_SP = 7;   // the rounded spine is drawn as this many narrow strips, from the front cover round to the back
const B3_SPN = Array.from({ length: B3_SP }, (_, i) => { const a = -(i + 0.5) * Math.PI / B3_SP; return [Math.sin(a), 0, Math.cos(a)]; });
const B3_EYE = 4.2;   // the camera's distance in lengths of the cover's long side, as in .b3-cam's perspective()
const B3_LAMP = [-1.02, 0.18, 0.84];   // the lamp a laminated cover mirrors: left of the book, close, about level with it
const B3_SPEC = { gloss: [0.55, 24], matte: [0.18, 5] };   // how the round spine catches that lamp: how bright, how tight
const b3Unit = (v) => { const l = Math.hypot(...v) || 1; return v.map((x) => x / l); };
const B3_LIGHT = [0, -0.35, 0.94].map((v, _, a) => v / Math.hypot(...a));   // above and in front of the book
const B3_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.6 12a8.4 8.4 0 0 1 14.5-5.8M20.4 12a8.4 8.4 0 0 1-14.5 5.8"/><path d="M18.4 2.9v3.5h-3.5M5.6 21.1v-3.5h3.5"/></svg>';
const bkName = (b) => `${b.t} · ${b.ev}`;   // a book's name and its Fancy Frontier, for captions and labels
const b3Src = (b, big) => `img/ab/${big ? 'z/' : ''}${b.slug}_p0.webp`;
const b3At = (box, p) => ({ rx: p.rx, ry: box._rtl ? -p.ry : p.ry });   // a right-bound book turns the other way to show its spine
const b3Tilt = (v) => Math.min(70, Math.max(-70, v));
const b3StageRatio = (b) => ((b.pages[0][0] / 2 / b.pages[0][1]) * 0.62 + 0.7).toFixed(3);   // wide books get a wide stage
function b3Make(b, big) {
  const [W, H] = b.pages[0], ar = W / 2 / H, tk = b.tk || 0.012, mat = b.mat || 'gloss', box = el('span', `b3 m-${mat}${b.rtl ? ' rtl' : ''}`);
  box._rtl = !!b.rtl;
  box._mat = mat;
  box._dim = ar >= 1 ? [1, 1 / ar, tk] : [ar, 1, tk];   // the cover's width, height and thickness, in lengths of its long side
  box.style.setProperty('--ar', `${W / 2} / ${H}`);
  box.style.setProperty('--arn', ar.toFixed(4));
  box.style.setProperty('--tk', tk);   // thickness, as a share of the cover's long side
  box.setAttribute('aria-hidden', 'true');
  const cam = el('span', 'b3-cam'), book = el('span', 'b3-book'), step = 180 / B3_SP, arc = 1.5708 / B3_SP;
  for (const f of Object.keys(B3_FACES)) {
    const face = el('span', 'b3-f b3-' + f);
    if (f === 'front' || f === 'back') face.append(el('span', 'b3-tex'));
    if (mat === 'ivory' && (f === 'front' || f === 'back')) face.append(el('span', 'b3-sh'));   // the paper's faint, fibrous sheen
    if (f === 'front' && b.foil) {
      const foil = el('span', 'b3-foil');
      foil.style.setProperty('--foil', cssUrl(`img/ab/${b.slug}_foil.webp`));
      foil.append(el('i', 'b3-rim'));   // the bright edge of the stamping
      face.append(foil);
    }
    book.append(face);
  }
  for (let i = 0; i < B3_SP; i++) {   // strip i turns (i + .5) steps from the front cover and shows that slice of the spread's middle
    const sp = el('span', 'b3-f b3-sp');
    sp.style.cssText = b.rtl
      ? `--a:${((i + 0.5) * step).toFixed(3)}deg;--sx:50cqw;--bx:${(-0.7854 + i * arc).toFixed(4)};--s:var(--s-sp${i});--g:var(--g-sp${i})`
      : `--a:${(-(i + 0.5) * step).toFixed(3)}deg;--sx:-50cqw;--bx:${(0.7854 - (i + 1) * arc).toFixed(4)};--s:var(--s-sp${i});--g:var(--g-sp${i})`;
    sp.append(el('span', 'b3-tex'));
    book.append(sp);
  }
  const fx = el('span', 'b3-fx');   // carries the material's colour filter, so the shadow stays out of it
  cam.append(book);
  fx.append(cam);
  box.append(el('span', 'b3-shadow'), fx);
  box._src = b3Src(b, big);
  const p = b3At(box, B3_REST);
  b3Pose(box, p.rx, p.ry);
  return box;
}
/* the cover goes on once it has loaded; a book on the list waits until it is near the screen */
function b3Load(box) {
  if (!box._ready) {
    const im = new Image();
    im.src = box._src;
    box._ready = im.decode().catch(() => {}).then(() => box.style.setProperty('--img', cssUrl(box._src)));
  }
  return box._ready;
}
const b3io = 'IntersectionObserver' in window
  ? new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { b3io.unobserve(e.target); b3Load(e.target); } }), { rootMargin: '400px 0px' })
  : null;
const b3Lazy = (box) => { if (b3io) b3io.observe(box); else b3Load(box); return box; };
/* turn the book: rotateX tips it toward you, rotateY spins it. Each face is shaded for a soft light above and in front.
   A laminated cover also mirrors a lamp left of the book. Its glare sits where the line from the eye to the lamp's mirror
   image crosses the cover, so it slides across as the book turns; the round spine catches it as a bright line */
function b3Pose(box, rx, ry) {
  box._pose = { rx, ry };
  const m = box._rtl ? -1 : 1;   // a right-bound book is lit as the mirror image of a left-bound one
  const st = box.style, a = m * ry * Math.PI / 180, c = rx * Math.PI / 180, [lx, ly, lz] = B3_LIGHT;
  const ca = Math.cos(a), sa = Math.sin(a), cc = Math.cos(c), sc = Math.sin(c);
  const lit = ([x, y, z]) => {   // a face's direction after the turn, and how much light it catches
    const x1 = x * ca + z * sa, z1 = z * ca - x * sa;
    const y2 = y * cc - z1 * sc, z2 = y * sc + z1 * cc;
    return [x1, y2, z2, Math.max(0, x1 * lx + y2 * ly + z2 * lz)];
  };
  const inBook = ([x, y, z]) => {   // the other way round: a point in the room, in the book's own frame
    const y1 = y * cc + z * sc, z1 = z * cc - y * sc;
    return [x * ca - z1 * sa, y1, x * sa + z1 * ca];
  };
  const [w, h, t] = box._dim, eye = inBook([0, 0, B3_EYE]), lamp = inBook(B3_LAMP);
  st.setProperty('--rx', `${rx.toFixed(2)}deg`);
  st.setProperty('--ry', `${ry.toFixed(2)}deg`);
  for (const [k, n] of Object.entries(B3_FACES)) {
    const [x1, y2, , d] = lit(n);
    st.setProperty(`--s-${k}`, ((k === 'front' || k === 'back' ? 0.42 : 0.6) * (1 - d)).toFixed(3));   // covers stay bright, edges fall into shade
    if (k === 'front') {   // foil: its blues slide faster than the glare
      st.setProperty('--fx', `${(50 - m * x1 * 120 + y2 * 40).toFixed(1)}%`);
      st.setProperty('--fx2', `${(-30 - m * x1 * 160).toFixed(1)}%`);   // the highlight streak crosses the necklace at rest
    }
  }
  const pct = (v) => `${(Math.min(3, Math.max(-2, v)) * 100).toFixed(1)}%`;
  for (const [f, sg] of [['front', 1], ['back', -1]]) {
    const ez = sg * eye[2] - t / 2, lh = sg * lamp[2] - t / 2;   // how far the eye and the lamp stand off this cover
    if (ez <= 0 || lh <= 0) { st.setProperty(`--hi-${f}`, '0'); continue; }   // the cover faces away from one of them
    const q = ez / (ez + lh), x = eye[0] + (lamp[0] - eye[0]) * q, y = eye[1] + (lamp[1] - eye[1]) * q, u = 0.5 + sg * x / w;
    st.setProperty(`--hx-${f}`, pct(box._rtl ? 1 - u : u));
    st.setProperty(`--hy-${f}`, pct(0.5 + y / h));
    st.setProperty(`--hi-${f}`, Math.min(1, ez / Math.hypot(eye[0] - x, eye[1] - y, ez) / 0.3).toFixed(3));   // fades as the cover turns edge-on
    st.setProperty(`--fr-${f}`, Math.pow(1 - ez / Math.hypot(eye[0], eye[1], ez), 4).toFixed(3));   // yet edge-on, a laminate turns to a mirror
  }
  const spec = B3_SPEC[box._mat];
  B3_SPN.forEach((n, i) => {
    st.setProperty(`--s-sp${i}`, (0.42 * (1 - lit(n)[3])).toFixed(3));
    if (!spec) return;
    const p = [n[0] * t / 2 - w / 2, 0, n[2] * t / 2];   // the strip's middle, on the round bound edge
    const e = b3Unit(eye.map((v, j) => v - p[j])), l = b3Unit(lamp.map((v, j) => v - p[j])), hv = b3Unit(e.map((v, j) => v + l[j]));
    const dot = (o) => n[0] * o[0] + n[1] * o[1] + n[2] * o[2];
    st.setProperty(`--g-sp${i}`, dot(e) > 0 && dot(l) > 0 ? (spec[0] * Math.pow(Math.max(0, dot(hv)), spec[1])).toFixed(3) : '0');
  });
  st.setProperty('--sw', (Math.abs(Math.cos(a)) * 0.92 + 0.08).toFixed(3));   // the shadow narrows as the book turns edge-on
  st.setProperty('--so', Math.max(0, 1 - Math.abs(rx) / 110).toFixed(3));
}
function b3Tween(box, to, ms = 650) {
  cancelAnimationFrame(box._tw);
  if (CALM) { b3Pose(box, to.rx, to.ry); return; }
  const from = box._pose, t0 = performance.now();
  const step = (now) => {
    const k = Math.min(1, (now - t0) / ms), e = 1 - Math.pow(1 - k, 3);
    b3Pose(box, from.rx + (to.rx - from.rx) * e, from.ry + (to.ry - from.ry) * e);
    if (k < 1) box._tw = requestAnimationFrame(step);
  };
  box._tw = requestAnimationFrame(step);
}
const b3Warmed = new Set();
const b3Warm = (b) => { if (!b3Warmed.has(b.slug)) { b3Warmed.add(b.slug); new Image().src = b3Src(b, true); } };   // the book page shows the sharp cover
/* on the list, a book turns toward you while the pointer is on it */
function b3Hover(card, box, b) {
  const on = () => { b3Warm(b); b3Tween(box, b3At(box, B3_HOVER), 700); }, off = () => b3Tween(box, b3At(box, B3_REST), 900);
  card.addEventListener('pointerenter', on);
  card.addEventListener('pointerleave', off);
  card.addEventListener('focus', on);
  card.addEventListener('blur', off);
}
/* the book page: the list's copy of the cover shows at once, the sharp one replaces it; the book leans toward the mouse */
function b3Hero(b) {
  const stage = el('button', 'bk-stage'), box = b3Make(b, true), small = b3Src(b, false);
  stage.type = 'button';
  box.style.setProperty('--img', cssUrl(small));
  const pre = new Image();
  pre.src = small;
  const sharp = b3Load(box);
  box._ready = Promise.race([pre.decode().catch(() => {}), sharp]);
  stage.append(box);
  stage.addEventListener('click', () => b3vOpen(b, box));
  stage.addEventListener('pointermove', (e) => {
    if (CALM || e.pointerType !== 'mouse') return;
    const r = stage.getBoundingClientRect(), p = b3At(box, B3_REST);
    b3Tween(box, { rx: p.rx - ((e.clientY - r.top) / r.height - 0.5) * 12, ry: p.ry + ((e.clientX - r.left) / r.width - 0.5) * 22 }, 420);
  });
  stage.addEventListener('pointerleave', () => b3Tween(box, b3At(box, B3_REST), 900));
  const hint = el('p', 'bk-hint');
  hint.innerHTML = B3_ICON;
  hint.append(el('span', '', tr('b3.open')));
  return [stage, hint];
}

/* the 3D viewer: hold and drag to turn the book (it keeps spinning a little when flung), wheel or pinch to zoom,
   double-click or double-tap the book to put it back, click beside it to close */
const b3v = $('#b3v'), b3vStage = $('#b3v-stage'), b3vFly = $('#b3v-fly'), b3vZoomEl = $('#b3v-zoom');
let b3vShut = 0;   // the closing timer
const b3Ptr = new Map();
let b3vBox = null, b3vFrom = null, b3vZ = 1, b3Drag = null, b3Pinch = null, b3Spin = 0, b3Tap = 0;
if (matchMedia('(hover: none)').matches) $('#b3v-hint').dataset.i18n = 'b3.hintTouch';
let b3vQ = 1, b3vSettle = 0, b3vPX = 0, b3vPY = 0, b3Pan = null;
const b3vDensity = () => (navigator.userAgentData ? Math.min(2, devicePixelRatio || 1) : 1);   // Chromium draws a big 3D face at no more than 1 px per CSS px
/* move the view: the book shifts across the stage, but never so far that its middle leaves its own outline */
function b3vPanTo(x, y) {
  const k = b3vZ / b3vQ / 2, mx = b3vBox ? b3vBox.offsetWidth * k : 0, my = b3vBox ? b3vBox.offsetHeight * k : 0;
  b3vPX = Math.max(-mx, Math.min(mx, x));
  b3vPY = Math.max(-my, Math.min(my, y));
  b3vZoomEl.style.setProperty('--px', `${b3vPX.toFixed(1)}px`);
  b3vZoomEl.style.setProperty('--py', `${b3vPY.toFixed(1)}px`);
}
function b3vView(z, x, y, now) {
  b3vZ = Math.min(2.4, Math.max(0.6, z));
  b3vZoomEl.style.setProperty('--z', b3vZ.toFixed(3));
  b3vPanTo(x, y);
  clearTimeout(b3vSettle);
  if (now) b3vSharpen();
  else b3vSettle = setTimeout(() => { if (!b3Pinch) b3vSharpen(); }, 450);   // once the zoom has eased in
}
function b3vZoomTo(z, now, ax = 0, ay = 0) {   // ax, ay: the point, from the stage's centre, that stays where it is
  const k = Math.min(2.4, Math.max(0.6, z)) / b3vZ;
  b3vView(z, ax - (ax - b3vPX) * k, ay - (ay - b3vPY) * k, now);
}
/* lay the book out at the size it is shown, so it is drawn sharp; the zoom layer's scale changes with it, without easing */
function b3vSharpen() {
  clearTimeout(b3vSettle);
  const q = b3vZ * b3vDensity();
  if (Math.abs(q - b3vQ) < 0.005) return;
  b3vQ = q;
  b3vZoomEl.classList.add('settle');
  b3vZoomEl.style.setProperty('--q', q.toFixed(3));
  void b3vZoomEl.offsetWidth;
  b3vZoomEl.classList.remove('settle');
}
function b3vOpen(b, from) {
  clearTimeout(b3vShut);   // opened again while closing
  b3v.classList.remove('zv-out');
  b3vFly.getAnimations().forEach((x) => x.cancel());
  const a = from.getBoundingClientRect();
  b3vFrom = from;
  b3vBox = b3Make(b, true);
  b3vBox._src = `img/ab/x/${b.slug}_p0.webp`;   // full size: the viewer zooms in; the page's copy shows until it is ready
  b3vBox.style.setProperty('--img', from.style.getPropertyValue('--img'));
  b3Load(b3vBox);
  b3vZoomEl.replaceChildren(b3vBox);
  b3vView(1, 0, 0, true);
  $('#b3v-cap').replaceChildren(el('span', '', 'COVER'), document.createTextNode(bkName(b)));
  b3v.hidden = false;
  document.documentElement.classList.add('zv-open');
  b3Pose(b3vBox, from._pose.rx, from._pose.ry);
  if (!CALM && b3vFly.animate) {   // the book rises from where it sat on the page
    const c = b3vBox.getBoundingClientRect();
    b3vFly.animate([
      { transform: `translate(${(a.left + a.width / 2 - c.left - c.width / 2).toFixed(1)}px,${(a.top + a.height / 2 - c.top - c.height / 2).toFixed(1)}px) scale(${(a.width / c.width).toFixed(4)})` },
      { transform: 'none' },
    ], { duration: 720, easing: EASE_OUT });
  }
  b3Tween(b3vBox, b3At(b3vBox, B3_VIEW), 1000);
  $('#b3v-close').focus({ preventScroll: true });
}
/* closing, the book flies back to its place on the page, turning back to how it sits there, as the viewer fades */
function b3vClose() {
  if (b3v.hidden || b3v.classList.contains('zv-out')) return;
  cancelAnimationFrame(b3Spin);
  if (b3vBox) cancelAnimationFrame(b3vBox._tw);
  b3Ptr.clear();
  b3Drag = b3Pinch = b3Pan = null;
  b3vStage.classList.remove('drag', 'pinch', 'pan');
  const done = () => {
    b3v.hidden = true;
    b3v.classList.remove('zv-out');
    if (b3vBox) cancelAnimationFrame(b3vBox._tw);
    b3vFly.getAnimations().forEach((x) => x.cancel());
    document.documentElement.classList.remove('zv-open');
    const s = b3vFrom && b3vFrom.closest('button');
    if (s && !s.closest('[hidden]')) s.focus({ preventScroll: true });
  };
  if (CALM) { done(); return; }
  b3v.classList.add('zv-out');
  const a = b3vFrom && b3vFrom.isConnected && !b3vFrom.closest('[hidden]') ? b3vFrom.getBoundingClientRect() : null;
  if (a && a.width && b3vBox && b3vFly.animate) {
    /* the fly layer scales about its centre, so aim the book's centre, wherever the visitor moved it, at its place */
    const c = b3vBox.getBoundingClientRect(), f = b3vFly.getBoundingClientRect(), k = a.width / c.width;
    const fx = f.left + f.width / 2, fy = f.top + f.height / 2;
    const tx = a.left + a.width / 2 - fx - k * (c.left + c.width / 2 - fx), ty = a.top + a.height / 2 - fy - k * (c.top + c.height / 2 - fy);
    b3vFly.animate([{ transform: 'none' }, { transform: `translate(${tx.toFixed(1)}px,${ty.toFixed(1)}px) scale(${k.toFixed(4)})` }],
      { duration: 420, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' });
    if (b3vFrom._pose) b3Tween(b3vBox, b3vFrom._pose, 420);
  }
  b3vShut = setTimeout(done, 420);
}
function b3vReset() {
  const p = b3vBox._pose, v = b3At(b3vBox, B3_VIEW);   // come back the short way round
  b3Pose(b3vBox, p.rx, v.ry + ((((p.ry - v.ry) % 360) + 540) % 360 - 180));
  b3Tween(b3vBox, v, 800);
  b3vView(1, 0, 0);
}
function b3Fling(vx, vy) {
  vx = Math.max(-2.2, Math.min(2.2, vx));
  vy = Math.max(-1.2, Math.min(1.2, vy));
  let last = performance.now();
  const step = (now) => {
    const dt = Math.min(40, now - last), p = b3vBox._pose;
    last = now;
    b3Pose(b3vBox, b3Tilt(p.rx - vy * dt * 0.35), p.ry + vx * dt * 0.45);
    vx *= Math.pow(0.93, dt / 16.7);
    vy *= Math.pow(0.84, dt / 16.7);
    if (Math.abs(vx) + Math.abs(vy) > 0.015) b3Spin = requestAnimationFrame(step);
  };
  b3Spin = requestAnimationFrame(step);
}
b3vStage.addEventListener('pointerdown', (e) => {
  if (!b3vBox) return;
  if (e.pointerType === 'mouse' && (e.button === 0 || e.button === 1)) {   // the left button (or the wheel) held: move the view
    if (e.button === 1) e.preventDefault();
    try { b3vStage.setPointerCapture(e.pointerId); } catch (_) { /* move without capture */ }
    cancelAnimationFrame(b3Spin);
    b3Pan = { id: e.pointerId, btn: e.button, x: e.clientX, y: e.clientY, px: b3vPX, py: b3vPY, moved: false };
    return;
  }
  if (e.pointerType === 'mouse' && e.button !== 2) return;   // the right button turns the book, as one finger does
  b3Ptr.set(e.pointerId, [e.clientX, e.clientY]);
  try { b3vStage.setPointerCapture(e.pointerId); } catch (_) { /* keep turning without capture */ }
  cancelAnimationFrame(b3Spin);
  cancelAnimationFrame(b3vBox._tw);
  if (b3Ptr.size === 2) {   // a second finger: pinch to zoom
    const [[x1, y1], [x2, y2]] = b3Ptr.values();
    const r = b3vStage.getBoundingClientRect();
    b3Pinch = { d: Math.hypot(x2 - x1, y2 - y1) || 1, z: b3vZ, cx: (x1 + x2) / 2 - r.left - r.width / 2, cy: (y1 + y2) / 2 - r.top - r.height / 2, px: b3vPX, py: b3vPY };
    b3Drag = null;
    b3vStage.classList.add('pinch');
  } else if (b3Ptr.size === 1) {
    const p = b3vBox._pose;
    b3Drag = { x: e.clientX, y: e.clientY, rx: p.rx, ry: p.ry, moved: false, lx: e.clientX, ly: e.clientY, lt: e.timeStamp, vx: 0, vy: 0, mouse: e.pointerType === 'mouse' };
  }
});
b3vStage.addEventListener('pointermove', (e) => {
  if (b3Pan && e.pointerId === b3Pan.id) {
    const dx = e.clientX - b3Pan.x, dy = e.clientY - b3Pan.y;
    if (!b3Pan.moved) {
      if (Math.abs(dx) + Math.abs(dy) < 5) return;   // still a click
      b3Pan.moved = true;
      b3vStage.classList.add('pan');
    }
    b3vPanTo(b3Pan.px + dx, b3Pan.py + dy);
    return;
  }
  if (!b3Ptr.has(e.pointerId)) return;
  b3Ptr.set(e.pointerId, [e.clientX, e.clientY]);
  if (b3Pinch) {
    if (b3Ptr.size < 2) return;
    const [[x1, y1], [x2, y2]] = b3Ptr.values(), r = b3vStage.getBoundingClientRect(), p = b3Pinch;
    const z = Math.min(2.4, Math.max(0.6, p.z * Math.hypot(x2 - x1, y2 - y1) / p.d)), k = z / p.z;   // the point under the fingers stays under them
    b3vView(z, (x1 + x2) / 2 - r.left - r.width / 2 - (p.cx - p.px) * k, (y1 + y2) / 2 - r.top - r.height / 2 - (p.cy - p.py) * k);
    return;
  }
  const d = b3Drag;
  if (!d) return;
  const dx = e.clientX - d.x, dy = e.clientY - d.y;
  if (!d.moved) {
    if (Math.abs(dx) + Math.abs(dy) < 5) return;
    d.moved = true;
    b3vStage.classList.add('drag');
  }
  const dt = Math.max(8, e.timeStamp - d.lt);
  d.vx = 0.7 * (e.clientX - d.lx) / dt + 0.3 * d.vx;
  d.vy = 0.7 * (e.clientY - d.ly) / dt + 0.3 * d.vy;
  d.lx = e.clientX; d.ly = e.clientY; d.lt = e.timeStamp;
  b3Pose(b3vBox, b3Tilt(d.rx - dy * 0.35), d.ry + dx * 0.45);
});
function b3vUp(e) {
  if (b3Pan && e.pointerId === b3Pan.id) {
    const pn = b3Pan;
    b3Pan = null;
    b3vStage.classList.remove('pan');
    if (!pn.moved && pn.btn === 0 && e.type !== 'pointercancel') b3vTap(e);   // a left click, not a drag
    return;
  }
  if (!b3Ptr.delete(e.pointerId)) return;
  if (b3Pinch) {
    if (!b3Ptr.size) { b3Pinch = null; b3vStage.classList.remove('pinch'); b3vSharpen(); }
    return;
  }
  const d = b3Drag;
  b3Drag = null;
  b3vStage.classList.remove('drag');
  if (!d || e.type === 'pointercancel') return;
  if (d.moved) { if (!CALM && e.timeStamp - d.lt < 90) b3Fling(d.vx, d.vy); return; }
  if (!d.mouse) b3vTap(e);   // a tap; a right click on its own does nothing
}
/* a click or tap beside the book closes the viewer; two in a row on it put it back */
function b3vTap(e) {
  const r = b3vBox.getBoundingClientRect(), pad = 40;
  if (e.clientX < r.left - pad || e.clientX > r.right + pad || e.clientY < r.top - pad || e.clientY > r.bottom + pad) { b3vClose(); return; }
  if (b3Tap && e.timeStamp - b3Tap < 350) { b3Tap = 0; b3vReset(); } else b3Tap = e.timeStamp;
}
b3vStage.addEventListener('pointerup', b3vUp);
b3vStage.addEventListener('pointercancel', b3vUp);
b3vStage.addEventListener('wheel', (e) => {   // zooms toward the pointer
  e.preventDefault();
  const r = b3vStage.getBoundingClientRect();
  b3vZoomTo(b3vZ * Math.exp(-e.deltaY * (e.deltaMode ? 0.05 : 0.0015)), false, e.clientX - r.left - r.width / 2, e.clientY - r.top - r.height / 2);
}, { passive: false });
b3vStage.addEventListener('mousedown', (e) => { if (e.button === 1) e.preventDefault(); });   // no autoscroll when the wheel is held
b3vStage.addEventListener('auxclick', (e) => { if (e.button === 1) e.preventDefault(); });
b3vStage.addEventListener('contextmenu', (e) => e.preventDefault());   // the right button turns the book
$('#b3v-close').addEventListener('click', b3vClose);
$('#b3v-reset').addEventListener('click', b3vReset);
addEventListener('keydown', (e) => {
  if (b3v.hidden || !b3vBox || e.altKey || e.metaKey || e.ctrlKey) return;
  const p = b3vBox._pose, turn = { ArrowLeft: [0, -30], ArrowRight: [0, 30], ArrowUp: [15, 0], ArrowDown: [-15, 0] }[e.key];
  if (e.key === 'Escape') b3vClose();
  else if (turn) { cancelAnimationFrame(b3Spin); b3Tween(b3vBox, { rx: b3Tilt(p.rx + turn[0]), ry: p.ry + turn[1] }, 450); }
  else if (e.key === '+' || e.key === '=') b3vZoomTo(b3vZ * 1.25);
  else if (e.key === '-') b3vZoomTo(b3vZ / 1.25);
  else if (e.key === '0' || e.key === 'Home') b3vReset();
  else return;
  e.preventDefault();
});
addEventListener('hashchange', b3vClose);
