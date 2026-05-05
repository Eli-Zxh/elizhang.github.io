# 个人博客 - 前端

基于 Vue 3 + Vite + Vue Router 的个人博客前端，采用樱色/天空色二次元风格。

## 快速启动

```bash
npm install
npm run dev        # 开发服务器 http://localhost:5173
npm run build      # 生产构建 → dist/
```

后端 API 需在 `localhost:8765` 运行，路径前缀 `/api`。

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
│   ├── Home.vue            # 首页（Hero + 分类）
│   ├── Category.vue        # 分类文章列表
│   ├── Post.vue            # 文章详情 + 评论
│   └── Search.vue          # 搜索结果页
└── components/
    ├── NavBar.vue           # 导航栏（含搜索弹窗/侧边抽屉）
    ├── PostCard.vue         # 文章卡片
    ├── SearchBox.vue        # 搜索输入框
    └── CommentSection.vue   # 评论区
```

## 自定义指南

### 网站名称

修改以下位置中的「啃书笔记」：

- `index.html` → `<title>`
- `src/components/NavBar.vue` → `.brand-text` 和 `.drawer-name`
- `src/views/Home.vue` → `.hero-title`

### 标语

修改以下位置中的「那些啃书的日子，闪闪发光」：

- `index.html` → `<meta name="description">`
- `src/views/Home.vue` → `.hero-sub`
- `src/App.vue` → `.footer-tagline`

### 配色

编辑 `src/styles/anime-theme.css` 的 CSS 变量：

```css
:root {
  --sakura-pink: #FFB7C5;    /* 主色 */
  --sakura-light: #FFD6E0;   /* 浅色 */
  --sky-blue: #87CEEB;       /* 辅助色 */
  --cream: #FFFAF0;          /* 背景底色 */
  --radius: 18px;            /* 卡片圆角 */
}
```

### 字体

CSS 变量 `--font-main` 控制正文字体，顶部 `@import` 引入 Google Fonts。

### 分类与图标

`src/views/Home.vue` 的 `iconMap` 对象，`src/views/Category.vue` 中有一份相同的映射，两边需同步修改。

### 打字机文案

`src/views/Home.vue` 中 `useTyped(...)` 的第一个参数数组。

### 布局参数

`src/styles/anime-theme.css`：
- `.container` → `max-width` 控制页面宽度
- `@media` 断点控制移动端适配

各组件 `<style scoped>` 中的尺寸、间距直接在该文件中修改。
