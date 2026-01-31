// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import 'viewerjs/dist/viewer.min.css';
import imageViewer from 'vitepress-plugin-image-viewer';
import vImageViewer from 'vitepress-plugin-image-viewer/lib/vImageViewer.vue';
import { useRoute } from 'vitepress';

// 引入全局 CSS
import './style.css'

// 引入自定义组件
import MyHero from './components/MyHero.vue'
import RecentPosts from './components/RecentPosts.vue'
import BackToTop from './components/BackToTop.vue'
import AsideOutlineAfter from './components/aside-outline-after.vue'

// 引入模块 CSS
import 'katex/dist/katex.min.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'aside-outline-after': () => h(AsideOutlineAfter),
      'doc-bottom': () => h(BackToTop)
    })
  },
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('MyHero', MyHero)
    app.component('RecentPosts', RecentPosts)
    app.component('BackToTop', BackToTop)
    app.component('vImageViewer', vImageViewer);
    
    // 如果在客户端，添加typed.js脚本
    if (typeof window !== 'undefined') {
      // 动态加载typed.js
      // import('typed.js').catch(e => {
      //   console.error('Failed to load typed.js:', e)
      // })
    }
  },
  setup() {
        // 获取路由
        const route = useRoute();
        // 使用
        imageViewer(route);
    }
} satisfies Theme
