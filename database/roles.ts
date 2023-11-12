import { cache } from 'react';
import { sql } from '../database/connect';
import { Role } from '../migrations/00008-createTableRoles';

export const createAdmin = cache(async () => {
  const [role] = await sql<Role[]>`
    INSERT INTO
      roles (
        user_id,
        is_admin
      )
    VALUES
      (1, TRUE) RETURNING *
  `;
  return role;
});

export const confirmAdmin = cache(async (userId: number) => {
  const [role] = await sql<Role[]>`
    SELECT
      *
    FROM
      roles
    WHERE
      user_id = ${userId}
      AND is_admin = TRUE
  `;
  return role;
});
