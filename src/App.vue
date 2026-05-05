<template>
  <div id="app-root">
    <NavBar />

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <footer class="footer">
      <div class="footer-links">
        <router-link to="/">首页</router-link>
        <router-link to="/search">搜索</router-link>
      </div>
      <p>© 2024 <a href="/">Eli的建站经验分享</a> · 用心记录，静默生长</p>
    </footer>

    <button class="back-to-top" :class="{ visible: showTopBtn }" @click="scrollToTop" title="回到顶部">
      ↑
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import NavBar from './components/NavBar.vue'

const showTopBtn = ref(false)

function onScroll() { showTopBtn.value = window.scrollY > 400 }
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }) }

onMounted(() => window.addEventListener('scroll', onScroll))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<style>
#app-root { min-height: 100vh; display: flex; flex-direction: column; }

.footer {
  border-top: 1px solid var(--border);
  text-align: center;
  padding: 28px 20px;
  color: var(--text-muted);
  font-size: 0.82rem;
  letter-spacing: 0.02em;
  max-width: 1200px;
  margin: 0 auto;
}
.footer a { color: var(--accent); transition: var(--transition); }
.footer a:hover { text-decoration: underline; text-underline-offset: 4px; }
.footer .footer-links {
  display: flex; justify-content: center; gap: 20px;
  margin-bottom: 8px; flex-wrap: wrap;
}
</style>
