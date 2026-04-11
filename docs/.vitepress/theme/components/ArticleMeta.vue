<script setup lang="ts">
import { useData } from 'vitepress'
import { useRoute } from 'vitepress'
import { onMounted, ref, nextTick } from 'vue'

const { frontmatter } = useData()
const route = useRoute()
const containerRef = ref<HTMLElement | null>(null)
const isInserted = ref(false)

// 格式化日期
function formatDate(date: string | undefined): string {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 检查是否有任何元信息
function hasMeta(): boolean {
  return !!(frontmatter.value.date || 
    frontmatter.value.author || 
    frontmatter.value.category || 
    frontmatter.value.tags)
}

// 在第一个 h1 后面插入元信息
onMounted(async () => {
  // 只对博客文章生效
  if (!route.path.includes('/blogs/')) return
  
  // 等待 DOM 更新
  await nextTick()
  
  // 查找文档内容区域
  const docContent = document.querySelector('.vp-doc')
  if (!docContent) return
  
  // 查找第一个 h1
  const h1 = docContent.querySelector('h1')
  if (!h1) return
  
  // 获取容器元素
  const container = containerRef.value
  if (!container) return
  
  // 在 h1 后面插入容器
  h1.insertAdjacentElement('afterend', container)
  isInserted.value = true
})
</script>

<template>
  <div 
    v-if="hasMeta()" 
    ref="containerRef"
    class="article-meta"
    :class="{ 'is-inserted': isInserted }"
  >
    <!-- 日期 -->
    <div v-if="frontmatter.date" class="meta-item">
      <span class="meta-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      </span>
      <span class="meta-label">发布于:</span>
      <span class="meta-value">{{ formatDate(frontmatter.date) }}</span>
    </div>

    <!-- 作者 -->
    <div v-if="frontmatter.author && frontmatter.author.length > 0" class="meta-item">
      <span class="meta-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </span>
      <span class="meta-label">作者:</span>
      <span class="meta-value">
        <template v-for="(author, index) in frontmatter.author" :key="index">
          <span v-if="index > 0" class="meta-separator">,</span>
          {{ author }}
        </template>
      </span>
    </div>

    <!-- 分类 -->
    <div v-if="frontmatter.category" class="meta-item">
      <span class="meta-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
        </svg>
      </span>
      <span class="meta-label">分类:</span>
      <span class="meta-value category">{{ frontmatter.category }}</span>
    </div>

    <!-- Tags -->
    <div v-if="frontmatter.tags && frontmatter.tags.length > 0" class="meta-item tags-item">
      <span class="meta-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
          <line x1="7" y1="7" x2="7.01" y2="7"></line>
        </svg>
      </span>
      <span class="meta-label">标签:</span>
      <div class="tags-list">
        <span v-for="(tag, index) in frontmatter.tags" :key="index" class="tag">
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<style>
/* 使用非 scoped 样式，确保 DOM 移动后样式仍然有效 */
.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem 1.5rem;
  padding: 1rem 0rem;
  margin-bottom: 2rem;
  /* border-bottom: 1px solid var(--vp-c-divider); */
  font-size: 14px;
  color: var(--vp-c-text-2);
}

/* 未被插入时隐藏（防止在插槽位置显示） */
.article-meta:not(.is-inserted) {
  display: none;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.meta-icon {
  display: flex;
  align-items: center;
  color: var(--vp-c-brand-1);
}

.meta-label {
  color: var(--vp-c-text-3);
}

.meta-value {
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.meta-separator {
  margin: 0 4px;
  color: var(--vp-c-text-3);
}

.category {
  color: var(--vp-c-brand-1);
}

.tags-item {
  align-items: center;
  width: 100%;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  display: inline-block;
  padding: 2px 10px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s;
}

.tag:hover {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white);
}

@media (max-width: 640px) {
  .article-meta {
    flex-direction: column;
  }
  
  .tags-item {
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }
}
</style>