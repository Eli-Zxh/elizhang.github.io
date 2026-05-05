<template>
  <div class="search-page">
    <router-link to="/" class="back-link">← 返回首页</router-link>

    <div class="page-header">
      <h1 class="page-title">🔍 搜索笔记</h1>
      <p class="page-desc">输入关键词，查找你的学习笔记</p>
    </div>

    <SearchBox />

    <!-- 搜索结果 -->
    <div v-if="searching" class="loading-state">
      <div class="loading-spinner"></div>
      <p>搜索中...</p>
    </div>

    <div v-else-if="searched">
      <div v-if="results.length > 0" class="results-section">
        <p class="results-info">
          找到 <strong>{{ total }}</strong> 篇与 "<strong>{{ route.query.q }}</strong>" 相关的笔记
        </p>
        <PostCard v-for="item in results" :key="item.path" :post="item" />

        <div v-if="hasMore" class="load-more">
          <button class="btn btn-primary" @click="loadMore" :disabled="loadingMore">
            {{ loadingMore ? '加载中...' : '加载更多' }}
          </button>
        </div>
      </div>

      <div v-else class="empty-state">
        <span class="empty-icon">🔎</span>
        <p>没有找到与 "<strong>{{ route.query.q }}</strong>" 相关的笔记</p>
        <p class="empty-hint">试试其他关键词吧</p>
      </div>
    </div>

    <!-- 初始状态 -->
    <div v-else class="empty-state">
      <span class="empty-icon">📝</span>
      <p>输入关键词搜索笔记</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { searchPosts } from '../api'
import SearchBox from '../components/SearchBox.vue'
import PostCard from '../components/PostCard.vue'

const route = useRoute()
const results = ref([])
const total = ref(0)
const page = ref(1)
const searched = ref(false)
const searching = ref(false)
const loadingMore = ref(false)
const hasMore = ref(false)

async function doSearch() {
  const q = route.query.q
  if (!q) return
  page.value = 1
  results.value = []
  searched.value = true
  searching.value = true
  try {
    const result = await searchPosts(q, page.value)
    results.value = result.items
    total.value = result.total
    hasMore.value = results.value.length < result.total
  } catch (e) {
    console.error('搜索失败', e)
  } finally {
    searching.value = false
  }
}

async function loadMore() {
  if (loadingMore.value) return
  loadingMore.value = true
  page.value++
  try {
    const result = await searchPosts(route.query.q, page.value)
    results.value.push(...result.items)
    hasMore.value = results.value.length < result.total
  } catch (e) {
    console.error('加载更多失败', e)
  } finally {
    loadingMore.value = false
  }
}

// 监听 query 变化
watch(
  () => route.query.q,
  (newQ) => {
    if (newQ) doSearch()
  },
  { immediate: true }
)
</script>

<style scoped>
.page-header {
  margin-bottom: 8px;
}

.page-title {
  font-size: 26px;
  margin-bottom: 6px;
}

.page-desc {
  color: var(--text-light);
  font-size: 14px;
}

.loading-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-light);
}

.results-section {
  margin-top: 4px;
}

.results-info {
  color: var(--text-medium);
  font-size: 14px;
  margin-bottom: 16px;
  padding-left: 4px;
}

.results-info strong {
  color: var(--sakura-deep);
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

.empty-hint {
  font-size: 13px;
  margin-top: 6px;
  color: var(--text-muted);
}

@media (max-width: 480px) {
  .page-title {
    font-size: 22px;
  }
}
</style>
