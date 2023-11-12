import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getValidSessionByToken } from '../database/sessions';
import { getUserByUsername } from '../database/users';
import { User } from '../migrations/00000-createTableUsers';

export default async function validateSession(username: string) {
  const user = (await getUserByUsername(username)) as User;

  // 1. get the token from the cookie
  const sessionTokenCookie = cookies().get('sessionToken');

  console.log('User:', user);
  console.log('Session Token Cookie:', sessionTokenCookie);

  // 2. check if the token has a valid session
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  console.log('Session:', session);

  if (session === undefined || !session.id || session.id !== user.id) {
    // Redirect or handle the case where the session is not valid
    const errorResponse = {
      errors: [{ message: 'Session token is not valid' }],
    };
    return NextResponse.json(errorResponse, { status: 401 });
  }

  // if (sessions.id !== user.id) {
  //   const errorResponse = {
  //     errors: [{ message: 'You do not have permission to access this page' }],
  //   };
  //   return NextResponse.json(errorResponse, { status: 403 });
  // }

  return;
}
