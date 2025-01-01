<template>
  <div class="app">
    <!-- 導航欄 -->
    <nav class="navbar">
      <div class="nav-content">
        <router-link to="/" class="nav-brand">KJyang的小小網站</router-link>
        <div class="nav-links">
          <router-link to="/videos" class="nav-link">遊戲精華時刻</router-link>
          <router-link to="/about" class="nav-link">關於我</router-link>
          <router-link to="/contact" class="nav-link">聯絡我</router-link>
        </div>
      </div>
    </nav>

    <!-- 主要內容 -->
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style>
.app {
  min-height: 100vh;
  background-color: var(--background-color);
}

/* 導航欄樣式 */
.navbar {
  color: white;
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: white;
  white-space: nowrap;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: white;
  opacity: 0.8;
  transition: opacity 0.3s;
  white-space: nowrap;
}

.nav-link:hover {
  opacity: 1;
}

/* 主要內容區域 */
.main-content {
  padding-top: 4rem;
  min-height: calc(100vh - 4rem);
}

/* 過渡動畫 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .nav-content {
    padding: 0 0.5rem;
  }

  .nav-brand {
    font-size: 1.2rem;
  }

  .nav-links {
    gap: 1rem;
  }

  .nav-link {
    font-size: 0.9rem;
  }
}

@media (max-width: 640px) {
  .nav-links {
    gap: 0.5rem;
  }
}
</style>
