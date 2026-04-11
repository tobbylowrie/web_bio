<script setup lang="ts">
import { onMounted, nextTick, watch } from 'vue'
import { useRoute } from 'vitepress'
import { h, render } from 'vue'
import BookmarkCard from './BookmarkCard.vue'

const route = useRoute()

// 判断是否为外部链接
const isExternalLink = (url: string): boolean => {
  // 排除锚点链接
  if (url.startsWith('#')) return false
  
  // 排除相对路径
  if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../')) {
    return false
  }
  
  // 排除邮件和伪协议
  if (url.startsWith('mailto:') || url.startsWith('javascript:')) return false
  
  try {
    const urlObj = new URL(url)
    const currentHost = window.location.hostname
    
    // 域名对比（处理子域名情况）
    const isSameDomain = urlObj.hostname === currentHost || 
                         urlObj.hostname.endsWith(`.${currentHost}`)
    
    return !isSameDomain
  } catch {
    return false
  }
}

// 处理文档中的链接
const processLinks = () => {
  const docContent = document.querySelector('.vp-doc')
  if (!docContent) return
  
  // 查找所有段落中的链接
  const links = docContent.querySelectorAll('.vp-doc p > a[href]')
  
  links.forEach(link => {
    const url = link.getAttribute('href')
    if (!url || !isExternalLink(url)) return
    
    // 检查是否已处理过
    if (link.dataset.bookmarkProcessed) return
    
    // 创建容器
    const container = document.createElement('div')
    container.className = 'auto-bookmark-wrapper'
    
    // 渲染 BookmarkCard
    const vnode = h(BookmarkCard, { url })
    render(vnode, container)
    
    // 在链接的父段落后面插入
    const paragraph = link.closest('p')
    if (paragraph && paragraph.parentNode) {
      paragraph.parentNode.insertBefore(container, paragraph.nextSibling)
      link.dataset.bookmarkProcessed = 'true'
    }
  })
}

// 清理已插入的书签（路由切换时）
const cleanupBookmarks = () => {
  const wrappers = document.querySelectorAll('.auto-bookmark-wrapper')
  wrappers.forEach(wrapper => wrapper.remove())
  
  // 重置处理标记
  const links = document.querySelectorAll('.vp-doc a[data-bookmark-processed]')
  links.forEach(link => {
    link.removeAttribute('data-bookmark-processed')
  })
}

onMounted(() => {
  nextTick(() => {
    processLinks()
  })
})

// 监听路由变化
watch(() => route.path, () => {
  nextTick(() => {
    cleanupBookmarks()
    processLinks()
  })
})
</script>

<template>
  <!-- 这是一个无渲染组件，只执行逻辑 -->
  <div style="display: none;"></div>
</template>

<style>
/* 自动书签容器样式 */
.auto-bookmark-wrapper {
  margin: 1rem 0 1.5rem;
}
</style>
