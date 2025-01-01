const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const HOST = '0.0.0.0';

// 中間件
app.use(cors());
app.use(express.json());

// 提供前端靜態文件
app.use(express.static(path.join(__dirname, '../vue-project/dist')));

// 數據文件路徑
const MESSAGES_FILE = path.join(__dirname, 'messages.json');

// 確保數據文件存在
async function ensureMessagesFile() {
  try {
    await fs.access(MESSAGES_FILE);
  } catch {
    await fs.writeFile(MESSAGES_FILE, JSON.stringify([]));
  }
}

// 獲取所有留言
app.get('/api/messages', async (req, res) => {
  try {
    await ensureMessagesFile();
    const data = await fs.readFile(MESSAGES_FILE, 'utf8');
    const messages = JSON.parse(data);
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
    if (!name || !content) {
      return res.status(400).json({ error: '名字和內容不能為空' });
    }

    // 讀取現有留言
    const data = await fs.readFile(MESSAGES_FILE, 'utf8');
    const messages = JSON.parse(data);

    // 添加新留言到開頭
    messages.unshift({
      name,
      content,
      time: time || new Date().toLocaleString()
    });

    // 保存到文件
    await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2));

    res.json({ success: true });
  } catch (error) {
    console.error('保存留言失敗:', error);
    res.status(500).json({ error: '無法保存留言' });
  }
});

// 處理所有其他路由，返回前端應用
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../vue-project/dist/index.html'));
});

// 啟動服務器在多個端口
const ports = [3000, 80];
ports.forEach(port => {
  app.listen(port, HOST, () => {
    console.log(`服務器運行在 http://${HOST}:${port}`);
  }).on('error', (err) => {
    if (err.code === 'EACCES') {
      console.log(`端口 ${port} 需要管理員權限，跳過...`);
    } else {
      console.log(`端口 ${port} 啟動失敗:`, err.message);
    }
  });
}); 