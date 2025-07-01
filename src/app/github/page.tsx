import { Metadata } from 'next';
import BlogHeader from '@/components/blog-header';
import GitHubCard from '@/components/github-card';
import { githubApi } from '@/lib/api-service';

export const metadata: Metadata = {
  title: 'GitHub仓库 - 我的开源项目',
  description: '展示我的GitHub开源项目和贡献',
  keywords: ['GitHub', '开源项目', '代码仓库', '前端开发'],
  openGraph: {
    title: 'GitHub仓库',
    description: '展示我的GitHub开源项目和贡献',
    type: 'website',
  },
};

export default async function GitHubPage() {
  // 获取GitHub仓库列表
  const repositories = await githubApi.getRepositories();
  
  // 按更新时间排序
  const sortedRepos = [...repositories].sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );
  
  // 分类仓库
  const ownRepos = sortedRepos.filter(repo => !repo.fork);
  const forkedRepos = sortedRepos.filter(repo => repo.fork);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <BlogHeader 
        title="GitHub仓库" 
        subtitle="我的开源项目和贡献" 
        showSearch={false}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 仓库统计信息 */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">总仓库数</h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{repositories.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">原创仓库</h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{ownRepos.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Fork仓库</h3>
            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{forkedRepos.length}</p>
          </div>
        </div>
        
        {/* 原创仓库 */}
        <section className="mb-12">
          <div className="flex items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mr-3">
              原创仓库
            </h2>
            <div className="h-1 flex-1 bg-gradient-to-r from-green-400 to-blue-500 rounded"></div>
          </div>
          
          {ownRepos.length === 0 ? (
            <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow">
              <p className="text-gray-600 dark:text-gray-400">暂无原创仓库</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ownRepos.map((repo) => (
                <GitHubCard key={repo.id} repo={repo} />
              ))}
            </div>
          )}
        </section>
        
        {/* Fork仓库 */}
        {forkedRepos.length > 0 && (
          <section>
            <div className="flex items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mr-3">
                Fork仓库
              </h2>
              <div className="h-1 flex-1 bg-gradient-to-r from-orange-400 to-red-500 rounded"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {forkedRepos.map((repo) => (
                <GitHubCard key={repo.id} repo={repo} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
} 