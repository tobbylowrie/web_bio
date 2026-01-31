<template>
  <button
    class="back-to-top"
    :class="{ 'back-to-top--visible': isVisible }"
    :aria-label="`返回顶部`"
    @click="scrollToTop"
  >
  返回<br/>顶部
  </button>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isVisible = ref(false)
const scrollThreshold = 300 // 显示按钮的滚动阈值

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const handleScroll = () => {
  isVisible.value = window.pageYOffset > scrollThreshold
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // 初始化可见状态
  handleScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 1.5rem;
  border: 1px solid var(--vp-c-brand);
  border-radius: 7px;
  width: 3rem;
  height: 3rem;
  background-color: hsl(0deg 0% 100% / 75%);
  color: var(--vp-c-brand);
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transform: translateY(1rem);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1;
  white-space: nowrap;
}

.back-to-top--visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  transition-delay: 0.5s;
}

.back-to-top:hover {
  background-color: var(--vp-c-brand);
  color: var(--vp-c-white);
  /* transform: translateY(-2px) scale(1.05); */
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.back-to-top:focus {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

/* 深色模式样式 */
.dark .back-to-top {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.dark .back-to-top:hover {
  background-color: var(--vp-c-brand);
  color: var(--vp-c-white);
}
</style>