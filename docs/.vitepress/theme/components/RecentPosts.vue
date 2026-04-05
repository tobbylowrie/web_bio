<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { data as posts } from './posts.data.ts'
import recentPostsConfig from '../config/recentPostsConfig'

// 修改后的日期格式化函数
const formatDate = (dateString) => {
  if (!dateString) return '' // 如果没有日期则返回空字符串
  const date = new Date(dateString)
  // 检查日期是否有效
  if (isNaN(date.getTime())) return ''

  // 获取日并格式化
  const day = String(date.getDate()).padStart(2, '0')

  // 只显示日
  return `${day}`
}

// 格式化年月（用于分组）
const formatYearMonth = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return ''

  // 获取年、月并格式化
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')

  return `${year}年${month}月`
}

// 格式化作者信息（支持单作者和多作者）
const formatAuthor = (author) => {
  if (!author) return ''

  // 如果是数组格式（如 ["作者A", "作者B"]）
  if (Array.isArray(author)) {
    return author.join(', ')
  }

  // 如果是字符串格式（单作者），直接返回
  return author
}


// 注释：分组显示模式下不再使用分页
// const currentPage = ref(1)
// const postsPerPage = ref(recentPostsConfig.postsPerPage)

// 搜索查询
const searchQuery = ref('')

// 过滤后的文章（考虑搜索和隐藏）
const filteredPosts = computed(() => {
  let filtered = [...posts].filter(post => !post.frontmatter.hide)

  // 如果有搜索查询，则进行搜索过滤
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(post => {
      const title = (post.frontmatter.title || '').toLowerCase()
      const description = (post.frontmatter.description || '').toLowerCase()
      const excerpt = (post.excerpt || '').toLowerCase()
      const tags = Array.isArray(post.frontmatter.tags)
        ? post.frontmatter.tags.join(' ').toLowerCase()
        : (post.frontmatter.tags || '').toLowerCase()

      // 搜索标题、描述、摘要和标签
      return title.includes(query) ||
             description.includes(query) ||
             excerpt.includes(query) ||
             tags.includes(query)
    })
  }

  return filtered.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime()
    const dateB = new Date(b.frontmatter.date).getTime()
    return dateB - dateA // 按照日期倒序排列（最新的在前）
  })
})

// 按年月分组的文章
const groupedPosts = computed(() => {
  const groups = {}

  filteredPosts.value.forEach(post => {
    const yearMonth = formatYearMonth(post.frontmatter.date)
    if (!groups[yearMonth]) {
      groups[yearMonth] = []
    }
    groups[yearMonth].push(post)
  })

  // 转换为数组格式并按时间倒序排序
  return Object.entries(groups)
    .map(([yearMonth, posts]) => ({ yearMonth, posts }))
    .sort((a, b) => {
      const dateA = new Date(a.posts[0].frontmatter.date).getTime()
      const dateB = new Date(b.posts[0].frontmatter.date).getTime()
      return dateB - dateA
    })
})

// 为了更好的分组显示，我们直接使用 groupedPosts 而不是传统的分页
// 显示所有分组，不再使用传统分页
// 总页数功能暂时禁用，因为分组显示更适合浏览
const totalPages = computed(() => {
  return 1 // 分组显示模式下只有一页
})

// 搜索结果统计
const searchResultsCount = computed(() => {
  return filteredPosts.value.length
})

// 当搜索查询改变时，不再需要重置页码（分组显示）
const handleSearchChange = () => {
  // 分组显示模式下无需重置页码
}

// 清除搜索
const clearSearch = () => {
  searchQuery.value = ''
}

// 点击链接处理导航
const handleLinkClick = (url) => {
  window.open(url, '_blank')
}

// 点击标签进行搜索
const searchByTag = (tag) => {
  searchQuery.value = tag
}

// 高亮搜索关键词
const highlightText = (text, query) => {
  if (!query.trim()) return text
  const regex = new RegExp(`(${query})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}

// 键盘事件处理
const handleKeydown = (event) => {
  if (event.key === 'Escape' && searchQuery.value) {
    clearSearch()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

// 注释：分组显示模式下不再使用分页功能
// const nextPage = () => {
//   if (currentPage.value < totalPages.value) {
//     currentPage.value++
//   }
// }

// const prevPage = () => {
//   if (currentPage.value > 1) {
//     currentPage.value--
//   }
// }
</script>

<template>
  <div class="posts-container">
    <!-- 搜索框 -->
    <div class="search-container">
      <div class="search-input-wrapper">
        <input
          v-model="searchQuery"
          @input="handleSearchChange"
          type="text"
          placeholder="搜索文章标题、内容或标签... (按 Esc 清除)"
          class="search-input"
        >
        <button
          v-if="searchQuery"
          @click="clearSearch"
          class="clear-search-btn"
          title="清除搜索"
        >
          ✕
        </button>
      </div>
    </div>
    <!-- 文章列表或空状态提示 -->
    <div v-if="searchResultsCount === 0 && searchQuery" class="no-results">
      <div class="no-results-icon">🔍</div>
      <div class="no-results-text">没有找到相关文章</div>
      <div class="no-results-hint">请尝试使用其他关键词搜索</div>
    </div>

    <!-- 分组显示文章列表 -->
    <div v-else class="grouped-posts">
      <div v-for="group in groupedPosts" :key="group.yearMonth" class="post-group">
        <div class="group-header">
          <h3 class="group-title">{{ group.yearMonth }}</h3>
          <div class="group-count">{{ group.posts.length }} 篇文章</div>
        </div>
        <ul class="posts-list">
          <li v-for="post in group.posts" :key="post.url" class="post-item">
            <div class="post-content-wrapper">
              <a class="post-link-wrapper" @click="handleLinkClick(post.url)">
                <div class="post-content">
                  <div class="post-title-tags">
                    <div class="post-title" v-html="highlightText(post.frontmatter.title, searchQuery)"></div>
                    <span></span>
                    <template v-for="tag in post.frontmatter.tags" :key="tag">
                      <div
                        class="post-tag"
                        v-html="highlightText(tag, searchQuery)"
                        @click.stop="searchByTag(tag)"
                        :title="`点击搜索标签: ${tag}`"
                      ></div>
                    </template>
                  </div>
                  
                  <div class="post-meta">
                    <span v-if="post.frontmatter.author" class="post-author">{{ formatAuthor(post.frontmatter.author) }}</span>
                    <span class="post-separator">·</span>
                    <span class="post-date">{{ formatDate(post.frontmatter.date) }}日</span>
                  </div>
                </div>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 分组显示模式下不使用传统分页，显示文章统计信息 -->
    <div v-if="searchResultsCount > 0" class="posts-summary">
      共 {{ searchResultsCount }} 篇文章，已按年月分组显示
    </div>
  </div>
</template>

<style scoped>
.search-container {
  margin-bottom: 1rem;
}

.search-input-wrapper {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 0.75rem 3rem 0.75rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 1rem;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg);
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 2px var(--vp-c-brand-soft);
}

.clear-search-btn {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 1.2rem;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.clear-search-btn:hover {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.search-results-info {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  padding: 0.25rem 0.5rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 4px;
  border-left: 3px solid var(--vp-c-brand);
}

/* 分组样式 */
.grouped-posts {
  margin-top: 1rem;
}

.post-group {
  margin-bottom: 1rem;
}

.group-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  /* margin-bottom: 0.5rem; */
  /* background-color: var(--vp-c-bg-soft); */
  /* border-left: 4px solid var(--vp-c-brand); */
  border-bottom: 1px solid var(--vp-c-divider);
  /* border-radius: 6px; */
}

.group-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.group-count {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  background-color: var(--vp-c-brand-soft);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-weight: 500;
}

.posts-summary {
  margin-top: 2rem;
  text-align: center;
  padding: 1rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.no-results {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--vp-c-text-2);
}

.no-results-icon {
  font-size: 3rem;
  margin-bottom: 3rem;
  opacity: 0.6;
}

.no-results-text {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.no-results-hint {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

/* 搜索关键词高亮样式 */
:deep(mark) {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 0.1rem 0.2rem;
  border-radius: 2px;
  font-weight: 500;
}

.posts-title {
  font-size: 1.8rem;
  color: var(--vp-c-text-1);
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--vp-c-brand);
}

.posts-container {
  margin: 0 0;
  /* padding: 2rem 0; */
}

.posts-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.post-item {
  margin: 0;
  padding: 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.post-item:last-child {
  border-bottom: none;
}

.post-content-wrapper {
  padding: 0rem 1rem;
  transition: all 0.3s ease;
}

.post-link-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.post-content-wrapper:hover{
  background-color: var(--vp-c-bg-soft);
  transform: translateX(5px);
  color: #dd1313;
}

.post-content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.25rem 0;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.post-author {
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
  white-space: nowrap;
}

.post-separator {
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
  white-space: nowrap;
  opacity: 0.6;
}

.post-date {
  color: var(--vp-c-text-3);
  font-size: 0.9rem;
  white-space: nowrap;
  /* margin-left: 1rem; */
}

.post-title-tags {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex: 1;
  min-width: 0;
  flex-wrap: wrap;
}

.post-title {
  font-size: 1rem;
  font-weight: 500;
  color: var(--vp-c-brand);
}

.post-tag {
  position: relative;
  display: inline-block;
  padding: 0rem 0.5rem;
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  border: 1px solid var(--vp-c-text-3);
  border-radius: 12px;
  transition: all 0.2s ease;
  cursor: pointer;
  flex-shrink: 0; /* 标签不缩小 */
}

.post-tag:hover {
  background-color: var(--vp-c-brand);
  border: 1px solid var(--vp-c-brand);
  color: var(--vp-c-white);
  transform: scale(1.05);
}

/* 高亮状态下的标签样式 */
:deep(.post-tag mark) {
  /* background: none; */
  color: inherit;
  font-weight: 800;
}

/* 分页样式已移除，因为分组显示更适合文章浏览 */
</style>
