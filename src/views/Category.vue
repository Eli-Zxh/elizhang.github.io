<template>
  <div class="category-page container" style="max-width: 800px; padding-top: 32px; padding-bottom: 48px;">
    <router-link to="/" class="back-link">← 返回首页</router-link>

    <header class="page-header">
      <h1 class="page-title">{{ category }}</h1>
      <p class="post-count">共 {{ total }} 篇文章</p>
    </header>

    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p style="margin-top:12px">加载文章中...</p>
    </div>

    <div v-else-if="posts.length" class="post-list">
      <PostCard v-for="post in posts" :key="post.path" :post="post" />

      <div v-if="hasMore" style="text-align:center; padding-top:8px;">
        <button class="load-more-btn" @click="loadMore">加载更多文章</button>
      </div>
    </div>

    <div v-else class="empty-state">
      <span class="icon">📭</span>
      <p>该分类下暂无文章</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getPosts } from '../api'
import PostCard from '../components/PostCard.vue'

const props = defineProps({ name: String })

const category = ref(props.name)
const posts = ref([])
const total = ref(0)
const page = ref(1)
const loading = ref(true)
const hasMore = ref(false)

async function loadPosts() {
  try {
    const result = await getPosts(category.value, page.value)
    posts.value.push(...result.items)
    total.value = result.total
    hasMore.value = posts.value.length < result.total
  } catch (e) { console.error('加载失败', e) }
  finally { loading.value = false }
}

function loadMore() { page.value++; loadPosts() }

onMounted(loadPosts)
</script>

<style scoped>
.back-link { color: var(--text-secondary); font-size: 0.9rem; display: inline-block; margin-bottom: 20px; transition: var(--transition); }
.back-link:hover { color: var(--accent); }

.page-header { margin-bottom: 28px; }
.page-title {
  font-family: var(--font-serif); font-size: 1.8rem; font-weight: 700;
  margin-bottom: 6px;
}
.post-count { color: var(--text-muted); font-size: 0.9rem; }
.post-list { display: flex; flex-direction: column; gap: 22px; }

.load-more-btn {
  padding: 12px 36px; border: 2px solid var(--border);
  background: var(--card-bg); color: var(--text-secondary);
  border-radius: 28px; cursor: pointer; font-size: 0.9rem;
  font-weight: 500; transition: var(--transition);
}
.load-more-btn:hover { border-color: var(--accent); color: var(--accent); box-shadow: var(--shadow-sm); }

@media (max-width: 600px) {
  .page-title { font-size: 1.4rem; }
}
</style>
