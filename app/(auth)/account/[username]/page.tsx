import { NextResponse } from 'next/server';
import { getUserByUsername } from '../../../../database/users';
import { UserResponseBodyGet } from '../../../api/(auth)/users/[username]/route';
import EditAccountForm from './EditAccountForm';

type Props = {
  params: { username: string };
};

export function generateMetadata() {
  return {
    title: 'Edit Account',
  };
}

export default async function AccountPage({ params }: Props) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    // Create an error response in the shape of HostResponseBodyGet
    const errorResponse: UserResponseBodyGet = {
      errors: [{ message: 'Error finding the User' }],
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }

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
