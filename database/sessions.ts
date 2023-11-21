import { cache } from 'react';
import { sql } from '../database/connect';
import { Session } from '../migrations/00006-createTableSessions';

export const deleteExpiredSessions = cache(async () => {
  await sql`
    DELETE FROM sessions
    WHERE
      expiry_timestamp < now ()
  `;
});

export const createSession = cache(
  async (userId: number, token: string, csrfSecret: string) => {
    const [session] = await sql<Session[]>`
      INSERT INTO
        sessions (
          user_id,
          token,
          csrf_secret
        )
      VALUES
        (
          ${userId},
          ${token},
          ${csrfSecret}
        ) RETURNING id,
        token,
        user_id,
        csrf_secret
    `;

    await deleteExpiredSessions();

    return session;
  },
);

export const deleteSessionByToken = cache(async (token: string) => {
  const [session] = await sql<{ id: number; token: string }[]>`
    DELETE FROM sessions
    WHERE
      sessions.token = ${token} RETURNING id,
      token
  `;

  return session;
});

export const getValidSessionByTokenWithId = cache(
  async (token: string, id: number) => {
    const [session] = await sql<
      { id: number; token: string; userId: number; csrfSecret: string }[]
    >`
      SELECT
        sessions.id,
        sessions.token,
        sessions.user_id,
        sessions.csrf_secret
      FROM
        sessions
      WHERE
        sessions.token = ${token}
        AND sessions.user_id = ${id}
        AND sessions.expiry_timestamp > now ()
    `;

    return session;
  },
);

export const getValidSessionByToken = cache(async (token: string) => {
  const [session] = await sql<
    { id: number; token: string; userId: number; csrfSecret: string }[]
  >`
    SELECT
      sessions.id,
      sessions.token,
      sessions.user_id,
      sessions.csrf_secret
    FROM
      sessions
    WHERE
      sessions.token = ${token}
      AND sessions.expiry_timestamp > now ()
  `;

  return session;
});

export const getSessionCsrfSecret = cache(async (id: number) => {
  const [session] = await sql<{ csrfSecret: string }[]>`
    SELECT
      sessions.csrf_secret
    FROM
      sessions
    WHERE
      user_id = ${id}
  `;
  return session;
});
