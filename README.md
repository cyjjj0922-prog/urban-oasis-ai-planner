# 都市綠洲 AI 療癒行程規劃器

> **放慢步調，糖廠剛好**

結合課程行銷影展企劃「都市綠洲 Urban Oasis Film Festival」構想與「帝國製糖廠臺中營業所」真實場域地景的個人化慢活行程規劃網站。

## 主要功能

- **心情選擇**：壓力大、想放空、想拍照、想約會、探索文化
- **停留時間**：30 分鐘、60 分鐘、120 分鐘
- **活動偏好**：湖畔散步、歷史建築、拍照打卡、休息用餐（支援複選）
- **雙軌智慧推薦**：
  - 有設定伺服器端 `GEMINI_API_KEY` 時，透過 `/api/itinerary` 安全呼叫 Gemini 生成個人化建議
  - 無 API Key 時，自動以內建規則式慢活引擎穩定產生對應行程
- **行程操作**：完整顯示行程名稱、推薦原因、活動順序、建議時間，支援站點完成標記、換個提案路線、重新規劃及一鍵複製行程

## 本地開發

```bash
npm install
npm run dev
```

## 部署至 Vercel

1. 將專案推送至 GitHub Repository。
2. 於 Vercel 匯入專案（Framework Preset 選擇 Vite）。
3. （選填）於 Vercel Project Settings → Environment Variables 新增 `GEMINI_API_KEY`；若未設定，網站仍會以規則式推薦正常運作。
4. 專案內已附 `vercel.json` 與 `api/itinerary.ts`，部署後即可直接使用。
