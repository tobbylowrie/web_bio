<template>
  <div class="giscus-comments">
    <div id="giscus-container"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

interface Props {
  repo?: string
  repoId?: string
  category?: string
  categoryId?: string
  mapping?: string
  strict?: string
  reactionsEnabled?: string
  emitMetadata?: string
  inputPosition?: string
  theme?: string
  lang?: string
}

const props = withDefaults(defineProps<Props>(), {
  repo: 'tobbylowrie/web_bio',
  repoId: 'R_kgDON6VjIQ',
  category: 'Announcements',
  categoryId: 'DIC_kwDON6VjIc4C6n0S',
  mapping: 'pathname',
  strict: '0',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  theme: 'preferred_color_scheme',
  lang: 'zh-CN'
})

onMounted(() => {
  const container = document.getElementById('giscus-container')
  if (!container) return

  // 清除之前的内容
  container.innerHTML = ''

  // 创建 giscus script 元素
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', props.repo)
  script.setAttribute('data-repo-id', props.repoId)
  script.setAttribute('data-category', props.category)
  script.setAttribute('data-category-id', props.categoryId)
  script.setAttribute('data-mapping', props.mapping)
  script.setAttribute('data-strict', props.strict)
  script.setAttribute('data-reactions-enabled', props.reactionsEnabled)
  script.setAttribute('data-emit-metadata', props.emitMetadata)
  script.setAttribute('data-input-position', props.inputPosition)
  script.setAttribute('data-theme', props.theme)
  script.setAttribute('data-lang', props.lang)
  script.setAttribute('crossorigin', 'anonymous')
  script.async = true

  container.appendChild(script)
})
</script>

<style scoped>
.giscus-comments {
  margin-top: 2rem;
  padding-top: 2rem;
}
</style>