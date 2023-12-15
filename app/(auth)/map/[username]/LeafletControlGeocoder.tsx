'use client';
import { useEffect } from 'react';
import icon from './constants';
import { useMap } from 'react-leaflet';
import * as L from 'leaflet';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';

export default function LeafletControlGeocoder() {
  const map = useMap();

  useEffect(() => {
    const geocoder = L.Control.geocoder({
      query: '',
      placeholder: 'Search here...',
      defaultMarkGeocode: false,
    });

    geocoder.on(
      'markgeocode',
      function (e: {
        geocode: {
          center: any;
          name: ((layer: L.Layer) => L.Content) | L.Content | L.Popup;
          bbox: L.LatLngBoundsExpression;
        };
      }) {
        const latlng = e.geocode.center;
        L.marker(latlng, { icon })
          .addTo(map)
          .bindPopup(e.geocode.name)
          .openPopup();
        map.fitBounds(e.geocode.bbox);
      },
    );

    geocoder.addTo(map);

    return () => {
      geocoder.remove();
    };
  }, [map]);

  return null;
}
