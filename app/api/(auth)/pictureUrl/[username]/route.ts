import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  getUserByUsername,
  updateUserPictureByUsername,
} from '../../../../../database/users';

export type PictureResponseBodyPut =
  | {
      username: string;
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
): Promise<NextResponse<PictureResponseBodyPut>> {
  const username = params.username!;

  const userToUpdate = await getUserByUsername(username);

  if (!userToUpdate) {
    const errorResponse: PictureResponseBodyPut = {
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
    const errorResponse: PictureResponseBodyPut = {
      errors: [{ message: 'Uploading was unsuccessful' }],
    };
    return NextResponse.json(errorResponse, { status: 400 });
  }

  // ==========  End Check Schemas for ZOD  ==============
  // =====================================================

  await updateUserPictureByUsername(
    userToUpdate.username,
    result.data.pictureUrl,
  );

  return NextResponse.json({
    username: userToUpdate.username,
    picture_url: result.data.pictureUrl,
  });
}
