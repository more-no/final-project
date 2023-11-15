import { NextRequest, NextResponse } from 'next/server';
import { getUserByUsername } from '../../../../../database/users';
import { User } from '../../../../../migrations/00000-createTableUsers';
import { UserForAdmin } from '../../../../../migrations/00000-createTableUsers';

export type UserResponseBodyGet =
  | {
      user: User;
    }
  | {
      errors: { message: string }[];
    };

export type UserResponseBodyDelete =
  | {
      user: UserForAdmin;
    }
  | {
      errors: { message: string }[];
    };

export async function GET(
  // request: NextRequest,
  { params }: { params: Record<string, string> },
): Promise<NextResponse<UserResponseBodyGet>> {
  const username = params.username;

  if (!username) {
    const errorResponse: UserResponseBodyGet = {
      errors: [{ message: 'Username not found' }],
    };
    return NextResponse.json(errorResponse, { status: 404 });
  }

  const user = await getUserByUsername(username);

  if (!user) {
    const errorResponse: UserResponseBodyGet = {
      errors: [{ message: 'User not found' }],
    };
    return NextResponse.json(errorResponse, { status: 404 });
  }

  return NextResponse.json({ user: user });
}
