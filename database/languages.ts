import { cache } from 'react';
import { sql } from './connect';
import { Language } from '../migrations/00004-createTableLanguages';
import { UserLanguages } from '../migrations/00005-createTableUsersLanguages';

export const getLanguages = cache(async () => {
  const languages = await sql<Language[]>`
    SELECT
      *
    FROM
      languages
  `;
  return languages;
});

export const deleteLanguage = cache(async (languageName: string) => {
  const language = await sql<Language[]>`
    DELETE FROM languages
    WHERE
      language_name = ${languageName} RETURNING *
  `;
  return language;
});

// export const getLanguagesById = cache(async (languages: string[] => {
//   const language = await sql<Language[]>`
//     SELECT
//       id
//     FROM
//       languages
//     IN
//       language_name = ${languages}
//   `;
//   return languages;
// });

// export const getLanguagesById = (languages: string[]) => {
//   const languageArray = [];
//   for (const language of languages) {
//     languageArray.push(
//       const language = await sql<Language[]>`
//         SELECT
//           id
//         FROM
//           languages
//         WHERE
//           language_name = ${language}
//       `,
//     );
//   }
//   return languageArray;
// };

export const updateUserLanguages = cache(async (username: string) => {
  const [userLanguages] = await sql<UserLanguages[]>`
    INSERT INTO
      users_languages (
        user_id,
        language_id
      )
    SELECT
      user_id,
      language_id
    FROM
      users
      JOIN languages ON languages.id = users.language_id
    WHERE
      users.username = ${username}
  `;
  return userLanguages;
});
