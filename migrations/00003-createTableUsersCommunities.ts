import { Sql } from 'postgres';

export type UserCommunities = {
  id: number;
  userId: number;
  communityId: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      users_communities (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        community_id INTEGER NOT NULL REFERENCES communities (id)
      );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE users_communities `;
}
