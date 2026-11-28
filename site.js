/* Built by tools/build.py from js/*.js in this order: data, core, i18n, game, lightbox, menu, goods, event, wall, work, tag, artbook, book3d, motion, home, router, about, board, lang-switch, sound, ../features/ff47-list/main, main. Edit those files, not this one. */

/* ==================== js/data.js ==================== */
/* Site data. One item per line; the scripts in tools/ read and write this file (keep each list valid JSON).
   WORKS: every work on the wall. GOODS: the shop items. BOOKS: the art books. */

/* process timelapses play here on the site (otherwise they link to YouTube) */
window.SELF_HOSTED = true;

const WORKS = [
  {"id":"151727539","t":"星街すいせい「旗袍」","ym":"2023.02","d":"2026-11-06","lab":"hololive","tags":["バーチャルYouTuber","ホロライブ","hololive","星街すいせい","ほしまちぎゃらりー"],"dims":[[600,1200,2508,5016]],"pos":"50% 35%","proc":[["151727539.webp",1000,2000]],"cat":"fan"},
  {"id":"151727489","t":"星街すいせい「着物」","ym":"2023.02","d":"2026-11-06","lab":"hololive","tags":["バーチャルYouTuber","ホロライブ","hololive","星街すいせい","ほしまちぎゃらりー"],"dims":[[600,1200,2508,5016]],"pos":"50% 35%","proc":[["151727489.webp",1000,2000]],"cat":"fan"},
  {"id":"151727425","t":"星街すいせい「Bomber Jacket」","ym":"2023.02","d":"2026-11-06","lab":"hololive","tags":["バーチャルYouTuber","ホロライブ","hololive","星街すいせい","ほしまちぎゃらりー"],"dims":[[600,1200,2508,5016]],"pos":"50% 35%","proc":[["151727425.webp",1000,2000]],"cat":"fan"},
  {"id":"151727321","t":"星街すいせい「poncho」","ym":"2023.02","d":"2026-11-06","lab":"hololive","tags":["バーチャルYouTuber","ホロライブ","hololive","星街すいせい","ほしまちぎゃらりー"],"dims":[[600,1200,2508,5016]],"pos":"50% 35%","proc":[["151727321.webp",1000,2000]],"cat":"fan"},
  {"id":"151696428","t":"星街すいせい「全衣装」","ym":"2023.02","d":"2026-11-05","lab":"hololive","tags":["バーチャルYouTuber","ホロライブ","hololive","星街すいせい","ほしまちぎゃらりー"],"dims":[[1200,1200,2560,2560],[1500,1500,7000,7000]],"pos":"50% 35%","proc":[["151696428.webp",1000,1000],["151696428_p1.webp",1000,1000,2100,2100]],"cat":"fan"},
  {"id":"151695370","t":"星街すいせい「SHOUT IN CRISIS」","ym":"2023.02","d":"2026-11-05","lab":"hololive","tags":["バーチャルYouTuber","ホロライブ","hololive","星街すいせい","ほしまちぎゃらりー"],"dims":[[858,1200,5000,7000]],"pos":"50% 35%","proc":[["151695370.webp",1000,1400,1500,2100]],"cat":"fan"},
  {"id":"148923743","t":"星街すいせい×AZKi-「AZKiと未来へ」","ym":"2026.08","d":"2026-08-27","lab":"hololive","tags":["バーチャルYouTuber","ホロライブ","hololive","星街すいせい","ほしまちぎゃらりー","AZKi"],"dims":[[900,2728,3000,9094]],"pos":"50% 31%","yt":{"id":"4jt6jOjVMuA","dur":"22:20","t":"星街すいせい×AZKi-「AZKiと未来へ」PROCESS TIMELAPSE- 202608"},"cat":"fan"},
  {"id":"148494165","t":"星街すいせい×花譜-KAF-「DEADPOOL」","ym":"2026.08","d":"2026-08-16","lab":"hololive × 神椿スタジオ","tags":["バーチャルYouTuber","ホロライブ","hololive","星街すいせい","ほしまちぎゃらりー","神椿スタジオ"],"dims":[[900,2728,3000,9094]],"pos":"50% 29%","yt":{"id":"CqvN1sByvPU","dur":"21:41","t":"星街すいせい×花譜-KAF-「DEADPOOL」PROCESS TIMELAPSE- 202608"},"cat":"fan"},
  {"id":"148313240","t":"チビキーホルダー","ym":"2026.08","d":"2026-08-12","lab":"hololive","tags":["バーチャルYouTuber","hololive","星街すいせい","ほしまちぎゃらりー","HololiveEN","一伊那尓栖"],"dims":[[1000,1001],[1000,1001],[1000,1001],[1000,1001]],"pos":"50% 50%","yt":{"id":"T3Oaep-xdDw","dur":"12:42","t":"チビキーホルダーPROCESS TIMELAPSE- 202608"},"cat":"fan"},
  {"id":"148068024","t":"あのそよ「ブレンドの香る窓辺で」","ym":"2026.08","d":"2026-08-06","lab":"BanG Dream!","tags":["バンドリ","BanG_Dream!","千早愛音","長崎そよ","あのそよ"],"dims":[[1200,800,4500,3000],[1500,12000]],"pos":"50% 35%","yt":{"id":"JLrV-DkgcAM","dur":"57:59","t":"あのそよ「ブレンドの香る窓辺で」PROCESS TIMELAPSE- 202608"},"cat":"fan"},
  {"id":"147595537","t":"miComet「シュガーラッシュ」「Lollipop」","ym":"","d":"2026-07-25","lab":"hololive","tags":["バーチャルYouTuber","ホロライブ","hololive","miComet","星街すいせい","ほしまちぎゃらりー"],"dims":[[1200,800,4500,3000],[1500,12000]],"pos":"50% 35%","yt":{"id":"5IpNSzgaoDE","dur":"25:03","t":"miComet「シュガーラッシュ」「Lollipop」PROCESS TIMELAPSE- 202608"},"cat":"fan"},
  {"id":"146954644","t":"星街すいせい×宝鐘マリン「Chatter Chatter」","ym":"","d":"2026-07-08","lab":"hololive","tags":["バーチャルYouTuber","ホロライブ","星街すいせい","ほしまちぎゃらりー","宝鐘マリン","マリンのお宝"],"dims":[[1200,675,4800,2700],[1200,8100]],"pos":"50% 35%","yt":{"id":"3D9UhNnYtnw","dur":"49:12","t":"星街すいせい×宝鐘マリン「Chatter Chatter」PROCESS TIMELAPSE- 202608"},"cat":"fan"},
  {"id":"f-202408-01","t":"星街すいせい「SheenderellaDay」- 202408","ym":"2024.08","d":"2026-06-28","lab":"hololive","tags":["バーチャルYouTuber","ホロライブ","星街すいせい","ほしまちぎゃらりー","アイドルマスターシンデレラガールズ","高垣楓"],"dims":[[1200,608,5870,2976]],"pos":"50% 35%","cat":"fan","proc":[["f-202408-01.webp",1500,760]]},
  {"id":"146544263","t":"星街すいせい「SheenderellaDay」","ym":"2024.08","d":"2026-06-28","lab":"hololive","tags":["バーチャルYouTuber","ホロライブ","星街すいせい","ほしまちぎゃらりー","アイドルマスターシンデレラガールズ","高垣楓"],"dims":[[1200,608,1500,760]],"pos":"50% 35%","cat":"fan","proc":[["146544263.webp",1500,760]]},
  {"id":"146544204","t":"星街すいせい「SheenderellaDay」","ym":"2024.08","d":"2026-06-28","lab":"hololive","tags":["バーチャルYouTuber","ホロライブ","星街すいせい","ほしまちぎゃらりー"],"dims":[[1200,608,1500,760]],"pos":"50% 35%","cat":"fan","proc":[["146544204.webp",1500,760]]},
  {"id":"146543533","t":"星街すいせい「ジュビリー」","ym":"2024.08","d":"2026-06-28","lab":"hololive","tags":["ホロライブ","バーチャルYouTuber","星街すいせい","ほしまちぎゃらりー"],"dims":[[1200,608,1500,760]],"pos":"50% 35%","cat":"fan","proc":[["146543533.webp",1500,760]]},
  {"id":"146541232","t":"星街すいせい「ジュビリー」","ym":"2024.08","d":"2026-06-28","lab":"hololive","tags":["ホロライブ","バーチャルYouTuber","星街すいせい","ほしまちぎゃらりー","アイドルマスターシンデレラガールズ","高垣楓"],"dims":[[1200,608,1500,760]],"pos":"50% 35%","cat":"fan","proc":[["146541232.webp",1500,760]]},
  {"id":"142549210","t":"星街すいせい「ビビデバ」","ym":"2026.08","d":"2026-03-21","lab":"hololive","tags":["ホロライブ","バーチャルYouTuber","星街すいせい","ほしまちぎゃらりー"],"dims":[[1200,800,1500,1000],[750,4000]],"pos":"50% 35%","yt":{"id":"yWAYSn_4VsA","dur":"16:45","t":"星街すいせい「ビビデバ」PROCESS TIMELAPSE- 202608"},"cat":"fan"},
  {"id":"140064972","t":"星街すいせい「起点‧終点」","ym":"2026.02","d":"2026-01-18","lab":"hololive","tags":["ホロライブ","バーチャルYouTuber","星街すいせい","ほしまちぎゃらりー"],"dims":[[1200,675,1920,1080],[1000,1000],[1000,1000],[1000,1000],[1000,1000],[1000,1000],[1000,1000]],"pos":"50% 35%","yt":{"id":"rb2b--E93Do","dur":"32:58","t":"星街すいせい「起点‧終点」PROCESS TIMELAPSE- 202602"},"cat":"fan"},
  {"id":"140064141","t":"miComet「シュガーラッシュ」","ym":"2024.08","d":"2026-01-18","lab":"hololive","tags":["ホロライブ","バーチャルYouTuber","miComet","星街すいせい","さくらみこ","ほしまちぎゃらりー"],"dims":[[1000,1000],[1000,6000]],"pos":"50% 35%","cat":"fan"},
  {"id":"139165109","t":"星街すいせい「じつげん」","ym":"2026.02","d":"2025-12-28","lab":"hololive","tags":["ホロライブ","バーチャルYouTuber","星街すいせい","ほしまちぎゃらりー"],"dims":[[1200,675,1778,1000],[889,6000]],"pos":"50% 35%","yt":{"id":"AI6gq6-lBoY","dur":"40:22","t":"星街すいせい「じつげん」PROCESS TIMELAPSE- 202602"},"cat":"fan"},
  {"id":"137386797","t":"星街すいせい「武道館」","ym":"2025.12","d":"2025-11-12","lab":"hololive","tags":["ホロライブ","バーチャルYouTuber","星街すいせい","ほしまちぎゃらりー"],"dims":[[1200,800,1500,1000],[750,6000]],"pos":"50% 35%","yt":{"id":"VyM0Wds8Zbw","dur":"30:01","t":"星街すいせい「武道館」PROCESS TIMELAPSE- 202512"},"cat":"fan"},
  {"id":"137332578","t":"miComet「Lollipop」","ym":"2025.12","d":"2025-11-11","lab":"hololive","tags":["ホロライブ","バーチャルYouTuber","miComet","星街すいせい","さくらみこ","ほしまちぎゃらりー"],"dims":[[1200,800,1500,1000],[750,6000]],"pos":"50% 35%","yt":{"id":"PgKiIjXDjgo","dur":"30:01","t":"miComet「Lollipop」PROCESS TIMELAPSE- 202512"},"cat":"fan"},
  {"id":"137310133","t":"星街すいせい","ym":"2025.05","d":"2025-11-10","lab":"hololive","tags":["ホロライブ","バーチャルYouTuber","星街すいせい","ほしまちぎゃらりー"],"dims":[[1000,1000]],"pos":"50% 35%","yt":{"id":"5FlWXc-elA4","dur":"20:13","t":"星街すいせい「新星目録」PROCESS TIMELAPSE- 202508"},"cat":"fan"},
  {"id":"137309925","t":"星街すいせい「Super Nova」","ym":"2025.05","d":"2025-11-10","lab":"hololive","tags":["ホロライブ","バーチャルYouTuber","星街すいせい","ほしまちぎゃらりー"],"dims":[[800,1200,1000,1500]],"pos":"50% 30%","cat":"fan"},
  {"id":"137308455","t":"星街すいせい「7th Anniversary」","ym":"2025.05","d":"2025-11-10","lab":"hololive","tags":["ホロライブ","バーチャルYouTuber","星街すいせい","ほしまちぎゃらりー"],"dims":[[1200,800,1500,1000]],"pos":"50% 35%","yt":{"id":"ZePHgBmgToQ","dur":"21:57","t":"星街すいせい「7th Anniversary」PROCESS TIMELAPSE- 202508"},"cat":"fan"},
  {"id":"137296812","t":"ガールズバンド","ym":"2024.12","d":"2025-11-10","lab":"MyGO!!!!! / ガールズバンドクライ","tags":["MyGO!!!!!","ガールズバンドクライ"],"dims":[[1200,1200,1500,1500],[1200,600,3000,1500],[1200,600,3000,1500],[1200,900,2000,1500],[1200,600,3000,1500]],"pos":"50% 35%","cat":"fan"},
  {"id":"137293278","t":"星街すいせい","ym":"2024.08","d":"2025-11-09","lab":"hololive","tags":["ホロライブ","バーチャルYouTuber","星街すいせい"],"dims":[[1200,600,3000,1500],[1200,600,3000,1500],[1200,600,3000,1500]],"pos":"50% 35%","cat":"fan"},
  {"id":"137292428","t":"ブルアカ ネグリジェ series","ym":"2024.02","d":"2025-11-09","lab":"ブルーアーカイブ","tags":["ブルーアーカイブ","ブルアカ","BlueArchive","仲正イチカ","天童アリス","聖園ミカ"],"dims":[[1200,1200,1500,1500],[1500,1500],[1500,1500],[1500,1500],[1500,1500]],"pos":"50% 35%","cat":"fan"},
  {"id":"110349085","t":"みちづれ","ym":"","d":"2023-07-29","lab":"hololive","tags":["バーチャルYouTuber","ホロライブ","星街すいせい"],"dims":[[1200,600,3000,1500]],"pos":"50% 35%","cat":"fan"},
  {"id":"110144237","t":"灼熱にて純情(wii-wii-woo)","ym":"","d":"2023-07-22","lab":"hololive","tags":["バーチャルYouTuber","ホロライブ","星街すいせい"],"dims":[[1200,600,3000,1500]],"pos":"50% 35%","cat":"fan"},
  {"id":"104895616","t":"❤","ym":"","d":"2023-01-28","lab":"hololive","tags":["バーチャルYouTuber","ホロライブ","星街すいせい"],"dims":[[800,1200,1200,1800]],"pos":"50% 35%","cat":"fan"},
  {"id":"104573608","t":"❤","ym":"","d":"2023-01-16","lab":"hololive","tags":["バーチャルYouTuber","ホロライブ","星街すいせい"],"dims":[[800,1200,4566,6847]],"pos":"50% 35%","proc":[["104573608.webp",1000,1500,1600,2400]],"cat":"fan"},
  {"id":"99304739","t":"❤","ym":"","d":"2022-06-26","lab":"hololive","tags":["バーチャルYouTuber","ホロライブ","星街すいせい"],"dims":[[1200,600,1600,800]],"pos":"50% 35%","cat":"fan"},
  {"id":"95387282","t":"❤","ym":"","d":"2022-01-08","lab":"hololive","tags":["バーチャルYouTuber","ホロライブ","星街すいせい","VTuber"],"dims":[[681,1200,908,1600]],"pos":"50% 42%","cat":"fan"},
  {"id":"94713402","t":"「KING」","ym":"","d":"2021-12-11","lab":"hololive","tags":["バーチャルYouTuber","星街すいせい","ホロライブ"],"dims":[[1200,681,1600,908]],"pos":"50% 35%","cat":"fan"},
  {"id":"94112477","t":"「Honeycomb Summer」","ym":"","d":"2021-11-13","lab":"hololive × にじさんじ","tags":["バーチャルYouTuber","星街すいせい","戌亥とこ","とこまち","ホロライブ","にじさんじ"],"dims":[[1200,681,1600,908]],"pos":"50% 35%","cat":"fan"},
  {"id":"93787913","t":"「今宵月の館にて」","ym":"","d":"2021-10-30","lab":"hololive × にじさんじ","tags":["バーチャルYouTuber","星街すいせい","戌亥とこ","とこまち","ホロライブ","にじさんじ"],"dims":[[1200,681,1600,908]],"pos":"50% 35%","cat":"fan"},
  {"id":"92332684","t":"夏","ym":"","d":"2021-08-28","lab":"hololive","tags":["バーチャルYouTuber","猫又おかゆ","戌神ころね","水着","ホロライブ","おかころ"],"dims":[[1200,750,1600,1000]],"pos":"50% 35%","cat":"fan"},
  {"id":"91801023","t":"夏","ym":"","d":"2021-08-08","lab":"hololive English","tags":["バーチャルYouTuber","一伊那尓栖","小鳥遊キアラ","森カリオペ","ワトソン・アメリア","がうる・ぐら"],"dims":[[1200,750,2400,1500]],"pos":"50% 35%","cat":"fan"},
  {"id":"91312872","t":"夏","ym":"","d":"2021-07-17","lab":"hololive","tags":["バーチャルYouTuber","天音かなた","桐生ココ","星街すいせい","水着"],"dims":[[1200,750,2400,1500]],"pos":"50% 35%","cat":"fan"},
  {"id":"87254319","t":"❤","ym":"","d":"2021-01-23","lab":"hololive","tags":["ホロライブ","バーチャルYouTuber","星街すいせい","魅惑のふともも"],"dims":[[900,1200,1800,2400]],"pos":"50% 35%","cat":"fan"},
  {"id":"87098130","t":"星街すいせい「Maid」","ym":"","d":"2021-01-16","lab":"hololive","tags":["ホロライブ","バーチャルYouTuber","星街すいせい","私服","メイド","VTuber","黒スト"],"dims":[[1200,750,2400,1500]],"pos":"50% 35%","cat":"fan"},
  {"id":"86771770","t":"星街すいせい「着物」","ym":"","d":"2021-01-02","lab":"hololive","tags":["ホロライブ","バーチャルYouTuber","星街すいせい","私服","VTuber","着物"],"dims":[[1200,750,2400,1500]],"pos":"50% 35%","cat":"fan"},
  {"id":"86560442","t":"星街すいせい「Christmas」","ym":"","d":"2020-12-26","lab":"hololive","tags":["ホロライブ","バーチャルYouTuber","星街すいせい","VTuber","黒スト","私服","hololive"],"dims":[[1200,750,2400,1500]],"pos":"50% 35%","cat":"fan"},
  {"id":"86397683","t":"星街すいせい「British」","ym":"","d":"2020-12-19","lab":"hololive","tags":["ホロライブ","バーチャルYouTuber","星街すいせい","ほしまちぎゃらりー","VTuber","黒スト","hololive"],"dims":[[1200,750,2400,1500]],"pos":"50% 35%","cat":"fan"},
  {"id":"f-suisei","t":{"zh":"星街すいせい 塗鴉合集","en":"星街すいせい Doodle Log","ja":"星街すいせい らくがきまとめ"},"ym":"2020.10","d":"2020-10","lab":"hololive","tags":["バーチャルYouTuber","ホロライブ","hololive","星街すいせい","ほしまちぎゃらりー","らくがき"],"dims":[[1200,1200,2500,2500],[750,1200,2500,4000],[750,1200,2500,4000],[750,1200,1500,2400],[750,1200,1500,2400],[900,1200,1800,2400],[900,1200,1500,2000]],"pos":"50% 35%","cat":"fan","pieces":true,"px":{"3":"85812772","4":"86259443","5":"87418759","6":"88261414"}},
  {"id":"f-pw-mtm","t":{"zh":"VTuber 塗鴉合集","en":"VTuber Doodle Log","ja":"VTuber らくがきまとめ"},"ym":"2020.10","d":"2020-10","lab":"VTuber","tags":["バーチャルYouTuber","らくがき"],"dims":[[750,1200,2500,4000],[750,1200,2500,4000],[750,1200,2500,4000],[750,1200,2500,4000],[750,1200,2500,4000],[750,1200,2500,4000],[750,1200,2500,4000],[750,1200,2500,4000],[750,1200,2500,4000],[750,1200,2500,4000],[750,1200,2500,4000]],"pos":"50% 35%","cat":"fan","pieces":true,"sk":[[750,1200,2500,4000],[750,1200,2500,4000],[750,1200,2500,4000],0,[750,1200,2500,4000],[750,1200,2500,4000],[750,1200,2500,4000],0,[750,1200,2500,4000],0,0],"alt":{"1":[[750,1200,2500,4000],[750,1200,2500,4000]]}},
  {"id":"79077513","t":"台湾FF35新刊(中国語注意)","ym":"","d":"2020-01-24","lab":"アズールレーン","tags":["アズールレーン","私服","アドミラル・ヒッパー(アズールレーン)","プリンツ・オイゲン(アズールレーン)","ドイッチュラント(アズールレーン)","アドミラル・グラーフ・シュペー(アズールレーン)"],"dims":[[800,1130],[800,1130],[1200,1200,2000,2000],[1200,960],[1200,960]],"pos":"50% 35%","cat":"fan"},
  {"id":"78848192","t":"プリンツ・オイゲン","ym":"","d":"2020-01-12","lab":"アズールレーン","tags":["アズールレーン","プリンツ・オイゲン(アズールレーン)","私服"],"dims":[[900,1200],[900,1200]],"pos":"50% 35%","cat":"fan"},
  {"id":"78715432","t":"ドイッチュラント","ym":"","d":"2020-01-05","lab":"アズールレーン","tags":["アズールレーン","ドイッチュラント(アズールレーン)","私服"],"dims":[[900,1200],[600,800]],"pos":"50% 35%","cat":"fan"},
  {"id":"78553188","t":"アドミラル・グラーフ・シュペー","ym":"","d":"2019-12-29","lab":"アズールレーン","tags":["アズールレーン","アドミラル・グラーフ・シュペー(アズールレーン)","私服"],"dims":[[900,1200],[600,800]],"pos":"50% 35%","cat":"fan"},
  {"id":"78409231","t":"アドミラル・ヒッパー","ym":"","d":"2019-12-22","lab":"アズールレーン","tags":["アズールレーン","アドミラル・ヒッパー(アズールレーン)","私服"],"dims":[[900,1200],[600,800]],"pos":"50% 35%","cat":"fan"},
  {"id":"o-3-3","t":"Original21","ym":"","d":"2024-03-31","lab":"Original Art","tags":[],"dims":[[800,1200,4000,6000]],"pos":"50% 35%","cat":"original","proc":[["o-3-3.webp",1000,1500,4000,6000]]},
  {"id":"o-3-2","t":"Original20","ym":"","d":"2024-03-29","lab":"Original Art","tags":[],"dims":[[800,1200,4000,6000]],"pos":"50% 35%","cat":"original","proc":[["o-3-2.webp",1000,1500,4000,6000]]},
  {"id":"o-3-1","t":"Original19","ym":"","d":"2024-03-22","lab":"Original Art","tags":[],"dims":[[800,1200,4000,6000]],"pos":"50% 35%","cat":"original"},
  {"id":"o-1","t":"Original18","ym":"","d":"2024-03-12","lab":"Original Art","tags":[],"dims":[[1200,600,5787,2894]],"pos":"50% 35%","cat":"original","proc":[["o-1.webp",2000,1000,5787,2894]]},
  {"id":"o-8","t":"Original17","ym":"","d":"2024-03-01","lab":"Original Art","tags":[],"dims":[[856,1200,5000,7011]],"pos":"50% 35%","cat":"original"},
  {"id":"o-58","t":"Original16","ym":"","d":"2023-11-15","lab":"Original Art","tags":[],"dims":[[750,1200,4000,6400]],"pos":"50% 35%","cat":"original"},
  {"id":"o-56","t":"Original15","ym":"","d":"2023-11-15","lab":"Original Art","tags":[],"dims":[[750,1200,4000,6400]],"pos":"50% 35%","cat":"original","proc":[["o-56.webp",1000,1600,4000,6400]]},
  {"id":"o-54","t":"Original14","ym":"","d":"2023-10-30","lab":"Original Art","tags":[],"dims":[[750,1200,4000,6400]],"pos":"50% 35%","cat":"original","proc":[["o-54.webp",1000,1600,4000,6400]]},
  {"id":"o-51","t":"Original13","ym":"","d":"2023-10-25","lab":"Original Art","tags":[],"dims":[[750,1200,4000,6400]],"pos":"50% 35%","cat":"original"},
  {"id":"o-48","t":"Original12","ym":"","d":"2023-10-25","lab":"Original Art","tags":[],"dims":[[750,1200,4000,6400]],"pos":"50% 35%","cat":"original"},
  {"id":"o-53","t":"Original11","ym":"","d":"2023-10-23","lab":"Original Art","tags":[],"dims":[[750,1200,4000,6400]],"pos":"50% 35%","cat":"original"},
  {"id":"o-50","t":"Original10","ym":"","d":"2023-10-23","lab":"Original Art","tags":[],"dims":[[750,1200,4000,6400]],"pos":"50% 35%","cat":"original"},
  {"id":"o-21","t":"Original09","ym":"","d":"2023-08-06","lab":"Original Art","tags":[],"dims":[[772,1200,3000,4666]],"pos":"50% 35%","cat":"original","proc":[["o-21.webp",1000,1555,3000,4666]]},
  {"id":"o-20","t":"Original08","ym":"","d":"2023-07-23","lab":"Original Art","tags":[],"dims":[[772,1200,3000,4666]],"pos":"50% 35%","cat":"original"},
  {"id":"o-9-4","t":"Original07","ym":"","d":"2023-01-31","lab":"Original Art","tags":[],"dims":[[600,1200,3000,6000]],"pos":"50% 35%","cat":"original"},
  {"id":"o-9-3","t":"Original06","ym":"","d":"2023-01-31","lab":"Original Art","tags":[],"dims":[[600,1200,3000,6000]],"pos":"50% 35%","cat":"original"},
  {"id":"o-9-2","t":"Original05","ym":"","d":"2023-01-31","lab":"Original Art","tags":[],"dims":[[600,1200,3000,6000]],"pos":"50% 35%","cat":"original"},
  {"id":"o-p3-2","t":"Original04","ym":"","d":"2022-09-26","lab":"Original Art","tags":[],"dims":[[1200,1000,3000,2500]],"pos":"50% 35%","cat":"original"},
  {"id":"o-p2","t":"Original03","ym":"","d":"2022-08-31","lab":"Original Art","tags":[],"dims":[[857,1200,2500,3500]],"pos":"50% 35%","cat":"original"},
  {"id":"o-65","t":"Original02","ym":"","d":"2021-05-15","lab":"Original Art","tags":[],"dims":[[750,1200,2500,4000]],"pos":"50% 35%","cat":"original"},
  {"id":"o-64","t":"Original01","ym":"","d":"2021-05-15","lab":"Original Art","tags":[],"dims":[[1200,750,4000,2500]],"pos":"50% 35%","cat":"original"},
  {"id":"76899789","t":"Underwater Room","ym":"","d":"2019-09-21","lab":"Original Art","tags":["女の子","原創"],"dims":[[900,1200]],"pos":"50% 35%","cat":"original"}
];
/* works that became pieces of a collection: their old addresses (#w-<id>) open the piece (js/router.js) */
const MOVED = {"85812772":"f-suisei/4","86259443":"f-suisei/5","87418759":"f-suisei/6","88261414":"f-suisei/7"};

/* the home page carousel: every visit, and every press of Home, shows five of these works (HERO_N in home.js),
   picked and ordered at random;
   pos = the point the crop keeps in view (CSS object-position), on wide screens and phones alike;
   turn (optional) = show the picture turned 90 (clockwise) or -90 degrees; pos is then where it shows turned */
const HOME_SLIDES = [
  {"id":"139165109","pos":"80% 40%"},
  {"id":"137308455","pos":"34% 15%"},
  {"id":"146954644","pos":"36% 30%"},
  {"id":"147595537","pos":"80% 20%"},
  {"id":"137386797","pos":"42% 15%"},
  {"id":"137332578","pos":"15% 50%"},
  {"id":"142549210","pos":"35% 0%"},
  {"id":"146541232","pos":"33% 30%"},
  {"id":"137309925","pos":"10% 50%","turn":90},
  {"id":"148068024","pos":"40% 30%"}
];

/* the FF47 catalog (お品書き): with the goods, on a page of its own (#g-ff47-catalog), not on the works wall; its old
   address (#w-148499079) still leads there. ev: the event it is listed under on the goods page */
const CATALOGS = [
  {"id":"148499079","ev":"FF47","d":"2026-08-16","dims":[[1200,1200,1500,1500],[1200,1200,1500,1500],[1200,1200,1500,1500],[1200,1200,1500,1500],[1200,1200,1500,1500],[1200,1200,1500,1500],[1200,1200,1500,1500],[1200,1200,1500,1500],[1200,1200,1500,1500],[1200,1200,1500,1500]],"bg":"img/goods-bg.webp","debut":{"zh":"Fancy Frontier 47・2026.08.21–22・花博爭豔館 J44","en":"Fancy Frontier 47 · Aug 21–22, 2026 · Taipei Expo Dome, booth J44","ja":"Fancy Frontier 47・2026.08.21–22・花博争艶館 J44"}}
];
/* goods, the newest event first (ev: the event, its section on the goods page), each event in its catalog's
   order (FF47: as in its お品書き) */
const GOODS = [
  {"ev":"FF47","slug":"set-a","pg":0,"name":{"zh":"新刊套組 A","en":"New Release Set A","ja":"新刊セットA"},"eyebrow":{"zh":"2026 新刊","en":"2026 New Release","ja":"2026 新刊"},"price":100,"meta":{"zh":"fanart book ＋ 明信片組 ＋ 紙袋","en":"Fan art book + postcard set + paper bag","ja":"ファンアートブック＋ポストカードセット＋紙袋"},"list_title":"contents","items":{"zh":["202602–202608 mania8522191 fanart book（A5 橫式、全彩、12 頁）","明信片組（冰白珠光紙）","紙袋（舊款，擇一）"],"en":["202602–202608 mania8522191 fan art book (A5 landscape, full color, 12 pages)","Postcard set (ice-white pearl paper)","Paper bag (previous design, choose one)"],"ja":["202602–202608 mania8522191 ファンアートブック（A5横・フルカラー・12P）","ポストカードセット（アイスホワイトパール紙）","紙袋（旧デザイン・1種選択）"]},"works":[],"books":["ff47"],"parts":[[-34,220,667,540],[421,298,732,544],[712,637,1042,1305]]},
  {"ev":"FF47","slug":"set-b","pg":1,"name":{"zh":"新刊套組 B","en":"New Release Set B","ja":"新刊セットB"},"eyebrow":{"zh":"2026 新刊","en":"2026 New Release","ja":"2026 新刊"},"price":600,"was":800,"meta":{"zh":"新刊套組 A ＋ 壓克力畫板 2 款 ＋ 吊飾 ＋ 紙袋","en":"Set A + 2 acrylic boards + keychain + paper bag","ja":"新刊セットA＋アクリルパネル2種＋キーホルダー＋紙袋"},"list_title":"contents","items":{"zh":["新刊套組 A（fanart book、明信片組、紙袋）","miComet「シュガーラッシュ」「Lollipop」壓克力畫板 15 × 10 cm","星街すいせい「ビビデバ」壓克力畫板 15 × 10 cm","星街すいせい「星をみる少女」壓克力吊飾 6 cm","紙袋（新款，擇一）27 × 20 cm"],"en":["New Release Set A (fan art book, postcard set, paper bag)","miComet「シュガーラッシュ」「Lollipop」 acrylic board, 15 × 10 cm","星街すいせい「ビビデバ」 acrylic board, 15 × 10 cm","星街すいせい「星をみる少女」 acrylic keychain, 6 cm","Paper bag (new design, choose one), 27 × 20 cm"],"ja":["新刊セットA（ファンアートブック・ポストカードセット・紙袋）","miComet「シュガーラッシュ」「Lollipop」アクリルパネル 15×10cm","星街すいせい「ビビデバ」アクリルパネル 15×10cm","星街すいせい「星をみる少女」アクリルキーホルダー 6cm","紙袋（新デザイン・1種選択）27×20cm"]},"note":{"zh":"購買新刊套組 B，彩印簽繪板可再折 NT$50。","en":"With Set B, printed shikishi boards are NT$50 off.","ja":"新刊セットBと同時購入で、カラー色紙がNT$50引き。"},"works":["147595537","142549210","148313240"],"books":["ff47"],"parts":[[-145,-43,667,540],[-45,335,732,544],[441,209,514,376],[496,533,508,358],[865,222,194,308],[720,447,680,1004]]},
  {"ev":"FF47","slug":"sign-board","pg":2,"name":{"zh":"彩印簽繪板","en":"Printed Shikishi Board","ja":"カラー色紙"},"eyebrow":"星街すいせい・miComet・あのそよ","price":150,"unit":true,"meta":{"zh":"21 × 15 cm・4 款","en":"21 × 15 cm · 4 designs","ja":"21×15cm・全4種"},"size":"21 × 15 cm","list_title":"designs","items":["星街すいせい × 宝鐘マリン「Chatter Chatter」","miComet「シュガーラッシュ」「Lollipop」","星街すいせい「ビビデバ」","あのそよ「ブレンドの香る窓辺で」"],"note":{"zh":"購買新刊套組 B，可再折 NT$50。","en":"NT$50 off with New Release Set B.","ja":"新刊セットBと同時購入でNT$50引き。"},"works":["146954644","147595537","142549210","148068024"],"parts":[[-91,210,649,466],[92,373,653,464],[349,474,682,513],[721,374,717,579]]},
  {"ev":"FF47","slug":"acrylic-board","pg":3,"name":{"zh":"壓克力畫板","en":"Acrylic Board","ja":"アクリルパネル"},"eyebrow":"miComet・星街すいせい・あのそよ","price":300,"unit":true,"meta":{"zh":"15 × 10 cm・3 款","en":"15 × 10 cm · 3 designs","ja":"15×10cm・全3種"},"size":"15 × 10 cm","list_title":"designs","items":["miComet「シュガーラッシュ」「Lollipop」","星街すいせい「ビビデバ」","あのそよ「ブレンドの香る窓辺で」"],"works":["147595537","142549210","148068024"],"parts":[[154,289,501,392],[60,535,514,376],[630,514,510,348]]},
  {"ev":"FF47","slug":"keychain","pg":4,"name":{"zh":"壓克力吊飾","en":"Acrylic Keychain","ja":"アクリルキーホルダー"},"eyebrow":"星街すいせい・一伊那尓栖・仲町あられ","price":100,"unit":true,"meta":{"zh":"6 cm・3 款","en":"6 cm · 3 designs","ja":"6cm・全3種"},"size":"6 cm","list_title":"designs","items":["星街すいせい「星をみる少女」","厨二イナちゃん","仲町あられ"],"works":["148313240"],"parts":[[682,536,183,295],[442,294,195,307],[335,606,195,303]]},
  {"ev":"FF47","slug":"playmat","pg":5,"name":{"zh":"「Chatter Chatter」桌遊滑鼠墊","en":"「Chatter Chatter」 Playmat","ja":"「Chatter Chatter」プレイマット"},"eyebrow":"星街すいせい × 宝鐘マリン","price":600,"meta":"70 × 40 cm","size":"70 × 40 cm","note":{"zh":"比舊款長 10 cm。","en":"10 cm longer than the previous version.","ja":"旧版より10cm長くなりました。"},"works":["146954644"],"parts":[[69,292,1062,617]]},
  {"ev":"FF47","slug":"stand","pg":6,"name":{"zh":"「起点‧終点」壓克力飯友套組","en":"「起点‧終点」 Mini Acrylic Stand Set","ja":"「起点‧終点」ミニアクリルスタンドセット"},"eyebrow":"星街すいせい","price":500,"was":600,"meta":{"zh":"高 6 cm・厚 8 mm・炫彩雙面印刷","en":"6 cm tall · 8 mm thick · holographic, double-sided print","ja":"高さ6cm・厚さ8mm・オーロラ両面印刷"},"size":{"zh":"高 6 cm、厚 8 mm","en":"6 cm tall, 8 mm thick","ja":"高さ6cm・厚さ8mm"},"spec":{"zh":"炫彩、雙面印刷","en":"Holographic, double-sided print","ja":"オーロラ・両面印刷"},"works":["140064972"],"parts":[[875,455,303,319],[734,451,176,301],[506,452,285,324],[314,447,327,337],[190,462,245,306],[7,458,276,317]]},
  {"ev":"FF47","slug":"anosoyo","pg":7,"name":{"zh":"あのそよ套組","en":"AnoSoyo Set","ja":"あのそよセット"},"eyebrow":"BanG Dream!","price":400,"was":500,"meta":{"zh":"彩印簽繪板 ＋ 壓克力畫板 ＋ 紙袋","en":"Printed shikishi + acrylic board + paper bag","ja":"カラー色紙＋アクリルパネル＋紙袋"},"list_title":"contents","items":{"zh":["あのそよ「ブレンドの香る窓辺で」彩印簽繪板 21 × 15 cm","あのそよ「ブレンドの香る窓辺で」壓克力畫板 15 × 10 cm","あのそよ「ブレンドの香る窓辺で」紙袋 27 × 20 cm"],"en":["あのそよ「ブレンドの香る窓辺で」 printed shikishi, 21 × 15 cm","あのそよ「ブレンドの香る窓辺で」 acrylic board, 15 × 10 cm","あのそよ「ブレンドの香る窓辺で」 paper bag, 27 × 20 cm"],"ja":["あのそよ「ブレンドの香る窓辺で」カラー色紙 21×15cm","あのそよ「ブレンドの香る窓辺で」アクリルパネル 15×10cm","あのそよ「ブレンドの香る窓辺で」紙袋 27×20cm"]},"works":["148068024"],"parts":[[-109,298,717,579],[360,254,510,348],[558,393,890,981]]},
  {"ev":"FF47","slug":"kikan","pg":8,"name":{"zh":"既刊大禮包","en":"Back Catalog Bundle","ja":"既刊セット"},"eyebrow":{"zh":"既刊","en":"Back Catalog","ja":"既刊"},"price":700,"meta":{"zh":"既刊、資料夾、明信片組、吊飾等","en":"Back issues, clear files, postcards, keychains and more","ja":"既刊・クリアファイル・ポストカード・キーホルダーなど"},"list_title":"contents","items":{"zh":["既刊、資料夾、明信片組、吊飾⋯等","壓克力畫板（擇一）","紙袋（擇一）"],"en":["Back issues, clear files, postcard sets, keychains and more","Acrylic board (choose one)","Paper bag (choose one)"],"ja":["既刊・クリアファイル・ポストカードセット・キーホルダーなど","アクリルパネル（1種選択）","紙袋（1種選択）"]},"works":[],"parts":[[436,282,865,721],[151,187,587,639],[-59,78,384,384],[-61,298,344,345],[-51,603,322,316]]}
];

/* art books, newest first: pages[0] is the cover spread, then inside pages in order; blur = pages shown only blurred;
   works (optional) = works on this site printed in it, so their tags' pages list the book (js/tag.js) */
const BOOKS = [
  {"slug":"ff47","mat":"gloss","ev":"FF47","t":"202602- 202608 mania8522191 ART BOOK 01","size":"a5land","pp":12,"print":"color","ym":"2026.08","works":["142549210","148068024","146954644","147595537"],"pages":[[1400,493,5787,2039],[1400,493,5787,2039],[1400,493,5787,2039]]},
  {"slug":"ff46","mat":"ivory","ev":"FF46","t":"202505- 202602 HOSHIMACHI SUISEI ROUGH BOOK","size":"a5land","pp":12,"print":"color","ym":"2026.02","works":["137386797","137332578","137308455"],"pages":[[1400,493,5788,2039],[1400,493,5788,2039],[1400,493,5788,2039]]},
  {"slug":"ff45","mat":"ivory","tk":0.027,"rtl":true,"ev":"FF45","t":"mania8522191 Original R18 Manga Project ROUGH BOOK 01","size":"a4sq","pp":40,"print":"mono","ym":"2025.08","pages":[[1400,700,5787,2894],[1400,700],[1400,700]],"blur":[1,2]},
  {"slug":"ff44","mat":"ivory","tk":0.027,"ev":"FF44","t":"MIRA93 vol.5","size":"a4sq","pp":36,"print":"color","ym":"2025.02","pages":[[1400,700,5787,2894],[1400,700,5787,2893],[1400,700,5787,2893]]},
  {"slug":"ff43","mat":"ivory","foil":"blue","ev":"FF43","t":"MIRA93 vol.3.5","size":"a4sq","pp":20,"print":"color","ym":"2024.08","pages":[[1400,700,5787,2894],[1400,700,5787,2894],[1400,700,5787,2894]]},
  {"slug":"ff42","mat":"ivory","ev":"FF42","t":"MIRA93 vol.3","size":"a4sq","pp":20,"print":"color","ym":"2024.02","pages":[[1400,700,5787,2894],[1400,700,5787,2894],[1400,700,5787,2894]]},
  {"slug":"ff41","mat":"ivory","ev":"FF41","t":"MIRA93 vol.2","size":"a4sq","pp":20,"print":"color","ym":"2023.08","pages":[[1400,700,5787,2894],[1400,700,5787,2894],[1400,700,5787,2894]]},
  {"slug":"ff40","mat":"ivory","ev":"FF40","t":"MIRA93 vol.1","size":"a4sq","pp":20,"print":"color","ym":"2023.02","pages":[[1400,700,5787,2894],[1400,700,5787,2894],[1400,700,5787,2894]]},
  {"slug":"ff38","mat":"matte","ev":"FF38","t":"Fimmel: Comet2","size":"b5","pp":28,"print":"color","ym":"2022.02","pages":[[1400,988,5018,3541],[1400,988,5015,3540],[1400,988,5015,3540]]},
  {"slug":"ff37","mat":"ivory","ev":"FF37","t":"Fimmel: Comet","size":"b5","pp":20,"print":"color","ym":"2021.08","pages":[[1400,988,5018,3541],[1400,988,5015,3540],[1400,988,5015,3540]]}
];

/* the Fan Art wall's character buttons, each named as the tag its works carry (js/tag.js): "shown" always,
   "more" behind "more characters"; a name without works is left out */
const CHARACTERS = {
  "shown":["miComet","星街すいせい","あのそよ"],
  "more":["さくらみこ","宝鐘マリン","千早愛音","長崎そよ","おかころ","とこまち","がうる・ぐら","猫又おかゆ","戌神ころね","AZKi","森カリオペ","一伊那尓栖","ワトソン・アメリア","小鳥遊キアラ","戌亥とこ","天音かなた","桐生ココ","聖園ミカ","仲正イチカ","天童アリス","高垣楓","アドミラル・ヒッパー(アズールレーン)","プリンツ・オイゲン(アズールレーン)","アドミラル・グラーフ・シュペー(アズールレーン)","ドイッチュラント(アズールレーン)"]
};

/* conventions I take part in: js/event.js lists the ones not over yet as coming (the next one also on the home page),
   the rest as past. from / to: the first and last day; venue and city in each language */
const EVENTS = [
  {"name":"Fancy Frontier 48","from":"2027-02-19","to":"2027-02-21","venue":{"zh":"花博爭豔館","en":"Expo Dome","ja":"花博争艶館"},"city":{"zh":"台北","en":"Taipei","ja":"台北"}},
  {"name":"Fancy Frontier 47","from":"2026-08-21","to":"2026-08-23","venue":{"zh":"花博爭豔館","en":"Expo Dome","ja":"花博争艶館"},"city":{"zh":"台北","en":"Taipei","ja":"台北"}}
];

/* ==================== js/core.js ==================== */
/* Shared helpers: lookups, DOM shortcuts, the page views, cssUrl */
const byId = Object.fromEntries(WORKS.map((w, i) => [w.id, i]));
/* when a work was finished: its year and month (ym), or, for one without (most older works), the month it went up
   on pixiv. The wall, its year headers and a work's previous / next go by it, latest first. */
const madeOn = (w) => (w.ym ? w.ym.replace('.', '-') : w.d.slice(0, 7));
const byMade = (a, b) => madeOn(b).localeCompare(madeOn(a)) || b.d.localeCompare(a.d) || b.id.localeCompare(a.id);
const CAT_LIST = { fan: WORKS.filter((w) => w.cat === 'fan').sort(byMade), original: WORKS.filter((w) => w.cat === 'original').sort(byMade) };   // Fan Art (pixiv fan works) / Original Art
const bySlug = Object.fromEntries(GOODS.map((g, i) => [g.slug, i]));
const byBook = Object.fromEntries(BOOKS.map((b, i) => [b.slug, i]));
const evName = (ev) => `Fancy Frontier ${ev.slice(2)}`;   // an event's full name ("FF47")
const $ = (s) => document.querySelector(s);
const dot = (d) => d.replaceAll('-', '.');
const src = (id, n) => `img/${id}${n ? '_p' + n : ''}.webp`;
const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
const VIEWS = { home: $('#v-home'), works: $('#v-works'), work: $('#v-work'), tag: $('#v-tag'), goods: $('#v-goods'), catalog: $('#v-catalog'), item: $('#v-item'), artbook: $('#v-artbook'), book: $('#v-book'), game: $('#v-game'), event: $('#v-event'), about: $('#v-about'), contact: $('#v-contact'), board: $('#v-board') };

/* a page's cross-links, a line of them after its words ("這張插畫做成了周邊：A、B"); hidden when there are none.
   links: [words, address] */
function linkLine(box, words, links) {
  while (box.children.length > links.length) {
    const last = box.lastElementChild;
    last.previousSibling.remove();
    last.remove();
  }
  links.forEach(([t, href], k) => {
    let a = box.children[k];
    if (!a) { a = el('a'); box.append(document.createTextNode(''), a); }
    a.previousSibling.data = k ? tr('list.sep') : words;
    a.textContent = t;
    a.href = href;
  });
  box.hidden = !links.length;
}

/* a url() for a CSS custom property, made absolute so it points at the same file whichever stylesheet uses it */
const cssUrl = (path) => `url("${new URL(path, location.href).href}")`;

/* ==================== js/i18n.js ==================== */
/* Translations (zh / en / ja) and the helpers that pick the text in the current language */
/* ---------- languages: zh (Traditional Chinese), en, ja ---------- */
const I18N = {
  "zh": {
    "nav.main": "主選單",
    "nav.back": "上一頁",
    "home.featured": "精選作品",
    "home.dots": "切換作品",
    "home.dot": "第 {n} 張：{t}",
    "snd.label": "背景音樂",
    "works.sub": "{a} — {b} · {n} 件作品 · 點選封面看完整作品",
    "works.chars": "依角色或組合瀏覽",
    "works.moreChars": "更多角色",
    "tag.sub": "{y} · {n} 件作品",
    "tag.sub1": "{y} · 1 件作品",
    "tag.goods": "相關周邊：",
    "tag.books": "收錄畫冊：",
    "cover.pages": "{n} 張",
    "cover.video": "▶ 過程影片",
    "wk.posted": "{d} 發表",
    "wk.pages": "{n} 張",
    "wk.pixiv": "在 pixiv 查看 ↗",
    "wk.tlJump": "▶ 製作過程影片",
    "wk.imgAlt": "{t}（第 {n} 張，共 {m} 張）",
    "wk.madeGoods": "這張插畫做成了周邊：",
    "wk.others": "其他作品",
    "wk.all": "← 全部完稿",
    "wk.final": "完稿",
    "wk.sketch": "草稿",
    "wk.alt": "差分 {n}",
    "wk.finalAlt": "{t}（第 {n} 張完稿）",
    "wk.altAlt": "{t}（第 {n} 張的差分 {k}）",
    "wk.sketchAlt": "{t}（第 {n} 張的草稿）",
    "list.sep": "、",
    "tl.h": "製作過程影片",
    "tl.yt": "在 YouTube 觀看 ↗",
    "tl.play": "在 YouTube 播放：{t}",
    "yt.h": "最新繪圖直播",
    "yt.more": "在 YouTube 看更多 ↗",
    "x.h": "最新貼文",
    "sns.tip1": "最新",
    "sns.tip2": "動態",
    "x.more": "在 X 看更多 ↗",
    "x.post": "在 X 看這則貼文（{d}）",
    "x.stats": "{rt} 次轉推，{like} 個喜歡",
    "yt.stats": "{v} 次觀看，{l} 個讚",
    "goods.sub": "依場次瀏覽周邊與品書。標示為場次價格，通販價格及庫存請以各賣場為準。",
    "goods.catalog": "{ev} 品書",
    "goods.all": "全部周邊",
    "catalog.strip": "品書：左右拖曳翻頁",
    "catalog.prev": "上一張",
    "catalog.next": "下一張",
    "goods.shopName": "買動漫賣場「Mania Art」",
    "goods.shopZjm": "買動漫賣場「宅即門」馬尼 MANIA 專區",
    "goods.shopMelon": "Melonbooks 社團「Mania」",
    "goods.shopBtn": "前往賣場 ↗",
    "item.buy": "到買動漫賣場購買 ↗",
    "item.takeOut": "點圖片拿出商品",
    "item.retry": "商品圖片載入失敗，點一下重試",
    "item.putBack": "放回品書",
    "item.used": "使用插畫",
    "item.books": "內含畫冊：",
    "item.others": "其他周邊",
    "item.imgAlt": "{t}實品示意圖",
    "price.event": "場次價",
    "price.per": "／款",
    "spec.size": "尺寸",
    "spec.spec": "規格",
    "spec.contents": "內容",
    "spec.designs": "款式",
    "spec.offer": "優惠",
    "spec.debut": "首賣",
    "game.coverAlt": "遊戲的戰場背景美術",
    "game.kicker": "INDIE GAME・開發中",
    "game.tag": "組牌決策 × 魔力場站位 × 回合資源管理",
    "game.lead": "讓每一次部署，成為下一個攻擊回合的優勢。",
    "game.h": "一個人做的卡牌策略遊戲",
    "game.p1": "用 54 張牌組成你的隊伍，在格子戰場上安排角色站位，一邊守住防線、一邊找機會反擊，把對手的總血量打到歸零。",
    "game.p2": "從企劃、程式到美術，全部由 mania8522191 一個人製作。",
    "chip.strategy": "卡牌策略",
    "chip.turn": "回合制",
    "chip.dev": "開發中",
    "shots.h": "遊戲畫面",
    "shots.zoom": "放大看這張畫面",
    "shots.note": "開發中畫面，正式版可能會調整。",
    "shots.thumb": "第 {n} 張：{t}",
    "shot1": "角色：依稀有度篩選、搜尋角色卡",
    "shot2": "牌組：依卡牌類型挑選，組成 54 張牌組",
    "shot3": "召喚：選擇要部署上場的角色",
    "shot4": "卡牌詳情：數値、技能與效果說明",
    "shot5": "角色資訊：屬性與各項加成來源",
    "shot6": "事件牌：從一般事件中挑選放進牌組",
    "shot7": "攻擊階段：傷害數字直接顯示在戰場上",
    "shot8": "戰鬥紀錄：雙方傷害統計與每一步的行動紀錄",
    "feat.h": "玩法特色",
    "f1.h": "自由組牌",
    "f1.p": "角色、裝備、事件、天使與惡魔，用 54 張牌組出屬於你的戰術。",
    "f2.h": "站位決定勝負",
    "f2.p": "同一個角色，站的位置、帶的裝備不同，發揮也完全不一樣。",
    "f3.h": "每回合都是取捨",
    "f3.p": "行動點數、活力和魔力要怎麼分配，決定你下一回合的攻勢。",
    "f4.h": "生死之門",
    "f4.p": "10 回合內還沒分出勝負？雙方剩下的牌庫會被摧毀，打到有一方倒下為止。",
    "chars.h": "角色一覽",
    "chars.sub": "共 18 位角色，立繪陸續公開中。點角色可以看完整立繪；標有 CARD 的角色，滑鼠移上去會顯示卡牌。",
    "chars.tbd": "char{n} 的立繪尚未公開",
    "chars.view": "看 char{n} 的完整立繪",
    "chars.full": "char{n} 的完整立繪",
    "follow.h": "追蹤最新消息",
    "follow.p": "遊戲還在開發中，上市時間和售價都還沒決定。想第一時間知道消息，可以追蹤這些地方。",
    "about.alt": "mania8522191 的頭像：星街すいせい布偶",
    "about.photoAlt": "mania8522191 本人，拿著一杯飲料的自拍",
    "about.toPlush": "換成布偶頭像",
    "about.toPhoto": "換回本人照片",
    "about.p1": "mania8522191，以 hololive 的星街すいせい為主要題材的插畫創作者。2019 年開始在 pixiv 發表作品，內容包括紀念插畫、和其他 VTuber 的聯動圖，以及 BanG Dream!、アズールレーン 的同人創作。",
    "about.p2": "也製作周邊，曾以攤位 J44 參加台灣 Fancy Frontier 47。",
    "about.p3": "目前正一個人開發卡牌策略遊戲。",
    "about.gameLink": "看遊戲介紹 →",
    "facts.works": "件作品",
    "facts.pages": "張圖",
    "facts.since": "開始在 pixiv 發表",
    "contact.sub": "在以下平台都找得到我。作品相關的聯絡，請直接私訊。",
    "event.sub": "參加的同人展：時間與地點。",
    "ev.next": "即將參加",
    "ev.past": "已結束",
    "ev.hero": "下一場參加的展場：{n}，{d}，{p}",
    "grp.social": "社群",
    "grp.works": "作品",
    "grp.shop": "周邊",
    "grp.mail": "信箱",
    "h.fbPage": "mania8522191・粉絲專頁",
    "h.discord": "加入伺服器",
    "h.shop": "賣場 217467",
    "h.zjm": "宅即門・馬尼 MANIA",
    "h.circle": "社團 Mania",
    "ch.baha": "巴哈姆特",
    "ch.myacg": "買動漫",
    "ch.melon": "Melonbooks",
    "foot.nav": "社群與作品平台",
    "foot.fbPage": "Facebook（粉專）",
    "foot.fbPersonal": "Facebook（個人）",
    "foot.baha": "巴哈姆特",
    "foot.myacg": "買動漫",
    "foot.copy": "© 2019–2026 mania8522191 · 插畫可轉載，請附上來源與原作者",
    "foot.ai": "本網站架設與背景音樂，有使用AI輔助工具：Claude、Suno",
    "zv.label": "圖片檢視",
    "zv.zoom": "顯示實際尺寸(100%)",
    "zv.unzoom": "符合視窗({p}%)",
    "zv.prev": "上一張",
    "zv.next": "下一張",
    "zv.min": "縮到最小",
    "zv.dock": "縮到最小的圖片",
    "zv.max": "最大化",
    "zv.unmax": "還原大小",
    "zv.close": "關閉",
    "zv.hint": "滾輪縮放 · 拖曳移動 · 點一下放大或縮回",
    "zv.hintTouch": "點圖片放大，再點一下縮回",
    "zv.load": "載入高解析度⋯",
    "zv.workAlt": "{t}（第 {n} 張）",
    "proc.h": "製作過程",
    "proc.alt": "{t} 的製作過程",
    "cards.h": "卡牌一覽",
    "cards.sub": "左右滑動看更多卡牌，點卡牌可以放大。",
    "cards.prev": "上一組卡牌",
    "cards.next": "下一組卡牌",
    "cards.alt": "{c}卡「{name}」",
    "cards.view": "放大看卡牌「{name}」（{c}，第 {n} 張，共 {m} 張）",
    "cat.equip": "一般裝備",
    "cat.event": "一般事件",
    "cat.angel": "天使",
    "cat.demon": "惡魔",
    "cat.oracle": "神諭",
    "cat.summon": "召喚",
    "chars.viewPair": "看 char{n} 的立繪和卡牌",
    "chars.pairAlt": "char{n} 的完整立繪（左）和卡牌（右）",
    "deck.equip": "一般裝備",
    "deck.event": "一般事件",
    "deck.contract": "天使‧惡魔",
    "deck.oracle": "神諭‧召喚",
    "pair.art": "立繪",
    "pair.card": "卡牌",
    "h.personal": "個人帳號",
    "h.deactivated": "已停用",
    "cur.home": "精選作品",
    "cur.works": "插畫作品",
    "cur.goods": "周邊商品",
    "cur.game": "獨立遊戲",
    "cur.about": "關於我",
    "cur.contact": "聯絡方式",
    "cur.board": "留言板",
    "board.sub": "留下想說的話，或貼上你畫的圖讓我幫你改圖。每則留言都會先經過我審核，通過後才會公開在這裡。",
    "board.write": "寫留言",
    "board.name": "暱稱",
    "board.text": "留言",
    "board.addPic": "加入圖片",
    "board.picHint": "最多 4 張，也可以直接拖進來或貼上",
    "board.rule1": "送出後要先經過我審核，通過才會公開。",
    "board.rule2": "只上傳你自己畫的圖。",
    "board.rule3": "上傳圖片，就表示同意它公開在這裡，也同意我在回覆裡修改示範。",
    "board.send": "送出",
    "board.sending": "傳送中… {p}%",
    "board.sent": "已送出！審核通過後就會出現在這裡。",
    "board.posts": "留言",
    "board.empty": "還沒有公開的留言。",
    "board.more": "看更早的留言",
    "board.reply": "站主回覆",
    "board.before": "原圖",
    "board.after": "改圖",
    "board.cmp": "原圖和改圖的分界：左右拖曳或按方向鍵移動",
    "board.zoom": "放大看改圖",
    "board.remove": "移除這張圖",
    "board.orig": "下載原檔",
    "board.review": "審核留言",
    "board.pw": "審核密碼",
    "board.login": "登入",
    "board.waiting": "待審核",
    "board.shown": "已公開",
    "board.logout": "登出",
    "board.none": "這裡沒有留言。",
    "board.accept": "接受並公開",
    "board.delete": "刪除",
    "board.sure": "確定要刪除這則留言和它的圖片嗎？刪除後無法復原。",
    "board.replyEdit": "回覆／改圖",
    "board.save": "儲存回覆",
    "board.saved": "已儲存。",
    "board.e.name": "請填暱稱。",
    "board.e.empty": "請寫點什麼，或加入圖片。",
    "board.e.long": "文字太長了。",
    "board.e.pics": "圖片最多 4 張。",
    "board.e.pic": "有一張圖打不開，請換一張試試。",
    "board.e.big": "圖片太大了。",
    "board.e.human": "驗證沒有通過，請再試一次。",
    "board.e.wait": "請等驗證完成再送出。",
    "board.e.slow": "短時間內送太多則了，請過一陣子再試。",
    "board.e.full": "待審核的留言太多了，請過幾天再來。",
    "board.e.net": "連不上留言板，請稍後再試。",
    "board.e.password": "密碼不對。",
    "board.e.auth": "請重新登入。",
    "board.e.setup": "後台還沒設定審核密碼。",
    "board.e.gone": "這則留言已經不在了。",
    "board.e.server": "出了點問題，請稍後再試。",
    "cur.event": "參加展場",
    "years.nav": "依年份瀏覽",
    "years.go": "跳到 {y} 年",
    "wall.count": "{n} 件",
    "works.cats": "作品分類",
    "wk.made": "{d} 完成",
    "works.sort": "排序",
    "sort.new": "由新到舊",
    "sort.old": "由舊到新",
    "sort.label": "排序：{v}",
    "nsfw.sub": "18 歲以上 · 預覽已模糊處理 · 完整作品放在雲端相簿",
    "nsfw.note": "成人向作品不直接放在網站上。點圖片或下方按鈕，到 Google 雲端相簿看完整作品。",
    "nsfw.go": "前往 Google 雲端相簿",
    "nsfw.alt": "模糊處理的成人向作品預覽",
    "cur.artbook": "畫冊",
    "ab.sub": "{a} — {b} · {n} 本畫冊 · 點選封面看內頁",
    "ab.count": "{n} 本",
    "ab.card": "{t} 畫冊（{d}）",
    "bk.date": "{d} 發行",
    "bk.goods": "這本畫冊收錄在周邊：",
    "bk.pageAlt": "{t} 內頁（第 {n} 張）",
    "bk.coverAlt": "{t} 封面與封底",
    "bk.blurAlt": "{t} 內頁（成人向，已模糊處理）",
    "bk.others": "其他畫冊",
    "bk.pv": "預覽",
    "bk.r18": "這本是成人向作品，內頁已模糊處理。",
    "b3.open": "點擊放大，可 360° 旋轉",
    "b3.book": "{t} 封面與封底：點擊放大，可 360° 旋轉",
    "b3.label": "畫冊 3D 檢視",
    "b3.reset": "還原角度",
    "b3.hint": "左鍵拖曳移動 · 右鍵拖曳旋轉 · 滾輪縮放 · 點兩下還原",
    "b3.hintTouch": "拖曳旋轉 · 兩指縮放、移動 · 點兩下還原",
    "bk.spec": "規格",
    "bk.spec.size": "尺寸",
    "bk.spec.pages": "頁數",
    "bk.spec.print": "印刷",
    "bk.spec.cover": "封面用紙",
    "bk.size.a4sq": "A4 正方形",
    "bk.size.b5": "B5",
    "bk.size.a5land": "A5 橫式",
    "bk.pp": "{n} 頁",
    "bk.print.color": "全彩",
    "bk.print.mono": "黑白",
    "bk.mat.gloss": "銅版紙 · 亮膜",
    "bk.mat.matte": "銅版紙 · 霧膜",
    "bk.mat.ivory": "象牙紙",
    "bk.foil.blue": " · 燙藍"
  },
  "en": {
    "nav.main": "Main menu",
    "nav.back": "Back",
    "home.featured": "Featured works",
    "home.dots": "Choose a work",
    "home.dot": "Slide {n}: {t}",
    "snd.label": "Background music",
    "works.sub": "{a} — {b} · {n} works · Click a cover to see the full piece",
    "works.chars": "Browse by character or duo",
    "works.moreChars": "More characters",
    "tag.sub": "{y} · {n} works",
    "tag.sub1": "{y} · 1 work",
    "tag.goods": "Related goods: ",
    "tag.books": "In the art books: ",
    "cover.pages": "{n} images",
    "cover.video": "▶ Timelapse",
    "wk.posted": "Posted {d}",
    "wk.pages": "{n} images",
    "wk.pixiv": "View on pixiv ↗",
    "wk.tlJump": "▶ Process timelapse",
    "wk.imgAlt": "{t} (image {n} of {m})",
    "wk.madeGoods": "Made into goods: ",
    "wk.others": "Other works",
    "wk.all": "← All pieces",
    "wk.final": "Final",
    "wk.sketch": "Sketch",
    "wk.alt": "Variant {n}",
    "wk.finalAlt": "{t} (piece {n})",
    "wk.altAlt": "{t} (variant {k} of piece {n})",
    "wk.sketchAlt": "{t} (sketch for piece {n})",
    "list.sep": ", ",
    "tl.h": "Process timelapse",
    "tl.yt": "Watch on YouTube ↗",
    "tl.play": "Play on YouTube: {t}",
    "yt.h": "Latest drawing streams",
    "yt.more": "More on YouTube ↗",
    "x.h": "Latest posts",
    "sns.tip1": "What’s",
    "sns.tip2": "new",
    "x.more": "More on X ↗",
    "x.post": "View this post on X ({d})",
    "x.stats": "{rt} reposts, {like} likes",
    "yt.stats": "{v} views, {l} likes",
    "goods.sub": "Browse goods and catalogs by event. Prices are from the event. See each shop for current prices and stock.",
    "goods.catalog": "{ev} Catalog",
    "goods.all": "All goods",
    "catalog.strip": "Catalog: drag sideways to turn the pages",
    "catalog.prev": "Previous page",
    "catalog.next": "Next page",
    "goods.shopName": "MyACG shop “Mania Art”",
    "goods.shopZjm": "MyACG shop “宅即門” · 馬尼 MANIA",
    "goods.shopMelon": "Melonbooks circle “Mania”",
    "goods.shopBtn": "Visit the shop ↗",
    "item.buy": "Buy at the MyACG shop ↗",
    "item.takeOut": "Click the picture to take the goods out",
    "item.retry": "The product images could not load. Click to retry.",
    "item.putBack": "Put them back",
    "item.used": "Artwork used",
    "item.books": "Art book inside: ",
    "item.others": "Other goods",
    "item.imgAlt": "{t} product shot",
    "price.event": "event price",
    "price.per": " / design",
    "spec.size": "Size",
    "spec.spec": "Specs",
    "spec.contents": "Contents",
    "spec.designs": "Designs",
    "spec.offer": "Offer",
    "spec.debut": "Debut",
    "game.coverAlt": "Battlefield background art from the game",
    "game.kicker": "INDIE GAME · IN DEVELOPMENT",
    "game.tag": "Deckbuilding × Mana-field positioning × Turn resource management",
    "game.lead": "Make every deployment your edge in the next attack turn.",
    "game.h": "A card strategy game made by one person",
    "game.p1": "Build your team from a 54-card deck and position your characters on a grid battlefield. Hold the line, look for the moment to strike back, and bring your opponent's total HP down to zero.",
    "game.p2": "Planning, programming and art: everything is made by mania8522191 alone.",
    "chip.strategy": "Card strategy",
    "chip.turn": "Turn-based",
    "chip.dev": "In development",
    "shots.h": "Screenshots",
    "shots.zoom": "View this screenshot larger",
    "shots.note": "In-development footage; the final game may differ.",
    "shots.thumb": "Screenshot {n}: {t}",
    "shot1": "Characters: filter and search character cards by rarity",
    "shot2": "Deck: pick cards by type to build a 54-card deck",
    "shot3": "Summon: choose which characters to deploy",
    "shot4": "Card details: stats, skills and effects",
    "shot5": "Character info: attributes and where each bonus comes from",
    "shot6": "Event cards: choose general events for your deck",
    "shot7": "Attack phase: damage numbers appear right on the battlefield",
    "shot8": "Battle log: damage totals for both sides and a step-by-step record",
    "feat.h": "Features",
    "f1.h": "Build your deck",
    "f1.p": "Characters, equipment, events, angels and demons: build your own tactics from 54 cards.",
    "f2.h": "Position wins battles",
    "f2.p": "The same character plays completely differently depending on where it stands and what it carries.",
    "f3.h": "Every turn is a trade-off",
    "f3.p": "How you spend action points, energy and mana decides the strength of your next attack.",
    "f4.h": "Gate of Life and Death",
    "f4.p": "No winner after 10 turns? Both remaining decks are destroyed, and the fight goes on until one side falls.",
    "chars.h": "Characters",
    "chars.sub": "18 characters, with more art revealed over time. Click a character to see the full art; hover over those marked CARD to see their card.",
    "chars.tbd": "Art for char{n} is not revealed yet",
    "chars.view": "View the full art of char{n}",
    "chars.full": "Full art of char{n}",
    "follow.h": "Follow the development",
    "follow.p": "The game is still in development, and the release date and price are not decided yet. Follow along here to hear the news first.",
    "about.alt": "mania8522191's avatar: a Hoshimachi Suisei plush",
    "about.photoAlt": "mania8522191, a selfie holding a drink",
    "about.toPlush": "Show the plush avatar",
    "about.toPhoto": "Show my photo",
    "about.p1": "mania8522191 is an illustrator who mainly draws hololive's Hoshimachi Suisei. Posting on pixiv since 2019, with commemorative illustrations, collaborations with other VTubers, and fan art of BanG Dream! and Azur Lane.",
    "about.p2": "Also makes goods, and exhibited at Fancy Frontier 47 in Taiwan (booth J44).",
    "about.p3": "Currently developing a card strategy game solo. ",
    "about.gameLink": "See the game →",
    "facts.works": "works",
    "facts.pages": "images",
    "facts.since": "first pixiv post",
    "contact.sub": "You can find me on all of these platforms. For anything about my work, please send a direct message.",
    "event.sub": "The conventions I take part in: dates and venues.",
    "ev.next": "Upcoming",
    "ev.past": "Past",
    "ev.hero": "Next convention: {n}, {d}, {p}",
    "grp.social": "Social",
    "grp.works": "Portfolio",
    "grp.shop": "Goods",
    "grp.mail": "Email",
    "h.fbPage": "mania8522191 · Page",
    "h.discord": "Join the server",
    "h.shop": "Shop 217467",
    "h.zjm": "宅即門 · 馬尼 MANIA",
    "h.circle": "Circle Mania",
    "ch.baha": "Bahamut",
    "ch.myacg": "MyACG",
    "ch.melon": "Melonbooks",
    "foot.nav": "Social and portfolio links",
    "foot.fbPage": "Facebook (Page)",
    "foot.fbPersonal": "Facebook (Personal)",
    "foot.baha": "Bahamut",
    "foot.myacg": "MyACG",
    "foot.copy": "© 2019–2026 mania8522191 · Art may be reposted with credit to the source and the original artist",
    "foot.ai": "This site and its background music were made with the help of AI tools: Claude, Suno",
    "zv.label": "Image viewer",
    "zv.zoom": "Actual size (100%)",
    "zv.unzoom": "Fit to window ({p}%)",
    "zv.prev": "Previous",
    "zv.next": "Next",
    "zv.min": "Minimize",
    "zv.dock": "Minimized pictures",
    "zv.max": "Maximize",
    "zv.unmax": "Restore size",
    "zv.close": "Close",
    "zv.hint": "Scroll to zoom · Drag to move · Click to zoom in or back",
    "zv.hintTouch": "Tap the picture to zoom in, tap again to zoom out",
    "zv.load": "Loading full resolution…",
    "zv.workAlt": "{t} (image {n})",
    "proc.h": "Process",
    "proc.alt": "{t}: work in progress",
    "cards.h": "Cards",
    "cards.sub": "Swipe sideways to see more cards; click a card to enlarge it.",
    "cards.prev": "Previous cards",
    "cards.next": "Next cards",
    "cards.alt": "{c} card “{name}”",
    "cards.view": "Enlarge “{name}” ({c}, card {n} of {m})",
    "cat.equip": "Equipment",
    "cat.event": "Event",
    "cat.angel": "Angel",
    "cat.demon": "Demon",
    "cat.oracle": "Oracle",
    "cat.summon": "Summon",
    "chars.viewPair": "View char{n}: full art and card",
    "chars.pairAlt": "char{n}: full art (left) and card (right)",
    "deck.equip": "Equipment",
    "deck.event": "Events",
    "deck.contract": "Angel · Demon",
    "deck.oracle": "Oracle · Summon",
    "pair.art": "Artwork",
    "pair.card": "Card",
    "h.personal": "Personal account",
    "h.deactivated": "Deactivated",
    "cur.home": "Featured works",
    "cur.works": "Illustrations",
    "cur.goods": "Merchandise",
    "cur.game": "Indie card game",
    "cur.about": "About the artist",
    "cur.contact": "Get in touch",
    "cur.board": "Message board",
    "board.sub": "Leave a message, or post a drawing of yours for me to paint over and give feedback on. Every post is reviewed first and shows up here once approved.",
    "board.write": "Write a post",
    "board.name": "Name",
    "board.text": "Message",
    "board.addPic": "Add pictures",
    "board.picHint": "Up to 4. You can also drop or paste them here.",
    "board.rule1": "Posts appear only after I have reviewed and approved them.",
    "board.rule2": "Only post drawings you made yourself.",
    "board.rule3": "By posting a picture, you agree to it being shown here and to me painting over it in my reply.",
    "board.send": "Send",
    "board.sending": "Sending… {p}%",
    "board.sent": "Sent! It will appear here once approved.",
    "board.posts": "Posts",
    "board.empty": "No posts yet.",
    "board.more": "Older posts",
    "board.reply": "Reply",
    "board.before": "Original",
    "board.after": "Paintover",
    "board.cmp": "Divider between the original and the paintover: drag sideways or use the arrow keys",
    "board.zoom": "View the paintover larger",
    "board.remove": "Remove this picture",
    "board.orig": "Download the file",
    "board.review": "Review posts",
    "board.pw": "Review password",
    "board.login": "Log in",
    "board.waiting": "Waiting",
    "board.shown": "Shown",
    "board.logout": "Log out",
    "board.none": "Nothing here.",
    "board.accept": "Accept and show",
    "board.delete": "Delete",
    "board.sure": "Delete this post and its pictures? This can't be undone.",
    "board.replyEdit": "Reply / paintover",
    "board.save": "Save reply",
    "board.saved": "Saved.",
    "board.e.name": "Please enter a name.",
    "board.e.empty": "Write something or add a picture.",
    "board.e.long": "That's too long.",
    "board.e.pics": "4 pictures at most.",
    "board.e.pic": "One of the pictures can't be opened. Try another.",
    "board.e.big": "A picture is too large.",
    "board.e.human": "The check didn't pass. Please try again.",
    "board.e.wait": "Please wait for the check to finish, then send.",
    "board.e.slow": "Too many posts in a short time. Please try again later.",
    "board.e.full": "Too many posts are waiting for review. Please come back in a few days.",
    "board.e.net": "Can't reach the board. Please try again later.",
    "board.e.password": "Wrong password.",
    "board.e.auth": "Please log in again.",
    "board.e.setup": "The review password hasn't been set up yet.",
    "board.e.gone": "This post is gone.",
    "board.e.server": "Something went wrong. Please try again later.",
    "cur.event": "Conventions",
    "years.nav": "Browse by year",
    "years.go": "Jump to {y}",
    "wall.count": "{n} works",
    "works.cats": "Work categories",
    "wk.made": "Completed {d}",
    "works.sort": "Sort order",
    "sort.new": "Newest first",
    "sort.old": "Oldest first",
    "sort.label": "Sort order: {v}",
    "nsfw.sub": "18+ only · Previews are blurred · The full works are in the cloud album",
    "nsfw.note": "Adult works are not shown on this site. Open the Google Drive album to see them in full.",
    "nsfw.go": "Open the Google Drive album",
    "nsfw.alt": "Blurred preview of an adult work",
    "cur.artbook": "Art books",
    "ab.sub": "{a} — {b} · {n} art books · Click a cover to look inside",
    "ab.count": "{n} books",
    "ab.card": "{t} art book ({d})",
    "bk.date": "Released {d}",
    "bk.goods": "Included in: ",
    "bk.pageAlt": "{t}: inside pages ({n})",
    "bk.coverAlt": "{t}: front and back cover",
    "bk.blurAlt": "{t}: inside pages (adult content, blurred)",
    "bk.others": "Other art books",
    "bk.pv": "Preview",
    "bk.r18": "This book is adult content; its inside pages are blurred.",
    "b3.open": "Click to enlarge and turn it 360°",
    "b3.book": "{t}: front and back cover. Click to enlarge and turn it 360°",
    "b3.label": "Art book 3D view",
    "b3.reset": "Reset view",
    "b3.hint": "Drag to move · Right-drag to rotate · Scroll to zoom · Double-click to reset",
    "b3.hintTouch": "Drag to rotate · Pinch to zoom and move · Double-tap to reset",
    "bk.spec": "Specifications",
    "bk.spec.size": "Size",
    "bk.spec.pages": "Pages",
    "bk.spec.print": "Printing",
    "bk.spec.cover": "Cover",
    "bk.size.a4sq": "A4 square",
    "bk.size.b5": "B5",
    "bk.size.a5land": "A5 landscape",
    "bk.pp": "{n} pages",
    "bk.print.color": "Full color",
    "bk.print.mono": "Black & white",
    "bk.mat.gloss": "Coated paper · gloss laminate",
    "bk.mat.matte": "Coated paper · matte laminate",
    "bk.mat.ivory": "Ivory paper",
    "bk.foil.blue": " · blue foil"
  },
  "ja": {
    "nav.main": "メインメニュー",
    "nav.back": "戻る",
    "home.featured": "ピックアップ作品",
    "home.dots": "作品を切り替える",
    "home.dot": "{n}枚目：{t}",
    "snd.label": "BGM",
    "works.sub": "{a} — {b} · 全{n}作品 · 表紙をクリックすると作品ページを開きます",
    "works.chars": "キャラクター・ユニットから探す",
    "works.moreChars": "もっと見る",
    "tag.sub": "{y} · 全{n}作品",
    "tag.sub1": "{y} · 1作品",
    "tag.goods": "関連グッズ：",
    "tag.books": "収録アートブック：",
    "cover.pages": "{n}枚",
    "cover.video": "▶ メイキング",
    "wk.posted": "{d} 投稿",
    "wk.pages": "{n}枚",
    "wk.pixiv": "pixivで見る ↗",
    "wk.tlJump": "▶ メイキング動画",
    "wk.imgAlt": "{t}（{m}枚中{n}枚目）",
    "wk.madeGoods": "グッズ化：",
    "wk.others": "ほかの作品",
    "wk.all": "← 完成イラスト一覧",
    "wk.final": "完成",
    "wk.sketch": "ラフ",
    "wk.alt": "差分{n}",
    "wk.finalAlt": "{t}（{n}枚目）",
    "wk.altAlt": "{t}（{n}枚目の差分{k}）",
    "wk.sketchAlt": "{t}（{n}枚目のラフ）",
    "list.sep": "、",
    "tl.h": "メイキング動画",
    "tl.yt": "YouTubeで見る ↗",
    "tl.play": "YouTubeで再生：{t}",
    "yt.h": "最新のお絵描き配信",
    "yt.more": "YouTubeでもっと見る ↗",
    "x.h": "最新のポスト",
    "sns.tip1": "最新",
    "sns.tip2": "情報",
    "x.more": "Xでもっと見る ↗",
    "x.post": "Xでこのポストを見る（{d}）",
    "x.stats": "リポスト {rt}・いいね {like}",
    "yt.stats": "{v} 回視聴・高評価 {l}",
    "goods.sub": "イベント別のグッズとお品書き。表示はイベント頒布価格です。通販価格と在庫は各ショップでご確認ください。",
    "goods.catalog": "{ev} お品書き",
    "goods.all": "グッズ一覧",
    "catalog.strip": "お品書き：左右にドラッグしてめくる",
    "catalog.prev": "前のページ",
    "catalog.next": "次のページ",
    "goods.shopName": "買動漫（MyACG）ショップ「Mania Art」",
    "goods.shopZjm": "買動漫（MyACG）ショップ「宅即門」馬尼 MANIA",
    "goods.shopMelon": "メロンブックス サークル「Mania」",
    "goods.shopBtn": "ショップへ ↗",
    "item.buy": "買動漫ショップで購入 ↗",
    "item.takeOut": "画像をクリックしてグッズを取り出す",
    "item.retry": "商品画像を読み込めませんでした。タップして再試行してください。",
    "item.putBack": "お品書きに戻す",
    "item.used": "使用イラスト",
    "item.books": "収録アートブック：",
    "item.others": "ほかのグッズ",
    "item.imgAlt": "{t}の商品イメージ",
    "price.event": "イベント価格",
    "price.per": "／1種",
    "spec.size": "サイズ",
    "spec.spec": "仕様",
    "spec.contents": "内容",
    "spec.designs": "種類",
    "spec.offer": "特典",
    "spec.debut": "初頒布",
    "game.coverAlt": "ゲームの戦場背景アート",
    "game.kicker": "INDIE GAME・開発中",
    "game.tag": "デッキ構築 × 魔力場の位置取り × ターンごとの資源管理",
    "game.lead": "ひとつひとつの配置を、次の攻撃ターンの優位に。",
    "game.h": "ひとりで作るカードストラテジーゲーム",
    "game.p1": "54枚のデッキでチームを編成し、マス目の戦場にキャラクターを配置。防衛ラインを守りながら反撃のチャンスをうかがい、相手の総HPをゼロにしましょう。",
    "game.p2": "企画・プログラム・イラストまで、すべて mania8522191 がひとりで制作しています。",
    "chip.strategy": "カードストラテジー",
    "chip.turn": "ターン制",
    "chip.dev": "開発中",
    "shots.h": "ゲーム画面",
    "shots.zoom": "この画面を拡大して見る",
    "shots.note": "開発中の画面です。製品版では変更される場合があります。",
    "shots.thumb": "{n}枚目：{t}",
    "shot1": "キャラクター：レアリティで絞り込み・キャラカードを検索",
    "shot2": "デッキ：カードの種類ごとに選んで54枚のデッキを構築",
    "shot3": "召喚：戦場に配置するキャラクターを選択",
    "shot4": "カード詳細：ステータス・スキル・効果の説明",
    "shot5": "キャラクター情報：属性と各ボーナスの内訳",
    "shot6": "イベントカード：一般イベントから選んでデッキに追加",
    "shot7": "攻撃フェーズ：ダメージがそのまま戦場に表示",
    "shot8": "バトルログ：両陣営のダメージ集計と行動の記録",
    "feat.h": "ゲームの特徴",
    "f1.h": "自由なデッキ構築",
    "f1.p": "キャラクター、装備、イベント、天使と悪魔。54枚で自分だけの戦術を組み立てよう。",
    "f2.h": "位置取りが勝負を決める",
    "f2.p": "同じキャラクターでも、立つ位置や装備によって活躍がまったく変わります。",
    "f3.h": "毎ターンが取捨選択",
    "f3.p": "行動ポイント、活力、魔力をどう配分するかが、次のターンの攻勢を左右します。",
    "f4.h": "生死の門",
    "f4.p": "10ターンで決着がつかなければ、双方の残りの山札が破壊され、どちらかが倒れるまで戦いは続きます。",
    "chars.h": "キャラクター",
    "chars.sub": "全18キャラクター。立ち絵は順次公開中です。クリックで立ち絵全体を表示、CARD の付いたキャラクターはマウスを乗せるとカードが見られます。",
    "chars.tbd": "char{n} の立ち絵は未公開です",
    "chars.view": "char{n} の立ち絵を見る",
    "chars.full": "char{n} の立ち絵",
    "follow.h": "最新情報をチェック",
    "follow.p": "ゲームは開発中で、発売時期・価格は未定です。最新情報をいち早く知りたい方は、こちらをフォローしてください。",
    "about.alt": "mania8522191 のアイコン：星街すいせいのぬいぐるみ",
    "about.photoAlt": "mania8522191 本人、ドリンクを手にした自撮り",
    "about.toPlush": "ぬいぐるみのアイコンに切り替え",
    "about.toPhoto": "本人の写真に切り替え",
    "about.p1": "hololive の星街すいせいを中心に描いているイラストレーターです。2019年から pixiv に作品を投稿しており、記念イラストや他の VTuber とのコラボイラスト、BanG Dream!・アズールレーンのファンアートなどを描いています。",
    "about.p2": "グッズ制作も行っており、台湾の Fancy Frontier 47 にサークル参加しました（スペース J44）。",
    "about.p3": "現在、カードストラテジーゲームを個人で開発中です。",
    "about.gameLink": "ゲーム紹介へ →",
    "facts.works": "作品",
    "facts.pages": "枚のイラスト",
    "facts.since": "pixiv 投稿開始",
    "contact.sub": "以下のプラットフォームで活動しています。作品に関するご連絡は、各SNSのDMまでお願いします。",
    "event.sub": "参加するイベントの日程と会場です。",
    "ev.next": "参加予定",
    "ev.past": "終了したイベント",
    "ev.hero": "次の参加イベント：{n}、{d}、{p}",
    "grp.social": "SNS",
    "grp.works": "作品",
    "grp.shop": "グッズ",
    "grp.mail": "メール",
    "h.fbPage": "mania8522191・ページ",
    "h.discord": "サーバーに参加",
    "h.shop": "ショップ 217467",
    "h.zjm": "宅即門・馬尼 MANIA",
    "h.circle": "サークル Mania",
    "ch.baha": "巴哈姆特（バハムート）",
    "ch.myacg": "買動漫（MyACG）",
    "ch.melon": "メロンブックス",
    "foot.nav": "SNS・作品リンク",
    "foot.fbPage": "Facebook（ページ）",
    "foot.fbPersonal": "Facebook（個人）",
    "foot.baha": "巴哈姆特",
    "foot.myacg": "買動漫",
    "foot.copy": "© 2019–2026 mania8522191 · イラストの転載可（出典と原作者の明記をお願いします）",
    "foot.ai": "本サイトの制作とBGMには、AI補助ツールを使用しています：Claude、Suno",
    "zv.label": "画像ビューア",
    "zv.zoom": "実寸表示(100%)",
    "zv.unzoom": "ウィンドウに合わせる({p}%)",
    "zv.prev": "前へ",
    "zv.next": "次へ",
    "zv.min": "最小化",
    "zv.dock": "最小化した画像",
    "zv.max": "最大化",
    "zv.unmax": "元のサイズに戻す",
    "zv.close": "閉じる",
    "zv.hint": "ホイールで拡大・縮小 · ドラッグで移動 · クリックで拡大／元に戻す",
    "zv.hintTouch": "画像をタップで拡大、もう一度タップで元に戻ります",
    "zv.load": "高解像度を読み込み中…",
    "zv.workAlt": "{t}（{n}枚目）",
    "proc.h": "制作過程",
    "proc.alt": "{t} の制作過程",
    "cards.h": "カード一覧",
    "cards.sub": "左右にスワイプしてカードを見られます。カードをクリックすると拡大します。",
    "cards.prev": "前のカード",
    "cards.next": "次のカード",
    "cards.alt": "{c}カード「{name}」",
    "cards.view": "カード「{name}」を拡大（{c}・{m}枚中{n}枚目）",
    "cat.equip": "一般装備",
    "cat.event": "一般イベント",
    "cat.angel": "天使",
    "cat.demon": "悪魔",
    "cat.oracle": "神託",
    "cat.summon": "召喚",
    "chars.viewPair": "char{n} の立ち絵とカードを見る",
    "chars.pairAlt": "char{n} の立ち絵（左）とカード（右）",
    "deck.equip": "一般装備",
    "deck.event": "一般イベント",
    "deck.contract": "天使・悪魔",
    "deck.oracle": "神託・召喚",
    "pair.art": "立ち絵",
    "pair.card": "カード",
    "h.personal": "個人アカウント",
    "h.deactivated": "利用停止中",
    "cur.home": "ピックアップ作品",
    "cur.works": "イラスト作品",
    "cur.goods": "グッズ",
    "cur.game": "インディーゲーム",
    "cur.about": "プロフィール",
    "cur.contact": "コンタクト",
    "cur.board": "掲示板",
    "board.sub": "メッセージや、添削してほしいイラストを投稿できます。投稿は確認のうえ、承認されるとここに公開されます。",
    "board.write": "投稿する",
    "board.name": "ニックネーム",
    "board.text": "メッセージ",
    "board.addPic": "画像を追加",
    "board.picHint": "4枚まで。ドラッグ＆ドロップや貼り付けもできます",
    "board.rule1": "投稿は確認後、承認されてから公開されます。",
    "board.rule2": "ご自身で描いたイラストのみ投稿してください。",
    "board.rule3": "画像を投稿すると、ここでの公開と、返信での添削（加筆）に同意したものとみなします。",
    "board.send": "送信",
    "board.sending": "送信中… {p}%",
    "board.sent": "送信しました。承認後にここに表示されます。",
    "board.posts": "投稿",
    "board.empty": "まだ投稿はありません。",
    "board.more": "以前の投稿",
    "board.reply": "返信",
    "board.before": "元の絵",
    "board.after": "添削",
    "board.cmp": "元の絵と添削の境目：左右にドラッグするか矢印キーで動かせます",
    "board.zoom": "添削を拡大して見る",
    "board.remove": "この画像を外す",
    "board.orig": "元ファイルを保存",
    "board.review": "投稿の確認",
    "board.pw": "管理パスワード",
    "board.login": "ログイン",
    "board.waiting": "確認待ち",
    "board.shown": "公開中",
    "board.logout": "ログアウト",
    "board.none": "ここには投稿がありません。",
    "board.accept": "承認して公開",
    "board.delete": "削除",
    "board.sure": "この投稿と画像を削除しますか？元に戻せません。",
    "board.replyEdit": "返信・添削",
    "board.save": "返信を保存",
    "board.saved": "保存しました。",
    "board.e.name": "ニックネームを入力してください。",
    "board.e.empty": "メッセージを書くか、画像を追加してください。",
    "board.e.long": "文章が長すぎます。",
    "board.e.pics": "画像は4枚までです。",
    "board.e.pic": "開けない画像があります。別の画像でお試しください。",
    "board.e.big": "画像が大きすぎます。",
    "board.e.human": "確認に失敗しました。もう一度お試しください。",
    "board.e.wait": "確認が終わるまでお待ちください。",
    "board.e.slow": "短時間に投稿が多すぎます。しばらくしてからお試しください。",
    "board.e.full": "確認待ちの投稿が多すぎます。数日後にお試しください。",
    "board.e.net": "掲示板に接続できません。しばらくしてからお試しください。",
    "board.e.password": "パスワードが違います。",
    "board.e.auth": "もう一度ログインしてください。",
    "board.e.setup": "管理パスワードがまだ設定されていません。",
    "board.e.gone": "この投稿は削除されています。",
    "board.e.server": "エラーが発生しました。しばらくしてからお試しください。",
    "cur.event": "参加イベント",
    "years.nav": "年ごとに見る",
    "years.go": "{y}年へ移動",
    "wall.count": "{n}作品",
    "works.cats": "作品カテゴリー",
    "wk.made": "{d} 完成",
    "works.sort": "並び順",
    "sort.new": "新しい順",
    "sort.old": "古い順",
    "sort.label": "並び順：{v}",
    "nsfw.sub": "18歳以上向け · プレビューはぼかし加工済み · 作品はクラウドアルバムで公開中",
    "nsfw.note": "成人向け作品はこのサイトには掲載していません。画像か下のボタンから Google ドライブのアルバムでご覧ください。",
    "nsfw.go": "Google ドライブで見る",
    "nsfw.alt": "ぼかし加工した成人向け作品のプレビュー",
    "cur.artbook": "画集",
    "ab.sub": "{a} — {b} · 全{n}冊 · 表紙をクリックすると中を見られます",
    "ab.count": "{n}冊",
    "ab.card": "{t} 画集（{d}）",
    "bk.date": "{d} 発行",
    "bk.goods": "収録グッズ：",
    "bk.pageAlt": "{t} 本文（{n}枚目）",
    "bk.coverAlt": "{t} 表紙と裏表紙",
    "bk.blurAlt": "{t} 本文（成人向け・ぼかし加工）",
    "bk.others": "ほかの画集",
    "bk.pv": "プレビュー",
    "bk.r18": "成人向けの本のため、本文はぼかしています。",
    "b3.open": "クリックで拡大・360°回転できます",
    "b3.book": "{t} 表紙と裏表紙：クリックで拡大・360°回転",
    "b3.label": "画集の3Dビュー",
    "b3.reset": "元に戻す",
    "b3.hint": "ドラッグで移動 · 右ドラッグで回転 · ホイールで拡大縮小 · ダブルクリックで元に戻す",
    "b3.hintTouch": "ドラッグで回転 · ピンチで拡大縮小・移動 · ダブルタップで元に戻す",
    "bk.spec": "仕様",
    "bk.spec.size": "サイズ",
    "bk.spec.pages": "ページ数",
    "bk.spec.print": "印刷",
    "bk.spec.cover": "表紙",
    "bk.size.a4sq": "A4正方形",
    "bk.size.b5": "B5",
    "bk.size.a5land": "A5横長",
    "bk.pp": "{n}ページ",
    "bk.print.color": "フルカラー",
    "bk.print.mono": "モノクロ",
    "bk.mat.gloss": "コート紙・グロスPP",
    "bk.mat.matte": "コート紙・マットPP",
    "bk.mat.ivory": "アイボリー紙",
    "bk.foil.blue": "・青箔押し"
  }
};
const HTML_LANG = { zh: 'zh-Hant', en: 'en', ja: 'ja' };
let LANG = I18N[window.__LANG] ? window.__LANG : 'zh';
function tr(key, vars) {
  let str = (I18N[LANG] && I18N[LANG][key]) ?? I18N.zh[key] ?? key;
  if (vars) str = str.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
  return str;
}
const L = (v) => (v && typeof v === 'object' && !Array.isArray(v) ? (v[LANG] ?? v.zh) : v);   // pick a translated data field
const pagesText = (n) => (LANG === 'en' && n === 1 ? '1 image' : tr('wk.pages', { n }));

/* ==================== js/game.js ==================== */
/* Game page: character roster, card carousel, screenshots */
/* ---------- game page: character roster, char1–char18; slots without art show char0 ---------- */
const CHAR_ART = new Set([1, 2, 3, 5, 8, 9, 11, 13, 15, 16, 18]);
const CHAR_CARD = new Set([11, 13, 16]);
const PAIR_W = {"11": 1025, "13": 1025, "16": 1025};   // characters whose card is shown on hover and next to the art
const charList = $('#chars');
const artChars = [];
const no2 = (n) => String(n).padStart(2, '0');
for (let n = 1; n <= 18; n++) {
  const has = CHAR_ART.has(n);
  const li = el('li', 'char' + (has ? '' : ' tbd'));
  li.dataset.rv = 'clip';
  li.dataset.d = `${((n - 1) % 6) * 0.06}s`;
  const box = el('span', 'char-img mask');
  const img = el('img');
  img.src = `img/char${has ? n : 0}.webp`;
  img.width = 500; img.height = 1364;
  img.loading = 'lazy'; img.decoding = 'async';
  img.alt = has ? '' : tr('chars.tbd', { n });
  box.appendChild(img);
  if (has && CHAR_CARD.has(n)) {
    const wrap = el('span', 'char-cardwrap');
    for (const cls of ['char-card-bg', 'char-card']) {
      const c = el('img', cls); c.src = `img/cards/char${n}.webp`; c.width = 336; c.height = 960; c.alt = ''; c.loading = 'lazy'; c.decoding = 'async';
      wrap.appendChild(c);
    }
    box.appendChild(wrap);
    li.classList.add('char-has-card');
  }
  let top = box;
  if (has) {
    top = el('button', 'char-btn');
    top.type = 'button';
    top.dataset.n = n;
    top.setAttribute('aria-label', tr(CHAR_CARD.has(n) ? 'chars.viewPair' : 'chars.view', { n }));
    top.appendChild(box);
    artChars.push(n);
  }
  li.append(top, el('span', 'char-no', `No.${no2(n)}`), el('span', 'char-name', `char${n}`));
  charList.appendChild(li);
}
/* ---------- game page: card carousel, grouped: equipment, events, angel·demon, oracle·summon ---------- */
const DECK_GROUPS = [{"g": "equip", "cards": ["equip_01", "equip_02", "equip_09"]}, {"g": "event", "cards": ["event_03", "event_05", "event_06", "event_07", "event_08"]}, {"g": "contract", "cards": ["angel_01", "demon_01"]}, {"g": "oracle", "cards": ["oracle_02", "oracle_07", "oracle_08", "monster_summon_05"]}];   // [{ g, cards: [file in img/cards/, ...] }, ...] in play order
const CARD_NAMES = {"equip_01": "一般裝備1", "equip_02": "一般裝備2", "equip_09": "一般裝備9", "event_03": "興奮劑", "event_05": "備援即送", "event_06": "望遠鏡", "event_07": "魔力補給", "event_08": "能量爆發", "angel_01": "契約：天使", "demon_01": "契約：惡魔", "oracle_02": "神諭卡2", "oracle_07": "神諭卡7", "oracle_08": "神諭卡8", "monster_summon_05": "Ars Goetia No.53: Caim", "char11": "角色11", "char13": "角色13", "char16": "角色16"};   // file -> the name printed on the card (kept as printed in every language)
const DECK = DECK_GROUPS.flatMap((x) => x.cards);
const CAT = (f) => (f.startsWith('monster_summon') ? 'summon' : f.split('_')[0]);
const deckTrack = $('#deck-track');
{
  let i = 0;
  DECK_GROUPS.forEach((grp) => {
    const g = el('li', 'deck-group'); g.dataset.g = grp.g;
    const head = el('p', 'deck-gh');
    head.append(el('span', 'deck-gn'), el('span', 'deck-gc', no2(grp.cards.length)));
    const ol = el('ol', 'deck-cards');
    grp.cards.forEach((f) => {
      const li = el('li');
      const b = el('button', 'deck-card'); b.type = 'button'; b.dataset.i = i++;
      b.style.setProperty('--card', cssUrl(`img/cards/${f}.webp`));   // shapes the sheen to the card
      const im = el('img'); im.src = `img/cards/${f}.webp`; im.width = 336; im.height = 960; im.alt = ''; im.loading = 'lazy'; im.decoding = 'async'; im.draggable = false;
      b.appendChild(im);
      li.append(b, el('span', 'deck-name', CARD_NAMES[f] || ''));
      ol.appendChild(li);
    });
    g.append(head, ol);
    deckTrack.appendChild(g);
  });
}
function deckText() {
  deckTrack.querySelectorAll('.deck-group').forEach((g) => { g.querySelector('.deck-gn').textContent = tr('deck.' + g.dataset.g); });
  deckTrack.querySelectorAll('.deck-card').forEach((b) => {
    const f = DECK[+b.dataset.i], c = tr('cat.' + CAT(f));
    b.setAttribute('aria-label', tr('cards.view', { c, name: CARD_NAMES[f] || c, n: +b.dataset.i + 1, m: DECK.length }));
  });
}
const deckSmooth = () => (CALM ? 'auto' : 'smooth');
const deckPad = () => parseFloat(getComputedStyle(deckTrack).scrollPaddingLeft) || 0;
/* where each card's left edge sits, as a scroll position */
function deckStops() {
  const base = deckTrack.getBoundingClientRect().left - deckTrack.scrollLeft + deckPad();
  return [...deckTrack.querySelectorAll('.deck-cards > li')].map((c) => Math.max(0, Math.round(c.getBoundingClientRect().left - base)));
}
function deckArrows() {
  $('#deck-prev').disabled = deckTrack.scrollLeft < 4;
  $('#deck-next').disabled = deckTrack.scrollLeft > deckTrack.scrollWidth - deckTrack.clientWidth - 4;
}
/* arrows move about one screen: to the first card cut off on the right, or back by the same amount */
function deckGo(dir) {
  const stops = deckStops(), x = deckTrack.scrollLeft, view = deckTrack.clientWidth - 2 * deckPad();
  const card = deckTrack.querySelector('.deck-cards > li').offsetWidth;
  let to;
  if (dir > 0) to = stops.find((s) => s + card > x + view + 2) ?? stops[stops.length - 1];
  else { const back = stops.filter((s) => s >= x - view + card - 2 && s < x - 2); to = back.length ? back[0] : [...stops].reverse().find((s) => s < x - 2) ?? 0; }
  deckTrack.scrollTo({ left: to, behavior: deckSmooth() });
}
$('#deck-prev').addEventListener('click', () => deckGo(-1));
$('#deck-next').addEventListener('click', () => deckGo(1));
deckTrack.addEventListener('scroll', deckArrows, { passive: true });
/* recheck whenever the row changes size, including when the game page first becomes visible */
if (window.ResizeObserver) new ResizeObserver(deckArrows).observe(deckTrack);
else addEventListener('resize', deckArrows);
deckArrows();
/* mouse: drag the row sideways (touch screens scroll natively); a real drag does not open the card */
let deckDrag = null, deckMoved = false;
deckTrack.addEventListener('pointerdown', (e) => {
  if (e.pointerType !== 'mouse' || e.button !== 0) return;
  deckDrag = { x: e.clientX, left: deckTrack.scrollLeft }; deckMoved = false;
});
addEventListener('pointermove', (e) => {
  if (!deckDrag) return;
  const dx = e.clientX - deckDrag.x;
  if (!deckMoved && Math.abs(dx) > 6) {
    deckMoved = true;
    deckTrack.classList.add('drag', 'nosnap');
    deckTrack.querySelectorAll('.deck-card.tilt').forEach((c) => c.classList.remove('tilt'));
  }
  if (deckMoved) deckTrack.scrollLeft = deckDrag.left - dx;
});
addEventListener('pointerup', () => {
  if (!deckDrag) return;
  deckDrag = null;
  if (!deckMoved) return;
  deckTrack.classList.remove('drag');
  const x = deckTrack.scrollLeft, stops = deckStops();
  const to = stops.reduce((a, s) => (Math.abs(s - x) < Math.abs(a - x) ? s : a), stops[0]);   // settle on the nearest card
  deckTrack.scrollTo({ left: to, behavior: deckSmooth() });
  setTimeout(() => deckTrack.classList.remove('nosnap'), CALM ? 0 : 520);
  setTimeout(() => { deckMoved = false; }, 0);   // after this drag's click has been swallowed
});
deckTrack.addEventListener('click', (e) => {
  const b = e.target.closest('.deck-card');
  if (!b) return;
  if (deckMoved) { deckMoved = false; e.preventDefault(); return; }
  zvOpen('cards', +b.dataset.i, b);
});
/* tilt toward the pointer (mouse only; off for reduced motion) */
if (!matchMedia('(prefers-reduced-motion: reduce)').matches && matchMedia('(hover: hover) and (pointer: fine)').matches) {
  deckTrack.addEventListener('pointermove', (e) => {
    if (deckMoved) return;
    const b = e.target.closest('.deck-card');
    if (!b) return;
    const r = b.parentElement.getBoundingClientRect(), h = b.offsetHeight;   // the untilted slot, so the tilt does not feed back
    const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)), y = Math.min(1, Math.max(0, (e.clientY - r.top) / h));
    b.style.setProperty('--rx', `${((0.5 - y) * 16).toFixed(2)}deg`);
    b.style.setProperty('--ry', `${((x - 0.5) * 18).toFixed(2)}deg`);
    b.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
    b.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
    b.classList.add('tilt');
  });
  deckTrack.addEventListener('pointerout', (e) => {
    const b = e.target.closest('.deck-card');
    if (!b || b.contains(e.relatedTarget)) return;
    b.classList.remove('tilt');
    b.style.removeProperty('--rx'); b.style.removeProperty('--ry');
  });
}

/* ---------- game page: in-development screenshots (main view + thumbnails) ---------- */
const SHOTS = ['shot1', 'shot2', 'shot3', 'shot4', 'shot5', 'shot6', 'shot7', 'shot8'];   // captions live in I18N
const shotImg = $('#shot-img'), shotThumbs = $('#shot-thumbs');
let shotAt = 0;
function shotText() {
  shotImg.alt = tr(SHOTS[shotAt]);
  $('#shot-cap').textContent = shotImg.alt;
}
function gameText() {
  deckText();
  charList.querySelectorAll('.char').forEach((li, k) => {
    const n = k + 1, btn = li.querySelector('.char-btn');
    if (btn) btn.setAttribute('aria-label', tr(CHAR_CARD.has(n) ? 'chars.viewPair' : 'chars.view', { n }));
    else li.querySelector('img').alt = tr('chars.tbd', { n });
  });
  shotThumbs.querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-label', tr('shots.thumb', { n: i + 1, t: tr(SHOTS[i]) })));
  shotText();
}
function showShot(i, animate = true) {
  shotAt = (i + SHOTS.length) % SHOTS.length;
  shotImg.src = `img/shot${shotAt + 1}.webp`;
  shotText();
  $('#shot-no').textContent = `${no2(shotAt + 1)} / ${no2(SHOTS.length)}`;
  shotThumbs.querySelectorAll('button').forEach((b, k) => b.setAttribute('aria-pressed', String(k === shotAt)));
  if (animate) { shotImg.classList.remove('swap'); void shotImg.offsetWidth; shotImg.classList.add('swap'); }
}
SHOTS.forEach((cap, i) => {
  const b = el('button');
  b.type = 'button';
  b.setAttribute('aria-label', tr('shots.thumb', { n: i + 1, t: tr(cap) }));
  const im = el('img');
  im.src = `img/shot${i + 1}-t.webp`; im.width = 400; im.height = 225; im.alt = ''; im.loading = 'lazy';
  b.appendChild(im);
  b.addEventListener('click', () => showShot(i));
  shotThumbs.appendChild(b);
});
showShot(0, false);

/* ==================== js/lightbox.js ==================== */
/* Image viewer: windows on the Work and Art Book pages (move, resize, maximize, minimize, side by side); a pop-up on the game page */
/* ---------- picture windows: on the Work and Art Book pages each picture opens in a window of its own over the page,
   below the header, and so does an art book's 3D cover (js/book3d.js). Drag the bar to move a window, an edge or a
   corner to resize it; maximize fills the screen below the header (so does a double-click on the bar); minimize tucks
   it into the dock at the bottom left, and a click there brings it back as it was. Any number stay open side by side
   while you look round that part of the site; going to another part (another link in the header) closes them all.
   On the game page a picture opens in a pop-up over the page instead, one at a time. In both: the wheel zooms, a
   click goes to the high-resolution copy at its actual size and back, a drag moves the picture. ---------- */
const zwLayer = $('#zw-layer'), zvDock = $('#zv-dock');
const ZV_MIN_W = 240, ZV_MIN_H = 180;   // the smallest a window can be made
const ZV_TOP = 3;   // the wheel zooms up to this many times a picture's actual size
const ZV_POP = new Set(['shots', 'chars', 'cards']);   // the game page's pictures: the pop-up
function galleryPages(w, t) {
  return w.dims.map(([W, H, ZW], n) => ({
    src: src(w.id, n), zsrc: ZW ? src(w.id, n).replace('img/', 'img/z/') : null,
    w: W, h: H, zw: ZW || W,
    no: `${n + 1} / ${w.dims.length}`, cap: t,
    alt: w.dims.length > 1 ? tr('zv.workAlt', { t, n: n + 1 }) : t,
  }));
}
const ZV_SETS = {   // what a window steps through; made again in another language
  proc: (id) => {   // a work's process animations; the full-size one, where there is one, on zoom
    const w = WORKS[byId[id]], list = w.proc || [];
    return list.map(([f, W, H, ZW], n) => ({
      src: `img/proc/${f}`, zsrc: ZW ? `img/proc/z/${f}` : null, eager: true,
      w: W, h: H, zw: ZW || W,
      no: `${n + 1} / ${list.length}`, cap: `${L(w.t)} · ${tr('proc.h')}`,
      alt: tr('proc.alt', { t: L(w.t) }),
    }));
  },
  catalog: (ev) => { const c = catalogByEvent.get(ev); return galleryPages(c, catalogName(c)); },
  work: (id) => {
    const w = WORKS[byId[id]];
    return galleryPages(w, L(w.t));
  },
  piece: (key) => {   // a collection's piece (key "<work id>/<piece from 0>"): its finished picture, other versions, sketch
    const [id, p] = key.split('/'), w = WORKS[byId[id]], n = +p, t = L(w.t), list = pieceImgs(w, n);
    return list.map((q, k) => {
      const [W, H, ZW] = q.d;
      return {
        src: q.src, zsrc: ZW ? q.src.replace('img/', 'img/z/') : null,
        w: W, h: H, zw: ZW || W,
        no: `${k + 1} / ${list.length}`, cap: `${t} · No.${no2(n + 1)}${k ? ' · ' + tr('wk.' + q.k, { n: q.j }) : ''}`,
        alt: tr(`wk.${q.k}Alt`, { t, n: n + 1, k: q.j }),
      };
    });
  },
  shots: () => SHOTS.map((s, i) => ({ src: `img/shot${i + 1}.webp`, w: 1600, h: 900, zw: 1600, no: `${no2(i + 1)} / ${no2(SHOTS.length)}`, cap: tr(s), alt: tr(s) })),
  chars: () => artChars.map((n) => (CHAR_CARD.has(n)
    ? { src: `img/cards/pair${n}.webp`, w: PAIR_W[n], h: 1364, zw: PAIR_W[n], no: `No.${no2(n)}`, cap: `char${n} · CARD`, alt: tr('chars.pairAlt', { n }),
        tags: { cols: `500fr 48fr ${PAIR_W[n] - 548}fr`, l: tr('pair.art'), r: `${tr('pair.card')} · ${CARD_NAMES[`char${n}`] || `char${n}`}` } }
    : { src: `img/char${n}.webp`, w: 500, h: 1364, zw: 500, no: `No.${no2(n)}`, cap: `char${n}`, alt: tr('chars.full', { n }) })),
  book: (slug) => {
    const b = BOOKS[byBook[slug]], blur = b.blur || [];
    const pages = b.pages.map((d, n) => [d, n]).filter(([, n]) => !blur.includes(n));   // the cover spread, then the inside pages
    return pages.map(([[W, H, ZW], n], k) => ({
      src: `img/ab/${b.slug}_p${n}.webp`, zsrc: ZW ? `img/ab/x/${b.slug}_p${n}.webp` : null, eager: true,   // x: the full-size spread
      w: W, h: H, zw: ZW || W,
      no: `${k + 1} / ${pages.length}`, cap: bkName(b),
      alt: tr(n ? 'bk.pageAlt' : 'bk.coverAlt', { t: bkName(b), n }),
    }));
  },
  board: (id) => bdItems(id),   // a post's pictures on the board (js/board.js)
  cards: () => DECK.map((f, i) => {
    const c = tr('cat.' + CAT(f)), name = CARD_NAMES[f] || c;
    return { src: `img/cards/${f}.webp`, w: 336, h: 960, zw: 420, no: `${no2(i + 1)} / ${no2(DECK.length)}`, cap: `${c} · ${name}`, alt: tr('cards.alt', { c, name }) };
  }),
};
const zvWins = [];   // the open windows (those in the dock too) and the pop-up
let zvTop = 0;       // the stacking order: the window in front has the highest
const zvShown = () => zvWins.filter((o) => !o.chip && !o.shut).sort((a, b) => a.el.style.zIndex - b.el.style.zIndex);   // on screen, back to front
const zvFull = (w) => zvBox(w, 0, 0, zwLayer.clientWidth, zwLayer.clientHeight);   // the whole screen below the header
const zvInWin = (e) => e.target instanceof Element && !!e.target.closest('.zw');   // a key or click in a window

/* ---- a picture's size in its window ---- */
function zvRoom(w, it, live) {   // the width and height a picture has in its window; while the window glides (live), as it is now
  const bd = w.pop ? 0 : 2, W = live ? w.el.clientWidth : w.box.w - bd, H = live ? w.el.clientHeight : w.box.h - bd;   // inside the border
  const side = w.set.length > 1 && W > 430 ? 112 : 24;   // the picture's side margins, with room for the arrows (css/lightbox.css)
  return [W - side, H - w.bar.offsetHeight - 32 - (it.tags ? 40 : 0)];
}
function zvFit(w, it, live) {
  const [sw, sh] = zvRoom(w, it, live), r = it.h / it.w;
  if (r > 2.9) return Math.max(40, Math.min(sw, it.zw, 1000));   // long process strips: fit the width
  return Math.max(40, Math.min(sw, sh / r, it.zw));
}
function zvSize(w, live) {
  const it = w.set[w.at], fit = zvFit(w, it, live);
  const px = w.zoomed ? w.pw : fit;   // zoomed: the width it was zoomed to
  w.img.style.width = `${Math.round(px)}px`;
  w.img.style.height = `${Math.round(px * it.h / it.w)}px`;
  w.tags.style.width = `${Math.round(px)}px`;
  /* the zoom button says what it does: show the actual size, or fit the window (at that share of the actual size).
     A picture that already fits at its actual size has nothing to zoom. */
  const can = w.zoomed || it.zw > fit + 1;
  w.zoomBtn.hidden = !can;
  w.stage.classList.toggle('nozoom', !can);
  const t = w.zoomed ? tr('zv.unzoom', { p: Math.round((fit / it.zw) * 100) }) : tr('zv.zoom');
  w.zoomT.textContent = t;
  w.zoomBtn.title = t;   // a narrow window shows only the icon
}
function zvHiRes(w) {
  const it = w.set[w.at];
  if (!it.zsrc || w.img.getAttribute('src') === it.zsrc || !w.load.hidden) return;   // none, there already, or on its way
  const t = ++w.token, pre = new Image();
  pre.src = it.zsrc;
  w.load.hidden = false;
  pre.decode()
    .then(() => { if (t === w.token) w.img.src = it.zsrc; })
    .catch(() => {})
    .finally(() => { if (t === w.token) w.load.hidden = true; });
}
/* show the picture at a width (px), or fitting its window (null) */
function zvScale(w, px, cx, cy) {
  const { img, stage } = w;
  const a = img.getBoundingClientRect(), s = stage.getBoundingClientRect();
  const ax = cx ?? s.left + s.width / 2, ay = cy ?? s.top + s.height / 2;   // this point stays put
  const fx = Math.min(1, Math.max(0, (ax - a.left) / a.width)), fy = Math.min(1, Math.max(0, (ay - a.top) / a.height));
  w.zoomed = px !== null;
  w.pw = px;
  w.el.classList.toggle('zoomed', w.zoomed);
  w.zoomBtn.setAttribute('aria-pressed', String(w.zoomed));
  img.style.transition = 'none';
  img.style.transform = '';
  zvSize(w);
  const b = img.getBoundingClientRect();
  stage.scrollLeft += b.left + fx * b.width - ax;
  stage.scrollTop += b.top + fy * b.height - ay;
  if (!CALM) {   // tween from the old box to the new one
    const c = img.getBoundingClientRect();
    img.style.transformOrigin = '0 0';
    img.style.transform = `translate(${a.left - c.left}px, ${a.top - c.top}px) scale(${a.width / c.width})`;
    void img.offsetWidth;
    img.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
    img.style.transform = 'none';
  }
  if (w.zoomed && px * (devicePixelRatio || 1) > w.set[w.at].w) zvHiRes(w);   // bigger than the page image: the full size
}
/* the click and the button: the actual size, or back to fitting the window */
function zvZoom(w, on, cx, cy) {
  if (on === w.zoomed || w.stage.classList.contains('nozoom')) return;
  zvScale(w, on ? w.set[w.at].zw : null, cx, cy);
}
/* the wheel zooms toward the pointer: from the picture fitting its window (a long strip: all of it showing) up to
   ZV_TOP times its actual size */
function zvWheel(w, e) {
  e.preventDefault();
  const it = w.set[w.at], r = it.h / it.w, fit = zvFit(w, it), low = r > 2.9 ? Math.min(fit, Math.max(40, zvRoom(w, it)[1] / r)) : fit;
  const now = w.zoomed ? w.pw : fit, px = Math.min(it.zw * ZV_TOP, Math.max(low, now * Math.exp(-e.deltaY * (e.deltaMode ? 0.05 : 0.0015))));
  if (Math.abs(px - now) < 0.5) return;
  zvScale(w, low === fit && px < fit + 0.5 ? null : px, e.clientX, e.clientY);
}
/* the words for the picture a window shows, in the language chosen */
function zvText(w) {
  const it = w.set[w.at];
  w.img.alt = it.alt;
  w.cap.replaceChildren(el('span', '', it.no), document.createTextNode(it.cap));
  w.tags.hidden = !it.tags;
  if (it.tags) {
    w.tags.style.gridTemplateColumns = it.tags.cols;
    w.tags.children[0].textContent = it.tags.l; w.tags.children[1].textContent = it.tags.r;
  }
}
function zvShow(w, i, opening) {
  w.at = (i + w.set.length) % w.set.length;
  const it = w.set[w.at];
  ++w.token;
  w.load.hidden = true;
  w.zoomed = false;
  w.el.classList.remove('zoomed');
  w.zoomBtn.setAttribute('aria-pressed', 'false');
  w.img.style.transition = 'none';
  w.img.style.transform = '';
  w.img.src = it.src;
  zvText(w);
  if (it.tags) { w.tags.classList.remove('swap'); void w.tags.offsetWidth; w.tags.classList.add('swap'); }
  zvSize(w);
  if (it.eager && zvFit(w, it) * (devicePixelRatio || 1) > it.w) zvHiRes(w);   // shown bigger than the page image: get the full size now, not only on zoom
  w.stage.scrollTo(0, 0);
  w.img.classList.remove('swap');
  if (!opening) { void w.img.offsetWidth; w.img.classList.add('swap'); }   // the next one swaps in; the first one flies in (zvFly)
  if (w.kind === 'shots' && w.at !== shotAt) showShot(w.at, false);
}
/* the picture that was clicked, where it is on the screen (null if it is not showing) */
function zvRectOf(e) {
  if (!e || !e.isConnected || e.closest('[hidden]')) return null;
  const r = (e.tagName === 'IMG' ? e : e.querySelector('img') || e).getBoundingClientRect();
  return r.width && r.height && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth ? r : null;
}
/* opening, the picture flies from the one that was clicked to its place in the window; closing, back again. A copy
   flies, fixed to the screen, while the picture itself waits hidden: inside the window's scrolling area it would be
   cut off at the edge. A picture bigger than its window (zoomed in, a long strip), or with nothing on screen to fly
   to, just fades with the window. Returns how long it takes (ms). */
function zvGhostOut(w) {
  if (w.ghost) { w.ghost.remove(); w.ghost = null; }
  w.img.style.visibility = '';
}
function zvFly(w, out) {
  zvGhostOut(w);
  if (CALM || !w.img.animate) return 0;
  const c = w.img.getBoundingClientRect(), s = w.stage.getBoundingClientRect();
  const a = zvRectOf(!out || w.at === w.at0 || w.kind === 'shots' ? w.from : null);   // shots: the page keeps showing the one in the window
  if (!a || !c.width || c.left < s.left - 1 || c.top < s.top - 1 || c.right > s.right + 1 || c.bottom > s.bottom + 1) return 0;
  const ghost = w.img.cloneNode(false);
  ghost.className = 'zv-ghost';
  ghost.style.cssText = `left:${c.left}px;top:${c.top}px;width:${c.width}px;height:${c.height}px`;
  document.body.append(ghost);
  w.ghost = ghost;
  w.img.style.visibility = 'hidden';
  const away = { transform: `translate(${(a.left - c.left).toFixed(1)}px,${(a.top - c.top).toFixed(1)}px) scale(${(a.width / c.width).toFixed(4)},${(a.height / c.height).toFixed(4)})` };
  const here = { transform: 'none' }, ms = out ? 380 : 520;
  const fly = ghost.animate(out ? [here, away] : [away, here], { duration: ms, easing: out ? 'cubic-bezier(.4,0,.2,1)' : 'cubic-bezier(.16,1,.3,1)', fill: 'both' });
  if (!out) fly.finished.then(() => { if (w.ghost === ghost) zvGhostOut(w); }, () => {});   // landed: the picture itself takes over
  return ms;
}

/* ---- windows: their place and size, moving, resizing, maximize, minimize ---- */
/* a window's place and size: on the screen below the header, with enough of it showing that its bar can be reached */
function zvBox(w, x, y, W, H) {
  const lw = zwLayer.clientWidth, lh = zwLayer.clientHeight;
  W = Math.round(Math.max(ZV_MIN_W, Math.min(W, lw)));
  H = Math.round(Math.max(ZV_MIN_H, Math.min(H, lh)));
  x = Math.round(Math.min(Math.max(x, 80 - W), lw - 80));
  y = Math.round(Math.min(Math.max(y, 0), lh - 48));
  const sized = !w.box || W !== w.box.w || H !== w.box.h;
  w.box = { x, y, w: W, h: H };
  Object.assign(w.el.style, { left: `${x}px`, top: `${y}px`, width: `${W}px`, height: `${H}px` });
  if (sized && !w.el.classList.contains('glide')) w.fit();   // gliding, it follows the frame as it goes (zvGlide)
}
/* move or resize a window smoothly; what it shows follows the size as it goes */
function zvGlide(w, fn) {
  if (CALM) { fn(); return; }
  clearTimeout(w.glide);
  w.el.classList.add('glide');
  fn();
  const t0 = performance.now(), step = (now) => {
    if (!w.el.classList.contains('glide')) return;
    w.fit(true);
    if (now - t0 < 520) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
  w.glide = setTimeout(() => { w.el.classList.remove('glide'); w.fit(); }, 540);
}
/* where a window goes, its size from what it shows (w.want; most of a phone's screen): in the middle of the given half
   of the screen (side 'l' or 'r'), or else where it covers the other windows least, nearest the middle */
function zvPlace(w, side) {
  const LW = zwLayer.clientWidth, lh = zwLayer.clientHeight;
  const lw = side ? Math.floor(LW / 2) : LW, ax = side === 'r' ? LW - lw : 0;   // the area it goes in
  if (!w.box) zvBox(w, 0, 0, 600, 400);   // a new one: some size for now, to measure the frame round what it shows
  let [W, H] = LW <= 640 ? [lw - 16, lh * 0.86] : w.want(side ? lw - 24 : Math.max(480, lw * 0.72), lh * 0.88, side);
  W = Math.round(W); H = Math.round(H);
  w.auto = true;   // put here, not by the visitor: the next window opened may move it aside (zvPut)
  if (side) { zvBox(w, ax + (lw - W) / 2, (lh - H) / 2, W, H); return; }
  const others = zvShown().filter((o) => o !== w).map((o) => o.box);
  const mx = Math.max(0, lw - W), my = Math.max(0, lh - H), nx = LW <= 640 ? 0 : 10;   // phones: always centred left to right
  let best = null;
  for (let i = 0; i <= nx; i++) {
    for (let j = 0; j <= 6; j++) {
      const x = Math.round(nx ? mx * i / nx : mx / 2), y = Math.round(my * j / 6);
      let cover = 0;
      for (const o of others) cover += Math.max(0, Math.min(x + W, o.x + o.w) - Math.max(x, o.x)) * Math.max(0, Math.min(y + H, o.y + o.h) - Math.max(y, o.y));
      const off = Math.hypot(x - mx / 2, y - my / 2);
      if (!best || cover < best.cover || (cover === best.cover && off < best.off)) best = { x, y, cover, off };
    }
  }
  zvBox(w, best.x, best.y, W, H);
}
/* a new window goes in. The pop-up fills the screen below the header. A window opened beside one other that is still
   where it was put goes side by side with it: that one glides to the left half, this one opens in the right.
   Otherwise it goes where it covers the others least. */
function zvPut(w) {
  zwLayer.append(w.el);
  zvWins.push(w);
  if (w.pop) { zvFull(w); document.documentElement.classList.add('zv-open'); }
  else {
    const shown = zvShown().filter((o) => o !== w);
    const mate = shown.length === 1 && shown[0].auto && zwLayer.clientWidth >= 1000 ? shown[0] : null;
    if (mate) zvGlide(mate, () => zvPlace(mate, 'l'));
    zvPlace(w, mate ? 'r' : '');
  }
  zvFront(w);
  w.el.focus({ preventScroll: true });
}
function zvFront(w) {
  if (w.el.classList.contains('front')) return;
  zvWins.forEach((o) => o.el.classList.toggle('front', o === w));
  w.el.style.zIndex = ++zvTop;
}
/* a window that is open already comes to the front, or back from the dock */
function zvBack(w) {
  if (w.chip) zvRestore(w);
  else { zvFront(w); w.el.focus({ preventScroll: true }); }
}
/* drag the bar to move a window (d = ''), an edge or a corner to resize it (d = n, e, s, w, ne, se, sw or nw) */
function zvGrab(w, e, d) {
  if (e.button !== 0 || w.shut || w.pop || (d && w.max)) return;
  e.preventDefault();
  if (!w.el.contains(document.activeElement)) w.el.focus({ preventScroll: true });
  w.auto = false;   // the visitor's place for it from now on
  w.el.classList.remove('glide');
  const t = e.currentTarget, sx = e.clientX, sy = e.clientY, L = zwLayer.getBoundingClientRect();
  const lw = zwLayer.clientWidth, lh = zwLayer.clientHeight;
  let { x, y, w: W, h: H } = w.box;
  t.setPointerCapture(e.pointerId);
  w.el.classList.add(d ? 'sizing' : 'moving');
  const move = (ev) => {
    const dx = ev.clientX - sx, dy = ev.clientY - sy;
    if (!d) {
      if (w.max) {   // a full window dragged by its bar goes back to its own size, held at the same place on the bar
        if (Math.abs(dx) + Math.abs(dy) < 6) return;
        const k = (sx - L.left - x) / W;
        zvMaxSet(w, false);
        ({ w: W, h: H } = w.prev);
        x = sx - L.left - k * W; y = 0;
      }
      zvBox(w, x + dx, y + dy, W, H);
      return;
    }
    let l = x, tp = y, r = x + W, b = y + H;   // an edge that was off the screen does not jump back on
    if (d.includes('w')) l = Math.min(Math.max(x + dx, Math.min(0, x)), r - ZV_MIN_W);
    if (d.includes('e')) r = Math.max(Math.min(r + dx, Math.max(lw, r)), l + ZV_MIN_W);
    if (d.includes('n')) tp = Math.min(Math.max(y + dy, 0), b - ZV_MIN_H);
    if (d.includes('s')) b = Math.max(Math.min(b + dy, Math.max(lh, b)), tp + ZV_MIN_H);
    zvBox(w, l, tp, r - l, b - tp);
  };
  const up = () => {
    t.removeEventListener('pointermove', move);
    t.removeEventListener('pointerup', up);
    t.removeEventListener('pointercancel', up);
    w.el.classList.remove('moving', 'sizing');
  };
  t.addEventListener('pointermove', move);
  t.addEventListener('pointerup', up);
  t.addEventListener('pointercancel', up);
}
/* maximize: the window fills the screen below the header; again, it goes back to where it was */
function zvMaxSet(w, on) {
  w.max = on;
  w.el.classList.toggle('max', on);
  const b = w.el.querySelector('.zv-max'), t = tr(on ? 'zv.unmax' : 'zv.max');
  b.title = t;
  b.setAttribute('aria-label', t);
}
function zvMax(w, on = !w.max) {
  if (w.pop || w.shut || w.chip || on === w.max) return;
  if (on) w.prev = { ...w.box };
  zvMaxSet(w, on);
  w.auto = false;
  zvGlide(w, () => (on ? zvFull(w) : zvBox(w, w.prev.x, w.prev.y, w.prev.w, w.prev.h)));
}
/* minimize: the window shrinks into a chip in the dock and waits there, hidden but as it was */
function zvChipFill(w) {
  if (!w.chip) return;
  const { src, pos, name, full } = w.badge(), im = w.chip.querySelector('img');   // its picture (and the part of it to show), its name
  if (im.getAttribute('src') !== src) im.src = src;
  im.style.objectPosition = pos || '';
  w.chip.querySelector('.zv-chip-t').textContent = name;
  w.chip.querySelector('.zv-chip-b').title = full;
}
function zvMin(w) {
  if (w.shut || w.chip || w.pop) return;
  const had = w.el.contains(document.activeElement);
  const chip = $('#zv-chip-tpl').content.firstElementChild.cloneNode(true);
  w.chip = chip;
  textsIn(chip);
  zvChipFill(w);
  chip.querySelector('.zv-chip-b').addEventListener('click', () => zvRestore(w));
  chip.querySelector('.zv-chip-x').addEventListener('click', () => zvClose(w));
  zvDock.append(chip);
  w.land();
  w.el.classList.remove('front');
  const next = zvShown().pop();
  if (next) zvFront(next);
  const hide = () => { if (w.chip === chip) w.el.classList.add('mini'); };
  if (w.morph) w.morph.cancel();
  if (CALM || !w.el.animate) hide();
  else {
    const a = w.el.getBoundingClientRect(), b = chip.getBoundingClientRect();
    w.el.classList.add('flying');
    w.morph = w.el.animate([{ transform: 'none', opacity: 1 }, { transform: `translate(${(b.left - a.left).toFixed(1)}px,${(b.top - a.top).toFixed(1)}px) scale(${(b.width / a.width).toFixed(4)},${(b.height / a.height).toFixed(4)})`, opacity: 0 }],
      { duration: 420, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' });
    w.morph.finished.then(hide, () => {});
  }
  if (had) chip.querySelector('.zv-chip-b').focus({ preventScroll: true });
}
/* back from the dock: the window grows out of its chip to where it was, as it was */
function zvRestore(w) {
  const chip = w.chip;
  if (!chip || w.shut) return;
  w.chip = null;
  const b = chip.getBoundingClientRect();
  chip.remove();
  if (w.morph) w.morph.cancel();
  w.el.classList.remove('mini', 'flying');
  if (w.max) zvFull(w); else zvBox(w, w.box.x, w.box.y, w.box.w, w.box.h);   // the screen may have changed meanwhile
  zvFront(w);
  if (!CALM && w.el.animate && b.width) {
    const a = w.el.getBoundingClientRect();
    w.morph = w.el.animate([{ transform: `translate(${(b.left - a.left).toFixed(1)}px,${(b.top - a.top).toFixed(1)}px) scale(${(b.width / a.width).toFixed(4)},${(b.height / a.height).toFixed(4)})`, opacity: 0 }, { transform: 'none', opacity: 1 }],
      { duration: 460, easing: 'cubic-bezier(.16,1,.3,1)' });
  }
  w.el.focus({ preventScroll: true });
}
function zvClose(w) {
  if (w.shut) return;
  w.shut = true;
  const had = w.el.contains(document.activeElement) || (w.chip && w.chip.contains(document.activeElement));
  const done = () => {
    w.end();
    w.el.remove();
    if (w.chip) w.chip.remove();
    const i = zvWins.indexOf(w);
    if (i < 0) return;   // all closed meanwhile (zvCloseAll)
    zvWins.splice(i, 1);
    if (w.pop) document.documentElement.classList.remove('zv-open');
    const next = zvShown().pop();
    if (next) zvFront(next);
    if (!had) return;
    if (next) next.el.focus({ preventScroll: true });   // the keyboard goes on in the window now in front, or on what this one came from
    else if (w.from && w.from.isConnected && !w.from.closest('[hidden]')) (w.from.closest('button') || w.from).focus({ preventScroll: true });
  };
  if (CALM || !w.el.animate) { done(); return; }
  if (w.chip) {   // closed from the dock: the chip goes; the window stays hidden, even halfway into the dock
    w.el.classList.add('mini');
    w.chip.style.pointerEvents = 'none';
    w.chip.animate([{ opacity: 0, transform: 'scale(.9)' }], { duration: 200, easing: 'ease-in', fill: 'forwards' }).finished.then(done, done);
    return;
  }
  if (w.morph) w.morph.cancel();
  w.el.classList.add('zw-out');
  setTimeout(done, w.leave(true) || 380);
}
/* going to another part of the site: every window closes at once (under the curtain, or as the page changes) */
function zvCloseAll() {
  zvWins.splice(0).forEach((w) => { w.shut = true; w.end(); w.el.remove(); if (w.chip) w.chip.remove(); });
  document.documentElement.classList.remove('zv-open');
}
let zvPart = '';
function zvPage(next) {   // every page change (js/router.js: apply)
  const a = [...document.querySelectorAll('.nav a')].find((x) => x.dataset.v.split(' ').includes(next));
  const part = a ? a.dataset.v : next;   // the part of the site: the header link the page lights up (Work: the wall and the works' pages)
  if (part !== zvPart) zvCloseAll();
  zvPart = part;
}
function zvKey(w, e) {
  if (e.altKey || e.metaKey || e.ctrlKey) return;
  if (e.key === 'Escape') zvClose(w);
  else if (!w.keys(e)) return;
  e.preventDefault();
}
/* another language: what the windows say, in it (the marked texts change with the page's) */
function zvLang() {
  zvWins.forEach((w) => { w.lang(); zvMaxSet(w, w.max); zvChipFill(w); });
}

/* a window's frame from the template in index.html: the bar with its caption and the minimize, maximize and close
   buttons, the edges that resize it. What it shows goes in after the bar; the hooks it sets say how it behaves:
   fit (what it shows takes the window's size), want (the size it would like), keys, leave (flying out on closing),
   land (anything flying lands now), end (stop all on closing), badge (its chip in the dock), lang */
function zvFrame(kind, from, pop) {
  const el = $('#zv-tpl').content.firstElementChild.cloneNode(true);
  const w = { el, bar: el.querySelector('.zv-bar'), cap: el.querySelector('.zv-cap'), kind, from, pop: !!pop,
    box: null, prev: null, max: false, auto: false, glide: 0, chip: null, morph: null, shut: false };
  el.classList.toggle('pop', w.pop);
  if (w.pop) el.setAttribute('aria-modal', 'true');
  zvMaxSet(w, false);
  el.addEventListener('pointerdown', () => zvFront(w), true);   // whatever is pressed, its window comes to the front
  el.addEventListener('focusin', () => zvFront(w));
  el.addEventListener('keydown', (e) => zvKey(w, e));
  el.addEventListener('wheel', (e) => { if (!e.ctrlKey) e.preventDefault(); }, { passive: false });   // the page behind does not scroll
  w.bar.addEventListener('pointerdown', (e) => { if (!e.target.closest('button')) zvGrab(w, e, ''); });
  w.bar.addEventListener('dblclick', (e) => { if (!e.target.closest('button')) zvMax(w); });
  el.querySelectorAll('.zv-rs').forEach((h) => h.addEventListener('pointerdown', (e) => zvGrab(w, e, h.dataset.d)));
  el.querySelector('.zv-min').addEventListener('click', () => zvMin(w));
  el.querySelector('.zv-max').addEventListener('click', () => zvMax(w));
  el.querySelector('.zv-close').addEventListener('click', () => zvClose(w));
  return w;
}
/* a picture's window (the pop-up for the game page's), with the zoom button, the picture, the arrows */
if (matchMedia('(hover: none)').matches) $('#zv-pic-tpl').content.querySelector('.zv-hint').dataset.i18n = 'zv.hintTouch';
function zvMake(kind, key, set, from) {
  const w = zvFrame(kind, from, ZV_POP.has(kind)), parts = $('#zv-pic-tpl').content.cloneNode(true), q = (s) => w.el.querySelector(s);
  w.el.querySelector('.zv-min').before(parts.querySelector('.zv-zoom'));
  w.bar.after(...parts.children);
  textsIn(w.el);
  w.el.dataset.i18nAria = 'zv.label';
  w.el.setAttribute('aria-label', tr('zv.label'));
  w.el.classList.toggle('multi', set.length > 1);
  q('.zv-prev').hidden = q('.zv-next').hidden = set.length < 2;
  Object.assign(w, {
    stage: q('.zv-stage'), img: q('.zv-img'), tags: q('.zv-tags'), zoomBtn: q('.zv-zoom'), zoomT: q('.zv-zoom .zv-t'), load: q('.zv-load'),
    key, set, at: 0, at0: 0, zoomed: false, pw: null, token: 0, ghost: null, pan: null,
    fit: (live) => { if (w.img.getAttribute('src')) zvSize(w, live); },
    want: (maxW, maxH, side) => {
      const it = w.set[w.at], r = it.h / it.w;
      const fw = 2 + (w.set.length > 1 ? 112 : 24), fh = w.bar.offsetHeight + 2 + 32 + (it.tags ? 40 : 0);   // border, margins
      const pw = Math.min(maxW - fw, it.zw, r > 2.9 ? 1000 : (maxH - fh) / r);
      return [Math.min(maxW, Math.max(side ? 0 : 480, pw + fw)), r > 2.9 ? maxH : Math.min(maxH, Math.max(320, pw * r + fh))];
    },
    keys: (e) => {
      if (e.key === 'ArrowLeft' && w.set.length > 1) zvShow(w, w.at - 1);
      else if (e.key === 'ArrowRight' && w.set.length > 1) zvShow(w, w.at + 1);
      else if (e.key === 'z' || e.key === '+' || e.key === '-') zvZoom(w, !w.zoomed);
      else return false;
      return true;
    },
    leave: (out) => zvFly(w, out),
    land: () => zvGhostOut(w),
    end: () => { ++w.token; zvGhostOut(w); },
    badge: () => { const it = w.set[w.at]; return { src: it.src, name: it.cap, full: `${it.no} · ${it.cap}` }; },
    lang: () => { w.set = ZV_SETS[w.kind](w.key); zvText(w); zvSize(w); },
  });
  w.zoomBtn.addEventListener('click', () => zvZoom(w, !w.zoomed));
  q('.zv-prev').addEventListener('click', () => zvShow(w, w.at - 1));
  q('.zv-next').addEventListener('click', () => zvShow(w, w.at + 1));
  /* the wheel zooms; a click toggles zoom at that point (in the pop-up, a click beside the picture closes it); a mouse
     drag moves a picture bigger than its window */
  const st = w.stage;
  st.addEventListener('wheel', (e) => zvWheel(w, e), { passive: false });
  st.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0 || (st.scrollWidth <= st.clientWidth + 1 && st.scrollHeight <= st.clientHeight + 1)) return;
    w.pan = { x: e.clientX, y: e.clientY, l: st.scrollLeft, t: st.scrollTop, moved: false };
    st.setPointerCapture(e.pointerId);
  });
  st.addEventListener('pointermove', (e) => {
    const p = w.pan;
    if (!p) return;
    const dx = e.clientX - p.x, dy = e.clientY - p.y;
    if (Math.abs(dx) + Math.abs(dy) > 4) { p.moved = true; st.classList.add('drag'); }
    st.scrollLeft = p.l - dx;
    st.scrollTop = p.t - dy;
  });
  const endPan = () => { st.classList.remove('drag'); setTimeout(() => { w.pan = null; }, 0); };
  st.addEventListener('pointerup', endPan);
  st.addEventListener('pointercancel', endPan);
  st.addEventListener('click', (e) => {
    if ((w.pan && w.pan.moved) || e.target.closest('.zv-tags')) return;
    const r = w.img.getBoundingClientRect();
    if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) zvZoom(w, !w.zoomed, e.clientX, e.clientY);
    else if (w.pop && !w.zoomed) zvClose(w);
  });
  return w;
}
/* open a picture: in a new window, or the one it is open in already (in the dock too) comes to the front */
function zvOpen(kind, i, from) {
  const key = kind === 'work' || kind === 'proc' ? lastWork : kind === 'piece' ? `${lastWork}/${lastPiece}` : kind === 'book' ? lastBook : kind === 'catalog' ? currentCatalog.ev : kind === 'board' ? bdKeyNow : '';
  const set = ZV_SETS[kind](key), at = (i + set.length) % set.length;
  const same = zvWins.find((o) => !o.shut && o.kind === kind && o.key === key && o.at === at);
  if (same) { same.from = from; same.at0 = at; zvBack(same); return; }
  const w = zvMake(kind, key, set, from);
  w.at = w.at0 = at;
  zvPut(w);
  zvShow(w, at, true);
  zvFly(w, false);
}
addEventListener('resize', () => zvWins.forEach((w) => (w.pop || w.max ? zvFull(w) : zvBox(w, w.box.x, w.box.y, w.box.w, w.box.h))));
addEventListener('keydown', (e) => {   // the pop-up takes the keys wherever the focus is (a window, when the focus is in it)
  const p = zvWins.find((o) => o.pop && !o.shut);
  if (p && !zvInWin(e)) zvKey(p, e);
});

$('#wk-tl-jump').addEventListener('click', () => $('#wk-tl').scrollIntoView({ behavior: CALM ? 'auto' : 'smooth', block: 'center' }));
$('#shot-big').addEventListener('click', (e) => zvOpen('shots', shotAt, e.currentTarget));
charList.addEventListener('click', (e) => { const b = e.target.closest('.char-btn'); if (b) zvOpen('chars', artChars.indexOf(+b.dataset.n), b); });
$('#wk-imgs').addEventListener('click', (e) => {
  const im = e.target.closest('img');
  if (!im || im.closest('a')) return;   // a collection's grid: each piece is a link to its own page
  zvOpen(lastPiece >= 0 ? 'piece' : 'work', [...$('#wk-imgs').querySelectorAll('img')].indexOf(im), im);
});
$('#wk-proc-box').addEventListener('click', (e) => {
  const im = e.target.closest('img');
  if (im) zvOpen('proc', [...$('#wk-proc-box').querySelectorAll('img')].indexOf(im), im);
});

/* ==================== js/menu.js ==================== */
/* Phone menu */
/* ---------- phone menu ---------- */
const menuBtn = $('#menu-btn');
/* Work and About: their pages in a list under the name, in the header and in the phone menu. The name is a button:
   a click or a tap opens or closes its list; in the header a mouse coming over it opens it too, and leaving closes it */
const navGrps = [...document.querySelectorAll('.nav-grp, .m-grp')];
/* the header's band: its row of pages with its middle under the name (kept off the screen's edges), and the way down
   to it from the name, under the name only, so the names beside it stay as they are */
function subPlace(g) {
  const sub = g.lastElementChild, top = g.firstElementChild.getBoundingClientRect(), lbl = g.querySelector('.nav-lbl').getBoundingClientRect();
  const as = sub.querySelectorAll('a'), w = as[as.length - 1].getBoundingClientRect().right - as[0].getBoundingClientRect().left;
  const x = Math.max(16, Math.min(document.documentElement.clientWidth - w - 16, lbl.left + lbl.width / 2 - w / 2));
  sub.style.setProperty('--sub-x', `${Math.round(x)}px`);
  sub.style.setProperty('--br-x', `${Math.round(top.left - 8)}px`);
  sub.style.setProperty('--br-w', `${Math.round(top.width + 16)}px`);
}
function grpSet(g, open) {
  if (open && g.classList.contains('nav-grp')) subPlace(g);
  g.classList.toggle('open', open);
  g.firstElementChild.setAttribute('aria-expanded', String(open));
  if (!open) delete g.dataset.hover;
}
const grpsShut = (keep) => navGrps.forEach((g) => { if (g !== keep && g.classList.contains('nav-grp') && g.classList.contains('open')) grpSet(g, false); });
navGrps.forEach((g) => {
  g.firstElementChild.addEventListener('click', () => {
    if (g.dataset.hover) { delete g.dataset.hover; return; }   // it opened as the mouse came over: the click keeps it open
    grpsShut(g);
    grpSet(g, !g.classList.contains('open'));
  });
  if (!g.classList.contains('nav-grp')) return;
  let shut = 0;
  g.addEventListener('pointerenter', (e) => {
    if (e.pointerType !== 'mouse') return;
    clearTimeout(shut);
    if (!g.classList.contains('open')) { grpsShut(g); grpSet(g, true); g.dataset.hover = '1'; }
  });
  g.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') shut = setTimeout(() => grpSet(g, false), 200); });
  g.addEventListener('focusout', (e) => { if (!g.contains(e.relatedTarget)) grpSet(g, false); });
});
document.addEventListener('click', (e) => {   // a page chosen, or a click anywhere else: the header's list closes
  const t = e.target instanceof Element ? e.target : null;
  navGrps.forEach((g) => { if (g.classList.contains('nav-grp') && g.classList.contains('open') && (!t || !g.contains(t) || t.closest('a'))) grpSet(g, false); });
});
addEventListener('hashchange', () => grpsShut());
let navW = innerWidth;
addEventListener('resize', () => { if (innerWidth !== navW) { navW = innerWidth; grpsShut(); } });   // a new width: the band would be out of place
function setMenu(open) {
  document.documentElement.classList.toggle('menu-open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.querySelector('.menu-lbl').textContent = open ? 'CLOSE' : 'MENU';
  if (open) navGrps.forEach((g) => { if (g.classList.contains('m-grp')) grpSet(g, !!g.querySelector('a[aria-current="page"]')); });   // the shown page's list open
  if (open) $('#m-nav').scrollTop = 0;
}
menuBtn.addEventListener('click', () => setMenu(!document.documentElement.classList.contains('menu-open')));
$('#m-nav').addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  const g = navGrps.find((x) => x.classList.contains('nav-grp') && x.classList.contains('open'));
  if (g) { grpSet(g, false); g.firstElementChild.focus(); }   // the header's list: closed, back on its name
  setMenu(false);
});
matchMedia('(max-width: 959px)').addEventListener('change', (e) => { if (!e.matches) setMenu(false); });

/* ==================== js/goods.js ==================== */
/* Goods: prices, the goods list, goods item pages */
/* price: [original struck] NT$x [/ 款] [場次價] */
function price(g, label) {
  const p = el('span', 'price');
  if (g.was) p.appendChild(el('s', '', `NT$${g.was}`));
  p.appendChild(document.createTextNode(`NT$${g.price}`));
  for (const key of [g.unit && 'price.per', label && 'price.event'].filter(Boolean)) {
    const note = el('small', '', tr(key));
    note.dataset.i18n = key; p.appendChild(note);
  }
  return p;
}

/* ---------- goods list: by year, on a timeline with a bar and a sort menu like the art books'. Each event (a goods'
   `ev`, "FF47") is under its year's heading: its catalog, which opens its own page (#g-ff47-catalog)
   with the event's goods under its pages; an event without a catalog lists its goods there. Only events that have
   goods or a catalog are listed ---------- */
const goodsList = $('#g-list'), goodsBar = $('#g-years'), goodsNav = $('#g-years-in');
const goodsHeadings = new Map();   // each year's heading, in the order shown
const catalogByEvent = new Map(CATALOGS.map((c) => [c.ev, c]));
const catalogSlug = (c) => c.ev.toLowerCase() + '-catalog';
const catalogName = (c) => tr('goods.catalog', { ev: c.ev });
const goodsEditions = [...new Set([...GOODS.map((g) => g.ev), ...catalogByEvent.keys()])];
function evYear(ev) {
  const date = catalogByEvent.get(ev)?.d || BOOKS.find((b) => b.ev === ev)?.ym || EVENTS.find((e) => e.name === evName(ev))?.from;
  return date ? date.slice(0, 4) : String(GOODS.find((g) => g.ev === ev && g.year)?.year || ev);
}
const goodsYears = [...new Set(goodsEditions.map(evYear))].sort().reverse();
const catalogCards = new Map();
let goodsOrder = 'new', currentCatalog = null;

/* A standalone product photo or the matching event's catalog page, in the same [path, width, height] format. */
function goodsImage(g) {
  if (g.image) return g.image;
  const catalog = catalogByEvent.get(g.ev), dims = catalog?.dims[g.pg];
  return dims ? [src(catalog.id, g.pg), dims[0], dims[1]] : null;
}
/* a goods card: its page of the catalog (pg), then its name, contents and price (fillGoodsCard, again in another
   language) */
function goodsCard(g, i, inCatalog = false) {
  const a = el('a', 'g-card');
  a.href = '#g-' + g.slug;
  a.id = 'gc-' + g.slug;
  a.dataset.rv = 'clip';
  a.dataset.d = `${(i % 3) * 0.1}s`;
  const box = el('span', 'g-img mask');
  const media = goodsImage(g);
  if (media) {
    const img = el('img');
    img.width = media[1]; img.height = media[2];
    img.alt = ''; img.decoding = 'async';
    if (inCatalog) img.dataset.src = media[0];
    else { img.loading = i < 3 ? 'eager' : 'lazy'; img.src = media[0]; }
    box.appendChild(img);
    a.appendChild(box);
  }
  a.append(el('span', 'g-name'), el('span', 'g-meta'), price(g, false));
  fillGoodsCard(a, g);
  return a;
}
function fillGoodsCard(a, g) {
  a.querySelector('.g-name').textContent = L(g.name);
  a.querySelector('.g-meta').textContent = L(g.meta);
}
/* goods as cards, three to a row */
function goodsGrid(items) {
  const grid = el('div', 'g-grid');
  grid.append(...items.map((g, i) => goodsCard(g, i)));
  return grid;
}

/* the catalog's place in its year: its first three pages dealt as a hand of cards, as a collection's cover on the
   works wall, in page order from left to right, the first on top and each next one under it; then its event's full
   name (as big as an art book's event under its name), its own name, how many pages, and an arrow to its page */
function catalogCover(catalog) {
  const a = el('a', 'catalog-cover');
  a.id = 'gc-' + catalogSlug(catalog);
  a.href = '#g-' + catalogSlug(catalog);
  const hand = handOf(catalog.dims.slice(0, 3).map(([W, H], n) => [src(catalog.id, n), W, H]), true);
  const fan = el('span', 'catalog-hand frame fan');
  fan.style.cssText = `--ar:${hand.r.toFixed(4)};--cw:${hand.cwp}`;
  fan.innerHTML = hand.cards;
  fan.append(...[...fan.children].reverse());   // the first page last, so in front
  const caption = el('span', 'catalog-caption');
  const title = el('span', 'g-name');
  const count = el('span', 'g-meta');
  const arrow = el('span', 'catalog-arrow', '→');
  arrow.setAttribute('aria-hidden', 'true');
  caption.append(el('span', 'catalog-ev', evName(catalog.ev)), title, count, arrow);
  a.append(fan, caption);
  return a;
}
/* the list in the order picked (the newest year first, or the oldest; its events the same way), and the bar's
   buttons to match */
function renderGoods() {
  const years = goodsOrder === 'new' ? goodsYears : [...goodsYears].reverse();
  goodsHeadings.clear();
  goodsNav.replaceChildren();
  goodsList.replaceChildren(...years.map((y) => {
    const section = el('section', 'ab-year');
    const heading = el('h2', 'wall-year');
    heading.dataset.rv = 'year';
    heading.append(el('span', 'wy-n', y), el('span', 'wy-line'));
    goodsHeadings.set(y, heading);
    section.append(heading);
    const button = el('button', '', y);
    button.type = 'button';
    button.dataset.y = y;
    goodsNav.append(button);
    const events = goodsEditions.filter((code) => evYear(code) === y);
    (goodsOrder === 'new' ? events : events.reverse()).forEach((code) => {
      const catalog = catalogByEvent.get(code);
      if (catalog) {
        if (!catalogCards.has(code)) catalogCards.set(code, catalogCover(catalog));
        section.append(catalogCards.get(code));
      } else {
        section.append(el('h3', 'catalog-ev', evName(code)), goodsGrid(GOODS.filter((g) => g.ev === code)));
      }
    });
    return section;
  }));
  goodsText();
}
/* the words that change with the language: the sort menu's, the bar's buttons, and the catalog's page count */
function goodsText() {
  goodsSortText(goodsOrder, goodsYears[goodsYears.length - 1], goodsYears[0]);
  goodsNav.querySelectorAll('button').forEach((b) => b.setAttribute('aria-label', tr('years.go', { y: b.dataset.y })));
  catalogCards.forEach((card, ev) => {
    const catalog = catalogByEvent.get(ev);
    card.querySelector('.g-name').textContent = catalogName(catalog);
    card.querySelector('.g-meta').textContent = pagesText(catalog.dims.length);
  });
}
/* the bar: a button goes to its year, the one in view lights up; another order lays the list out again, and the
   buttons slide to their new places */
const goodsYearsUpdate = timelineNavigation(goodsBar, goodsList, goodsHeadings);
const goodsSortText = sortControl($('#g-sort'), (dir) => {
  if (dir === goodsOrder) return;
  const was = yearSpots(goodsNav);
  goodsOrder = dir;
  renderGoods();
  watch(prime(goodsList));
  slideYears(goodsNav, was);
  const top = goodsList.getBoundingClientRect().top + scrollY - $('.site-head').offsetHeight - goodsBar.offsetHeight - 14;
  if (scrollY > top) scrollTo({ top, behavior: CALM ? 'auto' : 'smooth' });
  goodsYearsUpdate();
});
/* ---------- an event's catalog page: its date and page count; its pages side by side, to be dragged left and right;
   then the event's goods, the cards that open their item pages ---------- */
const catalogPages = $('#catalog-pages');
function loadCatalogImage(img) {
  if (!img?.dataset.src) return;
  img.src = img.dataset.src;
  delete img.dataset.src;
  catalogObserver?.unobserve(img);
}
const catalogObserver = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
  for (const entry of entries) if (entry.isIntersecting) loadCatalogImage(entry.target);
}, { rootMargin: '40px' }) : null;
function watchCatalogImages(root) {
  for (const img of root.querySelectorAll('img[data-src]')) {
    if (catalogObserver) catalogObserver.observe(img);
    else { img.loading = 'lazy'; loadCatalogImage(img); }
  }
}
/* rebuilt when the event changes (catalogText and js/lang-switch.js update the words); `fresh`, not back
   from one of its goods: from the first page */
function renderCatalog(catalog, fresh) {
  if (currentCatalog !== catalog) {
    catalogObserver?.disconnect();
    currentCatalog = catalog;
    catalogDrag = catalogTo = null;
    catalogPages.classList.remove('held');
    $('#catalog-event').textContent = evName(catalog.ev);
    $('#catalog-pixiv').href = 'https://www.pixiv.net/artworks/' + catalog.id;
    catalogPages.replaceChildren(...catalog.dims.map(([width, height], i) => {
      const img = el('img');
      if (i === 0) { img.fetchPriority = 'high'; img.src = src(catalog.id, i); }
      else img.dataset.src = src(catalog.id, i);
      img.width = width; img.height = height;
      img.decoding = 'async';
      img.draggable = false;
      return img;
    }));
    const grid = $('#catalog-goods');
    grid.replaceChildren(...GOODS.filter((g) => g.ev === catalog.ev).map((g, i) => goodsCard(g, i, true)));
    watchCatalogImages(grid);
  }
  if (fresh) catalogPages.scrollLeft = 0;
  catalogText();
  catalogAt();
}
// Load the other visible pages once the cover is ready. Scrolling and the arrows can request a page sooner.
function catalogCoverReady(e) {
  if (e.target === catalogPages.firstElementChild) watchCatalogImages(catalogPages);
}
catalogPages.addEventListener('load', catalogCoverReady, true);
catalogPages.addEventListener('error', catalogCoverReady, true);
/* the words that change with the language: the date, the page count, each page's description */
function catalogText() {
  if (!currentCatalog) return;
  const catalog = currentCatalog, m = catalog.dims.length;
  $('#catalog-title').textContent = catalogName(catalog);
  $('#catalog-date').textContent = tr('wk.posted', { d: dot(catalog.d) });
  $('#catalog-count').textContent = pagesText(m);
  [...catalogPages.children].forEach((img, i) => { img.alt = tr('wk.imgAlt', { t: catalogName(catalog), n: i + 1, m }); });
}
/* the pages side by side: the mouse drags them left and right (a finger swipes them, a trackpad scrolls them), and
   each comes to rest in the middle (scroll snap); a drag of a fifth of a page or more goes on to the next one. The
   arrows under them turn a page, and the count between shows the page in the middle. A page clicked without being
   dragged opens in a picture window */
let catalogDrag = null;
const catalogStep = () => { const [a, b] = catalogPages.children; return b ? b.offsetLeft - a.offsetLeft : 0; };
function catalogAt() {
  const step = catalogStep(), n = catalogPages.children.length;
  const i = step ? Math.min(n - 1, Math.max(0, Math.round(catalogPages.scrollLeft / step))) : 0;
  loadCatalogImage(catalogPages.children[i]);
  $('#catalog-at').textContent = `${i + 1} / ${n}`;
  $('#catalog-prev').disabled = i === 0;
  $('#catalog-next').disabled = i === n - 1;
  return i;
}
function catalogGo(i) {
  const n = catalogPages.children.length;
  loadCatalogImage(catalogPages.children[i]);
  catalogPages.scrollTo({ left: Math.min(n - 1, Math.max(0, i)) * catalogStep(), behavior: CALM ? 'auto' : 'smooth' });
}
catalogPages.addEventListener('pointerdown', (e) => {
  if (catalogPages.childElementCount > 1 && e.pointerType !== 'touch' && e.button === 0) catalogDrag = { x: e.clientX, left: catalogPages.scrollLeft, id: e.pointerId, moved: false };
});
catalogPages.addEventListener('pointermove', (e) => {
  const d = catalogDrag;
  if (!d || e.pointerId !== d.id || (!d.moved && Math.abs(e.clientX - d.x) < 6)) return;
  if (!d.moved) {   // a drag, not a click: the pages follow the mouse, unsnapped
    d.moved = true;
    catalogTo = null;   // (taken again while still gliding)
    catalogPages.setPointerCapture(d.id);
    catalogPages.classList.add('held');
  }
  catalogPages.scrollLeft = d.left - (e.clientX - d.x);
});
/* let go, the pages glide to the page in the middle with snapping off, and it comes back once they are there: not at
   the first scrollend, which can be the drag's own last move, so that snapping came back as the glide began and the
   pages jumped instead (it depended on how the mouse was let go) */
let catalogTo = null;   // where the pages are gliding to (scrollLeft)
function catalogRest() {
  if (catalogTo === null || (catalogDrag && catalogDrag.moved) || Math.abs(catalogPages.scrollLeft - catalogTo) > 1) return;
  catalogTo = null;
  catalogPages.classList.remove('held');
}
catalogPages.addEventListener('scrollend', catalogRest);
const catalogLetGo = (e) => {
  const d = catalogDrag;
  if (!d || e.pointerId !== d.id) return;
  catalogDrag = null;
  if (!d.moved) return;
  const step = catalogStep(), n = catalogPages.children.length, went = catalogPages.scrollLeft - d.left;
  let to = Math.round(catalogPages.scrollLeft / step);
  if (to === Math.round(d.left / step) && Math.abs(went) >= step / 5) to += Math.sign(went);
  to = Math.min(n - 1, Math.max(0, to));
  const target = catalogTo = to * step;
  catalogGo(to);
  catalogRest();   // already there: no glide, no scrollend
  setTimeout(() => {   // a glide cut short by another scroll: snapping comes back all the same
    if (catalogTo !== target || (catalogDrag && catalogDrag.moved)) return;
    catalogTo = null;
    catalogPages.classList.remove('held');
  }, 1500);
};
catalogPages.addEventListener('pointerup', catalogLetGo);
catalogPages.addEventListener('pointercancel', catalogLetGo);
catalogPages.addEventListener('scroll', catalogAt, { passive: true });
$('#catalog-prev').addEventListener('click', () => catalogGo(catalogAt() - 1));
$('#catalog-next').addEventListener('click', () => catalogGo(catalogAt() + 1));
catalogPages.addEventListener('click', (e) => {
  if (e.target.matches('img')) zvOpen('catalog', [...catalogPages.children].indexOf(e.target), e.target);
});

/* ---------- goods item page ---------- */
/* the picture: the item's page of the catalog, which the page morph lands on from the goods' card (js/router.js).
   A click (or Enter) takes the goods out, a step at a time: the page grows to the right, still a square, its words
   going under it (a View Transition morphs the page into its new place); then the page fades from over the cut-out
   goods (tools/goods_pieces.py) and the background, which lie just as it draws them, so only its words go; then the
   picture widens to the right over the background as the goods move together to its middle across (each keeps its
   place in the group; what is centred is the part of them inside the frame); then the background fades from round them. Then a piece taken with the mouse (or a pen)
   follows it about the room, lifted in front of the others, its middle never past the room's edges; a finger still
   scrolls the page. ✕ goes back the same steps: the pieces go home as the background fades in, the picture narrows to
   the page, the page fades in over them, the page shrinks back */
const itGd = $('#v-item .gd'), itStage = $('#it-stage'), itPage = $('#it-page'), itGoods = $('#it-goods');
const itHint = itGd.querySelector('.gd-hint');
const FADE = 600, WIDEN = 700, BG = 800;   // ms (css/goods.css): the page's fade, the widening (and the goods' move), the background's fade
let itTop = 0, itStep = 0;   // the pieces' stacking; the steps under way (a newer open or close calls off the older)
/* the picture's next step after ms, unless an open or a close has begun since */
function itemLater(ms, step) {
  const s = itStep;
  setTimeout(() => { if (s === itStep) step(); }, ms);
}
const itemPic = () => (itGd.classList.contains('open') ? null : itPage);   // what the page morph lands on, while it is the page
/* a change of the picture's layout, morphing the page into its new place (no morph: at once) */
function itemSwap(change, then) {
  if (!VT) { change(); then(); return; }
  itPage.style.viewTransitionName = 'gd-page';
  document.documentElement.classList.add('gd-swap');
  document.startViewTransition(change).finished.catch(() => {}).finally(() => {
    itPage.style.viewTransitionName = '';
    document.documentElement.classList.remove('gd-swap');
    then();
  });
}
async function itemOpen() {
  if (!itGoods.childElementCount || itGd.classList.contains('open') || itStage.hasAttribute('aria-busy')) return;
  const s = ++itStep;
  itStage.setAttribute('aria-busy', 'true');
  const bg = itStage.querySelector('.gd-bg');
  const pictures = [...itGoods.children];
  if (bg.dataset.src) pictures.push(bg);
  const ready = await Promise.allSettled(pictures.map((img) => {
    if (!img.hasAttribute('src') || (img.complete && !img.naturalWidth)) img.src = img.dataset.src;
    return img.decode();
  }));
  if (s !== itStep) return;
  itStage.removeAttribute('aria-busy');
  if (view !== 'item') return;
  if (ready.some((result) => result.status === 'rejected')) {
    itHint.dataset.i18n = 'item.retry';
    setText(itHint, tr('item.retry'));
    itStage.setAttribute('aria-label', tr('item.retry'));
    return;
  }
  itHint.dataset.i18n = 'item.takeOut';
  setText(itHint, tr('item.takeOut'));
  itemSwap(() => {
    if (s !== itStep) return;
    itGd.classList.add('open'); itStage.removeAttribute('role'); itStage.removeAttribute('aria-label'); itStage.tabIndex = -1;
    /* the grown picture in view: where it was if it fits there, else as near as the screen lets it, never under the header */
    const r = itStage.getBoundingClientRect(), top = $('.site-head').getBoundingClientRect().bottom + 16;
    scrollBy(0, r.top - Math.max(top, Math.min(r.top, innerHeight - 16 - r.height)));
  }, () => {
    if (s !== itStep) return;
    itGd.classList.add('plain');   // the page's words fade; the goods and the background stay
    itemLater(CALM ? 0 : FADE, () => {
      itGd.classList.add('wide');   // the picture widens to the right over the background, the goods move to its middle
      itemCentre();
      itemLater(CALM ? 0 : WIDEN, () => { itGoods.classList.remove('glide'); itGd.classList.add('cut'); });
    });
  });
}
/* a piece's shape, row by row: where it is at least half opaque, as [left, right] in its own width (0–1), null for a
   clear row; read once from its picture (the site's own, so a canvas may read it) */
const itInk = new Map();
function itemInk(p) {
  if (itInk.has(p.src)) return itInk.get(p.src);
  if (!p.complete || !p.naturalWidth) return null;
  const w = Math.min(256, p.naturalWidth), h = Math.max(1, Math.round(w * p.naturalHeight / p.naturalWidth)), c = el('canvas');
  c.width = w; c.height = h;
  const g = c.getContext('2d', { willReadFrequently: true });
  g.drawImage(p, 0, 0, w, h);
  let px;
  try { px = g.getImageData(0, 0, w, h).data; } catch (_) { return null; }
  const rows = [];
  for (let y = 0; y < h; y++) {
    let a = -1, b = -1;
    for (let x = 0; x < w; x++) if (px[(y * w + x) * 4 + 3] >= 128) { if (a < 0) a = x; b = x; }
    rows.push(a < 0 ? null : [a / w, (b + 1) / w]);
  }
  itInk.set(p.src, rows);
  return rows;
}
/* the goods together to the middle of the frame across, each keeping its place in the group (the room: the frame's
   whole width already, the clip only shows it). What is centred is what of them lies within the frame's height, by
   their shapes: a piece reaching out under it (the big bag) still moves whole, to be dragged in, but its unseen part
   doesn't pull the group off the middle */
function itemCentre() {
  const ps = [...itGoods.children], sq = itGoods.getBoundingClientRect(), room = itStage.getBoundingClientRect();
  if (!ps.length || !sq.width) return;
  let a = Infinity, b = -Infinity;
  ps.forEach((p) => {
    const r = p.getBoundingClientRect(), rows = itemInk(p) || [[0, 1]], n = rows.length;
    const to = Math.min(n, Math.ceil((room.bottom - r.top) / r.height * n));
    for (let y = Math.max(0, Math.floor((room.top - r.top) / r.height * n)); y < to; y++) {
      if (rows[y]) { a = Math.min(a, r.left + rows[y][0] * r.width); b = Math.max(b, r.left + rows[y][1] * r.width); }
    }
  });
  if (a > b) return;   // none of them in the frame
  const d = ((room.left + room.right) / 2 - (a + b) / 2) / sq.width * 100;
  if (!CALM) itGoods.classList.add('glide');
  ps.forEach((p) => { p.style.left = `${(parseFloat(p.style.left) + d).toFixed(3)}%`; p.dataset.mid = p.style.cssText; });   // (where ✕ gathers them first)
}
function itemClose(now) {
  const s = ++itStep;
  itStage.removeAttribute('aria-busy');
  if (!itGd.classList.contains('open')) return;
  const shut = () => {
    if (s !== itStep) return;
    itGd.classList.remove('open', 'wide', 'plain');
    itStage.setAttribute('role', 'button');
    itStage.setAttribute('aria-label', tr('item.takeOut'));
    itStage.tabIndex = 0;
  };
  const ps = [...itGoods.querySelectorAll('img')];
  itGoods.classList.remove('glide', 'home');   // (a close cut short leaves its class)
  itGd.classList.remove('cut');
  if (now || !VT || CALM) { ps.forEach((p) => { p.style.cssText = p.dataset.home; }); shut(); return; }
  /* the other way: the pieces gather into their group in the middle as the background fades back in; the picture
     narrows to the page as they move home with it; the page fades in over them; it shrinks */
  itGoods.classList.add('home');
  ps.forEach((p) => { p.style.cssText = p.dataset.mid || p.dataset.home; });
  itemLater(BG, () => {
    itGoods.classList.replace('home', 'glide');
    ps.forEach((p) => { p.style.cssText = p.dataset.home; });
    itGd.classList.remove('wide');
    itemLater(WIDEN, () => {
      itGoods.classList.remove('glide');
      itGd.classList.remove('plain');
      itemLater(FADE, () => itemSwap(shut, () => {}));
    });
  });
}
itStage.addEventListener('click', () => itemOpen());
itStage.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === ' ') && !itGd.classList.contains('open')) { e.preventDefault(); itemOpen(); }
});
$('#it-out').addEventListener('click', () => itemClose());
itGoods.addEventListener('pointerdown', (e) => {
  const p = e.target.closest('img');
  if (!p || !itGd.classList.contains('cut') || e.pointerType === 'touch' || e.button !== 0) return;
  e.preventDefault();
  /* places in % of the page's square; the room is the whole picture, the square at its left */
  const sq = itGoods.getBoundingClientRect(), room = itStage.getBoundingClientRect();
  const x0 = parseFloat(p.style.left), y0 = parseFloat(p.style.top);
  const pw = p.offsetWidth / sq.width * 100, ph = p.offsetHeight / sq.height * 100;
  const xMax = room.width / sq.width * 100 - pw / 2, yMax = room.height / sq.height * 100 - ph / 2;
  p.style.zIndex = ++itTop;
  p.classList.add('held');
  p.setPointerCapture(e.pointerId);
  const move = (m) => {
    const x = x0 + (m.clientX - e.clientX) / sq.width * 100, y = y0 + (m.clientY - e.clientY) / sq.height * 100;
    p.style.left = `${Math.min(xMax, Math.max(-pw / 2, x)).toFixed(3)}%`;
    p.style.top = `${Math.min(yMax, Math.max(-ph / 2, y)).toFixed(3)}%`;
  };
  const up = () => {
    p.classList.remove('held');
    p.removeEventListener('pointermove', move); p.removeEventListener('pointerup', up); p.removeEventListener('pointercancel', up);
  };
  p.addEventListener('pointermove', move); p.addEventListener('pointerup', up); p.addEventListener('pointercancel', up);
});
function renderItem(i) {
  const g = GOODS[i];
  /* the picture: its page of the catalog, and under it the cut-out pieces (parts), in the page's pixels */
  itemClose(true);
  const catalog = catalogByEvent.get(g.ev), media = goodsImage(g);
  const parts = media ? (g.parts || []) : [];
  const interactive = parts.length > 0;
  itStage.closest('figure').hidden = !media;
  itHint.hidden = !interactive;
  itHint.dataset.i18n = 'item.takeOut';
  setText(itHint, tr('item.takeOut'));
  if (media) [itPage.src, itPage.width, itPage.height] = media;
  else itPage.removeAttribute('src');
  const bg = itStage.querySelector('.gd-bg');
  bg.removeAttribute('src');
  bg.dataset.src = interactive ? catalog?.bg || '' : '';
  bg.hidden = !bg.dataset.src;
  bg.loading = 'eager';   // the source is set only after the visitor opens the item
  if (interactive) {
    itStage.setAttribute('role', 'button');
    itStage.tabIndex = 0;
  } else {
    itStage.removeAttribute('role');
    itStage.removeAttribute('aria-label');
    itStage.removeAttribute('tabindex');
  }
  itGoods.replaceChildren(...parts.map(([x, y, w, h], n) => {
    const p = el('img');
    const [, W, H] = media;
    p.dataset.src = `img/goods-${g.slug}-${n + 1}.webp`; p.width = w; p.height = h; p.alt = ''; p.draggable = false; p.decoding = 'async';
    p.style.cssText = p.dataset.home = `left:${(x / W * 100).toFixed(3)}%;top:${(y / H * 100).toFixed(3)}%;width:${(w / W * 100).toFixed(3)}%`;
    return p;
  }));
  $('#it-price').replaceChildren(...price(g, true).childNodes);
  const rows = [
    ['spec.size', g.size], ['spec.spec', g.spec], ['spec.' + g.list_title, g.items],
    ['spec.offer', g.note], ['spec.debut', catalog?.debut || evName(g.ev)],
  ].filter(([, value]) => value);
  $('#it-spec').replaceChildren(...rows.map(([key, value], n) => {
    const d = el('div');
    d.dataset.rv = 'up';
    d.dataset.d = `${n * 0.07}s`;
    const dt = el('dt', '', tr(key)), dd = el('dd');
    dt.dataset.i18n = key;
    dd._value = value;
    d.append(dt, dd);
    return d;
  }));

  $('#it-works-box').hidden = !g.works?.length;
  $('#it-works').replaceChildren(...(g.works || []).filter((id) => id in byId).map((id, n) => {
    const w = WORKS[byId[id]];
    const a = el('a'); a.href = '#w-' + id;
    a.dataset.rv = 'up'; a.dataset.d = `${n * 0.1}s`;
    const im = el('img'); im.src = src(id, 0); im.alt = ''; im.loading = 'lazy'; im.style.objectPosition = w.pos;
    a.append(im, el('span'));
    return a;
  }));

  const p = GOODS[(i - 1 + GOODS.length) % GOODS.length];
  const nx = GOODS[(i + 1) % GOODS.length];
  $('#it-prev').href = '#g-' + p.slug;
  $('#it-next').href = '#g-' + nx.slug;
  itemText(i);
}

function itemText(i) {
  const g = GOODS[i];
  $('#it-lab').textContent = L(g.eyebrow);
  $('#it-title').textContent = L(g.name);
  linkLine($('#it-books'), tr('item.books'), (g.books || []).filter((s) => s in byBook).map((s) => [BOOKS[byBook[s]].t, '#ab-' + s]));
  itPage.alt = tr('item.imgAlt', { t: L(g.name) });
  if (itStage.getAttribute('role') === 'button') itStage.setAttribute('aria-label', tr(itHint.dataset.i18n));
  $('#it-spec').querySelectorAll('dd').forEach((dd) => {
    const value = L(dd._value);
    if (!Array.isArray(value)) { dd.textContent = value; return; }
    const list = dd.firstElementChild || dd.appendChild(el('ol'));
    while (list.childElementCount > value.length) list.lastElementChild.remove();
    value.forEach((t, index) => { (list.children[index] || list.appendChild(el('li'))).textContent = t; });
  });
  $('#it-works').querySelectorAll('a').forEach((a) => { a.lastElementChild.textContent = L(WORKS[byId[a.hash.slice(3)]].t); });
  $('#it-prev-t').textContent = L(GOODS[(i - 1 + GOODS.length) % GOODS.length].name);
  $('#it-next-t').textContent = L(GOODS[(i + 1) % GOODS.length].name);
}

/* ==================== js/event.js ==================== */
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
}
function heroEventText() {
  const e = evNext()[0], a = $('#hero-ev');
  a.hidden = !e;
  if (!e) return;
  a.querySelector('.hero-ev-n').textContent = e.name;
  a.querySelector('.hero-ev-d').textContent = evDays(e);
  a.querySelector('.hero-ev-p').textContent = evPlace(e);
  a.setAttribute('aria-label', tr('ev.hero', { n: e.name, d: evDays(e), p: evPlace(e) }));
}

/* ==================== js/wall.js ==================== */
/* Works wall: categories, year headers and bar, sort menu, the cover layout */
/* ---------- cover wall: masonry; wide works span two columns so every cover shows its art at a similar
   scale, tall ones keep one full column, nothing is cropped, and later covers fill any hole ---------- */
const wall = $('#wall');
/* a cover: a picture that links on, with its words over it on hover (under it on touch screens); it flies in from
   a direction of its own, new on every visit. The wall's works, and a collection's pieces on its work page.
   `pics`: [src, width, height] of one picture, or of three dealt as a hand of cards (a collection on the wall). */
function makeCover(href, pics, pos, eager) {
  const fan = pics.length > 1 && handOf(pics, eager);
  const r = fan ? fan.r : pics[0][1] / pics[0][2], a = el('a', 'cover');
  a.href = href;
  a.dataset.rv = 'fly';
  a.dataset.d = `${(Math.random() * 0.22).toFixed(2)}s`;
  a.dataset.r = r.toFixed(4);
  if (fan) a.dataset.cw = fan.cw.toFixed(4);   // a card's share of the hand's width: the wall sizes the hand by its cards
  a.style.cssText = `--ar:${r.toFixed(4)};--pos:${pos}`;
  const ang = Math.random() * Math.PI * 2, dist = (150 + Math.random() * 150) * (innerWidth < 700 ? 0.55 : 1);
  a.style.setProperty('--fx', `${Math.round(Math.cos(ang) * dist)}px`);
  a.style.setProperty('--fy', `${Math.round(Math.sin(ang) * dist)}px`);
  a.style.setProperty('--fr', `${(Math.random() * 24 - 12).toFixed(1)}deg`);
  const art = fan ? `<span class="frame mask fan" style="--cw:${fan.cwp}">${fan.cards}` : `<span class="frame mask">${picTag(pics[0], eager)}`;
  a.innerHTML = `${art}<span class="ov" aria-hidden="true"><span class="ov-t"></span><span class="ov-m"></span></span></span><span class="cap" aria-hidden="true"><span class="cap-t"></span><span class="cap-m"></span></span>`;
  return a;
}
/* a picture [src, width, height] as an img tag */
function picTag([s, W, H], eager) {
  return `<img src="${s}" width="${W}" height="${H}" alt="" loading="${eager ? 'eager' : 'lazy'}" decoding="async">`;
}
/* pictures dealt as a hand of cards (dealCards), each on a card of its own shape: the cards (for a .frame.fan whose
   --cw is cwp, a card's share of the hand's width), the hand's width / height (r) and that share as a number (cw).
   A collection's cover on the works wall, a multi-picture post's on Home, the catalog's on the goods page */
function handOf(pics, eager) {
  const fan = dealCards(pics.map(([, W, H]) => W / H)), pct = (v) => `${(v * 100).toFixed(2)}%`;
  const cards = pics.map((p, k) => `<span class="fan-c" style="left:${pct(fan.cards[k].l)};top:${pct(fan.cards[k].t)};--r:${fan.cards[k].r.toFixed(1)}deg;--ca:${(p[1] / p[2]).toFixed(4)}">${picTag(p, eager)}</span>`).join('');
  return { r: fan.r, cw: fan.cw, cwp: pct(fan.cw), cards };
}
/* cards dealt loosely, from left to right and top to bottom: each a bit right of and below the one before and over
   it (the last in front), each at a slight turn of its own that grows from left to right, with a little chance in
   every step and turn so they never lie quite even (new on every page load, like the wall). Every card keeps its
   picture's shape at one width, so a squarer picture is a shorter card; the steps go between the cards' middles.
   Returns the box around them (width / height), a card's width (cw), and each card's top left corner before it
   turns (l, t) and its turn in degrees (r): fractions of that box. as: each card's width / height. */
function dealCards(as) {
  const hs = as.map((a) => 1 / a), hm = hs.reduce((s, h) => s + h, 0) / hs.length, wobble = (m) => (Math.random() * 2 - 1) * m;
  const cards = hs.map((h, k) => ({ h, mx: 0.5 + k * (0.34 + wobble(0.07)), my: hm / 2 + k * hm * (0.09 + wobble(0.04)), r: -8 + k * 7 + wobble(3) }));
  const xs = [], ys = [];
  for (const c of cards) {   // each card's corners, turned about its middle
    const t = c.r * Math.PI / 180, s = Math.sin(t), co = Math.cos(t);
    for (const [px, py] of [[-0.5, -c.h / 2], [0.5, -c.h / 2], [-0.5, c.h / 2], [0.5, c.h / 2]]) {
      xs.push(c.mx + px * co - py * s);
      ys.push(c.my + px * s + py * co);
    }
  }
  const x0 = Math.min(...xs), y0 = Math.min(...ys), W = Math.max(...xs) - x0, H = Math.max(...ys) - y0;
  return { r: W / H, cw: 1 / W, cards: cards.map((c) => ({ l: (c.mx - 0.5 - x0) / W, t: (c.my - c.h / 2 - y0) / H, r: c.r })) };
}
/* a collection on the wall shows three of its pieces, any of them whatever its shape, a new pick on every page load,
   in number order along the deal (the last in front) */
function coverPieces(w) {
  const pool = w.dims.map((d, n) => n);
  for (let k = pool.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [pool[k], pool[j]] = [pool[j], pool[k]]; }
  return pool.length >= 3 ? pool.slice(0, 3).sort((a, b) => a - b) : pool.slice(0, 1);
}
function coverText(a, t, meta, label) {
  a.querySelector('.ov-t').textContent = a.querySelector('.cap-t').textContent = t;
  a.querySelector('.ov-m').textContent = a.querySelector('.cap-m').textContent = meta;
  a.setAttribute('aria-label', label);
}
WORKS.forEach((w) => {
  const picks = w.pieces ? coverPieces(w) : [0];
  const a = makeCover('#w-' + w.id, picks.map((n) => [src(w.id, n), w.dims[n][0], w.dims[n][1]]), w.pos, false);
  a.id = 'c-' + w.id;
  a.dataset.n = picks[picks.length - 1];   // the picture in front: the page morph lands on its piece (js/router.js)
  a.dataset.date = madeOn(w);   // finished: the wall's order and its year headers
  a.dataset.cat = w.cat;
  fillCover(a, w);
  wall.appendChild(a);
});
/* a work cover's words; again on a language change (a collection's title is in three languages) */
function fillCover(a, w) {
  const meta = `${dot(madeOn(w))}${w.dims.length > 1 ? ' · ' + tr('cover.pages', { n: w.dims.length }) : ''}${w.yt ? ' · ' + tr('cover.video') : ''}`;
  coverText(a, L(w.t), meta, `${L(w.t)} (${dot(madeOn(w))})`);
}
/* Collage layout on a tight skeleton. Two lanes on wide screens (one on narrow ones), each two columns
   wide: a wide work fills a lane; single-column works go side by side with the next one in date order,
   so every cover keeps its whole picture and detail reads at one scale. Units go strictly in date order
   (newest or oldest first, as chosen), top left first, each into the shorter lane.
   On top of that, chance decides each cover's exact size (86-100% of its slot), its offset in the slot,
   the gaps, a small stagger between partners, an occasional tuck over the cover above or spill toward the
   next lane, and a slight tilt that straightens on hover. Touch screens get no overlaps, because their
   titles sit under the pictures. A new seed per page load gives a new arrangement; it stays put while
   browsing, so a cover is where you left it. */
const WALL_SEED = (Math.random() * 2 ** 32) >>> 0;
function seeded(seed) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
/* the wall shows one category at a time (Fan Art / Original Art); the other category's covers are hidden */
const allCovers = [...wall.querySelectorAll('.cover')].sort((a, b) => byMade(WORKS[byId[a.id.slice(2)]], WORKS[byId[b.id.slice(2)]]));
let wallOrder = [], wallCat = '', wallSort = 'new';   // wallSort: 'new' newest first, 'old' oldest first
let wallUnits = null;
/* the wall doubles as the timeline: a header opens every year, and the year bar above jumps between them */
let YEARS = [];   // in wall order
const yearHead = new Map();
const yearsIn = $('#years-in'), yearsBar = $('#years'), yearsProg = $('#years-prog');
/* show one category on the wall; returns whether it changed */
const nsfwBox = $('#nsfw');
function setCat(cat) {
  if (!CAT_LIST[cat] && cat !== 'nsfw') cat = 'fan';
  if (cat === wallCat) return false;
  wallCat = cat;
  indexWall();
  return true;
}
/* newest first or oldest first; returns whether it changed */
function setSort(dir) {
  if (dir === wallSort || (dir !== 'new' && dir !== 'old')) return false;
  wallSort = dir;
  if (wallCat) indexWall(); else sortText();
  return true;
}
/* a SORT pill and its menu (works wall, art books): open / close, newest or oldest first, Esc and arrow keys;
   the tap that closes it does not also open what is underneath. Returns the function that writes its words. */
function sortControl(box, onPick) {
  const btn = box.querySelector('.sortx-btn'), menu = box.querySelector('.sortx-menu');
  const open = (on) => {
    box.classList.toggle('open', on);
    btn.setAttribute('aria-expanded', String(on));
    if (on) menu.querySelector('[aria-checked="true"]').focus({ preventScroll: true });
  };
  btn.addEventListener('click', () => open(!box.classList.contains('open')));
  menu.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-sort]');
    if (!b) return;
    open(false);
    btn.focus({ preventScroll: true });
    onPick(b.dataset.sort);
  });
  document.addEventListener('click', (e) => {
    if (!box.classList.contains('open') || box.contains(e.target)) return;
    open(false);
    e.preventDefault(); e.stopPropagation();
  }, true);
  addEventListener('keydown', (e) => {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') { open(false); btn.focus(); }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const opts = [...menu.querySelectorAll('button')], k = opts.indexOf(document.activeElement);
      opts[(k + (e.key === 'ArrowDown' ? 1 : opts.length - 1)) % opts.length].focus();
    }
  });
  /* current order on the pill; each option shows which way its years run (a: earliest, b: latest) */
  return (dir, a, b) => {
    box.dataset.dir = dir;
    menu.querySelectorAll('button[data-sort]').forEach((x) => {
      x.setAttribute('aria-checked', String(x.dataset.sort === dir));
      x.querySelector('.sortx-hint').textContent = x.dataset.sort === 'new' ? `${b} → ${a}` : `${a} → ${b}`;
    });
    const v = tr(dir === 'new' ? 'sort.new' : 'sort.old');
    box.querySelector('.sortx-v').textContent = v;
    btn.setAttribute('aria-label', tr('sort.label', { v }));
  };
}
/* a timeline's bar (the art books', the goods'): a button scrolls to its year; the one in view lights up in the
   bar, and the gold line shows how far down the list you are. headings: each button's key to its heading, in
   the order shown. Returns the update, to call when the list is shown or laid out again */
function timelineNavigation(bar, list, headings) {
  const nav = bar.querySelector('.years-in');
  const progress = bar.querySelector('.years-prog i');
  nav.addEventListener('click', (e) => {
    const button = e.target.closest('button');
    if (!button) return;
    const heading = headings.get(button.dataset.y);
    const top = heading.getBoundingClientRect().top + scrollY - $('.site-head').offsetHeight - bar.offsetHeight - 14;
    scrollTo({ top, behavior: CALM ? 'auto' : 'smooth' });
  });
  let frame = 0;
  function update() {
    frame = 0;
    if (!bar.offsetHeight || !headings.size) return;
    const line = bar.getBoundingClientRect().bottom + 48;
    let current;
    for (const [key, heading] of headings) {
      if (current && heading.getBoundingClientRect().top > line) break;
      current = key;
    }
    for (const button of nav.querySelectorAll('button')) {
      const on = String(button.dataset.y === current);
      if (button.getAttribute('aria-current') === on) continue;
      button.setAttribute('aria-current', on);
      if (on === 'true' && nav.scrollWidth > nav.clientWidth) {
        nav.scrollTo({ left: nav.scrollLeft + button.getBoundingClientRect().left - nav.getBoundingClientRect().left - (nav.clientWidth - button.offsetWidth) / 2, behavior: CALM ? 'auto' : 'smooth' });
      }
    }
    const rect = list.getBoundingClientRect();
    progress.style.transform = `scaleX(${Math.min(1, Math.max(0, (line - rect.top) / rect.height)).toFixed(4)})`;
  }
  const schedule = () => { if (!frame && bar.offsetHeight) frame = requestAnimationFrame(update); };
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  return update;
}
/* after a re-sort the year buttons slide from where they were to their new places */
const yearSpots = (bar) => new Map([...bar.querySelectorAll('button')].map((y) => [y.dataset.y, y.getBoundingClientRect().left]));
function slideYears(bar, was) {
  if (CALM) return;
  bar.querySelectorAll('button').forEach((y, i) => {
    const dx = (was.get(y.dataset.y) ?? y.getBoundingClientRect().left) - y.getBoundingClientRect().left;
    if (Math.abs(dx) > 1) y.animate([{ transform: `translateX(${dx}px)` }, { transform: 'none' }], { duration: 750, delay: i * 25, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' });
  });
}
const worksSortText = sortControl($('#sort'), (dir) => {
  const was = yearSpots(yearsIn);
  if (!setSort(dir)) return;
  const els = prime(wall);   // the covers fly back in, in the new order
  layoutWall();
  watch(els);
  slideYears(yearsIn, was);
  const top = wall.getBoundingClientRect().top + scrollY - $('.site-head').offsetHeight - yearsBar.offsetHeight - 14;
  if (scrollY > top + 4) scrollTo({ top, behavior: CALM ? 'auto' : 'smooth' });   // start of the wall in its new order
});
function sortText() {
  const { a, b } = catVars();
  worksSortText(wallSort, a, b);
}
/* the covers of the category in date order, with their year headers and year bar */
function indexWall() {
  wallOrder = allCovers.filter((c) => c.dataset.cat === wallCat);
  if (wallSort === 'old') wallOrder.reverse();
  allCovers.forEach((c) => { c.hidden = c.dataset.cat !== wallCat; });
  const nsfw = wallCat === 'nsfw';   // no wall, year bar or sort menu: the blurred previews and the album link instead
  wall.hidden = yearsBar.hidden = nsfw;
  nsfwBox.hidden = !nsfw;
  const chars = $('#fan-chars'), back = chars.hidden && wallCat === 'fan';
  chars.hidden = wallCat !== 'fan';   // the character buttons (js/tag.js): fan art only; back on it, they rise in with the covers
  if (back && !CALM && !VIEWS.works.hidden) chars.animate([{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], { duration: 800, easing: 'cubic-bezier(.16,1,.3,1)' });
  YEARS = [...new Set(wallOrder.map((c) => c.dataset.date.slice(0, 4)))];
  yearHead.forEach((hd) => hd.remove());
  yearHead.clear();
  yearsIn.replaceChildren();
  YEARS.forEach((y) => {
    const hd = el('div', 'wall-year'); hd.dataset.y = y; hd.dataset.rv = 'year'; hd.setAttribute('aria-hidden', 'true');
    hd.append(el('span', 'wy-n', y), el('span', 'wy-line'), el('span', 'wy-c'));
    wall.appendChild(hd); yearHead.set(y, hd);
    const b = el('button', '', y); b.type = 'button'; b.dataset.y = y;
    yearsIn.appendChild(b);
  });
  wallUnits = null;
  yearNow = '';
  yearText();
  catText();
  sortText();
}
/* {n} works between {a} and {b} for the category on the wall */
function catVars() {
  const list = CAT_LIST[wallCat] || CAT_LIST.fan, ys = list.map((w) => madeOn(w).slice(0, 4)).sort();
  return { n: list.length, a: ys[0], b: ys[ys.length - 1] };
}
function catText() {
  const sub = $('#works-sub');
  sub.dataset.i18n = wallCat === 'nsfw' ? 'nsfw.sub' : 'works.sub';
  sub.textContent = tr(sub.dataset.i18n, catVars());
  $('#cats').querySelectorAll('a').forEach((a) => {
    a.setAttribute('aria-current', String(a.dataset.cat === (wallCat || 'fan')));
    if (CAT_LIST[a.dataset.cat]) a.querySelector('.cats-n').textContent = CAT_LIST[a.dataset.cat].length;
  });
}
function yearText() {
  yearHead.forEach((hd, y) => {
    const n = wallOrder.filter((c) => c.dataset.date.startsWith(y)).length;
    hd.querySelector('.wy-c').textContent = LANG === 'en' && n === 1 ? '1 work' : tr('wall.count', { n });
  });
  yearsIn.querySelectorAll('button').forEach((b) => b.setAttribute('aria-label', tr('years.go', { y: b.dataset.y })));
}
yearsIn.addEventListener('click', (e) => {
  const b = e.target.closest('button');
  if (!b) return;
  const head = $('.site-head').offsetHeight, bar = yearsBar.offsetHeight;
  const top = yearHead.get(b.dataset.y).getBoundingClientRect().top + scrollY - head - bar - 14;
  scrollTo({ top, behavior: CALM ? 'auto' : 'smooth' });
});
let yearsRaf = 0, yearNow = '';
function yearsUpdate() {
  yearsRaf = 0;
  if (VIEWS.works.hidden || wall.hidden) return;
  const line = yearsBar.getBoundingClientRect().bottom + 48;
  let cur = YEARS[0];
  for (const y of YEARS) { if (yearHead.get(y).getBoundingClientRect().top <= line) cur = y; else break; }
  if (cur !== yearNow) {
    yearNow = cur;
    yearsIn.querySelectorAll('button').forEach((b) => {
      const on = b.dataset.y === cur;
      b.setAttribute('aria-current', String(on));
      if (on && yearsIn.scrollWidth > yearsIn.clientWidth) yearsIn.scrollTo({ left: b.offsetLeft - (yearsIn.clientWidth - b.offsetWidth) / 2, behavior: CALM ? 'auto' : 'smooth' });
    });
  }
  const wr = wall.getBoundingClientRect();
  yearsProg.style.transform = `scaleX(${Math.min(1, Math.max(0, (line - wr.top) / wr.height)).toFixed(4)})`;
}
addEventListener('scroll', () => { if (!yearsRaf) yearsRaf = requestAnimationFrame(yearsUpdate); }, { passive: true });
/* units in date order: a wide work alone (and a collection's hand of cards: across a whole lane its cards come out
   about as big as the covers around them); a single-column work beside the next single-column one of the same year.
   When that one is far taller or shorter, the closest in height among the next few takes its place, so a long work
   is not left beside a short one; if even that is far shorter, the works after it stack under the short one */
function buildUnits(order) {
  const items = order.map((el) => ({ el, r: +el.dataset.r, wide: +el.dataset.r >= 1.4 || 'cw' in el.dataset, y: el.dataset.date.slice(0, 4) }));
  const units = [], used = new Set();
  const fits = (c, y) => c.y === y && !c.wide;   // single-column, same year
  for (let k = 0; k < items.length; k++) {
    if (used.has(k)) continue;
    const a = items[k];
    if (a.wide) { units.push({ a }); continue; }
    let pick = -1, pickQ = Infinity;
    for (let j = k + 1, n = 0; j < items.length && n < 3; j++) {
      if (used.has(j)) continue;
      if (!fits(items[j], a.y)) break;   // never past a wide work or into the next year
      n++;
      const q = Math.max(a.r, items[j].r) / Math.min(a.r, items[j].r);   // how much taller one is than the other
      if (pick < 0 || q < pickQ - 0.25) { pick = j; pickQ = q; }
      if (pickQ < 1.5) break;   // close enough: keep the date order
    }
    if (pick < 0) { units.push({ a, b: null, pair: true }); continue; }
    used.add(pick);
    const u = { a, b: items[pick], pair: true };
    if (pickQ > 1.8) {   // still a long one beside a short one: fill the short side's column with the next works
      let room = Math.abs(1 / a.r - 1 / u.b.r);   // the height left beside the long one, in column widths
      const more = [];
      for (let j = Math.max(k, pick) + 1; j < items.length && room > 0.6; j++) {
        if (used.has(j)) continue;
        const c = items[j];
        if (!fits(c, a.y) || 1 / c.r > room + 0.3) break;
        used.add(j);
        more.push(c);
        room -= 1 / c.r + 0.1;
      }
      if (more.length) u[a.r < u.b.r ? 'sb' : 'sa'] = more;   // under whichever of the two is shorter
    }
    units.push(u);
  }
  return units;
}
function placeCover(el, x, y, tilt) {
  el.style.left = `${Math.round(x)}px`;
  el.style.top = `${Math.round(y)}px`;
  el.style.setProperty('--tilt', `${tilt ? tilt.toFixed(2) : 0}deg`);
}
function layoutWall() {
  if (VIEWS.works.hidden || !wall.clientWidth) return;
  wallUnits = wallUnits || buildUnits(wallOrder);
  collage(wall, wallOrder, wallUnits, WALL_SEED, yearHead);
  yearNow = '';
  yearsUpdate();
}
/* place the covers of `order` (grouped into `units`) on `box`, the same way everywhere: the wall (with its year
   headers, `heads`) and a collection's pieces (no headers) */
function collage(box, order, units, seed, heads) {
  const rand = seeded(seed);
  const W = box.clientWidth;
  const lanes = W >= 680 ? 2 : 1;
  const gap = W >= 1000 ? 26 : W >= 600 ? 18 : 12;
  const laneW = (W - (lanes - 1) * gap) / lanes;
  const colW = (laneW - gap) / 2;
  const touch = matchMedia('(hover: none)').matches;
  const plan = units.map((u) => {
    const card = u.a.el.dataset.cw;   // a hand of cards: as wide as makes each card the size of a one-column cover
    const p = { u, wa: u.pair ? colW * (0.9 + rand() * 0.1) : card ? Math.min(laneW, colW * (0.9 + rand() * 0.1) / card) : laneW * (0.86 + rand() * 0.14) };
    if (u.b) p.wb = colW * (0.9 + rand() * 0.1);
    p.ex = u.sa || u.sb || [];
    p.we = p.ex.map(() => colW * (0.9 + rand() * 0.1));
    u.a.el.style.width = `${Math.round(p.wa)}px`;
    if (u.b) u.b.el.style.width = `${Math.round(p.wb)}px`;
    p.ex.forEach((c, i) => { c.el.style.width = `${Math.round(p.we[i])}px`; });
    return p;
  });
  const h = new Map(order.map((el) => [el, el.offsetHeight]));   // one layout pass for every cover
  const laneH = new Array(lanes).fill(0);
  const tilt = () => (rand() < 0.5 ? (rand() - 0.5) * 2 : 0);
  const fresh = new Array(lanes).fill(true);   // nothing placed in this lane since the last year header
  const perYear = new Map();
  plan.forEach((p) => { const y = p.u.a.el.dataset.date.slice(0, 4); perYear.set(y, (perYear.get(y) || 0) + 1); });
  let z = 1, curYear = '';
  plan.forEach((p, k) => {
    const yr = p.u.a.el.dataset.date.slice(0, 4);
    const hd = yr !== curYear && heads && heads.get(yr);
    curYear = yr;
    if (hd) {
      const top = k === 0 ? 0 : Math.max(...laneH) + gap * 2.6;
      hd.style.top = `${Math.round(top)}px`;
      laneH.fill(top + hd.offsetHeight + gap * 1.1);
      fresh.fill(true);
    }
    let L = 0;
    if (lanes === 2 && k > 0) {
      const d = laneH[1] - laneH[0];
      L = d < -60 ? 1 : 0;   // the shorter lane, the left one when they are level, so the order reads left to right
    }
    /* the only unit of its year: centre it rather than leave a lane empty. Only under a year header, which levels the
       lanes first: without one (a tag's page) a centred cover reached into the other lane, over what was there */
    const lone = heads && lanes === 2 && perYear.get(yr) === 1;
    const x0 = lone ? (W - laneW) / 2 + (rand() - 0.5) * gap * 3 : L * (laneW + gap);
    const tuck = !touch && !fresh[L] && laneH[L] > 0 && rand() < 0.25 ? 8 + rand() * 14 : 0;   // never into a year header
    const y0 = laneH[L] === 0 ? rand() * gap : laneH[L] + (tuck ? -tuck : gap * (0.55 + rand() * 0.9));
    const { u } = p;
    let bottom;
    if (u.pair) {
      const ya = y0 + rand() * 24;
      const xa = u.b ? x0 + (colW - p.wa) * rand() : x0 + (laneW - p.wa) / 2 + (rand() - 0.5) * gap;   // a lone one sits mid-lane
      placeCover(u.a.el, xa, ya, tilt());
      let botA = ya + h.get(u.a.el), botB = botA;
      if (u.b) {
        const yb = y0 + rand() * 24, xb = x0 + colW + gap + (colW - p.wb) * rand();
        placeCover(u.b.el, xb, yb, tilt());
        botB = yb + h.get(u.b.el);
      }
      if (p.ex.length) {   // the works stacked under the short one, beside the long one
        const cx = u.sa ? x0 : x0 + colW + gap;
        let yy = u.sa ? botA : botB;
        p.ex.forEach((c, i) => {
          const y = yy + gap * (0.6 + rand() * 0.6);
          placeCover(c.el, cx + (colW - p.we[i]) * rand(), y, tilt());
          yy = y + h.get(c.el);
        });
        if (u.sa) botA = yy; else botB = yy;
      }
      bottom = Math.max(botA, botB);
    } else {
      const spill = !touch && lanes === 2 && !lone && rand() < 0.18 ? (L === 0 ? 1 : -1) * (6 + rand() * 16) : 0;
      const xa = Math.min(W - p.wa, Math.max(0, x0 + (laneW - p.wa) * rand() + spill));
      placeCover(u.a.el, xa, y0, tilt());
      bottom = y0 + h.get(u.a.el);
    }
    u.a.el.style.zIndex = String(++z);
    if (u.b) u.b.el.style.zIndex = String(++z);
    p.ex.forEach((c) => { c.el.style.zIndex = String(++z); });
    laneH[L] = bottom;
    fresh[L] = false;
  });
  box.style.height = `${Math.ceil(Math.max(...laneH))}px`;
}
let wallRaf = 0;
addEventListener('resize', () => { cancelAnimationFrame(wallRaf); wallRaf = requestAnimationFrame(layoutWall); });
if (document.fonts) document.fonts.ready.then(layoutWall);

/* ==================== js/work.js ==================== */
/* Work page */
/* ---------- single work page. A collection ("pieces": true, each page a piece of its own) shows its finished pieces
   as covers on a collage like the works wall's; each piece has a page of its own (#w-<id>/<n>) with its other
   versions ("alt") and its sketch ("sk") beside it, where it has them ---------- */
function renderWork(i, piece = -1) {
  const w = WORKS[i], one = w.pieces && piece >= 0, px = one && w.px && w.px[piece];   // px: a piece posted on pixiv by itself
  $('#wk-lab').textContent = w.lab;
  $('#wk-ym').textContent = w.ym;
  $('#wk-ym').hidden = !w.ym;
  $('#wk-link').href = 'https://www.pixiv.net/artworks/' + (px || w.id);
  $('#wk-link-li').hidden = !px && (w.cat !== 'fan' || !/^\d+$/.test(w.id));   // the original pieces, and fan pieces not posted there (f-…), are not on pixiv
  $('#wk-all-li').hidden = !one;   // a piece's page: back to the whole collection
  $('#wk-all').href = '#w-' + w.id;

  const tags = $('#wk-tags');   // each opens its tag's page: every work with it (js/tag.js)
  tags.replaceChildren(...w.tags.map((t) => { const li = el('li'), a = el('a', '', '#' + t); a.href = tagHref(t); li.append(a); return li; }));

  const box = $('#wk-imgs');
  box.removeAttribute('style');   // a collage's height, a piece page's columns
  box.className = !w.pieces ? 'proj-imgs' : one ? 'pc-pair' : 'pc-wall';
  if (one) {
    box.replaceChildren(...pieceFigs(w, piece));
    box.style.setProperty('--cols', Math.min(2, box.children.length));
  } else if (w.pieces) box.replaceChildren(...w.dims.map(([W, H], n) => pieceCover(w, n, W, H)));
  else box.replaceChildren(...w.dims.map(([W, H], n) => {
    const img = document.createElement('img');
    const r = W / H;
    img.src = src(w.id, n);
    img.width = W; img.height = H;
    img.loading = n < 2 ? 'eager' : 'lazy';
    img.decoding = 'async';
    if (n) img.dataset.rv = 'up';
    img.style.aspectRatio = `${W} / ${H}`;
    if (r < 0.5) {
      img.style.width = `min(100%, 760px, ${W}px)`;
    } else {
      img.style.width = `min(100%, ${W}px, calc((100vh - 150px) * ${r.toFixed(4)}))`;
      img.style.width = `min(100%, ${W}px, calc((100svh - 150px) * ${r.toFixed(4)}))`;
    }
    return img;
  }));

  /* process timelapse: a thumbnail card that opens YouTube (artifact pages cannot embed players);
     the self-hosted copy swaps in the YouTube player on click */
  $('#wk-tl').hidden = $('#wk-tl-li').hidden = !w.yt;
  if (w.yt) {
    const url = `https://www.youtube.com/watch?v=${w.yt.id}`;
    const card = el('a', 'tl-card');
    card.href = url; card.target = '_blank'; card.rel = 'noopener';
    const im = el('img');
    im.src = `img/yt/${w.yt.id}.webp`; im.width = 1280; im.height = 720; im.alt = ''; im.loading = 'lazy';
    card.append(im, el('span', 'tl-play'), el('span', 'tl-dur', w.yt.dur));
    if (window.SELF_HOSTED) ytInline(card, w.yt.id, w.yt.t);
    $('#wk-tl-box').replaceChildren(card);
    $('#wk-tl-title').textContent = w.yt.t;
    $('#wk-tl-link').href = url;
  } else {
    $('#wk-tl-box').replaceChildren();
  }

  /* process animations (stage-by-stage) the artist made for this piece */
  $('#wk-proc').hidden = !w.proc;
  $('#wk-proc-box').replaceChildren(...(w.proc || []).map(([f, W, H]) => {
    const im = el('img'); im.src = `img/proc/${f}`; im.width = W; im.height = H; im.loading = 'lazy'; im.decoding = 'async';
    if (W > H * 1.2) im.className = 'wide';
    return im;
  }));

  /* previous / next: on a piece's page, the collection's other pieces; otherwise they stay inside Fan Art or
     Original Art and follow the wall's order */
  $('#wk-prev .lbl').textContent = one ? '← Previous Piece' : '← Previous Project';
  $('#wk-next .lbl').textContent = one ? 'Next Piece →' : 'Next Project →';
  if (one) {
    const m = w.dims.length, p = (piece - 1 + m) % m, nx = (piece + 1) % m;
    $('#wk-prev').href = `#w-${w.id}/${p + 1}`; $('#wk-prev-t').textContent = `No.${no2(p + 1)}`;
    $('#wk-next').href = `#w-${w.id}/${nx + 1}`; $('#wk-next-t').textContent = `No.${no2(nx + 1)}`;
  } else {
    const list = wallSort === 'old' ? [...CAT_LIST[w.cat]].reverse() : CAT_LIST[w.cat], k = list.indexOf(w);
    $('#wk-prev').href = '#w-' + list[(k - 1 + list.length) % list.length].id;
    $('#wk-next').href = '#w-' + list[(k + 1) % list.length].id;
  }
  workText(i, piece);
}
/* a collection's piece on its collage: a cover like the wall's, linking to the piece's page */
function pieceCover(w, n, W, H) {
  const a = makeCover(`#w-${w.id}/${n + 1}`, [[src(w.id, n), W, H]], w.pos, n < 4);
  a.dataset.n = n;
  a.dataset.date = madeOn(w);   // one date for them all: the collage pairs them in order
  return a;
}
const PIECE_SEED = (WALL_SEED ^ 0x9e3779b9) >>> 0;   // an arrangement of its own, kept while browsing like the wall's
function layoutPieces() {
  const box = $('#wk-imgs');
  if (VIEWS.work.hidden || !box.classList.contains('pc-wall') || !box.clientWidth) return;
  const order = [...box.querySelectorAll('.cover')];
  collage(box, order, buildUnits(order), PIECE_SEED, null);
}
addEventListener('resize', () => requestAnimationFrame(layoutPieces));
if (document.fonts) document.fonts.ready.then(layoutPieces);
/* the pictures on a piece's page: the finished one, its other versions, its sketch */
function pieceImgs(w, n) {
  const sk = w.sk && w.sk[n];
  return [
    { k: 'final', src: src(w.id, n), d: w.dims[n] },
    ...((w.alt && w.alt[n]) || []).map((d, j) => ({ k: 'alt', j: j + 1, src: `img/${w.id}_a${n}_${j + 1}.webp`, d })),
    ...(sk ? [{ k: 'sketch', src: `img/${w.id}_s${n}.webp`, d: sk }] : []),
  ];
}
/* a piece's page: its pictures, each with its caption (written by workText) */
function pieceFigs(w, n) {
  return pieceImgs(w, n).map((p, j) => {
    const f = el('figure', 'pc-fig'), img = el('img');
    img.src = p.src;
    [img.width, img.height] = p.d;
    img.decoding = 'async';
    if (j) f.dataset.rv = 'up';
    f.append(el('figcaption', 'pc-cap'), img);
    return f;
  });
}
/* the words on a work page; also run on a language switch so the images and the video player stay put */
function workText(i, piece = -1) {
  const w = WORKS[i], t = L(w.t), one = w.pieces && piece >= 0;
  $('#wk-title').textContent = t;
  $('#wk-date').textContent = tr(w.cat === 'original' ? 'wk.made' : 'wk.posted', { d: dot(w.d) });
  $('#wk-pages').textContent = one ? `No.${no2(piece + 1)} / ${no2(w.dims.length)}` : pagesText(w.dims.length);
  if (!one) {   // the names of the works before and after this one (a piece's page shows the pieces' numbers)
    for (const k of ['prev', 'next']) $(`#wk-${k}-t`).textContent = L(WORKS[byId[$(`#wk-${k}`).getAttribute('href').slice(3)]].t);   // href: #w-<id>
  }
  const box = $('#wk-imgs');
  if (one) {   // a piece's page: each picture's caption and description
    const figs = box.querySelectorAll('.pc-fig');
    pieceImgs(w, piece).forEach((p, j) => {
      figs[j].querySelector('.pc-cap').textContent = tr('wk.' + p.k, { n: p.j });
      figs[j].querySelector('img').alt = tr(`wk.${p.k}Alt`, { t, n: piece + 1, k: p.j });
    });
  } else if (w.pieces) {   // a collection's covers: the piece's number, and how many pictures its page has
    box.querySelectorAll('.cover').forEach((a) => {
      const n = +a.dataset.n, m = pieceImgs(w, n).length;
      coverText(a, `No.${no2(n + 1)}`, `${dot(madeOn(w))}${m > 1 ? ' · ' + tr('cover.pages', { n: m }) : ''}`, tr('wk.finalAlt', { t, n: n + 1 }));
    });
    layoutPieces();   // after the words: on touch screens they sit under the pictures and add to the covers' height
  } else {
    box.querySelectorAll('img').forEach((img, n) => { img.alt = w.dims.length > 1 ? tr('wk.imgAlt', { t, n: n + 1, m: w.dims.length }) : t; });
  }
  /* cross-link: the goods made from this piece */
  linkLine($('#wk-goods'), tr('wk.madeGoods'), GOODS.filter((g) => g.works?.includes(w.id)).map((g) => [L(g.name), '#g-' + g.slug]));

  const procs = $('#wk-proc-box').querySelectorAll('img');
  procs.forEach((im, n) => { im.alt = tr('proc.alt', { t }) + (procs.length > 1 ? ` (${n + 1}/${procs.length})` : ''); });
  const card = $('#wk-tl-box .tl-card');
  if (card) card.setAttribute('aria-label', tr('tl.play', { t: w.yt.t }));
}
/* a YouTube card that plays here, in its own place, when clicked (the work page's timelapse; the home page's latest
   videos open YouTube instead). Changing page only hides a view, so a player still going is put back to its card
   then: no sound left playing on a page you have left. */
const ytPlaying = new Map();   // player -> its card
function ytInline(card, id, t) {
  card.addEventListener('click', (e) => {
    e.preventDefault();
    const f = el('iframe');
    f.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    f.title = t;
    f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    f.allowFullscreen = true;
    card.replaceWith(f);
    ytPlaying.set(f, card);
    bgmSync();
  });
}
function stopWorkVideo() {
  if (!ytPlaying.size) return;
  ytPlaying.forEach((card, f) => f.replaceWith(card));
  ytPlaying.clear();
  bgmSync();
}

/* ==================== js/tag.js ==================== */
/* Tag page */
/* ---------- a tag's page (#t-<tag>, from the tags on a work page, or a character button on the Fan Art wall): every
   work with that tag, as covers on the works wall's collage, in the wall's order (newest or oldest first), under
   the goods and art books with them. A cover opens its work, morphing as on the wall, and
   Back comes to it again. Made anew for another tag; its words follow the language (tagText) ---------- */
const tagWall = $('#tag-wall');
const TAG_SEED = (WALL_SEED ^ 0x85ebca6b) >>> 0;   // an arrangement of its own, kept while browsing like the wall's
let tagNow = null;   // the tag on the page
const tagWorks = (tag) => WORKS.filter((w) => w.tags.includes(tag));
const tagHref = (tag) => '#t-' + encodeURIComponent(tag);
/* the Fan Art wall's character buttons (CHARACTERS in js/data.js): shortcuts to their tags' pages, the first few in
   the row, the rest behind "more characters"; a name without works is left out */
const charMore = $('#fan-chars-more'), charRest = $('#fan-chars-rest'), charTg = $('#fan-chars-tg');
const charLinks = (names) => names.filter((t) => tagWorks(t).length).map((t) => {
  const a = el('a', '', t);
  a.href = tagHref(t);
  return a;
});
$('#fan-chars-in').append(...charLinks(CHARACTERS.shown));
charRest.append(...charLinks(CHARACTERS.more).map((a, i) => {
  a.style.setProperty('--i', i);   // its turn to rise in (css/works.css)
  return a;
}));
charTg.hidden = !charRest.children.length;
/* "more characters" open or not: css/works.css slides it open; folded again when the Work part starts over */
function charFold(open = false) {
  charMore.classList.toggle('open', open);
  charTg.setAttribute('aria-expanded', String(open));
}
charTg.addEventListener('click', () => charFold(!charMore.classList.contains('open')));
function renderTag(tag) {
  tagNow = tag;
  const works = tagWorks(tag).sort(byMade);
  if (wallSort === 'old') works.reverse();
  tagWall.replaceChildren(...works.map((w, i) => {
    const picks = w.pieces ? coverPieces(w) : [0];   // a collection: three of its pieces, as on the wall
    const a = makeCover('#w-' + w.id, picks.map((n) => [src(w.id, n), w.dims[n][0], w.dims[n][1]]), w.pos, i < 4);
    a.id = 'tc-' + w.id;
    a.dataset.n = picks[picks.length - 1];   // the picture in front: the page morph lands on its piece (js/router.js)
    a.dataset.date = madeOn(w);
    return a;
  }));
  tagText();
}
/* {n} works between {y} (one year, or the first — the last) */
function tagVars() {
  if (tagNow === null) return { n: 0, y: '' };
  const ys = tagWorks(tagNow).map((w) => madeOn(w).slice(0, 4)).sort(), a = ys[0], b = ys[ys.length - 1];
  return { n: ys.length, y: a === b ? a : `${a} — ${b}` };
}
/* the words that change with the language */
function tagText() {
  if (tagNow === null) return;
  $('#tag-h').textContent = '#' + tagNow;
  const sub = $('#tag-sub'), vars = tagVars();
  sub.dataset.i18n = vars.n === 1 ? 'tag.sub1' : 'tag.sub';
  sub.textContent = tr(sub.dataset.i18n, vars);
  tagWall.querySelectorAll('.cover').forEach((a) => fillCover(a, WORKS[byId[a.id.slice(3)]]));
  tagLinks();
}
/* under the count: the goods and art books with its works. A book has them in its "works"; goods have them in
   theirs, or hold a book that has them */
function tagLinks() {
  const ids = new Set(tagWorks(tagNow).map((w) => w.id));
  const books = BOOKS.filter((b) => (b.works || []).some((id) => ids.has(id)));
  const slugs = new Set(books.map((b) => b.slug));
  const goods = GOODS.filter((g) => (g.works || []).some((id) => ids.has(id)) || (g.books || []).some((s) => slugs.has(s)));
  linkLine($('#tag-goods'), tr('tag.goods'), goods.map((g) => [L(g.name), '#g-' + g.slug]));
  linkLine($('#tag-books'), tr('tag.books'), books.map((b) => [b.t, '#ab-' + b.slug]));
  $('#tag-rel').hidden = !goods.length && !books.length;
}
function layoutTag() {
  if (VIEWS.tag.hidden || !tagWall.clientWidth) return;
  const order = [...tagWall.querySelectorAll('.cover')];
  collage(tagWall, order, buildUnits(order), TAG_SEED, null);
}
addEventListener('resize', () => requestAnimationFrame(layoutTag));
if (document.fonts) document.fonts.ready.then(layoutTag);

/* ==================== js/artbook.js ==================== */
/* Art books: the list and the book page */
/* ---------- art books: one per Fancy Frontier, on a timeline with a year bar and sort menu like the works wall ---------- */
const NSFW_URL = 'https://drive.google.com/drive/folders/13iLkmzd5KRhpaBNY8aJSam84H7y5rGQI?usp=sharing';
const abList = $('#ab-list'), abYearsIn = $('#ab-years-in'), abYearsBar = $('#ab-years');
const abHead = new Map();
let abSort = 'new', abBuilt = false, lastBook = null;
const abBooks = () => (abSort === 'old' ? [...BOOKS].reverse() : BOOKS);   // BOOKS is newest first
function abVars() {
  const ys = BOOKS.map((b) => b.ym.slice(0, 4)).sort();
  return { n: BOOKS.length, a: ys[0], b: ys[ys.length - 1] };
}
/* a book's name stays on one line: when it is too long for the line, its font shrinks to fit (down to a floor) */
function fitLine(el) {
  el.style.fontSize = '';
  const w = el.clientWidth, sw = el.scrollWidth;
  el._fitW = w;
  if (w && sw > w + 1) el.style.fontSize = `${Math.max(el._fitMin || 9, parseFloat(getComputedStyle(el).fontSize) * w / sw * 0.985).toFixed(2)}px`;
  if (el.parentElement && el.parentElement.classList.contains('ttl')) backFit();   // a page's title: the back button keeps to its words (a card's name may not be in the page yet)
}
const fitRO = 'ResizeObserver' in window
  ? new ResizeObserver((es) => es.forEach((e) => { if (e.target.clientWidth !== e.target._fitW) fitLine(e.target); }))   // a new width, not just a new font
  : null;
function fitWatch(el, min) {
  el.classList.add('fit');
  el._fitMin = min;
  fitLine(el);
  if (fitRO) fitRO.observe(el);
  return el;
}
if (!fitRO) addEventListener('resize', () => document.querySelectorAll('.fit').forEach(fitLine));
if (document.fonts) document.fonts.ready.then(() => document.querySelectorAll('.fit').forEach(fitLine));   // measured again in the real font
function renderBooks() {
  abBuilt = true;
  const list = abBooks();
  abHead.clear();
  abYearsIn.replaceChildren();
  abList.replaceChildren(...[...new Set(list.map((b) => b.ym.slice(0, 4)))].map((y) => {
    const sec = el('section', 'ab-year');
    const hd = el('div', 'wall-year'); hd.dataset.y = y; hd.dataset.rv = 'year'; hd.setAttribute('aria-hidden', 'true');
    hd.append(el('span', 'wy-n', y), el('span', 'wy-line'), el('span', 'wy-c'));
    const grid = el('div', 'ab-grid');
    list.filter((b) => b.ym.startsWith(y)).forEach((b, k) => {
      const a = el('a', 'ab-card'); a.id = 'abc-' + b.slug; a.href = '#ab-' + b.slug; a.dataset.rv = 'up'; a.dataset.d = `${(k * 0.12).toFixed(2)}s`;
      const fr = el('span', 'ab-stage'), box = b3Lazy(b3Make(b, false));
      fr.style.aspectRatio = b3StageRatio(b);
      fr.append(box);
      b3Hover(a, box, b);
      const info = el('span', 'ab-info'), cap = el('span', 'ab-cap');
      cap.append(el('span', 'ab-ev', b.ev));
      if (b.blur) cap.append(el('span', 'ab-r18', '18+'));
      cap.append(el('span', 'ab-line'), el('span', 'ab-ym', b.ym));
      info.append(fitWatch(el('span', 'ab-t', b.t), 9), cap);
      a.append(fr, info);
      grid.append(a);
    });
    sec.append(hd, grid);
    abHead.set(y, hd);
    const btn = el('button', '', y); btn.type = 'button'; btn.dataset.y = y; abYearsIn.append(btn);
    return sec;
  }));
  abText();
}
/* the words on the art book list; also run on a language switch */
function abText() {
  $('#ab-sub').textContent = tr('ab.sub', abVars());
  abHead.forEach((hd, y) => {
    const n = BOOKS.filter((b) => b.ym.startsWith(y)).length;
    hd.querySelector('.wy-c').textContent = LANG === 'en' && n === 1 ? '1 book' : tr('ab.count', { n });
  });
  abYearsIn.querySelectorAll('button').forEach((b) => b.setAttribute('aria-label', tr('years.go', { y: b.dataset.y })));
  abList.querySelectorAll('.ab-card').forEach((a) => { const b = BOOKS[byBook[a.id.slice(4)]]; a.setAttribute('aria-label', tr('ab.card', { t: bkName(b), d: b.ym })); });
  const { a, b } = abVars();
  abSortText(abSort, a, b);
}
const abSortText = sortControl($('#ab-sort'), (dir) => {
  if (dir === abSort) return;
  const was = yearSpots(abYearsIn);
  abSort = dir;
  renderBooks();
  watch(prime(abList));   // the books come back in, in the new order
  slideYears(abYearsIn, was);
  abYearsUpdate();
  const top = abList.getBoundingClientRect().top + scrollY - $('.site-head').offsetHeight - abYearsBar.offsetHeight - 14;
  if (scrollY > top + 4) scrollTo({ top, behavior: CALM ? 'auto' : 'smooth' });
});
const abYearsUpdate = timelineNavigation(abYearsBar, abList, abHead);

/* ---------- single art book: the cover as a 3D book, then under "Preview" the cover spread and the inside pages; blurred pages lead to the album ---------- */
fitWatch($('#bk-title'), 9); fitWatch($('#bk-prev-t'), 10); fitWatch($('#bk-next-t'), 10);
function renderBook(i) {
  const b = BOOKS[i], blur = b.blur || [];
  $('#bk-title').textContent = b.t;
  fitLine($('#bk-title'));
  $('#bk-r18').hidden = !blur.length;
  $('#bk-cover').replaceChildren(...b3Hero(b));
  $('#bk-imgs').replaceChildren(...b.pages.map(([W, H], n) => {
    const img = el('img');
    img.src = `img/ab/${b.slug}_p${n}.webp`; img.width = W; img.height = H; img.dataset.n = n;
    img.loading = n < 2 ? 'eager' : 'lazy'; img.decoding = 'async';
    img.style.aspectRatio = `${W} / ${H}`;
    if (!blur.includes(n)) { img.dataset.rv = 'up'; return img; }
    const a = el('a', 'bk-blur'); a.href = NSFW_URL; a.target = '_blank'; a.rel = 'noopener'; a.dataset.rv = 'up';
    const tag = el('span', 'nsfw-tag', '18+'); tag.setAttribute('aria-hidden', 'true');
    a.append(img, tag);
    return a;
  }));
  const list = abBooks(), k = list.indexOf(b);   // previous / next follow the list's order
  const p = list[(k - 1 + list.length) % list.length], nx = list[(k + 1) % list.length];
  $('#bk-prev').href = '#ab-' + p.slug; $('#bk-prev-t').textContent = p.t;
  $('#bk-next').href = '#ab-' + nx.slug; $('#bk-next-t').textContent = nx.t;
  fitLine($('#bk-prev-t')); fitLine($('#bk-next-t'));
  bookText(i);
}
function bookText(i) {
  const b = BOOKS[i], blur = b.blur || [];
  $('#bk-date').textContent = tr('bk.date', { d: b.ym });
  $('#bk-ev').textContent = evName(b.ev);
  $('#bk-pages').textContent = pagesText(b.pages.length);
  const values = [
    tr('bk.size.' + b.size),
    tr('bk.pp', { n: b.pp }),
    tr('bk.print.' + b.print),
    tr('bk.mat.' + (b.mat || 'gloss')) + (b.foil ? tr('bk.foil.' + b.foil) : ''),
  ];
  $('#bk-spec').querySelectorAll('dd').forEach((dd, index) => { dd.textContent = values[index]; });
  /* cross-link: the goods it comes in */
  linkLine($('#bk-goods'), tr('bk.goods'), GOODS.filter((g) => (g.books || []).includes(b.slug)).map((g) => [L(g.name), '#g-' + g.slug]));
  $('#bk-imgs').querySelectorAll('img').forEach((img) => {
    const n = +img.dataset.n;
    img.alt = tr(n === 0 ? 'bk.coverAlt' : blur.includes(n) ? 'bk.blurAlt' : 'bk.pageAlt', { t: bkName(b), n });
  });
  const hero = $('#bk-cover .bk-stage');
  if (hero) { hero.setAttribute('aria-label', tr('b3.book', { t: bkName(b) })); $('#bk-cover .bk-hint span').textContent = tr('b3.open'); }
}
$('#bk-imgs').addEventListener('click', (e) => {
  const im = e.target.closest('img');
  if (!im || im.closest('.bk-blur')) return;   // a blurred page is a link to the album
  zvOpen('book', [...$('#bk-imgs').querySelectorAll(':scope > img')].indexOf(im), im);
});

/* ==================== js/book3d.js ==================== */
/* 3D books: the cover spread folded round a CSS 3D book, its lighting and materials, the 3D viewer */
/* ---------- the cover as a physical book: the spread folds round a CSS 3D block; enlarged, it turns as you drag ---------- */
const B3_REST = { rx: -12, ry: -28 }, B3_HOVER = { rx: -9, ry: -18 }, B3_VIEW = { rx: -12, ry: -34 };   // turned to show the page edges
const B3_FACES = { front: [0, 0, 1], back: [0, 0, -1], fore: [1, 0, 0], head: [0, -1, 0], tail: [0, 1, 0] };
const B3_SP = 7;   // the rounded spine is drawn as this many narrow strips, from the front cover round to the back
const B3_SPN = Array.from({ length: B3_SP }, (_, i) => { const a = -(i + 0.5) * Math.PI / B3_SP; return [Math.sin(a), 0, Math.cos(a)]; });
const B3_EYE = 4.2;   // the camera's distance in lengths of the cover's long side, as in .b3-cam's perspective()
const B3_LAMP = [-1.02, 0.18, 0.84];   // the lamp a laminated cover mirrors: left of the book, close, about level with it
const B3_SPEC = { gloss: [0.55, 24], matte: [0.18, 5] };   // how the round spine catches that lamp: how bright, how tight
const b3Unit = (v) => { const l = Math.hypot(...v) || 1; return v.map((x) => x / l); };
const B3_LIGHT = [0, -0.35, 0.94].map((v, _, a) => v / Math.hypot(...a));   // above and in front of the book
const B3_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.6 12a8.4 8.4 0 0 1 14.5-5.8M20.4 12a8.4 8.4 0 0 1-14.5 5.8"/><path d="M18.4 2.9v3.5h-3.5M5.6 21.1v-3.5h3.5"/></svg>';
const bkName = (b) => `${b.t} · ${b.ev}`;   // a book's name and its Fancy Frontier, for captions and labels
const b3Src = (b, big) => `img/ab/${big ? 'z/' : ''}${b.slug}_p0.webp`;
const b3At = (box, p) => ({ rx: p.rx, ry: box._rtl ? -p.ry : p.ry });   // a right-bound book turns the other way to show its spine
const b3Tilt = (v) => Math.min(70, Math.max(-70, v));
const b3StageRatio = (b) => ((b.pages[0][0] / 2 / b.pages[0][1]) * 0.62 + 0.7).toFixed(3);   // wide books get a wide stage
function b3Make(b, big) {
  const [W, H] = b.pages[0], ar = W / 2 / H, tk = b.tk || 0.012, mat = b.mat || 'gloss', box = el('span', `b3 m-${mat}${b.rtl ? ' rtl' : ''}`);
  box._rtl = !!b.rtl;
  box._mat = mat;
  box._dim = ar >= 1 ? [1, 1 / ar, tk] : [ar, 1, tk];   // the cover's width, height and thickness, in lengths of its long side
  box.style.setProperty('--ar', `${W / 2} / ${H}`);
  box.style.setProperty('--arn', ar.toFixed(4));
  box.style.setProperty('--tk', tk);   // thickness, as a share of the cover's long side
  box.setAttribute('aria-hidden', 'true');
  const cam = el('span', 'b3-cam'), book = el('span', 'b3-book'), step = 180 / B3_SP, arc = 1.5708 / B3_SP;
  for (const f of Object.keys(B3_FACES)) {
    const face = el('span', 'b3-f b3-' + f);
    if (f === 'front' || f === 'back') face.append(el('span', 'b3-tex'));
    if (mat === 'ivory' && (f === 'front' || f === 'back')) face.append(el('span', 'b3-sh'));   // the paper's faint, fibrous sheen
    if (f === 'front' && b.foil) {
      const foil = el('span', 'b3-foil');
      foil.style.setProperty('--foil', cssUrl(`img/ab/${b.slug}_foil.webp`));
      foil.append(el('i', 'b3-rim'));   // the bright edge of the stamping
      face.append(foil);
    }
    book.append(face);
  }
  for (let i = 0; i < B3_SP; i++) {   // strip i turns (i + .5) steps from the front cover and shows that slice of the spread's middle
    const sp = el('span', 'b3-f b3-sp');
    sp.style.cssText = b.rtl
      ? `--a:${((i + 0.5) * step).toFixed(3)}deg;--sx:50cqw;--bx:${(-0.7854 + i * arc).toFixed(4)};--s:var(--s-sp${i});--g:var(--g-sp${i})`
      : `--a:${(-(i + 0.5) * step).toFixed(3)}deg;--sx:-50cqw;--bx:${(0.7854 - (i + 1) * arc).toFixed(4)};--s:var(--s-sp${i});--g:var(--g-sp${i})`;
    sp.append(el('span', 'b3-tex'));
    book.append(sp);
  }
  const fx = el('span', 'b3-fx');   // carries the material's colour filter, so the shadow stays out of it
  cam.append(book);
  fx.append(cam);
  box.append(el('span', 'b3-shadow'), fx);
  box._src = b3Src(b, big);
  const p = b3At(box, B3_REST);
  b3Pose(box, p.rx, p.ry);
  return box;
}
/* the cover goes on once it has loaded; a book on the list waits until it is near the screen */
function b3Load(box) {
  if (!box._ready) {
    const im = new Image();
    im.src = box._src;
    box._ready = im.decode().catch(() => {}).then(() => box.style.setProperty('--img', cssUrl(box._src)));
  }
  return box._ready;
}
const b3io = 'IntersectionObserver' in window
  ? new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { b3io.unobserve(e.target); b3Load(e.target); } }), { rootMargin: '400px 0px' })
  : null;
const b3Lazy = (box) => { if (b3io) b3io.observe(box); else b3Load(box); return box; };
/* turn the book: rotateX tips it toward you, rotateY spins it. Each face is shaded for a soft light above and in front.
   A laminated cover also mirrors a lamp left of the book. Its glare sits where the line from the eye to the lamp's mirror
   image crosses the cover, so it slides across as the book turns; the round spine catches it as a bright line */
function b3Pose(box, rx, ry) {
  box._pose = { rx, ry };
  const m = box._rtl ? -1 : 1;   // a right-bound book is lit as the mirror image of a left-bound one
  const st = box.style, a = m * ry * Math.PI / 180, c = rx * Math.PI / 180, [lx, ly, lz] = B3_LIGHT;
  const ca = Math.cos(a), sa = Math.sin(a), cc = Math.cos(c), sc = Math.sin(c);
  const lit = ([x, y, z]) => {   // a face's direction after the turn, and how much light it catches
    const x1 = x * ca + z * sa, z1 = z * ca - x * sa;
    const y2 = y * cc - z1 * sc, z2 = y * sc + z1 * cc;
    return [x1, y2, z2, Math.max(0, x1 * lx + y2 * ly + z2 * lz)];
  };
  const inBook = ([x, y, z]) => {   // the other way round: a point in the room, in the book's own frame
    const y1 = y * cc + z * sc, z1 = z * cc - y * sc;
    return [x * ca - z1 * sa, y1, x * sa + z1 * ca];
  };
  const [w, h, t] = box._dim, eye = inBook([0, 0, B3_EYE]), lamp = inBook(B3_LAMP);
  st.setProperty('--rx', `${rx.toFixed(2)}deg`);
  st.setProperty('--ry', `${ry.toFixed(2)}deg`);
  for (const [k, n] of Object.entries(B3_FACES)) {
    const [x1, y2, , d] = lit(n);
    st.setProperty(`--s-${k}`, ((k === 'front' || k === 'back' ? 0.42 : 0.6) * (1 - d)).toFixed(3));   // covers stay bright, edges fall into shade
    if (k === 'front') {   // foil: its blues slide faster than the glare
      st.setProperty('--fx', `${(50 - m * x1 * 120 + y2 * 40).toFixed(1)}%`);
      st.setProperty('--fx2', `${(-30 - m * x1 * 160).toFixed(1)}%`);   // the highlight streak crosses the necklace at rest
    }
  }
  const pct = (v) => `${(Math.min(3, Math.max(-2, v)) * 100).toFixed(1)}%`;
  for (const [f, sg] of [['front', 1], ['back', -1]]) {
    const ez = sg * eye[2] - t / 2, lh = sg * lamp[2] - t / 2;   // how far the eye and the lamp stand off this cover
    if (ez <= 0 || lh <= 0) { st.setProperty(`--hi-${f}`, '0'); continue; }   // the cover faces away from one of them
    const q = ez / (ez + lh), x = eye[0] + (lamp[0] - eye[0]) * q, y = eye[1] + (lamp[1] - eye[1]) * q, u = 0.5 + sg * x / w;
    st.setProperty(`--hx-${f}`, pct(box._rtl ? 1 - u : u));
    st.setProperty(`--hy-${f}`, pct(0.5 + y / h));
    st.setProperty(`--hi-${f}`, Math.min(1, ez / Math.hypot(eye[0] - x, eye[1] - y, ez) / 0.3).toFixed(3));   // fades as the cover turns edge-on
    st.setProperty(`--fr-${f}`, Math.pow(1 - ez / Math.hypot(eye[0], eye[1], ez), 4).toFixed(3));   // yet edge-on, a laminate turns to a mirror
  }
  const spec = B3_SPEC[box._mat];
  B3_SPN.forEach((n, i) => {
    st.setProperty(`--s-sp${i}`, (0.42 * (1 - lit(n)[3])).toFixed(3));
    if (!spec) return;
    const p = [n[0] * t / 2 - w / 2, 0, n[2] * t / 2];   // the strip's middle, on the round bound edge
    const e = b3Unit(eye.map((v, j) => v - p[j])), l = b3Unit(lamp.map((v, j) => v - p[j])), hv = b3Unit(e.map((v, j) => v + l[j]));
    const dot = (o) => n[0] * o[0] + n[1] * o[1] + n[2] * o[2];
    st.setProperty(`--g-sp${i}`, dot(e) > 0 && dot(l) > 0 ? (spec[0] * Math.pow(Math.max(0, dot(hv)), spec[1])).toFixed(3) : '0');
  });
  st.setProperty('--sw', (Math.abs(Math.cos(a)) * 0.92 + 0.08).toFixed(3));   // the shadow narrows as the book turns edge-on
  st.setProperty('--so', Math.max(0, 1 - Math.abs(rx) / 110).toFixed(3));
}
function b3Tween(box, to, ms = 650) {
  cancelAnimationFrame(box._tw);
  if (CALM) { b3Pose(box, to.rx, to.ry); return; }
  const from = box._pose, t0 = performance.now();
  const step = (now) => {
    const k = Math.min(1, (now - t0) / ms), e = 1 - Math.pow(1 - k, 3);
    b3Pose(box, from.rx + (to.rx - from.rx) * e, from.ry + (to.ry - from.ry) * e);
    if (k < 1) box._tw = requestAnimationFrame(step);
  };
  box._tw = requestAnimationFrame(step);
}
const b3Warmed = new Set();
const b3Warm = (b) => { if (!b3Warmed.has(b.slug)) { b3Warmed.add(b.slug); new Image().src = b3Src(b, true); } };   // the book page shows the sharp cover
/* on the list, a book turns toward you while the pointer is on it */
function b3Hover(card, box, b) {
  const on = () => { b3Warm(b); b3Tween(box, b3At(box, B3_HOVER), 700); }, off = () => b3Tween(box, b3At(box, B3_REST), 900);
  card.addEventListener('pointerenter', on);
  card.addEventListener('pointerleave', off);
  card.addEventListener('focus', on);
  card.addEventListener('blur', off);
}
/* the book page: the list's copy of the cover shows at once, the sharp one replaces it; the book leans toward the mouse */
function b3Hero(b) {
  const stage = el('button', 'bk-stage'), box = b3Make(b, true), small = b3Src(b, false);
  stage.type = 'button';
  box.style.setProperty('--img', cssUrl(small));
  const pre = new Image();
  pre.src = small;
  const sharp = b3Load(box);
  box._ready = Promise.race([pre.decode().catch(() => {}), sharp]);
  stage.append(box);
  stage.addEventListener('click', () => b3vOpen(b, box));
  stage.addEventListener('pointermove', (e) => {
    if (CALM || e.pointerType !== 'mouse') return;
    const r = stage.getBoundingClientRect(), p = b3At(box, B3_REST);
    b3Tween(box, { rx: p.rx - ((e.clientY - r.top) / r.height - 0.5) * 12, ry: p.ry + ((e.clientX - r.left) / r.width - 0.5) * 22 }, 420);
  });
  stage.addEventListener('pointerleave', () => b3Tween(box, b3At(box, B3_REST), 900));
  const hint = el('p', 'bk-hint');
  hint.innerHTML = B3_ICON;
  hint.append(el('span', '', tr('b3.open')));
  return [stage, hint];
}

/* the 3D viewer: each book's cover in a window of its own (js/lightbox.js). Hold and drag to turn the book (it keeps
   spinning a little when flung), hold the left button to move it, wheel or pinch to zoom; double-click or double-tap
   the book to put it back */
if (matchMedia('(hover: none)').matches) $('#b3v-tpl').content.querySelector('.zv-hint').dataset.i18n = 'b3.hintTouch';
const b3vDensity = () => (navigator.userAgentData ? Math.min(2, devicePixelRatio || 1) : 1);   // Chromium draws a big 3D face at no more than 1 px per CSS px
/* move the view: the book shifts across the stage, but never so far that its middle leaves its own outline */
function b3vPanTo(w, x, y) {
  const k = w.z / w.q / 2, mx = w.book.offsetWidth * k, my = w.book.offsetHeight * k;
  w.px = Math.max(-mx, Math.min(mx, x));
  w.py = Math.max(-my, Math.min(my, y));
  w.zoomEl.style.setProperty('--px', `${w.px.toFixed(1)}px`);
  w.zoomEl.style.setProperty('--py', `${w.py.toFixed(1)}px`);
}
function b3vView(w, z, x, y, now) {
  w.z = Math.min(2.4, Math.max(0.6, z));
  w.zoomEl.style.setProperty('--z', w.z.toFixed(3));
  b3vPanTo(w, x, y);
  clearTimeout(w.settle);
  if (now) b3vSharpen(w);
  else w.settle = setTimeout(() => { if (!w.pinch) b3vSharpen(w); }, 450);   // once the zoom has eased in
}
function b3vZoomTo(w, z, now, ax = 0, ay = 0) {   // ax, ay: the point, from the stage's centre, that stays where it is
  const k = Math.min(2.4, Math.max(0.6, z)) / w.z;
  b3vView(w, z, ax - (ax - w.px) * k, ay - (ay - w.py) * k, now);
}
/* lay the book out at the size it is shown, so it is drawn sharp; the zoom layer's scale changes with it, without easing */
function b3vSharpen(w) {
  clearTimeout(w.settle);
  const q = w.z * b3vDensity();
  if (Math.abs(q - w.q) < 0.005) return;
  w.q = q;
  w.zoomEl.classList.add('settle');
  w.zoomEl.style.setProperty('--q', q.toFixed(3));
  void w.zoomEl.offsetWidth;
  w.zoomEl.classList.remove('settle');
}
/* opening, the book rises from where it sat on the page into its window; closing, it flies back, turning back to how
   it sits there, as the window fades (.lift lets it out of the window on the way). With the page's book not on the
   screen, it grows in or fades out where it is. Returns how long it takes (ms). */
function b3vFly(w, out) {
  if (CALM || !w.fly.animate) return 0;
  w.fly.getAnimations().forEach((x) => x.cancel());
  const a = zvRectOf(w.from), c = w.book.getBoundingClientRect();
  if (!a || !c.width) {
    const away = { opacity: 0, transform: 'scale(.92)' }, here = { opacity: 1, transform: 'none' };
    w.fly.animate(out ? [here, away] : [away, here], { duration: out ? 380 : 520, easing: out ? 'cubic-bezier(.4,0,.2,1)' : EASE_OUT, fill: out ? 'forwards' : 'none' });
    return out ? 380 : 520;
  }
  w.el.classList.add('lift');
  if (!out) {
    w.fly.animate([
      { transform: `translate(${(a.left + a.width / 2 - c.left - c.width / 2).toFixed(1)}px,${(a.top + a.height / 2 - c.top - c.height / 2).toFixed(1)}px) scale(${(a.width / c.width).toFixed(4)})` },
      { transform: 'none' },
    ], { duration: 720, easing: EASE_OUT }).finished.then(() => w.el.classList.remove('lift'), () => {});
    return 720;
  }
  /* the fly layer scales about its centre, so aim the book's centre, wherever the visitor moved it, at its place */
  const f = w.fly.getBoundingClientRect(), k = a.width / c.width, fx = f.left + f.width / 2, fy = f.top + f.height / 2;
  const tx = a.left + a.width / 2 - fx - k * (c.left + c.width / 2 - fx), ty = a.top + a.height / 2 - fy - k * (c.top + c.height / 2 - fy);
  w.fly.animate([{ transform: 'none' }, { transform: `translate(${tx.toFixed(1)}px,${ty.toFixed(1)}px) scale(${k.toFixed(4)})` }],
    { duration: 420, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' });
  if (w.from._pose) b3Tween(w.book, w.from._pose, 420);
  return 420;
}
/* open a book's 3D cover in a window (the book page's cover, clicked); one that is open already comes to the front */
function b3vOpen(b, from) {
  const same = zvWins.find((o) => !o.shut && o.kind === 'b3' && o.b === b);
  if (same) { same.from = from; zvBack(same); return; }
  const w = zvFrame('b3', from), parts = $('#b3v-tpl').content.cloneNode(true), pick = (s) => w.el.querySelector(s);
  w.el.classList.add('b3v');
  w.el.querySelector('.zv-min').before(parts.querySelector('.b3v-reset'));
  w.bar.after(...parts.children);
  textsIn(w.el);
  w.el.dataset.i18nAria = 'b3.label';
  w.el.setAttribute('aria-label', tr('b3.label'));
  const book = b3Make(b, true), name = () => w.cap.replaceChildren(el('span', '', 'COVER'), document.createTextNode(bkName(b)));
  Object.assign(w, {
    b, book, stage: pick('.b3v-stage'), fly: pick('.b3v-fly'), zoomEl: pick('.b3v-zoom'),
    z: 1, q: 1, px: 0, py: 0, settle: 0, ptr: new Map(), drag: null, pinch: null, pan: null, spin: 0, tap: 0,
    fit: () => b3vPanTo(w, w.px, w.py),   // the book takes the stage's size by itself (css/artbook.css); it stays in view
    want: (maxW, maxH, side) => {   // as css/artbook.css sizes the book: at most 60% of the stage's width, 62% of its height
      const arn = b.pages[0][0] / 2 / b.pages[0][1], sh = maxH - w.bar.offsetHeight - 2;
      return [Math.min(maxW, Math.max(side ? 0 : 480, (0.62 * sh * arn) / 0.6 + 2)), maxH];
    },
    keys: (e) => b3vKey(w, e),
    leave: (out) => b3vFly(w, out),
    land: () => { w.fly.getAnimations().forEach((x) => x.finish()); w.el.classList.remove('lift'); },
    end: () => { cancelAnimationFrame(w.spin); cancelAnimationFrame(book._tw); clearTimeout(w.settle); w.ptr.clear(); w.drag = w.pinch = w.pan = null; },
    badge: () => ({ src: b3Src(b, false), pos: b.rtl ? '25% 50%' : '75% 50%', name: bkName(b), full: `COVER · ${bkName(b)}` }),   // the chip shows the front cover
    lang: name,
  });
  name();
  book._src = `img/ab/x/${b.slug}_p0.webp`;   // full size: the viewer zooms in; the page's copy shows until it is ready
  book.style.setProperty('--img', from.style.getPropertyValue('--img'));
  b3Load(book);
  w.zoomEl.replaceChildren(book);
  pick('.b3v-reset').addEventListener('click', () => b3vReset(w));
  b3vWire(w);
  zvPut(w);
  b3vView(w, 1, 0, 0, true);
  b3Pose(book, from._pose.rx, from._pose.ry);
  b3vFly(w, false);
  b3Tween(book, b3At(book, B3_VIEW), 1000);
}
function b3vReset(w) {
  const p = w.book._pose, v = b3At(w.book, B3_VIEW);   // come back the short way round
  b3Pose(w.book, p.rx, v.ry + ((((p.ry - v.ry) % 360) + 540) % 360 - 180));
  b3Tween(w.book, v, 800);
  b3vView(w, 1, 0, 0);
}
function b3Fling(w, vx, vy) {
  vx = Math.max(-2.2, Math.min(2.2, vx));
  vy = Math.max(-1.2, Math.min(1.2, vy));
  let last = performance.now();
  const step = (now) => {
    const dt = Math.min(40, now - last), p = w.book._pose;
    last = now;
    b3Pose(w.book, b3Tilt(p.rx - vy * dt * 0.35), p.ry + vx * dt * 0.45);
    vx *= Math.pow(0.93, dt / 16.7);
    vy *= Math.pow(0.84, dt / 16.7);
    if (Math.abs(vx) + Math.abs(vy) > 0.015) w.spin = requestAnimationFrame(step);
  };
  w.spin = requestAnimationFrame(step);
}
function b3vKey(w, e) {   // the arrows turn the book, + and - zoom, 0 or Home puts it back
  const p = w.book._pose, turn = { ArrowLeft: [0, -30], ArrowRight: [0, 30], ArrowUp: [15, 0], ArrowDown: [-15, 0] }[e.key];
  if (turn) { cancelAnimationFrame(w.spin); b3Tween(w.book, { rx: b3Tilt(p.rx + turn[0]), ry: p.ry + turn[1] }, 450); }
  else if (e.key === '+' || e.key === '=') b3vZoomTo(w, w.z * 1.25);
  else if (e.key === '-') b3vZoomTo(w, w.z / 1.25);
  else if (e.key === '0' || e.key === 'Home') b3vReset(w);
  else return false;
  return true;
}
function b3vUp(w, e) {
  const st = w.stage;
  if (w.pan && e.pointerId === w.pan.id) {
    const pn = w.pan;
    w.pan = null;
    st.classList.remove('pan');
    if (!pn.moved && pn.btn === 0 && e.type !== 'pointercancel') b3vTap(w, e);   // a left click, not a drag
    return;
  }
  if (!w.ptr.delete(e.pointerId)) return;
  if (w.pinch) {
    if (!w.ptr.size) { w.pinch = null; st.classList.remove('pinch'); b3vSharpen(w); }
    return;
  }
  const d = w.drag;
  w.drag = null;
  st.classList.remove('drag');
  if (!d || e.type === 'pointercancel') return;
  if (d.moved) { if (!CALM && e.timeStamp - d.lt < 90) b3Fling(w, d.vx, d.vy); return; }
  if (!d.mouse) b3vTap(w, e);   // a tap; a right click on its own does nothing
}
/* two clicks or taps in a row on the book put it back */
function b3vTap(w, e) {
  const r = w.book.getBoundingClientRect(), pad = 40;
  if (e.clientX < r.left - pad || e.clientX > r.right + pad || e.clientY < r.top - pad || e.clientY > r.bottom + pad) return;
  if (w.tap && e.timeStamp - w.tap < 350) { w.tap = 0; b3vReset(w); } else w.tap = e.timeStamp;
}
/* the stage's pointers: the left button (or the wheel) held moves the view, the right button or one finger turns the
   book, two fingers pinch to zoom; the wheel zooms toward the pointer */
function b3vWire(w) {
  const st = w.stage;
  st.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && (e.button === 0 || e.button === 1)) {
      if (e.button === 1) e.preventDefault();
      try { st.setPointerCapture(e.pointerId); } catch (_) { /* move without capture */ }
      cancelAnimationFrame(w.spin);
      w.pan = { id: e.pointerId, btn: e.button, x: e.clientX, y: e.clientY, px: w.px, py: w.py, moved: false };
      return;
    }
    if (e.pointerType === 'mouse' && e.button !== 2) return;
    w.ptr.set(e.pointerId, [e.clientX, e.clientY]);
    try { st.setPointerCapture(e.pointerId); } catch (_) { /* keep turning without capture */ }
    cancelAnimationFrame(w.spin);
    cancelAnimationFrame(w.book._tw);
    if (w.ptr.size === 2) {   // a second finger: pinch to zoom
      const [[x1, y1], [x2, y2]] = w.ptr.values();
      const r = st.getBoundingClientRect();
      w.pinch = { d: Math.hypot(x2 - x1, y2 - y1) || 1, z: w.z, cx: (x1 + x2) / 2 - r.left - r.width / 2, cy: (y1 + y2) / 2 - r.top - r.height / 2, px: w.px, py: w.py };
      w.drag = null;
      st.classList.add('pinch');
    } else if (w.ptr.size === 1) {
      const p = w.book._pose;
      w.drag = { x: e.clientX, y: e.clientY, rx: p.rx, ry: p.ry, moved: false, lx: e.clientX, ly: e.clientY, lt: e.timeStamp, vx: 0, vy: 0, mouse: e.pointerType === 'mouse' };
    }
  });
  st.addEventListener('pointermove', (e) => {
    const pn = w.pan;
    if (pn && e.pointerId === pn.id) {
      const dx = e.clientX - pn.x, dy = e.clientY - pn.y;
      if (!pn.moved) {
        if (Math.abs(dx) + Math.abs(dy) < 5) return;   // still a click
        pn.moved = true;
        st.classList.add('pan');
      }
      b3vPanTo(w, pn.px + dx, pn.py + dy);
      return;
    }
    if (!w.ptr.has(e.pointerId)) return;
    w.ptr.set(e.pointerId, [e.clientX, e.clientY]);
    if (w.pinch) {
      if (w.ptr.size < 2) return;
      const [[x1, y1], [x2, y2]] = w.ptr.values(), r = st.getBoundingClientRect(), p = w.pinch;
      const z = Math.min(2.4, Math.max(0.6, p.z * Math.hypot(x2 - x1, y2 - y1) / p.d)), k = z / p.z;   // the point under the fingers stays under them
      b3vView(w, z, (x1 + x2) / 2 - r.left - r.width / 2 - (p.cx - p.px) * k, (y1 + y2) / 2 - r.top - r.height / 2 - (p.cy - p.py) * k);
      return;
    }
    const d = w.drag;
    if (!d) return;
    const dx = e.clientX - d.x, dy = e.clientY - d.y;
    if (!d.moved) {
      if (Math.abs(dx) + Math.abs(dy) < 5) return;
      d.moved = true;
      st.classList.add('drag');
    }
    const dt = Math.max(8, e.timeStamp - d.lt);
    d.vx = 0.7 * (e.clientX - d.lx) / dt + 0.3 * d.vx;
    d.vy = 0.7 * (e.clientY - d.ly) / dt + 0.3 * d.vy;
    d.lx = e.clientX; d.ly = e.clientY; d.lt = e.timeStamp;
    b3Pose(w.book, b3Tilt(d.rx - dy * 0.35), d.ry + dx * 0.45);
  });
  st.addEventListener('pointerup', (e) => b3vUp(w, e));
  st.addEventListener('pointercancel', (e) => b3vUp(w, e));
  st.addEventListener('wheel', (e) => {
    e.preventDefault();
    const r = st.getBoundingClientRect();
    b3vZoomTo(w, w.z * Math.exp(-e.deltaY * (e.deltaMode ? 0.05 : 0.0015)), false, e.clientX - r.left - r.width / 2, e.clientY - r.top - r.height / 2);
  }, { passive: false });
  st.addEventListener('mousedown', (e) => { if (e.button === 1) e.preventDefault(); });   // no autoscroll when the wheel is held
  st.addEventListener('auxclick', (e) => { if (e.button === 1) e.preventDefault(); });
  st.addEventListener('contextmenu', (e) => e.preventDefault());   // the right button turns the book
}

/* ==================== js/motion.js ==================== */
/* Motion: reduced-motion switch, scroll reveals, hero parallax */
/* ---------- motion ---------- */
const CALM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const VT = !!document.startViewTransition && !CALM;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const onScreen = (e) => { if (!e) return false; const r = e.getBoundingClientRect(); return r.width > 0 && r.bottom > 0 && r.top < innerHeight; };

/* static elements that tween in as they scroll into view: [selector, kind, delay] */
[['.sec-title', 'track'], ['.cats', 'up', 0.08],['.sec-sub', 'up', 0.15],['.g-shop', 'up'], ['.group-t', 'up'],
 ['.facts', 'up', 0.3], ['.gd-actions', 'up', 0.35], ['#it-works-box', 'up'], ['.proj-nav', 'up']]
  .forEach(([sel, kind, d]) => document.querySelectorAll(sel).forEach((e) => { e.dataset.rv = kind; if (d) e.dataset.d = d + 's'; }));
document.querySelectorAll('.about-txt p').forEach((e, i) => { e.dataset.rv = 'up'; e.dataset.d = (0.15 + i * 0.12) + 's'; });
document.querySelectorAll('.g-head').forEach((h) => [...h.children].forEach((e, i) => { e.dataset.rv = 'up'; e.dataset.d = (i * 0.08) + 's'; }));
document.querySelectorAll('.channels, .evs').forEach((ul) => ul.querySelectorAll('li').forEach((li, i) => { li.dataset.rv = 'x'; li.dataset.d = (i * 0.07) + 's'; }));
document.querySelectorAll('.facts dd').forEach((dd) => { if (+dd.textContent < 1000) dd.dataset.count = dd.textContent; });

const io = !CALM && 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('rv-in');
        io.unobserve(e.target);
        if (e.target.querySelector('[data-count]')) countUp(e.target);
      }
    }, { rootMargin: '0px 0px -8% 0px' })
  : null;

/* put a view's reveal elements in their start state; returns the ones to watch */
function prime(root) {
  if (!io) return [];
  const els = [...root.querySelectorAll('[data-rv]')];
  for (const t of els) {
    io.unobserve(t);
    if (t.dataset.d) t.style.setProperty('--d', t.dataset.d);
    t.classList.remove('rv-in', 'rv-now');
    t.classList.add('rv-pre');
  }
  return els;
}
const pending = (root) => (io ? [...root.querySelectorAll('[data-rv]:not(.rv-in)')] : []);
const watch = (els) => { if (io) els.forEach((t) => io.observe(t)); };
/* the element a page morph lands on must be in place at once, without its own tween */
function showNow(e) {
  const r = e && e.closest('[data-rv]');
  if (!r) return;
  if (io) io.unobserve(r);
  r.classList.add('rv-pre', 'rv-in', 'rv-now');
}
function countUp(root) {
  root.querySelectorAll('[data-count]').forEach((dd) => {
    const to = +dd.dataset.count, t0 = performance.now(), dur = 1500;
    const step = (now) => {
      const k = Math.min(1, (now - t0) / dur);
      dd.textContent = String(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) requestAnimationFrame(step);
    };
    dd.textContent = '0';
    requestAnimationFrame(step);
  });
}

/* hero parallax: the art drifts slower than the page, the name lifts. It stays clear as it goes: nothing waits below
   the carousel to fade it out for (the latest posts and videos are behind the corner buttons now) */
const hero = $('.hero'), heroMedia = $('.hero-media'), heroTxt = $('.hero-txt');
let rafId = 0;
function parallax() {
  rafId = 0;
  if (view !== 'home') return;
  const y = Math.max(0, scrollY), h = hero.offsetHeight;
  if (y > h + 60) return;
  heroMedia.style.transform = `translate3d(0,${(y * 0.35).toFixed(1)}px,0)`;
  heroTxt.style.transform = `translate3d(0,${(y * 0.18).toFixed(1)}px,0)`;
}
if (!CALM) addEventListener('scroll', () => { if (!rafId) rafId = requestAnimationFrame(parallax); }, { passive: true });

/* ==================== js/home.js ==================== */
/* Home: a carousel of featured works under the name. On every visit, and every time Home is pressed, it shows HERO_N
   of the works in HOME_SLIDES (data.js), picked and ordered at random. A dot for each work picks it; a swipe or the
   arrow keys go to the next or previous one. It moves on by itself, except while the visitor is on its controls or
   prefers less motion. */
const heroSlides = $('#hero-slides'), heroDots = $('#hero-dots'), heroCap = $('#hero-cap');
const HERO_N = 5;       // how many works a pick shows
const HERO_MS = 6500;   // how long each work stays before the next one fades in
let SLIDES = [], heroCur = null, heroAt = -1, heroPicks = 0, heroTimer = 0, heroHover = false, heroFocus = false, heroX = null;

/* pos says where the crop centres on the screen; a turned picture needs it in its own, unturned terms */
function turnPos(pos, turn) {
  const [x, y] = pos.split(' ').map(parseFloat);
  return turn === 90 ? `${y}% ${100 - x}%` : turn === -90 ? `${100 - y}% ${x}%` : pos;
}

/* one slide: the picture in its box (on its side if turn says so), and its dot */
function heroMake(item, i) {
  const s = { w: WORKS[byId[item.id]], pos: item.pos, turn: item.turn };
  s.box = el('div', 'hero-slide');
  s.img = el('img');
  s.img.alt = '';   // the title is in the link under the carousel
  s.img.decoding = 'async';
  s.img.style.objectPosition = s.turn ? turnPos(s.pos || '50% 50%', s.turn) : s.pos || s.w.pos || '';
  const picture = el('picture');
  picture.append(s.img);
  if (s.turn) {   // a box as tall as the screen is wide, turned around its centre
    const t = el('div', 'hero-turn');
    t.style.setProperty('--turn', `${s.turn}deg`);
    t.append(picture);
    s.box.classList.add('turned');
    s.box.append(t);
  } else s.box.append(picture);
  s.dot = el('button', 'hero-dot');
  s.dot.type = 'button';
  s.dot.append(el('i'));
  s.dot.addEventListener('click', () => { heroShow(i); heroPlay(); });
  return s;
}

/* a new pick of works in a new order. The work on screen, if any, stays until the new first picture is ready and
   then fades out under it; the new first work is never the one that was showing. */
function heroPick() {
  const pick = ++heroPicks, was = heroCur, old = SLIDES;
  const pool = HOME_SLIDES.filter((s) => s.id in byId);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  if (was && pool.length > 1 && pool[0].id === was.w.id) pool.push(pool.shift());
  SLIDES = pool.slice(0, HERO_N).map(heroMake);
  old.forEach((s) => { if (s !== was) s.box.remove(); });
  heroSlides.append(...SLIDES.map((s) => s.box));
  heroDots.replaceChildren(...SLIDES.map((s) => s.dot));
  heroAt = -1;
  heroText();
  if (!SLIDES.length) return;
  if (!was) {
    SLIDES[0].img.fetchPriority = 'high';
    heroShow(0);
    return;
  }
  heroLoad(SLIDES[0]);
  Promise.race([SLIDES[0].img.decode(), sleep(900)]).catch(() => {}).then(() => {
    if (pick !== heroPicks) return;   // a newer pick has taken over
    if (heroCur === was) heroShow(0);   // unless the visitor has already chosen one with a dot
    setTimeout(() => was.box.remove(), 1500);   // once it has faded
    heroPlay();
  });
}

/* a picture is fetched only when its slide is next: the page copy, or the full-size one when it shows wider than
   that (sizes, from heroSizes) on the screen's pixels */
function heroLoad(s) {
  if (s.img.src) return;
  const [w, h, zw] = s.w.dims[0], page = src(s.w.id, 0);
  s.img.width = w;
  s.img.height = h;
  s.img.sizes = '100vw';   // until heroSizes knows how wide it shows
  heroSizes(s);
  if (zw) {
    const phone = el('source');
    phone.media = '(max-width: 600px), (pointer: coarse) and (max-height: 600px)';
    phone.srcset = page;
    s.img.before(phone);
    s.img.srcset = `${page} ${w}w, ${page.replace('img/', 'img/z/')} ${zw}w`;
  }
  s.img.src = page;
}

/* sizes: how wide the picture shows, so the browser picks a copy sharp enough for the screen's pixel density.
   Covering the screen, a picture wider than the screen's shape shows wider than the screen. */
function heroSizes(s) {
  let W = heroSlides.clientWidth, H = heroSlides.clientHeight;
  if (!s || !W || !H) return;
  const d = s.w.dims[0], w = d[2] || d[0], h = d[3] || d[1];   // its shape (both copies have the same)
  if (s.turn) [W, H] = [H, W];   // a turned picture covers the screen on its side
  s.img.sizes = `${Math.ceil(Math.max(W, H * w / h))}px`;
}
const heroRefit = () => SLIDES.forEach((s) => { if (s.img.src) heroSizes(s); });
if ('ResizeObserver' in window) new ResizeObserver(heroRefit).observe(heroSlides);   // also when the home page is shown again
else addEventListener('resize', heroRefit);

function heroShow(i) {
  const s = SLIDES[i];
  if (!s || s === heroCur) return;
  const first = !heroCur;
  if (heroCur) heroCur.box.classList.remove('on');
  heroCur = s;
  heroAt = i;
  heroLoad(s);
  const preloadNext = () => {
    if (view === 'home' && SLIDES[i] === s && heroCur === s) heroLoad(SLIDES[(i + 1) % SLIDES.length]);
  };
  if (s.img.complete) preloadNext();
  else s.img.addEventListener('load', preloadNext, { once: true });
  s.box.classList.add('on');
  SLIDES.forEach((x, k) => x.dot.setAttribute('aria-current', String(k === i)));
  heroCap.href = '#w-' + s.w.id;
  heroCap.querySelector('.hero-cap-t').textContent = L(s.w.t);
  if (!first && !CALM) heroCap.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 900, easing: 'cubic-bezier(.16,1,.3,1)' });
}
const heroStep = (d) => { heroShow((heroAt + d + SLIDES.length) % SLIDES.length); heroPlay(); };

/* the timer runs only while the home page is shown in a visible tab */
function heroPlay() {
  clearTimeout(heroTimer);
  if (view === 'home') heroRefit();   // the home page may have been hidden (unmeasurable) until now
  if (CALM || heroHover || heroFocus || document.hidden || view !== 'home' || SLIDES.length < 2) return;
  heroTimer = setTimeout(() => heroStep(1), HERO_MS);
}
document.addEventListener('visibilitychange', heroPlay);
for (const c of [heroDots, heroCap]) {   // hold still while the visitor is on the dots or the title
  c.addEventListener('pointerenter', () => { heroHover = true; heroPlay(); });
  c.addEventListener('pointerleave', () => { heroHover = false; heroPlay(); });
  c.addEventListener('focusin', (e) => { heroFocus = e.target.matches(':focus-visible'); heroPlay(); });
  c.addEventListener('focusout', () => { heroFocus = false; heroPlay(); });
}
hero.addEventListener('pointerdown', (e) => { heroX = e.pointerType === 'mouse' ? null : e.clientX; });
hero.addEventListener('pointercancel', () => { heroX = null; });
hero.addEventListener('pointerup', (e) => {
  if (heroX === null) return;
  const dx = e.clientX - heroX;
  heroX = null;
  if (Math.abs(dx) > 50 && SLIDES.length > 1) heroStep(dx < 0 ? 1 : -1);
});
addEventListener('keydown', (e) => {
  if (view !== 'home' || SLIDES.length < 2 || e.altKey || e.metaKey || e.ctrlKey || document.documentElement.classList.contains('menu-open')) return;
  if (e.key === 'ArrowRight') heroStep(1);
  if (e.key === 'ArrowLeft') heroStep(-1);
});

/* the dots' names, again after a language change */
function heroText() {
  SLIDES.forEach((s, i) => s.dot.setAttribute('aria-label', tr('home.dot', { n: i + 1, t: L(s.w.t) })));
}

/* counts under a video or a post, each after its mark: views, likes (thumb: YouTube, heart: X), reposts; written
   short in the page's language (1.2萬, 1.2K, 1.2万), again on a language change */
const STAT_ICON = {
  view: '<path d="M1.5 12S5.3 5 12 5s10.5 7 10.5 7-3.8 7-10.5 7S1.5 12 1.5 12Z"/><circle cx="12" cy="12" r="3"/>',
  thumb: '<path d="M7 10.5V20H3.5v-9.5H7Zm0 0 3.6-7a2.2 2.2 0 0 1 3.2 2.5L13 9.5h5.6a2 2 0 0 1 2 2.4l-1.4 6.5a2 2 0 0 1-2 1.6H7"/>',
  heart: '<path d="M12 20s-7.5-4.4-7.5-10.2A4.1 4.1 0 0 1 8.6 5.6c1.5 0 2.7.8 3.4 1.9.7-1.1 1.9-1.9 3.4-1.9a4.1 4.1 0 0 1 4.1 4.2C19.5 15.6 12 20 12 20Z"/>',
  rt: '<path d="M4.5 10V8.5a3 3 0 0 1 3-3h11m0 0-3-3m3 3-3 3M19.5 14v1.5a3 3 0 0 1-3 3h-11m0 0 3 3m-3-3 3-3"/>',
};
function stats(pairs) {
  const row = el('span', 'st-row');
  row.innerHTML = pairs.map(([k, n]) => `<span class="st"><svg viewBox="0 0 24 24" aria-hidden="true">${STAT_ICON[k]}</svg><span class="st-n" data-n="${Number(n) || 0}"></span></span>`).join('');
  return row;
}
function statText(box) {
  const f = new Intl.NumberFormat(HTML_LANG[LANG], { notation: 'compact', maximumFractionDigits: 1 });
  box.querySelectorAll('.st-n').forEach((s) => { s.textContent = f.format(+s.dataset.n); });
}
/* a card's date, with its counts at the other end of the line */
function dateLine(cls, d, pairs) {
  const p = el('span', cls);
  p.append(el('span', '', dot(d)), stats(pairs));
  return p;
}

/* ---------- the latest three videos on the YouTube channel, newest first, with their views and likes: yt-latest.json,
   which .github/workflows/yt-latest.yml brings up to date every hour (tools/yt_latest.py). A click opens the video on
   YouTube in a new tab. ---------- */
const ytGrid = $('#yt-grid');
function ytText() {
  ytGrid.querySelectorAll('.yt-item').forEach((it) => {
    const c = it.querySelector('.tl-card'), s = tr('yt.stats', { v: it.dataset.v, l: it.dataset.l });
    c.setAttribute('aria-label', `${tr('tl.play', { t: c.dataset.t })} ${s}`);
    it.querySelector('.st-row').title = s;
  });
  statText(ytGrid);
}
fetch('yt-latest.json', { cache: 'no-cache' })
  .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
  .then(({ videos }) => {
    ytGrid.replaceChildren(...videos.slice(0, 3).map((v) => {
      const item = el('div', 'yt-item'), card = el('a', 'tl-card'), im = el('img');
      card.href = `https://www.youtube.com/watch?v=${v.id}`; card.target = '_blank'; card.rel = 'noopener';
      card.dataset.t = v.t;
      im.width = 1280; im.height = 720; im.alt = ''; im.loading = 'lazy';
      const hq = () => { im.src = `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`; };   // a video without a full-size picture
      im.addEventListener('error', hq, { once: true });
      im.addEventListener('load', () => { if (im.naturalWidth < 200 && !im.src.includes('hqdefault')) hq(); });   // YouTube's stand-in is 120 px
      im.src = `https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`;
      card.append(im, el('span', 'tl-play'));
      item.dataset.v = v.v || 0; item.dataset.l = v.l || 0;
      item.append(card, el('p', 'yt-t', v.t), dateLine('yt-d', v.d, [['view', v.v], ['thumb', v.l]]));
      return item;
    }));
    ytText();
    $('#yt-btn').hidden = !videos.length;
    snsFit();
  })
  .catch(() => {});   // no list: no button

/* ---------- the newest five posts on X, the account's own with a picture (no reposts, replies, quotes, or posts of
   words only): x-latest.json, with their pictures in img/x/, which .github/workflows/x-latest.yml brings up to date
   every hour (tools/x_latest.py). Each is a cover like the works wall's with its picture whole; a post of several
   pictures deals up to three of them as a hand of cards, like the doodle collections. Under each, its first words,
   its date, and its reposts and likes (read again once a day). A click opens the post on X. ---------- */
const xWall = $('#x-wall');
const X_SEED = (WALL_SEED ^ 0x85ebca6b) >>> 0;   // an arrangement of its own, kept while the page is open
function xText() {
  xWall.querySelectorAll('.cover').forEach((a) => {
    const d = dot(a.dataset.d), s = tr('x.stats', { rt: a.dataset.rt, like: a.dataset.like });
    a.querySelector('.st-row').title = s;
    a.setAttribute('aria-label', `${tr('x.post', { d })} ${s}`);
  });
  statText(xWall);
}
/* up to three of a post's pictures, a new pick on every page load, in their order */
function xPicks(imgs) {
  const pool = imgs.map((_, k) => k);
  for (let k = pool.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [pool[k], pool[j]] = [pool[j], pool[k]]; }
  return pool.slice(0, 3).sort((a, b) => a - b).map((k) => imgs[k]);
}
/* the layout: random, but balanced first ("亂中有序", the user's wish); the time order comes second. Rows that each
   fill the window's width: the pictures in a row share one height, so no row leaves a hole at its end. Every order of
   the posts and every way to cut it into rows is tried (at most four to a row, two on phones; a row of one only for a
   wide picture); the ones whose rows come closest to a comfortable height win, with a small price on each post out of
   time order, and one of the best few is taken at random. Then each cover shrinks a little in its place, moves a
   little in it, and some turn slightly, as on the works wall.
   A hand of cards is sized by its cards, as the works wall sizes a collection: each card as tall as the pictures
   beside it, so the hand stands taller than they do, and they sit at its middle. */
function xLayout() {
  const W = xWall.clientWidth;
  if (!W) return;
  const rand = seeded(X_SEED), items = [...xWall.querySelectorAll('.cover')], n = items.length;
  if (!n) return;
  const wide = W >= 600, gap = wide ? 18 : 12, most = wide ? 4 : 2, target = wide ? 230 : 160;
  const rb = items.map((el) => +el.dataset.r || 1);   // each cover's width / height
  const r = items.map((el, i) => {   // its width beside pictures 1 tall: a hand's, its width over a card's height
    if (!('cw' in el.dataset)) return rb[i];
    const hs = [...el.querySelectorAll('.fan-c')].map((c) => 1 / parseFloat(c.style.getPropertyValue('--ca')));
    return 1 / +el.dataset.cw / (hs.reduce((s, v) => s + v, 0) / hs.length);
  });
  const t = r.map((v, i) => v / rb[i]);   // and its height there: 1, or more for a hand
  let all = [], strict = true;
  const cut = (order) => {   // every way to cut this order into rows
    for (let mask = 0; mask < 1 << (n - 1); mask++) {
      const rows = [[order[0]]];
      for (let i = 1; i < n; i++) { if (mask & (1 << (i - 1))) rows.push([]); rows[rows.length - 1].push(order[i]); }
      if (rows.some((row) => row.length > most || (strict && row.length === 1 && r[row[0]] < 1.25 && n > 1))) continue;
      const hs = rows.map((row) => (W - gap * (row.length - 1)) / row.reduce((s, i) => s + r[i], 0));
      let cost = hs.reduce((s, h) => s + ((h - target) / target) ** 2 * 100, 0);
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (order[j] < order[i]) cost += 2;
      all.push({ rows, hs, cost });
    }
  };
  const perms = (rest, done) => {
    if (!rest.length) { cut(done); return; }
    rest.forEach((x, i) => perms([...rest.slice(0, i), ...rest.slice(i + 1)], [...done, x]));
  };
  perms(items.map((_, i) => i), []);
  if (!all.length) { strict = false; perms(items.map((_, i) => i), []); }   // no wide picture to stand alone: let one that is not
  all.sort((a, b) => a.cost - b.cost);
  const near = all.filter((l) => l.cost <= all[0].cost + 6).slice(0, 6);
  const pick = near[Math.floor(rand() * near.length)] || all[0];
  let y = 0;
  pick.rows.forEach((row, k) => {
    const h = pick.hs[k], band = h * Math.max(...row.map((i) => t[i]));
    let x = 0, bottom = 0;
    row.forEach((i) => {
      const el = items[i], slot = r[i] * h, w = slot * (0.9 + rand() * 0.08);
      el.style.width = `${Math.round(w)}px`;
      const top = y + (band - h * t[i]) / 2 + (h - w / r[i]) * t[i] * rand() + rand() * 8;
      placeCover(el, x + (slot - w) * rand(), top, rand() < 0.5 ? (rand() - 0.5) * 2 : 0);
      bottom = Math.max(bottom, top + el.offsetHeight);
      x += slot + gap;
    });
    y = bottom + gap;
  });
  xWall.style.height = `${Math.ceil(y - gap)}px`;
}
fetch('x-latest.json', { cache: 'no-cache' })
  .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
  .then(({ posts }) => {
    const shown = posts.filter((p) => p.imgs && p.imgs.length).slice(0, 5);
    xWall.replaceChildren(...shown.map((p) => {
      const a = makeCover(p.url, xPicks(p.imgs), '50% 50%', false);
      a.target = '_blank'; a.rel = 'noopener';
      delete a.dataset.rv;   // no scroll reveal in a window
      a.dataset.d = p.d; a.dataset.rt = p.rt || 0; a.dataset.like = p.like || 0;
      a.querySelector('.cap-t').textContent = p.text;
      a.querySelector('.cap-m').replaceWith(dateLine('cap-m', p.d, [['rt', p.rt], ['heart', p.like]]));
      return a;
    }));
    xText();
    $('#x-btn').hidden = !shown.length;
    snsFit();
  })
  .catch(() => {});   // no list yet (before the X secrets are set): no button

/* ---------- on the home page, a round button in the corner for each of those: its ring opens into its window, which
   stretches from the button toward the top left with the ring's curve at every corner, the logo staying at the bottom
   right. The same button closes it back into the ring, and so do a right-click anywhere outside it, a tap outside it
   on a touch screen, and Esc. ---------- */
const snsDock = $('#sns-dock');
const SNS = [];
let snsAt = null;   // the open one
/* where a window sits (its bottom right corner on its button's) and how big it is open: its contents, no taller than
   the room between the header and the button (more than that scrolls with the wheel or a finger, with no scrollbar);
   and the gold line round it */
function snsSize(s) {
  const inner = s.pop.firstElementChild, b = s.btn.offsetWidth;
  if (inner.contains(xWall)) xLayout();
  s.pop.style.bottom = `${snsDock.offsetHeight - s.btn.offsetTop - b}px`;
  inner.style.maxHeight = `${Math.max(160, s.btn.getBoundingClientRect().bottom - $('.site-head').getBoundingClientRect().bottom - 14)}px`;
  return [inner.offsetWidth + 2, inner.offsetHeight + 2];
}
/* the ring opens into the window, or the window closes back into the ring, from wherever it is now. On the way it
   also takes on the window's ground and deeper shadow, or gives them back for the button's (the same see-through
   ground as the event pill, for now), so that where the window ends as the ring, the button takes over looking just
   the same */
function snsMove(s, open) {
  const pop = s.pop, b = `${s.btn.offsetWidth}px`, dock = getComputedStyle(snsDock), now = getComputedStyle(pop);
  const ring = { width: b, height: b, backgroundColor: dock.getPropertyValue('--ring-bg').trim(), boxShadow: dock.getPropertyValue('--ring-shadow').trim() };
  const from = pop.hidden ? ring : { width: now.width, height: now.height, backgroundColor: now.backgroundColor, boxShadow: now.boxShadow };
  if (pop.anim) pop.anim.cancel();
  if (pop.hidden) { pop.hidden = false; pop.querySelector('.sns-body').scrollTop = 0; }   // opened again: from its top
  const [w, h] = open ? snsSize(s) : [s.btn.offsetWidth, s.btn.offsetWidth];
  pop.style.width = `${w}px`; pop.style.height = `${h}px`;
  const rest = getComputedStyle(pop);
  const to = open ? { width: `${w}px`, height: `${h}px`, backgroundColor: rest.backgroundColor, boxShadow: rest.boxShadow } : ring;
  s.btn.classList.add('morph');
  snsOver();
  const done = (a) => {
    pop.anim = null;
    if (!open) { pop.hidden = true; s.btn.classList.remove('morph'); if (a) a.cancel(); snsOver(); }   // the button's ring takes over
  };
  if (CALM) { done(); return; }
  const a = pop.anim = pop.animate([from, to], { duration: 550, easing: 'cubic-bezier(.16,1,.3,1)', fill: open ? 'none' : 'forwards' });
  a.finished.then(() => { if (pop.anim === a) done(a); }, () => {});   // cancelled: a newer move took over
}
/* a button below a window that is out (open, or on its way) sits above it, so the window's shadow does not dim it;
   a button above one stays under it, as the window grows over it */
function snsOver() {
  SNS.forEach((o) => o.btn.classList.toggle('over', SNS.some((s) => !s.pop.hidden && s.btn.offsetTop < o.btn.offsetTop)));
}
/* the open window fits its contents again: when they change size (another screen size, another language), when the
   screen gets taller or shorter, when a button comes */
function snsFit() {
  if (!snsAt || snsAt.pop.anim) return;
  const [w, h] = snsSize(snsAt);
  snsAt.pop.style.width = `${w}px`; snsAt.pop.style.height = `${h}px`;
}
const snsWatch = new ResizeObserver(() => requestAnimationFrame(snsFit));
addEventListener('resize', snsFit);
/* open s (one of SNS), or shut the open one (null) */
function snsSet(s) {
  if (s === snsAt) return;
  if (snsAt) { snsAt.btn.setAttribute('aria-expanded', 'false'); snsMove(snsAt, false); }
  snsAt = s;
  if (s) { s.btn.setAttribute('aria-expanded', 'true'); snsMove(s, true); }
  snsDock.classList.toggle('open', !!s);   // the speech bubble steps aside (css/home.css .sns-tip)
}
function registerSns(btn) {
  const pop = document.getElementById(btn.getAttribute('aria-controls'));
  const s = { btn, pop };
  SNS.push(s);
  snsWatch.observe(pop.firstElementChild);
  for (const node of [pop, btn]) {
    node.addEventListener('pointerenter', () => pop.classList.add('lit'));
    node.addEventListener('pointerleave', () => pop.classList.remove('lit'));
  }
  btn.addEventListener('click', () => snsSet(snsAt === s ? null : s));
}
snsDock.querySelectorAll('.sns-btn').forEach(registerSns);
const snsOut = (e) => snsAt && e.target instanceof Element && !e.target.closest('.sns-dock');
document.addEventListener('contextmenu', (e) => { if (snsOut(e)) { e.preventDefault(); snsSet(null); } });
document.addEventListener('click', (e) => { if (snsOut(e) && matchMedia('(hover: none)').matches) snsSet(null); });
addEventListener('keydown', (e) => { if (e.key === 'Escape' && snsAt) { const b = snsAt.btn; snsSet(null); b.focus(); } });
/* the buttons are there on the home page only (js/router.js); leaving it shuts the window at once */
function snsShow(on) {
  snsDock.hidden = !on;
  if (!on && snsAt) { const p = snsAt.pop; snsSet(null); if (p.anim) p.anim.finish(); }
}

/* ==================== js/router.js ==================== */
/* Page changes: hash routing, the category curtain, page morphs, the nav underline */
/* ---------- hash routing: #home (the carousel), #work #fanart #original #nsfw (the wall), #artbook #ab-<book> #goods #event #about #contact #board (#board-admin: its review page) #w-<work id> (#w-<id>/<n>: piece n of a collection) #t-<tag> (every work with it) #g-<goods slug> ---------- */
let view = null, lastWork = null, lastPiece = -1, lastItem = null;
/* where each page was scrolled when it was left (by its address), to come back to it there. The site places the page
   itself on every change, so the browser's own scroll restoration is off: on Back it scrolled the page being left
   first, under the picture about to go back into its list, and then the list was not where it had been */
const leftAt = new Map();
let shownAt = null;   // the address of the page on screen
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
/* back to a list (or a collection's grid) from one of its pages: just where it was left, so the picture goes back
   into its place; if it does not show there (another page was opened since), it comes to the middle of the screen */
function backTo(e) {
  const y = leftAt.get(location.hash);
  if (y != null) scrollTo(0, y);
  if (!onScreen(e)) e.scrollIntoView({ block: 'center' });
}
function parse() {
  let h = location.hash.slice(1);
  try { h = decodeURIComponent(h); } catch (e) { /* malformed shared URL: fall back to the home page */ }
  const catalog = CATALOGS.find((c) => h === 'g-' + catalogSlug(c) || h === 'w-' + c.id);
  if (catalog) {
    if (h.startsWith('w-')) {
      h = 'g-' + catalogSlug(catalog);
      history.replaceState(history.state, '', '#' + h);
    }
    return { h, next: 'catalog', catalog };
  }
  if (h === 'about' || h === 'contact' || h === 'goods' || h === 'game' || h === 'event') return { h, next: h, idx: -1 };
  if (h === 'board' || h === 'board-admin') return { h, next: 'board', idx: -1 };
  if (h === 'work' || h === 'timeline') return { h, next: 'works', idx: -1 };   // #timeline: an old address of the wall
  if (h === 'fanart' || h === 'original' || h === 'nsfw') return { h, next: 'works', idx: -1, cat: h === 'fanart' ? 'fan' : h };
  if (h.startsWith('w-')) {
    if (h.slice(2) in MOVED) { history.replaceState(history.state, '', '#w-' + MOVED[h.slice(2)]); return parse(); }   // now a collection's piece
    const [id, pn] = h.slice(2).split('/'), n = Number(pn);
    if (id in byId) {
      const w = WORKS[byId[id]];
      return { h, next: 'work', idx: byId[id], piece: w.pieces && Number.isInteger(n) && n >= 1 && n <= w.dims.length ? n - 1 : -1 };
    }
  }
  if (h.startsWith('t-') && tagWorks(h.slice(2)).length) return { h, next: 'tag', idx: -1, tag: h.slice(2) };
  if (h.startsWith('g-') && h.slice(2) in bySlug) return { h, next: 'item', idx: bySlug[h.slice(2)] };
  if (h === 'artbook') return { h, next: 'artbook', idx: -1 };
  if (h.startsWith('ab-') && h.slice(3) in byBook) return { h, next: 'book', idx: byBook[h.slice(3)] };
  return { h, next: 'home', idx: -1 };
}

/* the parts of the site, as the menu has them: moving inside one (a list, its pages, and back) keeps it as it is; come
   to it from another part, or on arriving, it starts as at first: Fan Art, newest first, the first screenshot, the
   photo (the user asked for this). An address that names a category (#original) still opens on it */
const PART = { work: 'works', tag: 'works', book: 'artbook', catalog: 'goods', item: 'goods' };
const partOf = (v) => PART[v] || v;
function startOver(next) {
  const p = partOf(next);
  if (p === 'works') { setSort('new'); charFold(); }   // (the category: in apply)
  else if (p === 'artbook' && abSort !== 'new') { abSort = 'new'; if (abBuilt) renderBooks(); }
  else if (p === 'goods' && goodsOrder !== 'new') { goodsOrder = 'new'; if (goodsHeadings.size) renderGoods(); }
  else if (p === 'game') { if (shotAt) showShot(0, false); deckTrack.scrollLeft = 0; }
  else if (p === 'about' && aboutPlush) { aboutPlush = false; paintAbout(); }
}

/* swap the DOM to the requested view, then start watching its reveal elements */
function apply({ h, next, idx, cat, piece = -1, tag, catalog }) {
  const from = view, fromPiece = lastPiece;
  if (from === 'item' && next !== 'item') itemClose(true);
  stopWorkVideo();
  zvPage(next);   // another part of the site: the picture windows close
  const same = from === next;
  const anew = from === null || partOf(from) !== partOf(next);
  if (anew) startOver(next);
  for (const [k, v] of Object.entries(VIEWS)) v.hidden = k !== next;
  document.querySelectorAll('.nav a, .m-nav a').forEach((a) => {
    a.toggleAttribute('aria-current', a.dataset.v.split(' ').includes(next));
    if (a.hasAttribute('aria-current')) a.setAttribute('aria-current', 'page');
  });
  document.querySelectorAll('.nav-top').forEach((b) => b.classList.toggle('on', b.dataset.v.split(' ').includes(next)));
  moveInk(from === null);
  const root = VIEWS[next];
  if (!same) { root.style.animation = 'none'; void root.offsetWidth; root.style.animation = ''; }
  const behavior = same && !CALM ? 'smooth' : 'auto';
  let els;
  if (next === 'work') {
    /* back from a piece's page to its collection: the grid as it was left, that piece's tile in view (backTo) */
    const back = from === 'work' && lastWork === WORKS[idx].id && piece < 0 && fromPiece >= 0;
    renderWork(idx, piece); lastWork = WORKS[idx].id; lastPiece = piece;
    const tile = back && $(`#wk-imgs [data-n="${fromPiece}"]`);
    if (tile) { backTo(tile); els = [...pending(root), ...prime($('#wk-imgs'))]; } else { scrollTo(0, 0); els = prime(root); }
  } else if (next === 'tag') {
    /* back from one of its works: the page as it was left, that work's cover in view (backTo); another tag (from a
       work page's tags): a new page, from the top */
    const again = tag === tagNow;
    if (!again) renderTag(tag);
    layoutTag();
    const cover = again && from === 'work' && lastWork && document.getElementById('tc-' + lastWork);
    if (cover) { backTo(cover); els = pending(root); } else { scrollTo(0, 0); els = same ? pending(root) : prime(root); }
  } else if (next === 'item') {
    renderItem(idx); lastItem = GOODS[idx].slug; scrollTo(0, 0); els = prime(root);
  } else if (next === 'works') {
    /* #fanart / #original pick the category; back from a work page shows that work's category */
    const switched = setCat(cat || (anew ? 'fan' : from === 'work' && lastWork ? WORKS[byId[lastWork]].cat : wallCat));
    layoutWall();
    const cover = from === 'work' && lastWork && document.getElementById('c-' + lastWork);
    if (cover && !cover.hidden) { backTo(cover); els = pending(root); }
    else {
      scrollTo({ top: 0, behavior });
      els = !same ? prime(root) : switched ? [...pending(root), ...prime(wall), ...prime(nsfwBox)] : pending(root);   // a new category flies in
    }
  } else if (next === 'book') {
    renderBook(idx); lastBook = BOOKS[idx].slug; scrollTo(0, 0); els = prime(root);
  } else if (next === 'artbook') {
    if (!abBuilt) renderBooks();
    const card = from === 'book' && lastBook && document.getElementById('abc-' + lastBook);
    if (card) { backTo(card); els = pending(root); }
    else { scrollTo({ top: 0, behavior }); els = same ? pending(root) : prime(root); }
    abYearsUpdate();
  } else if (next === 'catalog') {
    /* back from one of its goods: the page as it was left, that goods' card in view (backTo) */
    const back = from === 'item' && lastItem && GOODS[bySlug[lastItem]].ev === catalog.ev;
    renderCatalog(catalog, !back);
    const card = back && document.getElementById('gc-' + lastItem);
    if (card) { backTo(card); els = pending(root); } else { scrollTo(0, 0); els = same ? pending(root) : prime(root); }
  } else if (next === 'goods') {
    if (!goodsHeadings.size) renderGoods();
    const card = from === 'catalog' ? catalogCards.get(currentCatalog.ev) : from === 'item' && lastItem && goodsList.querySelector('#gc-' + lastItem);
    if (card) { backTo(card); els = pending(root); }
    else { scrollTo({ top: 0, behavior }); els = same ? pending(root) : prime(root); }
  } else {
    scrollTo({ top: 0, behavior }); els = same ? pending(root) : prime(root);
  }
  if (next === 'goods') goodsYearsUpdate();
  view = next;
  syncViewText(true);
  document.dispatchEvent(new Event('portfolio-view'));
  evenIntros();
  if (next === 'about') preloadAbout();
  if (next === 'board') boardShow(h === 'board-admin');
  if (next === 'home') heroPick();
  heroPlay();   // the carousel moves on only while the home page is shown
  snsShow(next === 'home');   // and the corner buttons for the latest videos and posts are there
  watch(els);
  parallax();
  if (titleBox.has(next)) titleBox.get(next).prepend(backBtn);
  backBtn.hidden = !titleBox.has(next);
  backBtn.title = tr('nav.back');   // (its words, in case the language changed while it was out of the page)
  backBtn.setAttribute('aria-label', backBtn.title);
  backFit();
}

/* category switch: the curtain covers the page, the new page is put in place underneath, the curtain lifts */
const curtainEl = $('#curtain');
const CUR_NAME = { home: 'HOME', works: 'WORK', artbook: 'ART BOOK', goods: 'GOODS', event: 'EVENT', game: 'GAME', about: 'ABOUT', contact: 'CONTACT', board: 'BOARD' };
const TOP_VIEWS = new Set(['home', 'works', 'artbook', 'goods', 'event', 'game', 'about', 'contact', 'board']);
let curtainBusy = false;
function curtainTo(r) {
  curtainBusy = true;
  const shown = location.hash;   // the address this curtain is for
  const key = r.next;
  $('#curtain-t').replaceChildren(...[...CUR_NAME[key]].map((ch, i) => { const sp = el('span', '', ch === ' ' ? '\u00a0' : ch); sp.style.setProperty('--i', i); return sp; }));
  $('#curtain-s').textContent = tr('cur.' + key);
  curtainEl.classList.remove('cur-in', 'cur-out');
  curtainEl.hidden = false;
  void curtainEl.offsetWidth;
  curtainEl.classList.add('cur-in');   // not 'in': that name is the page's 1400px content container
  setTimeout(() => {
    apply(r);
    setTimeout(() => {
      curtainEl.classList.add('cur-out');
      setTimeout(() => {
        curtainEl.hidden = true;
        curtainEl.classList.remove('cur-in', 'cur-out');
        curtainBusy = false;
        if (location.hash !== shown) route();   // another tab was chosen while the curtain was up
      }, 260);
    }, 90);
  }, 200);
}
const navEl = $('.nav'), navInk = el('span', 'nav-ink');
navInk.setAttribute('aria-hidden', 'true');
navEl.appendChild(navInk);
navEl.classList.add('has-ink');
function moveInk(instant) {
  const a = navEl.querySelector('a[aria-current="page"]');
  if (!a) { navInk.style.opacity = '0'; return; }
  const g = a.closest('.nav-grp'), at = g ? g.querySelector('.nav-lbl') : a;   // a page of Work or About: under that name
  if (instant) navInk.style.transition = 'none';
  navInk.style.opacity = '1';
  navInk.style.width = `${at.offsetWidth}px`;
  navInk.style.transform = `translateX(${g ? g.offsetLeft + at.offsetLeft : a.offsetLeft}px)`;
  if (instant) { void navInk.offsetWidth; navInk.style.transition = ''; }
}
addEventListener('resize', () => moveInk(true));
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => moveInk(true));

/* ---------- the back button, at the top left of the page's title: the page before, as the browser's Back, while
   there is one in this visit (each page's place in the visit is kept in its history entry, so a reload keeps it too);
   arrived straight on a page (a shared link), the page above it instead, in its place (a work: its category on the
   wall; a collection's piece: the collection; a tag: the wall; an item: its catalog, or the goods; a catalog: the
   goods; an art book: the art books). Only on the pages inside a part ---------- */
const backBtn = el('button', 'back');
backBtn.type = 'button';
backBtn.dataset.i18nAria = backBtn.dataset.i18nTitle = 'nav.back';
backBtn.setAttribute('aria-label', tr('nav.back'));
backBtn.title = tr('nav.back');
backBtn.innerHTML = '<svg viewBox="0 0 30 24" aria-hidden="true"><path d="M8.5 2.5 3 7.5l5.5 5M3 7.5h23.5v15"/></svg>';
/* the pages inside a part have it (a work, a tag, an art book, the catalog, an item), not the parts the menu opens
   (the user asked): their title (first heading) in a box as wide as its words, and the one button moves into the shown
   page's */
const BACK_ON = ['work', 'tag', 'book', 'catalog', 'item'];
const titleBox = new Map();
for (const k of BACK_ON) {
  const t = VIEWS[k].querySelector('h1, h2'), box = el('div', 'ttl');
  t.before(box);
  box.append(t);
  titleBox.set(k, box);
}
/* the button keeps to where the title's words start: its first line's (a title that wraps, or that fills the line
   and shrinks to fit, is wider than its words); no room left of them (a long title on a phone): above them instead */
function backFit() {
  const box = backBtn.parentElement;
  if (!box || !box.offsetWidth) return;
  const words = document.createRange();
  words.selectNodeContents(box.querySelector('h1, h2'));
  const line = [...words.getClientRects()].find((r) => r.width), left = box.getBoundingClientRect().left;
  const x = line ? Math.max(0, line.left - left) : 0;
  box.style.setProperty('--back-x', `${x.toFixed(1)}px`);
  box.classList.toggle('tight', left + x < backBtn.offsetWidth + 24);   // (it sits that far left of the words)
}
addEventListener('resize', backFit);
if (window.ResizeObserver) new ResizeObserver(backFit).observe(document.body);
let visitAt = -1, goingUp = false;   // this page's place in the visit (0: the first)
function upFrom() {
  const r = parse();
  if (r.next === 'work') return r.piece >= 0 ? '#w-' + WORKS[r.idx].id : WORKS[r.idx].cat === 'original' ? '#original' : '#fanart';
  if (r.next === 'tag') return '#work';
  if (r.next === 'item') {
    const catalog = catalogByEvent.get(GOODS[r.idx].ev);
    return catalog ? '#g-' + catalogSlug(catalog) : '#goods';
  }
  if (r.next === 'catalog') return '#goods';
  if (r.next === 'book') return '#artbook';
  return '#home';   // (not reached: the button is only on the pages inside a part)
}
backBtn.addEventListener('click', () => {
  if (visitAt > 0) { history.back(); return; }
  goingUp = true;   // in place of this entry: going on pressing it climbs, and never back down
  location.replace(location.pathname + location.search + upFrom());
});

/* page change: cross-fade with the View Transitions API, and morph the clicked image into the next page */
function route() {
  if (curtainBusy) return;
  const st = history.state;
  if (shownAt !== null && shownAt !== location.hash) leftAt.set(shownAt, scrollY);   // the page being left
  const r = parse();
  /* a new entry has no place yet: one after the page before (going up: the same place) */
  visitAt = st && Number.isInteger(st.at) ? st.at : goingUp ? Math.max(0, visitAt) : visitAt + 1;
  goingUp = false;
  if (!history.state || history.state.at !== visitAt) history.replaceState({ ...(history.state || {}), at: visitAt }, '');
  shownAt = location.hash;   // (parse may have rewritten an old address)
  const from = view;
  if (from !== null && from !== r.next && !CALM && TOP_VIEWS.has(r.next) && !((from === 'work' || from === 'tag') && r.next === 'works') && !((from === 'item' || from === 'catalog') && r.next === 'goods') && !(from === 'book' && r.next === 'artbook')) { curtainTo(r); return; }
  /* inside a collection: between its grid and a piece's page, the picture morphs too */
  const hop = from === 'work' && r.next === 'work' && WORKS[r.idx].id === lastWork && (r.piece < 0) !== (lastPiece < 0);
  const fromPiece = lastPiece;
  if (from === null || (from === r.next && !hop) || !VT) { apply(r); return; }
  /* the picture a work page shares with its wall cover: the cover's picture in front (a collection's cover deals a
     random three, the last on top), and on the page its first one, or on a collection's page that same piece */
  const coverPic = (id, on = 'c') => [...document.querySelectorAll(`#${on}-${id} img`)].pop();   // on the wall, or a tag's page (tc)
  const pagePic = (id, on = 'c') => $(`#wk-imgs [data-n="${$(`#${on}-${id}`).dataset.n}"] img`) || $('#wk-imgs img');
  const pick = (fwd) => {
    if (hop) {
      const tile = $(`#wk-imgs [data-n="${r.piece < 0 ? fromPiece : r.piece}"] img`), big = $('#wk-imgs .pc-fig img');
      return r.piece >= 0 === fwd ? tile : big;   // to a piece: from its tile to its picture; back: the other way
    }
    if (from === 'works' && r.next === 'work') return fwd ? coverPic(WORKS[r.idx].id) : pagePic(WORKS[r.idx].id);
    if ((from === 'catalog' || from === 'goods') && r.next === 'item') return fwd ? document.querySelector(`#gc-${GOODS[r.idx].slug} img`) : itemPic();
    if (from === 'work' && r.next === 'works') return fwd ? pagePic(lastWork) : lastWork && coverPic(lastWork);
    if (from === 'tag' && r.next === 'work') return fwd ? coverPic(WORKS[r.idx].id, 'tc') : pagePic(WORKS[r.idx].id, 'tc');
    if (from === 'work' && r.next === 'tag') return fwd ? pagePic(lastWork, $('#tc-' + lastWork) ? 'tc' : 'c') : coverPic(lastWork, 'tc');   // (a tag's page not made yet: the wall's cover says which piece)
    if (from === 'item' && (r.next === 'catalog' || r.next === 'goods')) return fwd ? itemPic() : lastItem && document.querySelector(`#gc-${lastItem} img`);
    if (from === 'artbook' && r.next === 'book') return fwd ? document.querySelector(`#abc-${BOOKS[r.idx].slug} .b3`) : document.querySelector('#bk-cover .b3');
    if (from === 'book' && r.next === 'artbook') return fwd ? document.querySelector('#bk-cover .b3') : lastBook && document.querySelector(`#abc-${lastBook} .b3`);
    return null;
  };
  const named = [];
  const a = pick(true);
  if (onScreen(a)) { a.style.viewTransitionName = 'shared'; named.push(a); }
  const t = document.startViewTransition(async () => {
    apply(r);
    if (!named.length) return;
    named[0].style.viewTransitionName = '';
    const b = pick(false);
    if (onScreen(b)) {
      b.style.viewTransitionName = 'shared'; named.push(b); showNow(b);
      const ready = b.decode ? b.decode() : b3Load(b);   // a picture, or a 3D book
      try { await Promise.race([ready, sleep(450)]); } catch (_) { /* show it as is */ }
    }
  });
  t.ready.catch(() => {});   // a newer page change can cut this one short; that is fine
  t.finished.catch(() => {}).finally(() => {
    named.forEach((n) => { n.style.viewTransitionName = ''; });
    document.querySelectorAll('.rv-now').forEach((n) => n.classList.remove('rv-now'));
  });
}

/* ==================== js/about.js ==================== */
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

/* ==================== js/board.js ==================== */
/* Board (#board): visitors' posts, and the form to send one; the review page (#board-admin), where the site's owner
   accepts, answers or deletes them. The back end is worker/ (a Cloudflare Worker; tools/README.md: 留言板): a post
   waits there unseen until it is accepted. A visitor's picture is drawn again in their browser before it is sent, at
   most 4096 px on its long side (so a photo's hidden details, such as where it was taken, never leave it), with a small
   copy for the board; the owner's own pictures in a reply go as they are, with a small copy */
const BD_LOCAL = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);   // the local preview: the back end of `npm run dev`
const BD_API = BD_LOCAL ? 'http://127.0.0.1:8787' : 'https://board.mania8522191.workers.dev';
/* the spam check (Cloudflare Turnstile) is off while this is empty: no box, and a post goes without it. To turn it on
   again, make it BD_LOCAL ? '1x00000000000000000000AA' : '0x4AAAAAAGT-3-bQwD_zvJc5' (the widget "board"; locally
   Cloudflare's test key, which always passes), then set the back end's TURNSTILE_SECRET (tools/README.md: 留言板) */
const BD_TS_KEY = '';
const BD_PICS = 4, BD_SENT = 8 << 20, BD_OWN = 24 << 20, BD_SMALL = 1 << 20;   // what the back end takes
const BD_ERRS = new Set(['name', 'empty', 'long', 'pics', 'pic', 'big', 'human', 'wait', 'slow', 'full', 'net', 'password', 'auth', 'setup', 'gone']);
const bdForm = $('#bd-form'), bdPosts = $('#bd-posts'), bdRvPosts = $('#bd-rv-posts'), bdThumbsEl = $('#bd-thumbs'), bdDrop = $('#bd-drop');
const bdById = new Map();   // every post drawn, for its pictures' windows (js/lightbox.js: ZV_SETS.board)
let bdShown = [], bdRv = [], bdLoaded = 0, bdBusy = false, bdTs = null, bdTsToken = '', bdKeyNow = '', bdState = 'wait', bdKey = '';
try { bdKey = localStorage.getItem('bdKey') || ''; } catch (e) { /* no storage: the password each visit */ }
const bdPicked = [];   // the form's pictures: { url (to show it), ready (the copies to send) }

/* a line under a form: what happened, or what went wrong (in red) */
function bdSay(box, key, vars) {
  box.textContent = key ? tr(key, vars) : '';
  box.classList.toggle('err', !!key && key.startsWith('board.e.'));
}
const bdErr = (e) => 'board.e.' + (BD_ERRS.has(e && e.message) ? e.message : 'server');
const bdDate = (ms, time) => {
  const d = new Date(ms), p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}.${p(d.getMonth() + 1)}.${p(d.getDate())}${time ? ` ${p(d.getHours())}:${p(d.getMinutes())}` : ''}`;
};
async function bdCall(path, opt = {}) {
  const headers = { ...(opt.headers || {}) };
  if (path.startsWith('/admin/') && bdKey) headers.Authorization = 'Bearer ' + bdKey;
  let r;
  try { r = await fetch(BD_API + path, { ...opt, headers }); } catch (e) { throw new Error('net'); }
  const d = await r.json().catch(() => ({}));
  if (r.status === 401 && path !== '/admin/login') bdLogout();
  if (!r.ok) throw new Error(d.error || 'server');
  return d;
}
/* a form with pictures, saying how much of it has gone */
function bdSend(path, fd, progress) {
  return new Promise((ok, no) => {
    const x = new XMLHttpRequest();
    x.open('POST', BD_API + path);
    if (path.startsWith('/admin/')) x.setRequestHeader('Authorization', 'Bearer ' + bdKey);
    x.upload.addEventListener('progress', (e) => { if (e.lengthComputable) progress(Math.round((e.loaded / e.total) * 100)); });
    x.addEventListener('load', () => {
      let d = {};
      try { d = JSON.parse(x.responseText); } catch (e) { /* not an answer: an error */ }
      if (x.status === 401) bdLogout();
      if (x.status >= 200 && x.status < 300) ok(d); else no(new Error(d.error || 'server'));
    });
    x.addEventListener('error', () => no(new Error('net')));
    x.send(fd);
  });
}

/* ---------- a post ---------- */
const bdUrl = (q, size) => `${BD_API}/pic/${q.id}/${size}`;
function bdSrc(img, q, admin) {   // its small copy; the review page's come with the key (a waiting post's are not public)
  if (!admin) { img.src = bdUrl(q, 's'); return; }
  if (q.blob) { img.src = q.blob; return; }
  fetch(`${BD_API}/admin/pic/${q.id}/s`, { headers: { Authorization: 'Bearer ' + bdKey } })
    .then((r) => (r.ok ? r.blob() : Promise.reject(new Error('gone'))))
    .then((b) => { q.blob = URL.createObjectURL(b); img.src = q.blob; })
    .catch(() => { /* gone: the list shows it on its next load */ });
}
const bdOrder = (p) => [...p.pics.filter((q) => q.who === 'guest'), ...p.pics.filter((q) => q.who === 'reply')];
function bdItems(id) {   // a post's pictures in a window: the visitor's, then the reply's
  const p = bdById.get(id), list = p ? bdOrder(p) : [];
  return list.map((q, k) => ({
    src: q.blob || bdUrl(q, 's'), zsrc: q.blob ? null : bdUrl(q, 'o'), eager: true,
    w: q.sw, h: q.sh, zw: q.blob ? q.sw : q.w,
    no: `${k + 1} / ${list.length}`, cap: q.who === 'reply' ? `${tr('board.after')} · ${p.name}` : p.name,
    alt: `${p.name} · ${k + 1}`,
  }));
}
function bdOpen(id, at, from) { bdKeyNow = id; zvOpen('board', at, from); }
function bdPic(p, q, at, admin) {
  const b = el('button', 'bd-pic'), img = el('img');
  b.type = 'button';
  img.alt = `${p.name} · ${at + 1}`;
  img.width = q.sw;
  img.height = q.sh;
  img.loading = 'lazy';
  img.decoding = 'async';
  bdSrc(img, q, admin);
  b.append(img);
  b.addEventListener('click', () => bdOpen(p.id, at, img));
  if (!admin) return b;
  const box = el('div', 'bd-pw'), save = el('button', 'bd-orig', tr('board.orig'));   // the review page: save it as it was sent, to paint over it
  save.type = 'button';
  save.dataset.i18n = 'board.orig';
  save.addEventListener('click', () => bdSaveOrig(p, q, at));
  box.append(b, save);
  return box;
}
function bdRow(p, list, from, admin) {
  const row = el('div', 'bd-pics');
  row.dataset.n = list.length;
  list.forEach((q, k) => row.append(bdPic(p, q, from + k, admin)));
  return row;
}
/* the visitor's picture with the owner's paintover over it: drag across it (or press the arrow keys) to move the line */
function bdCompare(p, a, b, at, admin) {
  const fig = el('figure', 'bd-cmp'), pa = el('img', 'bd-a'), pb = el('img', 'bd-b');
  fig.style.aspectRatio = `${a.sw} / ${a.sh}`;
  fig.style.width = `min(100%, calc(min(72vh, 680px) * ${(a.sw / a.sh).toFixed(4)}))`;   // a tall one no taller than the screen
  bdSrc(pa, a, admin);
  bdSrc(pb, b, admin);
  const line = el('span', 'bd-line'), la = el('span', 'bd-la', tr('board.before')), lb = el('span', 'bd-lb', tr('board.after'));
  line.setAttribute('aria-hidden', 'true');
  line.innerHTML = '<i><svg viewBox="0 0 24 24"><path d="M9 7l-5 5 5 5M15 7l5 5-5 5"/></svg></i>';
  la.dataset.i18n = pa.dataset.i18nAlt = 'board.before';
  lb.dataset.i18n = pb.dataset.i18nAlt = 'board.after';
  pa.alt = la.textContent;
  pb.alt = lb.textContent;
  const range = el('input');
  Object.assign(range, { type: 'range', min: 0, max: 100, step: 1, value: 50 });
  range.dataset.i18nAria = 'board.cmp';
  range.setAttribute('aria-label', tr('board.cmp'));
  const zoom = el('button', 'bd-zoom');
  zoom.type = 'button';
  zoom.dataset.i18nAria = zoom.dataset.i18nTitle = 'board.zoom';
  zoom.title = tr('board.zoom');
  zoom.setAttribute('aria-label', zoom.title);
  zoom.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.5 3.5a7 7 0 1 0 0 14a7 7 0 1 0 0-14ZM15.5 15.5 20.5 20.5M10.5 7.5v6M7.5 10.5h6"/></svg>';
  zoom.addEventListener('click', () => bdOpen(p.id, at, pb));
  const put = (v) => { const x = Math.max(0, Math.min(100, v)); fig.style.setProperty('--x', `${x}%`); range.value = x; };
  const toward = (e) => { const r = fig.getBoundingClientRect(); put(((e.clientX - r.left) / r.width) * 100); };
  range.addEventListener('input', () => put(+range.value));
  fig.addEventListener('pointerdown', (e) => {
    if (e.button !== 0 || e.target.closest('.bd-zoom')) return;
    toward(e);
    fig.setPointerCapture(e.pointerId);
    fig.classList.add('drag');
  });
  fig.addEventListener('pointermove', (e) => { if (fig.hasPointerCapture(e.pointerId)) toward(e); });
  const end = () => fig.classList.remove('drag');
  fig.addEventListener('pointerup', end);
  fig.addEventListener('pointercancel', end);   // (a swipe up or down: the page scrolls)
  fig.append(pa, pb, line, la, lb, range, zoom);
  return fig;
}
function bdReplyBox(p, admin) {
  const guest = p.pics.filter((q) => q.who === 'guest'), mine = p.pics.filter((q) => q.who === 'reply');
  const box = el('div', 'bd-reply'), k = el('p', 'bd-rk'), who = el('span', '', tr('board.reply'));
  who.dataset.i18n = 'board.reply';
  k.append(who);
  if (p.reply_at) k.append(el('time', 'bd-date', bdDate(p.reply_at)));
  box.append(k);
  if (p.reply) box.append(el('p', 'bd-words', p.reply));
  const a = guest[0], b = mine[0];
  const pair = a && b && Math.abs(a.sw / a.sh - b.sw / b.sh) <= 0.04 * (a.sw / a.sh);   // the same picture painted over: one over the other
  if (pair) box.append(bdCompare(p, a, b, guest.length, admin));
  const rest = pair ? mine.slice(1) : mine;
  if (rest.length) box.append(bdRow(p, rest, guest.length + mine.length - rest.length, admin));
  return box;
}
function bdCard(p, admin) {
  bdById.set(p.id, p);
  const li = el('li', 'bd-post'), head = el('div', 'bd-head');
  head.append(el('span', 'bd-who', p.name), el('time', 'bd-date', bdDate(p.at, admin)));
  li.append(head);
  if (p.text) li.append(el('p', 'bd-words', p.text));
  const guest = p.pics.filter((q) => q.who === 'guest');
  if (guest.length) li.append(bdRow(p, guest, 0, admin));
  if (p.reply || p.pics.some((q) => q.who === 'reply')) li.append(bdReplyBox(p, admin));
  if (admin) li.append(...bdTools(p, li));
  return li;
}
function bdReveal(els) {   // new posts tween in as they scroll into view, as the rest of the page does (js/motion.js)
  if (!io) return;
  els.forEach((e) => { e.dataset.rv = 'up'; e.classList.add('rv-pre'); });
  watch(els);
}

/* ---------- the board ---------- */
async function bdLoad(more) {
  const last = more && bdShown[bdShown.length - 1], note = $('#bd-empty');
  try {
    const d = await bdCall('/posts' + (last ? `?before=${last.at}` : ''));
    if (!more) { bdShown = []; bdPosts.replaceChildren(); }
    bdShown.push(...d.posts);
    const cards = d.posts.map((p) => bdCard(p, false));
    bdPosts.append(...cards);
    bdReveal(cards);
    $('#bd-more').hidden = !d.more;
    note.dataset.i18n = 'board.empty';
    note.hidden = bdShown.length > 0;
    bdLoaded = Date.now();
  } catch (e) {
    note.dataset.i18n = bdErr(e);
    note.hidden = false;
  }
  note.textContent = tr(note.dataset.i18n);
}
$('#bd-more').addEventListener('click', () => bdLoad(true));
function boardShow(admin) {   // js/router.js: apply (#board-admin: the review page)
  $('#bd-grid').hidden = admin;
  $('#bd-admin').hidden = !admin;
  if (admin) { bdAdminView(); return; }
  bdTsLoad();
  if (Date.now() - bdLoaded > 60000) bdLoad(false);
}

/* the spam check (Cloudflare Turnstile), loaded the first time the board is opened */
function bdTsLoad() {
  if (bdTs || !BD_TS_KEY) return;
  bdTs = 'loading';
  window.bdTsReady = () => {
    bdTs = turnstile.render('#bd-ts', {
      sitekey: BD_TS_KEY, theme: 'dark', size: 'flexible', language: { zh: 'zh-tw', en: 'en', ja: 'ja' }[LANG],
      callback: (t) => { bdTsToken = t; },
      'expired-callback': () => { bdTsToken = ''; },
      'error-callback': () => { bdTsToken = ''; },
    });
  };
  const s = el('script');
  s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=bdTsReady';
  s.async = true;
  document.head.append(s);
}
function bdTsReset() {   // a token is good for one post
  bdTsToken = '';
  if (bdTs && bdTs !== 'loading' && window.turnstile) turnstile.reset(bdTs);
}
$('#bd-ts').hidden = !BD_TS_KEY;   // no room kept for a box that never comes

/* ---------- the form ---------- */
/* a picture drawn again, at most side px on its long side, as WebP (JPEG on white where the browser cannot write it),
   made smaller till it is under max bytes */
async function bdDraw(bmp, side, q, max) {
  let k = Math.min(1, side / Math.max(bmp.width, bmp.height));
  for (;;) {
    const w = Math.max(1, Math.round(bmp.width * k)), h = Math.max(1, Math.round(bmp.height * k)), c = el('canvas');
    c.width = w;
    c.height = h;
    const g = c.getContext('2d');
    g.drawImage(bmp, 0, 0, w, h);
    let blob = await new Promise((r) => c.toBlob(r, 'image/webp', q));
    if (!blob || blob.type !== 'image/webp') {
      g.globalCompositeOperation = 'destination-over';
      g.fillStyle = '#fff';
      g.fillRect(0, 0, w, h);
      blob = await new Promise((r) => c.toBlob(r, 'image/jpeg', q));
    }
    if (!blob) throw new Error('pic');
    if (blob.size <= max || k < 0.1) return { blob };
    if (q > 0.65) q -= 0.1; else k *= 0.8;
  }
}
async function bdPrep(file, max, own) {   // the two copies to send: as sent (o) and small (s)
  const bmp = await createImageBitmap(file);
  try {
    const s = await bdDraw(bmp, 1200, 0.85, BD_SMALL);
    const asIs = own && file.size <= max && /^image\/(jpeg|png|webp|gif)$/.test(file.type);   // the owner's own picture, untouched
    return { o: asIs ? { blob: file } : await bdDraw(bmp, own ? 1e5 : 4096, 0.92, max), s };
  } finally {
    bmp.close();
  }
}
function bdThumb(url, label, drop) {   // a picture picked, with its × to take it out
  const li = el('li'), img = el('img'), x = el('button', 'bd-x', '×');
  img.src = url;
  img.alt = '';
  x.type = 'button';
  x.dataset.i18nAria = 'board.remove';
  x.setAttribute('aria-label', label);
  x.addEventListener('click', drop);
  li.append(img, x);
  return li;
}
function bdThumbs() {
  bdThumbsEl.replaceChildren(...bdPicked.map((q) => bdThumb(q.url, tr('board.remove'), () => bdUnpick(q))));
  $('#bd-add').hidden = bdPicked.length >= BD_PICS;
}
function bdUnpick(q) {
  const i = bdPicked.indexOf(q);
  if (i < 0) return;
  bdPicked.splice(i, 1);
  URL.revokeObjectURL(q.url);
  bdThumbs();
}
function bdPick(files) {
  const st = $('#bd-status');
  for (const f of files) {
    if (!/^image\//.test(f.type)) continue;
    if (bdPicked.length >= BD_PICS) { bdSay(st, 'board.e.pics'); break; }
    const q = { url: URL.createObjectURL(f), ready: bdPrep(f, BD_SENT, false) };
    q.ready.catch(() => { bdUnpick(q); bdSay(st, 'board.e.pic'); });
    bdPicked.push(q);
  }
  bdThumbs();
}
const bdFile = $('#bd-file'), bdName = $('#bd-name');
$('#bd-add').addEventListener('click', () => bdFile.click());
bdFile.addEventListener('change', () => { bdPick([...bdFile.files]); bdFile.value = ''; });
bdForm.addEventListener('paste', (e) => {
  const files = [...(e.clipboardData ? e.clipboardData.files : [])];
  if (files.length) { e.preventDefault(); bdPick(files); }
});
/* a file dragged anywhere over the board: the picture box lights up, and dropped, it is added (never opened in place of the page) */
VIEWS.board.addEventListener('dragover', (e) => {
  if (!e.dataTransfer.types.includes('Files')) return;
  e.preventDefault();
  bdDrop.classList.toggle('over', !$('#bd-grid').hidden);
});
VIEWS.board.addEventListener('dragleave', (e) => { if (!VIEWS.board.contains(e.relatedTarget)) bdDrop.classList.remove('over'); });
VIEWS.board.addEventListener('drop', (e) => {
  if (!e.dataTransfer.types.includes('Files')) return;
  e.preventDefault();
  bdDrop.classList.remove('over');
  if (!$('#bd-grid').hidden) bdPick([...e.dataTransfer.files]);
});
try { bdName.value = localStorage.getItem('bdName') || ''; } catch (e) { /* not kept */ }
bdName.addEventListener('change', () => { try { localStorage.setItem('bdName', bdName.value.trim()); } catch (e) { /* not kept */ } });
[bdName, $('#bd-text')].forEach((f) => f.addEventListener('input', () => { if ($('#bd-status').classList.contains('err')) bdSay($('#bd-status'), ''); }));   // typing again: the error goes
bdForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (bdBusy) return;
  const st = $('#bd-status'), send = $('#bd-send'), name = bdName.value.trim(), text = $('#bd-text').value.trim();
  if (!name) { bdSay(st, 'board.e.name'); bdName.focus(); return; }
  if (!text && !bdPicked.length) { bdSay(st, 'board.e.empty'); return; }
  if (BD_TS_KEY && !bdTsToken) { bdSay(st, 'board.e.wait'); return; }
  bdBusy = true;
  send.disabled = true;
  bdSay(st, 'board.sending', { p: 0 });
  try {
    const fd = new FormData();
    fd.append('name', name);
    fd.append('text', text);
    fd.append('lang', LANG);
    fd.append('ts', bdTsToken);
    (await Promise.all(bdPicked.map((q) => q.ready))).forEach((m, n) => { fd.append('o' + n, m.o.blob, 'o' + n); fd.append('s' + n, m.s.blob, 's' + n); });
    await bdSend('/posts', fd, (p) => bdSay(st, 'board.sending', { p }));
    $('#bd-text').value = '';
    bdPicked.splice(0).forEach((q) => URL.revokeObjectURL(q.url));
    bdThumbs();
    bdSay(st, 'board.sent');
  } catch (err) {
    bdSay(st, bdErr(err));
  } finally {
    bdBusy = false;
    send.disabled = false;
    bdTsReset();
  }
});

/* ---------- the review page ---------- */
function bdLogout() {
  bdKey = '';
  try { localStorage.removeItem('bdKey'); } catch (e) { /* nothing kept */ }
  bdAdminView();
}
function bdAdminView() {   // the password, or the posts
  $('#bd-login').hidden = !!bdKey;
  $('#bd-review').hidden = !bdKey;
  if (bdKey) bdReview(false);
}
$('#bd-login').addEventListener('submit', async (e) => {
  e.preventDefault();
  const st = $('#bd-login-st'), pw = $('#bd-pw');
  bdSay(st, '');
  try {
    const d = await bdCall('/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: pw.value }) });
    bdKey = d.token;
    try { localStorage.setItem('bdKey', bdKey); } catch (err) { /* kept for this visit only */ }
    pw.value = '';
    bdAdminView();
  } catch (err) {
    bdSay(st, bdErr(err));
  }
});
$('#bd-logout').addEventListener('click', bdLogout);
const bdTabs = document.querySelectorAll('.bd-tabs [role="tab"]');
bdTabs.forEach((t) => t.addEventListener('click', () => {
  bdState = t.dataset.state;
  bdTabs.forEach((x) => x.setAttribute('aria-selected', String(x === t)));
  bdReview(false);
}));
async function bdReview(more) {
  const st = $('#bd-rv-st'), last = more && bdRv[bdRv.length - 1];
  try {
    const d = await bdCall(`/admin/posts?state=${bdState}${last ? `&before=${last.at}` : ''}`);
    if (!more) {
      bdRv.forEach((p) => p.pics.forEach((q) => { if (q.blob) URL.revokeObjectURL(q.blob); }));
      bdRv = [];
      bdRvPosts.replaceChildren();
    }
    bdRv.push(...d.posts);
    bdRvPosts.append(...d.posts.map((p) => bdCard(p, true)));
    $('#bd-wait-n').textContent = d.wait;
    $('#bd-rv-more').hidden = !d.more;
    $('#bd-rv-empty').hidden = bdRv.length > 0;
    bdSay(st, '');
  } catch (err) {
    bdSay(st, bdErr(err));
  }
}
$('#bd-rv-more').addEventListener('click', () => bdReview(true));
function bdBtn(key, cls, fn) {
  const b = el('button', 'btn' + (cls ? ' ' + cls : ''), tr(key));
  b.type = 'button';
  b.dataset.i18n = key;
  b.addEventListener('click', fn);
  return b;
}
function bdGone(p, li) {   // accepted or deleted: off this list (and the board loads again when it is next opened)
  li.remove();
  bdRv = bdRv.filter((x) => x !== p);
  if (bdState === 'wait') $('#bd-wait-n').textContent = Math.max(0, +$('#bd-wait-n').textContent - 1);
  $('#bd-rv-empty').hidden = bdRv.length > 0;
  bdLoaded = 0;
}
function bdTools(p, li) {   // accept, delete, and the reply
  const bar = el('div', 'bd-tools'), st = el('p', 'bd-status');
  st.setAttribute('role', 'status');
  if (bdState === 'wait') {
    bar.append(bdBtn('board.accept', '', async () => {
      try { await bdCall(`/admin/posts/${p.id}/accept`, { method: 'POST' }); bdGone(p, li); } catch (e) { bdSay(st, bdErr(e)); }
    }));
  }
  bar.append(bdBtn('board.delete', 'ghost', async () => {
    if (!confirm(tr('board.sure'))) return;
    try { await bdCall(`/admin/posts/${p.id}`, { method: 'DELETE' }); bdGone(p, li); } catch (e) { bdSay(st, bdErr(e)); }
  }));
  return [bar, bdEditor(p), st];
}
/* the owner's reply: words, and pictures (a paintover first: it goes over the visitor's first picture, to compare) */
function bdEditor(p) {
  const box = el('details', 'bd-edit'), sum = el('summary', '', tr('board.replyEdit')), inside = el('div', 'bd-edit-in');
  sum.dataset.i18n = 'board.replyEdit';
  const ta = el('textarea'), thumbs = el('ul', 'bd-thumbs'), file = el('input'), add = el('button', 'bd-add'), st = el('p', 'bd-status');
  ta.rows = 4;
  ta.maxLength = 4000;
  ta.value = p.reply || '';
  ta.dataset.i18nAria = 'board.replyEdit';
  ta.setAttribute('aria-label', tr('board.replyEdit'));
  Object.assign(file, { type: 'file', accept: 'image/*', multiple: true, hidden: true });
  add.type = 'button';
  const addT = el('span', '', tr('board.addPic'));
  addT.dataset.i18n = 'board.addPic';
  add.append(el('span', '', '＋'), addT);
  const drop = new Set(), fresh = [], mine = p.pics.filter((q) => q.who === 'reply');
  const draw = () => {
    thumbs.replaceChildren(
      ...mine.map((q) => {
        const li = bdThumb('', tr('board.remove'), () => { if (!drop.delete(q.id)) drop.add(q.id); draw(); });
        bdSrc(li.querySelector('img'), q, true);
        li.classList.toggle('off', drop.has(q.id));
        return li;
      }),
      ...fresh.map((q) => {
        const li = bdThumb(q.url, tr('board.remove'), () => { fresh.splice(fresh.indexOf(q), 1); URL.revokeObjectURL(q.url); draw(); });
        li.classList.add('new');
        return li;
      }),
    );
    add.hidden = mine.length - drop.size + fresh.length >= BD_PICS;
  };
  add.addEventListener('click', () => file.click());
  file.addEventListener('change', () => {
    for (const f of file.files) {
      if (!/^image\//.test(f.type) || mine.length - drop.size + fresh.length >= BD_PICS) continue;
      const q = { url: URL.createObjectURL(f), ready: bdPrep(f, BD_OWN, true) };
      q.ready.catch(() => { fresh.splice(fresh.indexOf(q), 1); draw(); bdSay(st, 'board.e.pic'); });
      fresh.push(q);
    }
    file.value = '';
    draw();
  });
  const save = bdBtn('board.save', '', async () => {
    save.disabled = true;
    try {
      const fd = new FormData();
      fd.append('text', ta.value.trim());
      fd.append('drop', [...drop].join(','));
      (await Promise.all(fresh.map((q) => q.ready))).forEach((m, n) => { fd.append('o' + n, m.o.blob, 'o' + n); fd.append('s' + n, m.s.blob, 's' + n); });
      await bdSend(`/admin/posts/${p.id}/reply`, fd, (pc) => bdSay(st, 'board.sending', { p: pc }));
      bdSay(st, 'board.saved');
      bdLoaded = 0;
      setTimeout(() => bdReview(false), 700);   // the post again, with its reply as the board shows it
    } catch (e) {
      bdSay(st, bdErr(e));
    } finally {
      save.disabled = false;
    }
  });
  draw();
  inside.append(ta, thumbs, add, file, save, st);
  box.append(sum, inside);
  return box;
}
async function bdSaveOrig(p, q, at) {   // a picture as it was sent, saved (to paint over it)
  try {
    const r = await fetch(`${BD_API}/admin/pic/${q.id}/o`, { headers: { Authorization: 'Bearer ' + bdKey } });
    if (!r.ok) throw new Error('gone');
    const b = await r.blob(), a = el('a');
    a.href = URL.createObjectURL(b);
    a.download = `${p.name}-${at + 1}.${(b.type.split('/')[1] || 'jpg').replace('jpeg', 'jpg')}`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 10000);
  } catch (e) { /* gone: the list shows it on its next load */ }
}

/* ==================== js/lang-switch.js ==================== */
const subVars = (e) => (e.id === 'works-sub' ? catVars() : e.id === 'ab-sub' ? abVars() : e.id === 'tag-sub' ? tagVars() : { n: WORKS.length });
/* a link with a logo in front (the footer's .sns) keeps the logo: only the text after it changes, so the link
   stays one piece of text and the language tween fades the logo with its name */
function setText(e, s) {
  const t = e.lastChild;
  if (e.firstElementChild && t && t.nodeType === 3) t.data = s;
  else e.textContent = s;
}
/* the texts marked in the page, or in a part of it made later (a picture window: js/lightbox.js) */
const textAttributes = '[data-i18n], [data-i18n-aria], [data-i18n-alt], [data-i18n-title]';
function translateElement(e) {
  const { i18n, i18nAria, i18nAlt, i18nTitle } = e.dataset;
  if (i18n) setText(e, tr(i18n, subVars(e)));
  if (i18nAria) e.setAttribute('aria-label', tr(i18nAria));
  if (i18nAlt) e.alt = tr(i18nAlt);
  if (i18nTitle) e.title = tr(i18nTitle);
}
function textsIn(root) {
  if (root.matches(textAttributes)) translateElement(root);
  root.querySelectorAll(textAttributes).forEach(translateElement);
}
function applyStatic() {
  for (const root of document.body.children) {
    if (root.tagName !== 'MAIN') textsIn(root);
  }
  document.querySelectorAll('.lang button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === LANG)));
}

/* Hidden pages catch up the first time they are shown in this language. Detail pages already fill
   their dynamic text in the router when a different work, product, or book is opened. */
const translatedViews = new Set();
function syncViewText(entering = false) {
  if (!view || translatedViews.has(view)) return;
  const root = VIEWS[view];
  textsIn(root);
  switch (view) {
    case 'home': heroText(); heroEventText(); ytText(); xText(); break;
    case 'event': eventText(); break;
    case 'about': paintAbout(); break;
    case 'game': gameText(); break;
    case 'works':
      catText(); sortText(); yearText();
      wall.querySelectorAll('.cover').forEach((a) => fillCover(a, WORKS[byId[a.id.slice(2)]]));
      layoutWall();
      break;
    case 'tag': tagText(); layoutTag(); break;
    case 'artbook': abText(); break;
    case 'goods':
    case 'catalog':
      if (view === 'goods') goodsText();
      else if (!entering) catalogText();
      root.querySelectorAll('.g-card').forEach((a) => fillGoodsCard(a, GOODS[bySlug[a.id.slice(3)]]));
      break;
    case 'work': if (!entering) workText(byId[lastWork], lastPiece); break;
    case 'book': if (!entering) bookText(byBook[lastBook]); break;
    case 'item': if (!entering) itemText(bySlug[lastItem]); break;
  }
  translatedViews.add(view);
}
/* section intros reserve the height their longest language needs at this width, so switching language
   does not move everything below them */
const FONT_BY_LANG = { zh: '"Figtree","Noto Sans TC","PingFang TC","Microsoft JhengHei",system-ui,sans-serif', en: '"Figtree","Noto Sans JP","Hiragino Kaku Gothic ProN","Yu Gothic",system-ui,sans-serif' };
FONT_BY_LANG.ja = FONT_BY_LANG.en;
function evenIntros() {
  document.querySelectorAll('.sec-sub[data-i18n], .chars-sub[data-i18n]').forEach((node) => {
    if (!node.offsetWidth) return;   // in a hidden view: measured when that view is shown
    const probe = node.cloneNode(false);
    probe.removeAttribute('data-i18n'); probe.removeAttribute('id'); probe.removeAttribute('data-rv');
    probe.className = node.className.replace(/\brv-\S+/g, '');
    probe.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;left:0;top:0;width:${node.getBoundingClientRect().width}px;min-height:0;margin:0;transform:none;transition:none`;
    node.parentElement.appendChild(probe);
    let most = 0;
    const vars = subVars(node);
    for (const l of Object.keys(I18N)) {
      probe.style.fontFamily = FONT_BY_LANG[l] || '';
      probe.textContent = (I18N[l][node.dataset.i18n] || '').replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
      most = Math.max(most, probe.getBoundingClientRect().height);
    }
    probe.remove();
    node.style.minHeight = `${Math.ceil(most)}px`;
  });
}
let evenTimer = 0;
addEventListener('resize', () => { clearTimeout(evenTimer); evenTimer = setTimeout(evenIntros, 150); });
if (document.fonts && document.fonts.ready) document.fonts.ready.then(evenIntros);

/* language switch tween: the words on screen blur out, the new language waves in from top to bottom;
   pictures stay put, but the logo rings on Contact move with the names beside them. Text off screen just switches. */
const TX_SKIP = '.site-head, .m-nav, .curtain, script, style, svg, [hidden]';
const TX_ALSO = '.sns-badge';
function textOnScreen() {
  const roots = [VIEWS[view], $('.site-foot'), $('#sns-dock')].filter((r) => r && !r.hidden), picked = [];   // and the open corner window
  const mark = new Set();
  for (const root of roots) {
    const tw = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, { acceptNode: (n) => (n.matches(TX_SKIP) && !n.matches(TX_ALSO) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT) });
    for (let n = tw.nextNode(); n; n = tw.nextNode()) {
      if (!n.matches(TX_ALSO) && ![...n.childNodes].some((c) => c.nodeType === 3 && c.textContent.trim())) continue;
      let inside = false;
      for (let a = n.parentElement; a && a !== root; a = a.parentElement) if (mark.has(a)) { inside = true; break; }
      if (inside) continue;
      const r = n.getBoundingClientRect();
      if (!r.width || r.bottom < 0 || r.top > innerHeight) continue;
      mark.add(n); picked.push(n);
    }
  }
  return picked;
}
const EASE_OUT = 'cubic-bezier(.16,1,.3,1)';
function textOut(n) {
  return [n.animate([{ opacity: 0, filter: 'blur(4px)' }], { duration: 180, easing: 'ease-in', fill: 'forwards' }),
    n.animate([{ transform: 'translateY(-.35em)' }], { duration: 180, easing: 'ease-in', fill: 'forwards', composite: 'add' })];
}
function textIn(n) {
  const top = n.getBoundingClientRect().top;
  const delay = Math.round(Math.min(1, Math.max(0, top / innerHeight)) * 220);   // a wave from the top of the screen down
  n.animate([{ opacity: 0, filter: 'blur(4px)', offset: 0 }], { duration: 560, delay, easing: EASE_OUT, fill: 'backwards' });
  n.animate([{ transform: 'translateY(.45em)', offset: 0 }], { duration: 680, delay, easing: EASE_OUT, fill: 'backwards', composite: 'add' });
}
let langNext = null;
function setLang(l) {
  if (!I18N[l] || (l === LANG && langNext === null)) return;
  document.querySelectorAll('.lang button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === l)));
  if (CALM || !Element.prototype.animate) { swapLang(l); return; }
  if (langNext !== null) { langNext = l; return; }
  langNext = l;
  const outs = textOnScreen().flatMap(textOut);
  setTimeout(() => {
    swapLang(langNext);
    langNext = null;
    outs.forEach((a) => a.cancel());
    textOnScreen().forEach(textIn);
  }, 190);
}
function swapLang(l) {
  if (!I18N[l] || l === LANG) return;
  LANG = l;
  try { localStorage.setItem('lang', l); } catch (e) { /* private mode: still switches for this visit */ }
  document.documentElement.lang = HTML_LANG[l];
  if (/[?&]lang=/.test(location.search)) {
    try { history.replaceState(history.state, '', location.pathname + location.search.replace(/([?&]lang=)(zh|en|ja)/, '$1' + l) + location.hash); } catch (e) { /* keep the address as is */ }
  }
  translatedViews.clear();
  applyStatic();
  syncViewText();
  zvLang();
  sndText();
  document.dispatchEvent(new Event('portfolio-language'));
  backFit();   // the back button keeps to the title's words in the new language
}

/* ==================== js/sound.js ==================== */
/* Sound: background music, switched on and off by the button beside the languages, and a soft click on every button
   and link. The music starts off (a browser only lets a page make sound once the visitor has touched it); the click
   plays whether the music is on or off. Volumes are set here: the music file is loud, so it plays well under it. */
const BGM_SRC = 'audio/bgm.mp3', CLICK_SRC = 'audio/click.mp3';
const BGM_VOL = 0.35, CLICK_VOL = 0.7;
const sndBtns = document.querySelectorAll('.snd');
let actx = null, clickBuf = null, bgm = null, bgmGain = null, bgmOn = false, bgmRest = 0;

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

function sndClick() {
  const c = sndWake();
  if (!c || !clickBuf) return;
  const s = c.createBufferSource(), g = c.createGain();
  g.gain.value = CLICK_VOL;
  s.buffer = clickBuf.buf;
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
  bgmSync();
}
function bgmSync() {
  if (bgmOn || bgm) bgmPlay(bgmOn && !document.hidden && !ytPlaying.size);
}

/* the buttons' tooltip, again after a language change (their spoken name comes from data-i18n-aria) */
function sndText() {
  sndBtns.forEach((b) => { b.title = tr('snd.label'); });
}
sndText();

sndBtns.forEach((b) => b.addEventListener('click', () => bgmSet(!bgmOn)));
addEventListener('pointerdown', sndWake, { capture: true, passive: true });
addEventListener('keydown', sndWake, true);
document.addEventListener('click', (e) => {
  if (!(e.target instanceof Element)) return;
  if (e.target.closest('a[href], button, [role="button"]')) sndClick();
}, true);
document.addEventListener('visibilitychange', bgmSync);

/* ==================== js/../features/ff47-list/main.js ==================== */
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

/* ==================== js/main.js ==================== */
/* Start-up: language buttons, routing, no saving the artwork, arrow keys */
document.addEventListener('click', (e) => { const b = e.target.closest('.lang button'); if (b) setLang(b.dataset.lang); });
applyStatic();
setTimeout(() => document.documentElement.classList.remove('intro'), 3400);
addEventListener('hashchange', route);
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (a && a.getAttribute('href') === location.hash) { e.preventDefault(); route(); }
});
/* the artwork can't be saved from the right-click (or long-press) menu, or dragged out of the page;
   a picture under an overlay counts too: the titles on the wall, the NSFW labels, the play buttons, the lightbox, the 3D books */
const ART = 'img, .frame, .nsfw-pic, .tl-card, .zv-stage, .b3';
const onArt = (t) => t instanceof Element && !!t.closest(ART);
document.addEventListener('contextmenu', (e) => { if (onArt(e.target)) e.preventDefault(); });
document.addEventListener('dragstart', (e) => {
  const t = e.target;
  if (onArt(t) || (t instanceof Element && t.querySelector('img'))) e.preventDefault();   // a link around a picture
});
addEventListener('keydown', (e) => {
  if (zvInWin(e) || (view !== 'work' && view !== 'item' && view !== 'book') || e.altKey || e.metaKey || e.ctrlKey) return;
  const k = view === 'work' ? 'wk' : view === 'book' ? 'bk' : 'it';
  if (e.key === 'ArrowRight') location.hash = $(`#${k}-next`).getAttribute('href');
  if (e.key === 'ArrowLeft') location.hash = $(`#${k}-prev`).getAttribute('href');
});
route();
