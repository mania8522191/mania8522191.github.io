/* Work page */
/* ---------- single work page ---------- */
function renderWork(i) {
  const w = WORKS[i];
  $('#wk-lab').textContent = w.lab;
  $('#wk-title').textContent = w.t;
  $('#wk-ym').textContent = w.ym;
  $('#wk-ym').hidden = !w.ym;
  $('#wk-link').href = 'https://www.pixiv.net/artworks/' + w.id;
  $('#wk-link-li').hidden = w.cat !== 'fan' || !/^\d+$/.test(w.id);   // the original pieces, and fan pieces not posted there (f-…), are not on pixiv

  const tags = $('#wk-tags');
  tags.replaceChildren(...w.tags.map((t) => { const li = document.createElement('li'); li.textContent = '#' + t; return li; }));

  const box = $('#wk-imgs');
  box.replaceChildren(...w.dims.map(([W, H], n) => {
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
    if (window.SELF_HOSTED) {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const f = el('iframe');
        f.src = `https://www.youtube-nocookie.com/embed/${w.yt.id}?autoplay=1&rel=0`;
        f.title = w.yt.t;
        f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        f.allowFullscreen = true;
        card.replaceWith(f);
      });
    }
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

  /* previous / next stay inside Fan Art or Original Art and follow the wall's order */
  const list = wallSort === 'old' ? [...CAT_LIST[w.cat]].reverse() : CAT_LIST[w.cat], k = list.indexOf(w);
  const p = list[(k - 1 + list.length) % list.length];
  const nx = list[(k + 1) % list.length];
  $('#wk-prev').href = '#w-' + p.id; $('#wk-prev-t').textContent = p.t;
  $('#wk-next').href = '#w-' + nx.id; $('#wk-next-t').textContent = nx.t;
  workText(i);
}
/* the words on a work page; also run on a language switch so the images and the video player stay put */
function workText(i) {
  const w = WORKS[i];
  $('#wk-date').textContent = tr(w.cat === 'original' ? 'wk.made' : 'wk.posted', { d: dot(w.d) });
  $('#wk-pages').textContent = pagesText(w.dims.length);
  $('#wk-imgs').querySelectorAll('img').forEach((img, n) => {
    img.alt = w.dims.length > 1 ? tr('wk.imgAlt', { t: w.t, n: n + 1, m: w.dims.length }) : w.t;
  });
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
  procs.forEach((im, n) => { im.alt = tr('proc.alt', { t: w.t }) + (procs.length > 1 ? ` (${n + 1}/${procs.length})` : ''); });
  const card = $('#wk-tl-box .tl-card');
  if (card) card.setAttribute('aria-label', tr('tl.play', { t: w.yt.t }));
}
