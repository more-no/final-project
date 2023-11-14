import { NextResponse } from 'next/server';
import {
  getUserByUsername,
  getUserPictureByUsername,
  getUsersForAdmin,
} from '../../../../database/users';
import { UserResponseBodyPut } from '../../../api/(auth)/editUser/[username]/route';
import { confirmAdmin } from '../../../../database/roles';
import UsersList from './UsersList';

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
    // Create an error response in the shape of HostResponseBodyGet
    const errorResponse: UserResponseBodyPut = {
      errors: [{ message: 'Error finding the User' }],
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }

  const admin = await confirmAdmin(user.id);

  console.log('Confirm Admin result: ', admin);

  const users = await getUsersForAdmin();

  // const pictureUrl = await getUserPictureByUsername(params.username);

  if (admin?.isAdmin === true) {
    return <UsersList users={users} />;
  } else {
    return (
      <div>
        <h2>Profile of {params.username}</h2>
        <div className="avatar">
          <div className="w-70 rounded">
            <img src={user.pictureUrl} alt="Thumbnail" />
            {/* <img src="/thumbnail.jpg" /> */}
          </div>
        </div>
        <h2>First Name: {user.firstName}</h2>
        <h2>Last Name: {user.lastName}</h2>
        <h2>Gender: {user.gender}</h2>
        <h2>Country: {user.country}</h2>
        <h2>City: {user.city}</h2>
        <h2>Presentation: {user.presentation}</h2>
      </div>
    );
  }
}
