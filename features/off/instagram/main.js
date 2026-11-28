(() => {
  $('#home-yt').insertAdjacentHTML('beforebegin', `<section class="sns-pop" id="home-ig" aria-labelledby="home-ig-h" hidden><div class="sns-in"><div class="sns-body">
    <p class="g-k">INSTAGRAM</p>
    <h2 class="tl-h" id="home-ig-h">最新貼文</h2>
    <div class="ig-grid" id="ig-grid"></div></div>
    <a class="home-more" href="https://www.instagram.com/mania8522191/" target="_blank" rel="noopener">在 Instagram 看更多 ↗</a>
  </div></section>`);
  $('#yt-btn').insertAdjacentHTML('beforebegin', `<button class="sns-btn" id="ig-btn" type="button" aria-label="Instagram" aria-controls="home-ig" aria-expanded="false" hidden><svg viewBox="0 0 50 50" aria-hidden="true"><circle class="sns-c" cx="25" cy="25" r="24.5"/><use href="#sns-ig" x="12" y="12" width="26" height="26"/></svg></button>`);
  registerSns($('#ig-btn'));

  const igGrid = $('#ig-grid');
  function updateText() {
    $('#home-ig-h').textContent = L({zh: "最新貼文", en: "Latest posts", ja: "最新の投稿"});
    $('#home-ig .home-more').textContent = L({zh: "在 Instagram 看更多 ↗", en: "More on Instagram ↗", ja: "Instagramでもっと見る ↗"});
    const label = L({zh: "在 Instagram 看這則貼文（{d}）", en: "View this post on Instagram ({d})", ja: "Instagramでこの投稿を見る（{d}）"});
    igGrid.querySelectorAll('.ig-item').forEach((a) => a.setAttribute('aria-label', label.replace('{d}', dot(a.dataset.d))));
  }
  updateText();
  document.addEventListener('portfolio-language', updateText);

  fetch('ig-latest.json', { cache: 'no-cache' })
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .then(({ posts }) => {
      igGrid.replaceChildren(...posts.map((p) => {
        const a = el('a', p.kind === 'image' ? 'ig-item' : `ig-item ig-${p.kind}`), im = el('img');
        a.href = p.url; a.target = '_blank'; a.rel = 'noopener';
        a.dataset.d = p.d;
        im.alt = ''; im.loading = 'lazy'; im.decoding = 'async'; im.src = p.img;
        a.append(im);
        return a;
      }));
      updateText();
      $('#ig-btn').hidden = !posts.length;
      snsFit();
    })
    .catch(() => {});   // no list yet (before the IG_TOKEN secret is set): no button
})();
