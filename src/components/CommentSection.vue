<template>
  <section class="comment-section">
    <h3>💬 留言（{{ comments.length }}）</h3>

    <div v-if="comments.length === 0" class="empty-hint">
      还没有留言，来写第一条吧 ~
    </div>

    <div class="comment-list">
      <div v-for="c in comments" :key="c.id" class="comment-item">
        <div class="comment-avatar">{{ c.nickname.charAt(0) }}</div>
        <div class="comment-body">
          <div class="comment-header">
            <span class="comment-nick">{{ c.nickname }}</span>
            <span class="comment-time">{{ c.created_at }}</span>
          </div>
          <p class="comment-content">{{ c.content }}</p>
        </div>
      </div>
    </div>

    <div class="comment-divider"></div>

    <form @submit.prevent="submit" class="comment-form">
      <h4>写下你的想法</h4>
      <input v-model="nickname" placeholder="昵称（选填，默认「匿名」）" maxlength="20" />
      <textarea v-model="content" placeholder="输入你的留言..." rows="4" required></textarea>
      <div class="form-actions">
        <span class="char-count">{{ content.length }}/500</span>
        <button type="submit" :disabled="submitting || !content.trim()">
          {{ submitting ? '发送中...' : '发送留言' }}
        </button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getComments, addComment } from '../api'

const props = defineProps({ postPath: { type: String, required: true } })

const comments = ref([])
const nickname = ref('')
const content = ref('')
const submitting = ref(false)

async function loadComments() {
  try { comments.value = await getComments(props.postPath) }
  catch (e) { console.error('加载评论失败', e) }
}

async function submit() {
  if (!content.value.trim() || submitting.value) return
  if (content.value.length > 500) return
  submitting.value = true
  try {
    const c = await addComment(props.postPath, nickname.value || '匿名', content.value)
    comments.value.push(c)
    content.value = ''
  } catch (e) { console.error('提交失败', e) }
  finally { submitting.value = false }
}

onMounted(loadComments)
</script>

<style scoped>
.comment-section {
  max-width: 800px; margin: 0 auto;
  background: var(--card-bg); border-radius: var(--radius-lg);
  padding: 32px; border: 1px solid var(--border); box-shadow: var(--shadow-sm);
}
.comment-section h3 {
  font-family: var(--font-serif); font-size: 1.15rem; font-weight: 700;
  margin-bottom: 20px;
}
.empty-hint { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px; text-align: center; padding: 20px 0; }

.comment-item { display: flex; gap: 14px; padding: 16px 0; border-bottom: 1px solid var(--border); }
.comment-item:last-child { border-bottom: none; }
.comment-avatar {
  width: 38px; height: 38px; border-radius: 50%;
  background: var(--accent-light); color: var(--accent);
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 0.9rem; flex-shrink: 0;
}
.comment-body { flex: 1; min-width: 0; }
.comment-header { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
.comment-nick { font-weight: 600; font-size: 0.9rem; color: var(--accent); }
.comment-time { font-size: 0.78rem; color: var(--text-muted); }
.comment-content { font-size: 0.9rem; line-height: 1.7; word-break: break-word; }

.comment-divider { height: 1px; background: var(--border); margin: 24px 0; }

.comment-form { display: flex; flex-direction: column; gap: 12px; }
.comment-form h4 { font-size: 1rem; font-weight: 600; }
.comment-form input, .comment-form textarea {
  width: 100%; padding: 10px 14px; border: 1px solid var(--border);
  border-radius: var(--radius-sm); font-size: 0.9rem; outline: none;
  transition: var(--transition); background: var(--bg);
}
.comment-form input:focus, .comment-form textarea:focus { border-color: var(--accent); }
.comment-form input { max-width: 240px; }
.comment-form textarea { resize: vertical; min-height: 80px; }

.form-actions { display: flex; justify-content: space-between; align-items: center; }
.char-count { font-size: 0.8rem; color: var(--text-muted); }
.form-actions button {
  padding: 10px 24px; border: none; border-radius: 20px;
  background: var(--accent); color: #fff;
  font-size: 0.9rem; font-weight: 500; cursor: pointer;
  transition: var(--transition);
}
.form-actions button:hover:not(:disabled) { background: var(--accent-hover); }
.form-actions button:disabled { opacity: 0.5; cursor: not-allowed; }

@media (max-width: 480px) {
  .comment-section { padding: 20px; }
  .comment-form input { max-width: 100%; }
}
</style>
