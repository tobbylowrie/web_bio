---
title: 配置树莓派 Zero 2W 的 USB 口为虚拟串口 (ttyGS0)
date: 2024-04-20
description: 无
tags: [树莓派,Raspberry,Raspberry Zero 2W,硬件]
---

# 配置树莓派 Zero 2W 的 USB 口为虚拟串口 (ttyGS0)
## 0. 环境

### 0.1 硬件部分
板子型号：树莓派 Zero 2W (Raspberry Pi Zero 2W)

### 0.2 软件部分
树莓派OS版本：[2024-11-19-raspios-bookworm-arm64-lite.img.xz](https://downloads.raspberrypi.com/raspios_arm64/images/raspios_arm64-2024-11-19/2024-11-19-raspios-bookworm-arm64.img.xz)
镜像烧写工具：[RaspberryPilmager 1.8.5](https://downloads.raspberrypi.org/imager/imager_1.8.5.exe)

## 1. 启用 USB Gadget 功能

### 修改 `/boot/firmware/config.txt`


通过 `Raspberry Pi Imager` 安装好官方镜像后的 `config.txt` 文件内容如下
```ini
camera_auto_detect=1

# Automatically load overlays for detected DSI displays
display_auto_detect=1

# Automatically load initramfs files, if found
auto_initramfs=1

# Enable DRM VC4 V3D driver
dtoverlay=vc4-kms-v3d
max_framebuffers=2

# Don't have the firmware create an initial video= setting in cmdline.txt.
# Use the kernel's default instead.
disable_fw_kms_setup=1

# Run in 64-bit mode
arm_64bit=1

# Disable compensation for displays with overscan
disable_overscan=1

# Run as fast as firmware / board allows
arm_boost=1

[cm4]
# Enable host mode on the 2711 built-in XHCI USB controller.
# This line should be removed if the legacy DWC2 controller is required
# (e.g. for USB device mode) or if USB support is not required.
otg_mode=1

[cm5]
dtoverlay=dwc2,dr_mode=host

[all]
enable_uart=1
```

只需要在最后 `[all]` 中加上如下内容
```ini
dtoverlay=dwc2,dr_mode=peripheral
```

修改后的 `config.txt` 文件内容如下

```ini
camera_auto_detect=1

# Automatically load overlays for detected DSI displays
display_auto_detect=1

# Automatically load initramfs files, if found
auto_initramfs=1

# Enable DRM VC4 V3D driver
dtoverlay=vc4-kms-v3d
max_framebuffers=2

# Don't have the firmware create an initial video= setting in cmdline.txt.
# Use the kernel's default instead.
disable_fw_kms_setup=1

# Run in 64-bit mode
arm_64bit=1

# Disable compensation for displays with overscan
disable_overscan=1

# Run as fast as firmware / board allows
arm_boost=1

[cm4]
# Enable host mode on the 2711 built-in XHCI USB controller.
# This line should be removed if the legacy DWC2 controller is required
# (e.g. for USB device mode) or if USB support is not required.
otg_mode=1

[cm5]
dtoverlay=dwc2,dr_mode=host

[all]
enable_uart=1
dtoverlay=dwc2,dr_mode=peripheral
```

### 修改 `/boot/firmware/cmdline.txt`
在 `rootwait` 后添加:
```
modules-load=dwc2,g_serial
```

## 2. 加载 Gadget 驱动

### 开机自动加载
编辑 `/etc/modules` 在最后加入:
```
dwc2
g_serial
```

## 3. 配置串口登录 (可选)

### 创建 systemd 服务
```bash
sudo nano /etc/systemd/system/serial-getty@ttyGS0.service
```

内容:
```ini
[Unit]
Description=Serial Getty on ttyGS0
After=systemd-user-sessions.service plymouth-quit-wait.service

[Service]
ExecStart=-/sbin/agetty -o '-p -- \\u' --keep-baud 115200,38400,9600 %I $TERM
Type=idle
Restart=always
TTYPath=/dev/%I
TTYReset=yes

[Install]
WantedBy=multi-user.target
```

### 启用服务
```bash
sudo systemctl enable serial-getty@ttyGS0.service
sudo systemctl start serial-getty@ttyGS0.service
```

## 注意事项
- 树莓派 Zero 2W 必须通过 Micro-USB OTG 口连接
- 波特率需保持一致 (默认 115200)
- Debian Bookworm 系统配置文件路径为 `/boot/firmware/`
