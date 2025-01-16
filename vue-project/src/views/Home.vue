<template>
  <div class="home-page">
    <div class="hero-section">
      <div class="profile-container">
        <div class="profile-image">
          <div class="profile-placeholder">
            <span class="profile-emoji">👨‍💻</span>
          </div>
        </div>
        <div class="profile-info">
          <h1 class="profile-title">我是一個熱愛自虐的高中生</h1>
          <p class="profile-subtitle">也就是十分喜歡寫程式自虐:-)</p>
          <p class="profile-description">專長：把簡單的程式碼寫成屎山🗻</p>
          <p class="profile-text">正在努力學習如何讓程式至少能跑起來</p>
          <p class="profile-text">(雖然跑起來可能有點問題，但是身為一個程序員，能跑就是可以用)</p>
        </div>
      </div>
      <div class="scroll-hint" :class="{ 'hidden': isScrolled }">
        <p class="scroll-text">往下滾動查看更多</p>
        <i class="fas fa-chevron-down scroll-icon"></i>
      </div>
    </div>

    <!-- 修改後的專案展示區域 -->
    <div class="projects-section">
      <h2 class="section-title">我的專案</h2>
      <div class="projects-list">
        <div v-for="project in projects" :key="project.id" class="project-card">
          <div class="project-header">
            <h3 class="project-title">{{ project.name }}</h3>
            <div class="project-links">
              <a v-if="project.demo" :href="project.demo" target="_blank" class="project-link">
                <i class="fas fa-external-link-alt"></i>
              </a>
              <a v-if="project.github" :href="project.github" target="_blank" class="project-link">
                <i class="fab fa-github"></i>
              </a>
            </div>
          </div>
          <p class="project-description">{{ project.description }}</p>
          <div class="project-tags">
            <span v-for="tag in project.tags" :key="tag" class="project-tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const projects = ref([
  {
    id: 1,
    name: '個人網站',
    description: '使用 Vue 3 和 Express.js 開發的個人網站，具有留言板和視頻展示功能。深色主題設計，完整的響應式布局，並實作了完整的安全性防護。這是一個開源專案',
    tags: ['Vue 3', 'Express.js', 'Node.js', 'Vuestic UI', 'Open Source'],
    github: 'https://github.com/kjyang-0114/KJyang-website',
    demo: null
  },
  {
    id: 2,
    name: 'BridgeMaster',
    description: '一個優化建橋控制和操作的Minecraft Forge模組 簡稱速疊',
    tags: ['Java', 'Game Development', 'Minecraft Mod', 'Open Source'],
    github: 'https://github.com/KJyang-0114/BridgeMaster',
    demo: null
  },
  {
    id: 3,
    name: 'Element Remover Pro',
    description: '一個 JavaScript 瀏覽器擴充功能，用於移除網頁上不需要的元素。支援點擊選擇要移除的元素，並可以保存設定',
    tags: ['JavaScript', 'Browser Extension', 'DOM Manipulation', 'Open Source'],
    github: 'https://github.com/KJyang-0114/element-remover-pro',
    demo: null
  }
])

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style>
.home-page {
  min-height: 100vh;
  padding: 2rem;
  background-color: var(--background-color);
  display: flex;
  flex-direction: column;
}

.hero-section {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.profile-container {
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  gap: 4rem;
  padding: 3rem;
  background: var(--card-background);
  border-radius: var(--border-radius);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
}

.profile-image {
  flex-shrink: 0;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid rgba(255, 255, 255, 0.1);
  background: radial-gradient(circle at center, var(--primary-color), var(--secondary-color));
}

.profile-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
}

.profile-emoji {
  font-size: 8rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
}

.profile-info {
  flex: 1;
}

.profile-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.profile-subtitle {
  font-size: 1.5rem;
  color: var(--text-muted);
  margin-bottom: 2rem;
}

.profile-description {
  font-size: 1.25rem;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.profile-text {
  font-size: 1.1rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

.projects-section {
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto 4rem;
  padding: 0 2rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  text-align: center;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.projects-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.project-card {
  background: var(--card-background);
  border-radius: var(--border-radius);
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.project-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.project-link {
  color: var(--text-muted);
  font-size: 1.5rem;
  transition: color 0.3s ease;
}

.project-link:hover {
  color: var(--text-color);
}

.project-description {
  font-size: 1.1rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.project-tag {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2rem;
  font-size: 1rem;
  color: var(--text-muted);
}

@media (max-width: 1024px) {
  .profile-container {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
    padding: 2rem;
    padding-bottom: 4rem;
  }

  .profile-image {
    width: 200px;
    height: 200px;
  }

  .profile-title {
    font-size: 2rem;
  }

  .profile-subtitle {
    font-size: 1.25rem;
  }

  .profile-description {
    font-size: 1.1rem;
  }

  .profile-text {
    font-size: 1rem;
  }

  .profile-emoji {
    font-size: 6rem;
  }
}

@media (max-width: 768px) {
  .home-page {
    padding: 1rem;
  }

  .profile-container {
    padding: 1.5rem;
    padding-bottom: 3.5rem;
  }

  .profile-image {
    width: 150px;
    height: 150px;
  }

  .profile-title {
    font-size: 1.75rem;
  }

  .profile-subtitle {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }

  .profile-emoji {
    font-size: 4rem;
  }

  .section-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .project-card {
    padding: 1.5rem;
  }

  .project-title {
    font-size: 1.5rem;
  }

  .project-description {
    font-size: 1rem;
  }

  .project-tag {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }
}

.scroll-hint {
  position: fixed;
  bottom: 10vh;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  animation: bounce 2s infinite;
  transition: opacity 0.3s ease;
  opacity: 1;
}

.scroll-hint.hidden {
  opacity: 0;
  pointer-events: none;
}

.scroll-text {
  font-size: 1.1rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
  opacity: 0.8;
}

.scroll-icon {
  font-size: 1.2rem;
  color: var(--text-muted);
  opacity: 0.8;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}
</style> 