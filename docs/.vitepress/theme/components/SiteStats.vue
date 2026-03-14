<template>
  <div class="site-stats">
    <span v-for="(stat, index) in stats" :key="index" class="stat-item">
      <span class="stat-label">{{ stat.label }}</span>
      <span class="stat-value">{{ stat.value }}</span>
      <span v-if="index < stats.length - 1" class="stat-divider">·</span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const stats = ref([
  { value: '...', label: '总访问：' },
  { value: '...', label: '访客：' },
  { value: '...', label: '今日：' }
])
</script>

<style scoped>
.site-stats {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-top: 24px;
  padding: 6px 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 20px;
  border: 1px solid var(--vp-c-divider);
}

.stat-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.stat-value {
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.stat-label {
  font-size: 0.7rem;
}

.stat-divider {
  margin: 0 4px;
  opacity: 0.5;
}
</style>
