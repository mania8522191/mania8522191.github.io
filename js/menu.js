/* Phone menu */
/* ---------- phone menu ---------- */
const menuBtn = $('#menu-btn');
/* Work and About: their pages in a list under the name, in the header and in the phone menu. The name is a button:
   a click or a tap opens or closes its list; in the header a mouse coming over it opens it too, and leaving closes it */
const navGrps = [...document.querySelectorAll('.nav-grp, .m-grp')];
/* the header's band: its row of pages with its middle under the name (kept off the screen's edges), and the way down
   to it from the name, under the name only, so the names beside it stay as they are */
function subPlace(g) {
  const sub = g.lastElementChild, top = g.firstElementChild.getBoundingClientRect(), lbl = g.querySelector('.nav-lbl').getBoundingClientRect();
  const as = sub.querySelectorAll('a'), w = as[as.length - 1].getBoundingClientRect().right - as[0].getBoundingClientRect().left;
  const x = Math.max(16, Math.min(document.documentElement.clientWidth - w - 16, lbl.left + lbl.width / 2 - w / 2));
  sub.style.setProperty('--sub-x', `${Math.round(x)}px`);
  sub.style.setProperty('--br-x', `${Math.round(top.left - 8)}px`);
  sub.style.setProperty('--br-w', `${Math.round(top.width + 16)}px`);
}
function grpSet(g, open) {
  if (open && g.classList.contains('nav-grp')) subPlace(g);
  g.classList.toggle('open', open);
  g.firstElementChild.setAttribute('aria-expanded', String(open));
  if (!open) delete g.dataset.hover;
}
const grpsShut = (keep) => navGrps.forEach((g) => { if (g !== keep && g.classList.contains('nav-grp') && g.classList.contains('open')) grpSet(g, false); });
navGrps.forEach((g) => {
  g.firstElementChild.addEventListener('click', () => {
    if (g.dataset.hover) { delete g.dataset.hover; return; }   // it opened as the mouse came over: the click keeps it open
    grpsShut(g);
    grpSet(g, !g.classList.contains('open'));
  });
  if (!g.classList.contains('nav-grp')) return;
  let shut = 0;
  g.addEventListener('pointerenter', (e) => {
    if (e.pointerType !== 'mouse') return;
    clearTimeout(shut);
    if (!g.classList.contains('open')) { grpsShut(g); grpSet(g, true); g.dataset.hover = '1'; }
  });
  g.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') shut = setTimeout(() => grpSet(g, false), 200); });
  g.addEventListener('focusout', (e) => { if (!g.contains(e.relatedTarget)) grpSet(g, false); });
});
document.addEventListener('click', (e) => {   // a page chosen, or a click anywhere else: the header's list closes
  const t = e.target instanceof Element ? e.target : null;
  navGrps.forEach((g) => { if (g.classList.contains('nav-grp') && g.classList.contains('open') && (!t || !g.contains(t) || t.closest('a'))) grpSet(g, false); });
});
addEventListener('hashchange', () => grpsShut());
let navW = innerWidth;
addEventListener('resize', () => { if (innerWidth !== navW) { navW = innerWidth; grpsShut(); } });   // a new width: the band would be out of place
function setMenu(open) {
  document.documentElement.classList.toggle('menu-open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.querySelector('.menu-lbl').textContent = open ? 'CLOSE' : 'MENU';
  if (open) navGrps.forEach((g) => { if (g.classList.contains('m-grp')) grpSet(g, !!g.querySelector('a[aria-current="page"]')); });   // the shown page's list open
}
menuBtn.addEventListener('click', () => setMenu(!document.documentElement.classList.contains('menu-open')));
$('#m-nav').addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  const g = navGrps.find((x) => x.classList.contains('nav-grp') && x.classList.contains('open'));
  if (g) { grpSet(g, false); g.firstElementChild.focus(); }   // the header's list: closed, back on its name
  setMenu(false);
});
matchMedia('(max-width: 959px)').addEventListener('change', (e) => { if (!e.matches) setMenu(false); });
