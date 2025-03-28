// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import MyHero from './components/MyHero.vue'
import MyCustomLayout from './MyCustomLayout.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('MyHero', MyHero)
    
    // 如果在客户端，添加typed.js脚本
    if (typeof window !== 'undefined') {
      // 动态加载typed.js
      // import('typed.js').catch(e => {
      //   console.error('Failed to load typed.js:', e)
      // })
    }
  }
} satisfies Theme
