import { NextResponse } from 'next/server';
// import { deleteUserByUsername } from '../../../../database/users';
import { Role } from '../../../../migrations/00008-createTableRoles';
// import { User } from '../../../../migrations/00000-createTableUsers';

export type RoleResponseBodyGet =
  | {
      admin: Role;
    }
  | {
      errors: { message: string }[];
    };

export async function GET(): Promise<NextResponse<RoleResponseBodyGet>> {
  if (!admin) {
    const errorResponse: RoleResponseBodyGet = {
      errors: [{ message: 'Admin not found' }],
    };
    return NextResponse.json(errorResponse, { status: 404 });
  }

  return NextResponse.json({ admin: admin });
}
