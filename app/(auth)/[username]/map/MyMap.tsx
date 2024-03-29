'use client';
import { HostsMap } from '../../../../migrations/00001-createTableHostsInformation';
import './styles.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, LatLngExpression, divIcon, point } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import LeafletControlGeocoder from './LeafletControlGeocoder';

type Props = {
  hosts: HostsMap[];
  mapCoords: LatLngExpression;
};

// create custom icon
const customIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
  iconSize: [38, 38],
});

// custom cluster icon
const createClusterCustomIcon = function (cluster: {
  getChildCount: () => any;
}) {
  return divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: 'custom-marker-cluster',
    iconSize: point(33, 33, true),
  });
};

export default function MyMap(props: Props) {
  return (
    <MapContainer center={props.mapCoords} zoom={11}>
      OPEN STREET MAPS TILES
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, CC BY-SA license'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {/* Mapping through hosts data for markers and popups */}
        {props.hosts.map((host) => {
          const renderIcon = (value: boolean) => {
            return value ? (
              <img src="/true.png" alt="Yes" />
            ) : (
              <img src="/false.png" alt="No" />
            );
          };

          // Parse the JSON-encoded position string into an object
          const positionParsed = JSON.parse(host.position);
          const position = { lat: positionParsed.lat, lng: positionParsed.lng };

          return (
            <Marker
              key={`key-div-${host.id}`}
              position={position}
              icon={customIcon}
            >
              <Popup>
                <a
                  href={`/${host.username}/profile`}
                  className="flex flex-col items-center text-center"
                >
                  <div className="text-xl font-bold">{host.username}</div>
                  <figure>
                    <img
                      src={host.pictureUrl}
                      alt="Thumbnail"
                      className="w-full max-w-150 h-auto"
                    />
                  </figure>
                  <div className="pt-4">
                    <div className="flex flex-row flex-nowrap text-lg">
                      Available:
                      <div className="pl-2 w-8 h-8 inline-block">
                        {renderIcon(host.available)}
                      </div>
                    </div>
                    <div className="flex flex-row flex-nowrap text-lg">
                      Last minute:
                      <div className="pl-2 w-8 h-8 inline-block">
                        {renderIcon(host.lastMinute)}
                      </div>
                    </div>
                    <div className="flex flex-row flex-nowrap text-lg">
                      Open to meet:
                      <div className="pl-2 w-8 h-8 inline-block">
                        {renderIcon(host.openToMeet)}
                      </div>
                    </div>
                  </div>
                </a>
              </Popup>
            </Marker>
          );
        })}
      </MarkerClusterGroup>
      <LeafletControlGeocoder />
    </MapContainer>
  );
}
