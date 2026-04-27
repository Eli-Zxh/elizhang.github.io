<template>
  <div class="post-page">
    <router-link to="/" class="back-link">&larr; 返回首页</router-link>

    <div v-if="loading" class="loading-text">加载中...</div>

    <article v-else-if="post" class="card">
      <header class="post-header">
        <h1 class="post-title">{{ post.title }}</h1>
        <div class="post-meta">
          <span class="tag">{{ post.category }}</span>
          <span v-if="post.created_at" class="post-date">{{ post.created_at }}</span>
        </div>
      </header>
      <div class="post-content" v-html="post.content_html"></div>
    </article>

    <div v-else class="error-text">文章未找到</div>

    <CommentSection v-if="post" :post-path="post.path" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getPost } from '../api'
import CommentSection from '../components/CommentSection.vue'

const route = useRoute()
const post = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const fullPath = route.params.path
    post.value = await getPost(fullPath)
  } catch (e) {
    console.error('加载文章失败', e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.back-link {
  color: var(--sky-blue);
  text-decoration: none;
  font-size: 14px;
  display: inline-block;
  margin-bottom: 16px;
}

.loading-text, .error-text {
  text-align: center;
  color: var(--text-light);
  padding: 40px;
}

.post-header {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.post-title {
  font-size: 24px;
  line-height: 1.4;
  margin-bottom: 12px;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.post-date {
  color: var(--text-light);
  font-size: 13px;
}
</style>
