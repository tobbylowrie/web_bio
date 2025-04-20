import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TobbyLowrie Blog",
  description: "TobbyLowrie Blog",
  head: [
    ['link', { rel: 'icon', href: '/icon.ico' }]
  ],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/blogs' },
    ],
    lastUpdated: {
      text: '最后更新日期',
      formatOptions: {
        dateStyle: 'long',
        timeStyle: 'short'
      }
    },
    sidebar: {
      '/blogs/': [
        {
          text: '博客文章',
          items: [
            { text: '测试博客2', link: '/blogs/测试博客2' },
            { text: '测试博客3', link: '/blogs/测试博客3' },
            { text: '第一篇博客', link: '/blogs/第一篇博客' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/tobbylowrie/' },
    ]
  }
})
