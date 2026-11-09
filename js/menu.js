/* Phone menu */
/* ---------- phone menu ---------- */
const menuBtn = $('#menu-btn');
function setMenu(open) {
  if (open) b3vClose();   // the 3D viewer would cover the menu's links; picture windows wait hidden behind it (css/lightbox.css)
  document.documentElement.classList.toggle('menu-open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.querySelector('.menu-lbl').textContent = open ? 'CLOSE' : 'MENU';
}
menuBtn.addEventListener('click', () => setMenu(!document.documentElement.classList.contains('menu-open')));
$('#m-nav').addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
matchMedia('(min-width: 901px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });
