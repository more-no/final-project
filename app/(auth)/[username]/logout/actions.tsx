'use server';
import { cookies } from 'next/headers';
import { deleteSessionByToken } from '../../../../database/sessions';
import { permanentRedirect } from 'next/navigation';

export async function Logout() {
  // Get the session token from the cookie
  const cookieStored = cookies();

  const token = cookieStored.get('sessionToken');

  //  Delete the session from the database based on the token
  if (token) {
    await deleteSessionByToken(token.value);
  }

  // Delete the session cookie from the browser
  cookieStored.set('sessionToken', '', {
    maxAge: -1,
  });

  permanentRedirect('/');
}
