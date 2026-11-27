# 可獨立移除的網站功能

每項功能的程式、樣式和專用圖片都收在同一個資料夾。網站共用既有作品、商品和畫冊資料。

| 資料夾 | 功能與入口 |
| --- | --- |
| `ff47-list/` | GOODS → FF47 品書 → 全部周邊。選款式、加減數量、填套組備註，或下載含日期、攤位及縮圖的 PNG。 |
| `ff47-gift/` | GOODS → FF47 → 新刊套組 A。展開主圖、移開紙袋、點紀念卡，再選電腦或手機桌布。 |
| `lollipop/` | 首頁和 miComet「Lollipop」作品頁均可開啟互動插畫。支援滑鼠、觸控、方向鍵及減少動態效果設定。 |
| `sketch-compare/` | 《VTuber 塗鴉合集》內有草稿的單張作品頁。展開比較，用滑桿移動分界。 |
| `characters/` | WORKS → Fan Art → 角色或組合。標籤頁先顯示插畫，再列出可核對的周邊與畫冊。 |

## 移除一項

例如要移除紙袋桌布，可以將 `features/ff47-gift/` 整個資料夾移出專案，在專案根目錄執行以下指令。第一行更新網頁載入的樣式、腳本和版本，第二行檢查產物。把資料夾放回再重建即可復原。

```powershell
python tools/build.py
python tools/build.py --check
```

若要發佈移除後的版本，請一併提交資料夾的刪除及重建後的 `index.html`、`site.css`、`site.js`。其餘功能使用同一種移除方式。

購物清單儲存在訪客自己瀏覽器的 `localStorage`（鍵名 `mania.ff47.wishlist.v1`）；刪除清單最後一項會清掉該筆儲存。
