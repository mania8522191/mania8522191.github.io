/* Events: the conventions I take part in (EVENTS in js/data.js); the next one is also on the home page */
/* ---------- the events page: the ones to come, nearest first, then the past ones, latest first. An event counts
   as coming until its last day is over, so it moves across by itself. ---------- */
const evToday = () => { const t = new Date(); return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`; };
const evNext = () => EVENTS.filter((e) => e.to >= evToday()).sort((a, b) => a.from.localeCompare(b.from));
const evPast = () => EVENTS.filter((e) => e.to < evToday()).sort((a, b) => b.from.localeCompare(a.from));
const evDays = (e) => (e.from === e.to ? dot(e.from) : `${dot(e.from)} – ${dot(e.from.slice(0, 4) === e.to.slice(0, 4) ? e.to.slice(5) : e.to)}`);   // 2027.02.19 – 02.21
const evPlace = (e) => `${e.venue[LANG]} · ${e.city[LANG]}`;
function evRows(ul, list) {
  ul.replaceChildren(...list.map((e) => {
    const li = el('li', 'ev');
    li.append(el('span', 'ev-n', e.name), el('span', 'ev-d', evDays(e)), el('span', 'ev-p'));
    li._ev = e;
    return li;
  }));
  ul.closest('section').hidden = !list.length;   // nothing to come (or nothing past yet): no heading either
}
evRows($('#ev-next'), evNext());
evRows($('#ev-past'), evPast());
/* the words that change with the language: the places, and the next event under the name on the home page */
function eventText() {
  document.querySelectorAll('.ev').forEach((li) => { li.querySelector('.ev-p').textContent = evPlace(li._ev); });
  const e = evNext()[0], a = $('#hero-ev');
  a.hidden = !e;
  if (!e) return;
  a.querySelector('.hero-ev-n').textContent = e.name;
  a.querySelector('.hero-ev-d').textContent = evDays(e);
  a.querySelector('.hero-ev-p').textContent = evPlace(e);
  a.setAttribute('aria-label', tr('ev.hero', { n: e.name, d: evDays(e), p: evPlace(e) }));
}
eventText();
