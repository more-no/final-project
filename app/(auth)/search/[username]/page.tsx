import { NextResponse } from 'next/server';
import { getUserByUsername } from '../../../../database/users';
import { UserResponseBodyPut } from '../../../api/(auth)/editUser/[username]/route';
import SearchHosts from './SearchHost';
import { cookies } from 'next/headers';
import { getValidSessionByTokenWithId } from '../../../../database/sessions';
import { redirect } from 'next/navigation';

type Props = {
  params: { username: string };
};

export function generateMetadata() {
  return {
    title: 'Search Page',
  };
}

export default async function SearchPage({ params }: Props) {
  // BEGIN VALIDATION LOGIC
  // ----------------------

  const user = await getUserByUsername(params.username);

  if (!user) {
    const errorResponse: UserResponseBodyPut = {
      errors: [{ message: 'Error finding the User' }],
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }

  // 1. get the token from the cookie
  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. check if the token has a valid session
  const session =
    sessionTokenCookie &&
    (await getValidSessionByTokenWithId(sessionTokenCookie.value, user.id));

  console.log('Is session Valid?', session);

  if (!session) {
    redirect(`/not-found`);
  }

  // END VALIDATION LOGIC
  // ----------------------

  return <SearchHosts />;
}
