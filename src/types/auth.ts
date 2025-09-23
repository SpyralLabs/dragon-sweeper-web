import type { Address } from 'viem';

interface AuthNoncePayload {
  walletAddress: string;
}
interface AuthNonceResponse {
  nonce: string;
}

interface AuthVerifySignaturePayload {
  nonce: string;
  signature: string;
  walletAddress: Address;
}

interface AuthVerifySignatureResponse {
  success: boolean;
}

interface AuthLoginPayload {
  nonce: string;
  signature: string;
  walletAddress: Address;
}

interface AuthLoginResponse {
  accessToken: string;
  refreshToken: string;
}

interface AuthRegisterPayload extends AuthLoginPayload {
  referralCode?: string;
}

interface AuthRegisterResponse {
  id: string;
  nickname: string;
  point: number;
  referralCode: string;
  walletAddress: Address;
  createdAt: string;
}

interface AuthRefreshTokenPayload {
  refreshToken: string;
}

interface AuthRefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export namespace Auth {
  // [POST] /auth/nonce
  export type NoncePayload = AuthNoncePayload;
  export type Nonce = Service.Response<AuthNonceResponse>;

  // [PATCH] /auth/verify-signature
  export type VerifySignaturePayload = AuthVerifySignaturePayload;
  export type VerifySignature = Service.Response<AuthVerifySignatureResponse>;

  // [POST] /auth/login
  export type LoginPayload = AuthLoginPayload;
  export type LoginResponse = Service.Response<AuthLoginResponse>;

  // [POST] /auth/register
  export type RegisterPayload = AuthRegisterPayload;
  export type RegisterResponse = Service.Response<AuthRegisterResponse>;

  // [POST] /auth/refresh-token
  export type RefreshTokenPayload = AuthRefreshTokenPayload;
  export type RefreshTokenResponse = Service.Response<AuthRefreshTokenResponse>;
}
