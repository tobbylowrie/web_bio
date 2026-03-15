<script setup>
</script>

<template>
  <div class="not-found">
    <div class="link-cards-container">
      <a :href="'/'" class="card-link">
        <div class="card-image-wrapper">
          <div class="card-bg-square"></div>
          <img src="/404.png" alt="404" class="card-image" />
        </div>
        <h3 class="card-title">404 - 页面未找到</h3>
      </a>
    </div>
  </div>
</template>

<style scoped>
.link-cards-container {
  display: flex;
  justify-content: center;
  gap: 48px;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 40px;
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
  margin-top: 2rem;
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

@media (max-width: 640px) {
  .link-cards-container {
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }
}

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 2rem;
}

.not-found-image {
  max-width: 200px;
  width: 100%;
  height: auto;
  margin-bottom: 1.5rem;
  border-radius: 25px;
}
</style>