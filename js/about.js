/* About page: the photo and avatar swap */
/* ---------- about: the photo and the plush avatar trade places when the small round one is clicked ---------- */
const aboutMain = $('#about-main'), aboutSwap = $('#about-swap');
const aboutBadge = aboutSwap.querySelector('img'), aboutIc = aboutSwap.querySelector('.about-swap-ic');
const ABOUT_PICS = {
  photo: { big: 'img/me.webp', small: 'img/me-badge.webp', alt: 'about.photoAlt' },
  plush: { big: 'img/about-plush.webp', small: 'img/about-badge.webp', alt: 'about.alt' },
};
let aboutPlush = false;   // false: the photo is the big picture
function paintAbout() {
  const big = ABOUT_PICS[aboutPlush ? 'plush' : 'photo'], small = ABOUT_PICS[aboutPlush ? 'photo' : 'plush'];
  if (aboutMain.getAttribute('src') !== big.big) aboutMain.setAttribute('src', big.big);
  if (aboutBadge.getAttribute('src') !== small.small) aboutBadge.setAttribute('src', small.small);
  aboutMain.alt = tr(big.alt);
  aboutSwap.setAttribute('aria-label', tr(aboutPlush ? 'about.toPhoto' : 'about.toPlush'));
}
let aboutReady = false;
function preloadAbout() {   // fetch the two swapped-in pictures as soon as About is opened
  if (aboutReady) return;
  aboutReady = true;
  [ABOUT_PICS.plush.big, ABOUT_PICS.photo.small].forEach((u) => { const i = new Image(); i.src = u; });
}
aboutSwap.addEventListener('click', () => {
  preloadAbout();
  const flip = () => { aboutPlush = !aboutPlush; paintAbout(); };
  if (!VT) {
    flip();
    if (!CALM) {
      const ease = 'cubic-bezier(.16,1,.3,1)';
      aboutMain.animate([{ opacity: 0, transform: 'scale(1.06)' }, { opacity: 1, transform: 'none' }], { duration: 650, easing: ease });
      aboutBadge.animate([{ opacity: 0, transform: 'scale(.6)' }, { opacity: 1, transform: 'none' }], { duration: 550, easing: ease });
    }
    return;
  }
  const name = () => {
    aboutMain.style.viewTransitionName = aboutPlush ? 'ab-plush' : 'ab-photo';
    aboutBadge.style.viewTransitionName = aboutPlush ? 'ab-photo' : 'ab-plush';
    aboutIc.style.viewTransitionName = 'ab-ic';
  };
  name();
  document.documentElement.classList.add('ab-swap', aboutPlush ? 'ab-to-photo' : 'ab-to-plush');
  const t = document.startViewTransition(async () => {
    flip(); name();
    try { await Promise.race([Promise.all([aboutMain.decode(), aboutBadge.decode()]), sleep(450)]); } catch (_) { /* show it as is */ }
  });
  t.ready.catch(() => {});
  t.finished.catch(() => {}).finally(() => {
    document.documentElement.classList.remove('ab-swap', 'ab-to-plush', 'ab-to-photo');
    [aboutMain, aboutBadge, aboutIc].forEach((e) => { e.style.viewTransitionName = ''; });
  });
});
