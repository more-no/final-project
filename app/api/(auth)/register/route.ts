import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession } from '../../../../database/sessions';
import {
  registerUser,
  getUserByUsername,
  getUserByEmail,
} from '../../../../database/users';
import { secureCookieOptions } from '../../../../utils/cookies';
import { createCsrfSecret } from '../../../../utils/csrf';
import { createAdmin } from '../../../../database/roles';
import { createHost } from '../../../../database/hosts';

export type RegisterResponseBodyPost =
  | {
      user: {
        username: string;
      };
    }
  | {
      errors: { message: string }[];
    };

const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(4, { message: 'Username be 4 or more characters long' })
    .max(15, { message: 'Username be 15 or fewer characters long' }),
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
  country: z.string(),
  city: z.string(),
  password: z
    .string()
    .trim()
    .min(6, { message: 'Password be 6 or more characters long' })
    .max(14, { message: 'Password be 14 or fewer characters long' }),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<RegisterResponseBodyPost>> {
  // Task: Implement the user registration workflow

  // Get the user data from the request
  const body = await request.json();

  // Validate the user data
  const result = registerSchema.safeParse(body);

  console.log('Register Post request: ', result);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  // Check if user already exist in the database
  const user = await getUserByUsername(result.data.username);

  if (user) {
    return NextResponse.json(
      { errors: [{ message: 'Username is already taken' }] },
      { status: 403 },
    );
  }

  const email = await getUserByEmail(result.data.email);

  if (email) {
    return NextResponse.json(
      { errors: [{ message: 'Email is already taken' }] },
      { status: 403 },
    );
  }

  // Hash the plain password from the user
  const passwordHash = await bcrypt.hash(result.data.password, 12);

  // Set default profile thumbnail
  const pictureUrl = '/thumbnail.jpg';

  // Save the user information with the hashed password in the database
  const newUser = await registerUser(
    result.data.username,
    result.data.firstName,
    result.data.lastName,
    result.data.email,
    result.data.country,
    result.data.city,
    pictureUrl,
    passwordHash,
  );

  if (!newUser) {
    return NextResponse.json(
      { errors: [{ message: 'Error creating the new user' }] },
      { status: 406 },
    );
  }

  // if it is the first registration then make it Admin
  if (newUser.id === 1) {
    await createAdmin();
  }

  const position = '{"lat":51.057971,"lng":14.308219}';

  if (newUser.id !== 1) {
    const newHost = await createHost(newUser.id, position);

    if (!newHost) {
      return NextResponse.json(
        { errors: [{ message: 'Error creating the new host' }] },
        { status: 406 },
      );
    }

    console.log('New Host created: ', newHost.id, newHost.userId);
  }

  // Create a token
  const token = crypto.randomBytes(100).toString('base64');

  console.log('Register Token: ', token);

  // Create a csrf seed
  const csrfSecret = createCsrfSecret();

  console.log('CSRF Register: ', csrfSecret);

  // Create the session record
  const session = await createSession(newUser.id, token, csrfSecret);

  if (!session) {
    return NextResponse.json(
      { errors: [{ message: 'Error creating the new session' }] },
      {
        status: 401,
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
      id: newUser.id,
      username: newUser.username,
    },
  });
}
