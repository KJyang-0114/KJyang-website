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

        <!-- 手機端下拉選單 -->
        <div class="mobile-nav">
          <button class="menu-button" @click="toggleMenu">
            更多 <i class="fas fa-chevron-down" :class="{ 'rotate': isMenuOpen }"></i>
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
  height: 4rem;
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
  height: 100%;
}

.nav-brand {
  font-size: 1.4rem;
  font-weight: 600;
  text-decoration: none;
  color: white;
  white-space: nowrap;
  letter-spacing: 1px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  font-family: "PingFang TC", "Microsoft JhengHei", sans-serif;
  transition: opacity 0.3s;
}

.nav-brand:hover {
  opacity: 0.9;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: white;
  opacity: 0.8;
  transition: opacity 0.3s;
  white-space: nowrap;
  font-size: 1.1rem;
}

.nav-link:hover {
  opacity: 1;
}

/* 手機端導航樣式 */
.mobile-nav {
  display: none;
  position: relative;
}

.menu-button {
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.menu-button:hover {
  opacity: 1;
}

.menu-button .fa-chevron-down {
  transition: transform 0.3s ease;
}

.menu-button .rotate {
  transform: rotate(180deg);
}

.mobile-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  min-width: 150px;
  border-radius: 0.5rem;
  overflow: hidden;
  opacity: 0;
  transform: translateY(-10px);
  pointer-events: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.mobile-menu.is-active {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.mobile-menu .nav-link {
  padding: 0.75rem 1.5rem;
  display: block;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-menu .nav-link:last-child {
  border-bottom: none;
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
    padding: 0 1rem;
  }

  .nav-brand {
    font-size: 1.1rem;
    letter-spacing: 0.5px;
    text-shadow: none;
  }

  .main-content {
    padding-top: 3.5rem;
    min-height: calc(100vh - 3.5rem);
  }
}
</style>
