<template>
  <div class="search-box">
    <div class="search-input-wrap">
      <span class="search-icon">🔍</span>
      <input
        v-model="query"
        type="text"
        placeholder="搜索文章..."
        @keyup.enter="doSearch"
      />
      <button v-if="query" class="search-clear" @click="query = ''">✕</button>
    </div>
    <button class="search-btn" @click="doSearch">搜索</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const query = ref('')

function doSearch() {
  const q = query.value.trim()
  if (q) router.push({ name: 'Search', query: { q } })
}
</script>

<style scoped>
.search-box {
  display: flex; gap: 10px; margin-bottom: 28px;
}
.search-input-wrap {
  flex: 1; position: relative; display: flex; align-items: center;
}
.search-icon {
  position: absolute; left: 14px; font-size: 1rem;
  pointer-events: none; color: var(--text-muted);
}
.search-input-wrap input {
  width: 100%; padding: 12px 36px 12px 42px;
  border: 1px solid var(--border); border-radius: 24px;
  font-size: 0.95rem; color: var(--text); outline: none;
  background: var(--card-bg); transition: var(--transition);
}
.search-input-wrap input:focus { border-color: var(--accent); box-shadow: var(--shadow-sm); }
.search-input-wrap input::placeholder { color: var(--text-muted); }
.search-clear {
  position: absolute; right: 10px;
  background: var(--tag-bg); border: none;
  width: 22px; height: 22px; border-radius: 50%;
  cursor: pointer; font-size: 12px; color: var(--text-muted);
  display: flex; align-items: center; justify-content: center;
  transition: var(--transition);
}
.search-clear:hover { background: var(--accent); color: #fff; }

.search-btn {
  padding: 12px 28px; border: none; border-radius: 24px;
  background: var(--accent); color: #fff;
  font-size: 0.95rem; font-weight: 500; cursor: pointer;
  transition: var(--transition); white-space: nowrap;
}
.search-btn:hover { background: var(--accent-hover); }
</style>
