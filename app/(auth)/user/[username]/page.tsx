import { NextResponse } from 'next/server';
import {
  getUserByUsername,
  getUserPictureByUsername,
  getUsersForAdmin,
} from '../../../../database/users';
import { UserResponseBodyPut } from '../../../api/(auth)/editUser/[username]/route';
import { confirmAdmin } from '../../../../database/roles';
import UsersList from './UsersList';
import { getHostById } from '../../../../database/hosts';

type Props = {
  params: { username: string };
};

export function generateMetadata() {
  return {
    title: 'Your Profile',
  };
}

export default async function UserPage({ params }: Props) {
  const renderImage = (value: boolean) => {
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

  const admin = await confirmAdmin(user.id);

  console.log('Confirm Admin result: ', admin);

  const users = await getUsersForAdmin();

  const host = await getHostById(user.id);

  if (!host && admin?.isAdmin === true) {
    return <UsersList users={users} />;
  }

  return (
    <div className="container">
      <div className="flex flex-col">
        <div>
          <p className="text-3xl">Profile of {params.username}</p>
        </div>
        <div className="flex flex-row">
          <div>
            <div className="avatar">
              <div className="rounded">
                <img src={user.pictureUrl} alt="Thumbnail" />
              </div>
            </div>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Gender: {user.gender}</p>
            <p>Country: {user.country}</p>
            <p>City: {user.city}</p>
          </div>
          <h2>Presentation: {user.presentation}</h2>
          <div>
            <p>
              Available:
              {host?.available !== undefined && renderImage(host.available)}
            </p>
            <p>
              Last Minute requests:{' '}
              {host?.lastMinute !== undefined && renderImage(host.lastMinute)}
            </p>
            <p>
              Open to meet:{' '}
              {host?.openToMeet !== undefined && renderImage(host.openToMeet)}
            </p>
            <p>
              Offer a Private Room:{' '}
              {host?.privateRoom !== undefined && renderImage(host.privateRoom)}
            </p>
            <p>
              Offer a real bed:{' '}
              {host?.bed !== undefined && renderImage(host.bed)}
            </p>
            <p>
              Has animals:{' '}
              {host?.haveAnimals !== undefined && renderImage(host.haveAnimals)}
            </p>
            <p>
              Accept animals:{' '}
              {host?.hostAnimals !== undefined && renderImage(host.hostAnimals)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
