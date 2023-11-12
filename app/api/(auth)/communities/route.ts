import { NextResponse } from 'next/server';
import { Community } from '../../../../migrations/00002-createTableCommunities';
import { getCommunities } from '../../../../database/communities';

export type CommunityResponseBodyGet =
  | {
      communities: Community[];
    }
  | {
      errors: { message: string }[];
    };

export async function GET(): Promise<NextResponse<CommunityResponseBodyGet>> {
  const communities = await getCommunities();

  return NextResponse.json({
    communities: communities,
  });
}
