import React, { useState } from 'react';



import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MapComponent from './MapComponent';
import MapPopup from './MapPopup';
import './Cards.css';

function Cards(props) {


  const [isMapOpen, setMapOpen] = useState(false);
  const [locationData, setLocationData] = useState(null);

  // Function to open the map pop-up
  const handleOpenMap = () => {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${props.latitude}&lon=${props.longitude}`;
    
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('Full Nominatim API Response:', data); // Log the full response
        if (data.display_name) {
          setLocationData(data.display_name); // Store location data
        } else {
          console.error('Location not found');
        }
        setMapOpen(true); // Open the map pop-up
      })
      .catch((error) => {
        console.error('Error fetching location:', error);
      });
  };

  // Function to close the map pop-up
  const handleCloseMap = () => {
    setMapOpen(false);
  };
//   // Function to get location from latitude and longitude
// function getLocationFromLatLong(latitude, longitude) {
  
// //   console.log(latitude," + ",longitude)
// //   // Your API key from Google Cloud Console (enable Geocoding API)
// //   // Create a request URL for Nominatim
// //   const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

// //   // Send a GET request to the Nominatim API
// //   fetch(apiUrl)
// //     .then((response) => response.json())
// //     .then((data) => {
// //       console.log('Full Nominatim API Response:', data); // Log the full response
// //       if (data.display_name) {
// //         const location = data.display_name;
// //         console.log('Location:', location);
// //       } else {
// //         console.error('Location not found');
// //       }
// //     })
// //     .catch((error) => {
// //       console.error('Error fetching location:', error);
// //     });
// // }
// }
  let brokeragePercentage;

  // Determine the brokerage percentage based on the user type
  if (props.userType === 'free') {
    brokeragePercentage = '5%';
  } else if (props.userType === 'basic') {
    brokeragePercentage = '3%';
  } else if (props.userType === 'advance') {
    brokeragePercentage = '2%';
  } else {
    brokeragePercentage = '3%'; // Default to 3% if userType is not specified
  }
  return (
    <Card sx={{ maxWidth: 300,margin:'5px 10px'}}>
      <CardMedia
        component="img"
        alt={props.nameofplace}
        height="140"
        src={`https://cospace-mern-app.onrender.com/uploads/files/${props.img}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.nameofplace}- {props.space} sqft
        </Typography>
        <Typography gutterBottom variant="p" component="strong">
          Contact Owner: {props.contact}
        </Typography>
        <Typography variant="body2" color="text.primary">
            {props.description}
        </Typography>
        <Typography variant="body2" color="text.primary">
          Brokerage: {brokeragePercentage}
        </Typography>

      </CardContent>
      <CardActions>
      <Button size="small" onClick={handleOpenMap} >
      {/* //// onClick={() =>

        //  getLocationFromLatLong(props.latitude, props.longitude)}> */}
  View location
</Button>
        
        
        <Button size="small" sx={{color:'black'}}>₹{props.price} rent for 1 day</Button>
      </CardActions>
      {/* <MapComponent latitude={props.latitude} longitude={props.longitude} /> */}
      <MapPopup
       open={isMapOpen}
       onClose={handleCloseMap}
       locationData={locationData}
       latitude={props.latitude}
       longitude={props.longitude}
      />
    </Card>
    
  )
}

export default Cards
