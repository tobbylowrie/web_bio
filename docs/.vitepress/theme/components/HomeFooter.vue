<template>
  <div class="home-footer">
    <!-- 版权信息及访问统计 -->
    <div v-if="copyright" class="footer-line">
      <span class="copyright">{{ copyright }}</span>
      <span class="divider">|</span>
      <span class="stats">
        今日访问<span id="busuanzi_today_pv">...</span>次，总访问<span id="busuanzi_site_pv">...</span>次
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useData } from 'vitepress'

const { page, site } = useData()

// 判断是否在主页
const isHome = computed(() => {
  return page.value.relativePath === 'index.md'
})

// 从 head 的 meta 标签获取版权信息
const copyright = computed(() => {
  const headMeta = (site.value.head || []) as any[]
  const copyrightMeta = headMeta.find(
    (item) => item[0] === 'meta' && item[1]?.name === 'copyright'
  )
  return copyrightMeta?.[1]?.content || ''
})

onMounted(() => {
  // 动态加载不蒜子脚本
  const script = document.createElement('script')
  script.src = 'https://cdn.busuanzi.cc/busuanzi/3.6.9/busuanzi.min.js'
  script.async = true
  script.defer = true
  document.body.appendChild(script)
})
</script>

<style scoped>
.home-footer {
  position: relative;
  padding: 24px 16px 32px;
  text-align: center;
}

.footer-line {
  font-size: 11px;
  color: var(--vp-c-text-3, #999);
  opacity: 0.7;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.divider {
  opacity: 0.5;
}

.stats span {
  color: var(--vp-c-text-2);
  margin: 0 2px;
}
</style>