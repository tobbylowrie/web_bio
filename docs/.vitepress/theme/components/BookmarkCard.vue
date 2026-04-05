<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface BookmarkData {
  title: string
  description: string
  image: string
  logo: string
  url: string
  publisher: string
}

const props = defineProps<{
  url: string
}>()

const loading = ref(true)
const error = ref('')
const bookmarkData = ref<BookmarkData | null>(null)

// 提取域名
const domain = computed(() => {
  if (!props.url) return ''
  try {
    const urlObj = new URL(props.url)
    return urlObj.hostname.replace(/^www\./, '')
  } catch {
    return props.url
  }
})

// 获取 favicon
const getFavicon = (url: string) => {
  try {
    const urlObj = new URL(url)
    return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=32`
  } catch {
    return ''
  }
}

// 使用 microlink API 获取网页元数据
const fetchBookmarkData = async () => {
  if (!props.url) {
    error.value = '请提供有效的 URL'
    loading.value = false
    return
  }

  try {
    loading.value = true
    error.value = ''

    const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(props.url)}`
    const response = await fetch(apiUrl)
    const data = await response.json()

    if (data.status === 'success' && data.data) {
      const { title, description, image, logo, publisher } = data.data
      bookmarkData.value = {
        title: title || '无标题',
        description: description || '',
        image: image?.url || '',
        logo: logo?.url || getFavicon(props.url),
        url: props.url,
        publisher: publisher || domain.value
      }
    } else {
      // 如果 API 失败，使用备用数据
      bookmarkData.value = {
        title: domain.value,
        description: '',
        image: '',
        logo: getFavicon(props.url),
        url: props.url,
        publisher: domain.value
      }
    }
  } catch (err) {
    console.error('获取书签数据失败:', err)
    // 失败时显示基本卡片
    bookmarkData.value = {
      title: domain.value,
      description: '',
      image: '',
      logo: getFavicon(props.url),
      url: props.url,
      publisher: domain.value
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchBookmarkData()
})
</script>

<template>
  <div class="bookmark-card-container">
    <!-- 加载状态 -->
    <div v-if="loading" class="bookmark-card loading">
      <div class="bookmark-content">
        <div class="skeleton-title"></div>
        <div class="skeleton-desc"></div>
        <div class="skeleton-domain"></div>
      </div>
      <div class="skeleton-image"></div>
    </div>

    <!-- 错误状态 - 显示基础链接 -->
    <a
      v-else-if="error"
      :href="url"
      target="_blank"
      rel="noopener noreferrer"
      class="bookmark-card error"
    >
      <div class="bookmark-content">
        <div class="bookmark-title">{{ domain }}</div>
        <div class="bookmark-description">无法获取页面信息</div>
        <div class="bookmark-footer">
          <img :src="getFavicon(url)" alt="" class="bookmark-favicon" v-if="getFavicon(url)">
          <span class="bookmark-domain">{{ domain }}</span>
        </div>
      </div>
    </a>

    <!-- 正常状态 -->
    <a
      v-else-if="bookmarkData"
      :href="bookmarkData.url"
      target="_blank"
      rel="noopener noreferrer"
      class="bookmark-card"
    >
      <div class="bookmark-content">
        <div class="bookmark-title">{{ bookmarkData.title }}</div>
        <div class="bookmark-description" v-if="bookmarkData.description">
          {{ bookmarkData.description }}
        </div>
        <div class="bookmark-footer">
          <img :src="bookmarkData.logo" alt="" class="bookmark-favicon" v-if="bookmarkData.logo">
          <span class="bookmark-domain">{{ bookmarkData.publisher }}</span>
        </div>
      </div>
      <div class="bookmark-image-wrapper" v-if="bookmarkData.image">
        <img
          :src="bookmarkData.image"
          :alt="bookmarkData.title"
          class="bookmark-image"
          loading="lazy"
        >
      </div>
    </a>
  </div>
</template>

<style scoped>
.bookmark-card-container {
  margin: 1rem 0;
}

.bookmark-card {
  display: flex;
  align-items: stretch;
  gap: 0px;
  padding: 0px;
  background: #fff0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.2s ease;
  overflow: hidden;
}

.bookmark-card:hover {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.bookmark-content {
  flex: 1;
  display: flex;
  padding: 12px 14px;
  flex-direction: column;
  min-width: 0;
  gap: 8px;
}

.bookmark-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.bookmark-description {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.bookmark-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
  padding-top: 0px;
}

.bookmark-favicon {
  width: 16px;
  height: 16px;
  border-radius: 2px;
  object-fit: contain;
  flex-shrink: 0;
}

.bookmark-domain {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.bookmark-image-wrapper {
  flex-shrink: 0;
  width: 200px;
  height: 130px;
  border-radius: 0px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.bookmark-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

/* 加载状态骨架屏 */
.bookmark-card.loading {
  pointer-events: none;
}

.skeleton-title,
.skeleton-desc,
.skeleton-domain,
.skeleton-image {
  background: linear-gradient(
    90deg,
    var(--vp-c-bg-mute) 25%,
    var(--vp-c-bg-soft) 50%,
    var(--vp-c-bg-mute) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

.skeleton-title {
  width: 70%;
  height: 20px;
}

.skeleton-desc {
  width: 90%;
  height: 32px;
}

.skeleton-domain {
  width: 40%;
  height: 16px;
}

.skeleton-image {
  width: 120px;
  height: 80px;
  border-radius: 8px;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* 错误状态 */
.bookmark-card.error {
  opacity: 0.8;
}

/* 移动端适配 */
@media (max-width: 480px) {
  .bookmark-card {
    padding: 0px;
    gap: 0px;
  }

  .bookmark-image-wrapper {
    width: 80px;
    height: auto;
  }

  .bookmark-title {
    font-size: 0.875rem;
  }

  .bookmark-description {
    font-size: 0.8rem;
    -webkit-line-clamp: 2;
  }

  .skeleton-image {
    width: 80px;
    height: 60px;
  }
}
</style>
