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
            <h2>Available: {`${host.available}`}</h2>
            <h2>Last Minute requests: {`${host.lastMinute}`}</h2>
            <h2>Open to meet: {`${host.openToMeet}`}</h2>
            <h2>Offer a Private Room: {`${host.privateRoom}`}</h2>
            <h2>Offer a real bed: {`${host.bed}`}</h2>
            <h2>Has animals: {`${host.haveAnimals}`}</h2>
            <h2>Accept animals: {`${host.hostAnimals}`}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
