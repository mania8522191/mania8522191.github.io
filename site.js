/* Built by tools/build.py from js/*.js in this order: data, core, i18n, game, lightbox, menu, goods, wall, work, artbook, book3d, motion, home, router, about, lang-switch, sound, main. Edit those files, not this one. */

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
  {"id":"148499079","t":"台湾FF47お品書き","ym":"","d":"2026-08-16","lab":"Fancy Frontier 47","tags":["バーチャルYouTuber","星街すいせい","さくらみこ","宝鐘マリン","一伊那尓栖","仲町あられ"],"dims":[[1200,1200,1500,1500],[1200,1200,1500,1500],[1200,1200,1500,1500],[1200,1200,1500,1500],[1200,1200,1500,1500],[1200,1200,1500,1500],[1200,1200,1500,1500],[1200,1200,1500,1500],[1200,1200,1500,1500],[1200,1200,1500,1500]],"pos":"50% 35%","cat":"fan"},
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
  {"id":"88261414","t":"❤","ym":"","d":"2021-03-06","lab":"hololive","tags":["ホロライブ","バーチャルYouTuber","星街すいせい","制服"],"dims":[[900,1200,1500,2000]],"pos":"50% 35%","cat":"fan"},
  {"id":"87418759","t":"❤","ym":"","d":"2021-01-30","lab":"hololive","tags":["ホロライブ","バーチャルYouTuber","星街すいせい","VTuber","ほしまちぎゃらりー","マイク"],"dims":[[900,1200,1800,2400]],"pos":"50% 35%","cat":"fan"},
  {"id":"87254319","t":"❤","ym":"","d":"2021-01-23","lab":"hololive","tags":["ホロライブ","バーチャルYouTuber","星街すいせい","魅惑のふともも"],"dims":[[900,1200,1800,2400]],"pos":"50% 35%","cat":"fan"},
  {"id":"87098130","t":"❤","ym":"","d":"2021-01-16","lab":"hololive","tags":["ホロライブ","バーチャルYouTuber","星街すいせい","私服","メイド","VTuber","黒スト"],"dims":[[1200,750,2400,1500]],"pos":"50% 35%","cat":"fan"},
  {"id":"86771770","t":"❤","ym":"","d":"2021-01-02","lab":"hololive","tags":["ホロライブ","バーチャルYouTuber","星街すいせい","私服","VTuber","着物"],"dims":[[1200,750,2400,1500]],"pos":"50% 35%","cat":"fan"},
  {"id":"86560442","t":"❤","ym":"","d":"2020-12-26","lab":"hololive","tags":["ホロライブ","バーチャルYouTuber","星街すいせい","VTuber","黒スト","私服","hololive"],"dims":[[1200,750,2400,1500]],"pos":"50% 35%","cat":"fan"},
  {"id":"86397683","t":"❤","ym":"","d":"2020-12-19","lab":"hololive","tags":["ホロライブ","バーチャルYouTuber","星街すいせい","ほしまちぎゃらりー","VTuber","黒スト","hololive"],"dims":[[1200,750,2400,1500]],"pos":"50% 35%","cat":"fan"},
  {"id":"86259443","t":"❤","ym":"","d":"2020-12-12","lab":"hololive","tags":["ホロライブ","バーチャルYouTuber","星街すいせい","VTuber","私服","hololive"],"dims":[[750,1200,1500,2400]],"pos":"50% 35%","cat":"fan"},
  {"id":"85812772","t":"星街すいせい","ym":"","d":"2020-11-21","lab":"hololive","tags":["ホロライブ","バーチャルYouTuber","星街すいせい","カラータイツ","VTuber","hololive"],"dims":[[750,1200,1500,2400]],"pos":"50% 35%","cat":"fan"},
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

const GOODS = [
  {"slug":"set-b","name":{"zh":"新刊套組 B","en":"New Release Set B","ja":"新刊セットB"},"eyebrow":{"zh":"2026 新刊","en":"2026 New Release","ja":"2026 新刊"},"price":600,"was":800,"meta":{"zh":"新刊套組 A ＋ 壓克力畫板 2 款 ＋ 吊飾 ＋ 紙袋","en":"Set A + 2 acrylic boards + keychain + paper bag","ja":"新刊セットA＋アクリルパネル2種＋キーホルダー＋紙袋"},"list_title":"contents","items":{"zh":["新刊套組 A（fanart book、明信片組、紙袋）","miComet「シュガーラッシュ」「Lollipop」壓克力畫板 15 × 10 cm","星街すいせい「ビビデバ」壓克力畫板 15 × 10 cm","星街すいせい「星をみる少女」壓克力吊飾 6 cm","紙袋（新款，擇一）27 × 20 cm"],"en":["New Release Set A (fan art book, postcard set, paper bag)","miComet「シュガーラッシュ」「Lollipop」 acrylic board, 15 × 10 cm","星街すいせい「ビビデバ」 acrylic board, 15 × 10 cm","星街すいせい「星をみる少女」 acrylic keychain, 6 cm","Paper bag (new design, choose one), 27 × 20 cm"],"ja":["新刊セットA（ファンアートブック・ポストカードセット・紙袋）","miComet「シュガーラッシュ」「Lollipop」アクリルパネル 15×10cm","星街すいせい「ビビデバ」アクリルパネル 15×10cm","星街すいせい「星をみる少女」アクリルキーホルダー 6cm","紙袋（新デザイン・1種選択）27×20cm"]},"note":{"zh":"購買新刊套組 B，彩印簽繪板可再折 NT$50。","en":"With Set B, printed shikishi boards are NT$50 off.","ja":"新刊セットBと同時購入で、カラー色紙がNT$50引き。"},"works":["147595537","142549210","148313240"],"dims":[1215,810]},
  {"slug":"set-a","name":{"zh":"新刊套組 A","en":"New Release Set A","ja":"新刊セットA"},"eyebrow":{"zh":"2026 新刊","en":"2026 New Release","ja":"2026 新刊"},"price":100,"meta":{"zh":"fanart book ＋ 明信片組 ＋ 紙袋","en":"Fan art book + postcard set + paper bag","ja":"ファンアートブック＋ポストカードセット＋紙袋"},"list_title":"contents","items":{"zh":["202602–202608 mania8522191 fanart book（A5 橫式、全彩、12 頁）","明信片組（冰白珠光紙）","紙袋（舊款，擇一）"],"en":["202602–202608 mania8522191 fan art book (A5 landscape, full color, 12 pages)","Postcard set (ice-white pearl paper)","Paper bag (previous design, choose one)"],"ja":["202602–202608 mania8522191 ファンアートブック（A5横・フルカラー・12P）","ポストカードセット（アイスホワイトパール紙）","紙袋（旧デザイン・1種選択）"]},"works":[],"dims":[1215,810]},
  {"slug":"anosoyo","name":{"zh":"あのそよ套組","en":"AnoSoyo Set","ja":"あのそよセット"},"eyebrow":"BanG Dream!","price":400,"was":500,"meta":{"zh":"彩印簽繪板 ＋ 壓克力畫板 ＋ 紙袋","en":"Printed shikishi + acrylic board + paper bag","ja":"カラー色紙＋アクリルパネル＋紙袋"},"list_title":"contents","items":{"zh":["あのそよ「ブレンドの香る窓辺で」彩印簽繪板 21 × 15 cm","あのそよ「ブレンドの香る窓辺で」壓克力畫板 15 × 10 cm","あのそよ「ブレンドの香る窓辺で」紙袋 27 × 20 cm"],"en":["あのそよ「ブレンドの香る窓辺で」 printed shikishi, 21 × 15 cm","あのそよ「ブレンドの香る窓辺で」 acrylic board, 15 × 10 cm","あのそよ「ブレンドの香る窓辺で」 paper bag, 27 × 20 cm"],"ja":["あのそよ「ブレンドの香る窓辺で」カラー色紙 21×15cm","あのそよ「ブレンドの香る窓辺で」アクリルパネル 15×10cm","あのそよ「ブレンドの香る窓辺で」紙袋 27×20cm"]},"works":["148068024"],"dims":[1305,870]},
  {"slug":"stand","name":{"zh":"「起点‧終点」壓克力飯友套組","en":"「起点‧終点」 Mini Acrylic Stand Set","ja":"「起点‧終点」ミニアクリルスタンドセット"},"eyebrow":"星街すいせい","price":500,"was":600,"meta":{"zh":"高 6 cm・厚 8 mm・炫彩雙面印刷","en":"6 cm tall · 8 mm thick · holographic, double-sided print","ja":"高さ6cm・厚さ8mm・オーロラ両面印刷"},"size":{"zh":"高 6 cm、厚 8 mm","en":"6 cm tall, 8 mm thick","ja":"高さ6cm・厚さ8mm"},"spec":{"zh":"炫彩、雙面印刷","en":"Holographic, double-sided print","ja":"オーロラ・両面印刷"},"works":["140064972"],"dims":[1396,930]},
  {"slug":"playmat","name":{"zh":"「Chatter Chatter」桌遊滑鼠墊","en":"「Chatter Chatter」 Playmat","ja":"「Chatter Chatter」プレイマット"},"eyebrow":"星街すいせい × 宝鐘マリン","price":600,"meta":"70 × 40 cm","size":"70 × 40 cm","note":{"zh":"比舊款長 10 cm。","en":"10 cm longer than the previous version.","ja":"旧版より10cm長くなりました。"},"works":["146954644"],"dims":[1290,860]},
  {"slug":"acrylic-board","name":{"zh":"壓克力畫板","en":"Acrylic Board","ja":"アクリルパネル"},"eyebrow":"miComet・星街すいせい・あのそよ","price":300,"unit":true,"meta":{"zh":"15 × 10 cm・3 款","en":"15 × 10 cm · 3 designs","ja":"15×10cm・全3種"},"size":"15 × 10 cm","list_title":"designs","items":["miComet「シュガーラッシュ」「Lollipop」","星街すいせい「ビビデバ」","あのそよ「ブレンドの香る窓辺で」"],"works":["147595537","142549210","148068024"],"dims":[1350,900]},
  {"slug":"sign-board","name":{"zh":"彩印簽繪板","en":"Printed Shikishi Board","ja":"カラー色紙"},"eyebrow":"星街すいせい・miComet・あのそよ","price":150,"unit":true,"meta":{"zh":"21 × 15 cm・4 款","en":"21 × 15 cm · 4 designs","ja":"21×15cm・全4種"},"size":"21 × 15 cm","list_title":"designs","items":["星街すいせい × 宝鐘マリン「Chatter Chatter」","miComet「シュガーラッシュ」「Lollipop」","星街すいせい「ビビデバ」","あのそよ「ブレンドの香る窓辺で」"],"note":{"zh":"購買新刊套組 B，可再折 NT$50。","en":"NT$50 off with New Release Set B.","ja":"新刊セットBと同時購入でNT$50引き。"},"works":["146954644","147595537","142549210","148068024"],"dims":[1350,900]},
  {"slug":"keychain","name":{"zh":"壓克力吊飾","en":"Acrylic Keychain","ja":"アクリルキーホルダー"},"eyebrow":"星街すいせい・一伊那尓栖・仲町あられ","price":100,"unit":true,"meta":{"zh":"6 cm・3 款","en":"6 cm · 3 designs","ja":"6cm・全3種"},"size":"6 cm","list_title":"designs","items":["星街すいせい「星をみる少女」","厨二イナちゃん","仲町あられ"],"works":["148313240"],"dims":[1170,780]},
  {"slug":"kikan","name":{"zh":"既刊大禮包","en":"Back Catalog Bundle","ja":"既刊セット"},"eyebrow":{"zh":"既刊","en":"Back Catalog","ja":"既刊"},"price":700,"meta":{"zh":"既刊、資料夾、明信片組、吊飾等","en":"Back issues, clear files, postcards, keychains and more","ja":"既刊・クリアファイル・ポストカード・キーホルダーなど"},"list_title":"contents","items":{"zh":["既刊、資料夾、明信片組、吊飾⋯等","壓克力畫板（擇一）","紙袋（擇一）"],"en":["Back issues, clear files, postcard sets, keychains and more","Acrylic board (choose one)","Paper bag (choose one)"],"ja":["既刊・クリアファイル・ポストカードセット・キーホルダーなど","アクリルパネル（1種選択）","紙袋（1種選択）"]},"works":[],"dims":[1395,930]}
];

/* art books, newest first: pages[0] is the cover spread, then inside pages in order; blur = pages shown only blurred */
const BOOKS = [
  {"slug":"ff47","mat":"gloss","ev":"FF47","t":"202602- 202608 mania8522191 ART BOOK 01","size":"a5land","pp":12,"print":"color","ym":"2026.08","pages":[[1400,493,5787,2039],[1400,493,5787,2039],[1400,493,5787,2039]]},
  {"slug":"ff46","mat":"ivory","ev":"FF46","t":"202505- 202602 HOSHIMACHI SUISEI ROUGH BOOK","size":"a5land","pp":12,"print":"color","ym":"2026.02","pages":[[1400,493,5788,2039],[1400,493,5788,2039],[1400,493,5788,2039]]},
  {"slug":"ff45","mat":"ivory","tk":0.027,"rtl":true,"ev":"FF45","t":"mania8522191 Original R18 Manga Project ROUGH BOOK 01","size":"a4sq","pp":40,"print":"mono","ym":"2025.08","pages":[[1400,700,5787,2894],[1400,700],[1400,700]],"blur":[1,2]},
  {"slug":"ff44","mat":"ivory","tk":0.027,"ev":"FF44","t":"MIRA93 vol.5","size":"a4sq","pp":36,"print":"color","ym":"2025.02","pages":[[1400,700,5787,2894],[1400,700,5787,2893],[1400,700,5787,2893]]},
  {"slug":"ff43","mat":"ivory","foil":"blue","ev":"FF43","t":"MIRA93 vol.3.5","size":"a4sq","pp":20,"print":"color","ym":"2024.08","pages":[[1400,700,5787,2894],[1400,700,5787,2894],[1400,700,5787,2894]]},
  {"slug":"ff42","mat":"ivory","ev":"FF42","t":"MIRA93 vol.3","size":"a4sq","pp":20,"print":"color","ym":"2024.02","pages":[[1400,700,5787,2894],[1400,700,5787,2894],[1400,700,5787,2894]]},
  {"slug":"ff41","mat":"ivory","ev":"FF41","t":"MIRA93 vol.2","size":"a4sq","pp":20,"print":"color","ym":"2023.08","pages":[[1400,700,5787,2894],[1400,700,5787,2894],[1400,700,5787,2894]]},
  {"slug":"ff40","mat":"ivory","ev":"FF40","t":"MIRA93 vol.1","size":"a4sq","pp":20,"print":"color","ym":"2023.02","pages":[[1400,700,5787,2894],[1400,700,5787,2894],[1400,700,5787,2894]]},
  {"slug":"ff38","mat":"matte","ev":"FF38","t":"Fimmel: Comet2","size":"b5","pp":28,"print":"color","ym":"2022.02","pages":[[1400,988,5018,3541],[1400,988,5015,3540],[1400,988,5015,3540]]},
  {"slug":"ff37","mat":"ivory","ev":"FF37","t":"Fimmel: Comet","size":"b5","pp":20,"print":"color","ym":"2021.08","pages":[[1400,988,5018,3541],[1400,988,5015,3540],[1400,988,5015,3540]]}
];

const SHOP = 'https://www.myacg.com.tw/seller_market.php?seller=217467';

/* ==================== js/core.js ==================== */
/* Shared helpers: lookups, DOM shortcuts, the page views, cssUrl */
const byId = Object.fromEntries(WORKS.map((w, i) => [w.id, i]));
const CAT_LIST = { fan: WORKS.filter((w) => w.cat === 'fan'), original: WORKS.filter((w) => w.cat === 'original') };   // Fan Art (pixiv fan works) / Original Art, newest first
const bySlug = Object.fromEntries(GOODS.map((g, i) => [g.slug, i]));
const byBook = Object.fromEntries(BOOKS.map((b, i) => [b.slug, i]));
const $ = (s) => document.querySelector(s);
const dot = (d) => d.replaceAll('-', '.');
const src = (id, n) => `img/${id}${n ? '_p' + n : ''}.webp`;
const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
const VIEWS = { home: $('#v-home'), works: $('#v-works'), work: $('#v-work'), goods: $('#v-goods'), item: $('#v-item'), artbook: $('#v-artbook'), book: $('#v-book'), game: $('#v-game'), about: $('#v-about'), contact: $('#v-contact') };

/* a url() for a CSS custom property, made absolute so it points at the same file whichever stylesheet uses it */
const cssUrl = (path) => `url("${new URL(path, location.href).href}")`;

/* ==================== js/i18n.js ==================== */
/* Translations (zh / en / ja) and the helpers that pick the text in the current language */
/* ---------- languages: zh (Traditional Chinese), en, ja ---------- */
const I18N = {
  "zh": {
    "nav.main": "主選單",
    "home.featured": "精選作品",
    "home.dots": "切換作品",
    "home.dot": "第 {n} 張：{t}",
    "snd.label": "背景音樂",
    "works.sub": "{a} — {b} · {n} 件作品 · 點選封面看完整作品",
    "cover.pages": "{n} 張",
    "cover.video": "▶ 過程影片",
    "wk.posted": "{d} 發表",
    "wk.pages": "{n} 張",
    "wk.pixiv": "在 pixiv 查看 ↗",
    "wk.tlJump": "▶ 製作過程影片",
    "wk.imgAlt": "{t}（第 {n} 張，共 {m} 張）",
    "wk.madeGoods": "這張插畫做成了周邊：",
    "wk.goodsLink": "看周邊詳細介紹 →",
    "wk.others": "其他作品",
    "list.sep": "、",
    "tl.h": "製作過程影片",
    "tl.yt": "在 YouTube 觀看 ↗",
    "tl.play": "在 YouTube 播放：{t}",
    "goods.sub": "Fancy Frontier 47（2026.08.21–22・花博爭豔館・攤位 J44）推出的周邊。標示為場次價格，郵購的現貨與售價以買動漫賣場為準。",
    "goods.shopName": "買動漫賣場「Mania Art」",
    "goods.shopBtn": "前往賣場 ↗",
    "item.buy": "到買動漫賣場購買 ↗",
    "item.menu": "看 FF47 完整品書",
    "item.used": "使用插畫",
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
    "event": "Fancy Frontier 47・2026.08.21–22・花博爭豔館 J44",
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
    "shot4": "卡牌詳情：數值、技能與效果說明",
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
    "grp.social": "社群",
    "grp.works": "作品",
    "grp.shop": "周邊",
    "grp.mail": "信箱",
    "h.fbPage": "mania8522191・粉絲專頁",
    "h.discord": "加入伺服器",
    "h.shop": "賣場 217467",
    "ch.baha": "巴哈姆特",
    "ch.myacg": "買動漫",
    "foot.nav": "社群與作品平台",
    "foot.fbPage": "Facebook（粉專）",
    "foot.fbPersonal": "Facebook（個人）",
    "foot.baha": "巴哈姆特",
    "foot.myacg": "買動漫",
    "foot.copy": "© 2019–2026 mania8522191 · 作品版權所有",
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
    "home.featured": "Featured works",
    "home.dots": "Choose a work",
    "home.dot": "Slide {n}: {t}",
    "snd.label": "Background music",
    "works.sub": "{a} — {b} · {n} works · Click a cover to see the full piece",
    "cover.pages": "{n} images",
    "cover.video": "▶ Timelapse",
    "wk.posted": "Posted {d}",
    "wk.pages": "{n} images",
    "wk.pixiv": "View on pixiv ↗",
    "wk.tlJump": "▶ Process timelapse",
    "wk.imgAlt": "{t} (image {n} of {m})",
    "wk.madeGoods": "Made into goods: ",
    "wk.goodsLink": "See the goods →",
    "wk.others": "Other works",
    "list.sep": ", ",
    "tl.h": "Process timelapse",
    "tl.yt": "Watch on YouTube ↗",
    "tl.play": "Play on YouTube: {t}",
    "goods.sub": "Goods released at Fancy Frontier 47 (Aug 21–22, 2026 · Taipei Expo Dome · booth J44). Prices shown are event prices; for mail order, stock and prices follow the MyACG shop.",
    "goods.shopName": "MyACG shop “Mania Art”",
    "goods.shopBtn": "Visit the shop ↗",
    "item.buy": "Buy at the MyACG shop ↗",
    "item.menu": "Full FF47 catalog",
    "item.used": "Artwork used",
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
    "event": "Fancy Frontier 47 · Aug 21–22, 2026 · Taipei Expo Dome, booth J44",
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
    "grp.social": "Social",
    "grp.works": "Portfolio",
    "grp.shop": "Goods",
    "grp.mail": "Email",
    "h.fbPage": "mania8522191 · Page",
    "h.discord": "Join the server",
    "h.shop": "Shop 217467",
    "ch.baha": "Bahamut",
    "ch.myacg": "MyACG",
    "foot.nav": "Social and portfolio links",
    "foot.fbPage": "Facebook (Page)",
    "foot.fbPersonal": "Facebook (Personal)",
    "foot.baha": "Bahamut",
    "foot.myacg": "MyACG",
    "foot.copy": "© 2019–2026 mania8522191 · All rights reserved",
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
    "home.featured": "ピックアップ作品",
    "home.dots": "作品を切り替える",
    "home.dot": "{n}枚目：{t}",
    "snd.label": "BGM",
    "works.sub": "{a} — {b} · 全{n}作品 · 表紙をクリックすると作品ページを開きます",
    "cover.pages": "{n}枚",
    "cover.video": "▶ メイキング",
    "wk.posted": "{d} 投稿",
    "wk.pages": "{n}枚",
    "wk.pixiv": "pixivで見る ↗",
    "wk.tlJump": "▶ メイキング動画",
    "wk.imgAlt": "{t}（{m}枚中{n}枚目）",
    "wk.madeGoods": "グッズ化：",
    "wk.goodsLink": "グッズ紹介を見る →",
    "wk.others": "ほかの作品",
    "list.sep": "、",
    "tl.h": "メイキング動画",
    "tl.yt": "YouTubeで見る ↗",
    "tl.play": "YouTubeで再生：{t}",
    "goods.sub": "Fancy Frontier 47（2026.08.21–22・花博争艶館・スペース J44）で頒布したグッズです。表示はイベント頒布価格です。通販の在庫・価格は買動漫（MyACG）ショップでご確認ください。",
    "goods.shopName": "買動漫（MyACG）ショップ「Mania Art」",
    "goods.shopBtn": "ショップへ ↗",
    "item.buy": "買動漫ショップで購入 ↗",
    "item.menu": "FF47 お品書きを見る",
    "item.used": "使用イラスト",
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
    "event": "Fancy Frontier 47・2026.08.21–22・花博争艶館 J44",
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
    "grp.social": "SNS",
    "grp.works": "作品",
    "grp.shop": "グッズ",
    "grp.mail": "メール",
    "h.fbPage": "mania8522191・ページ",
    "h.discord": "サーバーに参加",
    "h.shop": "ショップ 217467",
    "ch.baha": "巴哈姆特（バハムート）",
    "ch.myacg": "買動漫（MyACG）",
    "foot.nav": "SNS・作品リンク",
    "foot.fbPage": "Facebook（ページ）",
    "foot.fbPersonal": "Facebook（個人）",
    "foot.baha": "巴哈姆特",
    "foot.myacg": "買動漫",
    "foot.copy": "© 2019–2026 mania8522191 · 無断転載禁止",
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
function showShot(i, animate = true) {
  shotAt = (i + SHOTS.length) % SHOTS.length;
  shotImg.src = `img/shot${shotAt + 1}.webp`;
  shotImg.alt = tr(SHOTS[shotAt]);
  $('#shot-no').textContent = `${no2(shotAt + 1)} / ${no2(SHOTS.length)}`;
  $('#shot-cap').textContent = tr(SHOTS[shotAt]);
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
const ZV_SETS = {   // what a window steps through; made again in another language
  proc: (id) => {   // a work's process animations; the full-size one, where there is one, on zoom
    const w = WORKS[byId[id]], list = w.proc || [];
    return list.map(([f, W, H, ZW, ZH], n) => ({
      src: `img/proc/${f}`, zsrc: ZW ? `img/proc/z/${f}` : null, eager: true,
      w: W, h: H, zw: ZW || W,
      no: `${n + 1} / ${list.length}`, cap: `${w.t} · ${tr('proc.h')}`,
      alt: tr('proc.alt', { t: w.t }),
    }));
  },
  work: (id) => {
    const w = WORKS[byId[id]];
    return w.dims.map(([W, H, ZW, ZH], n) => ({
      src: src(w.id, n), zsrc: ZW ? src(w.id, n).replace('img/', 'img/z/') : null,
      w: W, h: H, zw: ZW || W,
      no: `${n + 1} / ${w.dims.length}`, cap: w.t,
      alt: w.dims.length > 1 ? tr('zv.workAlt', { t: w.t, n: n + 1 }) : w.t,
    }));
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
  if (w.kind === 'shots') showShot(w.at, false);
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
  const key = kind === 'work' || kind === 'proc' ? lastWork : kind === 'book' ? lastBook : '';
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
  if (im) zvOpen('work', [...$('#wk-imgs').children].indexOf(im), im);
});
$('#wk-proc-box').addEventListener('click', (e) => {
  const im = e.target.closest('img');
  if (im) zvOpen('proc', [...$('#wk-proc-box').querySelectorAll('img')].indexOf(im), im);
});

/* ==================== js/menu.js ==================== */
/* Phone menu */
/* ---------- phone menu ---------- */
const menuBtn = $('#menu-btn');
function setMenu(open) {
  document.documentElement.classList.toggle('menu-open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.querySelector('.menu-lbl').textContent = open ? 'CLOSE' : 'MENU';
}
menuBtn.addEventListener('click', () => setMenu(!document.documentElement.classList.contains('menu-open')));
$('#m-nav').addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
matchMedia('(min-width: 901px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

/* ==================== js/goods.js ==================== */
/* Goods: prices, the goods list, goods item pages */
/* price: [original struck] NT$x [/ 款] [場次價] */
function price(g, label) {
  const p = el('span', 'price');
  if (g.was) p.appendChild(el('s', '', `NT$${g.was}`));
  p.appendChild(document.createTextNode(`NT$${g.price}`));
  if (g.unit) p.appendChild(el('small', '', tr('price.per')));
  if (label) p.appendChild(el('small', '', tr('price.event')));
  return p;
}

/* ---------- goods list ---------- */
const ggrid = $('#g-grid');
GOODS.forEach((g, i) => {
  const a = el('a', 'g-card');
  a.href = '#g-' + g.slug;
  a.id = 'gc-' + g.slug;
  a.dataset.rv = 'clip';
  a.dataset.d = `${(i % 3) * 0.1}s`;
  const box = el('span', 'g-img mask');
  const img = el('img');
  img.src = `img/goods-${g.slug}.webp`; img.width = g.dims[0]; img.height = g.dims[1];
  img.alt = ''; img.loading = i < 3 ? 'eager' : 'lazy'; img.decoding = 'async';
  box.appendChild(img);
  a.append(box, el('span', 'g-name'), el('span', 'g-meta'), el('span', 'price'));
  fillGoodsCard(a, g);
  ggrid.appendChild(a);
});
function fillGoodsCard(a, g) {
  a.querySelector('.g-name').textContent = L(g.name);
  a.querySelector('.g-meta').textContent = L(g.meta);
  a.querySelector('.price').replaceWith(price(g, false));
}

/* ---------- goods item page ---------- */
function renderItem(i) {
  const g = GOODS[i];
  $('#it-lab').textContent = L(g.eyebrow);
  $('#it-title').textContent = L(g.name);
  $('#it-price').replaceChildren(...price(g, true).childNodes);
  const img = $('#it-img');
  img.src = `img/goods-${g.slug}.webp`; img.width = g.dims[0]; img.height = g.dims[1];
  img.alt = tr('item.imgAlt', { t: L(g.name) });

  const rows = [];
  if (g.size) rows.push([tr('spec.size'), L(g.size)]);
  if (g.spec) rows.push([tr('spec.spec'), L(g.spec)]);
  if (g.items) rows.push([tr('spec.' + g.list_title), L(g.items)]);
  if (g.note) rows.push([tr('spec.offer'), L(g.note)]);
  rows.push([tr('spec.debut'), tr('event')]);
  $('#it-spec').replaceChildren(...rows.map(([k, v], n) => {
    const d = el('div');
    d.dataset.rv = 'up';
    d.dataset.d = `${n * 0.07}s`;
    const dd = el('dd');
    if (Array.isArray(v)) { const ol = el('ol'); v.forEach((t) => ol.appendChild(el('li', '', t))); dd.appendChild(ol); }
    else dd.textContent = v;
    d.append(el('dt', '', k), dd);
    return d;
  }));

  $('#it-works-box').hidden = !g.works.length;
  $('#it-works').replaceChildren(...g.works.filter((id) => id in byId).map((id, n) => {
    const w = WORKS[byId[id]];
    const a = el('a'); a.href = '#w-' + id;
    a.dataset.rv = 'up'; a.dataset.d = `${n * 0.1}s`;
    const im = el('img'); im.src = src(id, 0); im.alt = ''; im.loading = 'lazy'; im.style.objectPosition = w.pos;
    a.append(im, el('span', '', w.t));
    return a;
  }));

  const p = GOODS[(i - 1 + GOODS.length) % GOODS.length];
  const nx = GOODS[(i + 1) % GOODS.length];
  $('#it-prev').href = '#g-' + p.slug; $('#it-prev-t').textContent = L(p.name);
  $('#it-next').href = '#g-' + nx.slug; $('#it-next-t').textContent = L(nx.name);
}

/* ==================== js/wall.js ==================== */
/* Works wall: categories, year headers and bar, sort menu, the cover layout */
/* ---------- cover wall: masonry; wide works span two columns so every cover shows its art at a similar
   scale, tall ones keep one full column, nothing is cropped, and later covers fill any hole ---------- */
const wall = $('#wall');
WORKS.forEach((w, i) => {
  const [W, H] = w.dims[0];
  const r = W / H;

  const a = document.createElement('a');
  a.className = 'cover';
  a.id = 'c-' + w.id;
  a.href = '#w-' + w.id;
  a.dataset.rv = 'fly';
  a.dataset.d = `${(Math.random() * 0.22).toFixed(2)}s`;
  a.dataset.r = r.toFixed(4);
  a.dataset.date = w.d;
  a.dataset.cat = w.cat;
  a.style.cssText = `--ar:${r.toFixed(4)};--pos:${w.pos}`;
  {   // a different direction for every cover, and every visit
    const ang = Math.random() * Math.PI * 2, dist = (150 + Math.random() * 150) * (innerWidth < 700 ? 0.55 : 1);
    a.style.setProperty('--fx', `${Math.round(Math.cos(ang) * dist)}px`);
    a.style.setProperty('--fy', `${Math.round(Math.sin(ang) * dist)}px`);
    a.style.setProperty('--fr', `${(Math.random() * 24 - 12).toFixed(1)}deg`);
  }
  a.innerHTML = `<span class="frame mask"><img src="${src(w.id, 0)}" width="${W}" height="${H}" alt="" loading="${i < 4 ? 'eager' : 'lazy'}" decoding="async"><span class="ov" aria-hidden="true"><span class="ov-t"></span><span class="ov-m"></span></span></span><span class="cap" aria-hidden="true"><span class="cap-t"></span><span class="cap-m"></span></span>`;
  a.querySelector('.ov-t').textContent = w.t;
  a.querySelector('.cap-t').textContent = w.t;
  fillCover(a, w);
  wall.appendChild(a);
});
function fillCover(a, w) {
  const meta = `${dot(w.d.slice(0, 7))}${w.dims.length > 1 ? ' · ' + tr('cover.pages', { n: w.dims.length }) : ''}${w.yt ? ' · ' + tr('cover.video') : ''}`;
  a.setAttribute('aria-label', `${w.t} (${dot(w.d)})`);
  a.querySelector('.ov-m').textContent = meta;
  a.querySelector('.cap-m').textContent = meta;
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
const allCovers = [...wall.querySelectorAll('.cover')].sort((a, b) => b.dataset.date.localeCompare(a.dataset.date) || b.id.localeCompare(a.id));
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
  const list = CAT_LIST[wallCat] || CAT_LIST.fan, ys = list.map((w) => w.d.slice(0, 4)).sort();
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
/* units in date order: a wide work alone; a single-column work beside the next single-column one of the same year.
   When that one is far taller or shorter, the closest in height among the next few takes its place, so a long work
   is not left beside a short one; if even that is far shorter, the works after it stack under the short one */
function buildUnits() {
  const items = wallOrder.map((el) => ({ el, r: +el.dataset.r, y: el.dataset.date.slice(0, 4) }));
  const units = [], used = new Set();
  const fits = (c, y) => c.y === y && c.r < 1.4;   // single-column, same year
  for (let k = 0; k < items.length; k++) {
    if (used.has(k)) continue;
    const a = items[k];
    if (a.r >= 1.4) { units.push({ a }); continue; }
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
  const rand = seeded(WALL_SEED);
  wallUnits = wallUnits || buildUnits();
  const W = wall.clientWidth;
  const lanes = W >= 680 ? 2 : 1;
  const gap = W >= 1000 ? 26 : W >= 600 ? 18 : 12;
  const laneW = (W - (lanes - 1) * gap) / lanes;
  const colW = (laneW - gap) / 2;
  const touch = matchMedia('(hover: none)').matches;
  const plan = wallUnits.map((u) => {
    const p = { u, wa: u.pair ? colW * (0.9 + rand() * 0.1) : laneW * (0.86 + rand() * 0.14) };
    if (u.b) p.wb = colW * (0.9 + rand() * 0.1);
    p.ex = u.sa || u.sb || [];
    p.we = p.ex.map(() => colW * (0.9 + rand() * 0.1));
    u.a.el.style.width = `${Math.round(p.wa)}px`;
    if (u.b) u.b.el.style.width = `${Math.round(p.wb)}px`;
    p.ex.forEach((c, i) => { c.el.style.width = `${Math.round(p.we[i])}px`; });
    return p;
  });
  const h = new Map(wallOrder.map((el) => [el, el.offsetHeight]));   // one layout pass for every cover
  const laneH = new Array(lanes).fill(0);
  const tilt = () => (rand() < 0.5 ? (rand() - 0.5) * 2 : 0);
  const fresh = new Array(lanes).fill(true);   // nothing placed in this lane since the last year header
  const perYear = new Map();
  plan.forEach((p) => { const y = p.u.a.el.dataset.date.slice(0, 4); perYear.set(y, (perYear.get(y) || 0) + 1); });
  let z = 1, curYear = '';
  plan.forEach((p, k) => {
    const yr = p.u.a.el.dataset.date.slice(0, 4);
    if (yr !== curYear) {
      curYear = yr;
      const hd = yearHead.get(yr);
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
    const lone = lanes === 2 && perYear.get(yr) === 1;   // the only unit of its year: centre it rather than leave a lane empty
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
  wall.style.height = `${Math.ceil(Math.max(...laneH))}px`;
  yearNow = '';
  yearsUpdate();
}
let wallRaf = 0;
addEventListener('resize', () => { cancelAnimationFrame(wallRaf); wallRaf = requestAnimationFrame(layoutWall); });
if (document.fonts) document.fonts.ready.then(layoutWall);

/* ==================== js/work.js ==================== */
/* Work page */
/* ---------- single work page ---------- */
function renderWork(i) {
  const w = WORKS[i];
  $('#wk-lab').textContent = w.lab;
  $('#wk-title').textContent = w.t;
  $('#wk-ym').textContent = w.ym;
  $('#wk-ym').hidden = !w.ym;
  $('#wk-link').href = 'https://www.pixiv.net/artworks/' + w.id;
  $('#wk-link-li').hidden = w.cat !== 'fan' || !/^\d+$/.test(w.id);   // the original pieces, and fan pieces not posted there (f-…), are not on pixiv

  const tags = $('#wk-tags');
  tags.replaceChildren(...w.tags.map((t) => { const li = document.createElement('li'); li.textContent = '#' + t; return li; }));

  const box = $('#wk-imgs');
  box.replaceChildren(...w.dims.map(([W, H], n) => {
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
    if (window.SELF_HOSTED) {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const f = el('iframe');
        f.src = `https://www.youtube-nocookie.com/embed/${w.yt.id}?autoplay=1&rel=0`;
        f.title = w.yt.t;
        f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        f.allowFullscreen = true;
        card.replaceWith(f);
      });
    }
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

  /* previous / next stay inside Fan Art or Original Art and follow the wall's order */
  const list = wallSort === 'old' ? [...CAT_LIST[w.cat]].reverse() : CAT_LIST[w.cat], k = list.indexOf(w);
  const p = list[(k - 1 + list.length) % list.length];
  const nx = list[(k + 1) % list.length];
  $('#wk-prev').href = '#w-' + p.id; $('#wk-prev-t').textContent = p.t;
  $('#wk-next').href = '#w-' + nx.id; $('#wk-next-t').textContent = nx.t;
  workText(i);
}
/* the words on a work page; also run on a language switch so the images and the video player stay put */
function workText(i) {
  const w = WORKS[i];
  $('#wk-date').textContent = tr(w.cat === 'original' ? 'wk.made' : 'wk.posted', { d: dot(w.d) });
  $('#wk-pages').textContent = pagesText(w.dims.length);
  $('#wk-imgs').querySelectorAll('img').forEach((img, n) => {
    img.alt = w.dims.length > 1 ? tr('wk.imgAlt', { t: w.t, n: n + 1, m: w.dims.length }) : w.t;
  });
  /* cross-link: goods made from this piece, or the goods page for the catalog itself */
  const gl = $('#wk-goods');
  const made = GOODS.filter((g) => g.works.includes(w.id));
  gl.replaceChildren();
  if (w.id === '148499079') {
    const a = el('a', '', tr('wk.goodsLink')); a.href = '#goods'; gl.append(a);
  } else if (made.length) {
    gl.append(document.createTextNode(tr('wk.madeGoods')));
    made.forEach((g, k) => {
      if (k) gl.append(document.createTextNode(tr('list.sep')));
      const a = el('a', '', L(g.name)); a.href = '#g-' + g.slug; gl.append(a);
    });
  }
  gl.hidden = !gl.childNodes.length;

  const procs = $('#wk-proc-box').querySelectorAll('img');
  procs.forEach((im, n) => { im.alt = tr('proc.alt', { t: w.t }) + (procs.length > 1 ? ` (${n + 1}/${procs.length})` : ''); });
  const card = $('#wk-tl-box .tl-card');
  if (card) card.setAttribute('aria-label', tr('tl.play', { t: w.yt.t }));
}

/* ==================== js/artbook.js ==================== */
/* Art books: the list and the book page */
/* ---------- art books: one per Fancy Frontier, on a timeline with a year bar and sort menu like the works wall ---------- */
const NSFW_URL = 'https://drive.google.com/drive/folders/13iLkmzd5KRhpaBNY8aJSam84H7y5rGQI?usp=sharing';
const abList = $('#ab-list'), abYearsIn = $('#ab-years-in'), abYearsBar = $('#ab-years'), abYearsProg = $('#ab-years-prog');
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
abYearsIn.addEventListener('click', (e) => {
  const b = e.target.closest('button');
  if (!b) return;
  const top = abHead.get(b.dataset.y).getBoundingClientRect().top + scrollY - $('.site-head').offsetHeight - abYearsBar.offsetHeight - 14;
  scrollTo({ top, behavior: CALM ? 'auto' : 'smooth' });
});
/* the year in view lights up in the bar and the gold line shows how far down the list you are */
let abRaf = 0;
function abYearsUpdate() {
  abRaf = 0;
  if (VIEWS.artbook.hidden) return;
  const line = abYearsBar.getBoundingClientRect().bottom + 48;
  let cur = '';
  for (const [y, hd] of abHead) { if (cur && hd.getBoundingClientRect().top > line) break; cur = y; }
  abYearsIn.querySelectorAll('button').forEach((b) => {
    const on = String(b.dataset.y === cur);
    if (b.getAttribute('aria-current') === on) return;
    b.setAttribute('aria-current', on);
    if (on === 'true' && abYearsIn.scrollWidth > abYearsIn.clientWidth) abYearsIn.scrollTo({ left: b.offsetLeft - (abYearsIn.clientWidth - b.offsetWidth) / 2, behavior: CALM ? 'auto' : 'smooth' });
  });
  const r = abList.getBoundingClientRect();
  abYearsProg.style.transform = `scaleX(${Math.min(1, Math.max(0, (line - r.top) / r.height)).toFixed(4)})`;
}
addEventListener('scroll', () => { if (!abRaf) abRaf = requestAnimationFrame(abYearsUpdate); }, { passive: true });

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
  $('#bk-ev').textContent = `Fancy Frontier ${b.ev.slice(2)}`;
  $('#bk-pages').textContent = pagesText(b.pages.length);
  const spec = (k, v) => { const d = el('div'); d.append(el('dt', '', tr('bk.spec.' + k)), el('dd', '', v)); return d; };
  $('#bk-spec').replaceChildren(   // size, pages, printing from the book's 品書; the cover paper is its material
    spec('size', tr('bk.size.' + b.size)),
    spec('pages', tr('bk.pp', { n: b.pp })),
    spec('print', tr('bk.print.' + b.print)),
    spec('cover', tr('bk.mat.' + (b.mat || 'gloss')) + (b.foil ? tr('bk.foil.' + b.foil) : '')),
  );
  $('#bk-spec').setAttribute('aria-label', tr('bk.spec'));
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
document.querySelectorAll('.channels').forEach((ul) => ul.querySelectorAll('li').forEach((li, i) => { li.dataset.rv = 'x'; li.dataset.d = (i * 0.07) + 's'; }));
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

/* hero parallax: the art drifts slower than the page, the name lifts and fades */
const hero = $('.hero'), heroMedia = $('.hero-media'), heroTxt = $('.hero-txt');
let rafId = 0;
function parallax() {
  rafId = 0;
  if (view !== 'home') return;
  const y = Math.max(0, scrollY), h = hero.offsetHeight;
  if (y > h + 60) return;
  heroMedia.style.transform = `translate3d(0,${(y * 0.35).toFixed(1)}px,0)`;
  heroTxt.style.transform = `translate3d(0,${(y * 0.18).toFixed(1)}px,0)`;
  heroTxt.style.opacity = Math.max(0, 1 - y / (h * 0.8)).toFixed(3);
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
  if (s.turn) {   // a box as tall as the screen is wide, turned around its centre
    const t = el('div', 'hero-turn');
    t.style.setProperty('--turn', `${s.turn}deg`);
    t.append(s.img);
    s.box.classList.add('turned');
    s.box.append(t);
  } else s.box.append(s.img);
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
  s.img.srcset = zw ? `${page} ${w}w, ${page.replace('img/', 'img/z/')} ${zw}w` : `${page} ${w}w`;
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
  heroLoad(SLIDES[(i + 1) % SLIDES.length]);   // the next one, in the background
  s.box.classList.add('on');
  SLIDES.forEach((x, k) => x.dot.setAttribute('aria-current', String(k === i)));
  heroCap.href = '#w-' + s.w.id;
  heroCap.querySelector('.hero-cap-t').textContent = s.w.t;
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
  SLIDES.forEach((s, i) => s.dot.setAttribute('aria-label', tr('home.dot', { n: i + 1, t: s.w.t })));
}
heroPick();

/* ==================== js/router.js ==================== */
/* Page changes: hash routing, the category curtain, page morphs, the nav underline */
/* ---------- hash routing: #home (the carousel), #work #fanart #original #nsfw (the wall), #artbook #ab-<book> #goods #about #contact #w-<work id> #g-<goods slug> ---------- */
let view = null, lastWork = null, lastItem = null;
function parse() {
  const h = decodeURIComponent(location.hash.slice(1));
  if (h === 'about' || h === 'contact' || h === 'goods' || h === 'game') return { h, next: h, idx: -1 };
  if (h === 'work' || h === 'timeline') return { h, next: 'works', idx: -1 };   // #timeline: an old address of the wall
  if (h === 'fanart' || h === 'original' || h === 'nsfw') return { h, next: 'works', idx: -1, cat: h === 'fanart' ? 'fan' : h };
  if (h.startsWith('w-') && h.slice(2) in byId) return { h, next: 'work', idx: byId[h.slice(2)] };
  if (h.startsWith('g-') && h.slice(2) in bySlug) return { h, next: 'item', idx: bySlug[h.slice(2)] };
  if (h === 'artbook') return { h, next: 'artbook', idx: -1 };
  if (h.startsWith('ab-') && h.slice(3) in byBook) return { h, next: 'book', idx: byBook[h.slice(3)] };
  return { h, next: 'home', idx: -1 };
}

/* swap the DOM to the requested view, then start watching its reveal elements */
function apply({ h, next, idx, cat }) {
  const from = view;
  zvPage(next);   // another part of the site: the picture windows close
  const same = from === next;
  for (const [k, v] of Object.entries(VIEWS)) v.hidden = k !== next;
  document.querySelectorAll('.nav a, .m-nav a').forEach((a) => {
    a.toggleAttribute('aria-current', a.dataset.v.split(' ').includes(next));
    if (a.hasAttribute('aria-current')) a.setAttribute('aria-current', 'page');
  });
  moveInk(from === null);
  const root = VIEWS[next];
  if (!same) { root.style.animation = 'none'; void root.offsetWidth; root.style.animation = ''; }
  const behavior = same && !CALM ? 'smooth' : 'auto';
  let els;
  if (next === 'work') {
    renderWork(idx); lastWork = WORKS[idx].id; scrollTo(0, 0); els = prime(root);
  } else if (next === 'item') {
    renderItem(idx); lastItem = GOODS[idx].slug; scrollTo(0, 0); els = prime(root);
  } else if (next === 'works') {
    /* #fanart / #original pick the category; back from a work page shows that work's category */
    const switched = setCat(cat || (from === 'work' && lastWork ? WORKS[byId[lastWork]].cat : wallCat));
    layoutWall();
    const cover = from === 'work' && lastWork && document.getElementById('c-' + lastWork);
    if (cover && !cover.hidden) { cover.scrollIntoView({ block: 'center' }); els = pending(root); }
    else {
      scrollTo({ top: 0, behavior });
      els = !same ? prime(root) : switched ? [...pending(root), ...prime(wall), ...prime(nsfwBox)] : pending(root);   // a new category flies in
    }
  } else if (next === 'book') {
    renderBook(idx); lastBook = BOOKS[idx].slug; scrollTo(0, 0); els = prime(root);
  } else if (next === 'artbook') {
    if (!abBuilt) renderBooks();
    const card = from === 'book' && lastBook && document.getElementById('abc-' + lastBook);
    if (card) { card.scrollIntoView({ block: 'center' }); els = pending(root); }
    else { scrollTo({ top: 0, behavior }); els = same ? pending(root) : prime(root); }
    abYearsUpdate();
  } else if (next === 'goods') {
    const card = from === 'item' && lastItem && document.getElementById('gc-' + lastItem);
    if (card) { card.scrollIntoView({ block: 'center' }); els = pending(root); }
    else { scrollTo({ top: 0, behavior }); els = same ? pending(root) : prime(root); }
  } else {
    scrollTo({ top: 0, behavior }); els = same ? pending(root) : prime(root);
  }
  view = next;
  evenIntros();
  if (next === 'about') preloadAbout();
  if (next === 'home' && from !== null) heroPick();   // every press of Home: a new pick of works for the carousel
  heroPlay();   // the carousel moves on only while the home page is shown
  watch(els);
  parallax();
}

/* category switch: the curtain covers the page, the new page is put in place underneath, the curtain lifts */
const curtainEl = $('#curtain');
const CUR_NAME = { home: 'HOME', works: 'WORK', artbook: 'ART BOOK', goods: 'GOODS', game: 'GAME', about: 'ABOUT', contact: 'CONTACT' };
const TOP_VIEWS = new Set(['home', 'works', 'artbook', 'goods', 'game', 'about', 'contact']);
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
      }, 700);
    }, 400);
  }, 540);
}
const navEl = $('.nav'), navInk = el('span', 'nav-ink');
navInk.setAttribute('aria-hidden', 'true');
navEl.appendChild(navInk);
navEl.classList.add('has-ink');
function moveInk(instant) {
  const a = navEl.querySelector('a[aria-current="page"]');
  if (!a) { navInk.style.opacity = '0'; return; }
  if (instant) navInk.style.transition = 'none';
  navInk.style.opacity = '1';
  navInk.style.width = `${a.offsetWidth}px`;
  navInk.style.transform = `translateX(${a.offsetLeft}px)`;
  if (instant) { void navInk.offsetWidth; navInk.style.transition = ''; }
}
addEventListener('resize', () => moveInk(true));
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => moveInk(true));

/* page change: cross-fade with the View Transitions API, and morph the clicked image into the next page */
function route() {
  if (curtainBusy) return;
  const r = parse();
  const from = view;
  if (from !== null && from !== r.next && !CALM && TOP_VIEWS.has(r.next) && !(from === 'work' && r.next === 'works') && !(from === 'item' && r.next === 'goods') && !(from === 'book' && r.next === 'artbook')) { curtainTo(r); return; }
  if (from === null || from === r.next || !VT) { apply(r); return; }
  const pick = (fwd) => {
    if (from === 'works' && r.next === 'work') return fwd ? document.querySelector(`#c-${WORKS[r.idx].id} img`) : document.querySelector('#wk-imgs img');
    if (from === 'goods' && r.next === 'item') return fwd ? document.querySelector(`#gc-${GOODS[r.idx].slug} img`) : $('#it-img');
    if (from === 'work' && r.next === 'works') return fwd ? document.querySelector('#wk-imgs img') : lastWork && document.querySelector(`#c-${lastWork} img`);
    if (from === 'item' && r.next === 'goods') return fwd ? $('#it-img') : lastItem && document.querySelector(`#gc-${lastItem} img`);
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
      try { await Promise.race([b.decode ? b.decode() : b3Load(b), sleep(450)]); } catch (_) { /* show it as is */ }
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

/* ==================== js/lang-switch.js ==================== */
/* Switching language: everything on screen is redrawn in place, with a short tween */
/* language switching: static text via data-i18n*, everything drawn by script is refreshed in place */
const subVars = (e) => (e.id === 'works-sub' ? catVars() : e.id === 'ab-sub' ? abVars() : { n: WORKS.length });
/* the texts marked in the page, or in a part of it made later (a picture window: js/lightbox.js) */
function textsIn(root) {
  root.querySelectorAll('[data-i18n]').forEach((e) => { e.textContent = tr(e.dataset.i18n, subVars(e)); });
  root.querySelectorAll('[data-i18n-aria]').forEach((e) => e.setAttribute('aria-label', tr(e.dataset.i18nAria)));
  root.querySelectorAll('[data-i18n-alt]').forEach((e) => { e.alt = tr(e.dataset.i18nAlt); });
  root.querySelectorAll('[data-i18n-title]').forEach((e) => { e.title = tr(e.dataset.i18nTitle); });
}
function applyStatic() {
  textsIn(document);
  document.querySelectorAll('.lang button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === LANG)));
  catText();
  sortText();
  paintAbout();
  deckText();
  yearText();
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
   pictures stay put. Text off screen just switches. */
const TX_SKIP = '.site-head, .m-nav, .curtain, script, style, svg, [hidden]';
function textOnScreen() {
  const roots = [VIEWS[view], $('.site-foot')].filter(Boolean), picked = [];
  const mark = new Set();
  for (const root of roots) {
    const tw = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, { acceptNode: (n) => (n.matches(TX_SKIP) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT) });
    for (let n = tw.nextNode(); n; n = tw.nextNode()) {
      if (![...n.childNodes].some((c) => c.nodeType === 3 && c.textContent.trim())) continue;
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
let langBusy = false, langNext = null;
function setLang(l) {
  if (!I18N[l] || l === LANG) return;
  document.querySelectorAll('.lang button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === l)));
  if (CALM || !Element.prototype.animate) { swapLang(l); return; }
  if (langBusy) { langNext = l; return; }
  langBusy = true;
  const outs = textOnScreen().flatMap(textOut);
  setTimeout(() => {
    swapLang(l);
    outs.forEach((a) => a.cancel());
    textOnScreen().forEach(textIn);
    langBusy = false;
    if (langNext && langNext !== LANG) { const n = langNext; langNext = null; setLang(n); } else langNext = null;
  }, 190);
}
function swapLang(l) {
  if (!I18N[l] || l === LANG) return;
  LANG = l;
  try { localStorage.setItem('lang', l); } catch (e) { /* private mode: still switches for this visit */ }
  document.documentElement.lang = HTML_LANG[l];
  if (/[?&]lang=/.test(location.search)) {
    try { history.replaceState(null, '', location.pathname + location.search.replace(/([?&]lang=)(zh|en|ja)/, '$1' + l) + location.hash); } catch (e) { /* keep the address as is */ }
  }
  applyStatic();
  zvLang();
  heroText();
  sndText();
  wall.querySelectorAll('.cover').forEach((a) => fillCover(a, WORKS[byId[a.id.slice(2)]]));
  ggrid.querySelectorAll('.g-card').forEach((a) => fillGoodsCard(a, GOODS[bySlug[a.id.slice(3)]]));
  charList.querySelectorAll('.char').forEach((li, k) => {
    const n = k + 1, btn = li.querySelector('.char-btn');
    if (btn) btn.setAttribute('aria-label', tr(CHAR_CARD.has(n) ? 'chars.viewPair' : 'chars.view', { n }));
    else li.querySelector('img').alt = tr('chars.tbd', { n });
  });
  shotThumbs.querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-label', tr('shots.thumb', { n: i + 1, t: tr(SHOTS[i]) })));
  showShot(shotAt, false);
  if (view === 'work') workText(byId[lastWork]);
  if (view === 'item') renderItem(bySlug[lastItem]);
  abText();
  if (view === 'book') bookText(byBook[lastBook]);
  layoutWall();
}

/* ==================== js/sound.js ==================== */
/* Sound: background music, switched on and off by the button beside the languages, and a soft click on every button
   and link. The music starts off (a browser only lets a page make sound once the visitor has touched it); the click
   plays whether the music is on or off. Volumes are set here: the music file is loud, so it plays well under it. */
const BGM_SRC = 'audio/bgm.mp3', CLICK_SRC = 'audio/click.mp3';
const BGM_VOL = 0.35, CLICK_VOL = 0.7;
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
  if (on || bgm) bgmPlay(on && !bgmHeld && !document.hidden);
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
  if (window.SELF_HOSTED && e.target.closest('.tl-card')) { bgmHeld = true; if (bgmOn) bgmPlay(false); }   // the video has its own sound
}, true);
addEventListener('hashchange', () => { if (bgmHeld) { bgmHeld = false; if (bgmOn) bgmPlay(!document.hidden); } });
document.addEventListener('visibilitychange', () => { if (bgmOn) bgmPlay(!document.hidden && !bgmHeld); });

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
