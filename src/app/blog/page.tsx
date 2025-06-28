import { Metadata } from 'next';
import Link from 'next/link';
import BlogHeader from '@/components/blog-header';
import BlogCard from '@/components/blog-card';
import { getBlogPosts } from '@/lib/blog-data';
import { BlogQueryParams } from '@/lib/types';

export const metadata: Metadata = {
  title: '技术博客 - 前端开发技术分享',
  description: '分享前端开发技术、React、Next.js、TypeScript等相关内容。',
  keywords: ['前端开发', 'React', 'Next.js', 'TypeScript', '技术博客'],
  openGraph: {
    title: '技术博客',
    description: '分享前端开发技术、React、Next.js、TypeScript等相关内容。',
    type: 'website',
  },
};

interface BlogPageProps {
  searchParams: Promise<{
    search?: string;
    tag?: string;
    category?: string;
    page?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const searchParamsData = await searchParams;
  const queryParams: BlogQueryParams = {
    search: searchParamsData.search,
    tag: searchParamsData.tag,
    category: searchParamsData.category,
    page: parseInt(searchParamsData.page || '1'),
    limit: 12,
  };

  const blogData = await getBlogPosts(queryParams);
  const { posts = [], total = 0 } = blogData || {};
  
  const featuredPosts = posts.filter(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <BlogHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 搜索结果提示 */}
        {searchParamsData.search && (
          <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-blue-800 dark:text-blue-200">
              搜索 &ldquo;<span className="font-semibold">{searchParamsData.search}</span>&rdquo; 的结果：
              共找到 <span className="font-semibold">{total}</span> 篇文章
            </p>
          </div>
        )}

        {/* 筛选标签 */}
        {(searchParamsData.tag || searchParamsData.category) && (
          <div className="mb-8 flex items-center space-x-4">
            <span className="text-gray-600 dark:text-gray-400">当前筛选：</span>
            {searchParamsData.category && (
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                分类: {searchParamsData.category}
              </span>
            )}
            {searchParamsData.tag && (
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                标签: {searchParamsData.tag}
              </span>
            )}
          </div>
        )}

        {posts.length === 0 ? (
          /* 空状态 */
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              没有找到相关文章
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              尝试调整搜索关键词或浏览所有文章
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              浏览所有文章
            </Link>
          </div>
        ) : (
          <>
            {/* 精选文章 */}
            {featuredPosts.length > 0 && !searchParamsData.search && (
              <section className="mb-16">
                <div className="flex items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mr-3">
                    精选文章
                  </h2>
                  <div className="h-1 flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded"></div>
                </div>
                <div className="space-y-8">
                  {featuredPosts.map((post) => (
                    <BlogCard key={post.id} post={post} featured={true} />
                  ))}
                </div>
              </section>
            )}

            {/* 常规文章网格 */}
            {regularPosts.length > 0 && (
              <section className="mb-12">
                {featuredPosts.length > 0 && !searchParamsData.search && (
                  <div className="flex items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mr-3">
                      最新文章
                    </h2>
                    <div className="h-1 flex-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded"></div>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
} 