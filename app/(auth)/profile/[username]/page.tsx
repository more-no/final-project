import { NextResponse } from 'next/server';
import {
  getDateRegistrationByUsername,
  getUserByUsername,
  getUserPictureByUsername,
} from '../../../../database/users';
import { getHostById } from '../../../../database/hosts';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../../database/sessions';
import { cookies } from 'next/headers';
import BasicInfo from './BasicInfo';
import AboutMe from './AboutMe';
import AboutHost from './AboutHost';

type Props = {
  params: { username: string };
};

export function generateMetadata() {
  return {
    title: 'Your Profile',
  };
}

export default async function ProfilePage({ params }: Props) {
  // BEGIN VALIDATION LOGIC WITHOUT THE USER ID
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
    (await getValidSessionByToken(sessionTokenCookie.value));

  console.log('Is session Valid?', session);

  if (!session) {
    redirect(`/not-found`);
  }

  // END VALIDATION LOGIC WITHOUT THE USER ID
  // ----------------------

  const date = await getDateRegistrationByUsername(params.username);

  const thumbnail = await getUserPictureByUsername(params.username);

  console.log('User: ', user);
  console.log('Thumbnail: ', thumbnail);

  const host = await getHostById(user.id);

  if (!host) {
    const errorResponse = {
      errors: [{ message: 'Error finding the Host' }],
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }

  return (
    <div className="ml-24">
      <div>
        <p className="text-4xl py-6 pb-24">{params.username}'s profile</p>
      </div>
      <div className="container mx-auto sw-full">
        <div className="border-2 border-solid p-22">
          <div className="card lg:card-side pb-16 pt-16">
            <figure className="pl-16 max-w-2xl">
              <div className="flex flex-col">
                <div className="rounded pb-10">
                  <img src={user.pictureUrl} alt="Thumbnail" />
                </div>
                <BasicInfo
                  date={date[0]?.dateString}
                  gender={user.gender}
                  city={user.city}
                  country={user.country}
                  email={user.email}
                />
              </div>
            </figure>
            <div className="card-body pr-16 pt-1">
              <div className="flex-col max-w-xs mx-auto">
                <AboutMe presentation={user.presentation} />
              </div>
            </div>
            <div className="card-body">
              <AboutHost
                available={host.available}
                lastMinute={host.lastMinute}
                openToMeet={host.openToMeet}
                privateRoom={host.privateRoom}
                bed={host.bed}
                haveAnimals={host.haveAnimals}
                hostAnimals={host.hostAnimals}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
