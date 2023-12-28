import { NextRequest, NextResponse } from 'next/server';
import { getUserByUsername } from '../../../../../database/users';
import { UserResponse } from '../../../login/route';

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string> },
): Promise<NextResponse<UserResponse>> {
  const username = params.username;

  if (!username) {
    const errorResponse = {
      errors: [{ message: 'Username not found' }],
    };
    return NextResponse.json(errorResponse, { status: 404 });
  }

  const user = await getUserByUsername(username);

  if (!user) {
    const errorResponse = {
      errors: [{ message: 'User not found' }],
    };
    return NextResponse.json(errorResponse, { status: 404 });
  }

  return NextResponse.json({ user: user });
}
