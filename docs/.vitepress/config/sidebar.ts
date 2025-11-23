import { SidebarGroup, SidebarLink } from '../types/index';

/**
 * 生成侧边栏配置
 * @param category - 分类名称
 * @param items - 侧边栏项目
 * @returns 侧边栏配置
 */
export const createSidebar = (category: string, items: SidebarLink[]): SidebarGroup[] => {
  return [
    {
      text: category,
      items: items
    }
  ];
};

/**
 * 测试博客侧边栏配置
 */
export const testBlogSidebar = createSidebar('测试博客', [
  { text: '测试博客2', link: '/blogs/测试博客/测试博客2' },
  { text: '测试博客3', link: '/blogs/测试博客/测试博客3' },
  { text: 'MarkDown 语法测试', link: '/blogs/测试博客/markdown语法测试集合.md' }
]);

/**
 * 树莓派侧边栏配置
 */
export const raspberryPiSidebar = createSidebar('折腾树莓派', [
  { text: '配置树莓派 Zero 2W 的 USB 口为虚拟串口 (ttyGS0)', link: '/blogs/折腾树莓派/配置树莓派 Zero 2W 的 USB 口为虚拟串口 (ttyGS0).md' }
]);

/**
 * HomeAssistant 侧边栏配置
 */
export const homeAssistantSidebar = createSidebar('折腾 HomeAssistant', [
  { text: '01 安装', link: '/blogs/折腾HomeAssistant/安装.md' }
]);

/**
 * 默认侧边栏配置
 */
export const defaultSidebar: Record<string, SidebarGroup[]> = {
  '/blogs/测试博客': testBlogSidebar,
  '/blogs/折腾树莓派': raspberryPiSidebar,
  '/blogs/折腾HomeAssistant': homeAssistantSidebar
};