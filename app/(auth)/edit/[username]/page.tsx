import { NextResponse } from 'next/server';
import { getUserByUsername } from '../../../../database/users';
import EditUserForm from './EditUserForm';
import EditHostForm from './EditHostForm';
import { getHostById } from '../../../../database/hosts';
import UploadPicture from './UploadPicture';
import { cookies } from 'next/headers';
import { getValidSessionByTokenWithId } from '../../../../database/sessions';
import { redirect } from 'next/navigation';

type Props = {
  params: { username: string };
};

export function generateMetadata() {
  return {
    title: 'Edit Profile',
  };
}

export default async function EditPage({ params }: Props) {
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

  const host = await getHostById(user.id);

  if (!host) {
    // Create an error response in the shape of HostResponseBodyGet
    const errorResponse = {
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

      <div className="container mx-auto sw-full">
        <div className="border-2 border-solid p-22">
          <div className="card lg:card-side pb-16 pt-16">
            <figure className="pl-16">
              <div className="flex flex-col">
                <div className="rounded pb-10">
                  <img src={user.pictureUrl} alt="Thumbnail" />
                </div>
                <div className="pr-16 pt-1">
                  <UploadPicture username={user.username} />
                </div>
              </div>
            </figure>
            <div className="card-body">
              <div className="">
                <div className="flex-col">
                  <EditUserForm user={user} />
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="">
                <EditHostForm host={host} username={user.username} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
