import { NextRequest, NextResponse } from 'next/server';
import { searchHosts } from '../../../../database/hosts';
import { SearchHost } from '../../../../migrations/00001-createTableHostsInformation';

export type SearchResponseBodyGet =
  | {
      host: SearchHost[];
    }
  | {
      errors: { message: string }[];
    };

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<SearchResponseBodyGet>> {
  // console.log('REQUEST :', request.nextUrl.searchParams);

  const city = request.nextUrl.searchParams.get('city');

  if (!city) {
    const errorResponse: SearchResponseBodyGet = {
      errors: [{ message: 'City not found' }],
    };
    return NextResponse.json(errorResponse, { status: 404 });
  }

  // console.log('City: ', city);

  const host = await searchHosts(city);

  // if (!host) {
  //   const errorResponse: SearchResponseBodyGet = {
  //     errors: [{ message: 'Hosts not found' }],
  //   };
  //   return NextResponse.json(errorResponse, { status: 404 });
  // }

  return NextResponse.json({ host: host });
}
