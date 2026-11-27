(() => {
  const products = GOODS.filter(g => g.ev === 'FF47');
  const catalog = catalogByEvent.get('FF47');
  if (!catalog || !products.length) return;
  const artOrder = { 'sign-board':[1,2,3,4], 'acrylic-board':[2,1,3], keychain:[2,1,3] };
  const key = 'mania.ff47.wishlist.v1';
  const words = {
    title:['我的場販清單','My booth list','お買い物リスト'], add:['加入清單','Add to list','リストに追加'],
    design:['款式','Design','絵柄'], qty:['數量','Quantity','数量'], empty:['清單裡還沒有商品。','Your list is empty.','リストは空です。'],
    sum:['合計','Total','合計'], subtotal:['原價小計','Subtotal before offer','割引前小計'], save:['存成手機圖片','Save list as image','画像で保存'],
    remove:['移除','Remove','削除'], added:['已加入','Added','追加しました'], note:['款式備註（選填）','Design note (optional)','絵柄のメモ（任意）'],
    ready:['下載 PNG','Download PNG','PNGをダウンロード'], error:['圖片未能產生，請再試一次。','Image could not be created. Please retry.','画像を作成できませんでした。もう一度お試しください。']
  };
  const word = k => words[k][{zh:0,en:1,ja:2}[LANG]];
  const variantNames = g => g.list_title === 'designs' ? L(g.items) : [];
  const identify = row => row.slug + ':' + row.variant;
  const priceText = n => 'NT$' + n.toLocaleString('en-US');
  function readRows() {
    try {
      const data = JSON.parse(localStorage.getItem(key));
      if (!Array.isArray(data)) return [];
      return data.filter(r => {
        const g = products.find(p => p.slug === r?.slug);
        return g && Number.isInteger(r.qty) && r.qty > 0 && r.qty <= 99 && Number.isInteger(r.variant)
          && (variantNames(g).length ? r.variant >= 0 && r.variant < variantNames(g).length : r.variant === -1);
      }).map(r => ({slug:r.slug,variant:r.variant,qty:r.qty,note:String(r.note || '').slice(0,80)}));
    } catch { return []; }
  }
  let rows = readRows(), downloadURL = '', revision = 0;
  const panel = el('details','ff-list'), summary = el('summary'), list = el('ul'), tally = el('strong');
  const offer = el('p'), save = el('button','btn'), download = el('a','btn ghost'), feedback = el('span','ff-feedback');
  const body = el('div','ff-body'), head = el('span'), countBox = el('span','ff-n');
  save.type = 'button'; feedback.setAttribute('role','status'); download.download = 'FF47-mania8522191.png';
  body.append(list,tally,offer,save,download,feedback); summary.append(head); panel.append(summary,body);
  /* motion in the site's ways (--ease-out; none when the visitor asks for less): the body slides open and shut like
     the phone menu's groups, a line grows in or folds away, what changes rises into place, the count jumps */
  const EASE = 'cubic-bezier(.16,1,.3,1)', calm = () => CALM || !body.animate;
  const rise = (node, ms = 450) => { if (!calm()) node.animate([{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'none'}],{duration:ms,easing:EASE}); };
  const bump = node => { if (!calm()) node.animate([{transform:'translateY(-3px) scale(1.3)'},{transform:'none'}],{duration:600,easing:EASE}); };
  function fold(li, open) {   // a line from nothing to its full height, or back; returns the animation
    const s = getComputedStyle(li), pt = parseFloat(s.paddingTop), pb = parseFloat(s.paddingBottom);
    const full = {height:li.clientHeight-pt-pb+'px',paddingTop:pt+'px',paddingBottom:pb+'px',opacity:1};
    const none = {height:'0px',paddingTop:'0px',paddingBottom:'0px',opacity:0};
    li.style.overflow = 'hidden';
    const a = li.animate(open ? [none,full] : [full,none],{duration:open ? 500 : 380,easing:EASE});
    a.finished.then(() => { li.style.overflow = ''; },() => {});
    return a;
  }
  let folding = null;
  summary.addEventListener('click', e => {
    if (calm()) return;   // then it opens and shuts at once, as a <details> does
    e.preventDefault();
    const closing = panel.open && !panel.classList.contains('ff-closing');
    const from = panel.open ? body.getBoundingClientRect().height : 0, fade = folding ? +getComputedStyle(body).opacity : closing ? 1 : 0;
    folding?.cancel();
    panel.open = true; panel.classList.toggle('ff-closing',closing);
    body.style.overflow = 'hidden';
    folding = body.animate([{height:from+'px',opacity:fade},{height:(closing ? 0 : body.scrollHeight)+'px',opacity:closing ? 0 : 1}],{duration:500,easing:EASE});
    folding.onfinish = () => {
      folding = null; body.style.overflow = '';
      if (closing) { panel.open = false; panel.classList.remove('ff-closing'); }
    };
  });
  $('#catalog-goods').before(panel);
  function invalidate() {
    revision++;
    if (downloadURL) URL.revokeObjectURL(downloadURL);
    downloadURL = ''; download.hidden = true; download.removeAttribute('href'); feedback.textContent = '';
  }
  function storeRows() {
    try {
      if(rows.length) localStorage.setItem(key,JSON.stringify(rows));
      else localStorage.removeItem(key);
    } catch {}
    invalidate();
  }
  function product(row) { return products.find(g => g.slug === row.slug); }
  function thumbnail(row) {
    const n = artOrder[row.slug]?.[row.variant];
    return n ? 'img/goods-' + row.slug + '-' + n + '.webp' : goodsImage(product(row))[0];
  }
  function title(row) {
    const g = product(row);
    return [L(g.name),variantNames(g)[row.variant]].filter(Boolean).join(' · ');
  }
  function totals() {
    const count = slug => rows.filter(r => r.slug === slug).reduce((n,r) => n+r.qty,0);
    const value = rows.reduce((n,r) => n + r.qty * product(r).price,0);
    const promo = count('set-b') && count('sign-board');
    const single = promo && count('set-b') === 1 && count('sign-board') === 1;
    return {line:word(promo && !single ? 'subtotal':'sum')+'  '+priceText(single ? value-50 : value),
      note:promo ? L(products.find(g => g.slug === 'set-b').note) : ''};
  }
  /* the site's own buttons: the ring circles (.cat-btn) for − + ×, the gold pill (.btn) to add to the list */
  function button(cls, text, label, action) {
    const node = el('button',cls,text);
    node.type = 'button'; node.setAttribute('aria-label',label); node.addEventListener('click',action); return node;
  }
  let drawn = new Map(), drawnCount = 0, drawnSum = '';   // what the last paint showed: each line's quantity, the count, the total
  /* moved: after the visitor's own change, which then moves into place (not when the page or the language changes) */
  function paint(moved = false) {
    const count = rows.reduce((n,r) => n+r.qty,0), seen = moved && panel.open;
    countBox.textContent = '('+count+')'; head.replaceChildren(word('title')+' ',countBox);
    if (moved && count !== drawnCount) bump(countBox);
    list.replaceChildren();
    if (!count) { const none = el('li','',word('empty')); list.append(none); if (seen) rise(none); }
    for (const row of rows) {
      const li = el('li','ff-line'), photo = el('img'), copy = el('div'), controls = el('div','ff-controls');
      photo.src = thumbnail(row); photo.alt = ''; photo.loading = 'lazy';
      const label = title(row), each = el('small','',priceText(product(row).price)+' × '+row.qty);
      copy.append(el('strong','',label),each);
      const change = delta => {
        const done = () => {
          row.qty = Math.max(0,row.qty+delta);
          if (!row.qty) rows = rows.filter(r => r !== row);
          storeRows(); paint(true);
          (list.querySelector('[data-entry="'+identify(row)+'"] button') || summary).focus({preventScroll:true});
        };
        if (row.qty+delta > 0 || calm()) return done();
        li.inert = true; fold(li,false).finished.then(done,done);   // the last one: the line folds away first
      };
      li.dataset.entry = identify(row);
      const more = button('cat-btn','+',word('qty')+' +1 '+label,() => change(1)); more.disabled = row.qty >= 99;
      controls.append(button('cat-btn','−',word('qty')+' −1 '+label,() => change(-1)),more,button('cat-btn','×',word('remove')+' '+label,() => change(-row.qty)));
      li.append(photo,copy,controls);
      if (['set-a','set-b','kikan'].includes(row.slug)) {
        const note = el('input','ff-note'); note.type='text'; note.maxLength=80; note.value=row.note;
        note.placeholder=word('note'); note.setAttribute('aria-label',label+' '+word('note'));
        note.addEventListener('input',() => { row.note=note.value; storeRows(); }); li.append(note);
      }
      list.append(li);
      if (seen && !drawn.has(li.dataset.entry)) fold(li,true);
      else if (seen && drawn.get(li.dataset.entry) !== row.qty) rise(each);
    }
    const sum = totals(), hadNote = !offer.hidden;
    tally.textContent=sum.line; offer.textContent=sum.note; offer.hidden=!sum.note; tally.hidden=!count;
    if (seen && count && sum.line !== drawnSum) rise(tally);
    if (seen && sum.note && !hadNote) rise(offer);
    drawn = new Map(rows.map(r => [identify(r),r.qty])); drawnCount = count; drawnSum = sum.line;
    save.textContent=word('save'); save.disabled=!count; download.textContent=word('ready');
  }
  function setup() {
    if (view !== 'catalog' || currentCatalog !== catalog) { panel.hidden=true; return; }
    panel.hidden=false;
    for (const g of products) {
      const card=document.getElementById('gc-'+g.slug);
      if (!card || !$('#catalog-goods').contains(card)) continue;
      let wrap=card.closest('.ff-product');
      if (!wrap) { wrap=el('div','ff-product'); card.before(wrap); wrap.append(card,el('div','ff-pick')); }
      const controls=wrap.querySelector('.ff-pick'), old=controls.querySelector('select')?.value, choices=variantNames(g);
      controls.replaceChildren();
      const select=el('select');
      if (choices.length) {
        select.setAttribute('aria-label',L(g.name)+' · '+word('design'));
        choices.forEach((name,i) => select.add(new Option(name,String(i))));
        if (old != null) select.value=old;
        controls.append(select);
      }
      const add=button('btn',word('add'),L(g.name)+' · '+word('add'),() => {
        const variant=choices.length ? Number(select.value) : -1;
        const found=rows.find(r => r.slug===g.slug && r.variant===variant);
        if (found) found.qty=Math.min(99,found.qty+1);
        else rows.push({slug:g.slug,variant,qty:1,note:''});
        storeRows(); paint(true); status.textContent=word('added')+' ×'+(found?.qty || 1); rise(status,400);
      });
      const status=el('small'); status.setAttribute('role','status');
      controls.append(add,status);
    }
    invalidate(); paint();
  }
  async function exportImage() {
    const version=revision, entries=rows.map(row=>({...row})), sum=totals();
    if (!entries.length) return;
    save.disabled=true;
    try {
      /* in the site's colours and type: the name and the title in the display face, the rest in the body face, each
         font loaded first for the characters drawn; a gold rule (as --ring-line) under the head */
      const css=getComputedStyle(document.documentElement), v=k => css.getPropertyValue(k).trim();
      const ink={bg:v('--bg'),card:v('--bg-2'),fg:v('--fg'),mute:v('--mute'),line:v('--line'),gold:v('--g-gold')};
      const head=n => n+'px '+v('--f-display'), text=n => n+'px '+v('--f-body');
      const brand='MANIA8522191 · FF47';
      const drawn=brand+[word('title'),L(catalog.debut),sum.line,sum.note,...entries.map(r => title(r)+r.note+'×'+r.qty+priceText(product(r).price*r.qty))].join('');
      await Promise.all([head(24),head(44),text(22),text(26),text(32)].map(f => document.fonts.load(f,drawn)));
      const canvas=el('canvas'), ctx=canvas.getContext('2d');
      canvas.width=920;
      function lines(string,width,font) {   // the words in lines no wider than width, in that font
        ctx.font=font;
        let line=''; const out=[];
        for (const ch of string) {
          if (line && ctx.measureText(line+ch).width>width) {   // an opening bracket goes down with what it opens
            const open=/[「『（(【〈《“‘]+$/.exec(line)?.[0] || '', keep=open.length<line.length ? open : '';
            out.push(line.slice(0,line.length-keep.length)); line=keep;
          }
          line+=ch;
        }
        if(line)out.push(line); return out;
      }
      const layout=entries.map(r => ({row:r,labels:lines(title(r),535,text(26)),notes:lines(r.note,535,text(22))}));
      const noteLines=lines(sum.note,820,text(22));
      const tall=l => Math.max(120,45+34*l.labels.length+30*l.notes.length);
      canvas.height=218+layout.reduce((n,l) => n+tall(l),0)+104+noteLines.length*34;
      ctx.fillStyle=ink.bg; ctx.fillRect(0,0,920,canvas.height);
      ctx.fillStyle=ink.gold; ctx.font=head(24); ctx.letterSpacing='3px'; ctx.fillText(brand,44,56); ctx.letterSpacing='0px';
      ctx.fillStyle=ink.fg; ctx.font=head(44); ctx.fillText(word('title'),44,122);
      ctx.fillStyle=ink.mute; ctx.font=text(22); ctx.fillText(L(catalog.debut),44,166);
      const photos=await Promise.all(entries.map(async row => {const img=new Image(); img.src=thumbnail(row); await img.decode(); return img;}));
      let y=198;
      ctx.fillStyle=ink.gold; ctx.globalAlpha=.42; ctx.fillRect(44,y,832,1); ctx.globalAlpha=1;
      layout.forEach((l,i) => {
        const {row,labels,notes}=l, photo=photos[i], s=Math.min(96/photo.width,96/photo.height);
        ctx.fillStyle=ink.card; ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(44,y+12,96,96,8); else ctx.rect(44,y+12,96,96);
        ctx.fill();
        ctx.drawImage(photo,44+(96-photo.width*s)/2,y+12+(96-photo.height*s)/2,photo.width*s,photo.height*s);
        ctx.fillStyle=ink.fg; ctx.font=text(26); labels.forEach((t,j) => ctx.fillText(t,164,y+41+j*34));
        ctx.fillStyle=ink.gold; ctx.font=text(22); notes.forEach((t,j) => ctx.fillText(t,164,y+43+labels.length*34+j*30));
        ctx.textAlign='right';
        ctx.fillStyle=ink.mute; ctx.font=text(22); ctx.fillText('×'+row.qty,876,y+41);
        ctx.fillStyle=ink.fg; ctx.font=text(26); ctx.fillText(priceText(product(row).price*row.qty),876,y+79);
        ctx.textAlign='left';
        y+=tall(l); ctx.fillStyle=ink.line; ctx.fillRect(44,y,832,1);
      });
      ctx.fillStyle=ink.gold; ctx.font=text(32); ctx.fillText(sum.line,44,y+62);
      ctx.fillStyle=ink.mute; ctx.font=text(22); noteLines.forEach((t,j) => ctx.fillText(t,44,y+105+j*34));
      const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));
      if (!blob) throw new Error('PNG');
      if(version!==revision)return;
      if(downloadURL)URL.revokeObjectURL(downloadURL);
      downloadURL=URL.createObjectURL(blob); download.href=downloadURL; download.hidden=false; rise(download); download.click();
    } catch { if(version===revision){feedback.textContent=word('error'); rise(feedback);} }
    finally { save.disabled=!rows.length; }
  }
  save.addEventListener('click',exportImage);
  addEventListener('storage',e=>{if(e.key===key || e.key===null){rows=readRows();invalidate();paint();}});
  document.addEventListener('portfolio-view',setup);
  document.addEventListener('portfolio-language',setup);
})();
