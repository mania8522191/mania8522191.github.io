(() => {
  const featured=['miComet','星街すいせい','あのそよ'];
  const others=['さくらみこ','宝鐘マリン','千早愛音','長崎そよ','おかころ','とこまち','がうる・ぐら','猫又おかゆ','戌神ころね','AZKi','森カリオペ','一伊那尓栖','ワトソン・アメリア','小鳥遊キアラ','戌亥とこ','天音かなた','桐生ココ','聖園ミカ','仲正イチカ','天童アリス','高垣楓','アドミラル・ヒッパー(アズールレーン)','プリンツ・オイゲン(アズールレーン)','アドミラル・グラーフ・シュペー(アズールレーン)','ドイッチュラント(アズールレーン)'];
  // Only illustrations identified in the book previews.
  const bookWorks={ff47:['142549210','148068024','146954644','147595537'],ff46:['137386797','137332578','137308455']};
  const nav=el('nav','character-nav'), title=el('span','character-label'), more=el('details'), toggle=el('summary');
  function links(names) {
    const list=el('div','character-links');
    for(const name of names) {
      if(!tagWorks(name).length)continue;
      const a=el('a','',name);a.href=tagHref(name);list.append(a);
    }
    return list;
  }
  nav.id='work-characters';more.append(toggle,links(others));nav.append(title,links(featured),more);$('#works-sub').after(nav);
  const related=el('section','tag-related');related.id='tag-related';tagWall.after(related);
  function group(name,cards) {
    if(!cards.length)return;
    const heading=el('h3','gd-h',name), grid=el('div','character-cards');
    for(const [href,text,image,book] of cards) {
      const a=el('a'), img=el('img');a.href=href;img.alt='';img.src=image;img.loading='lazy';img.decoding='async';
      if(book) {   // the spread is back cover, spine, front cover (the other way round in a right-bound book): show the front
        const [W,H]=book.pages[0];img.className='book';img.style.aspectRatio=W/2+' / '+H;img.style.objectPosition=book.rtl ? 'left' : 'right';
      }
      a.append(img,el('span','',text));grid.append(a);
    }
    related.append(heading,grid);
  }
  function update() {
    title.textContent=L({zh:'依角色或組合瀏覽',en:'Browse by character or duo',ja:'キャラクター・ユニットから探す'});
    nav.setAttribute('aria-label',title.textContent);toggle.textContent=L({zh:'更多角色',en:'More characters',ja:'もっと見る'});
    nav.hidden=view!=='works' || wallCat!=='fan';
    if(view!=='tag')return;
    const ids=new Set(tagWorks(tagNow).map(w=>w.id));
    const books=BOOKS.filter(b=>bookWorks[b.slug]?.some(id=>ids.has(id)));
    const slugs=new Set(books.map(b=>b.slug));
    const goods=GOODS.filter(g=>g.works?.some(id=>ids.has(id)) || g.books?.some(s=>slugs.has(s)));
    related.replaceChildren();related.hidden=!goods.length && !books.length;
    group(L({zh:'相關周邊',en:'Related goods',ja:'関連グッズ'}),goods.map(g=>['#g-'+g.slug,L(g.name),goodsImage(g)[0]]));
    group(L({zh:'收錄畫冊',en:'Art books featuring this work',ja:'収録画集'}),books.map(b=>['#ab-'+b.slug,b.t,'img/ab/'+b.slug+'_p0.webp',b]));
  }
  document.addEventListener('portfolio-view',update);
  document.addEventListener('portfolio-language',update);
})();
