import BlogHeader from '@/components/blog-header';

export default function GitHubLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <BlogHeader 
        title="GitHub仓库" 
        subtitle="加载中..." 
        showSearch={false}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 仓库统计信息占位 */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
              <div className="h-10 w-1/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
        
        {/* 标题占位 */}
        <div className="flex items-center mb-8">
          <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded mr-3 animate-pulse"></div>
          <div className="h-1 flex-1 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        
        {/* 卡片占位 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="h-7 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-3 animate-pulse"></div>
                <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-6 animate-pulse"></div>
                <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
                <div className="flex gap-4 mb-4">
                  <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-850">
                <div className="flex justify-between">
                  <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 