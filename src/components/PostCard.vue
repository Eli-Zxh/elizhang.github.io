<template>
  <router-link :to="`/post/${post.path}`" class="post-card card">
    <h3 class="post-title">{{ post.title }}</h3>
    <div class="post-meta">
      <span class="tag" v-for="kw in keywords" :key="kw">{{ kw }}</span>
    </div>
    <div class="post-arrow">&gt;</div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  post: { type: Object, required: true }
})

const keywords = computed(() => {
  if (!props.post.keywords) return []
  return props.post.keywords.split(',').slice(0, 4).filter(Boolean)
})
</script>

<style scoped>
.post-card {
  display: block;
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
}

.post-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, var(--sakura-pink), var(--sky-blue));
  border-radius: 0 3px 3px 0;
  opacity: 0;
  transition: opacity 0.3s;
}

.post-card:hover::before {
  opacity: 1;
}

.post-title {
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 10px;
  line-height: 1.4;
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.post-arrow {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--sakura-pink);
  font-size: 18px;
  opacity: 0;
  transition: opacity 0.3s;
}

.post-card:hover .post-arrow {
  opacity: 1;
}
</style>
