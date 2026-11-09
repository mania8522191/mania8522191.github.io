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
  {"id":"146544263","t":"星街すいせい「SheenderellaDay」","ym":"2024.08","d":"2026-06-28","lab":"hololive","tags":["バーチャルYouTuber","ホロライブ","星街すいせい","ほしまちぎゃらりー","アイドルマスターシンデレラガールズ","高垣楓"],"dims":[[1200,608,1500,760],[1500,4560]],"pos":"50% 35%","cat":"fan"},
  {"id":"146544204","t":"星街すいせい「SheenderellaDay」","ym":"2024.08","d":"2026-06-28","lab":"hololive","tags":["バーチャルYouTuber","ホロライブ","星街すいせい","ほしまちぎゃらりー"],"dims":[[1200,608,1500,760],[1500,4560]],"pos":"50% 35%","cat":"fan"},
  {"id":"146543533","t":"星街すいせい「ジュビリー」","ym":"2024.08","d":"2026-06-28","lab":"hololive","tags":["ホロライブ","バーチャルYouTuber","星街すいせい","ほしまちぎゃらりー"],"dims":[[1200,608,1500,760],[1500,6080]],"pos":"50% 35%","cat":"fan"},
  {"id":"146541232","t":"星街すいせい「ジュビリー」","ym":"2024.08","d":"2026-06-28","lab":"hololive","tags":["ホロライブ","バーチャルYouTuber","星街すいせい","ほしまちぎゃらりー","アイドルマスターシンデレラガールズ","高垣楓"],"dims":[[1200,608,1500,760],[750,4560]],"pos":"50% 35%","cat":"fan"},
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
