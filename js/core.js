/* Shared helpers: lookups, DOM shortcuts, the page views, cssUrl */
const byId = Object.fromEntries(WORKS.map((w, i) => [w.id, i]));
/* when a work was finished: its year and month (ym), or, for one without (most older works), the month it went up
   on pixiv. The wall, its year headers and a work's previous / next go by it, latest first. */
const madeOn = (w) => (w.ym ? w.ym.replace('.', '-') : w.d.slice(0, 7));
const byMade = (a, b) => madeOn(b).localeCompare(madeOn(a)) || b.d.localeCompare(a.d) || b.id.localeCompare(a.id);
const CAT_LIST = { fan: WORKS.filter((w) => w.cat === 'fan').sort(byMade), original: WORKS.filter((w) => w.cat === 'original').sort(byMade) };   // Fan Art (pixiv fan works) / Original Art
const bySlug = Object.fromEntries(GOODS.map((g, i) => [g.slug, i]));
const byBook = Object.fromEntries(BOOKS.map((b, i) => [b.slug, i]));
const $ = (s) => document.querySelector(s);
const dot = (d) => d.replaceAll('-', '.');
const src = (id, n) => `img/${id}${n ? '_p' + n : ''}.webp`;
const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
const VIEWS = { home: $('#v-home'), works: $('#v-works'), work: $('#v-work'), goods: $('#v-goods'), item: $('#v-item'), artbook: $('#v-artbook'), book: $('#v-book'), game: $('#v-game'), event: $('#v-event'), about: $('#v-about'), contact: $('#v-contact') };

/* a url() for a CSS custom property, made absolute so it points at the same file whichever stylesheet uses it */
const cssUrl = (path) => `url("${new URL(path, location.href).href}")`;
