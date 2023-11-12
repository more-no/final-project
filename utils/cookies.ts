import { cookies } from 'next/headers';

// nullish coalescing operator
export function getCookie(username: string) {
  return cookies().get(username)?.value;
}

export async function setCookie(value) {
  await cookies().set('cities', value);
}

export const secureCookieOptions = {
  httpOnly: true,
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 2, // Expires after 2 hour
  // Be explicit about new default behavior
  // in browsers
  // https://web.dev/samesite-cookies-explained/
  sameSite: 'lax', // this prevents CSRF attacks
} as const;
