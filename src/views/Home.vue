<template>
  <div class="main-container">
    <!-- Hero -->
    <section class="hero">
      <div class="hero-avatar">📝</div>
      <h1>Eli的建站经验分享</h1>
      <p class="subtitle">记录思考 · 分享经验 · 探索技术的安静角落</p>
      <p class="hero-bio">从零搭建个人网站的过程中，遇到过太多坑。这里记录每一步的经验和教训，希望也能帮到你。</p>
    </section>

    <!-- 文章列表 -->
    <section class="content-area" id="articleList">
      <div class="section-header">
        <h2>📖 {{ activeTag === 'all' ? '最新文章' : '标签：' + activeTag }}</h2>
        <router-link to="/search" class="view-all">搜索更多 →</router-link>
      </div>

      <!-- 加载中 -->
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p style="margin-top:12px">加载文章中...</p>
      </div>

      <!-- 文章列表 -->
      <template v-else-if="filteredPosts.length">
        <PostCard
          v-for="post in filteredPosts"
          :key="post.path"
          :post="post"
          @tag-click="selectTag"
        />
        <button v-if="hasMore" class="load-more-btn" @click="loadMore">
          加载更多文章
        </button>
      </template>

      <!-- 空状态 -->
      <div v-else class="empty-state">
        <span class="icon">🏷️</span>
        <p>该标签下暂无文章</p>
      </div>
    </section>

    <!-- 侧边栏 -->
    <Sidebar
      :categories="categories"
      :all-tags="allTags"
      :hot-posts="hotPosts"
      @tag-change="selectTag"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getCategories, getPosts, searchPosts } from '../api'
import PostCard from '../components/PostCard.vue'
import Sidebar from '../components/Sidebar.vue'

const categories = ref([])
const allPosts = ref([])
const hotPosts = ref([])
const page = ref(1)
const loading = ref(true)
const hasMore = ref(false)
const activeTag = ref('all')

// 收集所有标签
const allTags = computed(() => {
  const tagSet = new Set()
  allPosts.value.forEach(p => {
    if (p.keywords) {
      p.keywords.split(',').forEach(k => {
        const t = k.trim()
        if (t && t.length < 10) tagSet.add(t)
      })
    }
  })
  return [...tagSet].slice(0, 20)
})

// 按标签过滤
const filteredPosts = computed(() => {
  if (activeTag.value === 'all') return allPosts.value
  return allPosts.value.filter(p => {
    if (!p.keywords) return false
    return p.keywords.split(',').some(k => k.trim() === activeTag.value)
  })
})

function selectTag(tag) {
  activeTag.value = tag
  const el = document.getElementById('articleList')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// 加载所有分类的文章
async function loadAllPosts() {
  loading.value = true
  try {
    const cats = await getCategories()
    categories.value = cats

    // 加载每个分类的文章（第一页）
    const all = []
    for (const cat of cats) {
      try {
        const result = await getPosts(cat.name, 1)
        all.push(...result.items)
      } catch (e) {
        console.error(`加载分类 ${cat.name} 失败`, e)
      }
    }

    // 按日期排序
    all.sort((a, b) => {
      const da = a.created_at || ''
      const db = b.created_at || ''
      return db.localeCompare(da)
    })

    allPosts.value = all
    hotPosts.value = all.slice(0, 5)
    hasMore.value = false // 首次加载已全部获取
  } catch (e) {
    console.error('加载失败', e)
  } finally {
    loading.value = false
  }
}

function loadMore() {
  // 加载更多（实际项目中分页）
}

onMounted(loadAllPosts)
</script>

<style scoped>
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 28px 48px;
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 36px;
}

/* Hero */
.hero {
  grid-column: 1 / -1;
  text-align: center;
  padding: 28px 20px 10px;
}
.hero-avatar {
  width: 88px; height: 88px; border-radius: 50%;
  background: linear-gradient(135deg, #e8d5c8, #d4b8a5);
  margin: 0 auto 18px;
  display: flex; align-items: center; justify-content: center;
  font-size: 2.4rem; box-shadow: var(--shadow-md);
  transition: var(--transition); user-select: none;
}
.hero-avatar:hover { transform: scale(1.05); box-shadow: var(--shadow-lg); }
.hero h1 {
  font-family: var(--font-serif);
  font-size: 2rem; font-weight: 700;
  letter-spacing: 0.04em; margin-bottom: 6px;
}
.hero .subtitle {
  font-size: 1rem; color: var(--text-secondary);
  font-weight: 400; letter-spacing: 0.02em;
}
.hero .hero-bio {
  max-width: 500px; margin: 12px auto 0;
  font-size: 0.9rem; color: var(--text-muted); line-height: 1.6;
}

/* 文章列表 */
.content-area { display: flex; flex-direction: column; gap: 22px; }
.section-header {
  display: flex; align-items: center; justify-content: space-between; margin-bottom: 2px;
}
.section-header h2 {
  font-family: var(--font-serif); font-size: 1.3rem;
  font-weight: 700; letter-spacing: 0.03em;
}
.view-all {
  font-size: 0.85rem; color: var(--accent);
  font-weight: 500; transition: var(--transition);
}
.view-all:hover { color: var(--accent-hover); text-decoration: underline; text-underline-offset: 4px; }

/* 加载更多 */
.load-more-btn {
  align-self: center; padding: 12px 36px;
  border: 2px solid var(--border); background: var(--card-bg);
  color: var(--text-secondary); border-radius: 28px;
  cursor: pointer; font-size: 0.9rem; font-weight: 500;
  transition: var(--transition); letter-spacing: 0.02em; margin-top: 8px;
}
.load-more-btn:hover { border-color: var(--accent); color: var(--accent); box-shadow: var(--shadow-sm); }

@media (max-width: 900px) {
  .main-container { grid-template-columns: 1fr; gap: 28px; padding: 20px 18px 36px; }
  .hero h1 { font-size: 1.6rem; }
}
@media (max-width: 600px) {
  .hero-avatar { width: 68px; height: 68px; font-size: 1.8rem; }
  .hero h1 { font-size: 1.4rem; }
  .hero .subtitle { font-size: 0.9rem; }
}
</style>
