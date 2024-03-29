import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { User } from '../../../../../migrations/00000-createTableUsers';
import {
  getUserByUsername,
  updateUserAccountById,
} from '../../../../../database/users';

type UserAccountResponse =
  | {
      userAccount: User;
    }
  | {
      errors: { message: string }[];
    };

const userAccountSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(3, { message: 'First name must be 3 or more characters long' })
    .max(20, { message: 'First name must be 20 or fewer characters long' }),
  lastName: z
    .string()
    .trim()
    .min(3, { message: 'Last name must be 3 or more characters long' })
    .max(20, { message: 'Last name must be 20 or fewer characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string> },
): Promise<NextResponse<UserAccountResponse>> {
  const userToUpdate = await getUserByUsername(params.username!);

  if (!userToUpdate) {
    const errorResponse = {
      errors: [{ message: 'User not found' }],
    };
    return NextResponse.json(errorResponse, { status: 404 });
  }

  // Get the user data from the request
  const body = await request.json();

  // ==========  Check Schemas for ZOD  ==================
  // =====================================================

  // zod verify the body matches my schema
  const resultAccount = userAccountSchema.safeParse(body);

  if (!resultAccount.success) {
    const errorResponse = {
      errors: [{ message: 'Data is incomplete' }],
    };
    return NextResponse.json(errorResponse, { status: 400 });
  }

  // ==========  End Check Schemas for ZOD  ==============
  // =====================================================

  const userAccount = await updateUserAccountById(
    userToUpdate.id,
    resultAccount.data.firstName,
    resultAccount.data.lastName,
    resultAccount.data.email,
    userToUpdate.gender,
    userToUpdate.country,
    userToUpdate.city,
    userToUpdate.presentation,
  );

  if (!userAccount) {
    const errorResponse = {
      errors: [{ message: 'Error updating the User Account' }],
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }

  return NextResponse.json({
    userAccount: userAccount,
  });
}
