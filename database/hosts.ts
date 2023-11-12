import { cache } from 'react';
import { sql } from '../database/connect';
import {
  Host,
  Position,
  Positions,
} from '../migrations/00001-createTableHostsInformation';
import { SearchHost } from '../migrations/00001-createTableHostsInformation';

export const createHost = cache(async (userId: number, position: string) => {
  const [host] = await sql<Host[]>`
    INSERT INTO
      hosts_information (
        POSITION,
        user_id
      )
    VALUES
      (
        ${position},
        ${userId}
      ) RETURNING *
  `;
  return host;
});

export const getHosts = cache(async () => {
  const hosts = await sql<Host[]>`
    SELECT
      *
    FROM
      hosts_information
  `;
  return hosts;
});

export const getHostById = cache(async (userId: number) => {
  const [host] = await sql<Host[]>`
    SELECT
      *
    FROM
      hosts_information
    WHERE
      user_id = ${userId}
  `;
  return host;
});

export const updateHostById = cache(
  async (
    available: boolean,
    lastMinute: boolean,
    openToMeet: boolean,
    privateRoom: boolean,
    bed: boolean,
    haveAnimals: boolean,
    hostAnimals: boolean,
    userId: number,
  ) => {
    const [host] = await sql<Host[]>`
      UPDATE hosts_information
      SET
        available = ${available},
        last_minute = ${lastMinute},
        open_to_meet = ${openToMeet},
        private_room = ${privateRoom},
        bed = ${bed},
        have_animals = ${haveAnimals},
        host_animals = ${hostAnimals}
      WHERE
        user_id = ${userId} RETURNING *
    `;
    return host;
  },
);

export const updateHostPositionById = cache(
  async (position: string, userId: number) => {
    const [host] = await sql<Host[]>`
      UPDATE hosts_information
      SET
        POSITION = ${position}
      WHERE
        user_id = ${userId} RETURNING *
    `;
    return host;
  },
);

export const updateGuestsHost = cache(async (pastGuests: number) => {
  const [host] = await sql<Host[]>`
    INSERT INTO
      hosts_information (
        past_guests
      )
    VALUES
      (
        ${pastGuests}
      ) RETURNING *
  `;
  return host;
});

export const getPositions = cache(async () => {
  const positions = await sql<Positions[]>`
    SELECT
      POSITION,
      id
    FROM
      hosts_information;
  `;
  return positions;
});

export const getPositionByUsername = cache(async (username: string) => {
  const position = await sql<Position[]>`
    SELECT
      hosts_information.position
    FROM
      users
      JOIN hosts_information ON users.id = hosts_information.user_id
    WHERE
      users.username = ${username}
  `;
  return position;
});

// export const updateReviews = cache(async (reviews: number) => {
//   const [host] = await sql<Host[]>`
//     INSERT INTO
//       hosts_information (reviews)
//     VALUES
//       (
//         ${reviews}
//       ) RETURNING *
//   `;
//   return host;
// });

export const searchHosts = cache(async (city: string) => {
  const host = await sql<SearchHost[]>`
    SELECT
      users.id,
      users.username,
      users.email,
      users.country,
      users.city,
      TO_CHAR (
        users.date_registration,
        'YYYY-MM'
      ) AS date_string,
      hosts_information.available,
      hosts_information.last_minute,
      hosts_information.open_to_meet
    FROM
      users
      JOIN hosts_information ON users.id = hosts_information.user_id
    WHERE
      city = ${city}
      AND hosts_information.available = TRUE
  `;
  return host;
});
