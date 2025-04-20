import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TobbyLowrie Blog",
  description: "TobbyLowrie Blog",
  head: [
    ['link', { rel: 'icon', href: '/icon.ico' }]
  ],
  themeConfig: {
    darkModeSwitchLabel: '深色模式', // 修改开关标签为中文
    darkModeSwitchTitle: '切换深色/浅色模式', // 修改鼠标悬停提示
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
      '/blogs/测试博客': [
        {
          text: '测试博客',
          items: [
            { text: '测试博客2', link: '/blogs/测试博客/测试博客2' },
            { text: '测试博客3', link: '/blogs/测试博客/测试博客3' },
            { text: 'MarkDown 语法测试', link: '/blogs/测试博客/markdown语法测试集合.md' }
            // { text: '第一篇博客', link: '/blogs/第一篇博客' }
          ]
        }
      ],
      '/blogs/折腾树莓派': [
        {
          text: '折腾树莓派',
          items: [
            { text: '配置树莓派 Zero 2W 的 USB 口为虚拟串口 (ttyGS0)', link: 'docs/blogs/折腾树莓派/配置树莓派 Zero 2W 的 USB 口为虚拟串口 (ttyGS0).md'}
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/tobbylowrie/' },
    ]
  }
})
