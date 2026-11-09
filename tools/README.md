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
`lightbox` 看圖的視窗 → `about` 關於、聯絡、頁尾 → `motion` 動畫 → `responsive` 窄螢幕、減少動態。

**程式**（`js/`）照這個順序合併成一個 `site.js`，前面檔案定義的東西後面的檔案可以直接用：
`data` 資料 → `core` 共用小工具 → `i18n` 三種語言的文字 → `game` 遊戲頁 → `lightbox` 看圖的視窗 →
`menu` 手機選單 → `goods` 周邊 → `wall` 作品牆 → `work` 作品頁 → `artbook` 畫冊列表、畫冊頁 →
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
   - `id`：pixiv 作品編號；原創作品用 `o-<編號>`
   - `t` 標題，`cat` 分類：`"fan"` 或 `"original"`，`lab` 標籤（例如 `"hololive"`、`"Original Art"`），`tags` pixiv 標籤
   - `d` 日期 `"2026-11-06"`：作品牆的排序和年份；`ym` 完成年月 `"2023.02"`：顯示在作品頁，可以空白
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

## 看圖的視窗

點作品、畫冊、角色、卡牌或截圖，圖會開在一個視窗裡（`js/lightbox.js`、`css/lightbox.css`），網頁照樣可以捲、可以換頁：
- 拖標題列移動，拖邊緣或角落調整大小。新視窗照圖的形狀開，放在最不擋到其他視窗的地方
- 右上角三個按鈕（跟 SORT 同樣式）：顯示實際尺寸／符合視窗、縮到最小、CLOSE。視窗窄的時候只剩圖示
- 縮到最小會收進左下角，點一下回到原本的位置和大小；同一張圖再點一次，會叫回已經開著的那個視窗
- 可以同時開好幾個並排看；換頁、換語言都不會關掉。3D 檢視（畫冊封面）還是蓋住整個畫面的那種
- 視窗的樣子寫在 `index.html` 的 `<template id="zv-tpl">`

## 改文字

網站上的文字在 `js/i18n.js`，`zh`、`en`、`ja` 三種語言用同一個 key，三個都要改。
`index.html` 裡寫死的文字用 `data-i18n="key"` 指向這裡。

## NSFW 預覽

`python -I tools/nsfw_preview.py <1|2|3> <圖>`：做成 600 px 寬、重度模糊的預覽。
圖是從網路下載的話，記得用 `-I`，並把下載的檔案放在單獨的資料夾。

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
| `build.py` | 把 `css/`、`js/` 合併成 `site.css`、`site.js`，更新版本戳記，再檢查殘留 |
| `check_code.py` | 列出沒在用的程式、樣式、文字、資料欄位，和不會生效的樣式（`build.py` 每次都會跑） |
| `check_images.py` | 列出沒用到的、缺少的圖片和音檔（`build.py` 每次都會跑） |
| `check_deploy.py` | 等部署完成，比對線上檔案 |
| `common.py` | 共用的設定和函式（尺寸、品質、讀寫 `js/data.js`） |

做圖的工具都可以加 `--out <資料夾>`，先把圖做到別的地方看看，不動到網站。
需要 Python 3 和 Pillow；`foil_mask.py` 另外需要 psd-tools。
