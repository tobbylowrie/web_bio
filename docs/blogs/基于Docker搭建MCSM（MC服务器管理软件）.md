---
title:  基于Docker搭建MCSM（MC服务器管理软件）
date: 2024-01-01 12:00:00
description: None
author: 深韩
tags: [Minecraft,软件,教程]
---
# 基于Docker搭建MCSM（MC服务器管理软件）

## 1. 安装docker
略

## 2. 安装MCSM
这里使用 docker compose 方法安装
```docker
# docker-compose.yml
services:
  web:
    image: githubyumao/mcsmanager-web:latest
    ports:
      - "23333:23333"
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - <CHANGE_ME_TO_INSTALL_PATH>/web/data:/opt/mcsmanager/web/data
      - <CHANGE_ME_TO_INSTALL_PATH>/web/logs:/opt/mcsmanager/web/logs

  daemon:
    image: githubyumao/mcsmanager-daemon:latest
    restart: unless-stopped
    ports:
      - "24444:24444"
    environment:
      - MCSM_DOCKER_WORKSPACE_PATH=<CHANGE_ME_TO_INSTALL_PATH>/daemon/data/InstanceData
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - <CHANGE_ME_TO_INSTALL_PATH>/daemon/data:/opt/mcsmanager/daemon/data
      - <CHANGE_ME_TO_INSTALL_PATH>/daemon/logs:/opt/mcsmanager/daemon/logs
      - /var/run/docker.sock:/var/run/docker.sock
```
代码中 `<CHANGE_ME_TO_INSTALL_PATH>` 均修改为 `.` 即安装目录为当前位置

## 3. Nginx 反向代理
由于 MCSM 采用前后端分离技术，并且本服务搭建在内网环境下，需要使用内网穿透（SakuraFrp），为了减少通道条数，故采用 Nginx 反向代理的方法对前后端进行路由