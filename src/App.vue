<template>
  <div id="app-root">
    <NavBar />

    <main class="container">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <span class="footer-icon">📖</span>
          <span class="footer-name">啃书笔记</span>
        </div>
        <p class="footer-tagline">那些啃书的日子，闪闪发光 ✨</p>
        <p class="footer-copy">Made with ☕ & 💪</p>
      </div>
    </footer>

    <!-- 回到顶部 -->
    <button class="back-to-top" :class="{ visible: showTopBtn }" @click="scrollToTop" title="回到顶部">
      ↑
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import NavBar from './components/NavBar.vue'

const showTopBtn = ref(false)

function onScroll() {
  showTopBtn.value = window.scrollY > 400
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style>
#app-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  flex: 1;
}

/* 页脚 */
.site-footer {
  margin-top: 20px;
  padding: 30px 20px 40px;
  text-align: center;
  position: relative;
}

.site-footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--sakura-pink), transparent);
}

.footer-inner {
  padding-top: 10px;
}

.footer-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 8px;
}

.footer-icon {
  font-size: 20px;
}

.footer-name {
  font-size: 16px;
  font-weight: 700;
  background: linear-gradient(135deg, var(--sakura-pink), var(--sky-blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-tagline {
  color: var(--text-light);
  font-size: 14px;
  margin-bottom: 4px;
}

.footer-copy {
  color: var(--text-muted);
  font-size: 12px;
}

/* Vue transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
