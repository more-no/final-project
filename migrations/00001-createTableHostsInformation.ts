import { Sql } from 'postgres';

export type Host = {
  id: number;
  available: boolean;
  position: string;
  lastMinute: boolean;
  openToMeet: boolean;
  privateRoom: boolean;
  bed: boolean;
  haveAnimals: boolean;
  hostAnimals: boolean;
  reviews: number | null;
  userId: number;
};

export type SearchHost = {
  id: number;
  username: string;
  email: string;
  country: string;
  city: string;
  pictureUrl: string;
  dateString: string;
  available: boolean;
  position: string;
  lastMinute: boolean;
  openToMeet: boolean;
};

export type HostsMap = {
  id: number;
  username: string;
  pictureUrl: string;
  available: boolean;
  lastMinute: boolean;
  openToMeet: boolean;
  position: string;
};

export type Positions = {
  position: string;
  id: number;
};

export type Position = {
  position: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      hosts_information (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        available BOOLEAN DEFAULT TRUE,
        POSITION VARCHAR(50),
        last_minute BOOLEAN DEFAULT FALSE,
        open_to_meet BOOLEAN DEFAULT FALSE,
        private_room BOOLEAN DEFAULT FALSE,
        bed BOOLEAN DEFAULT FALSE,
        have_animals BOOLEAN DEFAULT FALSE,
        host_animals BOOLEAN DEFAULT FALSE,
        reviews INTEGER,
        user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE
      );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE hosts_information `;
}
