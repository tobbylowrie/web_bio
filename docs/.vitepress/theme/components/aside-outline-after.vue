<template>
  <div class="aside-outline-after">
    <hr class="spacer"/>
    <BackToTop />
  </div>
</template>

<script setup>
import BackToTop from './BackToTop.vue'
</script>

<style scoped>
.aside-outline-after {
  margin-top: 1rem;
}
.spacer {
  display: block;
  margin: 0;
  padding: 0;
  background: transparent;
  box-shadow: none;
  color: transparent;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  height: 1rem;
  width: 100%;
}
</style>