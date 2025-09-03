export const Config = {
  ENV: import.meta.env.VITE_ENV as 'DEV' | 'PROD',
} as const;
