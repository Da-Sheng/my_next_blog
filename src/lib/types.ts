// 博客文章类型定义
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  category: string;
  readingTime: number;
  featured: boolean;
  coverImage?: string;
}

// 博客列表响应类型
export interface BlogListResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  limit: number;
}

// 博客查询参数类型
export interface BlogQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  tag?: string;
  category?: string;
}

// 作者信息类型
export interface Author {
  name: string;
  avatar: string;
  bio: string;
  social?: {
    twitter?: string;
    github?: string;
    website?: string;
  };
}

// 博客分类类型
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
}

// 标签类型
export interface Tag {
  id: string;
  name: string;
  slug: string;
  count: number;
} 