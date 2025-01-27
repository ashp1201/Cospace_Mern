import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import MapComponent from './MapComponent';

function MapPopup({ open, onClose, latitude, longitude }) {
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    if (latitude && longitude) {
      const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.display_name) {
            setLocationData(data.display_name);
          } else {
            console.error('Location not found');
          }
        })
        .catch((error) => {
          console.error('Error fetching location:', error);
        });
    }
  }, [latitude, longitude]);

  return (
    <Dialog open={open} onClose={onClose}>
      {locationData ? (
        <div>
          <p>Location: {locationData}</p>
          <MapComponent latitude={latitude} longitude={longitude} />
        </div>
      ) : (
        <p>Loading location data...</p>
      )}
    </Dialog>
  );
}

export default MapPopup;
