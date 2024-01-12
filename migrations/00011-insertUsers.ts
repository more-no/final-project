import { Sql } from 'postgres';

const users = [
  {
    id: 2,
    username: 'lucy',
    firstName: 'Lucy',
    lastName: 'Doe',
    email: 'lucy@mail.com',
    gender: 'Female',
    country: 'Austria',
    city: 'Vienna',
    pictureUrl: '/avatars/lucy.jpg',
    presentation:
      'I am an open-minded, creative and positive Person, always up for adventure, crazy ideas, being in nature and enjoying life fully. I always try to take what life has to offer for my and make the best out of it so I am spontaneous and flexible. Currently I study art therapy but I take a break from it at the Moment because I am looking forward to giving birth to a Little baby very soon:)',
    dateString: '2023-12-20',
    passwordHash: '******',
  },
  {
    id: 3,
    username: 'mark',
    firstName: 'Mark',
    lastName: 'Doe',
    email: 'mark@mail.com',
    gender: 'Male',
    country: 'Austria',
    city: 'Vienna',
    pictureUrl: '/avatars/mark.jpg',
    presentation:
      'I currently live in an eco-community, where I spend my time building cool things like alternative heating and energy solutions, compost-toilets but also spend a lot of time in meetings :) I also have a passion for saving food and other useful things, cycling and hitchhiking. A few years back I lived as a nomad and without money for a while. I also do some environmental activism, like spending time in forest occupations, fighting for an ecological turn in traffic policy, anti-advertising stuff',
    dateString: '2024-01-06',
    passwordHash: '******',
  },
  {
    id: 4,
    username: 'leah',
    firstName: 'Leah',
    lastName: 'Doe',
    email: 'leah@mail.com',
    gender: 'Female',
    country: 'Austria',
    city: 'Vienna',
    pictureUrl: '/avatars/leah.jpg',
    presentation:
      'Hi everyone, I am a woman who likes having fun and when I have enough time to join fun with cycle trip or walk trip. By myself I like to meet people and discover new landscape and new culture',
    dateString: '2023-06-15',
    passwordHash: '******',
  },
  {
    id: 5,
    username: 'louis',
    firstName: 'Louis',
    lastName: 'Doe',
    email: 'louis@mail.com',
    gender: 'Male',
    country: 'Austria',
    city: 'Vienna',
    pictureUrl: '/avatars/louis.jpg',
    presentation:
      'I work as a social worker with teenage refugees and I am currently starting to work as a teacher for German as a foreign language. I am also a musician, up for jamming, playing concerts solo and in a band or just hanging around on my roof or by a lake playing guitar. I try to swim out in nature as often as I can. Ive been vegetarian for the bigger part of my life and I am quite used to cooking for a lot of people.',
    dateString: '2023-09-05',
    passwordHash: '******',
  },
  {
    id: 6,
    username: 'julius',
    firstName: 'Julius',
    lastName: 'Doe',
    email: 'julius@mail.com',
    gender: 'Non-binary',
    country: 'Austria',
    city: 'Vienna',
    pictureUrl: '/avatars/julius.jpg',
    presentation:
      'Musician, sound designer and former geography student. I really enjoy to travel around, meet new people and share the knowledge. I have traveled a lot around Russia, and have some great stories about that and really what to tell them. My experience with couchsurfing is rather small, (because usually i prefer to sleep in a tent), but sometimes it could be great. I love hiking, cooking, writing music, hitchhiking, and reading.',
    dateString: '2023-11-16',
    passwordHash: '******',
  },
  {
    id: 7,
    username: 'lynn',
    firstName: 'Lynn',
    lastName: 'Doe',
    email: 'lynn@mail.com',
    gender: 'Female',
    country: 'Slovakia',
    city: 'Bratislava',
    pictureUrl: '/avatars/lynn.jpg',
    presentation:
      'I like to spend my time in nature, mostly lakes, rivers and forests, stroll around, swim, hike and cycle. I live in a shared house outside of town in a valley with about 7 people, currently moms and dads, a lot of travelers, artists and open-minded people. Currently im trying to learn about gardening and bikepacking. I read books, love to cook and bake, listen to good music and dance to it.',
    dateString: '2023-05-26',
    passwordHash: '******',
  },
];

export async function up(sql: Sql) {
  for (const user of users) {
    await sql`
      INSERT INTO
        users (
          username,
          first_name,
          last_name,
          email,
          gender,
          country,
          city,
          picture_url,
          presentation,
          date_registration,
          password_hash
        )
      VALUES
        (
          ${user.username},
          ${user.firstName},
          ${user.lastName},
          ${user.email},
          ${user.gender},
          ${user.country},
          ${user.city},
          ${user.pictureUrl},
          ${user.presentation},
          ${user.dateString},
          ${user.passwordHash}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const user of users) {
    await sql`
      DELETE FROM users
      WHERE
        id = ${user.id}
    `;
  }
}
