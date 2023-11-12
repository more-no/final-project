'use server';
import { cookies } from 'next/headers';
import { deleteSessionByToken } from '../../../database/sessions';
import { redirect } from 'next/navigation';

export async function Logout() {
  // Get the session token from the cookie
  const cookieStore = cookies();

  const token = cookieStore.get('sessionToken');

  //  Delete the session from the database based on the token
  if (token) await deleteSessionByToken(token.value);

  // Delete the session cookie from the browser
  cookieStore.set('sessionToken', '', {
    maxAge: -1,
  });

  redirect('/');
}
