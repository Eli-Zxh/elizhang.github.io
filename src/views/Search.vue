<template>
  <div class="search-page container" style="max-width: 800px; padding-top: 32px; padding-bottom: 48px;">
    <router-link to="/" class="back-link">← 返回首页</router-link>

    <header class="page-header">
      <h1 class="page-title">🔍 搜索文章</h1>
    </header>

    <SearchBox />

    <div v-if="searching" class="loading-state">
      <div class="loading-spinner"></div>
      <p style="margin-top:12px">搜索中...</p>
    </div>

    <div v-else-if="searched">
      <div v-if="results.length" class="post-list">
        <p class="results-info">找到 <strong>{{ total }}</strong> 篇与 "<strong>{{ query }}</strong>" 相关的文章</p>
        <PostCard v-for="item in results" :key="item.path" :post="item" />

        <div v-if="hasMore" style="text-align:center; padding-top:8px;">
          <button class="load-more-btn" @click="loadMore" :disabled="loadingMore">
            {{ loadingMore ? '加载中...' : '加载更多' }}
          </button>
        </div>
      </div>

      <div v-else class="empty-state">
        <span class="icon">🔎</span>
        <p>没有找到与 "<strong>{{ query }}</strong>" 相关的文章</p>
        <p style="font-size:0.85rem; margin-top:6px; color:var(--text-muted);">试试其他关键词</p>
      </div>
    </div>

    <div v-else class="empty-state">
      <span class="icon">📝</span>
      <p>输入关键词搜索文章</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
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

const query = computed(() => route.query.q || '')

async function doSearch() {
  if (!query.value) return
  page.value = 1; results.value = []; searched.value = true; searching.value = true
  try {
    const result = await searchPosts(query.value, page.value)
    results.value = result.items
    total.value = result.total
    hasMore.value = results.value.length < result.total
  } catch (e) { console.error('搜索失败', e) }
  finally { searching.value = false }
}

async function loadMore() {
  if (loadingMore.value) return
  loadingMore.value = true; page.value++
  try {
    const result = await searchPosts(query.value, page.value)
    results.value.push(...result.items)
    hasMore.value = results.value.length < result.total
  } catch (e) { console.error('加载失败', e) }
  finally { loadingMore.value = false }
}

watch(() => route.query.q, (q) => { if (q) doSearch() }, { immediate: true })
</script>

<style scoped>
.back-link { color: var(--text-secondary); font-size: 0.9rem; display: inline-block; margin-bottom: 20px; transition: var(--transition); }
.back-link:hover { color: var(--accent); }
.page-header { margin-bottom: 20px; }
.page-title { font-family: var(--font-serif); font-size: 1.8rem; font-weight: 700; }

.results-info { color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 8px; }
.results-info strong { color: var(--accent); }
.post-list { display: flex; flex-direction: column; gap: 22px; }

.load-more-btn {
  padding: 12px 36px; border: 2px solid var(--border);
  background: var(--card-bg); color: var(--text-secondary);
  border-radius: 28px; cursor: pointer; font-size: 0.9rem;
  font-weight: 500; transition: var(--transition);
}
.load-more-btn:hover:not(:disabled) { border-color: var(--accent); color: var(--accent); box-shadow: var(--shadow-sm); }

@media (max-width: 600px) { .page-title { font-size: 1.4rem; } }
</style>
