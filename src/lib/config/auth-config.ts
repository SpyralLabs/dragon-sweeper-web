import { Config } from './env-config';

export const COOKIE_ACCESS_TOKEN_KEY = `princess-sweeper-auth-${Config.ENV}`;
export const COOKIE_REFRESH_TOKEN_KEY = `princess-sweeper-refresh-${Config.ENV}`;
