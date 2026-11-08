/* Start-up: language buttons, routing, no saving the artwork, arrow keys */
document.addEventListener('click', (e) => { const b = e.target.closest('.lang button'); if (b) setLang(b.dataset.lang); });
applyStatic();
setTimeout(() => document.documentElement.classList.remove('intro'), 3400);
addEventListener('hashchange', route);
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (a && a.getAttribute('href') === location.hash) { e.preventDefault(); route(); }
});
/* the artwork can't be saved from the right-click (or long-press) menu, or dragged out of the page;
   a picture under an overlay counts too: the titles on the wall, the NSFW labels, the play buttons, the lightbox, the 3D books */
const ART = 'img, .frame, .nsfw-pic, .tl-card, .zv-stage, .b3';
const onArt = (t) => t instanceof Element && !!t.closest(ART);
document.addEventListener('contextmenu', (e) => { if (onArt(e.target)) e.preventDefault(); });
document.addEventListener('dragstart', (e) => {
  const t = e.target;
  if (onArt(t) || (t instanceof Element && t.querySelector('img'))) e.preventDefault();   // a link around a picture
});
addEventListener('keydown', (e) => {
  if (!zv.hidden || !b3v.hidden || (view !== 'work' && view !== 'item' && view !== 'book') || e.altKey || e.metaKey || e.ctrlKey) return;
  const k = view === 'work' ? 'wk' : view === 'book' ? 'bk' : 'it';
  if (e.key === 'ArrowRight') location.hash = $(`#${k}-next`).getAttribute('href');
  if (e.key === 'ArrowLeft') location.hash = $(`#${k}-prev`).getAttribute('href');
});
route();
