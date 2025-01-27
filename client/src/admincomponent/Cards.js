import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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

  // Determine the brokerage percentage based on the user type
  const brokeragePercentage = {
    free: '5%',
    basic: '3%',
    advance: '2%',
  }[props.userType] || '3%';

  return (
    <Card sx={{ maxWidth: 300, margin: '5px 10px' }}>
      <CardMedia
        component="img"
        alt={props.nameofplace}
        height="140"
        src={props.img ? props.img : 'https://via.placeholder.com/300'} // Fallback to placeholder if no image
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.nameofplace} - {props.space} sqft
        </Typography>
        <Typography gutterBottom variant="body1" component="strong">
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
        <Button size="small" onClick={handleOpenMap}>
          View location
        </Button>
        <Button size="small" sx={{ color: 'black' }}>
          ₹{props.price} rent for 1 day
        </Button>
      </CardActions>
      <MapPopup
        open={isMapOpen}
        onClose={handleCloseMap}
        locationData={locationData}
        latitude={props.latitude}
        longitude={props.longitude}
      />
    </Card>
  );
}

export default Cards;
