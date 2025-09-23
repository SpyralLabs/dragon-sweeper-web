export const Config = {
  ENV: import.meta.env.VITE_ENV as 'DEV' | 'PROD',
  VITE_SERVICE_HOST: import.meta.env.VITE_SERVICE_HOST as string,
} as const;
