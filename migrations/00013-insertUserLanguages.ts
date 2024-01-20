import { Sql } from 'postgres';

const userLanguages = [
  {
    userId: 2,
    languageId: 6,
  },
  {
    userId: 2,
    languageId: 9,
  },

  {
    userId: 3,
    languageId: 6,
  },
  {
    userId: 3,
    languageId: 9,
  },

  {
    userId: 4,
    languageId: 6,
  },
  {
    userId: 4,
    languageId: 9,
  },

  {
    userId: 5,
    languageId: 6,
  },
  {
    userId: 5,
    languageId: 13,
  },
  {
    userId: 6,
    languageId: 6,
  },
  {
    userId: 6,
    languageId: 9,
  },
  {
    userId: 7,
    languageId: 6,
  },
  {
    userId: 7,
    languageId: 9,
  },
];

export async function up(sql: Sql) {
  for (const userLanguage of userLanguages) {
    await sql`
      INSERT INTO
        users_languages (
          user_id,
          language_id
        )
      VALUES
        (
          ${userLanguage.userId},
          ${userLanguage.languageId}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const userLanguage of userLanguages) {
    await sql`
      DELETE FROM users_languages
      WHERE
        user_id = ${userLanguage.userId}
    `;
  }
}
