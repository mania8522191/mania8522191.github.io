/* Keep the existing full-size pictures and viewer; the comparison is an optional view of an aligned pair. */
(() => {
  const panel = el('details', 'sketch-compare');
  const summary = el('summary'), frame = el('div', 'sketch-frame'), slider = el('input');
  const finished = el('img'), sketch = el('img'), line = el('span', 'sketch-divider');
  const labels = el('div', 'sketch-labels'), left = el('span'), right = el('span');
  let images = null, key = '';
  [finished, sketch].forEach((im) => { im.alt = ''; im.draggable = false; });
  slider.type = 'range'; slider.min = 0; slider.max = 100; slider.value = 50;
  labels.append(left, right); frame.append(finished, sketch, line, slider); panel.append(summary, labels, frame);
  panel.hidden = true;
  $('#wk-imgs').before(panel);
  function draw() { frame.style.setProperty('--sketch-split', slider.value + '%'); }
  slider.addEventListener('input', draw);
  slider.addEventListener('keydown', (e) => { if (['ArrowLeft','ArrowRight'].includes(e.key)) e.stopPropagation(); });
  function load() {
    if (!panel.open || !images) return;
    finished.src = images[0].src; sketch.src = images[1].src;
  }
  panel.addEventListener('toggle', load);
  function show() {
    const w = view === 'work' && WORKS[byId[lastWork]], pair = w && lastPiece >= 0 && w.sk?.[lastPiece];
    panel.hidden = !pair;
    if (!pair) { key = ''; panel.open = false; images = null; return; }
    const id = w.id + '/' + lastPiece;
    if (key !== id) {
      key = id; panel.open = false; slider.value = 50; draw();
      const all = pieceImgs(w, lastPiece);
      images = [all[0], all.find((im) => im.k === 'sketch')];
      const [W,H] = images[0].d;
      frame.style.aspectRatio = W + ' / ' + H;
      frame.style.maxWidth = 'min(100%, calc(72svh * ' + W / H + '))';
    }
    left.textContent = L({zh:'草稿',en:'Sketch',ja:'ラフ'});
    right.textContent = L({zh:'完稿',en:'Final',ja:'完成'});
    summary.textContent = L({zh:'比較草稿與完稿',en:'Compare sketch and final',ja:'ラフと完成を比較'});
    slider.setAttribute('aria-label',summary.textContent);
  }
  document.addEventListener('portfolio-view',show);
  document.addEventListener('portfolio-language',show);
})();
