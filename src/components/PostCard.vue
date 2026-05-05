<template>
  <router-link :to="`/post/${post.path}`" class="post-card card">
    <div class="post-card-body">
      <div class="post-card-top">
        <span class="post-category tag">{{ post.category }}</span>
        <span v-if="post.created_at" class="post-date">{{ formatDate(post.created_at) }}</span>
      </div>
      <h3 class="post-title">{{ post.title }}</h3>
      <div class="post-meta">
        <span v-for="kw in keywords" :key="kw" class="tag tag-outline">{{ kw }}</span>
      </div>
    </div>
    <div class="post-card-arrow">
      <span>→</span>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  post: { type: Object, required: true }
})

const keywords = computed(() => {
  if (!props.post.keywords) return []
  return props.post.keywords.split(',').slice(0, 5).filter(Boolean)
})

function formatDate(dateStr) {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr)
    const month = d.getMonth() + 1
    const day = d.getDate()
    return `${month}月${day}日`
  } catch {
    return dateStr
  }
}
</script>

<style scoped>
.post-card {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  padding: 18px 20px;
  transition: all var(--transition);
}

.post-card:hover {
  padding-left: 26px;
}

.post-card-body {
  flex: 1;
  min-width: 0;
}

.post-card-top {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.post-category {
  font-size: 12px;
}

.post-date {
  font-size: 12px;
  color: var(--text-muted);
}

.post-title {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 1.5;
  color: var(--text-dark);
  /* 两行省略 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.post-card-arrow {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--sakura-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: var(--sakura-deep);
  opacity: 0;
  transform: translateX(-8px);
  transition: all var(--transition);
}

.post-card:hover .post-card-arrow {
  opacity: 1;
  transform: translateX(0);
}

@media (max-width: 480px) {
  .post-card {
    padding: 14px 16px;
  }

  .post-title {
    font-size: 15px;
  }
}
</style>
