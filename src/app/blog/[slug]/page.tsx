import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import BlogHeader from '@/components/blog-header';
import BlogCard from '@/components/blog-card';
import { getBlogPost, getRelatedPosts } from '@/lib/blog-data';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {
      title: '文章未找到',
      description: '您访问的文章不存在'
    };
  }

  return {
    title: `${post.title} - 技术博客`,
    description: post.excerpt,
    keywords: [...post.tags, post.category]
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [post, relatedPosts] = await Promise.all([
    getBlogPost(slug),
    getRelatedPosts(slug, 3)
  ]);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <BlogHeader showSearch={false} />
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 面包屑导航 */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <li>
              <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                首页
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                博客
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium truncate">
              {post.title}
            </li>
          </ol>
        </nav>

        {/* 文章头部 */}
        <header className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full">
              {post.category}
            </span>
            {post.featured && (
              <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-medium rounded-full">
                精选文章
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-6 border-y border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {post.author.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {post.author.bio}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
              <span>{post.readingTime} 分钟阅读</span>
            </div>
          </div>

          {post.coverImage && (
            <div className="mt-8 mb-12">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  priority
                />
              </div>
            </div>
          )}
        </header>

        {/* 文章内容 */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <div className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </div>

        {/* 标签区域 */}
        <div className="mb-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            相关标签
          </h3>
          <div className="flex flex-wrap gap-3">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-200"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      </article>

      {/* 相关文章 */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 dark:bg-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                相关文章
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                您可能也会感兴趣的其他文章
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
} 