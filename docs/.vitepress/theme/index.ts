// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import 'viewerjs/dist/viewer.min.css';
import imageViewer from 'vitepress-plugin-image-viewer';
import vImageViewer from 'vitepress-plugin-image-viewer/lib/vImageViewer.vue';
import { useRoute } from 'vitepress';
import busuanzi from 'busuanzi.pure.js';

// 引入全局 CSS
import './style.css'

// 引入自定义组件
// @ts-ignore: allow importing Vue SFCs without type declarations
import MyHero from './components/MyHero.vue'
// @ts-ignore: allow importing Vue SFCs without type declarations
import RecentPosts from './components/RecentPosts.vue'
// @ts-ignore: allow importing Vue SFCs without type declarations
import BackToTop from './components/BackToTop.vue'
// @ts-ignore: allow importing Vue SFCs without type declarations
import AsideOutlineAfter from './components/aside-outline-after.vue'
// @ts-ignore: allow importing Vue SFCs without type declarations
import HomeFooter from './components/HomeFooter.vue'
// @ts-ignore: allow importing Vue SFCs without type declarations
import HeroLinkIcon from './components/HeroLinkIcon.vue'
// @ts-ignore: allow importing Vue SFCs without type declarations
import BookmarkCard from './components/BookmarkCard.vue'
import NotFound from './components/NotFound.vue'
// @ts-ignore: allow importing Vue SFCs without type declarations
import ArticleMeta from './components/ArticleMeta.vue'
// @ts-ignore: allow importing Vue SFCs without type declarations
import AutoBookmark from './components/AutoBookmark.vue'
// @ts-ignore: allow importing Vue SFCs without type declarations
import GiscusComments from './components/GiscusComments.vue'
// 引入模块 CSS
import 'katex/dist/katex.min.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      // 'aside-outline-after': () => h(AsideOutlineAfter),
      'doc-after': () => h('div', [h(ArticleMeta), h(AutoBookmark), h(GiscusComments)]),
      'doc-bottom': () => h(BackToTop),
      'not-found': () => h(NotFound)
    })
  },
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('MyHero', MyHero)
    app.component('RecentPosts', RecentPosts)
    app.component('BackToTop', BackToTop)
    app.component('HomeFooter', HomeFooter)
    app.component('HeroLinkIcon', HeroLinkIcon)
    app.component('BookmarkCard', BookmarkCard)
    app.component('AutoBookmark', AutoBookmark)
    app.component('vImageViewer', vImageViewer);

    // 如果在客户端，初始化不蒜子统计
    if (typeof window !== 'undefined') {
      // @ts-ignore
      window.busuanzi = busuanzi;
    }
  },

  setup() {
    // 获取路由
    const route = useRoute();
    // 使用 viewerjs，过滤掉带有 no-viewer 类的图片
    imageViewer(route, '.vp-doc', {
      filter(image: HTMLImageElement) {
        return !image.classList.contains('no-viewer');
      }
    });
  }
} satisfies Theme
