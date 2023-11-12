import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getValidSessionByToken } from '../database/sessions';
import { validateTokenAgainstSecret } from './csrf';
import { HostResponseBodyGet } from '../app/api/(auth)/hosts/[username]/route';

export default async function validateSessionWithCsrf(csrfToken: string) {
  // 1. get the token from the cookie
  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. check if the token has a valid session
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  if (!session) {
    // Create an error response in the shape of HostResponseBodyGet
    const errorResponse: HostResponseBodyGet = {
      errors: [{ message: 'Session token is not valid' }],
    };
    return NextResponse.json(errorResponse, { status: 401 });
  }

  const isValidCsrfToken = validateTokenAgainstSecret(
    session.csrfSecret,
    csrfToken,
  );

  console.log('Is Token Match: ', isValidCsrfToken);

  if (!isValidCsrfToken) {
    // Create an error response in the shape of HostResponseBodyGet
    const errorResponse: HostResponseBodyGet = {
      errors: [{ message: 'Session token is not valid' }],
    };
    return NextResponse.json(errorResponse, { status: 401 });
  }
  return;
}
