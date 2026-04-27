<template>
  <div class="category-page">
    <router-link to="/" class="back-link">&larr; 返回首页</router-link>
    <h1 class="page-title">{{ category }}</h1>
    <p class="post-count">共 {{ total }} 篇笔记</p>

    <div v-if="loading" class="loading-text">加载中...</div>
    <div v-else>
      <PostCard v-for="post in posts" :key="post.path" :post="post" />

      <div v-if="hasMore" class="load-more">
        <button class="btn btn-primary" @click="loadMore">加载更多</button>
      </div>
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
.back-link {
  color: var(--sky-blue);
  text-decoration: none;
  font-size: 14px;
  display: inline-block;
  margin-bottom: 16px;
}

.page-title {
  font-size: 26px;
  margin-bottom: 4px;
}

.post-count {
  color: var(--text-light);
  font-size: 14px;
  margin-bottom: 20px;
}

.loading-text {
  text-align: center;
  color: var(--text-light);
  padding: 40px;
}

.load-more {
  text-align: center;
  padding: 20px;
}
</style>
