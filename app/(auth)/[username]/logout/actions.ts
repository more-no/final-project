'use server';
import { deleteSessionByToken } from '../../../../database/sessions';
import { permanentRedirect } from 'next/navigation';
import { deleteCookie, getCookie } from '../../../../utils/cookies';

export async function handleLogout() {
  const token = getCookie('sessionToken');

  //  Delete the session from the database based on the token
  if (token) {
    await deleteSessionByToken(token);
  }

  // Delete the session cookie from the browser
  deleteCookie('sessionToken');

  permanentRedirect('/');
}
