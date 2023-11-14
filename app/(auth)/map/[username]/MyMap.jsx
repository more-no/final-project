'use client';
import './styles.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, divIcon, point } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
// import LeafletControlGeocoder from './LeafletControlGeocoder';

// type Position = {
//   lat: number;
//   lng: number;
// };

// type Props = {
//   positions: Position[];
//   id: number[];
//   mapCoords: LatLngExpression;
// };

// create custom icon
const customIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
  iconSize: [38, 38], // size of the icon
});

// custom cluster icon
const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: 'custom-marker-cluster',
    iconSize: point(33, 33, true),
  });
};

export default function MyMap(props) {
  return (
    <MapContainer center={props.mapCoords} zoom={7}>
      OPEN STREET MAPS TILES
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {/* Mapping through the markers */}
        {props.positions.map((position) => (
          <Marker
            key={`key-div-${props.id}`}
            position={position}
            icon={customIcon}
          >
            {/* <Popup>{marker.popUp}</Popup> */}
          </Marker>
        ))}
      </MarkerClusterGroup>
      {/* <LeafletControlGeocoder /> */}
    </MapContainer>
  );
}
