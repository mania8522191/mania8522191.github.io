/* The poster stays visible until all three aligned layers are decoded. */
(() => {
  const id = '137332578';
  if (!(id in byId)) return;
  const home = el('button','lollipop-entry'), work = el('button','lollipop-entry');
  home.id = 'lollipop-home'; home.type = work.type = 'button';
  $('#hero-ev').after(home); $('#wk-goods').after(work);
  const dialog = el('dialog','lollipop-dialog'), frame = el('div','lollipop-scene'), bar = el('div','lollipop-bar');
  const heading = el('h2','','miComet · Lollipop'), close = el('button','','×'), hint = el('p'), original = el('a');
  const poster = el('img'), deck = el('div','lollipop-layers');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let loading = null;
  dialog.id = 'lollipop-dialog'; heading.id = 'lollipop-heading'; hint.id = 'lollipop-help';
  dialog.setAttribute('aria-labelledby',heading.id); frame.setAttribute('aria-describedby',hint.id);
  close.type = 'button'; original.href = '#w-'+id;
  poster.alt = ''; deck.setAttribute('aria-hidden','true'); frame.tabIndex = 0; frame.setAttribute('role','group');
  frame.append(poster,deck); bar.append(heading,close); dialog.append(bar,frame,hint,original); document.body.append(dialog);
  function offset(x,y) {
    if (motion.matches) x = y = 0;
    const d = Math.min(1,frame.clientWidth / 1500), px = (v,n) => Math.round(v * n * d)+'px';
    frame.style.setProperty('--px',px(x,14)); frame.style.setProperty('--py',px(y,10));   // the whole picture
    frame.style.setProperty('--lx',px(x,8)); frame.style.setProperty('--ly',px(y,6));   // the front layers, on top of that
  }
  function reset() { offset(0,0); }
  function point(event) {
    const r = frame.getBoundingClientRect();
    const relative = (v,length) => Math.max(-1, Math.min(1, 2*v/length - 1));
    offset(relative(event.clientX-r.left,r.width),relative(event.clientY-r.top,r.height));
  }
  function layers() {
    if (loading || motion.matches) return;
    const photos = ['back','figures','lights'].map(name => {
      const im = el('img','lollipop-'+name); im.alt=''; im.draggable=false;
      im.src='features/lollipop/art/'+name+'.webp'; return im;
    });
    loading=Promise.all(photos.map(im=>im.decode())).then(()=>deck.replaceChildren(...photos)).catch(()=>{loading=null;});
  }
  function open() {
    poster.src='img/z/137332578.webp'; reset(); dialog.showModal(); layers(); close.focus();
  }
  function update() {
    work.hidden = view !== 'work' || lastWork !== id;
    home.textContent = 'Lollipop · '+L({zh:'互動插畫',en:'Interactive artwork',ja:'動かせるイラスト'});
    work.textContent = L({zh:'打開互動插畫',en:'Open interactive artwork',ja:'動かせるイラストを開く'});
    original.textContent = L({zh:'查看原作 →',en:'View original →',ja:'原画を見る →'});
    const label = L({zh:'關閉',en:'Close',ja:'閉じる'}); close.setAttribute('aria-label',label);
    frame.setAttribute('aria-label',heading.textContent);
    hint.textContent = motion.matches ? L({zh:'已套用減少動態效果設定',en:'Reduced motion is on',ja:'視差効果をオフにしています'}) :
      L({zh:'移動滑鼠、拖曳畫面，或用方向鍵移動畫面。',en:'Move the pointer, drag the artwork or use the arrow keys.',ja:'ポインター・ドラッグ・矢印キーで絵が動きます。'});
  }
  home.onclick = work.onclick = open; close.onclick = original.onclick = () => dialog.close();
  dialog.addEventListener('click',e=>{
    if (e.target!==dialog) return;
    const r=dialog.getBoundingClientRect();
    if(e.clientX<r.left || e.clientX>r.right || e.clientY<r.top || e.clientY>r.bottom) dialog.close();
  });
  frame.addEventListener('pointerdown',e=>{frame.setPointerCapture(e.pointerId);point(e);});
  frame.addEventListener('pointermove',e=>{if(e.pointerType==='mouse' || frame.hasPointerCapture(e.pointerId))point(e);});
  for(const name of ['pointerleave','lostpointercapture']) frame.addEventListener(name,reset);
  dialog.addEventListener('keydown',e=>{
    const movement={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[e.key];
    if(movement) {e.stopPropagation();e.preventDefault();offset(...movement);}
  });
  dialog.addEventListener('keyup',e=>{if(e.key.startsWith('Arrow'))reset();});
  motion.addEventListener('change',()=>{reset();update();if(dialog.open)layers();});
  document.addEventListener('portfolio-view',()=>{if(dialog.open)dialog.close();update();});
  document.addEventListener('portfolio-language',update);
})();
