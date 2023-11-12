import { NextResponse } from 'next/server';
// import { deleteUserByUsername } from '../../../../database/users';
import { Role } from '../../../../migrations/00008-createTableRoles';
// import { User } from '../../../../migrations/00000-createTableUsers';
import { UserResponseBodyDelete } from '../editUser/[username]/route';
import { deleteUserByUsername } from '../../../../database/users';

export type RoleResponseBodyGet =
  | {
      admin: Role;
    }
  | {
      errors: { message: string }[];
    };

export async function DELETE(
  username: string,
): Promise<NextResponse<UserResponseBodyDelete>> {
  if (!username) {
    const errorResponse: UserResponseBodyDelete = {
      errors: [{ message: 'User not found' }],
    };
    return NextResponse.json(errorResponse, { status: 404 });
  }

  const user = await deleteUserByUsername(username);

  if (!user) {
    const errorResponse: UserResponseBodyDelete = {
      errors: [{ message: 'Error deleting the User' }],
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }

  return NextResponse.json({
    user: user,
  });
}
