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
    </div>
  </div>
</template>

<style>
.home-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: var(--background-color);
}

.hero-section {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  animation: fadeIn 0.5s ease forwards;
}

.profile-container {
  display: flex;
  align-items: center;
  gap: 4rem;
  padding: 3rem;
  background: var(--card-background);
  border-radius: var(--border-radius);
  border: 1px solid rgba(255, 255, 255, 0.1);
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

.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

@media (max-width: 1024px) {
  .profile-container {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
    padding: 2rem;
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
}
</style> 