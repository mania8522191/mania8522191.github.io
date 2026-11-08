/* Switching language: everything on screen is redrawn in place, with a short tween */
/* language switching: static text via data-i18n*, everything drawn by script is refreshed in place */
const subVars = (e) => (e.id === 'works-sub' ? catVars() : e.id === 'ab-sub' ? abVars() : { n: WORKS.length });
function applyStatic() {
  document.querySelectorAll('[data-i18n]').forEach((e) => { e.textContent = tr(e.dataset.i18n, subVars(e)); });
  document.querySelectorAll('[data-i18n-aria]').forEach((e) => e.setAttribute('aria-label', tr(e.dataset.i18nAria)));
  document.querySelectorAll('[data-i18n-alt]').forEach((e) => { e.alt = tr(e.dataset.i18nAlt); });
  document.querySelectorAll('.lang button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === LANG)));
  catText();
  sortText();
  paintAbout();
  deckText();
  yearText();
}
/* section intros reserve the height their longest language needs at this width, so switching language
   does not move everything below them */
const FONT_BY_LANG = { zh: '"Figtree","Noto Sans TC","PingFang TC","Microsoft JhengHei",system-ui,sans-serif', en: '"Figtree","Noto Sans JP","Hiragino Kaku Gothic ProN","Yu Gothic",system-ui,sans-serif' };
FONT_BY_LANG.ja = FONT_BY_LANG.en;
function evenIntros() {
  document.querySelectorAll('.sec-sub[data-i18n], .chars-sub[data-i18n]').forEach((node) => {
    if (!node.offsetWidth) return;   // in a hidden view: measured when that view is shown
    const probe = node.cloneNode(false);
    probe.removeAttribute('data-i18n'); probe.removeAttribute('id'); probe.removeAttribute('data-rv');
    probe.className = node.className.replace(/\brv-\S+/g, '');
    probe.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;left:0;top:0;width:${node.getBoundingClientRect().width}px;min-height:0;margin:0;transform:none;transition:none`;
    node.parentElement.appendChild(probe);
    let most = 0;
    const vars = subVars(node);
    for (const l of Object.keys(I18N)) {
      probe.style.fontFamily = FONT_BY_LANG[l] || '';
      probe.textContent = (I18N[l][node.dataset.i18n] || '').replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
      most = Math.max(most, probe.getBoundingClientRect().height);
    }
    probe.remove();
    node.style.minHeight = `${Math.ceil(most)}px`;
  });
}
let evenTimer = 0;
addEventListener('resize', () => { clearTimeout(evenTimer); evenTimer = setTimeout(evenIntros, 150); });
if (document.fonts && document.fonts.ready) document.fonts.ready.then(evenIntros);

/* language switch tween: the words on screen blur out, the new language waves in from top to bottom;
   pictures stay put. Text off screen just switches. */
const TX_SKIP = '.site-head, .m-nav, .curtain, script, style, svg, [hidden]';
function textOnScreen() {
  const roots = [VIEWS[view], $('.site-foot')].filter(Boolean), picked = [];
  const mark = new Set();
  for (const root of roots) {
    const tw = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, { acceptNode: (n) => (n.matches(TX_SKIP) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT) });
    for (let n = tw.nextNode(); n; n = tw.nextNode()) {
      if (![...n.childNodes].some((c) => c.nodeType === 3 && c.textContent.trim())) continue;
      let inside = false;
      for (let a = n.parentElement; a && a !== root; a = a.parentElement) if (mark.has(a)) { inside = true; break; }
      if (inside) continue;
      const r = n.getBoundingClientRect();
      if (!r.width || r.bottom < 0 || r.top > innerHeight) continue;
      mark.add(n); picked.push(n);
    }
  }
  return picked;
}
const EASE_OUT = 'cubic-bezier(.16,1,.3,1)';
function textOut(n) {
  return [n.animate([{ opacity: 0, filter: 'blur(4px)' }], { duration: 180, easing: 'ease-in', fill: 'forwards' }),
    n.animate([{ transform: 'translateY(-.35em)' }], { duration: 180, easing: 'ease-in', fill: 'forwards', composite: 'add' })];
}
function textIn(n) {
  const top = n.getBoundingClientRect().top;
  const delay = Math.round(Math.min(1, Math.max(0, top / innerHeight)) * 220);   // a wave from the top of the screen down
  n.animate([{ opacity: 0, filter: 'blur(4px)', offset: 0 }], { duration: 560, delay, easing: EASE_OUT, fill: 'backwards' });
  n.animate([{ transform: 'translateY(.45em)', offset: 0 }], { duration: 680, delay, easing: EASE_OUT, fill: 'backwards', composite: 'add' });
}
let langBusy = false, langNext = null;
function setLang(l) {
  if (!I18N[l] || l === LANG) return;
  document.querySelectorAll('.lang button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === l)));
  if (CALM || !Element.prototype.animate) { swapLang(l); return; }
  if (langBusy) { langNext = l; return; }
  langBusy = true;
  const outs = textOnScreen().flatMap(textOut);
  setTimeout(() => {
    swapLang(l);
    outs.forEach((a) => a.cancel());
    textOnScreen().forEach(textIn);
    langBusy = false;
    if (langNext && langNext !== LANG) { const n = langNext; langNext = null; setLang(n); } else langNext = null;
  }, 190);
}
function swapLang(l) {
  if (!I18N[l] || l === LANG) return;
  LANG = l;
  try { localStorage.setItem('lang', l); } catch (e) { /* private mode: still switches for this visit */ }
  document.documentElement.lang = HTML_LANG[l];
  if (/[?&]lang=/.test(location.search)) {
    try { history.replaceState(null, '', location.pathname + location.search.replace(/([?&]lang=)(zh|en|ja)/, '$1' + l) + location.hash); } catch (e) { /* keep the address as is */ }
  }
  zvClose();
  b3vClose();
  applyStatic();
  wall.querySelectorAll('.cover').forEach((a) => fillCover(a, WORKS[byId[a.id.slice(2)]]));
  ggrid.querySelectorAll('.g-card').forEach((a) => fillGoodsCard(a, GOODS[bySlug[a.id.slice(3)]]));
  charList.querySelectorAll('.char').forEach((li, k) => {
    const n = k + 1, btn = li.querySelector('.char-btn');
    if (btn) btn.setAttribute('aria-label', tr(CHAR_CARD.has(n) ? 'chars.viewPair' : 'chars.view', { n }));
    else li.querySelector('img').alt = tr('chars.tbd', { n });
  });
  shotThumbs.querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-label', tr('shots.thumb', { n: i + 1, t: tr(SHOTS[i]) })));
  showShot(shotAt, false);
  if (view === 'work') workText(byId[lastWork]);
  if (view === 'item') renderItem(bySlug[lastItem]);
  abText();
  if (view === 'book') bookText(byBook[lastBook]);
  layoutWall();
}
