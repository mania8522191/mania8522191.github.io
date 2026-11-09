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

/* the 3D viewer: each book's cover in a window of its own (js/lightbox.js). Hold and drag to turn the book (it keeps
   spinning a little when flung), hold the left button to move it, wheel or pinch to zoom; double-click or double-tap
   the book to put it back */
if (matchMedia('(hover: none)').matches) $('#b3v-tpl').content.querySelector('.zv-hint').dataset.i18n = 'b3.hintTouch';
const b3vDensity = () => (navigator.userAgentData ? Math.min(2, devicePixelRatio || 1) : 1);   // Chromium draws a big 3D face at no more than 1 px per CSS px
/* move the view: the book shifts across the stage, but never so far that its middle leaves its own outline */
function b3vPanTo(w, x, y) {
  const k = w.z / w.q / 2, mx = w.book.offsetWidth * k, my = w.book.offsetHeight * k;
  w.px = Math.max(-mx, Math.min(mx, x));
  w.py = Math.max(-my, Math.min(my, y));
  w.zoomEl.style.setProperty('--px', `${w.px.toFixed(1)}px`);
  w.zoomEl.style.setProperty('--py', `${w.py.toFixed(1)}px`);
}
function b3vView(w, z, x, y, now) {
  w.z = Math.min(2.4, Math.max(0.6, z));
  w.zoomEl.style.setProperty('--z', w.z.toFixed(3));
  b3vPanTo(w, x, y);
  clearTimeout(w.settle);
  if (now) b3vSharpen(w);
  else w.settle = setTimeout(() => { if (!w.pinch) b3vSharpen(w); }, 450);   // once the zoom has eased in
}
function b3vZoomTo(w, z, now, ax = 0, ay = 0) {   // ax, ay: the point, from the stage's centre, that stays where it is
  const k = Math.min(2.4, Math.max(0.6, z)) / w.z;
  b3vView(w, z, ax - (ax - w.px) * k, ay - (ay - w.py) * k, now);
}
/* lay the book out at the size it is shown, so it is drawn sharp; the zoom layer's scale changes with it, without easing */
function b3vSharpen(w) {
  clearTimeout(w.settle);
  const q = w.z * b3vDensity();
  if (Math.abs(q - w.q) < 0.005) return;
  w.q = q;
  w.zoomEl.classList.add('settle');
  w.zoomEl.style.setProperty('--q', q.toFixed(3));
  void w.zoomEl.offsetWidth;
  w.zoomEl.classList.remove('settle');
}
/* opening, the book rises from where it sat on the page into its window; closing, it flies back, turning back to how
   it sits there, as the window fades (.lift lets it out of the window on the way). With the page's book not on the
   screen, it grows in or fades out where it is. Returns how long it takes (ms). */
function b3vFly(w, out) {
  if (CALM || !w.fly.animate) return 0;
  w.fly.getAnimations().forEach((x) => x.cancel());
  const a = zvRectOf(w.from), c = w.book.getBoundingClientRect();
  if (!a || !c.width) {
    const away = { opacity: 0, transform: 'scale(.92)' }, here = { opacity: 1, transform: 'none' };
    w.fly.animate(out ? [here, away] : [away, here], { duration: out ? 380 : 520, easing: out ? 'cubic-bezier(.4,0,.2,1)' : EASE_OUT, fill: out ? 'forwards' : 'none' });
    return out ? 380 : 520;
  }
  w.el.classList.add('lift');
  if (!out) {
    w.fly.animate([
      { transform: `translate(${(a.left + a.width / 2 - c.left - c.width / 2).toFixed(1)}px,${(a.top + a.height / 2 - c.top - c.height / 2).toFixed(1)}px) scale(${(a.width / c.width).toFixed(4)})` },
      { transform: 'none' },
    ], { duration: 720, easing: EASE_OUT }).finished.then(() => w.el.classList.remove('lift'), () => {});
    return 720;
  }
  /* the fly layer scales about its centre, so aim the book's centre, wherever the visitor moved it, at its place */
  const f = w.fly.getBoundingClientRect(), k = a.width / c.width, fx = f.left + f.width / 2, fy = f.top + f.height / 2;
  const tx = a.left + a.width / 2 - fx - k * (c.left + c.width / 2 - fx), ty = a.top + a.height / 2 - fy - k * (c.top + c.height / 2 - fy);
  w.fly.animate([{ transform: 'none' }, { transform: `translate(${tx.toFixed(1)}px,${ty.toFixed(1)}px) scale(${k.toFixed(4)})` }],
    { duration: 420, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' });
  if (w.from._pose) b3Tween(w.book, w.from._pose, 420);
  return 420;
}
/* open a book's 3D cover in a window (the book page's cover, clicked); one that is open already comes to the front */
function b3vOpen(b, from) {
  const same = zvWins.find((o) => !o.shut && o.kind === 'b3' && o.b === b);
  if (same) { same.from = from; zvBack(same); return; }
  const w = zvFrame('b3', from), parts = $('#b3v-tpl').content.cloneNode(true), pick = (s) => w.el.querySelector(s);
  w.el.classList.add('b3v');
  w.el.querySelector('.zv-min').before(parts.querySelector('.b3v-reset'));
  w.bar.after(...parts.children);
  textsIn(w.el);
  w.el.dataset.i18nAria = 'b3.label';
  w.el.setAttribute('aria-label', tr('b3.label'));
  const book = b3Make(b, true), name = () => w.cap.replaceChildren(el('span', '', 'COVER'), document.createTextNode(bkName(b)));
  Object.assign(w, {
    b, book, stage: pick('.b3v-stage'), fly: pick('.b3v-fly'), zoomEl: pick('.b3v-zoom'),
    z: 1, q: 1, px: 0, py: 0, settle: 0, ptr: new Map(), drag: null, pinch: null, pan: null, spin: 0, tap: 0,
    fit: () => b3vPanTo(w, w.px, w.py),   // the book takes the stage's size by itself (css/artbook.css); it stays in view
    want: (maxW, maxH, side) => {   // as css/artbook.css sizes the book: at most 60% of the stage's width, 62% of its height
      const arn = b.pages[0][0] / 2 / b.pages[0][1], sh = maxH - w.bar.offsetHeight - 2;
      return [Math.min(maxW, Math.max(side ? 0 : 480, (0.62 * sh * arn) / 0.6 + 2)), maxH];
    },
    keys: (e) => b3vKey(w, e),
    leave: (out) => b3vFly(w, out),
    land: () => { w.fly.getAnimations().forEach((x) => x.finish()); w.el.classList.remove('lift'); },
    end: () => { cancelAnimationFrame(w.spin); cancelAnimationFrame(book._tw); clearTimeout(w.settle); w.ptr.clear(); w.drag = w.pinch = w.pan = null; },
    badge: () => ({ src: b3Src(b, false), pos: b.rtl ? '25% 50%' : '75% 50%', name: bkName(b), full: `COVER · ${bkName(b)}` }),   // the chip shows the front cover
    lang: name,
  });
  name();
  book._src = `img/ab/x/${b.slug}_p0.webp`;   // full size: the viewer zooms in; the page's copy shows until it is ready
  book.style.setProperty('--img', from.style.getPropertyValue('--img'));
  b3Load(book);
  w.zoomEl.replaceChildren(book);
  pick('.b3v-reset').addEventListener('click', () => b3vReset(w));
  b3vWire(w);
  zvPut(w);
  b3vView(w, 1, 0, 0, true);
  b3Pose(book, from._pose.rx, from._pose.ry);
  b3vFly(w, false);
  b3Tween(book, b3At(book, B3_VIEW), 1000);
}
function b3vReset(w) {
  const p = w.book._pose, v = b3At(w.book, B3_VIEW);   // come back the short way round
  b3Pose(w.book, p.rx, v.ry + ((((p.ry - v.ry) % 360) + 540) % 360 - 180));
  b3Tween(w.book, v, 800);
  b3vView(w, 1, 0, 0);
}
function b3Fling(w, vx, vy) {
  vx = Math.max(-2.2, Math.min(2.2, vx));
  vy = Math.max(-1.2, Math.min(1.2, vy));
  let last = performance.now();
  const step = (now) => {
    const dt = Math.min(40, now - last), p = w.book._pose;
    last = now;
    b3Pose(w.book, b3Tilt(p.rx - vy * dt * 0.35), p.ry + vx * dt * 0.45);
    vx *= Math.pow(0.93, dt / 16.7);
    vy *= Math.pow(0.84, dt / 16.7);
    if (Math.abs(vx) + Math.abs(vy) > 0.015) w.spin = requestAnimationFrame(step);
  };
  w.spin = requestAnimationFrame(step);
}
function b3vKey(w, e) {   // the arrows turn the book, + and - zoom, 0 or Home puts it back
  const p = w.book._pose, turn = { ArrowLeft: [0, -30], ArrowRight: [0, 30], ArrowUp: [15, 0], ArrowDown: [-15, 0] }[e.key];
  if (turn) { cancelAnimationFrame(w.spin); b3Tween(w.book, { rx: b3Tilt(p.rx + turn[0]), ry: p.ry + turn[1] }, 450); }
  else if (e.key === '+' || e.key === '=') b3vZoomTo(w, w.z * 1.25);
  else if (e.key === '-') b3vZoomTo(w, w.z / 1.25);
  else if (e.key === '0' || e.key === 'Home') b3vReset(w);
  else return false;
  return true;
}
function b3vUp(w, e) {
  const st = w.stage;
  if (w.pan && e.pointerId === w.pan.id) {
    const pn = w.pan;
    w.pan = null;
    st.classList.remove('pan');
    if (!pn.moved && pn.btn === 0 && e.type !== 'pointercancel') b3vTap(w, e);   // a left click, not a drag
    return;
  }
  if (!w.ptr.delete(e.pointerId)) return;
  if (w.pinch) {
    if (!w.ptr.size) { w.pinch = null; st.classList.remove('pinch'); b3vSharpen(w); }
    return;
  }
  const d = w.drag;
  w.drag = null;
  st.classList.remove('drag');
  if (!d || e.type === 'pointercancel') return;
  if (d.moved) { if (!CALM && e.timeStamp - d.lt < 90) b3Fling(w, d.vx, d.vy); return; }
  if (!d.mouse) b3vTap(w, e);   // a tap; a right click on its own does nothing
}
/* two clicks or taps in a row on the book put it back */
function b3vTap(w, e) {
  const r = w.book.getBoundingClientRect(), pad = 40;
  if (e.clientX < r.left - pad || e.clientX > r.right + pad || e.clientY < r.top - pad || e.clientY > r.bottom + pad) return;
  if (w.tap && e.timeStamp - w.tap < 350) { w.tap = 0; b3vReset(w); } else w.tap = e.timeStamp;
}
/* the stage's pointers: the left button (or the wheel) held moves the view, the right button or one finger turns the
   book, two fingers pinch to zoom; the wheel zooms toward the pointer */
function b3vWire(w) {
  const st = w.stage;
  st.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && (e.button === 0 || e.button === 1)) {
      if (e.button === 1) e.preventDefault();
      try { st.setPointerCapture(e.pointerId); } catch (_) { /* move without capture */ }
      cancelAnimationFrame(w.spin);
      w.pan = { id: e.pointerId, btn: e.button, x: e.clientX, y: e.clientY, px: w.px, py: w.py, moved: false };
      return;
    }
    if (e.pointerType === 'mouse' && e.button !== 2) return;
    w.ptr.set(e.pointerId, [e.clientX, e.clientY]);
    try { st.setPointerCapture(e.pointerId); } catch (_) { /* keep turning without capture */ }
    cancelAnimationFrame(w.spin);
    cancelAnimationFrame(w.book._tw);
    if (w.ptr.size === 2) {   // a second finger: pinch to zoom
      const [[x1, y1], [x2, y2]] = w.ptr.values();
      const r = st.getBoundingClientRect();
      w.pinch = { d: Math.hypot(x2 - x1, y2 - y1) || 1, z: w.z, cx: (x1 + x2) / 2 - r.left - r.width / 2, cy: (y1 + y2) / 2 - r.top - r.height / 2, px: w.px, py: w.py };
      w.drag = null;
      st.classList.add('pinch');
    } else if (w.ptr.size === 1) {
      const p = w.book._pose;
      w.drag = { x: e.clientX, y: e.clientY, rx: p.rx, ry: p.ry, moved: false, lx: e.clientX, ly: e.clientY, lt: e.timeStamp, vx: 0, vy: 0, mouse: e.pointerType === 'mouse' };
    }
  });
  st.addEventListener('pointermove', (e) => {
    const pn = w.pan;
    if (pn && e.pointerId === pn.id) {
      const dx = e.clientX - pn.x, dy = e.clientY - pn.y;
      if (!pn.moved) {
        if (Math.abs(dx) + Math.abs(dy) < 5) return;   // still a click
        pn.moved = true;
        st.classList.add('pan');
      }
      b3vPanTo(w, pn.px + dx, pn.py + dy);
      return;
    }
    if (!w.ptr.has(e.pointerId)) return;
    w.ptr.set(e.pointerId, [e.clientX, e.clientY]);
    if (w.pinch) {
      if (w.ptr.size < 2) return;
      const [[x1, y1], [x2, y2]] = w.ptr.values(), r = st.getBoundingClientRect(), p = w.pinch;
      const z = Math.min(2.4, Math.max(0.6, p.z * Math.hypot(x2 - x1, y2 - y1) / p.d)), k = z / p.z;   // the point under the fingers stays under them
      b3vView(w, z, (x1 + x2) / 2 - r.left - r.width / 2 - (p.cx - p.px) * k, (y1 + y2) / 2 - r.top - r.height / 2 - (p.cy - p.py) * k);
      return;
    }
    const d = w.drag;
    if (!d) return;
    const dx = e.clientX - d.x, dy = e.clientY - d.y;
    if (!d.moved) {
      if (Math.abs(dx) + Math.abs(dy) < 5) return;
      d.moved = true;
      st.classList.add('drag');
    }
    const dt = Math.max(8, e.timeStamp - d.lt);
    d.vx = 0.7 * (e.clientX - d.lx) / dt + 0.3 * d.vx;
    d.vy = 0.7 * (e.clientY - d.ly) / dt + 0.3 * d.vy;
    d.lx = e.clientX; d.ly = e.clientY; d.lt = e.timeStamp;
    b3Pose(w.book, b3Tilt(d.rx - dy * 0.35), d.ry + dx * 0.45);
  });
  st.addEventListener('pointerup', (e) => b3vUp(w, e));
  st.addEventListener('pointercancel', (e) => b3vUp(w, e));
  st.addEventListener('wheel', (e) => {
    e.preventDefault();
    const r = st.getBoundingClientRect();
    b3vZoomTo(w, w.z * Math.exp(-e.deltaY * (e.deltaMode ? 0.05 : 0.0015)), false, e.clientX - r.left - r.width / 2, e.clientY - r.top - r.height / 2);
  }, { passive: false });
  st.addEventListener('mousedown', (e) => { if (e.button === 1) e.preventDefault(); });   // no autoscroll when the wheel is held
  st.addEventListener('auxclick', (e) => { if (e.button === 1) e.preventDefault(); });
  st.addEventListener('contextmenu', (e) => e.preventDefault());   // the right button turns the book
}
