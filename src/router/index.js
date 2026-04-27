import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Category from '../views/Category.vue'
import Post from '../views/Post.vue'
import Search from '../views/Search.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/category/:name', name: 'Category', component: Category, props: true },
  { path: '/post/:path(.*)', name: 'Post', component: Post },
  { path: '/search', name: 'Search', component: Search },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
