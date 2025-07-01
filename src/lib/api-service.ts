import httpClient from './request';
import { 
  BlogPost, 
  BlogListResponse, 
  BlogQueryParams,
  GitHubRepository,
  ApiResponseWrapper
} from './types';

/**
 * GitHub API服务
 */
export const githubApi = {
  /**
   * 获取GitHub仓库列表
   * @param username GitHub用户名，默认为'Da-Sheng'
   * @returns GitHub仓库列表
   */
  async getRepositories(username = 'Da-Sheng'): Promise<GitHubRepository[]> {
    // API返回格式: {success: true, data: GitHubRepository[], message}
    const response = await httpClient.get<ApiResponseWrapper<GitHubRepository[]>>(`/api/getGit?username=${username}`);
    return response.data;
  },
};

/**
 * 博客API服务
 */
export const blogApi = {
  /**
   * 获取博客列表
   * @param params 查询参数
   * @returns 博客列表响应
   */
  async getBlogList(params: BlogQueryParams = {}): Promise<BlogListResponse> {
    const searchParams = new URLSearchParams();
    
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.search) searchParams.append('search', params.search);
    if (params.tag) searchParams.append('tag', params.tag);
    if (params.category) searchParams.append('category', params.category);
    
    const queryString = searchParams.toString();
    const endpoint = queryString ? `/api/getBlogList?${queryString}` : '/api/getBlogList';
    
    // API返回格式: {success: true, data: {posts, total, page, limit}, message}
    const response = await httpClient.get<{success: boolean, data: BlogListResponse, message: string}>(endpoint);
    return response.data;
  },

  /**
   * 通过ID获取博客详情
   * @param id 博客ID
   * @returns 博客详情
   */
  async getBlogById(id: string): Promise<BlogPost> {
    // API返回格式: {success: true, data: BlogPost, message}
    const response = await httpClient.get<{success: boolean, data: BlogPost, message: string}>(`/api/getBlogDetail/${id}`);
    return response.data;
  },

  /**
   * 通过slug获取博客详情
   * @param slug 博客slug
   * @returns 博客详情
   */
  async getBlogBySlug(slug: string): Promise<BlogPost> {
    // API返回格式: {success: true, data: BlogPost, message}
    const response = await httpClient.get<{success: boolean, data: BlogPost, message: string}>(`/api/getBlogBySlug/${slug}`);
    return response.data;
  },

  /**
   * 获取精选博客列表
   * @param limit 限制数量，默认为3
   * @returns 精选博客列表
   */
  async getFeaturedBlogs(limit = 3): Promise<BlogPost[]> {
    // API返回格式: {success: true, data: BlogPost[], message}
    const response = await httpClient.get<{success: boolean, data: BlogPost[], message: string}>(`/api/getFeaturedBlogs?limit=${limit}`);
    return response.data;
  },

  /**
   * 获取博客分类列表
   * @returns 分类列表
   */
  async getBlogCategories(): Promise<string[]> {
    // API返回格式: {success: true, data: string[], message}
    const response = await httpClient.get<{success: boolean, data: string[], message: string}>('/api/getBlogCategories');
    return response.data;
  },

  /**
   * 获取博客标签列表  
   * @returns 标签列表
   */
  async getBlogTags(): Promise<string[]> {
    // API返回格式: {success: true, data: string[], message}
    const response = await httpClient.get<{success: boolean, data: string[], message: string}>('/api/getBlogTags');
    return response.data;
  },
};

/**
 * 组合API调用 - 用于实现复杂的数据获取逻辑
 */
export const compositeApi = {
  /**
   * 获取相关博客文章
   * 基于当前文章的标签和分类，从博客列表中筛选相关文章
   * @param currentSlug 当前文章的slug
   * @param limit 返回数量限制
   * @returns 相关文章列表
   */
  async getRelatedPosts(currentSlug: string, limit = 3): Promise<BlogPost[]> {
    try {
      // 首先获取当前文章
      const currentPost = await blogApi.getBlogBySlug(currentSlug);
      
      // 获取所有博客列表(获取更多数据用于筛选)
      const { posts: allPosts } = await blogApi.getBlogList({ limit: 50 });
      
      // 筛选相关文章的逻辑
      const relatedPosts = allPosts
        .filter(post => post.slug !== currentSlug) // 排除当前文章
        .map(post => {
          let score = 0;
          
          // 同分类加分
          if (post.category === currentPost.category) {
            score += 3;
          }
          
          // 共同标签加分
          const commonTags = post.tags.filter(tag => 
            currentPost.tags.includes(tag)
          );
          score += commonTags.length * 2;
          
          return { post, score };
        })
        .filter(item => item.score > 0) // 只保留有相关性的文章
        .sort((a, b) => b.score - a.score) // 按相关性分数排序
        .slice(0, limit) // 限制数量
        .map(item => item.post); // 只返回文章数据
      
      return relatedPosts;
    } catch (error) {
      console.error('获取相关文章失败:', error);
      return []; // 发生错误时返回空数组
    }
  },

  /**
   * 获取搜索建议
   * 基于博客标题、标签和分类生成搜索建议
   * @param query 搜索查询
   * @returns 搜索建议列表
   */
  async getSearchSuggestions(query: string): Promise<string[]> {
    if (!query || query.length < 2) {
      return [];
    }
    
    try {
      const [tags, categories, { posts }] = await Promise.all([
        blogApi.getBlogTags(),
        blogApi.getBlogCategories(),
        blogApi.getBlogList({ limit: 20 }) // 获取最近的文章用于标题建议
      ]);
      
      const queryLower = query.toLowerCase();
      const suggestions: Set<string> = new Set();
      
      // 从标签中匹配
      tags.forEach(tag => {
        if (tag.toLowerCase().includes(queryLower)) {
          suggestions.add(tag);
        }
      });
      
      // 从分类中匹配
      categories.forEach(category => {
        if (category.toLowerCase().includes(queryLower)) {
          suggestions.add(category);
        }
      });
      
      // 从文章标题中匹配
      posts.forEach(post => {
        if (post.title.toLowerCase().includes(queryLower)) {
          suggestions.add(post.title);
        }
      });
      
      return Array.from(suggestions).slice(0, 5); // 限制返回5个建议
    } catch (error) {
      console.error('获取搜索建议失败:', error);
      return [];
    }
  },

  /**
   * 获取博客统计信息
   * @returns 博客统计数据
   */
  async getBlogStats(): Promise<{
    totalPosts: number;
    totalCategories: number;
    totalTags: number;
    featuredPosts: number;
  }> {
    try {
      const [
        { total: totalPosts },
        categories,
        tags,
        featuredPosts
      ] = await Promise.all([
        blogApi.getBlogList({ limit: 1 }), // 只获取总数
        blogApi.getBlogCategories(),
        blogApi.getBlogTags(),
        blogApi.getFeaturedBlogs(100) // 获取所有精选文章
      ]);
      
      return {
        totalPosts,
        totalCategories: categories.length,
        totalTags: tags.length,
        featuredPosts: featuredPosts.length,
      };
    } catch (error) {
      console.error('获取博客统计失败:', error);
      return {
        totalPosts: 0,
        totalCategories: 0,
        totalTags: 0,
        featuredPosts: 0,
      };
    }
  },
};

// 导出所有API服务
export default {
  github: githubApi,
  blog: blogApi,
  composite: compositeApi,
}; 