import { createContentLoader } from 'vitepress'

export default createContentLoader(
  ['blogs/**/*.md', '!blogs/index.md'], // 使用更精确的glob模式
  {
    includeSrc: false,
    render: false,
    excerpt: true
  }
)