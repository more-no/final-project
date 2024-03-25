import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession } from '../../../database/sessions';
import { getUserWithPasswordHashByUsername } from '../../../database/users';
import { createCsrfSecret, createTokenFromSecret } from '../../../utils/csrf';
import { secureCookieOptions } from '../../../utils/cookies';

export type UserResponse =
  | {
      user: { username: string };
    }
  | {
      errors: { message: string }[];
    };

const loginSchema = z.object({
  username: z
    .string()
    .min(4, { message: 'User name be 4 or more characters long' }),
  password: z
    .string()
    .min(6, { message: 'Password must be 6 or more characters long' }),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<UserResponse>> {
  // Get the user data from the request
  const body = await request.json();

  // ==========  Check Schemas for ZOD  ==================
  // =====================================================

  // Validate the user data
  const result = loginSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 401,
      },
    );
  }

  // ==========  End Check Schemas for ZOD  ==============
  // =====================================================

  // verify the user credentials
  const userWithPasswordHash = await getUserWithPasswordHashByUsername(
    result.data.username,
  );

  if (!userWithPasswordHash) {
    return NextResponse.json(
      { errors: [{ message: 'Username or password not valid' }] },
      { status: 401 },
    );
  }

  // Validate the user password by comparing with hashed password
  const isPasswordValid = await bcrypt.compare(
    result.data.password,
    userWithPasswordHash.passwordHash,
  );

  if (!isPasswordValid) {
    return NextResponse.json(
      { errors: [{ message: 'Username or password not valid' }] },
      {
        status: 401,
      },
    );
  }

  // Create a csrf seed
  const csrfSecret = createCsrfSecret();

  // Create a token
  const token = createTokenFromSecret(csrfSecret);

  // Create the session record
  const session = await createSession(
    userWithPasswordHash.id,
    token,
    csrfSecret,
  );

  if (!session) {
    return NextResponse.json(
      { errors: [{ message: 'Error creating the new session' }] },
      {
        status: 500,
      },
    );
  }

  // Send the new cookie in the headers
  cookies().set({
    name: 'sessionToken',
    value: session.token,
    ...secureCookieOptions,
  });

  // Return the new user information without the password hash
  return NextResponse.json({
    user: {
      username: userWithPasswordHash.username,
    },
  });
}
