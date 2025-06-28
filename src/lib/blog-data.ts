import { BlogPost, BlogListResponse, BlogQueryParams } from './types';
import { blogApi, compositeApi } from './api-service';

// 模拟延迟函数 - 保持与原有API的兼容性
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 获取博客列表的API函数
export async function getBlogPosts(params: BlogQueryParams = {}): Promise<BlogListResponse> {
  try {
    // 添加轻微延迟以保持用户体验一致性
    await delay(100);
    
    return await blogApi.getBlogList(params);
  } catch (error) {
    console.error('获取博客列表失败:', error);
    
    // 返回空结果而不是抛出错误，保持UI稳定性
    return {
      posts: [],
      total: 0,
      page: params.page || 1,
      limit: params.limit || 6
    };
  }
}

// 获取单个博客文章的API函数
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    await delay(100);
    
    return await blogApi.getBlogBySlug(slug);
  } catch (error) {
    console.error('获取博客详情失败:', error);
    return null;
  }
}

// 获取相关博客文章的API函数
export async function getRelatedPosts(slug: string, limit: number = 3): Promise<BlogPost[]> {
  try {
    await delay(100);
    
    return await compositeApi.getRelatedPosts(slug, limit);
  } catch (error) {
    console.error('获取相关文章失败:', error);
    return [];
  }
}

// 获取所有标签
export async function getAllTags(): Promise<string[]> {
  try {
    await delay(100);
    
    return await blogApi.getBlogTags();
  } catch (error) {
    console.error('获取标签列表失败:', error);
    return [];
  }
}

// 获取所有分类
export async function getAllCategories(): Promise<string[]> {
  try {
    await delay(100);
    
    return await blogApi.getBlogCategories();
  } catch (error) {
    console.error('获取分类列表失败:', error);
    return [];
  }
}

// 获取精选文章
export async function getFeaturedPosts(limit: number = 3): Promise<BlogPost[]> {
  try {
    await delay(100);
    
    return await blogApi.getFeaturedBlogs(limit);
  } catch (error) {
    console.error('获取精选文章失败:', error);
    return [];
  }
}

// 搜索建议函数
export async function getSearchSuggestions(query: string): Promise<string[]> {
  try {
    await delay(100);
    
    return await compositeApi.getSearchSuggestions(query);
  } catch (error) {
    console.error('获取搜索建议失败:', error);
    return [];
  }
} 