import { NextRequest, NextResponse } from 'next/server';
import { getUserByUsername } from '../../../../../database/users';
import { UserLanguages } from '../../../../../migrations/00005-createTableUsersLanguages';
import {
  getLanguageByUserId,
  updateUserLanguages,
} from '../../../../../database/languages';

type LanguageResponse =
  | {
      languages: UserLanguages | undefined[];
    }
  | {
      errors: { message: string }[];
    };

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string> },
): Promise<NextResponse<LanguageResponse>> {
  const user = await getUserByUsername(params.username!);

  if (!user) {
    const errorResponse = {
      errors: [{ message: 'User not found' }],
    };
    return NextResponse.json(errorResponse, { status: 404 });
  }

  // Get the user data from the request
  const body = await request.json();

  console.log('Body: ', body);

  const languageId = body.languageId[0];
  const userId = user.id;

  console.log('LanguageId: ', languageId);
  console.log('UserId: ', userId);

  const languageExist = await getLanguageByUserId(userId, languageId);

  if (languageExist) {
    return NextResponse.json(
      { errors: [{ message: 'Language already listed' }] },
      { status: 422 },
    );
  }

  const userLanguages = await updateUserLanguages(userId, languageId);

  console.log('Response DB: ', userLanguages);

  if (!userLanguages) {
    const errorResponse = {
      errors: [{ message: 'Error updating the Languages' }],
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }

  return NextResponse.json({
    languages: userLanguages,
  });
}
