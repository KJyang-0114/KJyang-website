<template>
  <div class="about-page">
    <div class="about-container">
      <div class="about-header">
        <h1 class="about-title">關於我這個程式界的奇葩</h1>
      </div>

      <div class="about-content">
        <div class="about-section">
          <h2 class="section-title">Who am I?</h2>
          <div class="text-content">
            <p>一個來自鶯歌高職資訊科的高中生，</p>
            <p>雖然常常把程式寫成一團亂麻，</p>
            <p>但是我的座右銘是：</p>
            <p class="quote">"不管程式多亂，至少我的心是清晰的" 😎</p>
          </div>
        </div>

        <div class="about-section">
          <h2 class="section-title">正在學習</h2>
          <div class="learning-list">
            <div class="learning-item">
              <div class="item-icon">🍝</div>
              <div class="item-text">如何不讓程式變成一團意大利麵</div>
            </div>
            <div class="learning-item">
              <div class="item-icon">🤔</div>
              <div class="item-text">如何在程式崩潰時優雅地求救</div>
            </div>
            <div class="learning-item">
              <div class="item-icon">😊</div>
              <div class="item-text">如何在 Debug 時保持微笑</div>
            </div>
          </div>
        </div>

        <div class="about-section">
          <h2 class="section-title">我的技能</h2>
          <div class="skills-container">
            <div class="skill-card">
              <div class="skill-icon">🐛</div>
              <div class="skill-title">Bug 製造</div>
              <div class="skill-level">
                <div class="level-bar" style="width: 100%"></div>
              </div>
            </div>
            <div class="skill-card">
              <div class="skill-icon">🔍</div>
              <div class="skill-title">Google 搜尋</div>
              <div class="skill-level">
                <div class="level-bar" style="width: 95%"></div>
              </div>
            </div>
            <div class="skill-card">
              <div class="skill-icon">💻</div>
              <div class="skill-title">複製貼上</div>
              <div class="skill-level">
                <div class="level-bar" style="width: 90%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 可以在這裡添加任何需要的邏輯
</script>

<style>
.about-page {
  min-height: 100vh;
  padding: 2rem;
  background-color: var(--background-color);
}

.about-container {
  max-width: 1200px;
  margin: 0 auto;
  animation: fadeIn 0.5s ease forwards;
}

.about-header {
  text-align: center;
  margin-bottom: 4rem;
}

.about-title {
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}

.about-content {
  display: grid;
  gap: 4rem;
}

.about-section {
  background: var(--card-background);
  border-radius: var(--border-radius);
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.section-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: var(--text-color);
}

.text-content {
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--text-muted);
}

.quote {
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--text-color);
  margin: 2rem 0;
  padding-left: 1rem;
  border-left: 4px solid var(--accent-color);
}

.learning-list {
  display: grid;
  gap: 1.5rem;
}

.learning-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius);
  transition: all var(--transition-normal);
}

.learning-item:hover {
  transform: translateX(10px);
  background: rgba(255, 255, 255, 0.1);
}

.item-icon {
  font-size: 2rem;
}

.item-text {
  font-size: 1.2rem;
  color: var(--text-color);
}

.skills-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.skill-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  text-align: center;
  transition: all var(--transition-normal);
}

.skill-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.1);
}

.skill-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.skill-title {
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.skill-level {
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.level-bar {
  height: 100%;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 4px;
  transition: width 1s ease;
}

@media (max-width: 768px) {
  .about-page {
    padding: 1rem;
  }

  .about-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .text-content {
    font-size: 1rem;
  }

  .quote {
    font-size: 1.2rem;
  }

  .item-icon {
    font-size: 1.5rem;
  }

  .item-text {
    font-size: 1rem;
  }

  .skill-icon {
    font-size: 2rem;
  }

  .skill-title {
    font-size: 1rem;
  }
}
</style> 