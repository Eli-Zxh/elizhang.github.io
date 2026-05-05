<template>
  <nav class="navbar">
    <div class="nav-inner">
      <!-- 左侧品牌 -->
      <router-link to="/" class="brand">
        <div class="brand-avatar">📖</div>
        <span class="brand-text">啃书笔记</span>
      </router-link>

      <!-- 右侧导航 -->
      <div class="nav-actions">
        <!-- 桌面端链接 -->
        <div class="nav-links">
          <router-link to="/" class="nav-link" exact-active-class="router-link-active">
            <span>🏠</span> 首页
          </router-link>
          <router-link to="/search" class="nav-link">
            <span>🔍</span> 搜索
          </router-link>
        </div>

        <!-- 搜索按钮（弹窗） -->
        <button class="nav-icon-btn" @click="showSearch = true" title="搜索">
          🔍
        </button>

        <!-- 汉堡菜单 -->
        <button class="nav-icon-btn hamburger" @click="showDrawer = true" title="菜单">
          <span class="ham-line"></span>
          <span class="ham-line"></span>
          <span class="ham-line"></span>
        </button>
      </div>
    </div>

    <!-- 搜索弹窗 -->
    <Teleport to="body">
      <div class="overlay" :class="{ active: showSearch }" @click="showSearch = false"></div>
      <div class="search-modal" :class="{ active: showSearch }">
        <h3>
          <span>🔍 搜索笔记</span>
          <button class="search-modal-close" @click="showSearch = false">✕</button>
        </h3>
        <input
          ref="searchInput"
          v-model="searchQuery"
          type="text"
          class="search-modal-input"
          placeholder="输入关键词搜索笔记..."
          @keyup.enter="doSearchModal"
        />
      </div>

      <!-- 遮罩 -->
      <div class="overlay" :class="{ active: showDrawer }" @click="showDrawer = false"></div>

      <!-- 侧边抽屉 -->
      <aside class="drawer" :class="{ active: showDrawer }">
        <div class="drawer-head">
          <div class="drawer-avatar">📖</div>
          <div class="drawer-name">啃书笔记</div>
          <div class="drawer-desc">那些啃书的日子，闪闪发光</div>
        </div>

        <ul class="drawer-menu">
          <li class="drawer-item">
            <router-link to="/" @click="showDrawer = false">
              <span>🏠</span> 首页
            </router-link>
          </li>
          <li class="drawer-item">
            <router-link to="/search" @click="showDrawer = false">
              <span>🔍</span> 搜索
            </router-link>
          </li>
        </ul>

        <div style="padding: 20px; text-align: center; color: var(--text-muted); font-size: 12px;">
          那些啃书的日子，闪闪发光 ✨
        </div>
      </aside>
    </Teleport>
  </nav>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showSearch = ref(false)
const showDrawer = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)

function doSearchModal() {
  const q = searchQuery.value.trim()
  if (q) {
    showSearch.value = false
    searchQuery.value = ''
    router.push({ name: 'Search', query: { q } })
  }
}

// 聚焦输入框
import { watch } from 'vue'
watch(showSearch, (val) => {
  if (val) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
})
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 2px solid var(--sakura-light);
  padding: 0 20px;
}

.nav-inner {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

/* 品牌 */
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--text-dark);
}

.brand-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--sakura-light), var(--sky-light));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  box-shadow: var(--shadow-sm);
  flex-shrink: 0;
}

.brand-text {
  font-size: 20px;
  font-weight: 700;
  background: linear-gradient(135deg, var(--sakura-pink), var(--sky-blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 导航链接 */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.nav-links {
  display: flex;
  gap: 4px;
}

/* 图标按钮 */
.nav-icon-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: all var(--transition);
}

.nav-icon-btn:hover {
  background: var(--sakura-light);
}

/* 汉堡菜单 */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
}

.ham-line {
  width: 18px;
  height: 2px;
  background: var(--text-dark);
  border-radius: 2px;
  transition: all 0.3s;
}

/* 响应式 */
@media (max-width: 768px) {
  .nav-links { display: none; }

  .hamburger {
    display: flex;
  }
}
</style>
