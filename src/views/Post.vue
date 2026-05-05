<template>
  <div class="post-page">
    <!-- 阅读进度条 -->
    <div class="reading-progress" :style="{ width: progress + '%' }"></div>

    <router-link to="/" class="back-link">← 返回首页</router-link>

    <!-- 加载中 -->
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>加载文章中...</p>
    </div>

    <!-- 文章内容 -->
    <article v-else-if="post" class="post-article card">
      <header class="post-header">
        <div class="post-header-meta">
          <span class="tag tag-primary">{{ post.category }}</span>
          <span v-if="post.created_at" class="post-date">{{ post.created_at }}</span>
        </div>
        <h1 class="post-title">{{ post.title }}</h1>
        <div v-if="keywords.length" class="post-keywords">
          <span v-for="kw in keywords" :key="kw" class="tag tag-outline">{{ kw }}</span>
        </div>
      </header>

      <div class="post-divider"></div>

      <div class="post-content" v-html="post.content_html"></div>

      <div class="post-footer">
        <p class="post-end-mark">— EOF —</p>
      </div>
    </article>

    <!-- 未找到 -->
    <div v-else class="error-state">
      <span class="error-icon">😢</span>
      <p>文章未找到</p>
      <router-link to="/" class="btn btn-outline">返回首页</router-link>
    </div>

    <!-- 评论 -->
    <CommentSection v-if="post" :post-path="post.path" />

    <!-- 返回按钮 -->
    <div class="post-nav">
      <router-link to="/" class="btn btn-outline">← 返回首页</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getPost } from '../api'
import CommentSection from '../components/CommentSection.vue'

const route = useRoute()
const post = ref(null)
const loading = ref(true)
const progress = ref(0)

const keywords = computed(() => {
  if (!post.value?.keywords) return []
  return post.value.keywords.split(',').slice(0, 8).filter(Boolean)
})

function onScroll() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  if (docHeight > 0) {
    progress.value = Math.min(100, (scrollTop / docHeight) * 100)
  }
}

onMounted(async () => {
  window.addEventListener('scroll', onScroll)
  try {
    const fullPath = route.params.path
    post.value = await getPost(fullPath)
  } catch (e) {
    console.error('加载文章失败', e)
  } finally {
    loading.value = false
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.loading-state {
  text-align: center;
  padding: 80px 20px;
  color: var(--text-light);
}

.error-state {
  text-align: center;
  padding: 80px 20px;
}

.error-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 12px;
}

.error-state p {
  color: var(--text-light);
  margin-bottom: 20px;
}

/* 文章卡片 */
.post-article {
  padding: 32px;
  animation: fadeInUp 0.5s ease;
}

.post-header {
  margin-bottom: 8px;
}

.post-header-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.post-date {
  color: var(--text-muted);
  font-size: 13px;
}

.post-title {
  font-size: 28px;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 14px;
}

.post-keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
}

.post-divider {
  height: 2px;
  background: linear-gradient(90deg, var(--sakura-light), var(--sky-light), transparent);
  margin: 24px 0 28px;
}

.post-footer {
  text-align: center;
  padding: 30px 0 10px;
}

.post-end-mark {
  color: var(--text-muted);
  font-size: 14px;
  letter-spacing: 2px;
}

.post-nav {
  text-align: center;
  padding: 10px 0 30px;
}

@media (max-width: 768px) {
  .post-article {
    padding: 20px;
  }

  .post-title {
    font-size: 22px;
  }
}

@media (max-width: 480px) {
  .post-article {
    padding: 16px;
  }

  .post-title {
    font-size: 20px;
  }
}
</style>
