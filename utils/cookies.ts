import { cookies } from 'next/headers';

export function getCookie(name: string) {
  return cookies().get(name)?.value;
}

export function deleteCookie(name: string) {
  return cookies().delete(name);
}

export const secureCookieOptions = {
  httpOnly: true,
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 2,
};
