<template>
  <div class="contact-page">
    <div class="contact-container">
      <div class="contact-header">
        <h1 class="contact-title">聯繫我</h1>
        <p class="contact-subtitle">如果你也想一起當個快樂的Bug製造者的話</p>
      </div>

      <div class="contact-content">
        <div class="contact-section">
          <h2 class="section-title">社交媒體</h2>
          <div class="social-links">
            <a href="https://github.com/kjyang-0114" target="_blank" class="social-link">
              <div class="social-icon github">
                <i class="fab fa-github"></i>
              </div>
              <span class="social-text">Github</span>
            </a>
            <a href="https://www.instagram.com/kjyang_0114/" target="_blank" class="social-link">
              <div class="social-icon instagram">
                <i class="fab fa-instagram"></i>
              </div>
              <span class="social-text">Instagram</span>
            </a>
            <a href="https://discord.gg/sZbn6Dw3Bx" target="_blank" class="social-link">
              <div class="social-icon discord">
                <i class="fab fa-discord"></i>
              </div>
              <span class="social-text">Discord</span>
            </a>
          </div>
        </div>

        <div class="contact-section">
          <h2 class="section-title">留言給我</h2>
          <div class="message-form">
            <va-input
              v-model="message.name"
              label="你的名字"
              placeholder="請輸入你的名字"
              class="form-input"
              :disabled="isLoading"
            />
            <va-textarea
              v-model="message.content"
              label="留言內容"
              placeholder="想說些什麼呢？"
              class="form-input"
              rows="4"
              :disabled="isLoading"
            />
            <va-button 
              class="submit-button" 
              @click="submitMessage"
              :loading="isLoading"
            >
              發送留言
            </va-button>
          </div>
          
          <!-- 留言列表 -->
          <div class="messages-list" v-if="messages.length > 0">
            <div class="messages-header">
              <h3 class="messages-title">留言板</h3>
              <span class="messages-count">共 {{ messages.length }} 則留言</span>
            </div>
            <div class="message-item" v-for="(msg, index) in messages" :key="index">
              <div class="message-header">
                <span class="message-name">{{ msg.name }}</span>
                <span class="message-time">{{ msg.time }}</span>
              </div>
              <p class="message-content">{{ msg.content }}</p>
            </div>
          </div>
          <div v-else-if="isLoading" class="loading-messages">
            <va-progress-circular indeterminate />
            <p>載入留言中...</p>
          </div>
          <div v-else class="no-messages">
            <p>目前還沒有留言，來當第一個留言的人吧！</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const message = ref({
  name: '',
  content: ''
})

const messages = ref([])
const isLoading = ref(false)

// 從後端加載留言
const fetchMessages = async () => {
  try {
    isLoading.value = true
    const response = await fetch('/api/messages')
    const data = await response.json()
    messages.value = data
  } catch (error) {
    console.error('無法載入留言:', error)
  } finally {
    isLoading.value = false
  }
}

// 頁面載入時獲取留言
onMounted(() => {
  fetchMessages()
})

const submitMessage = async () => {
  if (!message.value.name || !message.value.content) {
    alert('請填寫名字和留言內容！')
    return
  }

  try {
    isLoading.value = true
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: message.value.name,
        content: message.value.content,
        time: new Date().toLocaleString()
      })
    })

    if (!response.ok) {
      throw new Error('留言發送失敗')
    }

    // 重新載入留言
    await fetchMessages()

    // 清空表單
    message.value = {
      name: '',
      content: ''
    }
  } catch (error) {
    console.error('無法發送留言:', error)
    alert('留言發送失敗，請稍後再試')
  } finally {
    isLoading.value = false
  }
}
</script>

<style>
.contact-page {
  min-height: 100vh;
  padding: 2rem;
  background-color: var(--background-color);
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  animation: fadeIn 0.5s ease forwards;
}

.contact-header {
  text-align: center;
  margin-bottom: 4rem;
}

.contact-title {
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}

.contact-subtitle {
  font-size: 1.2rem;
  color: var(--text-muted);
}

.contact-content {
  display: grid;
  gap: 4rem;
}

.contact-section {
  background: var(--card-background);
  border-radius: var(--border-radius);
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.section-title {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: var(--text-color);
}

.social-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius);
  text-decoration: none;
  color: var(--text-color);
  transition: all var(--transition-normal);
}

.social-link:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.1);
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.github {
  background: #333;
  color: white;
}

.instagram {
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  color: white;
}

.discord {
  background: #7289da;
  color: white;
}

.contact-info {
  display: grid;
  gap: 2rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.info-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--primary-color);
}

.info-content h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.info-content p {
  color: var(--text-muted);
}

.message-form {
  display: grid;
  gap: 1.5rem;
}

.form-input {
  width: 100%;
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-self: start;
}

.submit-button,
.download-button {
  padding: 0.8rem 2rem !important;
  font-size: 1.1rem !important;
  border: none !important;
  color: white !important;
  transition: all var(--transition-normal) !important;
}

.submit-button {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)) !important;
}

.download-button {
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

.download-button:hover {
  background: rgba(255, 255, 255, 0.2) !important;
  transform: translateY(-2px);
}

.messages-list {
  margin-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
}

.messages-title {
  font-size: 1.5rem;
  color: var(--text-color);
  margin-bottom: 1.5rem;
}

.message-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  margin-bottom: 1rem;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.message-name {
  font-weight: 600;
  color: var(--primary-color);
}

.message-time {
  font-size: 0.875rem;
  color: var(--text-muted);
}

.message-content {
  color: var(--text-color);
  line-height: 1.5;
  white-space: pre-wrap;
}

.messages-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.messages-count {
  font-size: 1rem;
  color: var(--text-muted);
}

.loading-messages,
.no-messages {
  text-align: center;
  padding: 2rem;
  color: var(--text-muted);
}

.loading-messages {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

@media (max-width: 768px) {
  .contact-page {
    padding: 1rem;
  }

  .contact-title {
    font-size: 2rem;
  }

  .contact-subtitle {
    font-size: 1rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .social-links {
    grid-template-columns: 1fr;
  }

  .info-item {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .button-group {
    width: 100%;
    flex-direction: column;
  }

  .submit-button,
  .download-button {
    width: 100%;
  }

  .messages-title {
    font-size: 1.25rem;
  }

  .message-item {
    padding: 1rem;
  }
}
</style> 