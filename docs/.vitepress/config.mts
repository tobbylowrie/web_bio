import { defineConfig } from 'vitepress'
import mk from '@iktakahiro/markdown-it-katex'
import katex from 'katex'
import { RssPlugin } from 'vitepress-plugin-rss'

// 导入模块化配置
import { navConfig } from './config/nav'
import { defaultSidebar } from './config/sidebar'
import { socialConfig } from './config/social'
import { rssConfig } from './config/rss'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "深韩的个人主页",
  description: "深韩的个人主页",
  head: [
    ['link', { rel: 'icon', href: '/icon.ico' }],
    ['link', { rel: 'apple-touch-icon', href: '/avatar.png' }],
    ['meta', { name: 'description', content: 'TobbyLowrie 技术博客' }],
    ['meta', { name: 'keywords', content: '技术博客,Docker,树莓派,PVE,AI,编程,开发' }],
    ['meta', { name: 'author', content: 'TobbyLowrie' }],
    ['meta', { name: 'theme-color', content: '#874fd6' }],
    ['meta', { property: 'og:title', content: 'TobbyLowrie Blog' }],
    ['meta', { property: 'og:description', content: '分享技术实践与学习笔记' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://space.tobbylowrie.com' }],
    ['meta', { property: 'og:image', content: 'https://space.tobbylowrie.com/avatar.png' }],
    ['meta', { property: 'og:site_name', content: 'TobbyLowrie Blog' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: 'TobbyLowrie Blog' }],
    ['meta', { name: 'twitter:description', content: '分享技术实践与学习笔记' }],
    ['meta', { name: 'twitter:image', content: 'https://space.tobbylowrie.com/avatar.png' }],
    ['script', { type: 'application/ld+json' }, `
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "TobbyLowrie",
        "url": "https://space.tobbylowrie.com",
        "image": "https://space.tobbylowrie.com/avatar.png",
        "sameAs": [
          "https://github.com/tobbylowrie/"
        ],
        "description": "技术博客作者，分享技术实践与学习笔记"
      }
    `],
  ],
  markdown: {
    config: (md) => {
      md.use(mk, { katex })
    }
  },
  themeConfig: {
    darkModeSwitchLabel: '深色模式', // 修改开关标签为中文
    darkModeSwitchTitle: '切换深色/浅色模式', // 修改鼠标悬停提示
    nav: navConfig,
    lastUpdated: {
      text: '最后更新日期',
      formatOptions: {
        dateStyle: 'long',
        timeStyle: 'short'
      }
    },
    sidebar: defaultSidebar,
    socialLinks: socialConfig
  },
  vite: {
    plugins: [RssPlugin(rssConfig)]
  }
})