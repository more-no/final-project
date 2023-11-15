import { NextResponse } from 'next/server';
import { getUserByUsername } from '../../../../database/users';
import EditUserForm from './EditUserForm';
import EditHostForm from './EditHostForm';
import { getHostById } from '../../../../database/hosts';
import { UserResponseBodyGet } from '../../../api/(auth)/users/[username]/route';
import { getLanguages } from '../../../../database/languages';
import Autocomplete from '../../map/[username]/Autocomplete';
import UploadPicture from './UploadPicture';

type Props = {
  params: { username: string };
};

export function generateMetadata() {
  return {
    title: 'Edit Profile',
  };
}

export default async function EditPage({ params }: Props) {
  const languages = await getLanguages();

  const languagesList = languages.map((language) => language.languageName);

  const user = await getUserByUsername(params.username);

  if (!user) {
    // Create an error response in the shape of HostResponseBodyGet
    const errorResponse: UserResponseBodyGet = {
      errors: [{ message: 'Error finding the User' }],
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }

  const host = await getHostById(user.id);

  if (!host) {
    // Create an error response in the shape of HostResponseBodyGet
    const errorResponse: UserResponseBodyGet = {
      errors: [{ message: 'Error finding the Host' }],
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }

  return (
    <div className="flex">
      <EditUserForm user={user} />
      <EditHostForm host={host} username={user.username} />
      {/* <Autocomplete username={user.username} position={host.position} /> */}
      <UploadPicture username={user.username} />
    </div>
  );
}
