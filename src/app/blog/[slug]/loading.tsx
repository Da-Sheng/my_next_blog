import BlogHeader from '@/components/blog-header';

export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <BlogHeader showSearch={false} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 面包屑骨架屏 */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
          </div>
        </nav>

        {/* 文章头部骨架屏 */}
        <header className="mb-12">
          {/* 分类标签骨架屏 */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20 animate-pulse"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16 animate-pulse"></div>
          </div>

          {/* 标题骨架屏 */}
          <div className="space-y-4 mb-6">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-4/5 animate-pulse"></div>
          </div>

          {/* 摘要骨架屏 */}
          <div className="space-y-3 mb-8">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
          </div>

          {/* 作者信息骨架屏 */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-6 border-y border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
            </div>
          </div>

          {/* 封面图片骨架屏 */}
          <div className="mt-8 mb-12">
            <div className="aspect-video rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          </div>
        </header>

        {/* 文章内容骨架屏 */}
        <div className="mb-12 space-y-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-4/5 animate-pulse"></div>
              {index % 3 === 0 && (
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse my-6"></div>
              )}
            </div>
          ))}
        </div>

        {/* 标签区域骨架屏 */}
        <div className="mb-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-4 animate-pulse"></div>
          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>

      {/* 相关文章骨架屏 */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32 mx-auto mb-4 animate-pulse"></div>
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                {/* 图片骨架屏 */}
                <div className="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                
                {/* 内容骨架屏 */}
                <div className="p-6">
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-16 mb-3 animate-pulse"></div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-4/5 animate-pulse"></div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                  </div>
                  
                  <div className="flex space-x-2 mb-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12 animate-pulse"></div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 