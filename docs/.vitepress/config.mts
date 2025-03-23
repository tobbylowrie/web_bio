import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TobbyLowrie HomePage",
  description: "A VitePress Site",
  head: [
    ['link', { rel: 'icon', href: '/icon.ico' }]
  ],
  // 设置自定义首页
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' }
      // { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/tobbylowrie/' },
      { icon: 'github', link: 'https://github.com/tobbylowrie/' }
    ]
  }
})
