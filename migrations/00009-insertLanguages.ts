import { Sql } from 'postgres';

const languages = [
  { id: 0, language: 'Czech' },
  { id: 1, language: 'Croatian' },
  { id: 2, language: 'Bulgarian' },
  { id: 3, language: 'Danish' },
  { id: 4, language: 'Dutch' },
  { id: 5, language: 'English' },
  { id: 6, language: 'Estonian' },
  { id: 7, language: 'Finnish' },
  { id: 8, language: 'French' },
  { id: 9, language: 'German' },
  { id: 10, language: 'Greek' },
  { id: 11, language: 'Hungarian' },
  { id: 12, language: 'Irish' },
  { id: 13, language: 'Italian' },
  { id: 14, language: 'Latvian' },
  { id: 15, language: 'Lithuanian' },
  { id: 16, language: 'Maltese' },
  { id: 17, language: 'Polish' },
  { id: 18, language: 'Portuguese' },
  { id: 19, language: 'Romanian' },
  { id: 20, language: 'Slovak' },
  { id: 21, language: 'Slovene' },
  { id: 22, language: 'Spanish' },
  { id: 23, language: 'Swedish' },
  { id: 24, language: 'Mandarin Chinese' },
  { id: 25, language: 'Hindi' },
  { id: 26, language: 'Arabic' },
  { id: 27, language: 'Bengali' },
  { id: 28, language: 'Russian' },
  { id: 29, language: 'Urdu' },
  { id: 30, language: 'Indonesian' },
  { id: 31, language: 'Japanese' },
  { id: 32, language: 'Nigerian' },
  { id: 33, language: 'Egyptian' },
  { id: 34, language: 'Marathi' },
  { id: 35, language: 'Telugu' },
  { id: 36, language: 'Turkish' },
  { id: 37, language: 'Tamil' },
  { id: 38, language: 'Cantonese' },
  { id: 39, language: 'Vietnamese' },
  { id: 40, language: 'Wu Chinese' },
  { id: 41, language: 'Tagalog' },
  { id: 42, language: 'Korean' },
  { id: 43, language: 'Farsi' },
];

export async function up(sql: Sql) {
  for (const language of languages) {
    await sql`
      INSERT INTO
        languages (
          language_name
        )
      VALUES
        (
          ${language.language}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const language of languages) {
    await sql`
      DELETE FROM languages
      WHERE
        language_name = ${language.language}
    `;
  }
}
