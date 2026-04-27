<template>
  <div class="search-page">
    <router-link to="/" class="back-link">&larr; 返回首页</router-link>
    <h1 class="page-title">搜索笔记</h1>

    <SearchBox />

    <div v-if="searched && results.length === 0" class="empty-hint">
      没有找到相关笔记
    </div>

    <div v-if="results.length > 0">
      <p class="search-info">找到 {{ total }} 篇相关笔记</p>
      <PostCard v-for="item in results" :key="item.path" :post="item" />
    </div>

    <div v-if="hasMore" class="load-more">
      <button class="btn btn-primary" @click="loadMore">加载更多</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { searchPosts } from '../api'
import SearchBox from '../components/SearchBox.vue'
import PostCard from '../components/PostCard.vue'

const route = useRoute()
const results = ref([])
const total = ref(0)
const page = ref(1)
const searched = ref(false)
const hasMore = ref(false)

async function doSearch() {
  const q = route.query.q
  if (!q) return
  page.value = 1
  results.value = []
  searched.value = true
  try {
    const result = await searchPosts(q, page.value)
    results.value = result.items
    total.value = result.total
    hasMore.value = results.value.length < result.total
  } catch (e) {
    console.error('搜索失败', e)
  }
}

async function loadMore() {
  page.value++
  try {
    const result = await searchPosts(route.query.q, page.value)
    results.value.push(...result.items)
    hasMore.value = results.value.length < result.total
  } catch (e) {
    console.error('加载更多失败', e)
  }
}

onMounted(doSearch)
watch(() => route.query.q, doSearch)
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
  font-size: 24px;
  margin-bottom: 20px;
}

.empty-hint {
  text-align: center;
  color: var(--text-light);
  padding: 40px;
  font-size: 15px;
}

.search-info {
  color: var(--text-light);
  font-size: 14px;
  margin-bottom: 16px;
}

.load-more {
  text-align: center;
  padding: 20px;
}
</style>
