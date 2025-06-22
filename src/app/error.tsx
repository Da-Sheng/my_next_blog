'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 记录错误到监控服务
    console.error('应用出现错误:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
        {/* 错误图标 */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/20 mb-6">
          <svg 
            className="h-8 w-8 text-red-600 dark:text-red-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
            />
          </svg>
        </div>

        {/* 错误标题 */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          哎呀，出现了一些问题
        </h1>

        {/* 错误描述 */}
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          页面加载时遇到意外错误。这通常是临时问题，请尝试刷新页面。
        </p>

        {/* 错误详情（开发环境） */}
        {process.env.NODE_ENV === 'development' && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              错误详情 (开发模式)
            </summary>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-xs font-mono text-gray-800 dark:text-gray-200 overflow-auto max-h-32">
              <p className="font-semibold mb-1">错误信息:</p>
              <p className="mb-2">{error.message}</p>
              {error.digest && (
                <>
                  <p className="font-semibold mb-1">错误ID:</p>
                  <p>{error.digest}</p>
                </>
              )}
            </div>
          </details>
        )}

        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            重试
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            返回首页
          </button>
        </div>

        {/* 帮助文本 */}
        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          如果问题持续存在，请联系技术支持
        </p>
      </div>
    </div>
  )
} 