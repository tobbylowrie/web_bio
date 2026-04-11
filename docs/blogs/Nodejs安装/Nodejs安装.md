---
title: Nodejs安装
date: 2026-04-03
time: 2026-04-03T12:00:00
hide: false
tags:
  - NodeJS
  - 教程
author:
  - 深韩
sidebar: false
aliases:
description: Linux系统下Node.js的手动安装与配置
category: 开发环境
layout: doc
---

# Nodejs安装

## 手动安装方法

先安装相关依赖

```bash
sudo apt update
sudo apt install -y curl build-essential
```

通过官网下载 Nodejs 

https://nodejs.org/zh-cn/download


解压下载的安装包，并移动到指定位置 /usr/local/nodejs

```bash
tar -xf node-v20.xx.xx-linux-x64.tar.xz
sudo mv node-v20.xx.xx-linux-x64 /opt/nodejs
```

链接可执行文件到 /usr/local/bin

```bash
sudo ln -s /opt/nodejs/bin/node /usr/local/bin/node
sudo ln -s /opt/nodejs/bin/npm /usr/local/bin/npm
sudo ln -s /opt/nodejs/bin/npx /usr/local/bin/npx
```

## 可选步骤

npm 更换国内源

```bash
npm config set registry https://registry.npmmirror.com 
```
