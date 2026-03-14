<template>
  <div class="site-stats">
    <span class="stats-pill">
      <span class="stats-label">今日</span>
      <span id="busuanzi_today_pv" class="stats-num">...</span>
    </span>
    <span class="stats-pill">
      <span class="stats-label">总访问</span>
      <span id="busuanzi_site_pv" class="stats-num">...</span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  // 动态加载不蒜子脚本（使用新版CDN）
  const script = document.createElement('script')
  script.src = 'https://cdn.busuanzi.cc/busuanzi/3.6.9/busuanzi.min.js'
  script.async = true
  script.defer = true
  document.body.appendChild(script)
})
</script>

<style scoped>
.site-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  font-size: 12px;
}

.stats-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  color: var(--vp-c-text-3, #999);
}

.stats-label {
  font-size: 11px;
  opacity: 0.7;
}

.stats-num {
  color: var(--vp-c-text-2);
  font-size: 11px;
  min-width: 16px;
  text-align: center;
}

@media (max-width: 480px) {
  .site-stats {
    gap: 6px;
  }
  
  .stats-pill {
    padding: 2px 8px;
  }
}
</style>
