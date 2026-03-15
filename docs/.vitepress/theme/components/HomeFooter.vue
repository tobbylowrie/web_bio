<template>
  <div class="home-footer">
    <!-- 版权信息及访问统计 -->
    <div class="footer-line">
      <span class="copyright">{{ copyright }}</span>
      <span class="divider">|</span>
      <span class="stats">
        本页<span id="busuanzi_value_page_pv">...</span>次
        <span class="divider">|</span>
        总访<span id="busuanzi_value_site_pv">...</span>次
        <span class="divider">|</span>
        访客<span id="busuanzi_value_site_uv">...</span>人
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch, nextTick } from 'vue'
import { useData, useRoute } from 'vitepress'

const { site } = useData()
const route = useRoute()

// 默认版权信息
const DEFAULT_COPYRIGHT = '©2026 深韩'

// 从 head 的 meta 标签获取版权信息，失败则使用默认值
const copyright = computed(() => {
  try {
    const headMeta = (site.value.head || []) as any[]
    const copyrightMeta = headMeta.find(
      (item) => item?.[0] === 'meta' && item?.[1]?.name === 'copyright'
    )
    return copyrightMeta?.[1]?.content || DEFAULT_COPYRIGHT
  } catch {
    return DEFAULT_COPYRIGHT
  }
})

// 刷新不蒜子统计
const refreshBusuanzi = () => {
  nextTick(() => {
    setTimeout(() => {
      // @ts-ignore
      if (typeof window !== 'undefined' && window.busuanzi) {
        // @ts-ignore
        window.busuanzi.fetch()
      }
    }, 100)
  })
}

onMounted(() => {
  refreshBusuanzi()
})

// 路由切换时刷新统计
watch(() => route.path, () => {
  refreshBusuanzi()
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