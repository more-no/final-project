import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  getUserByUsername,
  updateUserPictureByUsername,
} from '../../../../../database/users';

type PictureResponse =
  | {
      picture_url: string;
    }
  | {
      errors: { message: string }[];
    };

const pictureUrlSchema = z.object({
  pictureUrl: z.string().url(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Record<string, string> },
): Promise<NextResponse<PictureResponse>> {
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
  const result = pictureUrlSchema.safeParse(body);

  if (!result.success) {
    const errorResponse = {
      errors: [{ message: 'Uploading was unsuccessful' }],
    };
    return NextResponse.json(errorResponse, { status: 400 });
  }

  // ==========  End Check Schemas for ZOD  ==============
  // =====================================================

  const userPicture = await updateUserPictureByUsername(
    userToUpdate.username,
    result.data.pictureUrl,
  );

  if (!userPicture) {
    const errorResponse = {
      errors: [{ message: 'Error saving the url in the Database' }],
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }

  return NextResponse.json({
    picture_url: result.data.pictureUrl,
  });
}
