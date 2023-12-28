import { NextResponse } from 'next/server';
import { deleteUserByUsername } from '../../../../database/users';
import { UserResponse } from '../../login/route';

export async function DELETE(
  username: string,
): Promise<NextResponse<UserResponse>> {
  if (!username) {
    const errorResponse = {
      errors: [{ message: 'User not found' }],
    };
    return NextResponse.json(errorResponse, { status: 404 });
  }

  const user = await deleteUserByUsername(username);

  if (!user) {
    const errorResponse = {
      errors: [{ message: 'Error deleting the User' }],
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }

  return NextResponse.json({
    user: user,
  });
}
