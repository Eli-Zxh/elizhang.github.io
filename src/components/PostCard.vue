<template>
  <article class="article-card" @click="$router.push(`/post/${post.path}`)">
    <div class="card-meta">
      <span class="card-category">{{ post.category }}</span>
      <span v-if="post.created_at" class="card-date">📅 {{ formatDate(post.created_at) }}</span>
      <span class="card-read-time">⏱ {{ readTime }}</span>
    </div>
    <h3>{{ post.title }}</h3>
    <div v-if="keywords.length" class="card-tags">
      <span v-for="kw in keywords" :key="kw" class="tag" @click.stop="$emit('tagClick', kw)">#{{ kw }}</span>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  post: { type: Object, required: true }
})

defineEmits(['tagClick'])

const keywords = computed(() => {
  if (!props.post.keywords) return []
  return props.post.keywords.split(',').slice(0, 5).map(k => k.trim()).filter(Boolean)
})

const readTime = computed(() => {
  const kw = keywords.value.length
  if (kw > 15) return '15+ 分钟'
  if (kw > 8) return '8 分钟'
  return '5 分钟'
})

function formatDate(dateStr) {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  } catch { return dateStr }
}
</script>

<style scoped>
.article-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 24px 26px;
  border: 1px solid var(--border);
  transition: var(--transition);
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  animation: fadeInUp 0.5s ease forwards;
}
.article-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
  border-color: #d9d1c7;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.card-category {
  background: var(--accent-light);
  color: var(--accent);
  padding: 3px 12px;
  border-radius: 14px;
  font-weight: 600;
  font-size: 0.78rem;
  letter-spacing: 0.02em;
}

.card-date {
  display: flex;
  align-items: center;
  gap: 4px;
}
.card-read-time {
  display: flex;
  align-items: center;
  gap: 4px;
}

h3 {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 6px;
  line-height: 1.4;
  transition: var(--transition);
  letter-spacing: 0.02em;
}
.article-card:hover h3 { color: var(--accent); }

.card-tags {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  flex-wrap: wrap;
}
.card-tags .tag {
  cursor: pointer;
  transition: var(--transition);
}
.card-tags .tag:hover {
  background: #e5ddd4;
  color: #5c4f42;
}

@media (max-width: 600px) {
  .article-card { padding: 18px; }
  h3 { font-size: 1.05rem; }
}
</style>
