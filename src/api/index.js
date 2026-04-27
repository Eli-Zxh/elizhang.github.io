const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8765/api'

async function fetchAPI(path) {
  const res = await fetch(`${API_BASE}${path}`)
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

export function getCategories() {
  return fetchAPI('/categories')
}

export function getPosts(category, page = 1) {
  return fetchAPI(`/posts?category=${encodeURIComponent(category)}&page=${page}`)
}

export function getPost(postPath) {
  return fetchAPI(`/post/${postPath}`)
}

export function searchPosts(query, page = 1) {
  return fetchAPI(`/search?q=${encodeURIComponent(query)}&page=${page}`)
}

export function getComments(postPath) {
  return fetchAPI(`/comments/${postPath}`)
}

export function addComment(postPath, nickname, content) {
  return fetch(`${API_BASE}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ post_path: postPath, nickname, content }),
  }).then(res => res.json())
}

export function getImageUrl(relPath) {
  return `${API_BASE}/images/${relPath}`
}
