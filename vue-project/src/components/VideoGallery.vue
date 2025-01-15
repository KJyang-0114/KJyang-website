<template>
  <div class="video-gallery">
    <div class="video-grid">
      <div class="video-item" v-for="video in videos" :key="video.title">
        <div class="video-card" @click="playVideo(video)">
          <div class="thumbnail-wrapper">
            <img :src="getThumbnail(video.url)" :alt="video.title" class="thumbnail">
          </div>
          <h3 class="video-title">{{ video.title }}</h3>
        </div>
      </div>
    </div>

    <!-- 視頻播放彈窗 -->
    <va-modal
      v-model="showVideo"
      hide-default-actions
      class="video-modal"
      :fullscreen="true"
      @click:outside="closeVideo"
    >
      <div class="video-player">
        <div class="video-header">
          <div class="video-controls">
            <va-button
              class="back-button"
              @click="closeVideo"
            >
              <i class="fas fa-arrow-left"></i>
              <span>返回</span>
            </va-button>
          </div>
        </div>
        <div class="video-wrapper" v-if="currentVideo">
          <iframe
            :src="getVideoEmbedUrl(currentVideo.url)"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            referrerpolicy="no-referrer"
            loading="lazy"
            importance="high"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation allow-popups-to-escape-sandbox"
            style="border: none;"
          ></iframe>
        </div>
      </div>
    </va-modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import videoData from '@/data/videos.json'

const showVideo = ref(false)
const currentVideo = ref(null)
const videos = ref([])

// 從 JSON 文件加載影片數據
const loadVideos = () => {
  videos.value = videoData.videos
}

onMounted(() => {
  loadVideos()
})

const getThumbnail = (url) => {
  const videoId = url.match(/\/d\/([^/]+)/)?.[1]
  return videoId ? `https://drive.google.com/thumbnail?id=${videoId}` : ''
}

const getVideoEmbedUrl = (url) => {
  const videoId = url.match(/\/d\/([^/]+)/)?.[1]
  return videoId ? `https://drive.google.com/file/d/${videoId}/preview?usp=drivesdk` : ''
}

const playVideo = (video) => {
  currentVideo.value = video
  showVideo.value = true
}

const closeVideo = () => {
  showVideo.value = false
  currentVideo.value = null
}
</script>

<style>
.video-gallery {
  width: 100%;
  min-height: 100vh;
  background: var(--background-color);
  padding: 2rem;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1800px;
  margin: 0 auto;
}

.video-item {
  display: flex;
  flex-direction: column;
}

.video-card {
  background: var(--card-background);
  border-radius: var(--border-radius);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
}

.video-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.thumbnail-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.video-card:hover .thumbnail {
  transform: scale(1.1);
}

.video-title {
  padding: 1.2rem;
  color: var(--text-color);
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  margin: 0;
  background: var(--card-background);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  letter-spacing: 0.5px;
}

.video-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--background-color);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 0;
  margin: 0;
}

.video-player {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--background-color);
  position: relative;
  padding: 0;
  margin: 0;
}

.video-header {
  position: fixed;
  top: 5rem;
  right: 2rem;
  z-index: 1001;
}

.video-title-bar {
  flex: 1;
  margin-right: 2rem;
}

.modal-video-title {
  color: white;
  font-size: 1.2rem;
  margin: 0;
}

.video-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.back-button {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: var(--text-color);
  padding: 0.8rem 1.5rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all var(--transition-normal);
  font-size: 1rem;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.close-button {
  width: 40px !important;
  height: 40px !important;
  border-radius: 50% !important;
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: white !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-normal);
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.2) !important;
  transform: rotate(90deg);
}

.close-icon {
  font-size: 1.2rem;
  color: white;
}

.video-wrapper {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: var(--background-color);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-wrapper iframe {
  width: 95vw;
  height: 95vh;
  border: none;
  background: var(--background-color);
}

@media (max-width: 768px) {
  .video-header {
    top: 4rem;
    right: 1rem;
  }

  .back-button {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }

  .video-wrapper iframe {
    width: 100vw;
    height: 100vh;
  }
}
</style> 