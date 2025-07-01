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

// API响应相关类型定义
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  code?: number;
}

// API错误响应类型
export interface ApiError {
  success: false;
  message: string;
  code: number;
  details?: Record<string, unknown>;
}

// HTTP请求配置类型
export interface RequestConfig {
  timeout?: number;
  headers?: Record<string, string>;
  cache?: boolean;
  retries?: number;
}

// 分页响应类型
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// GitHub仓库类型(用于getGit接口)
export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  clone_url: string;
  ssh_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  size: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  topics: string[];
  visibility: string;
  archived: boolean;
  disabled: boolean;
  fork: boolean;
}

// API响应包装类型
export interface ApiResponseWrapper<T> {
  success: boolean;
  data: T;
  message: string;
}