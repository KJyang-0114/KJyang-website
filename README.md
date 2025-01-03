# KJyang的小小網站

這是一個使用 Vue.js 和 Express.js 建立的個人網站專案。

## 功能特色

- 🎮 遊戲精華時刻展示
- 💬 留言板功能
- 🌙 現代化深色主題
- 📱 響應式設計

## 技術棧

### 前端
- Vue 3
- Vue Router
- Vuestic UI
- Font Awesome

### 後端
- Node.js
- Express
- CORS

## 本地開發

1. 安裝依賴
```bash
# 前端
cd vue-project
npm install

# 後端
cd server
npm install
```

2. 啟動開發服務器
```bash
# 前端
npm run dev

# 後端
npm run start
```

## 部署

1. 建置前端
```bash
cd vue-project
npm run build
```

2. 啟動生產環境服務器
```bash
cd server
npm run start
```

## 目錄結構

```
KJyang-website/
├── vue-project/          # 前端專案
│   ├── src/             # 源代碼
│   ├── public/          # 靜態資源
│   └── dist/            # 建置輸出
│
└── server/              # 後端專案
    ├── index.js         # 服務器入口
    └── messages.json    # 留言數據存儲
```

## 作者

- KJyang
- Instagram: @kjyang_0114
- Discord: https://discord.gg/sZbn6Dw3Bx 