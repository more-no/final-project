import { Sql } from 'postgres';

const communities = [
  {
    community_name: 'Hitchhikers',
    comm_description:
      'Meet new friends while you are heading in the same direction. Whether you are a person asking for rides or a person giving them this is the circle for you.',
  },
  {
    community_name: 'Vegans & Vegetarians',
    comm_description:
      "For health, for the animals or for the earth. Join this tribe if you're vegan or vegetarian.",
  },
  {
    community_name: 'Cyclists',
    comm_description:
      'Legs of steel or maybe just some grand tour ambitions? Cyclists connect with this circle, before, during and after you hit the road.',
  },
  {
    community_name: 'Musicians',
    comm_description:
      'Love jamming with other musicians? This circle can be good way to find them.',
  },
  {
    community_name: 'Artists',
    comm_description:
      'Creators & Creatives: Want a host or guest who can connect with you creatively? This is the circle for you.',
  },
  {
    community_name: 'Cooking',
    comm_description:
      "From bon vivant to utter gluttony, as long as you make it yourself or together it's all good!",
  },
  {
    community_name: 'Dancers',
    comm_description:
      'Dancing for fun, dancing as a release, dancing as a connection with others... whatever gets your booty shaking is fine with us.',
  },
  {
    community_name: 'LGBTQ',
    comm_description:
      'A circle for lesbian, gay, bi, trans, queer people and their allies.',
  },
  {
    community_name: 'Climbers',
    comm_description:
      'Climbers & mountain lovers: come meet fellow climbers and share your favorite spots to climb.',
  },
  {
    community_name: 'Photographers',
    comm_description:
      'Worth more than a thousand words in a Circle description.',
  },
  {
    community_name: 'Gardeners & Farmers',
    comm_description:
      'Regardless of whether you have a small urban balcony garden or enough land to live completely off-grid, this is the place for you!',
  },
  {
    community_name: 'Hackers',
    comm_description:
      'Not afraid of :(){ :|:& };: - join fellow hackers this circle for übergeeks. As a bonus, come help us build this site!',
  },
  {
    community_name: 'Families',
    comm_description:
      "It's nice to host traveling families — and as a traveling family it's great to meet other families while traveling.",
  },
  {
    community_name: 'Sailors',
    comm_description:
      'For sailors and seafarers. Landlubbers beware! These waters are for sailors and seafarers...',
  },
  {
    community_name: 'Skateboarders',
    comm_description:
      'Whether you prefer a skateboard, a longboard or cruiser, join this rolling community to find your fellow wheel enthusiasts.',
  },
  {
    community_name: 'Activists',
    comm_description:
      'Power to the people! Make love not war! Join this circle to find your fellow activists and add your protests on the map.',
  },
  {
    community_name: 'Ravers',
    comm_description:
      'Love dancing your ass off to beats in underground and secret locations? Come join and find out where the party is at around the world.',
  },
];

export async function up(sql: Sql) {
  for (const community of communities) {
    await sql`
      INSERT INTO
        communities (
          community_name,
          comm_description
        )
      VALUES
        (
          ${community.community_name},
          ${community.comm_description}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const community of communities) {
    await sql`
      DELETE FROM communities
      WHERE
        community_name = ${community.community_name}
    `;
  }
}
