<template>
  <aside class="sidebar">
    <!-- 关于我 -->
    <div class="sidebar-card about-widget">
      <h3>👤 关于我</h3>
      <div class="about-avatar">☕</div>
      <p>一个正在建设个人网站的探索者。这里记录了我建站过程中的经验、踩坑与心得。</p>
    </div>

    <!-- 分类 -->
    <div class="sidebar-card" id="categories">
      <h3>📂 文章分类</h3>
      <ul class="category-list">
        <li v-for="cat in categories" :key="cat.name">
          <router-link :to="`/category/${cat.name}`">
            {{ cat.name }}
            <span class="count">{{ cat.count }}</span>
          </router-link>
        </li>
      </ul>
    </div>

    <!-- 标签云 -->
    <div class="sidebar-card" v-if="allTags.length">
      <h3>🏷️ 标签</h3>
      <div class="tag-cloud">
        <span :class="{ active: activeTag === 'all' }" @click="selectTag('all')">全部</span>
        <span
          v-for="tag in allTags"
          :key="tag"
          :class="{ active: activeTag === tag }"
          @click="selectTag(tag)"
        >{{ tag }}</span>
      </div>
    </div>

    <!-- 热门文章 -->
    <div class="sidebar-card" v-if="hotPosts.length">
      <h3>🔥 热门文章</h3>
      <ul class="hot-list">
        <li v-for="(p, idx) in hotPosts" :key="p.path">
          <router-link :to="`/post/${p.path}`">
            <span class="hot-index">{{ String(idx + 1).padStart(2, '0') }}</span>
            {{ p.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  categories: { type: Array, default: () => [] },
  allTags: { type: Array, default: () => [] },
  hotPosts: { type: Array, default: () => [] }
})

const emit = defineEmits(['tagChange'])
const activeTag = ref('all')

function selectTag(tag) {
  activeTag.value = tag
  emit('tagChange', tag)
}
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: sticky;
  top: 86px;
  align-self: start;
}

.sidebar-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 22px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
}

.sidebar-card h3 {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 14px;
  letter-spacing: 0.03em;
  display: flex;
  align-items: center;
  gap: 8px;
}
.sidebar-card h3::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
  margin-left: 4px;
}

/* 关于 */
.about-widget .about-avatar {
  width: 60px; height: 60px; border-radius: 50%;
  background: linear-gradient(135deg, #e8d5c8, #d4b8a5);
  margin-bottom: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.6rem;
}
.about-widget p { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; }

/* 分类 */
.category-list { list-style: none; display: flex; flex-direction: column; gap: 6px; }
.category-list li a {
  display: flex; align-items: center; justify-content: space-between;
  color: var(--text-secondary); font-size: 0.88rem;
  padding: 8px 12px; border-radius: var(--radius-sm); transition: var(--transition);
}
.category-list li a:hover { background: var(--tag-bg); color: var(--accent); }
.category-list .count {
  background: var(--tag-bg); padding: 2px 10px; border-radius: 12px;
  font-size: 0.78rem; color: var(--text-muted); transition: var(--transition);
}
.category-list li a:hover .count { background: var(--accent-light); color: var(--accent); }

/* 标签云 */
.tag-cloud { display: flex; flex-wrap: wrap; gap: 8px; }
.tag-cloud span {
  font-size: 0.8rem; padding: 6px 14px; border-radius: 18px;
  background: var(--tag-bg); color: var(--tag-text);
  cursor: pointer; transition: var(--transition);
  white-space: nowrap; user-select: none;
}
.tag-cloud span:hover,
.tag-cloud span.active { background: var(--accent); color: #fff; }

/* 热门 */
.hot-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.hot-list li a {
  color: var(--text-secondary); font-size: 0.88rem;
  display: flex; align-items: flex-start; gap: 10px;
  padding: 6px 0; transition: var(--transition); line-height: 1.4;
}
.hot-list li a:hover { color: var(--accent); }
.hot-index { font-weight: 700; color: var(--accent); font-size: 1rem; flex-shrink: 0; min-width: 20px; }

@media (max-width: 900px) {
  .sidebar { position: static; display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  .sidebar .sidebar-card:last-child { grid-column: 1 / -1; }
}
@media (max-width: 600px) {
  .sidebar { grid-template-columns: 1fr; }
}
</style>
