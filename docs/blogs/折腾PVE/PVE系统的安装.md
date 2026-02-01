---
title: PVE 系统的安装
date: 2024-01-01 12:00:00
description: 探索编程世界的第一步
author: 深韩
---

# PVE 系统的安装

## 0. 安装环境

PVE版本：proxmox-ve_8.4-1.iso
硬件信息：
 - CPU：4 x Intel(R) Core(TM) i3-4130T CPU @ 2.90GHz (1 插槽)
 - 内存：16 GiB
 - 硬盘：120 GiB SSD

## 1. 系统的安装

系统下载地址：[https://enterprise.proxmox.com/iso/](https://enterprise.proxmox.com/iso/)

1.1 将下载好的系统镜像写入U盘中

1.2 注意在设置IP地址时选择好对应的网卡，以及设置静态IPv4地址，方便后续进行web登录

## 2. 系统基本设置和优化

2.1 使用 [pve_source](https://github.com/hacknum/PVE_AIO/blob/master/tools/pve_source.md) 工具进行一键优化

从 pve_source 官方下载脚本文件，并按教程解压运行脚本

![alt text](/images/折腾PVE/image.png)

2.2 移除 local-lvm，合并存储空间

按照提示进行操作
![alt text](/images/折腾PVE/image-1.png)

执行完脚本，并删除 `local-lvm` 后，需将原本分配给 `local-lvm` 的功能添加回 `local` 中
![alt text](/images/折腾PVE/image-2.png)

2.3 开启 IOMMU，启用核显直通

![alt text](/images/折腾PVE/image-3.png)

2.4 修复资源统计显示BUG

![alt text](/images/折腾PVE/image-4.png)

删掉 `/var/lib/rrdcached/db` 里边的所有文件夹；这里是系统图表缓存文件，删了系统会自动重建新的  
注意不要把 `db` 目录给删除，只删除里面的文件