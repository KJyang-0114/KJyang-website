<template>
  <div class="videos-page">
    <div class="page-header">
      <h1 class="page-title">遊戲精華時刻</h1>
      <p class="page-description">這裡收錄了一些遊戲片段，然後重點是天殺之音的部分:D</p>
    </div>

    <div class="video-gallery">
      <div class="video-grid">
        <div v-for="video in videos" :key="video.url" class="video-card" @click="playVideo(video)">
          <div class="thumbnail-wrapper">
            <img :src="getThumbnailUrl(video.url)" :alt="video.title" class="thumbnail">
            <h3 class="video-title">{{ video.title }}</h3>
          </div>
        </div>
      </div>
    </div>

    <!-- 影片播放模態框 -->
    <div v-if="currentVideo" class="video-modal" @click.self="closeVideo">
      <div class="modal-header">
        <button class="back-button" @click="closeVideo">
          <i class="fas fa-arrow-left"></i>
          返回
        </button>
      </div>
      <div class="video-container">
        <iframe
          v-if="currentVideo"
          class="video-frame"
          :src="getEmbedUrl(currentVideo.url)"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const videos = ref([])
const currentVideo = ref(null)

// 從 JSON 文件加載影片數據
const loadVideos = async () => {
  try {
    const response = await fetch('/videos.json')
    videos.value = await response.json()
  } catch (error) {
    console.error('無法加載影片:', error)
  }
}

// 獲取影片縮圖
const getThumbnailUrl = (url) => {
  const videoId = getVideoId(url)
  return `https://drive.google.com/thumbnail?id=${videoId}`
}

// 獲取嵌入式播放器 URL
const getEmbedUrl = (url) => {
  const videoId = getVideoId(url)
  return `https://drive.google.com/file/d/${videoId}/preview`
}

// 從 Google Drive URL 中提取視頻 ID
const getVideoId = (url) => {
  const match = url.match(/[-\w]{25,}/)
  return match ? match[0] : ''
}

// 播放影片
const playVideo = (video) => {
  currentVideo.value = video
}

// 關閉影片
const closeVideo = () => {
  currentVideo.value = null
}

onMounted(() => {
  loadVideos()
})
</script>

<style scoped>
.videos-page {
  padding: 2rem;
  max-width: 1800px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-description {
  color: var(--text-muted);
  font-size: 1.1rem;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.video-card {
  background: var(--card-background);
  border-radius: var(--border-radius);
  overflow: hidden;
  cursor: pointer;
  transition: all var(--transition-normal);
  position: relative;
}

.video-card:hover {
  transform: translateY(-5px);
}

.thumbnail-wrapper {
  width: 100%;
  aspect-ratio: 16/9;
  position: relative;
  overflow: hidden;
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-normal);
}

.video-card:hover .thumbnail {
  transform: scale(1.05);
}

.video-title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 3rem 1rem 1rem;
  color: var(--text-color);
  font-size: 1rem;
  margin: 0;
  text-align: center;
  font-weight: 500;
  background: linear-gradient(to top, 
    rgba(13, 17, 23, 0.95) 0%,
    rgba(13, 17, 23, 0.8) 50%,
    rgba(13, 17, 23, 0) 100%);
  transform: translateY(100%);
  transition: transform var(--transition-normal);
}

.video-card:hover .video-title {
  transform: translateY(0);
}

/* 影片播放模態框樣式 */
.video-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(13, 17, 23, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-header {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1001;
}

.back-button {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: var(--text-color);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.back-button i {
  font-size: 0.9rem;
}

.video-container {
  width: 100%;
  max-width: 1200px;
  aspect-ratio: 16/9;
  background: transparent;
  border-radius: var(--border-radius);
  overflow: hidden;
  position: relative;
  margin: 0;
}

.video-frame {
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
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

  .video-grid {
    gap: 1rem;
  }

  .video-modal {
    padding: 0;
  }

  .modal-header {
    padding: 0.8rem;
  }

  .video-container {
    border-radius: 0;
  }
}
</style> 