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
  const offer = el('p'), save = el('button','btn'), download = el('a'), feedback = el('span','ff-feedback');
  save.type = 'button'; feedback.setAttribute('role','status'); download.download = 'FF47-mania8522191.png';
  panel.append(summary,list,tally,offer,save,download,feedback);
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
  function button(text, label, action) {
    const node = el('button','ff-action',text);
    node.type = 'button'; node.setAttribute('aria-label',label); node.addEventListener('click',action); return node;
  }
  function paint() {
    const count = rows.reduce((n,r) => n+r.qty,0);
    summary.textContent = word('title')+' ('+count+')';
    list.replaceChildren();
    if (!count) list.append(el('li','',word('empty')));
    for (const row of rows) {
      const li = el('li','ff-line'), photo = el('img'), copy = el('div'), controls = el('div','ff-controls');
      photo.src = thumbnail(row); photo.alt = ''; photo.loading = 'lazy';
      const label = title(row); copy.append(el('strong','',label),el('small','',priceText(product(row).price)+' × '+row.qty));
      const change = delta => {
        row.qty += delta;
        if (!row.qty) rows = rows.filter(r => r !== row);
        storeRows(); paint();
        (list.querySelector('[data-entry="'+identify(row)+'"] button') || summary).focus({preventScroll:true});
      };
      li.dataset.entry = identify(row);
      const more = button('+',word('qty')+' +1 '+label,() => change(1)); more.disabled = row.qty >= 99;
      controls.append(button('−',word('qty')+' −1 '+label,() => change(-1)),more,button('×',word('remove')+' '+label,() => change(-row.qty)));
      li.append(photo,copy,controls);
      if (['set-a','set-b','kikan'].includes(row.slug)) {
        const note = el('input','ff-note'); note.type='text'; note.maxLength=80; note.value=row.note;
        note.placeholder=word('note'); note.setAttribute('aria-label',label+' '+word('note'));
        note.addEventListener('input',() => { row.note=note.value; storeRows(); }); li.append(note);
      }
      list.append(li);
    }
    const sum = totals();
    tally.textContent=sum.line; offer.textContent=sum.note; offer.hidden=!sum.note; tally.hidden=!count;
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
      const add=button(word('add'),L(g.name)+' · '+word('add'),() => {
        const variant=choices.length ? Number(select.value) : -1;
        const found=rows.find(r => r.slug===g.slug && r.variant===variant);
        if (found) found.qty=Math.min(99,found.qty+1);
        else rows.push({slug:g.slug,variant,qty:1,note:''});
        storeRows(); paint(); status.textContent=word('added')+' ×'+(found?.qty || 1);
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
      const canvas=el('canvas'), ctx=canvas.getContext('2d');
      canvas.width=920;
      function lines(string,width) {
        let line=''; const out=[];
        for (const ch of string) {
          if (line && ctx.measureText(line+ch).width>width) {out.push(line); line='';}
          line+=ch;
        }
        if(line)out.push(line); return out;
      }
      ctx.font='26px sans-serif';
      const layout=entries.map(r => ({row:r,labels:lines(title(r),535),notes:lines(r.note,535)}));
      const noteLines=lines(sum.note,820);
      const height=layout.reduce((n,l)=>n+Math.max(120,45+34*l.labels.length+30*l.notes.length),0);
      canvas.height=218+height+104+noteLines.length*34;
      ctx.fillStyle='#131316';ctx.fillRect(0,0,920,canvas.height);ctx.fillStyle='#d9bc89';ctx.font='24px sans-serif';ctx.fillText('MANIA8522191   /   FF47',44,52);
      ctx.fillStyle='#fff';ctx.font='bold 44px sans-serif';ctx.fillText(word('title'),44,118);ctx.font='22px sans-serif';ctx.fillText(L(catalog.debut),44,168);
      const photos=await Promise.all(entries.map(async row=>{const img=new Image();img.src=thumbnail(row);await img.decode();return img;}));
      let y=198;
      layout.forEach(({row,labels,notes},i)=>{
        const photo=photos[i], s=Math.min(96/photo.width,96/photo.height);
        ctx.fillStyle='#343437';ctx.fillRect(44,y+10,96,96);ctx.drawImage(photo,44+(96-photo.width*s)/2,y+10+(96-photo.height*s)/2,photo.width*s,photo.height*s);
        ctx.fillStyle='#fff';ctx.font='26px sans-serif';labels.forEach((t,j)=>ctx.fillText(t,164,y+39+j*34));
        ctx.fillStyle='#d9bc89';ctx.font='22px sans-serif';notes.forEach((t,j)=>ctx.fillText(t,164,y+41+labels.length*34+j*30));
        ctx.textAlign='right';ctx.fillText('×'+row.qty,874,y+40);ctx.fillText(priceText(product(row).price*row.qty),874,y+77);ctx.textAlign='left';
        y+=Math.max(120,45+34*labels.length+30*notes.length);ctx.fillStyle='#444';ctx.fillRect(44,y,832,1);
      });
      ctx.font='bold 32px sans-serif';ctx.fillStyle='#ead1a5';ctx.fillText(sum.line,44,y+62);
      ctx.font='22px sans-serif';noteLines.forEach((t,j)=>ctx.fillText(t,44,y+105+j*34));
      const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));
      if (!blob) throw new Error('PNG');
      if(version!==revision)return;
      if(downloadURL)URL.revokeObjectURL(downloadURL);
      downloadURL=URL.createObjectURL(blob); download.href=downloadURL; download.hidden=false; download.click();
    } catch { if(version===revision)feedback.textContent=word('error'); }
    finally { save.disabled=!rows.length; }
  }
  save.addEventListener('click',exportImage);
  addEventListener('storage',e=>{if(e.key===key || e.key===null){rows=readRows();invalidate();paint();}});
  document.addEventListener('portfolio-view',setup);
  document.addEventListener('portfolio-language',setup);
})();
