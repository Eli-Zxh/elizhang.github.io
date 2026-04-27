<template>
  <nav class="navbar">
    <div class="nav-inner">
      <router-link to="/" class="brand">
        <span class="brand-icon"></span>
        <span class="brand-text">啃书笔记</span>
      </router-link>
      <div class="nav-links">
        <router-link to="/" class="nav-link">首页</router-link>
        <router-link to="/search" class="nav-link">搜索</router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-bottom: 2px solid var(--sakura-light);
  padding: 0 20px;
}

.nav-inner {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  font-size: 20px;
  font-weight: 700;
  color: var(--text-dark);
}

.brand-icon {
  font-size: 24px;
}

.brand-text {
  background: linear-gradient(135deg, var(--sakura-pink), var(--sky-blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-links {
  display: flex;
  gap: 8px;
}

@media (max-width: 480px) {
  .brand-text {
    font-size: 16px;
  }
}
</style>
