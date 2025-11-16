# web_bio

这是一个基于 VitePress 构建的个人博客网站，用于记录和分享技术实践与学习笔记。

## 简介

本项目主要用于发布关于以下主题的技术文章：
- Docker 与容器化部署
- Minecraft 服务器管理（MCSM）
- 树莓派开发与配置
- HomeAssistant 智能家居系统
- PVE 虚拟化平台

所有内容均以 Markdown 格式编写，位于 `docs/` 目录下，并通过 VitePress 进行静态站点生成。

## 项目结构

```
web_bio/
├── docs/                     # VitePress 内容目录
│   ├── index.md              # 首页
│   ├── blogs/                # 博客文章目录
│   │   ├── 第一篇博客.md
│   │   ├── 基于Docker搭建MCSM（MC服务器管理软件）.md
│   │   └── ...
│   └── .vitepress/           # VitePress 配置文件
└── README.md                 # 项目说明文件
```

## 使用方式

1. 克隆本仓库
2. 安装依赖：`npm install`
3. 启动本地服务：`npm run docs:dev`
4. 构建生产版本：`npm run docs:build`

## 贡献

欢迎提交 Issue 或 Pull Request 来改进内容或修复问题。