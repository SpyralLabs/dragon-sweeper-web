import { COOKIE_ACCESS_TOKEN_KEY, COOKIE_REFRESH_TOKEN_KEY } from '@/lib/config/auth-config';
import { atom } from 'jotai';
import Cookie from 'js-cookie';
import { InvalidTokenError, jwtDecode } from 'jwt-decode';

/**
 * AccessToken과 RefreshToken을 관리하는 아톰 팩토리 함수입니다.
 * @param key 쿠키에 저장될 키 (예: 'accessToken', 'refreshToken')
 */
const createCookieTokenAtom = (key: string) => {
  // 1. 토큰 값을 저장할 기본 아톰 (private)
  const baseAtom = atom<string | null>(null);

  // 2. 읽기 전용 아톰: 쿠키에서 토큰을 읽어오는 로직
  // 이 아톰은 비동기적으로 작동하여 쿠키 값을 초기화합니다.
  const tokenReadAtom = atom((_) => {
    // 쿠키에서 토큰 읽기
    const savedValue = Cookie.get(key);

    if (savedValue) {
      try {
        const decoded = jwtDecode<{ exp: number }>(savedValue);
        const expireDate = new Date(decoded.exp * 1000);
        const now = new Date();

        // 토큰 만료 여부 확인
        if (expireDate < now) {
          Cookie.remove(key);
          return null;
        }

        // 유효한 토큰일 경우 기본 아톰에 설정
        return savedValue;
      } catch (error) {
        if (error instanceof InvalidTokenError) {
          console.error(`Invalid token for key '${key}', removing cookie.`, error);
          Cookie.remove(key);
        }
        return null;
      }
    }
    return null;
  });

  // 3. 쓰기 전용 아톰: 토큰을 쿠키에 저장하거나 삭제하는 로직
  const tokenWriteAtom = atom(null, (_, set, newToken: string | null) => {
    // 새로운 값이 없을 경우 쿠키에서 제거
    if (!newToken) {
      Cookie.remove(key);
      set(baseAtom, null);
      return;
    }

    try {
      const decoded = jwtDecode<{ exp: number }>(newToken);
      const expires = new Date(decoded.exp * 1000);

      // 토큰을 쿠키에 만료일과 함께 설정
      Cookie.set(key, newToken, {
        expires: expires,
        secure: true,
        sameSite: 'Strict',
      });

      // 기본 아톰에 값 설정
      set(baseAtom, newToken);
    } catch (error) {
      if (error instanceof InvalidTokenError) {
        console.error(`Attempted to set an invalid token for key '${key}'.`, error);
        Cookie.remove(key);
        set(baseAtom, null);
      }
    }
  });

  // 4. 읽고 쓸 수 있는 최종 아톰
  return atom(
    (get) => get(baseAtom) || get(tokenReadAtom), // 기본 아톰에 값이 없으면 비동기 아톰을 통해 초기화
    (_, set, newValue: string | null) => set(tokenWriteAtom, newValue),
  );
};

export const accessTokenAtom = createCookieTokenAtom(COOKIE_ACCESS_TOKEN_KEY);
export const refreshTokenAtom = createCookieTokenAtom(COOKIE_REFRESH_TOKEN_KEY);
