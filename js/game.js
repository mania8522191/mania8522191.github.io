/* Game page: character roster, card carousel, screenshots */
/* ---------- game page: character roster, char1–char18; slots without art show char0 ---------- */
const CHAR_ART = new Set([1, 2, 3, 5, 8, 9, 11, 13, 15, 16, 18]);
const CHAR_CARD = new Set([11, 13, 16]);
const PAIR_W = {"11": 1025, "13": 1025, "16": 1025};   // characters whose card is shown on hover and next to the art
const charList = $('#chars');
const artChars = [];
const no2 = (n) => String(n).padStart(2, '0');
for (let n = 1; n <= 18; n++) {
  const has = CHAR_ART.has(n);
  const li = el('li', 'char' + (has ? '' : ' tbd'));
  li.dataset.rv = 'clip';
  li.dataset.d = `${((n - 1) % 6) * 0.06}s`;
  const box = el('span', 'char-img mask');
  const img = el('img');
  img.src = `img/char${has ? n : 0}.webp`;
  img.width = 500; img.height = 1364;
  img.loading = 'lazy'; img.decoding = 'async';
  img.alt = has ? '' : tr('chars.tbd', { n });
  box.appendChild(img);
  if (has && CHAR_CARD.has(n)) {
    const wrap = el('span', 'char-cardwrap');
    for (const cls of ['char-card-bg', 'char-card']) {
      const c = el('img', cls); c.src = `img/cards/char${n}.webp`; c.width = 336; c.height = 960; c.alt = ''; c.loading = 'lazy'; c.decoding = 'async';
      wrap.appendChild(c);
    }
    box.appendChild(wrap);
    li.classList.add('char-has-card');
  }
  let top = box;
  if (has) {
    top = el('button', 'char-btn');
    top.type = 'button';
    top.dataset.n = n;
    top.setAttribute('aria-label', tr(CHAR_CARD.has(n) ? 'chars.viewPair' : 'chars.view', { n }));
    top.appendChild(box);
    artChars.push(n);
  }
  li.append(top, el('span', 'char-no', `No.${no2(n)}`), el('span', 'char-name', `char${n}`));
  charList.appendChild(li);
}
/* ---------- game page: card carousel, grouped: equipment, events, angel·demon, oracle·summon ---------- */
const DECK_GROUPS = [{"g": "equip", "cards": ["equip_01", "equip_02", "equip_09"]}, {"g": "event", "cards": ["event_03", "event_05", "event_06", "event_07", "event_08"]}, {"g": "contract", "cards": ["angel_01", "demon_01"]}, {"g": "oracle", "cards": ["oracle_02", "oracle_07", "oracle_08", "monster_summon_05"]}];   // [{ g, cards: [file in img/cards/, ...] }, ...] in play order
const CARD_NAMES = {"equip_01": "一般裝備1", "equip_02": "一般裝備2", "equip_09": "一般裝備9", "event_03": "興奮劑", "event_05": "備援即送", "event_06": "望遠鏡", "event_07": "魔力補給", "event_08": "能量爆發", "angel_01": "契約：天使", "demon_01": "契約：惡魔", "oracle_02": "神諭卡2", "oracle_07": "神諭卡7", "oracle_08": "神諭卡8", "monster_summon_05": "Ars Goetia No.53: Caim", "char11": "角色11", "char13": "角色13", "char16": "角色16"};   // file -> the name printed on the card (kept as printed in every language)
const DECK = DECK_GROUPS.flatMap((x) => x.cards);
const CAT = (f) => (f.startsWith('monster_summon') ? 'summon' : f.split('_')[0]);
const deckTrack = $('#deck-track');
{
  let i = 0;
  DECK_GROUPS.forEach((grp) => {
    const g = el('li', 'deck-group'); g.dataset.g = grp.g;
    const head = el('p', 'deck-gh');
    head.append(el('span', 'deck-gn'), el('span', 'deck-gc', no2(grp.cards.length)));
    const ol = el('ol', 'deck-cards');
    grp.cards.forEach((f) => {
      const li = el('li');
      const b = el('button', 'deck-card'); b.type = 'button'; b.dataset.i = i++;
      b.style.setProperty('--card', cssUrl(`img/cards/${f}.webp`));   // shapes the sheen to the card
      const im = el('img'); im.src = `img/cards/${f}.webp`; im.width = 336; im.height = 960; im.alt = ''; im.loading = 'lazy'; im.decoding = 'async'; im.draggable = false;
      b.appendChild(im);
      li.append(b, el('span', 'deck-name', CARD_NAMES[f] || ''));
      ol.appendChild(li);
    });
    g.append(head, ol);
    deckTrack.appendChild(g);
  });
}
function deckText() {
  deckTrack.querySelectorAll('.deck-group').forEach((g) => { g.querySelector('.deck-gn').textContent = tr('deck.' + g.dataset.g); });
  deckTrack.querySelectorAll('.deck-card').forEach((b) => {
    const f = DECK[+b.dataset.i], c = tr('cat.' + CAT(f));
    b.setAttribute('aria-label', tr('cards.view', { c, name: CARD_NAMES[f] || c, n: +b.dataset.i + 1, m: DECK.length }));
  });
}
const deckSmooth = () => (CALM ? 'auto' : 'smooth');
const deckPad = () => parseFloat(getComputedStyle(deckTrack).scrollPaddingLeft) || 0;
/* where each card's left edge sits, as a scroll position */
function deckStops() {
  const base = deckTrack.getBoundingClientRect().left - deckTrack.scrollLeft + deckPad();
  return [...deckTrack.querySelectorAll('.deck-cards > li')].map((c) => Math.max(0, Math.round(c.getBoundingClientRect().left - base)));
}
function deckArrows() {
  $('#deck-prev').disabled = deckTrack.scrollLeft < 4;
  $('#deck-next').disabled = deckTrack.scrollLeft > deckTrack.scrollWidth - deckTrack.clientWidth - 4;
}
/* arrows move about one screen: to the first card cut off on the right, or back by the same amount */
function deckGo(dir) {
  const stops = deckStops(), x = deckTrack.scrollLeft, view = deckTrack.clientWidth - 2 * deckPad();
  const card = deckTrack.querySelector('.deck-cards > li').offsetWidth;
  let to;
  if (dir > 0) to = stops.find((s) => s + card > x + view + 2) ?? stops[stops.length - 1];
  else { const back = stops.filter((s) => s >= x - view + card - 2 && s < x - 2); to = back.length ? back[0] : [...stops].reverse().find((s) => s < x - 2) ?? 0; }
  deckTrack.scrollTo({ left: to, behavior: deckSmooth() });
}
$('#deck-prev').addEventListener('click', () => deckGo(-1));
$('#deck-next').addEventListener('click', () => deckGo(1));
deckTrack.addEventListener('scroll', deckArrows, { passive: true });
/* recheck whenever the row changes size, including when the game page first becomes visible */
if (window.ResizeObserver) new ResizeObserver(deckArrows).observe(deckTrack);
else addEventListener('resize', deckArrows);
deckArrows();
/* mouse: drag the row sideways (touch screens scroll natively); a real drag does not open the card */
let deckDrag = null, deckMoved = false;
deckTrack.addEventListener('pointerdown', (e) => {
  if (e.pointerType !== 'mouse' || e.button !== 0) return;
  deckDrag = { x: e.clientX, left: deckTrack.scrollLeft }; deckMoved = false;
});
addEventListener('pointermove', (e) => {
  if (!deckDrag) return;
  const dx = e.clientX - deckDrag.x;
  if (!deckMoved && Math.abs(dx) > 6) {
    deckMoved = true;
    deckTrack.classList.add('drag', 'nosnap');
    deckTrack.querySelectorAll('.deck-card.tilt').forEach((c) => c.classList.remove('tilt'));
  }
  if (deckMoved) deckTrack.scrollLeft = deckDrag.left - dx;
});
addEventListener('pointerup', () => {
  if (!deckDrag) return;
  deckDrag = null;
  if (!deckMoved) return;
  deckTrack.classList.remove('drag');
  const x = deckTrack.scrollLeft, stops = deckStops();
  const to = stops.reduce((a, s) => (Math.abs(s - x) < Math.abs(a - x) ? s : a), stops[0]);   // settle on the nearest card
  deckTrack.scrollTo({ left: to, behavior: deckSmooth() });
  setTimeout(() => deckTrack.classList.remove('nosnap'), CALM ? 0 : 520);
  setTimeout(() => { deckMoved = false; }, 0);   // after this drag's click has been swallowed
});
deckTrack.addEventListener('click', (e) => {
  const b = e.target.closest('.deck-card');
  if (!b) return;
  if (deckMoved) { deckMoved = false; e.preventDefault(); return; }
  zvOpen('cards', +b.dataset.i, b);
});
/* tilt toward the pointer (mouse only; off for reduced motion) */
if (!matchMedia('(prefers-reduced-motion: reduce)').matches && matchMedia('(hover: hover) and (pointer: fine)').matches) {
  deckTrack.addEventListener('pointermove', (e) => {
    if (deckMoved) return;
    const b = e.target.closest('.deck-card');
    if (!b) return;
    const r = b.parentElement.getBoundingClientRect(), h = b.offsetHeight;   // the untilted slot, so the tilt does not feed back
    const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)), y = Math.min(1, Math.max(0, (e.clientY - r.top) / h));
    b.style.setProperty('--rx', `${((0.5 - y) * 16).toFixed(2)}deg`);
    b.style.setProperty('--ry', `${((x - 0.5) * 18).toFixed(2)}deg`);
    b.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
    b.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
    b.classList.add('tilt');
  });
  deckTrack.addEventListener('pointerout', (e) => {
    const b = e.target.closest('.deck-card');
    if (!b || b.contains(e.relatedTarget)) return;
    b.classList.remove('tilt');
    b.style.removeProperty('--rx'); b.style.removeProperty('--ry');
  });
}

/* ---------- game page: in-development screenshots (main view + thumbnails) ---------- */
const SHOTS = ['shot1', 'shot2', 'shot3', 'shot4', 'shot5', 'shot6', 'shot7', 'shot8'];   // captions live in I18N
const shotImg = $('#shot-img'), shotThumbs = $('#shot-thumbs');
let shotAt = 0;
function showShot(i, animate = true) {
  shotAt = (i + SHOTS.length) % SHOTS.length;
  shotImg.src = `img/shot${shotAt + 1}.webp`;
  shotImg.alt = tr(SHOTS[shotAt]);
  $('#shot-no').textContent = `${no2(shotAt + 1)} / ${no2(SHOTS.length)}`;
  $('#shot-cap').textContent = tr(SHOTS[shotAt]);
  shotThumbs.querySelectorAll('button').forEach((b, k) => b.setAttribute('aria-pressed', String(k === shotAt)));
  if (animate) { shotImg.classList.remove('swap'); void shotImg.offsetWidth; shotImg.classList.add('swap'); }
}
SHOTS.forEach((cap, i) => {
  const b = el('button');
  b.type = 'button';
  b.setAttribute('aria-label', tr('shots.thumb', { n: i + 1, t: tr(cap) }));
  const im = el('img');
  im.src = `img/shot${i + 1}-t.webp`; im.width = 400; im.height = 225; im.alt = ''; im.loading = 'lazy';
  b.appendChild(im);
  b.addEventListener('click', () => showShot(i));
  shotThumbs.appendChild(b);
});
showShot(0, false);
