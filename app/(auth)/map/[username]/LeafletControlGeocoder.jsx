'use client';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import L from 'leaflet';

import icon from './constants';

export default function LeafletControlGeocoder() {
  const map = useMap();

  useEffect(() => {
    console.log('Montaggio del componente LeafletControlGeocoder');

    const geocoder = L.Control.geocoder({
      query: '',
      placeholder: 'Search here...',
      defaultMarkGeocode: false,
    });

    geocoder.addTo(map);

    geocoder.on('markgeocode', function (e) {
      const latlng = e.geocode.center;
      L.marker(latlng, { icon })
        .addTo(map)
        .bindPopup(e.geocode.name)
        .openPopup();
      map.fitBounds(e.geocode.bbox);
    });
  }, [map]);

  console.log('Render del componente LeafletControlGeocoder');

  return null;
}
