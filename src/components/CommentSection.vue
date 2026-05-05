<template>
  <section class="comment-section card">
    <h3 class="section-title">
      💬 留言
      <span class="section-subtitle">（共 {{ comments.length }} 条）</span>
    </h3>

    <!-- 空状态 -->
    <div v-if="comments.length === 0" class="empty-comments">
      <span class="empty-icon">💭</span>
      <p>还没有留言，来写第一条吧 ~</p>
    </div>

    <!-- 评论列表 -->
    <div class="comment-list">
      <div v-for="(c, idx) in comments" :key="c.id" class="comment-item" :style="{ animationDelay: idx * 0.05 + 's' }">
        <div class="comment-avatar">
          {{ c.nickname.charAt(0) }}
        </div>
        <div class="comment-body">
          <div class="comment-header">
            <span class="comment-nick">{{ c.nickname }}</span>
            <span class="comment-time">{{ c.created_at }}</span>
          </div>
          <p class="comment-content">{{ c.content }}</p>
        </div>
      </div>
    </div>

    <!-- 发表评论 -->
    <div class="comment-divider"></div>
    <form @submit.prevent="submit" class="comment-form">
      <h4 class="form-title">写下你的想法</h4>
      <div class="form-row">
        <input
          v-model="nickname"
          class="form-nick"
          placeholder="昵称（选填，默认「匿名」）"
          maxlength="20"
        />
      </div>
      <textarea
        v-model="content"
        class="form-content"
        placeholder="输入你的留言..."
        rows="4"
        required
      ></textarea>
      <div class="form-actions">
        <span class="char-count">{{ content.length }}/500</span>
        <button type="submit" class="btn btn-primary" :disabled="submitting || !content.trim()">
          {{ submitting ? '发送中...' : '📨 发送留言' }}
        </button>
      </div>
    </form>
  </section>
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
  if (content.value.length > 500) return
  submitting.value = true
  try {
    const newComment = await addComment(
      props.postPath,
      nickname.value || '匿名',
      content.value
    )
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
.comment-section {
  padding: 28px;
}

/* 空状态 */
.empty-comments {
  text-align: center;
  padding: 30px 0;
  color: var(--text-light);
}

.empty-icon {
  font-size: 36px;
  display: block;
  margin-bottom: 8px;
}

/* 评论列表 */
.comment-list {
  margin-bottom: 8px;
}

.comment-item {
  display: flex;
  gap: 14px;
  padding: 16px 0;
  border-bottom: 1px solid #f5f0f0;
  animation: fadeInUp 0.4s ease backwards;
}

.comment-item:last-child {
  border-bottom: none;
}

.comment-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--sakura-light), var(--sky-light));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 700;
  color: var(--sakura-deep);
  flex-shrink: 0;
}

.comment-body {
  flex: 1;
  min-width: 0;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.comment-nick {
  font-weight: 600;
  font-size: 14px;
  color: var(--sakura-deep);
}

.comment-time {
  font-size: 12px;
  color: var(--text-muted);
}

.comment-content {
  font-size: 14px;
  line-height: 1.7;
  color: var(--text-dark);
  word-break: break-word;
}

/* 分割线 */
.comment-divider {
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--sakura-light), transparent);
  margin: 20px 0;
}

/* 表单 */
.comment-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.form-nick {
  width: 220px;
  padding: 10px 14px;
  border: 2px solid var(--sakura-light);
  border-radius: var(--radius-full);
  font-size: 14px;
  font-family: var(--font-main);
  outline: none;
  transition: border-color var(--transition);
  background: rgba(255, 255, 255, 0.8);
}

.form-nick:focus {
  border-color: var(--sky-blue);
}

.form-content {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--sakura-light);
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-family: var(--font-main);
  resize: vertical;
  min-height: 80px;
  outline: none;
  transition: border-color var(--transition);
  background: rgba(255, 255, 255, 0.8);
}

.form-content:focus {
  border-color: var(--sky-blue);
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.char-count {
  font-size: 12px;
  color: var(--text-muted);
}

@media (max-width: 480px) {
  .comment-section {
    padding: 18px;
  }

  .form-nick {
    width: 100%;
  }
}
</style>
