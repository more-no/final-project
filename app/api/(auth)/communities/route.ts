import { NextResponse } from 'next/server';
import { Community } from '../../../../migrations/00002-createTableCommunities';
import { getCommunities } from '../../../../database/communities';

type CommunityResponse =
  | {
      communities: Community[];
    }
  | {
      errors: { message: string }[];
    };

export async function GET(): Promise<NextResponse<CommunityResponse>> {
  const communities = await getCommunities();

  return NextResponse.json({
    communities: communities,
  });
}
