import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

function MapComponent({ latitude, longitude }) {
  const mapRef = useRef(null);

  useEffect(() => {
    // Create a map instance and specify the location and zoom level
    const map = L.map(mapRef.current).setView([latitude, longitude], 13);

    // Add a tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Add a marker at the specified coordinates
    L.marker([latitude, longitude]).addTo(map);
  }, [latitude, longitude]);

  return <div ref={mapRef} style={{ height: '400px', width: '100%' }}></div>;
}

export default MapComponent;
