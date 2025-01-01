<template>
  <div class="videos-page">
    <div class="page-header">
      <h1 class="page-title">遊戲精華時刻</h1>
      <p class="page-description">這裡收錄了一些傻逼遊戲片段，然後重點是天籟之音的部分:D</p>
    </div>
    
    <VideoGallery />
  </div>
</template>

<script setup>
import VideoGallery from '@/components/VideoGallery.vue'
</script>

<style>
.videos-page {
  min-height: 100vh;
  padding: 2rem;
  max-width: 1800px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
  animation: fadeIn 0.5s ease forwards;
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-description {
  font-size: 1.2rem;
  color: var(--text-muted);
  max-width: 600px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .videos-page {
    padding: 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .page-description {
    font-size: 1rem;
  }
}
</style> 