import { Config } from '@/lib/config/env-config';
import store from '@/lib/config/store-config';
import { accessTokenAtom, refreshTokenAtom } from '@/state/auth';
import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type AxiosRequestConfig,
  AxiosError,
} from 'axios';

// Service response wrapper type
export interface ServiceResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// Service error type
export interface ServiceError {
  message: string;
  status: number;
  code?: string;
}

interface QueueItem {
  resolve: (value: string | null) => void;
  reject: (error: unknown) => void;
}

interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const onLoggingInDev = (...msg: string[]) => {
  if (Config.ENV === 'DEV') {
    console.log(...msg);
  }
};

const onLoggingErrorInDev = (...msg: string[]) => {
  if (Config.ENV === 'DEV') {
    console.error(...msg);
  }
};

/**
 * 401 에러인지 확인하는 헬퍼 함수
 */
const isUnauthorizedError = (error: unknown): error is AxiosError => {
  return axios.isAxiosError(error) && error.response?.status === 401;
};

// 토큰 갱신 중인지 확인하는 플래그
let isRefreshing = false;
// 토큰 갱신 대기 중인 요청들을 저장하는 배열
let failedQueue: Array<QueueItem> = [];

// 대기 중인 요청들을 처리하는 함수
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

/**
 * Refresh token function
 */
const refreshToken = async (refreshTokenValue: string) => {
  try {
    const { data } = await princessSweeperService.post<
      ServiceResponse<{ accessToken: string; refreshToken: string }>
    >('/auth/refresh-token', { refreshToken: refreshTokenValue });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Create axios instance
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: Config.VITE_SERVICE_HOST,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor to add auth token from store
  client.interceptors.request.use(
    (config) => {
      const token = store.get(accessTokenAtom);
      const { method, url, headers } = config;
      if (token && headers) {
        headers.Authorization = `Bearer ${token}`;
      }
      onLoggingInDev(`[🟢 API Requested]: `, `[${method?.toUpperCase()}]`, String(url));
      return config;
    },
    (error: any) => {
      onLoggingErrorInDev(`[🔴 API Request Failed]: `, String(error.config.url), error.message);
      return Promise.reject(error);
    },
  );

  // Response interceptor for error handling and token refresh
  client.interceptors.response.use(
    (response: AxiosResponse<ServiceResponse<any>>) => {
      onLoggingInDev(`[🟢 API Response]: `, String(response.config.url), String(response.status));
      return response;
    },
    async (error: unknown) => {
      if (!axios.isAxiosError(error)) {
        onLoggingErrorInDev(`[🔴 API Response Failed]: `, 'Unknown error', String(error));
        const serviceError: ServiceError = {
          message: 'An unknown error occurred',
          status: 500,
        };
        return Promise.reject(serviceError);
      }

      const axiosError = error as AxiosError<any>;
      const originalRequest = axiosError.config as ExtendedAxiosRequestConfig;

      if (!originalRequest) {
        onLoggingErrorInDev(
          `[🔴 API Response Failed]: `,
          'No original request',
          axiosError.message,
        );
        const serviceError: ServiceError = {
          message: axiosError.message || 'An error occurred',
          status: axiosError.response?.status || 500,
          code: axiosError.response?.data?.code,
        };
        return Promise.reject(serviceError);
      }

      onLoggingErrorInDev(
        `[🔴 API Response Failed]: `,
        String(originalRequest.url),
        axiosError.message,
      );

      // Handle 401 Unauthorized errors with token refresh
      if (isUnauthorizedError(axiosError) && !originalRequest._retry) {
        // Skip refresh for refresh token endpoint to avoid infinite loop
        if (originalRequest.url === '/auth/refresh-token') {
          const serviceError: ServiceError = {
            message: 'Token refresh failed',
            status: 401,
          };
          return Promise.reject(serviceError);
        }

        // If already refreshing, queue the request
        if (isRefreshing) {
          try {
            const token = await new Promise<string | null>((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            });

            if (token && originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return client.request(originalRequest);
            }
            throw new Error('Token refresh failed');
          } catch (queueError) {
            onLoggingErrorInDev(`[🔴 Token Queue Failed]: `, String(queueError));
            const serviceError: ServiceError = {
              message: 'Token refresh failed',
              status: 401,
            };
            return Promise.reject(serviceError);
          }
        }

        originalRequest._retry = true;
        isRefreshing = true;
        const refreshTokenValue = store.get(refreshTokenAtom);

        try {
          if (!refreshTokenValue) {
            throw new Error('Refresh token not found');
          }

          const tokenResponse = await refreshToken(refreshTokenValue);

          if (!tokenResponse?.data?.accessToken || !tokenResponse?.data?.refreshToken) {
            throw new Error('Invalid token response');
          }

          // Update tokens in store
          store.set(accessTokenAtom, tokenResponse.data.accessToken);
          store.set(refreshTokenAtom, tokenResponse.data.refreshToken);

          processQueue(null, tokenResponse.data.accessToken);

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${tokenResponse.data.accessToken}`;
          }
          return client.request(originalRequest);
        } catch (refreshError) {
          onLoggingErrorInDev(`[🔴 Token Refresh Failed]: `, String(refreshError));
          processQueue(refreshError);

          // Clear tokens on refresh failure
          store.set(accessTokenAtom, null);
          store.set(refreshTokenAtom, null);

          const serviceError: ServiceError = {
            message: 'Token refresh failed',
            status: 401,
          };
          return Promise.reject(serviceError);
        } finally {
          isRefreshing = false;
        }
      }

      // Handle other errors
      const serviceError: ServiceError = {
        message: axiosError.response?.data?.message || axiosError.message || 'An error occurred',
        status: axiosError.response?.status || 500,
        code: axiosError.response?.data?.code,
      };
      return Promise.reject(serviceError);
    },
  );

  return client;
};

export const princessSweeperService = createApiClient();
