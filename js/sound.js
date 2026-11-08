/* Sound: background music, switched on and off by the button beside the languages; a soft click on every button and
   link; and, as the mouse comes over a button or text link, the same click lower and softer. The music starts off (a
   browser only lets a page make sound once the visitor has touched it); the click and the hover sound play whether the
   music is on or off. Volumes are set here: the music file is loud, so it plays well under it. */
const BGM_SRC = 'audio/bgm.mp3', CLICK_SRC = 'audio/click.mp3';
const BGM_VOL = 0.35, CLICK_VOL = 0.7;
const HOVER_VOL = 0.3, HOVER_RATE = 0.72;   // the hover sound: the click played slower, so lower, and softer
const sndBtns = document.querySelectorAll('.snd');
let actx = null, clickBuf = null, bgm = null, bgmGain = null, bgmOn = false, bgmHeld = false, bgmRest = 0;

/* the click is fetched and decoded as the page loads (an offline context may decode before any touch), so that even
   the first click sounds */
fetch(CLICK_SRC).then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error(CLICK_SRC))))
  .then((raw) => {
    const OAC = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    return OAC ? new OAC(1, 1, 44100).decodeAudioData(raw) : null;
  })
  .then((b) => { if (b) clickBuf = sndTrim(b); })
  .catch(() => {});

/* the audio context, made and woken by the visitor's touches and keys (before the first one it may not start) */
function sndWake() {
  if (!actx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    actx = new AC();
  }
  if (actx.state === 'suspended') actx.resume().catch(() => {});
  return actx;
}

/* the click file has 0.14 s of quiet before the sound and nearly two seconds after it: play only the sound itself */
function sndTrim(buf) {
  const d = buf.getChannelData(0), quiet = 0.004;
  let a = 0, b = d.length - 1;
  while (a < b && Math.abs(d[a]) < quiet) a++;
  while (b > a && Math.abs(d[b]) < quiet) b--;
  return { buf, at: Math.max(0, a / buf.sampleRate - 0.004), len: (b - a) / buf.sampleRate + 0.03 };
}

/* the click sound at a volume and a speed (below 1: slower and lower) */
function sndPlay(c, vol, rate) {
  if (!c || !clickBuf) return;
  const s = c.createBufferSource(), g = c.createGain();
  g.gain.value = vol;
  s.buffer = clickBuf.buf;
  s.playbackRate.value = rate;
  s.connect(g).connect(c.destination);
  s.start(0, clickBuf.at, clickBuf.len);
}

/* the music fades in and out; it rests while the tab is hidden or a process video plays */
function bgmPlay(on) {
  const c = sndWake();
  if (!bgm) {
    bgm = new Audio(BGM_SRC);
    bgm.loop = true;
    bgm.addEventListener('error', () => bgmSet(false));
    if (c) {
      bgmGain = c.createGain();
      bgmGain.gain.value = 0;
      c.createMediaElementSource(bgm).connect(bgmGain).connect(c.destination);
    }
  }
  clearTimeout(bgmRest);
  const to = on ? BGM_VOL : 0;
  if (bgmGain) {
    const g = bgmGain.gain, t = c.currentTime;
    g.cancelScheduledValues(t);
    g.setValueAtTime(g.value, t);
    g.linearRampToValueAtTime(to, t + (on ? 1.5 : 0.6));
  } else bgm.volume = to;
  if (on) bgm.play().catch(() => {});
  else bgmRest = setTimeout(() => bgm.pause(), 700);
}
function bgmSet(on) {
  bgmOn = on;
  sndBtns.forEach((b) => b.setAttribute('aria-pressed', String(on)));
  if (on || bgm) bgmPlay(on && !bgmHeld && !document.hidden);
}

/* the buttons' tooltip, again after a language change (their spoken name comes from data-i18n-aria) */
function sndText() {
  sndBtns.forEach((b) => { b.title = tr('snd.label'); });
}
sndText();

sndBtns.forEach((b) => b.addEventListener('click', () => bgmSet(!bgmOn)));
const SND_ON = 'a[href], button, [role="button"]';   // what sounds when clicked, or (not a picture) hovered

/* the mouse coming over a button or a text link: once per element, not for links made of a picture (the covers on
   the wall), at most every 60 ms. It sounds only after the visitor's first click or key press: before that the
   browser keeps the page silent, and the page does not ask. */
let hoverOn = null, hoverAt = 0;
document.addEventListener('pointerover', (e) => {
  if (e.pointerType !== 'mouse' || !(e.target instanceof Element)) return;
  const b = e.target.closest(SND_ON);
  if (!b || b === hoverOn) return;
  hoverOn = b;
  if (b.querySelector('img, .b3') || !actx || actx.state !== 'running' || performance.now() - hoverAt < 60) return;
  hoverAt = performance.now();
  sndPlay(actx, HOVER_VOL, HOVER_RATE);
});
document.addEventListener('pointerout', (e) => { if (hoverOn && !hoverOn.contains(e.relatedTarget)) hoverOn = null; });
addEventListener('pointerdown', sndWake, { capture: true, passive: true });
addEventListener('keydown', sndWake, true);
document.addEventListener('click', (e) => {
  if (!(e.target instanceof Element)) return;
  if (e.target.closest(SND_ON)) sndPlay(sndWake(), CLICK_VOL, 1);
  if (window.SELF_HOSTED && e.target.closest('.tl-card')) { bgmHeld = true; if (bgmOn) bgmPlay(false); }   // the video has its own sound
}, true);
addEventListener('hashchange', () => { if (bgmHeld) { bgmHeld = false; if (bgmOn) bgmPlay(!document.hidden); } });
document.addEventListener('visibilitychange', () => { if (bgmOn) bgmPlay(!document.hidden && !bgmHeld); });
