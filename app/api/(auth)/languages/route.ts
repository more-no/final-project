import { NextRequest, NextResponse } from 'next/server';
import { Language } from '../../../../migrations/00004-createTableLanguages';
import { getLanguages } from '../../../../database/languages';
import { z } from 'zod';
import { getUserByUsername } from '../../../../database/users';

export type LanguageResponseBodyGet =
  | {
      languages: Language[];
    }
  | {
      errors: { message: string }[];
    };

export type LanguageResponseBodyPut =
  | {
      languages: Language[];
    }
  | {
      errors: { message: string }[];
    };

const languagesSchema = z.object({
  languages: z.string().optional(),
});

export async function GET(): Promise<NextResponse<LanguageResponseBodyGet>> {
  const languages = await getLanguages();

  if (languages) {
    const errorResponse: LanguageResponseBodyGet = {
      errors: [{ message: 'User not found' }],
    };
    return NextResponse.json(errorResponse, { status: 404 });
  }

  return NextResponse.json({ languages: languages });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string> },
): Promise<NextResponse<LanguageResponseBodyPut>> {
  const username = params.username!;

  const userToUpdate = await getUserByUsername(username);

  if (!userToUpdate) {
    const errorResponse: LanguageResponseBodyPut = {
      errors: [{ message: 'User not found' }],
    };
    return NextResponse.json(errorResponse, { status: 404 });
  }

  // Get the user data from the request
  const body = await request.json();
  console.log('Request Body: ', body);

  // ==========  Check Schemas for ZOD  ==================
  // =====================================================

  // zod verify the body matches my schema
  const resultUser = languagesSchema.safeParse(body);

  console.log('Schema User result: ', resultUser);

  if (!resultUser.success) {
    const errorResponse: LanguageResponseBodyPut = {
      errors: [{ message: 'Data is incomplete' }],
    };
    return NextResponse.json(errorResponse, { status: 400 });
  }

  // ==========  End Check Schemas for ZOD  ==============
  // =====================================================

  // await validateSessionWithCsrf(result.data.csrfToken);

  // query the database to update the user
  const userLanguages = await updateUserById(
    userToUpdate.id,
    // userToUpdate.firstName,
    // userToUpdate.lastName,
    // userToUpdate.email,
    // resultUser.data.gender,
    // resultUser.data.country,
    // resultUser.data.city,
    // resultUser.data.presentation,
  );
}
