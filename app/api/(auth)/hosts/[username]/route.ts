import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getHostById, updateHostById } from '../../../../../database/hosts';
import { Host } from '../../../../../migrations/00001-createTableHostsInformation';
// import { validateTokenAgainstSecret } from '../../../../../utils/csrf';

export type HostResponseBodyGet =
  | {
      host: Host;
    }
  | {
      errors: { message: string }[];
    };

export type HostResponseBodyPut =
  | {
      host: Host;
    }
  | {
      errors: { message: string }[];
    };

const hostSchema = z.object({
  available: z.boolean(),
  position: z.string().max(20),
  lastMinute: z.boolean(),
  openToMeet: z.boolean(),
  privateRoom: z.boolean(),
  bed: z.boolean(),
  haveAnimals: z.boolean(),
  hostAnimals: z.boolean(),
  pastGuests: z.number(),
  reviews: z.number(),
  csrfToken: z.string(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<HostResponseBodyGet>> {
  const hostId = Number(params.userId);

  const host = await getHostById(hostId);

  if (!host) {
    const errorResponse: HostResponseBodyGet = {
      errors: [{ message: 'Host not found' }],
    };
    return NextResponse.json(errorResponse, { status: 404 });
  }

  return NextResponse.json({ host: host });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<HostResponseBodyPut>> {
  const hostId = Number(params.userId);

  if (!hostId) {
    const errorResponse: HostResponseBodyPut = {
      errors: [{ message: 'Host not found' }],
    };
    return NextResponse.json(errorResponse, { status: 404 });
  }

  // Get the host data from the request
  const body = await request.json();

  // zod verify the body matches my schema
  const result = hostSchema.safeParse(body);

  console.log('Update Host Post request: ', result);

  if (!result.success) {
    const errorResponse: HostResponseBodyPut = {
      errors: [{ message: 'Data is incomplete' }],
    };
    return NextResponse.json(errorResponse, { status: 400 });
  }

  // query the database to update the host
  const host = await updateHostById(
    result.data.available,
    // result.data.position,
    result.data.lastMinute,
    result.data.openToMeet,
    result.data.privateRoom,
    result.data.bed,
    result.data.haveAnimals,
    result.data.hostAnimals,
    hostId,
  );

  if (!host) {
    // Create an error response in the shape of HostResponseBodyGet
    const errorResponse: HostResponseBodyGet = {
      errors: [{ message: 'Error updating the User' }],
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }

  return NextResponse.json({
    host: host,
  });
}
