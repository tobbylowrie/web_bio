<template>
  <a :href="href" class="card-link">
    <div class="card-image-wrapper">
      <div class="card-bg-square"></div>
      <img
        :src="image"
        :alt="title"
        class="card-image no-viewer"
        loading="lazy"
        decoding="async"
      />
    </div>
    <h3 class="card-title">{{ title }}</h3>
  </a>
</template>

<script setup lang="ts">
interface Props {
  title: string
  image: string
  href: string
}

defineProps<Props>()
</script>

<style scoped>
.card-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
}

.card-image-wrapper {
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 背景正方形 - 160px，圆角20px，垂直居中，底部对齐 */
.card-bg-square {
  position: absolute;
  width: 160px;
  height: 160px;
  background: var(--lowrie-c-icon-bg);
  border-radius: 20px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 0;
}

/* 图片 - 200px正方形，圆角20px */
.card-image {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 20px;
  object-fit: cover;
  z-index: 1;
}

/* 标题 - 加粗 */
.card-title {
  margin-top: 16px;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  text-align: center;
}

/* 悬停效果 - 背景缩小10%，图片放大10%，1s ease过渡 */
.card-link:hover .card-bg-square {
  transform: translateX(-50%) scale(0.9);
}

.card-link:hover .card-image {
  transform: scale(1.1);
}

.card-bg-square,
.card-image {
  transition: transform .3s ease;
}

</style>
