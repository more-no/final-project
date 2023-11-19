import { NextResponse } from 'next/server';
import {
  getDateRegistrationByUsername,
  getUserByUsername,
  getUserPictureByUsername,
} from '../../../../database/users';
import { UserResponseBodyPut } from '../../../api/(auth)/editUser/[username]/route';
import { getHostById } from '../../../../database/hosts';

type Props = {
  params: { username: string };
};

export function generateMetadata() {
  return {
    title: 'Your Profile',
  };
}

export default async function ProfilePage({ params }: Props) {
  const renderIcon = (value: boolean) => {
    return value ? (
      <img src="/true.png" alt="Yes" />
    ) : (
      <img src="/false.png" alt="No" />
    );
  };

  const date = await getDateRegistrationByUsername(params.username);

  const user = await getUserByUsername(params.username);

  const thumbnail = await getUserPictureByUsername(params.username);

  console.log('User: ', user);
  console.log('Thumbnail: ', thumbnail);

  if (!user) {
    const errorResponse: UserResponseBodyPut = {
      errors: [{ message: 'Error finding the User' }],
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }

  const host = await getHostById(user.id);

  if (!host) {
    const errorResponse: UserResponseBodyPut = {
      errors: [{ message: 'Error finding the Host' }],
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }

  return (
    <div className="ml-24">
      <div>
        <p className="text-4xl py-6 pb-24">{params.username}'s profile</p>
      </div>
      <div className="container mx-auto">
        <div className="border-2 border-solid p-22">
          <div className="grid grid-cols-3 pb-10 place-content-between">
            <div className="pl-16">
              <div className="avatar pb-8">
                <div className="rounded">
                  <img src={user.pictureUrl} alt="Thumbnail" />
                </div>
              </div>
              <p className="text-2xl pb-4">
                Member since: {date[0]?.dateString}
              </p>
              <p className="text-2xl pb-4">Gender: {user.gender}</p>
              <p className="text-2xl pb-4">
                Living in: {`${user.city}, ${user.country}`}
              </p>
            </div>
            <div className="pr-16 pt-1">
              <h2 className="text-3xl pb-4">About me:</h2>
              <h2 className="text-lg pl-4">{user.presentation}</h2>
            </div>
            <div className="pb-8 pl-8">
              <div className="flex flex-row flex-nowrap text-2xl pr-3 pt-8">
                Available:
                <div className="pl-2 pt-1 w-8 h-8 inline-block">
                  {renderIcon(host.available)}
                </div>
              </div>
              <div className="flex flex-row flex-nowrap text-2xl pt-8">
                Last-minute requests:
                <div className="pl-2 pt-1 w-8 h-8 inline-block">
                  {renderIcon(host.lastMinute)}
                </div>
              </div>
              <div className="flex flex-row flex-nowrap text-2xl pt-8">
                Open to meet:
                <div className="pl-2 pt-1 w-8 h-8 inline-block">
                  {renderIcon(host.openToMeet)}
                </div>
              </div>
              <div className="flex flex-row flex-nowrap text-2xl pt-8">
                Offer a Private Room:
                <div className="pl-2 pt-1 w-8 h-8 inline-block">
                  {renderIcon(host.privateRoom)}
                </div>
              </div>
              <div className="flex flex-row flex-nowrap text-2xl pt-8">
                Offer a real bed:
                <div className="pl-2 pt-1 w-8 h-8 inline-block">
                  {renderIcon(host.bed)}
                </div>
              </div>
              <div className="flex flex-row flex-nowrap text-2xl pt-8">
                Has animals:
                <div className="pl-2 pt-1 w-8 h-8 inline-block">
                  {renderIcon(host.haveAnimals)}
                </div>
              </div>
              <div className="flex flex-row flex-nowrap text-2xl pt-8">
                Accept animals:
                <div className="pl-2 pt-1 w-8 h-8 inline-block">
                  {renderIcon(host.hostAnimals)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
