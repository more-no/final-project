import { Sql } from 'postgres';

export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  country: string;
  city: string;
  pictureUrl: string;
  presentation: string;
  dateString: string;
  reported: boolean;
};

export type UserRegistration = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
};

export type UserForAdmin = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type UserPicture = {
  pictureUrl: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        username VARCHAR(20) NOT NULL,
        first_name VARCHAR(20) NOT NULL,
        last_name VARCHAR(20) NOT NULL,
        email VARCHAR(30) NOT NULL,
        gender VARCHAR(30),
        country VARCHAR(20),
        city VARCHAR(20),
        picture_url VARCHAR(200),
        presentation VARCHAR(300),
        date_registration DATE DEFAULT CURRENT_DATE,
        reported BOOLEAN DEFAULT FALSE,
        password_hash VARCHAR(80) NOT NULL
      );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE users `;
}
