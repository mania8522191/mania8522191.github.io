# 可獨立移除的網站功能

每項功能的程式、樣式和專用圖片都收在同一個資料夾。網站共用既有作品、商品和畫冊資料。

| 資料夾 | 功能與入口 |
| --- | --- |
| `ff47-list/` | GOODS → FF47 品書 → 全部周邊。選款式、加減數量、填套組備註，或下載含日期、攤位及縮圖的 PNG。 |

## 暫停中（`off/`）

`off/` 裡的功能已經下線，但程式和圖片都留著，之後可以再用。建置時不會讀 `off/` 裡的資料夾。

| 資料夾 | 功能與入口 |
| --- | --- |
| `off/instagram/` | 首頁右下角的 Instagram 最新貼文。貼文清單沿用現有的排程更新。 |
| `off/lollipop/` | 首頁和 miComet「Lollipop」作品頁的互動插畫，三層圖跟著滑鼠或手指晃動。支援方向鍵及減少動態效果設定。 |
| `off/sketch-compare/` | 《VTuber 塗鴉合集》內有草稿的單張作品頁，用拉桿比較草稿與完稿。 |

要重新上線，把資料夾從 `off/` 移回 `features/`（例如 `features/off/lollipop/` 移回 `features/lollipop/`，圖片路徑才對得上），再執行下面兩行。要暫停某項功能，就反過來把它移進 `off/`。

## 移除一項

把該功能的資料夾整個刪掉或移出專案，在專案根目錄執行以下指令。第一行更新網頁載入的樣式、腳本和版本，第二行檢查產物。

```powershell
python tools/build.py
python tools/build.py --check
```

發佈時，請一併提交資料夾的變動及重建後的 `index.html`、`site.css`、`site.js`。

購物清單儲存在訪客自己瀏覽器的 `localStorage`（鍵名 `mania.ff47.wishlist.v1`）；刪除清單最後一項會清掉該筆儲存。
