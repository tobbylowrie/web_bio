<template>
  <div class="container">
    <div class="rotating-background"></div>
    <div class="content-wrapper">
      <a href="https://github.com/tobbylowrie/"><img class="img-fluid" src="/avatar.png" alt="lowrie-logo"
          width="200px"></a>
      <div class="text-wrapper">
        <h1 class="title-text mt-3"><strong><span id="title"></span></strong></h1>
        <p class="discribe-text mt-1"><span id="desc"></span></p>
        <ul class="links">
          <li class="links-item"><a class="btn" href="https://tobbylowrie.com/blogs" type="button">
              visit my blog</a></li>
          <li class="links-item">
            <a class="btn" href="https://github.com/tobbylowrie/" type="button">
              github
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

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
  position: fixed;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  /* background: radial-gradient(rgba(127, 78, 45, 0.4) 2px, transparent 1px); */
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

@keyframes scale {
  0% {
    background-size: 45px 45px;
  }

  100% {
    background-size: 55px 55px;
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
  min-height: 70vh;
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
}

.title-text {
  color: var(--text-primary);
  background-color: transparent;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 3.4rem;
  padding: 5px 15px;
  border-radius: 10px;
  text-shadow:
    -1px -1px 0 var(--bg-color),
    1px -1px 0 var(--bg-color),
    -1px 1px 0 var(--bg-color),
    1px 1px 0 var(--bg-color);
  line-height: 1;
}

/* 标题光标样式 */
#title+.typed-cursor {
  font-size: 3.4rem;
  color: var(--text-primary);
  position: relative;
  margin-left: 5px;
  vertical-align: baseline;
  animation: blink 0.7s infinite;
}

/* 描述文字光标样式 */
#desc+.typed-cursor {
  font-size: 1.5rem;
  color: var(--text-secondary);
  position: relative;
  margin-left: 3px;
  vertical-align: baseline;
  animation: blink 0.7s infinite;
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
}
.btn:hover {
  color: var(--text-primary);
  background-color: var(--vp-c-default-1);
}



.mt-5 {
  margin-top: 50px;
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
  transition: opacity 0.96s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.96s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  /* GitHub风格的头像样式 */
  border-radius: 50%;
  border: 1px solid rgba(127, 78, 45, 0.2);
  box-shadow: 0 0 0 1px rgba(127, 78, 45, 0.15);
  background-color: var(--bg-color);
}

.img-fluid.show {
  opacity: 1;
  transform: scale(1) translateY(0);
}

/* 按钮渐入动画 */
.btn {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.btn.show {
  opacity: 1;
  transform: translateY(0);
}
</style>

<script setup>
import { onMounted } from 'vue'
import Typed from 'typed.js'

// 统一设置光标消失延迟时间
const cursorDelay = 1 * 1000;
// 设置光标显示字符
const cursorChar = '_';

onMounted(() => {
  // 图片动画
  setTimeout(() => {
    document.querySelector('.img-fluid').classList.add('show');
  }, 100);

  // 按钮动画延迟显示
  setTimeout(() => {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach((button, index) => {
      setTimeout(() => {
        button.classList.add('show');
      }, 2500 + (index * 200)); // 在打字效果后显示，每个按钮间隔200ms
    });
  }, 100);

  // 文字打字机效果
  setTimeout(() => {
    new Typed('#title', {
      strings: ["Hey, I'm TobbyLowrie"],
      typeSpeed: 50,
      showCursor: true,
      cursorChar: cursorChar,
      onComplete: function (self) {
        // 3秒后隐藏光标
        setTimeout(() => {
          document.querySelector('.typed-cursor').style.display = 'none';
        }, cursorDelay);

        // 标题完成后开始描述文字
        new Typed('#desc', {
          strings: ["A html web desgin lover, building things with love."],
          typeSpeed: 40,
          showCursor: true,
          cursorChar: cursorChar,
          onComplete: function (self) {
            // 3秒后隐藏第二个光标
            setTimeout(() => {
              document.querySelectorAll('.typed-cursor')[1].style.display = 'none';
            }, cursorDelay);
          }
        });
      }
    });
  }, 200);
})
</script>