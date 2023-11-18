import { NextResponse } from 'next/server';
import { getUserByUsername } from '../../../../database/users';
import EditUserForm from './EditUserForm';
import EditHostForm from './EditHostForm';
import { getHostById } from '../../../../database/hosts';
import { UserResponseBodyGet } from '../../../api/(auth)/users/[username]/route';
import UploadPicture from './UploadPicture';

type Props = {
  params: { username: string };
};

export function generateMetadata() {
  return {
    title: 'Edit Profile',
  };
}

export default async function EditPage({ params }: Props) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    const errorResponse: UserResponseBodyGet = {
      errors: [{ message: 'Error finding the User' }],
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }

  const host = await getHostById(user.id);

  if (!host) {
    // Create an error response in the shape of HostResponseBodyGet
    const errorResponse: UserResponseBodyGet = {
      errors: [{ message: 'Error finding the Host' }],
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }

  return (
    <div className="ml-6">
      <h1 className="text-4xl py-6 pb-15"> Edit your profile: </h1>
      <p className="text-xl"> Here you can update your profile</p>
      <div className="flex flex-row border-2 border-solid p-24">
        <div className="flex gap-4">
          <div className="grow">
            <EditUserForm user={user} />
            <UploadPicture username={user.username} />
          </div>
          <div className="grow">
            <EditHostForm host={host} username={user.username} />
          </div>
        </div>
      </div>
    </div>
  );
}
