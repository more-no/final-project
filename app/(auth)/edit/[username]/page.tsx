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
    <div className="ml-24">
      <h1 className="text-4xl py-6 pb-15"> Edit your profile: </h1>
      <p className="text-xl pb-8">
        {' '}
        Here you can update the info about yourself
      </p>

      <div className="container mx-auto px-4 sw-full">
        <div className="flex flex-row min-w-full border-2 border-solid place-content-center">
          <div className="flex flex-col">
            <div className="rounded pb-10">
              <img src={user.pictureUrl} alt="Thumbnail" />
            </div>
            <div className="pr-16 pt-1">
              <UploadPicture username={user.username} />
            </div>
          </div>
          <div>
            <div className="flex min-w-[50%]">
              <div className="flex-col">
                <div className="">
                  <EditUserForm user={user} />
                </div>
              </div>
              <div className="ml-24">
                <EditHostForm host={host} username={user.username} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
