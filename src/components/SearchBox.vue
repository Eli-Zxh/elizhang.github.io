<template>
  <div class="search-box">
    <div class="search-input-wrap">
      <span class="search-icon">🔍</span>
      <input
        v-model="query"
        type="text"
        class="search-input"
        placeholder="搜索笔记关键词..."
        @keyup.enter="doSearch"
      />
      <button v-if="query" class="search-clear" @click="query = ''" title="清除">✕</button>
    </div>
    <button class="btn btn-primary" @click="doSearch">
      <span>搜索</span>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const query = ref('')

function doSearch() {
  const q = query.value.trim()
  if (q) {
    router.push({ name: 'Search', query: { q } })
  }
}
</script>

<style scoped>
.search-box {
  display: flex;
  gap: 10px;
  margin-bottom: 28px;
}

.search-input-wrap {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 16px;
  font-size: 16px;
  pointer-events: none;
  opacity: 0.6;
}

.search-input {
  width: 100%;
  padding: 13px 36px 13px 44px;
  border: 2px solid var(--sakura-light);
  border-radius: var(--radius-full);
  font-size: 15px;
  font-family: var(--font-main);
  outline: none;
  transition: all var(--transition);
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
}

.search-input:focus {
  border-color: var(--sky-blue);
  box-shadow: 0 0 0 4px rgba(135, 206, 235, 0.15);
  background: var(--white);
}

.search-input::placeholder {
  color: var(--text-muted);
}

.search-clear {
  position: absolute;
  right: 12px;
  background: var(--sakura-light);
  border: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 12px;
  color: var(--text-light);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition);
}

.search-clear:hover {
  background: var(--sakura-pink);
  color: var(--white);
}
</style>
