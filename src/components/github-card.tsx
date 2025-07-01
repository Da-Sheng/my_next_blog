'use client';

import { GitHubRepository } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface GitHubCardProps {
  repo: GitHubRepository;
}

export default function GitHubCard({ repo }: GitHubCardProps) {
  // 格式化日期
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true, locale: zhCN });
    } catch {
      return dateString;
    }
  };

  // 语言对应的颜色
  const languageColors: Record<string, string> = {
    JavaScript: 'bg-yellow-300',
    TypeScript: 'bg-blue-500',
    Python: 'bg-green-500',
    Java: 'bg-red-500',
    Go: 'bg-cyan-500',
    HTML: 'bg-orange-500',
    CSS: 'bg-purple-500',
    Shell: 'bg-gray-500',
    'C++': 'bg-pink-500',
    C: 'bg-gray-600',
    Ruby: 'bg-red-600',
    PHP: 'bg-indigo-500',
    Rust: 'bg-orange-600',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
              <a 
                href={repo.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                {repo.name}
              </a>
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {repo.full_name}
            </p>
          </div>
          
          {repo.fork && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              Fork
            </span>
          )}
        </div>
        
        {repo.description && (
          <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
            {repo.description}
          </p>
        )}
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
          {repo.language && (
            <div className="flex items-center">
              <span className={`w-3 h-3 rounded-full mr-1 ${languageColors[repo.language] || 'bg-gray-400'}`}></span>
              <span>{repo.language}</span>
            </div>
          )}
          
          {repo.stargazers_count > 0 && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span>{repo.stargazers_count}</span>
            </div>
          )}
          
          {repo.forks_count > 0 && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>{repo.forks_count}</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {repo.topics && repo.topics.slice(0, 3).map((topic, index) => (
            <span 
              key={index}
              className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md"
            >
              {topic}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>更新于: {formatDate(repo.updated_at)}</span>
          <span>创建于: {formatDate(repo.created_at)}</span>
        </div>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-850 flex justify-between">
        <a 
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          查看仓库
        </a>
        <a 
          href={repo.clone_url}
          className="text-sm text-gray-600 dark:text-gray-400 hover:underline flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
          </svg>
          复制链接
        </a>
      </div>
    </div>
  );
} 