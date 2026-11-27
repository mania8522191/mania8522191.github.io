/* Tag page */
/* ---------- a tag's page (#t-<tag>, from the tags on a work page, or a character button on the Fan Art wall): every
   work with that tag, as covers on the works wall's collage, in the wall's order (newest or oldest first), under
   the goods and art books with them. A cover opens its work, morphing as on the wall, and
   Back comes to it again. Made anew for another tag; its words follow the language (tagText) ---------- */
const tagWall = $('#tag-wall');
const TAG_SEED = (WALL_SEED ^ 0x85ebca6b) >>> 0;   // an arrangement of its own, kept while browsing like the wall's
let tagNow = null;   // the tag on the page
const tagWorks = (tag) => WORKS.filter((w) => w.tags.includes(tag));
const tagHref = (tag) => '#t-' + encodeURIComponent(tag);
/* the Fan Art wall's character buttons (CHARACTERS in js/data.js): shortcuts to their tags' pages, the first few in
   the row, the rest behind "more characters"; a name without works is left out */
const charMore = $('#fan-chars-more'), charRest = $('#fan-chars-rest'), charTg = $('#fan-chars-tg');
const charLinks = (names) => names.filter((t) => tagWorks(t).length).map((t) => {
  const a = el('a', '', t);
  a.href = tagHref(t);
  return a;
});
$('#fan-chars-in').append(...charLinks(CHARACTERS.shown));
charRest.append(...charLinks(CHARACTERS.more).map((a, i) => {
  a.style.setProperty('--i', i);   // its turn to rise in (css/works.css)
  return a;
}));
charTg.hidden = !charRest.children.length;
/* "more characters" open or not: css/works.css slides it open; folded again when the Work part starts over */
function charFold(open = false) {
  charMore.classList.toggle('open', open);
  charTg.setAttribute('aria-expanded', String(open));
}
charTg.addEventListener('click', () => charFold(!charMore.classList.contains('open')));
function renderTag(tag) {
  tagNow = tag;
  const works = tagWorks(tag).sort(byMade);
  if (wallSort === 'old') works.reverse();
  tagWall.replaceChildren(...works.map((w, i) => {
    const picks = w.pieces ? coverPieces(w) : [0];   // a collection: three of its pieces, as on the wall
    const a = makeCover('#w-' + w.id, picks.map((n) => [src(w.id, n), w.dims[n][0], w.dims[n][1]]), w.pos, i < 4);
    a.id = 'tc-' + w.id;
    a.dataset.n = picks[picks.length - 1];   // the picture in front: the page morph lands on its piece (js/router.js)
    a.dataset.date = madeOn(w);
    return a;
  }));
  tagText();
}
/* {n} works between {y} (one year, or the first — the last) */
function tagVars() {
  if (tagNow === null) return { n: 0, y: '' };
  const ys = tagWorks(tagNow).map((w) => madeOn(w).slice(0, 4)).sort(), a = ys[0], b = ys[ys.length - 1];
  return { n: ys.length, y: a === b ? a : `${a} — ${b}` };
}
/* the words that change with the language */
function tagText() {
  if (tagNow === null) return;
  $('#tag-h').textContent = '#' + tagNow;
  const sub = $('#tag-sub'), vars = tagVars();
  sub.dataset.i18n = vars.n === 1 ? 'tag.sub1' : 'tag.sub';
  sub.textContent = tr(sub.dataset.i18n, vars);
  tagWall.querySelectorAll('.cover').forEach((a) => fillCover(a, WORKS[byId[a.id.slice(3)]]));
  tagLinks();
}
/* under the count: the goods and art books with its works. A book has them in its "works"; goods have them in
   theirs, or hold a book that has them */
function tagLinks() {
  const ids = new Set(tagWorks(tagNow).map((w) => w.id));
  const books = BOOKS.filter((b) => (b.works || []).some((id) => ids.has(id)));
  const slugs = new Set(books.map((b) => b.slug));
  const goods = GOODS.filter((g) => (g.works || []).some((id) => ids.has(id)) || (g.books || []).some((s) => slugs.has(s)));
  linkLine($('#tag-goods'), tr('tag.goods'), goods.map((g) => [L(g.name), '#g-' + g.slug]));
  linkLine($('#tag-books'), tr('tag.books'), books.map((b) => [b.t, '#ab-' + b.slug]));
  $('#tag-rel').hidden = !goods.length && !books.length;
}
function layoutTag() {
  if (VIEWS.tag.hidden || !tagWall.clientWidth) return;
  const order = [...tagWall.querySelectorAll('.cover')];
  collage(tagWall, order, buildUnits(order), TAG_SEED, null);
}
addEventListener('resize', () => requestAnimationFrame(layoutTag));
if (document.fonts) document.fonts.ready.then(layoutTag);
