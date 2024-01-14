import { Sql } from 'postgres';

export type Language = {
  id: number;
  languageName: string;
};

export type Languages = Language[];

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      languages (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        language_name VARCHAR(20) NOT NULL
      );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE languages `;
}
