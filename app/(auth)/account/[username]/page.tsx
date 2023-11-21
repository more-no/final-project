import { NextResponse } from 'next/server';
import { getUserByUsername } from '../../../../database/users';
import EditAccountForm from './EditAccountForm';
import { cookies } from 'next/headers';
import { getValidSessionByTokenWithId } from '../../../../database/sessions';
import { redirect } from 'next/navigation';

type Props = {
  params: { username: string };
};

export function generateMetadata() {
  return {
    title: 'Edit Account',
  };
}

export default async function AccountPage({ params }: Props) {
  // BEGIN VALIDATION LOGIC
  // ----------------------

  const user = await getUserByUsername(params.username);

  if (!user) {
    const errorResponse = {
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
    // Redirect or handle the case where the session is not valid
    redirect('/');
    const errorResponse = {
      errors: [{ message: 'Session token is not valid' }],
    };
    return NextResponse.json(errorResponse, { status: 401 });
  }

  // END VALIDATION LOGIC
  // ----------------------

  return (
    <div className="ml-24">
      <h1 className="text-4xl py-6 pb-15"> Edit your account: </h1>
      <p className="text-xl pb-8">
        {' '}
        Here you can update your account information
      </p>
      <EditAccountForm user={user} />
    </div>
  );
}
