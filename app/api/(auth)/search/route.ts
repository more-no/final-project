import { NextRequest, NextResponse } from 'next/server';
import { searchHosts } from '../../../../database/hosts';
import { SearchHost } from '../../../../migrations/00001-createTableHostsInformation';

type SearchResponse =
  | {
      host: SearchHost[];
    }
  | {
      errors: { message: string }[];
    };

export async function GET(
  request: NextRequest,
): Promise<NextResponse<SearchResponse>> {
  const city = request.nextUrl.searchParams.get('city');

  if (!city) {
    const errorResponse = {
      errors: [{ message: 'City not found' }],
    };
    return NextResponse.json(errorResponse, { status: 404 });
  }

  const host = await searchHosts(city);

  return NextResponse.json({ host: host });
}
