<template>
  <div class="post-page container" style="max-width: 800px; padding-top: 32px; padding-bottom: 48px;">
    <div class="reading-progress" :style="{ width: progress + '%' }"></div>

    <router-link to="/" class="back-link">← 返回首页</router-link>

    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p style="margin-top:12px">加载文章中...</p>
    </div>

    <article v-else-if="post" class="post-article">
      <header class="post-header">
        <div class="post-header-top">
          <span class="card-category">{{ post.category }}</span>
          <span v-if="post.created_at" class="post-date">{{ post.created_at }}</span>
        </div>
        <h1 class="post-title">{{ post.title }}</h1>
        <div v-if="keywords.length" class="post-keywords">
          <span v-for="kw in keywords" :key="kw" class="tag">#{{ kw }}</span>
        </div>
      </header>

      <div class="post-divider"></div>

      <div class="post-content" v-html="post.content_html"></div>

      <div class="post-end">— EOF —</div>
    </article>

    <div v-else class="error-state">
      <span class="icon">😢</span>
      <p>文章未找到</p>
      <router-link to="/" style="color: var(--accent); margin-top:12px; display:inline-block;">返回首页</router-link>
    </div>

    <CommentSection v-if="post" :post-path="post.path" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { getPost } from '../api'
import CommentSection from '../components/CommentSection.vue'

const route = useRoute()
const post = ref(null)
const loading = ref(true)
const progress = ref(0)

const keywords = computed(() => {
  if (!post.value?.keywords) return []
  return post.value.keywords.split(',').slice(0, 8).map(k => k.trim()).filter(Boolean)
})

function onScroll() {
  const h = document.documentElement.scrollHeight - window.innerHeight
  if (h > 0) progress.value = Math.min(100, (window.scrollY / h) * 100)
}

onMounted(async () => {
  window.addEventListener('scroll', onScroll)
  try { post.value = await getPost(route.params.path) }
  catch (e) { console.error('加载文章失败', e) }
  finally { loading.value = false }
})

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.back-link { color: var(--text-secondary); font-size: 0.9rem; display: inline-block; margin-bottom: 20px; transition: var(--transition); }
.back-link:hover { color: var(--accent); }

.post-article {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: 36px 40px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  margin-bottom: 28px;
}
.post-header { margin-bottom: 8px; }
.post-header-top { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
.card-category {
  background: var(--accent-light); color: var(--accent);
  padding: 4px 14px; border-radius: 14px;
  font-weight: 600; font-size: 0.82rem;
}
.post-date { color: var(--text-muted); font-size: 0.85rem; }
.post-title {
  font-family: var(--font-serif);
  font-size: 1.8rem; font-weight: 700;
  line-height: 1.4; margin-bottom: 14px;
}

.post-keywords { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }

.post-divider {
  height: 1px; background: var(--border);
  margin: 24px 0 28px;
}

.post-end { text-align: center; color: var(--text-muted); font-size: 0.9rem; padding: 30px 0 10px; letter-spacing: 2px; }

@media (max-width: 768px) {
  .post-article { padding: 24px 20px; }
  .post-title { font-size: 1.4rem; }
}
</style>
