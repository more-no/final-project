import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Host } from '../../../../../migrations/00001-createTableHostsInformation';
import { getUserByUsername } from '../../../../../database/users';
import { updateHostById } from '../../../../../database/hosts';

export type HostResponseBodyPut =
  | {
      host: Host;
    }
  | {
      errors: { message: string }[];
    };

export type HostResponseBodyDelete =
  | {
      host: Host;
    }
  | {
      errors: { message: string }[];
    };

const hostSchema = z.object({
  available: z.boolean(),
  lastMinute: z.boolean(),
  openToMeet: z.boolean(),
  privateRoom: z.boolean(),
  bed: z.boolean(),
  haveAnimals: z.boolean(),
  hostAnimals: z.boolean(),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string> },
): Promise<NextResponse<HostResponseBodyPut>> {
  const username = params.username!;

  const hostToUpdate = await getUserByUsername(username);

  if (!hostToUpdate) {
    const errorResponse: HostResponseBodyPut = {
      errors: [{ message: 'User not found' }],
    };
    return NextResponse.json(errorResponse, { status: 404 });
  }

  // Get the user data from the request
  const body = await request.json();

  // ==========  Check Schemas for ZOD  ==================
  // =====================================================

  // zod verify the body matches my schema
  const result = hostSchema.safeParse(body);

  if (!result.success) {
    const errorResponse: HostResponseBodyPut = {
      errors: [{ message: 'Data is incomplete' }],
    };
    return NextResponse.json(errorResponse, { status: 400 });
  }

  // ==========  End Check Schemas for ZOD  ==============
  // =====================================================

  // query the database to update the user
  const host = await updateHostById(
    result.data.available,
    result.data.lastMinute,
    result.data.openToMeet,
    result.data.privateRoom,
    result.data.bed,
    result.data.haveAnimals,
    result.data.hostAnimals,
    hostToUpdate.id,
  );

  if (!host) {
    const errorResponse: HostResponseBodyPut = {
      errors: [{ message: 'Error updating the Host' }],
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }

  return NextResponse.json({
    host: host,
  });
}
