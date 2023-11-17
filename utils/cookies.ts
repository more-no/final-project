import { cookies } from 'next/headers';

export function getCookie(username: string) {
  return cookies().get(username)?.value;
}

// export async function setCookie(value) {
//   await cookies().set('cities', value);
// }

export const secureCookieOptions = {
  httpOnly: true,
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 2,
  sameSite: 'lax',
} as const;
