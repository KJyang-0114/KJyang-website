const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const rateLimit = require('express-rate-limit');
const xss = require('xss');
const helmet = require('helmet');

const app = express();
const HOST = '0.0.0.0';

// 安全性中間件
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分鐘
  max: 100 // 限制每個IP 15分鐘內最多100個請求
});

// CORS 配置
const corsOptions = {
  origin: ['https://kjyang0114.site', 'https://drive.google.com'],
  optionsSuccessStatus: 200,
  credentials: true
};

// 中間件
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://drive.google.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:", "http:", "https://drive.google.com"],
      connectSrc: ["'self'", "https://drive.google.com"],
      frameSrc: ["'self'", "https://drive.google.com", "https://*.google.com"],
      frameAncestors: ["'self'", "https://drive.google.com"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'", "https://drive.google.com", "https://*.google.com"],
      upgradeInsecureRequests: []
    }
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginOpenerPolicy: false
}));
app.use(cors(corsOptions));
app.use(express.json({ limit: '10kb' })); // 限制請求體大小
app.use('/api', limiter);

// 提供前端靜態文件
app.use(express.static(path.join(__dirname, '../vue-project/dist')));

// 數據文件路徑
const MESSAGES_FILE = path.join(__dirname, 'messages.json');

// 確保數據文件存在並進行安全讀寫
async function ensureMessagesFile() {
  try {
    await fs.access(MESSAGES_FILE);
  } catch {
    await fs.writeFile(MESSAGES_FILE, JSON.stringify([]));
  }
}

// 驗證留言內容
function validateMessage(name, content) {
  if (!name || !content) return false;
  if (name.length > 50 || content.length > 500) return false;
  if (!/^[\u4e00-\u9fa5a-zA-Z0-9_\s]{1,50}$/.test(name)) return false;
  return true;
}

// 安全地讀取留言文件
async function safeReadMessages() {
  try {
    const data = await fs.readFile(MESSAGES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('讀取留言文件失敗:', error);
    return [];
  }
}

// 安全地寫入留言文件
async function safeWriteMessages(messages) {
  try {
    await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2));
    return true;
  } catch (error) {
    console.error('寫入留言文件失敗:', error);
    return false;
  }
}

// 獲取所有留言
app.get('/api/messages', async (req, res) => {
  try {
    await ensureMessagesFile();
    const messages = await safeReadMessages();
    res.json(messages);
  } catch (error) {
    console.error('讀取留言失敗:', error);
    res.status(500).json({ error: '無法讀取留言' });
  }
});

// 添加新留言
app.post('/api/messages', async (req, res) => {
  try {
    await ensureMessagesFile();
    const { name, content, time } = req.body;
    
    // 驗證數據
    if (!validateMessage(name, content)) {
      return res.status(400).json({ error: '無效的輸入數據' });
    }

    // XSS 過濾
    const sanitizedName = xss(name);
    const sanitizedContent = xss(content);

    // 讀取現有留言
    const messages = await safeReadMessages();

    // 添加新留言到開頭
    messages.unshift({
      name: sanitizedName,
      content: sanitizedContent,
      time: time || new Date().toLocaleString()
    });

    // 限制留言總數
    if (messages.length > 100) {
      messages.length = 100;
    }

    // 保存到文件
    if (await safeWriteMessages(messages)) {
      res.json({ success: true });
    } else {
      res.status(500).json({ error: '無法保存留言' });
    }
  } catch (error) {
    console.error('保存留言失敗:', error);
    res.status(500).json({ error: '無法保存留言' });
  }
});

// 處理所有其他路由，返回前端應用
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../vue-project/dist/index.html'));
});

// 啟動服務器
app.listen(3000, HOST, () => {
    console.log(`服務器運行在 http://${HOST}:3000`);
}).on('error', (err) => {
    console.log(`服務器啟動失敗:`, err.message);
}); 