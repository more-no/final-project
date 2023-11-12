import { getHostById } from '../../../../database/hosts';
import { getUserByUsername } from '../../../../database/users';
import { NextResponse } from 'next/server';
import { UserResponseBodyPut } from '../../../api/(auth)/editUser/[username]/route';

type Props = {
  params: { username: string };
};

export function generateMetadata() {
  return {
    title: 'Your Host Profile',
  };
}

export default async function HostPage({ params }: Props) {
  const user = await getUserByUsername(params.username);

  console.log('User: ', user);

  if (!user) {
    // Create an error response in the shape of HostResponseBodyGet
    const errorResponse: UserResponseBodyPut = {
      errors: [{ message: 'Error finding the User' }],
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }

  const host = await getHostById(user.id);

  if (!host) {
    // Create an error response in the shape of HostResponseBodyGet
    const errorResponse: UserResponseBodyPut = {
      errors: [{ message: 'Error finding the Host' }],
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }

  return (
    <div>
      <h2>Host Profile of {params.username}</h2>
      <h2>Available: {`${host.available}`}</h2>
      <h2>Last Minute requests: {`${host.lastMinute}`}</h2>
      <h2>Open to meet: {`${host.openToMeet}`}</h2>
      <h2>Offer a Private Room: {`${host.privateRoom}`}</h2>
      <h2>Offer a real bed: {`${host.bed}`}</h2>
      <h2>Has animals: {`${host.haveAnimals}`}</h2>
      <h2>Accept animals: {`${host.hostAnimals}`}</h2>
    </div>
  );
}
