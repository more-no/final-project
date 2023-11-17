import { NextResponse } from 'next/server';
import {
  getUserByUsername,
  getUserPictureByUsername,
  getUsersForAdmin,
} from '../../../../database/users';
import { UserResponseBodyPut } from '../../../api/(auth)/editUser/[username]/route';
import { confirmAdmin } from '../../../../database/roles';
import UsersList from '../../user/[username]/UsersList';
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
    <div className="ml-6">
      <div>
        <p className="text-4xl py-6 pb-15">Profile of {params.username}</p>
      </div>
      <div className="border-2 border-solid m-20 p-20">
        <div className="grid grid-cols-2 pb-10">
          <div>
            <div className="avatar">
              <div className="rounded">
                <img src={user.pictureUrl} alt="Thumbnail" />
              </div>
            </div>
            <p>Member since: {user.date_registration}</p>
            <p>Gender: {user.gender}</p>
            <p>Living in: {`${user.city}, ${user.country}`}</p>
          </div>
          <div>
            <h2 className="text-2xl p-2">About me:</h2>
            <h2 className="text-2xl">{user.presentation}</h2>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-4">
            <div>
              Available:
              {renderIcon(host.available)}
            </div>
            <div>Last Minute requests: {renderIcon(host.lastMinute)}</div>
            <div>Open to meet: {renderIcon(host.openToMeet)}</div>
            <div>Offer a Private Room: {renderIcon(host.privateRoom)}</div>
            <div>Offer a real bed: {renderIcon(host.bed)}</div>
            <div>Has animals: {renderIcon(host.haveAnimals)}</div>
            <div>Accept animals: {renderIcon(host.hostAnimals)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
