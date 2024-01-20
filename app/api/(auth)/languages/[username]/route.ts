import { NextRequest, NextResponse } from 'next/server';
import { getUserByUsername } from '../../../../../database/users';
import { UserLanguages } from '../../../../../migrations/00005-createTableUsersLanguages';
import {
  deleteUserLanguage,
  getLanguageByUserId,
  updateUserLanguages,
} from '../../../../../database/languages';

type LanguageResponse =
  | {
      languages: UserLanguages | undefined;
    }
  | {
      errors: { message: string }[];
    };

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string> },
): Promise<NextResponse<LanguageResponse>> {
  let userLanguages;
  const user = await getUserByUsername(params.username!);

  if (!user) {
    const errorResponse = {
      errors: [{ message: 'User not found' }],
    };
    return NextResponse.json(errorResponse, { status: 404 });
  }

  const body = await request.json();

  const languageIds = body.languageId;
  const userId = user.id;

  for (const languageId of languageIds) {
    const languageExist = await getLanguageByUserId(userId, languageId);

    if (languageExist) {
      return NextResponse.json(
        { errors: [{ message: 'Language already listed' }] },
        { status: 422 },
      );
    }

    userLanguages = await updateUserLanguages(userId, languageId);

    if (!userLanguages) {
      const errorResponse = {
        errors: [{ message: 'Error updating the Languages' }],
      };
      return NextResponse.json(errorResponse, { status: 500 });
    }
  }

  return NextResponse.json({
    languages: userLanguages,
  });
}

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: Record<string, string>;
  },
): Promise<NextResponse<LanguageResponse>> {
  const user = await getUserByUsername(params.username!);

  if (!user) {
    const errorResponse = {
      errors: [{ message: 'User not found' }],
    };
    return NextResponse.json(errorResponse, { status: 404 });
  }

  const languageId = parseInt(
    request.nextUrl.searchParams.get('languageId') as string,
  );

  if (!languageId) {
    const errorResponse = {
      errors: [{ message: 'Language not found' }],
    };
    return NextResponse.json(errorResponse, { status: 404 });
  }

  const languageToDelete = await deleteUserLanguage(user.id, languageId);

  if (!languageToDelete) {
    const errorResponse = {
      errors: [{ message: 'Language not found' }],
    };
    return NextResponse.json(errorResponse, { status: 404 });
  }

  return NextResponse.json({
    languages: languageToDelete,
  });
}
