import { Sql } from 'postgres';

const hosts = [
  {
    available: true,
    position: '{"lat":48.2083537,"lng":16.3725042}',
    lastMinute: false,
    openToMeet: true,
    privateRoom: false,
    bed: false,
    haveAnimals: true,
    hostAnimals: false,
    userId: 2,
  },
  {
    available: true,
    position: '{"lat":48.2078001,"lng":16.3380073}',
    lastMinute: false,
    openToMeet: false,
    privateRoom: false,
    bed: false,
    haveAnimals: false,
    hostAnimals: true,
    userId: 3,
  },
  {
    available: true,
    position: '{"lat":48.1532423,"lng":16.3821204}',
    lastMinute: false,
    openToMeet: false,
    privateRoom: true,
    bed: true,
    haveAnimals: false,
    hostAnimals: false,
    userId: 4,
  },
  {
    available: true,
    position: '{"lat":48.1914136,"lng":16.4141569}',
    lastMinute: false,
    openToMeet: true,
    privateRoom: false,
    bed: true,
    haveAnimals: false,
    hostAnimals: true,
    userId: 5,
  },
  {
    available: true,
    position: '{"lat":48.1891583,"lng":16.3530068}',
    lastMinute: true,
    openToMeet: true,
    privateRoom: true,
    bed: false,
    haveAnimals: true,
    hostAnimals: false,
    userId: 6,
  },
  {
    available: false,
    position: '{"lat":48.2110317,"lng":16.3113574}',
    lastMinute: false,
    openToMeet: true,
    privateRoom: false,
    bed: false,
    haveAnimals: true,
    hostAnimals: false,
    userId: 7,
  },
];

export async function up(sql: Sql) {
  for (const host of hosts) {
    await sql`
      INSERT INTO
        hosts_information (
          available,
          POSITION,
          last_minute,
          open_to_meet,
          private_room,
          bed,
          have_animals,
          host_animals,
          user_id
        )
      VALUES
        (
          ${host.available},
          ${host.position},
          ${host.lastMinute},
          ${host.openToMeet},
          ${host.privateRoom},
          ${host.bed},
          ${host.haveAnimals},
          ${host.hostAnimals},
          ${host.userId}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const host of hosts) {
    await sql`
      DELETE FROM hosts_information
      WHERE
        id = ${host.userId}
    `;
  }
}
