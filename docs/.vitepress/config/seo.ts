/**
 * SEO 配置
 */
export const seoConfig = {
  title: "深韩的个人主页",
  description: "深韩的个人主页",
  head: [
    ['link', { rel: 'icon', href: '/icon.ico' }],
    ['meta', { name: 'description', content: '深韩的个人主页' }],
    ['meta', { name: 'keywords', content: '技术博客,Docker,树莓派,PVE,AI' }],
    ['meta', { property: 'og:title', content: '深韩的主页' }],
    ['meta', { property: 'og:description', content: '分享技术实践与学习笔记' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['link', { rel: 'apple-touch-icon', href: '/avatar.png' }],
    ['meta', { name: 'author', content: 'TobbyLowrie' }],
    ['meta', { name: 'theme-color', content: '#874fd6' }],
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
  ] as any,
};