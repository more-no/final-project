import { NextResponse } from 'next/server';
import { getUserByUsername } from '../../../../database/users';
import EditUserForm from './EditUserForm';
import EditHostForm from './EditHostForm';
import EditLanguagesForm from './EditLanguagesForm';
import { getHostById } from '../../../../database/hosts';
import UploadPicture from './UploadPicture';
import { cookies } from 'next/headers';
import { getValidSessionByTokenWithId } from '../../../../database/sessions';
import { permanentRedirect } from 'next/navigation';
import {
  getLanguages,
  getLanguagesByUserId,
} from '../../../../database/languages';

type Props = {
  params: { username: string };
};

export function generateMetadata() {
  return {
    title: 'Edit Profile',
  };
}

export default async function EditPage({ params }: Props) {
  const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;

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

  if (!session) {
    permanentRedirect(`/not-found`);
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

  const optionsList = await getLanguages();

  const userLanguageList = await getLanguagesByUserId(user.id);

  console.log('List: ', userLanguageList);

  if (userLanguageList.length === 0) {
    return <div>There are no languages yet. </div>;
  } else {
    return (
      <>
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
                    <UploadPicture
                      cloudName={cloudinaryCloudName}
                      username={user.username}
                    />
                  </div>
                  <div className="pt-10">
                    <EditLanguagesForm user={user} languages={optionsList} />
                  </div>
                  {userLanguageList.map((language) => {
                    return (
                      <div key={`user-${language.languageId}`}>
                        {language.languageName}
                      </div>
                    );
                  })}
                </div>
              </figure>
              <div className="card-body">
                <div className="flex-col">
                  <EditUserForm user={user} />
                </div>
              </div>
              <div className="card-body">
                <EditHostForm host={host} username={user.username} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
