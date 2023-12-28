import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { UserResponse } from '../../../login/route';
import {
  deleteUserByUsername,
  getUserByUsername,
  updateUserById,
} from '../../../../../database/users';

const userSchema = z.object({
  gender: z.string().max(20, { message: 'Max 20 characters' }).nullish(),
  country: z
    .string()
    .trim()
    .max(20, { message: 'Max 20 characters' })
    .nullish(),
  city: z.string().trim().max(20, { message: 'Max 20 characters' }).nullish(),
  presentation: z
    .string()
    .trim()
    .max(900, { message: 'Max 900 characters' })
    .nullish(),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string> },
): Promise<NextResponse<UserResponse>> {
  const username = params.username!;

  const userToUpdate = await getUserByUsername(username);

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
  const resultUser = userSchema.safeParse(body);

  if (!resultUser.success) {
    const errorResponse = {
      errors: [{ message: 'Data is incomplete' }],
    };
    return NextResponse.json(errorResponse, { status: 400 });
  }

  // ==========  End Check Schemas for ZOD  ==============
  // =====================================================

  // query the database to update the user
  const user = await updateUserById(
    userToUpdate.id,
    userToUpdate.firstName,
    userToUpdate.lastName,
    userToUpdate.email,
    resultUser.data.gender,
    resultUser.data.country,
    resultUser.data.city,
    resultUser.data.presentation,
  );

  if (!user) {
    const errorResponse = {
      errors: [{ message: 'Error updating the User' }],
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }

  return NextResponse.json({
    user: user,
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string> },
): Promise<NextResponse<UserResponse>> {
  const username = params.username!;

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
