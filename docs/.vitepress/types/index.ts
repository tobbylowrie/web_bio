/**
 * 博客文章接口定义
 */
export interface BlogPost {
  title: string;
  date: string;
  description?: string;
  author?: string;
  tags?: string[];
  hide?: boolean;
  layout?: string;
}

/**
 * 侧边栏链接定义
 */
export interface SidebarLink {
  text: string;
  link: string;
}

/**
 * 侧边栏分组定义
 */
export interface SidebarGroup {
  text: string;
  items: SidebarLink[];
}

/**
 * 导航项定义
 */
export interface NavItem {
  text: string;
  link: string;
}

/**
 * 文章数据接口
 */
export interface PostData {
  url: string;
  frontmatter: BlogPost;
}

/**
 * 最近文章配置
 */
export interface RecentPostsConfig {
  // 每页显示的文章数量
  postsPerPage: number;
  
  // 是否显示文章日期
  showDate: boolean;
  
  // 日期显示格式
  dateFormat: string;
  
  // 是否启用分页
  enablePagination: boolean;
  
  // 是否在标题前显示"最近文章"标题
  showTitle: boolean;
  
  // 最大显示文章数量（0为不限制）
  maxPosts: number;
}

/**
 * 社交链接定义
 */
export interface SocialLink {
  icon: string;
  link: string;
}

/**
 * RSS 配置选项
 */
export interface RSSOptions {
  title: string;
  baseUrl: string;
  copyright: string;
}