<template>
  <div class="home-page">
    <header class="hero">
      <div class="hero-icon floating"></div>
      <h1 class="hero-title">啃书笔记</h1>
      <p class="hero-sub">那些啃书的日子，闪闪发光</p>
    </header>

    <SearchBox />

    <h2 class="section-label">笔记分类</h2>
    <div class="category-grid">
      <router-link
        v-for="cat in categories"
        :key="cat.name"
        :to="`/category/${cat.name}`"
        class="category-card card"
      >
        <span class="cat-emoji">{{ getIcon(cat.name) }}</span>
        <div class="cat-info">
          <span class="cat-name">{{ cat.name }}</span>
          <span class="cat-count">{{ cat.count }} 篇</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getCategories } from '../api'
import SearchBox from '../components/SearchBox.vue'

const categories = ref([])

const icons = {
  '内科学': '',
  '外科学': '',
  '生理学': '',
  '生物化学': '',
  '病理学': '',
  '英语': '',
  '政治': '',
}

function getIcon(name) {
  return icons[name] || ''
}

onMounted(async () => {
  try {
    categories.value = await getCategories()
  } catch (e) {
    console.error('加载分类失败', e)
  }
})
</script>

<style scoped>
.hero {
  text-align: center;
  padding: 40px 20px 30px;
}

.hero-icon {
  font-size: 48px;
  margin-bottom: 10px;
}

.hero-title {
  font-size: 32px;
  background: linear-gradient(135deg, var(--sakura-pink), var(--sky-blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 6px;
}

.hero-sub {
  color: var(--text-light);
  font-size: 15px;
}

.section-label {
  font-size: 18px;
  margin-bottom: 14px;
  padding-left: 10px;
  border-left: 3px solid var(--sakura-pink);
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 14px;
}

.category-card {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: inherit;
}

.cat-emoji {
  font-size: 28px;
}

.cat-info {
  display: flex;
  flex-direction: column;
}

.cat-name {
  font-weight: 600;
  font-size: 16px;
}

.cat-count {
  font-size: 13px;
  color: var(--text-light);
}
</style>
