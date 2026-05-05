<template>
  <div class="home-page">
    <!-- Hero 区域 -->
    <section class="hero-section">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <div class="hero-avatar floating">📖</div>
        <h1 class="hero-title">啃书笔记</h1>
        <div class="hero-typing">
          <span class="typing-text">{{ typedText }}</span>
          <span class="typing-cursor">|</span>
        </div>
        <p class="hero-sub">那些啃书的日子，闪闪发光</p>
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-num">{{ totalPosts }}</span>
            <span class="stat-label">篇笔记</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-num">{{ categories.length }}</span>
            <span class="stat-label">个分类</span>
          </div>
        </div>
        <a href="#category-section" class="scroll-hint">
          <span class="scroll-arrow floating-delayed">↓</span>
        </a>
      </div>

      <!-- 波浪 SVG -->
      <svg class="wave-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none">
        <defs>
          <path id="wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
        </defs>
        <g class="wave-parallax">
          <use href="#wave" x="50" y="0" fill="rgba(255,255,255,0.6)"></use>
          <use href="#wave" x="50" y="3" fill="rgba(255,255,255,0.8)"></use>
          <use href="#wave" x="50" y="6" fill="rgba(255,255,255,1)"></use>
        </g>
      </svg>
    </section>

    <!-- 搜索区域 -->
    <div class="container">
      <SearchBox />

      <!-- 分类区域 -->
      <section id="category-section">
        <h2 class="section-title">
          📂 笔记分类
          <span class="section-subtitle">按科目整理，方便查找</span>
        </h2>
        <div class="category-grid">
          <router-link
            v-for="cat in categories"
            :key="cat.name"
            :to="`/category/${cat.name}`"
            class="category-card card"
          >
            <div class="cat-icon-wrap">
              <span class="cat-emoji">{{ getIcon(cat.name) }}</span>
            </div>
            <div class="cat-info">
              <span class="cat-name">{{ cat.name }}</span>
              <span class="cat-count">{{ cat.count }} 篇笔记</span>
            </div>
            <span class="cat-arrow">→</span>
          </router-link>
        </div>
      </section>

      <!-- 页脚信息 -->
      <div class="home-footer-info">
        <p>📝 持续更新中，一起加油</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getCategories } from '../api'
import { useTyped } from '../composables/useTyped'
import SearchBox from '../components/SearchBox.vue'

const categories = ref([])
const totalPosts = ref(0)

const iconMap = {
  '内科学': '🫀',
  '外科学': '🔪',
  '生理学': '🧬',
  '生物化学': '🧪',
  '病理学': '🔬',
  '英语': '📝',
  '政治': '📜',
}

function getIcon(name) {
  return iconMap[name] || '📋'
}

const { currentText: typedText, start: startTyped } = useTyped(
  ['欢迎来到我的学习笔记', '记录啃书的每一天', '知识就是力量', '点击分类开始阅读吧~'],
  { typeSpeed: 80, backSpeed: 50, backDelay: 2500 }
)

onMounted(async () => {
  startTyped()
  try {
    const cats = await getCategories()
    categories.value = cats
    totalPosts.value = cats.reduce((sum, c) => sum + c.count, 0)
  } catch (e) {
    console.error('加载分类失败', e)
  }
})
</script>

<style scoped>
/* ===== Hero ===== */
.hero-section {
  position: relative;
  min-height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 10px;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    160deg,
    var(--sakura-light) 0%,
    var(--cream) 30%,
    var(--sky-light) 60%,
    var(--lavender-light) 100%
  );
}

/* 装饰圆 */
.hero-bg::before {
  content: '';
  position: absolute;
  top: -80px;
  right: -60px;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(255, 183, 197, 0.3), transparent 70%);
  border-radius: 50%;
}

.hero-bg::after {
  content: '';
  position: absolute;
  bottom: -40px;
  left: -40px;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(135, 206, 235, 0.3), transparent 70%);
  border-radius: 50%;
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 60px 20px 30px;
}

.hero-avatar {
  font-size: 56px;
  margin-bottom: 12px;
  display: inline-block;
  filter: drop-shadow(0 4px 8px rgba(255, 183, 197, 0.4));
}

.hero-title {
  font-size: 42px;
  font-weight: 700;
  background: linear-gradient(135deg, var(--sakura-deep), var(--sky-deep));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
  letter-spacing: 2px;
}

.hero-typing {
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  margin-bottom: 12px;
}

.typing-text {
  font-size: 18px;
  color: var(--text-medium);
  font-family: var(--font-main);
}

.typing-cursor {
  font-size: 20px;
  color: var(--sakura-pink);
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.hero-sub {
  color: var(--text-light);
  font-size: 15px;
  margin-bottom: 24px;
}

/* 统计 */
.hero-stats {
  display: inline-flex;
  align-items: center;
  gap: 20px;
  padding: 12px 28px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: var(--radius-full);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.9);
}

.stat-item {
  text-align: center;
}

.stat-num {
  display: block;
  font-size: 22px;
  font-weight: 700;
  color: var(--sakura-deep);
  line-height: 1.2;
}

.stat-label {
  font-size: 12px;
  color: var(--text-light);
}

.stat-divider {
  width: 1px;
  height: 30px;
  background: var(--sakura-light);
}

/* 滚动提示 */
.scroll-hint {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
}

.scroll-arrow {
  font-size: 24px;
  color: var(--sakura-pink);
  opacity: 0.6;
  display: block;
}

/* 波浪 */
.wave-svg {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80px;
  z-index: 2;
  pointer-events: none;
}

.wave-parallax > use {
  animation: wave-move 10s linear infinite;
}

.wave-parallax > use:nth-child(2) {
  animation-duration: 6s;
  animation-delay: -2s;
}

.wave-parallax > use:nth-child(3) {
  animation-duration: 4s;
  animation-delay: -4s;
}

@keyframes wave-move {
  0% { transform: translate(-90px, 0); }
  100% { transform: translate(85px, 0); }
}

/* ===== 分类区域 ===== */
#category-section {
  padding-top: 10px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 14px;
  margin-bottom: 20px;
}

.category-card {
  display: flex;
  align-items: center;
  gap: 14px;
  text-decoration: none;
  color: inherit;
  padding: 18px 16px;
  position: relative;
  overflow: visible;
}

.cat-icon-wrap {
  width: 46px;
  height: 46px;
  border-radius: var(--radius-sm);
  background: linear-gradient(135deg, var(--sakura-light), var(--sky-light));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.cat-emoji {
  font-size: 22px;
}

.cat-info {
  flex: 1;
  min-width: 0;
}

.cat-name {
  display: block;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 2px;
}

.cat-count {
  font-size: 13px;
  color: var(--text-light);
}

.cat-arrow {
  color: var(--sakura-pink);
  font-size: 16px;
  opacity: 0;
  transition: all var(--transition);
}

.category-card:hover .cat-arrow {
  opacity: 1;
  transform: translateX(4px);
}

.category-card:hover .cat-icon-wrap {
  transform: scale(1.1);
}

.cat-icon-wrap {
  transition: transform var(--transition);
}

/* 页脚信息 */
.home-footer-info {
  text-align: center;
  padding: 30px 0;
  color: var(--text-light);
  font-size: 14px;
}

/* 响应式 */
@media (max-width: 768px) {
  .hero-section {
    min-height: 340px;
  }

  .hero-title {
    font-size: 32px;
  }

  .typing-text {
    font-size: 16px;
  }

  .hero-avatar {
    font-size: 42px;
  }

  .category-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    min-height: 300px;
  }

  .hero-title {
    font-size: 28px;
  }

  .category-grid {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .category-card {
    padding: 14px 12px;
    gap: 10px;
  }

  .cat-icon-wrap {
    width: 38px;
    height: 38px;
  }

  .cat-emoji {
    font-size: 18px;
  }
}
</style>
