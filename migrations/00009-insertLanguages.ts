import { Sql } from 'postgres';

const languages = [
  { language: 'Bulgarian' },
  { language: 'Croatian' },
  { language: 'Czech' },
  { language: 'Danish' },
  { language: 'Dutch' },
  { language: 'English' },
  { language: 'Estonian' },
  { language: 'Finnish' },
  { language: 'French' },
  { language: 'German' },
  { language: 'Greek' },
  { language: 'Hungarian' },
  { language: 'Irish' },
  { language: 'Italian' },
  { language: 'Latvian' },
  { language: 'Lithuanian' },
  { language: 'Maltese' },
  { language: 'Polish' },
  { language: 'Portuguese' },
  { language: 'Romanian' },
  { language: 'Slovak' },
  { language: 'Slovene' },
  { language: 'Spanish' },
  { language: 'Swedish' },
  { language: 'Mandarin Chinese' },
  { language: 'Hindi' },
  { language: 'Arabic' },
  { language: 'Bengali' },
  { language: 'Russian' },
  { language: 'Urdu' },
  { language: 'Indonesian' },
  { language: 'Japanese' },
  { language: 'Nigerian' },
  { language: 'Egyptian' },
  { language: 'Marathi' },
  { language: 'Telugu' },
  { language: 'Turkish' },
  { language: 'Tamil' },
  { language: 'Cantonese' },
  { language: 'Vietnamese' },
  { language: 'Wu Chinese' },
  { language: 'Tagalog' },
  { language: 'Korean' },
  { language: 'Farsi' },
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
