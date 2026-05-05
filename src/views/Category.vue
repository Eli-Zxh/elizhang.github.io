<template>
  <div class="category-page">
    <router-link to="/" class="back-link">← 返回首页</router-link>

    <header class="page-header">
      <h1 class="page-title">
        <span class="cat-emoji">{{ catIcon }}</span>
        {{ category }}
      </h1>
      <p class="post-count">共 {{ total }} 篇笔记</p>
    </header>

    <!-- 加载中 -->
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>加载笔记中...</p>
    </div>

    <!-- 文章列表 -->
    <div v-else>
      <div v-if="posts.length > 0">
        <PostCard v-for="post in posts" :key="post.path" :post="post" />

        <div v-if="hasMore" class="load-more">
          <button class="btn btn-primary" @click="loadMore">
            加载更多
          </button>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-else class="empty-state">
        <span class="empty-icon">📭</span>
        <p>该分类下还没有笔记</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getPosts } from '../api'
import PostCard from '../components/PostCard.vue'

const props = defineProps({ name: String })

const category = ref(props.name)
const posts = ref([])
const total = ref(0)
const page = ref(1)
const loading = ref(true)
const hasMore = ref(false)

const iconMap = {
  '内科学': '🫀',
  '外科学': '🔪',
  '生理学': '🧬',
  '生物化学': '🧪',
  '病理学': '🔬',
  '英语': '📝',
  '政治': '📜',
}

const catIcon = computed(() => iconMap[category.value] || '📋')

async function loadPosts() {
  try {
    const result = await getPosts(category.value, page.value)
    posts.value.push(...result.items)
    total.value = result.total
    hasMore.value = posts.value.length < result.total
  } catch (e) {
    console.error('加载文章列表失败', e)
  } finally {
    loading.value = false
  }
}

function loadMore() {
  page.value++
  loadPosts()
}

onMounted(loadPosts)
</script>

<style scoped>
.page-header {
  margin-bottom: 24px;
  padding: 20px 24px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: var(--radius);
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.page-title {
  font-size: 26px;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.cat-emoji {
  font-size: 30px;
}

.post-count {
  color: var(--text-light);
  font-size: 14px;
}

.loading-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-light);
}

.load-more {
  text-align: center;
  padding: 10px 0 30px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-light);
}

.empty-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 12px;
}

@media (max-width: 480px) {
  .page-header {
    padding: 16px 18px;
  }

  .page-title {
    font-size: 22px;
  }
}
</style>
