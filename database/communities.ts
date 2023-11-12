import { cache } from 'react';
import { sql } from './connect';
import { Community } from '../migrations/00002-createTableCommunities';

export const getCommunities = cache(async () => {
  const communities = await sql<Community[]>`
    SELECT
      *
    FROM
      communities
  `;
  return communities;
});

export const getCommunityByName = cache(async (communityName: string) => {
  const community = await sql<Community[]>`
    SELECT
      *
    FROM
      communities
    WHERE
      community_name = ${communityName}
  `;
  return community;
});

export const deleteCommunity = cache(async (communityName: string) => {
  const community = await sql<Community[]>`
    DELETE FROM communities
    WHERE
      community_name = ${communityName} RETURNING *
  `;
  return community;
});
