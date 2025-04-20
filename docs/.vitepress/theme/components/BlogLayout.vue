<template>
  <div class="blog-layout">
    <Content class="vp-doc" />
    <div class="blog-meta">
      <div class="update-time" v-if="frontmatter.date">
        更新时间: {{ frontmatter.date }}
      </div>
      <div class="tags" v-if="frontmatter.tags">
        <span v-for="tag in frontmatter.tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useData } from 'vitepress'
const { frontmatter } = useData()
</script>

<style scoped>

.blog-meta {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.update-time {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: var(--vp-c-bg-mute);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

</style>