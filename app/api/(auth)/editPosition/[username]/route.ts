import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Host } from '../../../../../migrations/00001-createTableHostsInformation';
import { getUserByUsername } from '../../../../../database/users';
import { updateHostPositionById } from '../../../../../database/hosts';

export type PositionResponseBodyPut =
  | {
      host: Host;
    }
  | {
      errors: { message: string }[];
    };

const hostPositionSchema = z.object({
  // csrfToken: z.string(),
  position: z.object({
    label: z.string(),
    value: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  }),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string> },
): Promise<NextResponse<PositionResponseBodyPut>> {
  const username = params.username!;

  const hostToUpdate = await getUserByUsername(username);

  if (!hostToUpdate) {
    const errorResponse: PositionResponseBodyPut = {
      errors: [{ message: 'User not found' }],
    };
    return NextResponse.json(errorResponse, { status: 404 });
  }

  // Get the user data from the request
  const body = await request.json();
  console.log('Request Body Position: ', body);

  // ==========  Check Schemas for ZOD  ==================
  // =====================================================

  // zod verify the body matches my schema
  const result = hostPositionSchema.safeParse(body);

  console.log('Schema Position result: ', result);

  if (!result.success) {
    const errorResponse: PositionResponseBodyPut = {
      errors: [{ message: 'Data is incomplete' }],
    };
    return NextResponse.json(errorResponse, { status: 400 });
  }

  // ==========  End Check Schemas for ZOD  ==============
  // =====================================================

  const valueAsString = JSON.stringify(body.position.value);

  console.log('Position as string: ', valueAsString);

  const hostPosition = await updateHostPositionById(
    valueAsString,
    hostToUpdate.id,
  );

  console.log('Result query host:', hostPosition);

  if (!hostPosition) {
    const errorResponse: PositionResponseBodyPut = {
      errors: [{ message: 'Error updating the Host Position' }],
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }

  return NextResponse.json({
    host: hostPosition,
  });
}
