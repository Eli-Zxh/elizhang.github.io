<template>
  <div class="search-box">
    <input
      v-model="query"
      type="text"
      class="search-input"
      placeholder="搜索笔记关键词..."
      @keyup.enter="doSearch"
    />
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
  margin-bottom: 24px;
}

.search-input {
  flex: 1;
  padding: 12px 20px;
  border: 2px solid var(--sakura-light);
  border-radius: 30px;
  font-size: 15px;
  font-family: var(--font-main);
  outline: none;
  transition: border-color 0.3s;
  background: rgba(255, 255, 255, 0.8);
}

.search-input:focus {
  border-color: var(--sky-blue);
}
</style>
