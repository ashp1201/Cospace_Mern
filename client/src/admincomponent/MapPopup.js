import React from 'react';
import Dialog from '@mui/material/Dialog';
import MapComponent from './MapComponent';

function MapPopup({ open, onClose, locationData, latitude, longitude })  {

    // Your API key from Google Cloud Console (enable Geocoding API)
//   // Create a request URL for Nominatim
   const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

  // Send a GET request to the Nominatim API
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log('Full Nominatim API Response:', data); // Log the full response
      if (data.display_name) {
        const location = data.display_name;
        console.log('Location:', location);
      } else {
         console.error('Location not found');
      }
   })
   .catch((error) => {
     console.error('Error fetching location:', error);
    });

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
