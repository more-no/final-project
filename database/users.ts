import { cache } from 'react';
import { sql } from '../database/connect';
import { User, UserRegistration } from '../migrations/00000-createTableUsers';

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export const getUsers = cache(async () => {
  const users = await sql<User[]>`
    SELECT
      *
    FROM
      users
  `;
  return users;
});

export const registerUser = cache(
  async (
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    pictureUrl: string,
    passwordHash: string,
  ) => {
    const [user] = await sql<UserRegistration[]>`
      INSERT INTO
        users (
          username,
          first_name,
          last_name,
          email,
          picture_url,
          password_hash
        )
      VALUES
        (
          ${username.toLowerCase()},
          ${firstName},
          ${lastName},
          ${email},
          ${pictureUrl},
          ${passwordHash}
        ) RETURNING *
    `;
    return user;
  },
);

export const getUsersForAdmin = cache(async () => {
  const users = await sql<User[]>`
    SELECT
      id,
      username,
      first_name,
      last_name,
      email
    FROM
      users
  `;
  return users;
});

export const getUserByUsername = cache(async (username: string) => {
  const [user] = await sql<User[]>`
    SELECT
      *
    FROM
      users
    WHERE
      username = ${username.toLowerCase()}
  `;
  return user;
});

export const getUserByEmail = cache(async (email: string) => {
  const [user] = await sql<User[]>`
    SELECT
      *
    FROM
      users
    WHERE
      email = ${email}
  `;
  return user;
});

export const getUserWithPasswordHashByUsername = cache(
  async (username: string) => {
    const [user] = await sql<UserWithPasswordHash[]>`
      SELECT
        *
      FROM
        users
      WHERE
        username = ${username.toLowerCase()}
    `;
    return user;
  },
);

export const getUserById = cache(async (id: number) => {
  const [user] = await sql<User[]>`
    SELECT
      *
    FROM
      users
    WHERE
      id = ${id}
  `;
  return user;
});

export const deleteUserByUsername = cache(async (username: string) => {
  const [user] = await sql<User[]>`
    DELETE FROM users
    WHERE
      username = ${username} RETURNING *
  `;
  return user;
});

export const updateUserById = cache(
  async (
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    gender?: string | null,
    country?: string | null,
    city?: string | null,
    presentation?: string | null,
  ) => {
    const [user] = await sql<User[]>`
      UPDATE users
      SET
        first_name = ${firstName},
        last_name = ${lastName},
        email = ${email},
        gender = ${gender || ''},
        country = ${country || ''},
        city = ${city || ''},
        presentation = ${presentation || ''}
      WHERE
        id = ${id} RETURNING *
    `;
    return user;
  },
);

export const updateUserAccountById = cache(
  async (
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    gender: string | null,
    country: string | null,
    city: string | null,
    presentation: string | null,
  ) => {
    const [user] = await sql<User[]>`
      UPDATE users
      SET
        first_name = ${firstName},
        last_name = ${lastName},
        email = ${email},
        gender = ${gender || ''},
        country = ${country || ''},
        city = ${city || ''},
        presentation = ${presentation || ''}
      WHERE
        id = ${id} RETURNING *
    `;
    return user;
  },
);

export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<User[]>`
    SELECT
      users.id,
      users.username
    FROM
      users
      INNER JOIN sessions ON (
        sessions.token = ${token}
        AND sessions.user_id = users.id
        AND sessions.expiry_timestamp > now ()
      )
  `;
  return user;
});

export const updateUserPictureByUsername = cache(
  async (username: string, pictureUrl: string) => {
    const [user] = await sql<User[]>`
      UPDATE users
      SET
        picture_url = ${pictureUrl}
      WHERE
        username = ${username} RETURNING *
    `;
    return [user];
  },
);

export const getUserPictureByUsername = cache(async (username: string) => {
  const [user] = await sql<User[]>`
    SELECT
      users.picture_url
    FROM
      users
    WHERE
      username = ${username}
  `;
  return user;
});

export const getDateRegistrationByUsername = cache(async (username: string) => {
  const user = await sql<User[]>`
    SELECT
      TO_CHAR (
        users.date_registration,
        'YYYY-MM'
      ) AS date_string
    FROM
      users
    WHERE
      users.username = ${username}
  `;
  return user;
});
