<template>
  <div class="app">
    <!-- 導航欄 -->
    <nav class="navbar">
      <div class="nav-content">
        <router-link to="/" class="nav-brand">KJyang的小小網站</router-link>
        
        <!-- 電腦端導航連結 -->
        <div class="nav-links desktop-nav">
          <router-link to="/about" class="nav-link">關於我</router-link>
          <router-link to="/contact" class="nav-link">聯絡我</router-link>
          <router-link to="/videos" class="nav-link">遊戲精華時刻</router-link>
        </div>

        <!-- 手機端漢堡選單 -->
        <div class="mobile-nav">
          <button class="menu-button" @click="toggleMenu">
            <i class="fas fa-bars"></i>
          </button>
          <div class="mobile-menu" :class="{ 'is-active': isMenuOpen }">
            <router-link to="/about" class="nav-link" @click="closeMenu">關於我</router-link>
            <router-link to="/contact" class="nav-link" @click="closeMenu">聯絡我</router-link>
            <router-link to="/videos" class="nav-link" @click="closeMenu">遊戲精華時刻</router-link>
          </div>
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
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<style>
.app {
  min-height: 100vh;
  background-color: var(--background-color);
}

/* 導航欄樣式 */
.navbar {
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
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

/* 手機端導航樣式 */
.mobile-nav {
  display: none;
}

.menu-button {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
}

.mobile-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.95);
  padding: 1rem;
  flex-direction: column;
  gap: 1rem;
}

.mobile-menu.is-active {
  display: flex;
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
  .desktop-nav {
    display: none;
  }

  .mobile-nav {
    display: block;
  }

  .nav-content {
    padding: 0.8rem 1rem;
  }

  .nav-brand {
    font-size: 1.2rem;
  }

  .mobile-menu .nav-link {
    padding: 0.5rem 0;
    font-size: 1.1rem;
    text-align: center;
  }
}
</style>
