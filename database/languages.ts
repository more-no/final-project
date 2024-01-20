import { cache } from 'react';
import { sql } from './connect';
import { Language, Languages } from '../migrations/00004-createTableLanguages';
import { UserLanguages } from '../migrations/00005-createTableUsersLanguages';

export const getLanguages = cache(async () => {
  const languages = await sql<Language[]>`
    SELECT
      id,
      language_name
    FROM
      languages
  `;
  return languages;
});

export const getAllLanguagesByUserId = cache(async (id: number) => {
  const languages = await sql<Languages>`
    SELECT
      languages.*
    FROM
      users_languages
      JOIN languages ON users_languages.language_id = languages.id
    WHERE
      users_languages.user_id = ${id};
  `;
  return languages;
});

export const updateUserLanguages = cache(
  async (userId: number, languageId: number) => {
    const [userLanguages] = await sql<UserLanguages[]>`
      INSERT INTO
        users_languages (
          user_id,
          language_id
        )
      VALUES
        (
          ${userId},
          ${languageId}
        ) RETURNING *
    `;
    return userLanguages;
  },
);

export const getLanguageByUserId = cache(
  async (userId: number, languageId: number) => {
    const [userLanguage] = await sql<UserLanguages[]>`
      SELECT
        *
      FROM
        users_languages
      WHERE
        user_id = ${userId}
        AND language_id = ${languageId}
    `;
    return userLanguage;
  },
);

export const deleteUserLanguage = cache(
  async (userId: number, languageId: number) => {
    const [languageToDelete] = await sql<UserLanguages[]>`
      DELETE FROM users_languages
      WHERE
        user_id = ${userId}
        AND language_id = ${languageId} RETURNING *
    `;
    return languageToDelete;
  },
);
