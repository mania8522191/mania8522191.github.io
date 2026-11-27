/* FF47's new set A: once its goods are out, the paper bag can be lifted aside (a click or a tap on it, Enter, or the
   button under the picture) or dragged away. Under it lies a souvenir card, which opens the two wallpapers */
(() => {
  const lift=el('button','gift-lift btn'), card=el('button','gift-card'), art=el('span','gift-art'), cap=el('span','gift-cap'), tray=el('div','gift-downloads');
  const desktop=el('a','btn'), phone=el('a','btn');
  let bag=null, revealed=false, showing=false, origin=null;
  lift.id='ff47-gift-lift';card.id='ff47-gift-card';tray.id='ff47-gift-downloads';
  lift.type=card.type='button';card.setAttribute('aria-controls',tray.id);
  art.style.backgroundImage='url('+src('146954644',0)+')';   // the desktop wallpaper's picture, Chatter Chatter
  card.append(art,cap);
  for(const [link,name] of [[desktop,'desktop'],[phone,'phone']]) {
    link.href='features/ff47-gift/art/'+name+'.jpg';link.download='MANIA-FF47-'+name+'.jpg';
  }
  tray.append(desktop,phone);itStage.append(card);itStage.closest('figure').append(lift,tray);
  function display() {
    const active=bag && itGd.classList.contains('cut');
    lift.hidden=!active || revealed;card.hidden=!active || !revealed;tray.hidden=!active || !showing;
    itGd.classList.toggle('gift-on',!card.hidden);   // the card lies under the goods: clicks between them reach it
    card.setAttribute('aria-expanded',String(showing));
  }
  function reset() {
    revealed=false;showing=false;origin=null;bag?.classList.remove('gift-moved');display();
  }
  /* the card where the bag was (r: the bag's box then), a little in from its left edge, in its upper part, inside the
     frame: the bag lifted aside still lies over a corner of it */
  function reveal(nudge,r) {
    if (!bag || revealed || !itGd.classList.contains('cut')) return;
    revealed=true;display();
    const room=itStage.getBoundingClientRect(), w=card.offsetWidth*.6, h=card.offsetHeight*.6;
    const x=Math.max(room.left+w,Math.min(room.right-w,r.left+r.width*.3)), y=Math.max(room.top+h,Math.min(room.bottom-h,r.top+r.height*.3));
    card.style.left=((x-room.left)/room.width*100).toFixed(3)+'%';card.style.top=((y-room.top)/room.height*100).toFixed(3)+'%';
    if (nudge || covered()>.6) bag.classList.add('gift-moved');   // lifted aside; or dragged, but not off the card yet
    card.focus({preventScroll:true});
  }
  /* how much of the card the goods cover: what is on top at points across it */
  function covered() {
    const r=card.getBoundingClientRect();let k=0;
    for(let i=1;i<5;i++)for(let j=1;j<5;j++){const e=document.elementFromPoint(r.left+r.width*i/5,r.top+r.height*j/5);if(e && !card.contains(e))k++;}
    return k/16;
  }
  function liftBag() { if(bag)reveal(true,bag.getBoundingClientRect()); }
  itGoods.addEventListener('pointerdown',e=>{
    origin=null;
    if(e.target===bag && itGd.classList.contains('cut') && e.button===0)origin={x:e.clientX,y:e.clientY,id:e.pointerId,r:bag.getBoundingClientRect()};
  });
  itGoods.addEventListener('pointerup',e=>{   // a click lifts it aside; a drag has moved it already
    if(origin && origin.id===e.pointerId)reveal(Math.hypot(e.clientX-origin.x,e.clientY-origin.y)<8,origin.r);
    origin=null;
  });
  itGoods.addEventListener('pointercancel',()=>{origin=null;});
  itGoods.addEventListener('keydown',e=>{
    if(e.target===bag && (e.key==='Enter' || e.key===' ')){e.preventDefault();e.stopPropagation();liftBag();}
  });
  lift.onclick=liftBag;
  card.onclick=()=>{showing=!showing;display();if(showing)desktop.focus();};
  function setup() {
    const next=view==='item' && lastItem==='set-a' ? itGoods.querySelector('img[src$="goods-set-a-3.webp"]'):null;
    if (bag!==next) {bag=next;reset();}
    const liftText=L({zh:'移開紙袋',en:'Lift the paper bag',ja:'紙袋を動かす'});
    lift.textContent=liftText;
    cap.textContent=L({zh:'FF47 紀念卡',en:'FF47 souvenir card',ja:'FF47 記念カード'});
    desktop.textContent=L({zh:'下載電腦桌布',en:'Desktop wallpaper',ja:'PC用壁紙'})+' · 3840 × 2160';
    phone.textContent=L({zh:'下載手機桌布',en:'Phone wallpaper',ja:'スマホ用壁紙'})+' · 1290 × 2796';
    if(bag)bag.setAttribute('aria-label',liftText);
    sync();
  }
  function sync() {
    const open=itGd.classList.contains('cut');
    if(bag) {bag.tabIndex=open ? 0 : -1;bag.setAttribute('role','button');}
    if (!open)reset();else display();
  }
  new MutationObserver(sync).observe(itGd,{attributes:true,attributeFilter:['class']});
  document.addEventListener('portfolio-view',setup);
  document.addEventListener('portfolio-language',setup);
})();
