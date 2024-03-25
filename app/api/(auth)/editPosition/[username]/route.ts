import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getUserByUsername } from '../../../../../database/users';
import { updateHostPositionById } from '../../../../../database/hosts';
import { HostResponse } from '../../hosts/[username]/route';

const hostPositionSchema = z.object({
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
): Promise<NextResponse<HostResponse>> {
  const hostToUpdate = await getUserByUsername(params.username!);

  if (!hostToUpdate) {
    const errorResponse = {
      errors: [{ message: 'User not found' }],
    };
    return NextResponse.json(errorResponse, { status: 404 });
  }

  // Get the user data from the request
  const body = await request.json();

  // ==========  Check Schemas for ZOD  ==================
  // =====================================================

  // zod verify the body matches my schema
  const result = hostPositionSchema.safeParse(body);

  if (!result.success) {
    const errorResponse = {
      errors: [{ message: 'Data is incomplete' }],
    };
    return NextResponse.json(errorResponse, { status: 400 });
  }

  // ==========  End Check Schemas for ZOD  ==============
  // =====================================================

  const valueAsString = JSON.stringify(result.data.position.value);

  const hostPosition = await updateHostPositionById(
    valueAsString,
    hostToUpdate.id,
  );

  if (!hostPosition) {
    const errorResponse = {
      errors: [{ message: 'Error updating the Host Position' }],
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }

  return NextResponse.json({
    host: hostPosition,
  });
}
