<template>
  <div class="container">
    <div class="rotating-background"></div>
    <div class="content-wrapper">
      <a href="https://github.com/tobbylowrie/">
        <img
          ref="avatarRef"
          class="img-fluid"
          src="/avatar.png"
          alt="lowrie-logo"
          width="200px"
          loading="lazy"
          decoding="async"
        />
      </a>
      <div class="text-wrapper">
        <h1 class="title-text mt-3">
          <strong><span ref="titleRef" id="title"></span></strong>
          <span ref="titleCursorRef" class="typed-cursor"></span>
        </h1>
        <p class="discribe-text mt-1">
          <span ref="descRef" id="desc"></span>
          <span ref="descCursorRef" class="typed-cursor"></span>
        </p>
        <!-- <ul class="links">
          <li
            v-for="(link, index) in links"
            :key="index"
            class="links-item"
          >
            <a
              ref="buttonRefs"
              class="btn"
              :href="link.href"
              type="button"
            >
              {{ link.text }}
            </a>
          </li>
        </ul> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Typed from 'typed.js'

// 链接配置
const links = [
  { href: 'https://blog.tobbylowrie.com/blogs', text: '博客文章列表' },
  { href: 'https://github.com/tobbylowrie/', text: 'github主页' }
]

// refs
const avatarRef = ref<HTMLImageElement>()
const titleRef = ref<HTMLSpanElement>()
const descRef = ref<HTMLSpanElement>()
const titleCursorRef = ref<HTMLSpanElement>()
const descCursorRef = ref<HTMLSpanElement>()
const buttonRefs = ref<HTMLAnchorElement[]>([])

const cursorChar = '|'
const CURSOR_HIDE_DELAY = 1000
const DESC_CURSOR_HIDE_DELAY = 3000
const BUTTON_STAGGER_DELAY = 200

onMounted(() => {
  // 头像动画
  setTimeout(() => {
    avatarRef.value?.classList.add('show')
  }, 100)

  // 按钮动画延迟显示
  setTimeout(() => {
    buttonRefs.value.forEach((button, index) => {
      setTimeout(() => {
        button.classList.add('show')
      }, 2000 + (index * BUTTON_STAGGER_DELAY))
    })
  }, 100)

  // 文字打字机效果
  setTimeout(() => {
    if (!titleRef.value) return

    new Typed(titleRef.value, {
      strings: ['你好, 我是深韩'],
      typeSpeed: 50,
      showCursor: false, // 使用自定义光标
      onComplete: () => {
        // 隐藏标题光标
        setTimeout(() => {
          if (titleCursorRef.value) {
            titleCursorRef.value.style.display = 'none'
          }
        }, CURSOR_HIDE_DELAY)

        // 标题完成后开始描述文字
        if (!descRef.value) return

        new Typed(descRef.value, {
          strings: ['欢迎你来到我的个人主页'],
          typeSpeed: 40,
          showCursor: false, // 使用自定义光标
          onComplete: () => {
            // 隐藏描述光标
            setTimeout(() => {
              if (descCursorRef.value) {
                descCursorRef.value.style.display = 'none'
              }
            }, DESC_CURSOR_HIDE_DELAY)
          }
        })
      }
    })

    // 手动触发光标闪烁动画
    if (titleCursorRef.value) {
      titleCursorRef.value.textContent = cursorChar
    }
  }, 200)
})
</script>

<style scoped>
body {
  margin: 0;
  padding: 20px;
  font-family: Helvetica, Arial, sans-serif;
  position: relative;
  overflow: hidden;
}

/* 旋转背景 */
.rotating-background {
  z-index: -99;
  position: fixed;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(var(--vp-c-text-1) 2px, transparent 1px);
  background-size: 50px 50px;
  animation: rotate 60s linear infinite, twinkle 3s ease-in-out infinite alternate;
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.02;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

h1,
h2,
p {
  margin: 0px;
}

.container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  padding: 20px;
  margin-top: 3rem;
  margin-bottom: 2rem;
}

.title-text {
  color: var(--text-primary);
  background-color: transparent;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 2rem;
  padding: 5px 15px;
  border-radius: 10px;
  text-shadow:
    -1px -1px 0 var(--bg-color),
    1px -1px 0 var(--bg-color),
    -1px 1px 0 var(--bg-color),
    1px 1px 0 var(--bg-color);
  line-height: 1;
}

/* 光标样式 */
.typed-cursor {
  font-size: 2rem;
  color: var(--text-primary);
  position: relative;
  margin-left: 5px;
  vertical-align: baseline;
  animation: blink 0.7s infinite;
}

.discribe-text .typed-cursor {
  font-size: 1.5rem;
  color: var(--text-secondary);
  margin-left: 3px;
}

/* 光标闪烁动画 */
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.discribe-text {
  color: var(--text-secondary);
  background-color: transparent;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 1.5rem;
  padding: 5px 15px;
  border-radius: 10px;
  text-shadow:
    -1px -1px 0 var(--bg-color),
    1px -1px 0 var(--bg-color),
    -1px 1px 0 var(--bg-color),
    1px 1px 0 var(--bg-color);
}

.links {
  display: flex;
  list-style: none;
  margin: 0px;
  margin-top: 46px;
  padding: 0px;
  justify-content: center;
}

.links-item {
  margin: 4px;
}

.btn {
  color: var(--text-primary);
  background-color: var(--vp-c-default-3);
  padding: 12px;
  border-radius: 7px;
  text-decoration: none;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.btn:hover {
  color: var(--text-primary);
  background-color: var(--vp-c-default-1);
}

.btn.show {
  opacity: 1;
  transform: translateY(0);
}

.mt-3 {
  margin-top: 30px;
}

.mt-1 {
  margin-top: 10px;
}

.img-fluid {
  opacity: 0;
  transform: scale(0.5) translateY(-20px);
  transition: opacity 0.96s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    transform 0.96s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border-radius: 50%;
  border: 1px solid rgba(127, 78, 45, 0.2);
  box-shadow: 0 0 0 1px rgba(127, 78, 45, 0.15);
  background-color: var(--bg-color);
}

.img-fluid.show {
  opacity: 1;
  transform: scale(1) translateY(0);
}
</style>
