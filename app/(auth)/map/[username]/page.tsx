import React from 'react';
import MyMap from './MyMap';
import {
  getPositionByUsername,
  // getPositionByUsername,
  getPositions,
} from '../../../../database/hosts';
import { LatLngExpression } from 'leaflet';

type Props = {
  params: { username: string };
};

export function generateMetadata() {
  return {
    title: 'Map',
  };
}

export default async function page({ params }: Props) {
  // const userPositionArray = await getPositionByUsername(params.username);

  // const userPosition = JSON.parse(userPositionArray[0]?.position);

  let mapCoords: LatLngExpression = [54.525963, 15.255119];

  const userPosition = await getPositionByUsername(params.username);

  if (userPosition[0]?.position) {
    const coords = JSON.parse(userPosition[0].position);

    const lat = coords.lat;
    const lng = coords.lng;

    mapCoords = [lat, lng];
  }

  console.log('User position: ', mapCoords);

  const positionsArray = await getPositions();

  console.log('Positions Array', positionsArray);

  const positions = positionsArray.map((positionData) => {
    // Parse the JSON-encoded position string into an object
    const position = JSON.parse(positionData.position);

    // Extract lat and lng values
    return { lat: position.lat, lng: position.lng };
  });

  const usersId = positionsArray.map((positionData) => {
    return positionData.id;
  });

  console.log('Positions: ', positions);

  return (
    <div>
      <MyMap positions={positions} id={usersId} mapCoords={mapCoords} />
    </div>
  );
}
