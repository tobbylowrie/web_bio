<template>
  <div v-if="isHome" class="home-footer">
    <!-- 社交媒体链接 -->
    <div v-if="socialLinks.length" class="social-links">
      <a
        v-for="link in socialLinks"
        :key="link.link"
        :href="link.link"
        target="_blank"
        rel="noopener"
        class="social-link"
        :title="link.icon"
      >
        <svg v-if="link.icon === 'github'" viewBox="0 0 24 24" class="social-icon">
          <path fill="currentColor" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
        <svg v-else-if="link.icon === 'twitter'" viewBox="0 0 24 24" class="social-icon">
          <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
        <svg v-else-if="link.icon === 'rss'" viewBox="0 0 24 24" class="social-icon">
          <path fill="currentColor" d="M19.199 24C19.199 13.467 10.533 4.8 0 4.8V0c13.165 0 24 10.835 24 24h-4.801zM3.291 17.415a3.3 3.3 0 0 1 3.293 3.295A3.303 3.303 0 0 1 3.283 24C1.47 24 0 22.526 0 20.71s1.475-3.294 3.291-3.295zM15.909 24h-4.665c0-6.169-5.075-11.245-11.244-11.245V8.09c8.727 0 15.909 7.184 15.909 15.91z"/>
        </svg>
        <svg v-else viewBox="0 0 24 24" class="social-icon">
          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      </a>
    </div>

    <!-- 版权信息及访问统计 -->
    <div v-if="copyright || showStats" class="footer-line">
      <span v-if="copyright" class="copyright">{{ copyright }}</span>
      <span v-if="copyright && showStats" class="divider">|</span>
      <span v-if="showStats" class="stats">
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

// 从 head 的 meta 标签获取社交链接
const socialLinks = computed(() => {
  const headMeta = (site.value.head || []) as any[]
  const socialMeta = headMeta.find(
    (item) => item[0] === 'meta' && item[1]?.name === 'social-links'
  )
  if (socialMeta?.[1]?.content) {
    try {
      return JSON.parse(socialMeta[1].content)
    } catch {
      return []
    }
  }
  return []
})

// 是否显示访问统计
const showStats = computed(() => {
  const headMeta = (site.value.head || []) as any[]
  const statsMeta = headMeta.find(
    (item) => item[0] === 'meta' && item[1]?.name === 'site-stats'
  )
  return statsMeta?.[1]?.content !== 'false'
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
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px 16px;
  text-align: center;
  background: linear-gradient(to top, var(--vp-c-bg) 0%, transparent 100%);
  z-index: 10;
}

.social-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  transition: all 0.2s ease;
}

.social-link:hover {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

.social-icon {
  width: 18px;
  height: 18px;
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