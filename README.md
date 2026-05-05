# Eli的建站经验分享 - 前端

基于 Vue 3 + Vite + Vue Router 的个人博客前端，暖色调简约风格。

## 快速启动

```bash
npm install
npm run dev        # 开发服务器 http://localhost:5173
npm run build      # 生产构建 → dist/
```

后端 API：`http://59.110.30.48:8765/api`

## 项目结构

```
src/
├── App.vue                 # 根组件（页脚、回到顶部）
├── main.js                 # 入口
├── api/index.js            # API 请求封装
├── router/index.js         # 路由配置
├── styles/anime-theme.css  # 全局主题样式
├── composables/
│   └── useTyped.js         # 打字机效果
├── views/
│   ├── Home.vue            # 首页（Hero + 文章列表 + 侧边栏）
│   ├── Category.vue        # 分类文章列表
│   ├── Post.vue            # 文章详情 + 评论
│   └── Search.vue          # 搜索结果页
└── components/
    ├── NavBar.vue           # 导航栏（搜索框、移动端菜单）
    ├── PostCard.vue         # 文章卡片
    ├── SearchBox.vue        # 搜索输入框
    ├── Sidebar.vue          # 侧边栏（关于、分类、标签云、热门）
    └── CommentSection.vue   # 评论区
```

## 自定义指南

### 网站名称

- `index.html` → `<title>` 和 `<meta name="description">`
- `src/components/NavBar.vue` → `.nav-brand` 文字
- `src/views/Home.vue` → Hero 区域的标题、副标题、个人简介

### 配色

编辑 `src/styles/anime-theme.css` 的 CSS 变量：

```css
:root {
  --bg: #f9f7f4;          /* 页面背景 */
  --card-bg: #ffffff;     /* 卡片背景 */
  --accent: #c77d5a;      /* 强调色 */
  --text: #2c2c2c;        /* 正文颜色 */
  --border: #e8e3dc;      /* 边框色 */
}
```

### 侧边栏「关于我」

编辑 `src/components/Sidebar.vue` 第 9 行的文字。

### 分类与标签

分类数据来自后端 API `/api/categories`，标签从文章 `keywords` 字段自动提取。

### API 地址

开发：编辑 `src/api/index.js` 的 `API_BASE`，或设置环境变量 `VITE_API_BASE`。

生产：`npm run build` 构建 `dist/`，部署到任意静态服务器，确保 `/api` 代理到后端。
