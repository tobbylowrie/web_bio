<script setup>
import { ref, computed } from 'vue'
import { data as posts } from './posts.data.ts'

// 修改后的日期格式化函数
const formatDate = (dateString) => {
  if (!dateString) return '' // 如果没有日期则返回空字符串
  // 创建Date对象并手动调整时区偏移
  const date = new Date(dateString)
  // 检查日期是否有效
  if (isNaN(date.getTime())) return ''
  // 手动加上8小时（UTC+8）的偏移量
  date.setHours(date.getHours() - 8)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).replace(/\//g, '/')
}

// 当前页数
const currentPage = ref(1)
// 每页文章数
const postsPerPage = 10

// 修改后的排序函数
const sortedPosts = computed(() => {
  return [...posts]
    .filter(post => !post.frontmatter.hide) // 过滤掉hide为true的文章
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date).getTime()
      const dateB = new Date(b.frontmatter.date).getTime()
      return dateB - dateA // 按照日期倒序排列（最新的在前）
    })
})

// 计算当前页的文章
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  const end = currentPage.value * postsPerPage
  return sortedPosts.value.slice(start, end)
})

// 总页数
const totalPages = computed(() => {
  return Math.ceil(sortedPosts.value.length / postsPerPage)
})

// 切换到下一页
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

// 切换到上一页
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
</script>

<template>
  <div class="posts-container">
    <ul class="posts-list">
      <li v-for="post in paginatedPosts" :key="post.url" class="post-item">
        <a :href="post.url" class="post-link">{{ post.frontmatter.title }}</a>
        <span class="post-date">{{ formatDate(post.frontmatter.date) }}</span>
      </li>
    </ul>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1" class="pagination-button">上一页</button>
      <span class="page-info">第 {{ currentPage }} 页 / 共 {{ totalPages }} 页</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-button">下一页</button>
    </div>
  </div>
</template>

<style scoped>

.posts-title {
  font-size: 1.8rem;
  color: var(--vp-c-text-1);
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--vp-c-brand);
}

.posts-container {
  margin: 0 0;
  padding: 2rem 0;
}

.posts-list {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
}

.post-item {
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
}

.post-date {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin-left: 1rem;
}

.post-item:hover {
  background-color: var(--vp-c-bg-soft);
  transform: translateX(5px);
  transition: 0.3s;
}

.post-link {
  color: var(--vp-c-text-1);
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.3s;
}

.post-link:hover {
  color: var(--vp-c-brand);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.pagination-button {
  padding: 0.5rem 1rem;
  background-color: var(--vp-c-brand);
  color: var(--vp-c-white);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination-button:hover:not(:disabled) {
  background-color: color-mix(in srgb, var(--vp-c-brand), black 20%);
}

.pagination-button:disabled {
  background-color: var(--vp-c-gray-soft);
  color: var(--vp-c-text);
  cursor: not-allowed;
}

.page-info {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}
</style>
