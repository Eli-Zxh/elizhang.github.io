<template>
  <div class="comment-section card">
    <h3 class="section-title">留言</h3>

    <div v-if="comments.length === 0" class="empty-hint">
      还没有留言，来写第一条吧 ~
    </div>

    <div v-for="c in comments" :key="c.id" class="comment-item">
      <div class="comment-header">
        <span class="comment-nick">{{ c.nickname }}</span>
        <span class="comment-time">{{ c.created_at }}</span>
      </div>
      <div class="comment-body">{{ c.content }}</div>
    </div>

    <form @submit.prevent="submit" class="comment-form">
      <input v-model="nickname" class="nick-input" placeholder="昵称（可选，默认匿名）" maxlength="20" />
      <textarea v-model="content" class="content-input" placeholder="写下你的想法..." rows="3" required></textarea>
      <button type="submit" class="btn btn-primary" :disabled="submitting">
        {{ submitting ? '提交中...' : '发送' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getComments, addComment } from '../api'

const props = defineProps({
  postPath: { type: String, required: true }
})

const comments = ref([])
const nickname = ref('')
const content = ref('')
const submitting = ref(false)

async function loadComments() {
  try {
    comments.value = await getComments(props.postPath)
  } catch (e) {
    console.error('加载评论失败', e)
  }
}

async function submit() {
  if (!content.value.trim() || submitting.value) return
  submitting.value = true
  try {
    const newComment = await addComment(props.postPath, nickname.value || '匿名', content.value)
    comments.value.push(newComment)
    content.value = ''
  } catch (e) {
    console.error('提交评论失败', e)
  } finally {
    submitting.value = false
  }
}

onMounted(loadComments)
</script>

<style scoped>
.section-title {
  font-size: 18px;
  margin-bottom: 16px;
  padding-left: 10px;
  border-left: 3px solid var(--sakura-pink);
}

.empty-hint {
  color: var(--text-light);
  font-size: 14px;
  margin-bottom: 16px;
}

.comment-item {
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  font-size: 13px;
}

.comment-nick {
  font-weight: 600;
  color: var(--sky-blue);
}

.comment-time {
  color: var(--text-light);
  font-size: 12px;
}

.comment-body {
  font-size: 14px;
  line-height: 1.6;
}

.comment-form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nick-input, .content-input {
  padding: 10px 14px;
  border: 2px solid var(--sakura-light);
  border-radius: var(--radius-sm);
  font-family: var(--font-main);
  font-size: 14px;
  outline: none;
  resize: vertical;
  transition: border-color 0.3s;
}

.nick-input:focus, .content-input:focus {
  border-color: var(--sky-blue);
}

.nick-input { width: 200px; }
</style>
