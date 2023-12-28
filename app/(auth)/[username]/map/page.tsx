import React from 'react';
import {
  getHostById,
  getPositionByUsername,
  searchHostsInMap,
} from '../../../../database/hosts';
import { LatLngExpression } from 'leaflet';
import Autocomplete from './Autocomplete';
import { getUserByUsername } from '../../../../database/users';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getValidSessionByTokenWithId } from '../../../../database/sessions';
import { permanentRedirect } from 'next/navigation';
import dynamic from 'next/dynamic';

type Props = {
  params: { username: string };
};

export function generateMetadata() {
  return {
    title: 'Map',
  };
}

const openCageApiKey = process.env.OPENCAGE_API_KEY;

export default async function page({ params }: Props) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const DynamicMapComponent = dynamic(() => import('./MyMap'), {
    ssr: false, // Disable server-side rendering : NextJs generates the code for web-app pages before-hand on a server before it reaches the browser.
  });

  // BEGIN VALIDATION LOGIC
  // ----------------------

  const user = await getUserByUsername(params.username);

  if (!user) {
    const errorResponse = {
      errors: [{ message: 'Error finding the User' }],
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }

  // 1. get the token from the cookie
  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. check if the token has a valid session
  const session =
    sessionTokenCookie &&
    (await getValidSessionByTokenWithId(sessionTokenCookie.value, user.id));

  if (!session) {
    permanentRedirect(`/not-found`);
  }

  // END VALIDATION LOGIC
  // ----------------------

  const host = await getHostById(user.id);

  if (!host) {
    // Create an error response in the shape of HostResponseBodyGet
    const errorResponse = {
      errors: [{ message: 'Error finding the Host' }],
    };
    return NextResponse.json(errorResponse, { status: 404 });
  }

  // get data for MyMap component
  let mapCoords: LatLngExpression = [54.525963, 15.255119];

  const userPosition = await getPositionByUsername(params.username);

  if (userPosition[0]?.position) {
    const coords = JSON.parse(userPosition[0].position);

    const lat = coords.lat;
    const lng = coords.lng;

    mapCoords = [lat, lng];
  }

  const hosts = await searchHostsInMap();

  return (
    <>
      <h1 className="text-4xl py-6"> Select your location: </h1>
      <Autocomplete
        username={user.username}
        position={host.position}
        apiKey={openCageApiKey}
      />
      <DynamicMapComponent hosts={hosts} mapCoords={mapCoords} />
    </>
  );
}
