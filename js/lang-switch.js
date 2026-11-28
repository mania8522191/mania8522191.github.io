const subVars = (e) => (e.id === 'works-sub' ? catVars() : e.id === 'ab-sub' ? abVars() : e.id === 'tag-sub' ? tagVars() : { n: WORKS.length });
/* a link with a logo in front (the footer's .sns) keeps the logo: only the text after it changes, so the link
   stays one piece of text and the language tween fades the logo with its name */
function setText(e, s) {
  const t = e.lastChild;
  if (e.firstElementChild && t && t.nodeType === 3) t.data = s;
  else e.textContent = s;
}
/* the texts marked in the page, or in a part of it made later (a picture window: js/lightbox.js) */
const textAttributes = '[data-i18n], [data-i18n-aria], [data-i18n-alt], [data-i18n-title]';
function translateElement(e) {
  const { i18n, i18nAria, i18nAlt, i18nTitle } = e.dataset;
  if (i18n) setText(e, tr(i18n, subVars(e)));
  if (i18nAria) e.setAttribute('aria-label', tr(i18nAria));
  if (i18nAlt) e.alt = tr(i18nAlt);
  if (i18nTitle) e.title = tr(i18nTitle);
}
function textsIn(root) {
  if (root.matches(textAttributes)) translateElement(root);
  root.querySelectorAll(textAttributes).forEach(translateElement);
}
function applyStatic() {
  for (const root of document.body.children) {
    if (root.tagName !== 'MAIN') textsIn(root);
  }
  document.querySelectorAll('.lang button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === LANG)));
}

/* Hidden pages catch up the first time they are shown in this language. Detail pages already fill
   their dynamic text in the router when a different work, product, or book is opened. */
const translatedViews = new Set();
function syncViewText(entering = false) {
  if (!view || translatedViews.has(view)) return;
  const root = VIEWS[view];
  textsIn(root);
  switch (view) {
    case 'home': heroText(); heroEventText(); ytText(); xText(); break;
    case 'event': eventText(); break;
    case 'about': paintAbout(); break;
    case 'game': gameText(); break;
    case 'works':
      catText(); sortText(); yearText();
      wall.querySelectorAll('.cover').forEach((a) => fillCover(a, WORKS[byId[a.id.slice(2)]]));
      layoutWall();
      break;
    case 'tag': tagText(); layoutTag(); break;
    case 'artbook': abText(); break;
    case 'goods':
    case 'catalog':
      if (view === 'goods') goodsText();
      else if (!entering) catalogText();
      root.querySelectorAll('.g-card').forEach((a) => fillGoodsCard(a, GOODS[bySlug[a.id.slice(3)]]));
      break;
    case 'work': if (!entering) workText(byId[lastWork], lastPiece); break;
    case 'book': if (!entering) bookText(byBook[lastBook]); break;
    case 'item': if (!entering) itemText(bySlug[lastItem]); break;
  }
  translatedViews.add(view);
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
   pictures stay put, but the logo rings on Contact move with the names beside them. Text off screen just switches. */
const TX_SKIP = '.site-head, .m-nav, .curtain, script, style, svg, [hidden]';
const TX_ALSO = '.sns-badge';
function textOnScreen() {
  const roots = [VIEWS[view], $('.site-foot'), $('#sns-dock')].filter((r) => r && !r.hidden), picked = [];   // and the open corner window
  const mark = new Set();
  for (const root of roots) {
    const tw = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, { acceptNode: (n) => (n.matches(TX_SKIP) && !n.matches(TX_ALSO) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT) });
    for (let n = tw.nextNode(); n; n = tw.nextNode()) {
      if (!n.matches(TX_ALSO) && ![...n.childNodes].some((c) => c.nodeType === 3 && c.textContent.trim())) continue;
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
let langNext = null;
function setLang(l) {
  if (!I18N[l] || (l === LANG && langNext === null)) return;
  document.querySelectorAll('.lang button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === l)));
  if (CALM || !Element.prototype.animate) { swapLang(l); return; }
  if (langNext !== null) { langNext = l; return; }
  langNext = l;
  const outs = textOnScreen().flatMap(textOut);
  setTimeout(() => {
    swapLang(langNext);
    langNext = null;
    outs.forEach((a) => a.cancel());
    textOnScreen().forEach(textIn);
  }, 190);
}
function swapLang(l) {
  if (!I18N[l] || l === LANG) return;
  LANG = l;
  try { localStorage.setItem('lang', l); } catch (e) { /* private mode: still switches for this visit */ }
  document.documentElement.lang = HTML_LANG[l];
  if (/[?&]lang=/.test(location.search)) {
    try { history.replaceState(history.state, '', location.pathname + location.search.replace(/([?&]lang=)(zh|en|ja)/, '$1' + l) + location.hash); } catch (e) { /* keep the address as is */ }
  }
  translatedViews.clear();
  applyStatic();
  syncViewText();
  zvLang();
  sndText();
  document.dispatchEvent(new Event('portfolio-language'));
  backFit();   // the back button keeps to the title's words in the new language
}
