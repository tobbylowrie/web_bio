import { defineConfig } from 'vitepress'
import mk from '@iktakahiro/markdown-it-katex'
import katex from 'katex'
import { RssPlugin } from 'vitepress-plugin-rss'

// 导入模块化配置
import { navConfig } from './config/nav'
import { defaultSidebar } from './config/sidebar'
import { socialConfig } from './config/social'
import { rssConfig } from './config/rss'
import { seoConfig } from './config/seo'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcExclude: ['blogs/测试博客/**'],
  title: seoConfig.title,
  description: seoConfig.description,
  head: seoConfig.head,
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
    socialLinks: socialConfig,
    outline: [2, 4], // 显示从 h2 到 h4 的标题
    outlineTitle: '本页目录',
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    skipToContentLabel: '跳到内容',
    langMenuLabel: '切换语言'
  },
  vite: {
    plugins: [RssPlugin(rssConfig)]
  }
})