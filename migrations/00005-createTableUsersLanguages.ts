import { Sql } from 'postgres';

export type UserLanguages = {
  id: number;
  userId: number;
  languageId: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      users_languages (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        language_id INTEGER NOT NULL REFERENCES languages (id) ON DELETE CASCADE
      );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE users_languages `;
}
