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

  const admin = await confirmAdmin(user.id);

  console.log('Confirm Admin result: ', admin);

  const users = await getUsersForAdmin();

  if (admin?.isAdmin === true) {
    return <UsersList users={users} />;
  } else {
    return (
      <div className="container">
        <div className="flex flex-col">
          <div>
            <h1>Profile of {params.username}</h1>
          </div>
          <div className="flex flex-row">
            <div>
              <div className="avatar">
                <div className="rounded">
                  <img src={user.pictureUrl} alt="Thumbnail" />
                </div>
              </div>
              <h2>First Name: {user.firstName}</h2>
              <h2>Last Name: {user.lastName}</h2>
              <h2>Gender: {user.gender}</h2>
              <h2>Country: {user.country}</h2>
              <h2>City: {user.city}</h2>
            </div>
            <h2>Presentation: {user.presentation}</h2>
            <div>
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
}
