import { Sql } from 'postgres';

export type Role = {
  id: number;
  userId: number;
  isAdmin: boolean;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      roles (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        is_admin BOOLEAN DEFAULT FALSE
      );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE roles `;
}
