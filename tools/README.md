# 網站的工具和說明

網站是純靜態網頁，放在 GitHub Pages：改完檔案、跑 `python tools/build.py`、推上 GitHub 就會上線。

## 檔案在哪裡

| 位置 | 內容 |
|---|---|
| `index.html` | 頁面骨架（每一頁的 HTML） |
| `css/` | 樣式的原始檔，一個區塊一個檔案 |
| `js/` | 程式的原始檔，一個功能一個檔案 |
| `site.css`、`site.js` | 網頁實際載入的檔案：`tools/build.py` 把 `css/`、`js/` 照順序合併而成，不要直接改 |
| `js/data.js` | 網站資料：`WORKS` 作品、`HOME_SLIDES` 首頁輪播、`GOODS` 周邊、`BOOKS` 畫冊，一件一行 |
| `img/` | 圖片（見下方） |
| `audio/` | 背景音樂 `bgm.mp3`、按鈕點擊音效 `click.mp3`（見「音樂和音效」） |
| `tools/` | 這裡的工具 |

**樣式**（`css/`）照這個順序合併，順序會影響哪一條規則優先，不要隨意調換：
`base` 基本設定、頁首、選單 → `home` 首頁輪播，以及作品牆的標題、分類切換、NSFW → `artbook` 畫冊、3D 書、材質、3D 檢視 →
`works` 作品牆、作品頁 → `goods` 按鈕、價格、周邊 → `nav` 語言切換、手機選單 → `game` 遊戲頁 →
`lightbox` 看圖的視窗 → `about` 關於、聯絡、頁尾 → `event` 展場 → `motion` 動畫 → `responsive` 窄螢幕、減少動態。

**程式**（`js/`）照這個順序合併成一個 `site.js`，前面檔案定義的東西後面的檔案可以直接用：
`data` 資料 → `core` 共用小工具 → `i18n` 三種語言的文字 → `game` 遊戲頁 → `lightbox` 看圖的視窗 →
`menu` 手機選單 → `goods` 周邊 → `event` 展場 → `wall` 作品牆 → `work` 作品頁 → `tag` 標籤頁 → `artbook` 畫冊列表、畫冊頁 →
`book3d` 3D 書和 3D 檢視 → `motion` 捲動動畫 → `home` 首頁輪播 → `router` 換頁 → `about` 關於頁 →
`lang-switch` 切換語言 → `main` 啟動（最後一個）。
順序寫在 `tools/build.py` 裡；新增檔案的話也要加進那裡。
合成一個檔案載入，是為了讓開頁時的執行順序跟拆檔前完全一樣（分開載入的話，有些等字型載入完才做的動作會在檔案之間提早執行）。

**圖片**（`img/`）：

| 位置 | 內容 |
|---|---|
| `img/<id>.webp`、`img/<id>_p1.webp`… | 作品頁上的圖，長邊 1200 |
| `img/z/` | 作品的原尺寸，放大檢視用 |
| `img/proc/`、`img/proc/z/` | 過程動畫：作品頁上的（寬 1000）、原尺寸 |
| `img/ab/<slug>_p<n>.webp` | 畫冊跨頁，寬 1400（p0 是封面跨頁） |
| `img/ab/z/<slug>_p0.webp` | 封面跨頁寬 2560，畫冊頁的 3D 書用 |
| `img/ab/x/` | 畫冊跨頁原尺寸：3D 檢視和放大檢視用 |
| `img/ab/<slug>_foil.webp` | 燙箔遮罩（目前只有 FF43） |
| `img/nsfw/` | NSFW 區的三張模糊預覽 |
| `img/cards/`、`img/char*.webp`、`img/shot*.webp` | 遊戲頁 |
| `img/yt/` | 縮時影片的封面 |
| `img/goods-<slug>-<n>.webp`、`img/goods-bg.webp` | 周邊商品頁：去背的商品（`goods_pieces.py`）、拿出商品時品書右邊展開的背景（`catalog_bg.py`） |
| `img/share-og.jpg`、`img/share-x.jpg` | 分享預覽圖：網址貼到其他社群時顯示的圖（見「分享預覽圖」） |

## 規則

- **放大檢視一律用原尺寸**（`img/z/`、`img/ab/x/`、`img/proc/z/`），不縮小。只有頁面上的小圖會縮。
- **R18 的頁面只放模糊過的圖**，不做清楚的版本，也不做原尺寸（`book_images.py --blur`、`nsfw_preview.py`）。
- **改了 `css/` 或 `js/` 裡的檔案，要跑 `python tools/build.py`**，重新合併出 `site.css`、`site.js`，
  並更新 `index.html` 裡的版本戳記（`?v=`），回訪的人才會拿到新檔案。沒跑的話，網頁上看不到修改。
  會寫資料的工具（加了 `--save` 時）會自動跑。
- **直接改原本那條，不要在後面另外加一條蓋過去。** 樣式、程式、文字都一樣：照上面的說明找到它在哪個檔案，就在那裡改。
- **拿掉或換掉一個功能時，它的文字（`js/i18n.js` 三種語言）、樣式和圖片要一起刪。**
- **上線前跑 `python tools/build.py --check`，看到 `no leftovers` 才上線。**
  `build.py` 每次合併完都會檢查殘留：沒在用的程式、樣式、文字、資料欄位、圖片和音檔，還有一定會被蓋掉、不會生效的樣式，
  有的話會一條條列出來，先刪乾淨。如果它列的東西其實有在用（工具看不懂的寫法），就改進 `tools/check_code.py`，不要放著不管。

## 加一件作品

1. 在 `js/data.js` 的 `WORKS` 加一行，放在同分類作品裡日期對應的位置。欄位：
   - `id`：pixiv 作品編號；原創作品用 `o-<編號>`；沒有放上 pixiv 的同人作品用 `f-<資料夾>`（例如 `f-202408-01`），作品頁不顯示 pixiv 連結
   - `t` 標題，`cat` 分類：`"fan"` 或 `"original"`，`lab` 標籤（例如 `"hololive"`、`"Original Art"`），`tags` pixiv 標籤。
     作品頁上的每個 tag 都可以點，打開那個 tag 的標籤頁（`#t-<tag>`）：有這個 tag 的全部作品，排成跟作品牆一樣的拼貼
   - `ym` 完成年月 `"2023.02"`：作品牆照它排序、分年份，作品頁也會顯示；空白的話用 `d` 的年月代替
   - `d` 日期 `"2026-11-06"`：放上 pixiv 的日期（原創作品是完成日），顯示在作品頁
   - `pos` 作品牆裁切的位置，例如 `"50% 35%"`
   - `dims` 先寫 `[]`，下一步的工具會填
   - 有縮時影片才加 `yt`：`{"id": "YouTube 影片 ID", "dur": "22:20", "t": "影片標題"}`
2. 做圖並填入尺寸（一頁一張原圖，照頁序）：
   `python tools/work_images.py <id> <原圖> [<第二頁原圖> ...] --save`
   長條圖用 `--width 900` 之類的寬度代替長邊 1200。
3. 有過程動畫的話（階段圖照順序；或一個 GIF）：
   `python tools/process_anim.py <id> <階段圖1> <階段圖2> ... --save <id>`
   同一件作品第二頁的動畫，名稱用 `<id>_p1`。
4. 工具最後會印出檢查結果，看到 `no leftovers` 就沒問題（缺圖也會列在這裡）。
5. 本機預覽，再上線（見下方）。

**合集**（好幾張各自獨立的圖，例如塗鴉合集）：作品頁先把全部完稿排成跟作品牆一樣的拼貼（共用 `js/wall.js` 的
`makeCover`、`collage`），點一張進到那張自己的頁面（`#w-<id>/<n>`），完稿旁邊放差分和草稿；
左右鍵和頁尾的 Previous / Next 會換到上一張、下一張。
1. `WORKS` 那一行多加 `"pieces": true`。標題 `t` 可以寫成三種語言：`{"zh": "…", "en": "…", "ja": "…"}`（其他作品也可以）
2. 完稿照順序當成每一頁：`python tools/work_images.py <id> <完稿1> <完稿2> ... --save`
3. 草稿一頁配一張，沒有草稿的寫 `-`：`python tools/work_images.py <id> --sketches <草稿1> - <草稿3> ... --save`
   （存進 `sk`，圖是 `img/<id>_s<n>.webp`，n 從 0 數）
4. 有差分的話，一張完稿跑一次，編號用網站上的 No.：`python tools/work_images.py <id> --alts <No.> <差分1> [<差分2> ...] --save`
   （存進 `alt`，圖是 `img/<id>_a<n>_<k>.webp`，n 從 0 數、k 從 1 數）
5. 其中有單獨發在 pixiv 的圖：加 `"px": {"<n>": "<pixiv 作品 ID>"}`（n 從 0 數），那張的頁面就會有「在 pixiv 查看」。
6. 把網站上已有的作品併進合集：圖直接改名，不用重做（`git mv img/<舊 id>.webp img/<合集 id>_p<n>.webp`，`img/z/` 也一樣），
   刪掉舊作品那一行，再在 `js/data.js` 的 `MOVED` 加 `"<舊 id>": "<合集 id>/<No.>"`，舊網址就會轉到合集裡的那一張。

牆上的合集封面每次重新整理隨機發三張，什麼形狀的圖都可能發到；每張牌保持圖的比例，寬度一樣。

## 加一本畫冊

1. 跨頁 JPG 放在 `gpt/AB-JPG/<YYYYMM- FFnn>/`：封面跨頁（左封底、右封面）和內頁跨頁，裁切好、sRGB。
   印刷檔如果是單頁的，要先拼回跨頁（FF47 就是這樣做的）。
2. 在 `js/data.js` 的 `BOOKS` 加一行，放在日期對應的位置。欄位：
   - `slug` 例如 `"ff48"`，`ev` 例如 `"FF48"`，`ym` 發行年月 `"2027.02"`，`t` 書名（照作者寫的）
   - `mat` 封面材質：`"gloss"` 銅版紙＋亮膜、`"matte"` 銅版紙＋霧膜、`"ivory"` 象牙紙
   - `size` 尺寸：`"a4sq"` A4 正方形、`"b5"`、`"a5land"` A5 橫式；`pp` 頁數；`print` `"color"` 或 `"mono"`
   - 選填：`tk` 厚度（預設 0.012，厚的書 0.027）、`"rtl": true` 右翻書、`foil` 燙箔
   - `pages` 先寫 `[]`，下一步的工具會填
3. 做圖並填入尺寸：
   `python tools/book_images.py <slug> <封面跨頁> <內頁跨頁> [...] --save`
   R18 的內頁加 `--blur 1,2`（頁碼，封面是 0）。
4. 有燙箔的話，從封面 PSD 的燙箔圖層做遮罩，再在那本書加上 `"foil": "blue"`：
   `python tools/foil_mask.py <slug> <Cover.psd> 燙藍`
5. 新的尺寸或材質名稱要在 `js/i18n.js` 三種語言都加文字（`bk.size.*`、`bk.mat.*`）。
6. 手動改過 `js/data.js` 或 `js/i18n.js` 的話（例如加上 `foil`），再跑一次 `python tools/build.py`。
   看到 `no leftovers` 後，本機預覽，再上線。

## 周邊（Goods）

周邊頁（`#goods`）依場次排：上面一排場次按鈕，旁邊可以切換由新到舊、由舊到新（跟畫冊列表一樣），
每個場次一段，放那場的品書；點品書進到品書頁，那場的周邊都在品書頁的品書下面。
沒有品書的場次，周邊直接列在周邊頁。只會列出有周邊或品書的場次，不會有空的段落。
- 周邊寫在 `js/data.js` 的 `GOODS`，一件一行，新的場次放最上面；`ev` 是場次（例如 `"FF48"`），
  同一個 `ev` 的周邊排在同一段，第一次出現的新場次會自動多一顆按鈕；周邊照品書的順序排（`GOODS` 裡的順序）
- FF47 的お品書き是 `FF47_CATALOG`（`ev: "FF47"`），不放在作品牆，有自己的一頁 `#g-ff47-catalog`。
  舊的作品網址 `#w-148499079` 也會轉到這一頁
- 周邊頁上的品書（沒有外框）：左邊是前三頁疊成一手牌（跟作品牆的塗鴉合集一樣），
  頁碼從左到右，第一張在最上面；右邊是名稱、張數和箭頭。品書頁不顯示 tag
- 品書頁：10 張橫排，滑鼠按住左右拖曳翻頁（拖超過五分之一張就到下一張），手機用手指左右滑；
  中間那張以外，左右兩側漸層淡出。
  下面的箭頭也能翻頁，中間顯示第幾張。點一張（沒拖曳）會開看圖的視窗。再下面是全部周邊
- 周邊卡片的圖就是那件周邊在品書裡的那一頁（`GOODS` 的 `pg`：第幾頁，從 0 算），正方形圓角金色細框
  （跟活動膠囊、右下角按鈕同一種線，`--ring-*`），滑鼠移上去框會亮、圖會靠近一點
- 商品頁左邊也是那一頁品書。點圖（或按 Enter）分三步：
  1. 品書等比例放大：左邊不動往右長，盡量撐滿螢幕高度，至少 1.2 倍；畫面捲到整張看得到的地方，右邊的說明移到下面
  2. 圖往右展開，露出品書後面的背景，直到填滿整個框；超出品書頁的商品（例如紙袋的右邊）跟著背景一起露出來，接著品書上畫的那一段
  3. 品書和背景一起淡出，只剩去背的商品留在原位，範圍出現金色細框，可以用滑鼠按住拖曳到框裡任何地方

  按右上角 ✕ 照相反的順序放回。手機上圖不變大、不展開，點圖一樣會淡出成去背的商品，手指照常捲動頁面
- 品書頁的背景和第 2 步展開的背景是同一張圖（FF47 是 `202608/11/webbg.jpg`，3:2），品書和往右展開的部分接在一起，看不到接縫：
  `python tools/catalog_bg.py <背景圖> <廣告資料夾>`（FF47：`python tools/catalog_bg.py 202608/11/webbg.jpg 202608/CMYK/ADs`）
  - 品書每一頁原本的背景（廣告 PSD 共用的最下面那層）換成這張圖，從左上角照頁面的高度鋪。品書是正方形，所以露出圖的左邊三分之二
  - 同時做出 `img/goods-bg.webp`（同一張圖，高 1200），商品頁展開時接在品書右邊。框最寬 3:2，跟圖一樣，所以一張圖就夠，不用多種尺寸
  - 有廣告 PSD 的頁面，用 PSD 的圖層判斷哪裡是內容。沒有 PSD 的（吊飾、飯友套組那兩頁），用去背的商品和比舊背景暗的地方（文字、陰影）判斷
  - 品書頁從 git 裡第一次上線的版本讀（`ORIGINAL`），所以可以重跑，不會疊兩次。
    不要再用 `work_images.py` 重做品書頁，那樣會變回舊背景
- 套組內容的 1、2、3 是金色細圈的數字（像 ➀➁➂），用的是跟右下角按鈕同一種線
- 去背的商品從那件周邊的廣告 PSD 做（FF47 的在 `202608/CMYK/ADs/`，1、2、2.5、3、5、5.5、6.psd；
  壓克力吊飾和飯友套組用 Melonbooks 的廣告 `ADs/melon/g.psd`、`e.psd`）：
  `python tools/goods_pieces.py <slug> <廣告.psd> --save`
  每一件都放在品書那一頁上它所在的位置（`parts`，單位是品書頁的像素，頁寬 1200），所以品書淡出時商品不會動。
  FF47 的廣告就是品書的那一頁（畫布 6000 → 頁面 1200）；Melonbooks 的廣告排法不一樣，要加
  `--page img/148499079_p4.webp`（吊飾）或 `--page img/148499079_p6.webp`（飯友套組），
  工具會在品書頁上找到每一件的大小、角度和位置（比對圖像，要跑幾分鐘）。
  只取商品的圖層（不要背景、文字、標頭）；商品下面另外一層的羽化黑影會跟那件商品合在一起，
  廣告畫布邊緣切掉的黑影會照原本的模糊程度補齊；吊飾圓環照片上的白色灰塵點（廣告淺色底上看不到，網站深色底上很明顯）
  會自動清掉
- 頁面最下面是三個賣場（買動漫「Mania Art」、買動漫「宅即門」馬尼 MANIA 專區、Melonbooks），各有標誌和按鈕

改完跑 `python tools/build.py`。

## 首頁輪播

首頁（`#home`）輪播的作品寫在 `js/data.js` 的 `HOME_SLIDES`，一張一行。
每次打開、重新整理或按 Home（包括左上角的名字），都會從裡面重新隨機挑 5 張、隨機排順序
（張數是 `js/home.js` 的 `HERO_N`）；新的第一張不會跟剛才畫面上那張一樣：
- `id`：作品編號，要是 `WORKS` 裡有的作品
- `pos`：裁切時保留在畫面裡的位置，電腦和手機共用。例如 `"50% 22%"` 是左右置中、上下在 22% 的地方
- `turn`（選填）：把圖轉 90 度再放，`90` 是順時針、`-90` 是逆時針。
  例如 Super Nova 是直的圖，順時針轉成橫的放；這時 `pos` 指的是轉過之後畫面上的位置

改完跑 `python tools/build.py`。
作品牆在 `#work`；舊的 `#fanart`、`#original`、`#nsfw`、`#timeline` 網址也會到這裡。

## 音樂和音效

- `audio/bgm.mp3`：背景音樂（〈Gallery of Lost Memories〉）。頁首語言切換旁邊的按鈕可以開或關，預設是關的：
  瀏覽器不允許網頁自己開始出聲。分頁切到背景、或在作品頁播放過程影片時，音樂會暫停，回來或離開那一頁後再繼續。
- `audio/click.mp3`：點按鈕和連結時的音效，不受音樂開關影響。檔案開頭和結尾的空白，播放時會自動跳過。
- 換檔案：用同樣的檔名覆蓋就好。音量在 `js/sound.js`：`BGM_VOL` 音樂、`CLICK_VOL` 點擊（0～1）。

## 展場（Event）

展場寫在 `js/data.js` 的 `EVENTS`，一場一行：`name` 名稱、`from` / `to` 第一天和最後一天（`"2027-02-19"`）、
`venue` 會場和 `city` 城市（三種語言各一）。最後一天還沒過的列在「即將參加」，最近的一場也會顯示在首頁名字下面；
過了就自動移到「已結束」，不用改資料。改完跑 `python tools/build.py`。

## 首頁右下角的按鈕

首頁右下角由上到下是 X、YouTube 兩顆圓形按鈕（`index.html` 的 `#sns-dock`，程式在 `js/home.js`）。
Instagram 的按鈕 2026-11-17 先藏起來了（清單照樣每小時更新）；要再放回來，把 `js/home.js` 的 `SNS_ON` 改回 `['x', 'ig', 'yt']`。
按下去，按鈕的金色圓框會往左上拉開成視窗，顯示最新的貼文或影片；LOGO 留在右下角。
關掉：再按一次同一顆按鈕、在視窗外面任何地方按右鍵、手機上點視窗外面，或按 Esc（左鍵點外面不會關）。
哪一份清單還沒有（例如還沒設定金鑰），那顆按鈕就不會出現。視窗打開前不會載入裡面的圖。
按鈕左上方有一個金底黑字的漫畫對話框「最新／動態」（英文 What’s new，日文 最新／情報），小小的正三角形尾巴斜指向兩顆按鈕中間；
只是提示，點了沒有作用。重新整理首頁時它在按鈕之後彈出來，打開視窗時淡出，視窗收回後再出現（`css/home.css` 的 `.sns-tip`）。
按鈕和輪播上的活動欄位是同一套樣子（`css/base.css` 的 `--ring-*`）：一樣半透明的底、暗金色細框、陰影，滑鼠移上去框變亮、外圍多一圈淡金色光暈；重新整理首頁時，活動欄位和按鈕會跟名字一起做進場動畫（`css/motion.css` 的 `.intro`）。
視窗的金框平常是暗的，滑鼠在視窗或它的按鈕上時才變亮；收回時一路照當下的亮暗縮回圓框，不會閃一下。
滑鼠在按鈕上時，圓框外圍多一圈跟活動欄位懸停時一樣的淡金色光暈；視窗變亮時也有，開關時跟著圓框一起變形。
螢幕太矮放不下時，視窗裡可以用滑鼠滾輪或手指上下捲動，但不會出現捲軸；關掉再打開會回到最上面。

## 首頁的最新影片

首頁右下角的 YouTube 按鈕，打開是 YouTube 頻道（@mania852）最新的 3 部繪圖影片（含直播），不含 Shorts。
標題裡有 PROCESS、TIMELAPSE、插圖、插畫、畫圖、繪圖、イラスト 這類字的才算繪圖影片（清單是 `tools/yt_latest.py` 的 `DRAWING`），
所以鸚鵡、遊戲開發、旅行的影片不會出現；繪圖影片用了別的標題的話，把那個字加進 `DRAWING`。
清單在網站根目錄的 `yt-latest.json`，由 `tools/yt_latest.py` 讀頻道的公開 RSS 產生。
GitHub 上的 `.github/workflows/yt-latest.yml` 每小時跑一次，有新影片就自動提交，所以上傳後大約一個半小時內首頁會換上新的（GitHub 的排程有時會晚半小時左右才開始）。
- 想馬上更新：GitHub 的 Actions 分頁 → Latest YouTube videos → Run workflow；或在本機跑 `python tools/yt_latest.py` 再提交
- 改了 `tools/yt_latest.py`（例如 `DRAWING`）或這個工作流程並推上去時，也會馬上跑一次，不用等下一次排程
- 網站超過 60 天沒有任何提交的話，GitHub 會暫停排程並寄信通知，到 Actions 分頁按一下就能恢復
- 點影片會在新分頁開 YouTube（作品頁的縮時影片才是在網站上直接播放）
- 每部影片的日期旁邊有觀看次數和讚數，也是從同一個公開 RSS 讀來的（不用錢）。
  觀看次數一直在變，所以只有數字變的話，最多每 6 小時才寫一次檔（`yt-latest.json` 的 `at`），不會每小時都提交

## 首頁的 Instagram

首頁右下角的 Instagram 按鈕（目前藏起來，見上面），打開是 Instagram（@mania8522191）最新的 6 則貼文，點了會開 IG 上的那則貼文。
影片和 Reels 放封面，多張的放第一張，角落有跟 IG 一樣的小標記。
清單在網站根目錄的 `ig-latest.json`，圖存在 `img/ig/`（IG 給的圖片連結過一陣子會失效，所以要存下來），
由 `tools/ig_latest.py` 透過 Meta 的 Instagram API 讀取。
GitHub 上的 `.github/workflows/ig-latest.yml` 每小時跑一次，有新貼文就自動提交，不再列出的圖也會一起刪掉。

2026-11-15 設定好了：Meta 的應用程式「mania8522191 site」（屬於商家資產管理組合「Mania8522191」），
登入設定「Site latest posts」只要 `instagram_basic`（只能讀貼文），權杖永不過期，存在 GitHub 的 `IG_TOKEN`。

- 權杖只放在 GitHub 的 Secrets，不要貼進任何檔案或提交
- 沒有 `IG_TOKEN` 時，排程什麼都不做，首頁也不會出現 Instagram 按鈕
- IG 那邊忙或網路出錯時，清單維持原樣，下個小時再試
- 權杖失效時（例如在後台移除了測試人員），清單也維持原樣，排程每天早上 9 點左右會失敗一次，GitHub 會寄信通知。
  照下面第 6、7 步產生新的權杖，換掉 `IG_TOKEN` 就好
- 想馬上更新：Actions 分頁 → Latest Instagram posts → Run workflow

從頭設定的步驟（只有帳號本人能做，IG 要是專業帳號）。按鈕名稱照中文版的 Meta 後台：
1. 用 Facebook 帳號（IG 帳號不行）登入 https://developers.facebook.com ，第一次會要你註冊成開發者。
   「建立應用程式」：用途選「管理 Instagram 的訊息和內容」，商家可以先選「我還不想連結商家資產管理組合」
2. 應用程式裡「使用案例 → 自訂 → API setup with Unified login」一定要有商家資產管理組合：
   沒有的話照畫面「建立新帳號」建一個（免費，跟個人檔案分開；名稱被拒就照它建議的寫法），驗證可以按「稍後驗證」
3. 同一頁的「權限和功能」：只把 `instagram_basic` 按「新增」
4. 左邊選單「商家專用 Facebook 登入 → 設定 → 建立設定」：登入資料版本「一般」、存取權杖「系統用戶存取權杖」、
   到期「永不」、資產只勾「Instagram 帳號」（再勾「必要的資產」）、權限選 `instagram_basic`，按「建立」。
   不要用 Unified login 頁上的「建立新設定」：那是範本，一次要 6 種權限，包括發文、私訊和廣告
5. 回到「API setup with Unified login」：剛建的設定會顯示「與 Instagram 登入相容」並自動選上。
   重新導向網址填 `https://mania8522191.github.io/`，按「儲存」。
   再到「應用程式角色 → 角色 → 新增用戶」，選「Instagram 測試人員」，填 IG 帳號名稱，按「新增」；
   然後用 IG 帳號登入電腦版 instagram.com，到「設定 → 應用程式和網站 → 測試員邀請」按「接受」
6. 「API setup with Unified login → 2. 產生存取權杖」：IG 帳號那一列按「產生權杖」，用 IG 登入。
   跳出「已產生權杖」後勾「我瞭解」，按「複製」。權杖只顯示這一次，存好之前先別按「完成」
7. 用 mania8522191 登入 GitHub（沒登入時設定頁會顯示 404），到這個 repo 的
   Settings → Secrets and variables → Actions → New repository secret：名稱填 `IG_TOKEN`，貼上權杖。
   再到 Actions 分頁 → Latest Instagram posts → Run workflow，跑完首頁就會出現

## 首頁的 X

首頁右下角的 X 按鈕，打開是 X（@mania8522191）最新的 5 則自己發的貼文，點了會開 X 上的那則貼文。
不抓轉發、回覆和引用（引用要連原文一起顯示會多收費），只有字、沒配圖的貼文也不放。
每則的圖都存下來（最多 4 張，影片放封面），顯示整張不裁切；多張的像塗鴉合集的封面那樣發成一手牌（每次重新整理隨機挑最多 3 張），
每張牌跟同一列的其他圖一樣高，所以整手牌比旁邊的圖高一些；滑鼠移上去牌會再散開一點，視窗兩側有留空間，不會被切到。
圖下面固定是內文前兩行、日期、轉推和愛心（字疊在每張圖和它的陰影上面，不會被陰影壓暗）。排法（`js/home.js` 的 `xLayout`）是一列一列排滿視窗寬度，
每次重新整理都隨機挑一種各列高度最平均的排法，再讓每張稍微縮小、錯開、有的微微傾斜：亂中有序，時間順序其次。
有圖的不到 5 則時，每天最多往前多讀一頁（20 則，約 0.02 美元），補滿 5 則或讀到帳號最早的貼文就停。
清單在網站根目錄的 `x-latest.json`，圖存在 `img/x/`（原尺寸），由 `tools/x_latest.py` 透過 X API 讀取，
GitHub 上的 `.github/workflows/x-latest.yml` 每小時跑一次，有新貼文就自動提交。

X API 用多少付多少（要先在 X 那邊儲值），所以每次只問「上次之後的新貼文」：沒有新貼文的那一小時不扣錢。
用自己帳號的金鑰讀自己的貼文，一則 0.001 美元，貼文裡的圖另外算（X 公告 2026-11-22 起）。用量和餘額在 https://console.x.com 看。
每則貼文的日期旁邊有轉推數和愛心數：新貼文抓到時一起拿到，列出的 6 則每天重讀一次（只讀這幾則，`x-latest.json` 的 `counted`），
一個月大約 0.2 美元；要更常更新，改 `tools/x_latest.py` 的 `COUNTS_EVERY`（例如每小時一次大約一個月 4 美元）。

- 4 個金鑰只放在 GitHub 的 Secrets，不要貼進任何檔案或提交
- 沒有金鑰時，排程什麼都不做，首頁也不會出現 X 按鈕
- X 那邊忙或網路出錯時，清單維持原樣，下個小時再試
- 金鑰失效或額度用完時，清單也維持原樣，排程每天早上 9 點左右會失敗一次，GitHub 會寄信通知：到 console.x.com 儲值，或重新產生金鑰換掉
- 在 X 刪掉的貼文，要等新貼文把它擠出 6 則才會從網站消失
- 想馬上更新：Actions 分頁 → Latest X posts → Run workflow

從頭設定的步驟（只有帳號本人能做）：
1. 用 X 帳號（@mania8522191）登入 https://console.x.com ，建立 App（用途照實寫，例如「在個人網站顯示自己最新的貼文」）
2. 在 console 的帳單頁加信用卡、買額度（第一次綁卡送 20 美元額度，3 個月內有效）
3. App 的「Keys and tokens」：產生 API Key and Secret，和自己帳號的 Access Token and Secret（權限 Read 就好）。
   金鑰只顯示一次，存好之前先別關
4. 用 mania8522191 登入 GitHub，到這個 repo 的 Settings → Secrets and variables → Actions → New repository secret，
   建 4 個：`X_API_KEY`、`X_API_SECRET`、`X_ACCESS_TOKEN`、`X_ACCESS_SECRET`
5. Actions 分頁 → Latest X posts → Run workflow，跑完首頁就會出現 X 按鈕

## 外部連結的標誌

Contact 頁每個平台前面的金色圓圈，和頁尾每個連結前面的小圖示，都用 `index.html` 頁尾前面那組 `sns-*` 圖形
（`<symbol id="sns-x">` 等）；顏色和大小在 `css/about.css` 的 `.sns`、`.sns-badge`、`.foot-links`。
- 大部分圖形來自 Simple Icons（CC0），只把顏色改成網站的金色。巴哈姆特用它網址圖示裡的龍和彎月，
  買動漫是照它 16px 的網址圖示（購物袋加 M）重畫的，Melonbooks 是照它的 App 圖示（小寫 m、上方一道弧線、帶三道光芒的點）重畫的
- 每個圖形的 viewBox 大小不一樣，是為了讓它們在同一個框裡看起來一樣大；新增時也照這個比例調
- 加一個平台：在那組圖形裡加一個 `<symbol>`，再在連結前面放 `<svg class="sns" aria-hidden="true"><use href="#sns-名稱"/></svg>`；
  Contact 頁的圓圈和標誌要畫在同一個 svg 裡（照其他列複製 `<svg class="sns-badge" …>` 那段，改 `href`），
  不要用外框包住圖示：兩個分開的框在滑鼠移上去、整列往右滑的時候會各自對齊像素，標誌會在圈裡晃一下
- 連結文字要翻譯時，`data-i18n` 照樣放在 `<a>` 上，標誌放在文字前面：換語言時只換標誌後面的文字
  （`js/lang-switch.js` 的 `setText`），切換語言的淡出淡入也會連標誌一起動。
  不要把文字另外包一層 `<span data-i18n>`，那樣淡入淡出只有字在動，標誌不動
- Contact 頁的圓圈沒有文字，靠 `js/lang-switch.js` 的 `TX_ALSO` 才會跟名稱一起淡出淡入（網站上的圖片則不動）

## 換頁：上一頁按鈕、回到初始狀態

- 每一頁標題的左上角有「上一頁」（首頁沒有：首頁再往上沒有地方可以回去）：跟其他圓形按鈕一樣的金色圓框，
  裡面是尾巴往下折 90 度的箭頭（↰）（`js/router.js`、`css/nav.css` 的 `.ttl`、`.back`）。
  不管標題多長，都放在標題第一個字的左上方、距離一樣；標題換行時跟著第一行；手機上標題左邊放不下時，移到第一個字的上面：
  - 這次瀏覽中有上一頁時，跟瀏覽器的上一頁一樣
  - 從別人分享的連結直接打開某一頁時，回到它的上一層。作品回到它分類的作品牆，合集的單張回到合集，tag 頁回到作品牆，
    商品回到品書（沒有品書的回到周邊頁），品書回到周邊頁，畫冊回到畫冊列表，其他大分類回到首頁。
    往上一層不會多一筆上一頁紀錄，所以一直按會一路回到首頁
- 頁首的大分類（Work、Art Book、Goods……）：在同一個大分類裡換頁（作品牆 → 作品 → 上一頁）會保持原樣，
  圖片回到原本的位置；從別的大分類點回來，就回到初始狀態：Work 是 Fan Art、由新到舊，Art Book 和 Goods 是由新到舊，
  Game 的截圖回到第 1 張，About 回到照片，都從頁面最上面開始。網址有寫分類的（例如 `#original`）照網址
- 作品牆和 tag 頁的拼貼（`js/wall.js` 的 `collage`）：某一年只有一件作品時，只有在作品牆（有年份標題）才會置中；
  tag 頁沒有年份標題，置中會疊到另一欄的作品上

## 看圖的視窗

Work 和 Art Book 裡點圖（作品、製作過程、畫冊跨頁）或畫冊的 3D 封面，會開在一個視窗裡
（`js/lightbox.js`、`js/book3d.js`、`css/lightbox.css`），網頁照樣可以捲、可以換頁：
- 拖標題列移動，拖邊緣或角落調整大小；雙擊標題列等於按最大化
- 圖片上滾輪放大縮小（以游標為中心，從符合視窗到實際尺寸的 3 倍，倍數是 `js/lightbox.js` 的 `ZV_TOP`），
  比視窗大的時候拖曳移動；點一下切換實際尺寸和符合視窗
- 右上角：顯示實際尺寸／符合視窗（3D 是還原角度，跟 SORT 同樣式），再來是縮到最小、最大化、關閉，
  這三個只有圖示，滑鼠停上去會出現名稱。視窗窄的時候前面那顆也只剩圖示
- 縮到最小會收進左下角，點一下回到原本的位置和大小；同一張圖再點一次，會叫回已經開著的那個視窗
- 只開著一個視窗（而且沒被拖過）時再開第二個，兩個會自動左右並排；之後的放在最不擋到其他視窗的地方
- 同一個大分類裡換頁、換語言都不會關；點頁首的其他大分類（例如從 Work 到 Art Book）就全部關閉
- Game 頁的角色、卡牌、截圖不用視窗：一次一張，蓋住頁首以下的畫面，點圖旁邊或 ✕ 關閉
- 樣子寫在 `index.html` 的 `<template>`：`zv-tpl` 外框、`zv-pic-tpl` 看圖、`b3v-tpl` 3D 書、`zv-chip-tpl` 左下角的小膠囊

## 改文字

網站上的文字在 `js/i18n.js`，`zh`、`en`、`ja` 三種語言用同一個 key，三個都要改。
`index.html` 裡寫死的文字用 `data-i18n="key"` 指向這裡。

## NSFW 預覽

`python -I tools/nsfw_preview.py <1|2|3> <圖>`：做成 600 px 寬、重度模糊的預覽。
圖是從網路下載的話，記得用 `-I`，並把下載的檔案放在單獨的資料夾。

## 分享預覽圖

網址貼到其他社群時顯示的標題、說明和圖，寫在 `index.html` 最上面的 `og:`、`twitter:` 設定：
- Facebook、Threads、LINE、Discord、Messenger、IG 私訊讀 `og:`，圖是 `img/share-og.jpg`（1200×630）：
  圖下面平台會自己寫網站名稱和說明，有的還會把圖中間裁成正方形，所以作品放中間（三張疊成一手牌），名字小小放在下面
- X 讀 `twitter:`，圖是 `img/share-x.jpg`（1200×600）：X 只顯示圖，左下角會蓋上網址，所以名字大大放在左上，作品在右邊
- YouTube 不顯示連結預覽圖，頻道上的連結只會顯示網站的小圖示（`img/favicon.png`）
- 網址 `#` 後面的部分社群看不到，貼哪一頁都是同一個預覽
- 圖用 `tools/share_image.html` 畫（網站的字型和顏色），換作品改 `tools/share_images.py` 裡的 `WORKS`，再跑
  `python tools/share_images.py`（要有 Chrome 和網路）
- 換了圖之後，各社群可能還會顯示舊的圖一陣子；Facebook 可以用 Sharing Debugger 重新抓

## 本機預覽

在網站資料夾執行 `python -m http.server 8765`，用瀏覽器打開 http://localhost:8765 。改了 `css/`、`js/` 先跑 `python tools/build.py`。

## 上線

```
python tools/build.py --check
git add -A
git commit -m "說明這次改了什麼"
git push
python tools/check_deploy.py
```

`build.py --check` 確認兩件事：`site.css`、`site.js` 是最新的，而且沒有殘留。沒通過就先處理，再上線。
`check_deploy.py` 會等 GitHub Pages 部署完，再比對線上的 `index.html`、`site.css`、`site.js` 等檔案跟本機是否一樣。
GitHub 那邊部署逾時的話，推一個空的 commit 重試：`git commit --allow-empty -m "Redeploy"`，再 `git push`。

## 工具一覽

| 工具 | 做什麼 |
|---|---|
| `work_images.py` | 作品圖：頁面用的（長邊 1200）和原尺寸 |
| `process_anim.py` | 過程動畫：頁面用的（寬 1000）和原尺寸 |
| `book_images.py` | 畫冊圖：跨頁（寬 1400）、3D 書封面（2560）、原尺寸、R18 模糊頁 |
| `foil_mask.py` | 燙箔遮罩，從封面 PSD 的圖層做 |
| `nsfw_preview.py` | NSFW 區的模糊預覽 |
| `goods_pieces.py` | 周邊去背：從廣告 PSD 做每一件商品，放在品書那一頁上的位置（商品頁拿出來拖曳用） |
| `catalog_bg.py` | 品書換背景：品書每一頁的背景換成一張新圖，同時做出商品頁往右展開用的同一張背景 |
| `share_images.py` | 分享預覽圖（Facebook 等用的 1200×630、X 用的 1200×600），用 `share_image.html` 在 Chrome 裡畫 |
| `build.py` | 把 `css/`、`js/` 合併成 `site.css`、`site.js`，更新版本戳記，再檢查殘留 |
| `check_code.py` | 列出沒在用的程式、樣式、文字、資料欄位，和不會生效的樣式（`build.py` 每次都會跑） |
| `check_images.py` | 列出沒用到的、缺少的圖片和音檔（`build.py` 每次都會跑） |
| `check_deploy.py` | 等部署完成，比對線上檔案 |
| `yt_latest.py` | 首頁最新影片的清單 `yt-latest.json`（GitHub 每小時自動跑） |
| `ig_latest.py` | 首頁 Instagram 最新貼文的清單 `ig-latest.json` 和圖（GitHub 每小時自動跑，要先設定 `IG_TOKEN`） |
| `x_latest.py` | 首頁 X 最新貼文的清單 `x-latest.json` 和圖（GitHub 每小時自動跑，要先設定 4 個 `X_*` 金鑰） |
| `common.py` | 共用的設定和函式（尺寸、品質、讀寫 `js/data.js`） |

做圖的工具都可以加 `--out <資料夾>`，先把圖做到別的地方看看，不動到網站。
需要 Python 3 和 Pillow；`foil_mask.py`、`goods_pieces.py`、`catalog_bg.py` 另外需要 psd-tools（`goods_pieces.py`、`catalog_bg.py` 還要 numpy）；`share_images.py` 要有 Google Chrome。
