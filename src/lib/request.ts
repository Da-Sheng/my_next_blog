import { ApiError, RequestConfig } from './types';

// 默认请求配置
const DEFAULT_CONFIG: RequestConfig = {
  timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000'),
  headers: {
    'Content-Type': 'application/json',
  },
  cache: process.env.NEXT_PUBLIC_ENABLE_API_CACHE === 'true',
  retries: 3,
};

// 日志工具函数
const logger = {
  request: (method: string, url: string, body?: unknown) => {
    console.log(`\x1b[34m[API请求]\x1b[0m ${method} ${url}`);
    if (body && process.env.NODE_ENV !== 'production') {
      console.log(`\x1b[34m[请求体]\x1b[0m`, JSON.stringify(body, null, 2));
    }
  },
  response: (method: string, url: string, status: number, data?: unknown, time?: number) => {
    const statusColor = status >= 200 && status < 300 ? '\x1b[32m' : '\x1b[31m';
    console.log(`${statusColor}[API响应]\x1b[0m ${method} ${url} - 状态: ${status}${time ? ` - 耗时: ${time}ms` : ''}`);
    if (data && process.env.NODE_ENV !== 'production') {
      console.log(`\x1b[36m[响应体]\x1b[0m`, JSON.stringify(data, null, 2));
    }
  },
  error: (method: string, url: string, error: Error) => {
    console.error(`\x1b[31m[API错误]\x1b[0m ${method} ${url} - ${error.message}`);
    if (error instanceof RequestError && error.details) {
      console.error(`\x1b[31m[错误详情]\x1b[0m`, error.details);
    }
  }
};

// 自定义错误类
export class RequestError extends Error {
  constructor(
    message: string,
    public code: number,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'RequestError';
  }
}

// 获取API基础URL
function getBaseURL(): string {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseURL) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL 环境变量未设置');
  }
  return baseURL;
}

// 睡眠函数(用于重试延迟)
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 构建完整URL
function buildURL(endpoint: string): string {
  const baseURL = getBaseURL();
  // 移除endpoint开头的斜杠(如果存在)
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${baseURL}/${cleanEndpoint}`;
}

// 执行实际的fetch请求
async function performFetch(
  url: string, 
  options: RequestInit,
  config: RequestConfig
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), config.timeout);

  try {
    const fetchOptions: RequestInit = {
      ...options,
      headers: {
        ...config.headers,
        ...options.headers,
      },
      signal: controller.signal,
    };

    // 添加缓存控制
    if (config.cache === false) {
      fetchOptions.cache = 'no-store';
    }

    const response = await fetch(url, fetchOptions);
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// 处理响应
async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type');
  
  let data: unknown;
  try {
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }
  } catch (error) {
    throw new RequestError(
      '响应解析失败',
      response.status,
      { originalError: error }
    );
  }

  if (!response.ok) {
    // 尝试从响应中提取错误信息
    const errorData = data as ApiError;
    const message = errorData.message || `HTTP ${response.status}: ${response.statusText}`;
    throw new RequestError(message, response.status, errorData.details);
  }

  return data as T;
}

// 主要的请求函数
async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  customConfig: Partial<RequestConfig> = {}
): Promise<T> {
  const config = { ...DEFAULT_CONFIG, ...customConfig };
  const url = buildURL(endpoint);
  const method = options.method || 'GET';
  const requestBody = options.body ? JSON.parse(options.body as string) : undefined;
  
  // 记录请求日志
  logger.request(method, url, requestBody);
  
  const startTime = Date.now();
  let lastError: Error | null = null;
  
  // 重试逻辑
  for (let attempt = 1; attempt <= (config.retries || 1); attempt++) {
    try {
      if (attempt > 1) {
        console.log(`\x1b[33m[API重试]\x1b[0m ${method} ${url} - 第${attempt}次尝试`);
      }
      
      const response = await performFetch(url, options, config);
      const data = await handleResponse<T>(response);
      
      // 记录响应日志
      const endTime = Date.now();
      logger.response(method, url, response.status, data, endTime - startTime);
      
      return data;
    } catch (error) {
      lastError = error as Error;
      
      // 记录错误日志
      logger.error(method, url, lastError);
      
      // 最后一次尝试，不再重试
      if (attempt === config.retries) {
        break;
      }
      
      // 只对某些错误类型进行重试
      if (error instanceof RequestError) {
        // 4xx错误不重试(客户端错误)
        if (error.code >= 400 && error.code < 500) {
          break;
        }
      }
      
      // 等待后重试(指数退避)
      await sleep(Math.pow(2, attempt - 1) * 1000);
    }
  }
  
  throw lastError || new Error('请求失败');
}

// 便捷的HTTP方法封装
export const httpClient = {
  // GET请求
  async get<T>(
    endpoint: string, 
    config?: Partial<RequestConfig>
  ): Promise<T> {
    return request<T>(endpoint, { method: 'GET' }, config);
  },

  // POST请求
  async post<T>(
    endpoint: string, 
    data?: unknown, 
    config?: Partial<RequestConfig>
  ): Promise<T> {
    return request<T>(
      endpoint, 
      {
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
      }, 
      config
    );
  },

  // PUT请求
  async put<T>(
    endpoint: string, 
    data?: unknown, 
    config?: Partial<RequestConfig>
  ): Promise<T> {
    return request<T>(
      endpoint, 
      {
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined,
      }, 
      config
    );
  },

  // DELETE请求
  async delete<T>(
    endpoint: string, 
    config?: Partial<RequestConfig>
  ): Promise<T> {
    return request<T>(endpoint, { method: 'DELETE' }, config);
  },

  // 原始请求函数(用于特殊需求)
  request,
};

// 导出默认实例
export default httpClient; 