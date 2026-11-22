/* Tag page */
/* ---------- a tag's page (#t-<tag>, from the tags on a work page): every work with that tag, as covers on the works
   wall's collage, in the wall's order (newest or oldest first). A cover opens its work, morphing as on the wall, and
   Back comes to it again. Made anew for another tag; its words follow the language (tagText) ---------- */
const tagWall = $('#tag-wall');
const TAG_SEED = (WALL_SEED ^ 0x85ebca6b) >>> 0;   // an arrangement of its own, kept while browsing like the wall's
let tagNow = null;   // the tag on the page
const tagWorks = (tag) => WORKS.filter((w) => w.tags.includes(tag));
const tagHref = (tag) => '#t-' + encodeURIComponent(tag);
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
}
function layoutTag() {
  if (VIEWS.tag.hidden || !tagWall.clientWidth) return;
  const order = [...tagWall.querySelectorAll('.cover')];
  collage(tagWall, order, buildUnits(order), TAG_SEED, null);
}
addEventListener('resize', () => requestAnimationFrame(layoutTag));
if (document.fonts) document.fonts.ready.then(layoutTag);
