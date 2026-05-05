<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="nav-container">
      <router-link to="/" class="nav-brand">
        <span class="brand-dot"></span>Eli的建站经验分享
      </router-link>

      <ul class="nav-links" :class="{ open: menuOpen }">
        <li><router-link to="/" exact-active-class="active" @click="menuOpen = false">首页</router-link></li>
        <li><router-link to="/search" active-class="active" @click="menuOpen = false">搜索</router-link></li>
        <li><a href="#categories" @click="menuOpen = false">分类</a></li>
      </ul>

      <div class="nav-search" title="搜索文章">
        <span class="search-icon">🔍</span>
        <input
          v-model="query"
          type="text"
          placeholder="搜索文章..."
          @keyup.enter="doSearch"
        />
      </div>

      <button class="menu-toggle" @click="menuOpen = !menuOpen" aria-label="菜单">
        {{ menuOpen ? '✕' : '☰' }}
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const query = ref('')
const menuOpen = ref(false)
const isScrolled = ref(false)

function doSearch() {
  const q = query.value.trim()
  if (q) {
    router.push({ name: 'Search', query: { q } })
  }
}

function onScroll() {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => window.addEventListener('scroll', onScroll))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(249, 247, 244, 0.82);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--border);
  transition: var(--transition);
}
.navbar.scrolled { box-shadow: var(--shadow-sm); }

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 62px;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-serif);
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: var(--text);
  transition: var(--transition);
  flex-shrink: 0;
}
.nav-brand:hover { color: var(--accent); }

.brand-dot {
  display: inline-block;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--accent);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 8px;
  list-style: none;
}
.nav-links a {
  color: var(--text-secondary);
  font-size: 0.95rem;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 20px;
  transition: var(--transition);
  white-space: nowrap;
}
.nav-links a:hover,
.nav-links a.active { color: var(--accent); background: var(--accent-light); }

.nav-search {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 8px 16px;
  transition: var(--transition);
  cursor: pointer;
}
.nav-search:hover { border-color: var(--accent); box-shadow: var(--shadow-sm); }
.nav-search input {
  border: none; outline: none; background: transparent;
  font-size: 0.9rem; color: var(--text); width: 140px;
}
.nav-search input::placeholder { color: var(--text-muted); }
.search-icon { color: var(--text-muted); font-size: 1.05rem; flex-shrink: 0; }

.menu-toggle {
  display: none; background: none; border: none;
  cursor: pointer; padding: 6px; color: var(--text);
  font-size: 1.5rem; line-height: 1;
}

@media (max-width: 900px) {
  .nav-search input { width: 100px; }
  .nav-links a { padding: 6px 12px; font-size: 0.85rem; }
}

@media (max-width: 600px) {
  .nav-links {
    display: none; position: absolute; top: 62px; left: 0; right: 0;
    background: rgba(249, 247, 244, 0.96); backdrop-filter: blur(18px);
    flex-direction: column; padding: 12px 20px;
    border-bottom: 1px solid var(--border); gap: 2px; box-shadow: var(--shadow-md);
  }
  .nav-links.open { display: flex; }
  .nav-links a { padding: 10px 16px; border-radius: var(--radius-sm); width: 100%; }
  .menu-toggle { display: block; }
  .nav-search input { width: 80px; }
}
</style>
