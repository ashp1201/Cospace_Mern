import React, { useState } from 'react'; 
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MapPopup from './MapPopup';
import './Cards.css';

function Cards(props) {
  const [isMapOpen, setMapOpen] = useState(false);
  const [locationData, setLocationData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedLocation, setUpdatedLocation] = useState({
    name_location: props.nameofplace,
    space_location: props.space,
    owner_contact: props.contact,
    description: props.description,
    amount: props.price,
    photo: props.img,
    latitude: props.latitude,
    longitude: props.longitude,
  });

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

  const handleDelete = async () => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this location?');
      if (!confirm) return;

      await axios.delete(`/api/deletelocation/${props.id}`);

      if (props.onDelete) {
        props.onDelete(props.id); // Pass the id to remove the location from the state
      }

      console.log('Location deleted successfully');
    } catch (error) {
      console.error('Error deleting location:', error);
      alert('Failed to delete location.');
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedLocation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`/api/updatelocation/${props.id}`, updatedLocation);
      console.log('Location updated:', response.data);
      setIsEditing(false); // Close the edit form on success
    } catch (error) {
      console.error('Error updating location:', error);
      alert('Failed to update location.');
    }
  };

  return (
    <Card sx={{ maxWidth: 300, margin: '5px 10px', position: 'relative' }}>
      <div className="card-buttons">
        <IconButton aria-label="edit" size="small" onClick={handleEditToggle}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" size="small" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </div>
      
      {/* Conditionally render the edit form or the card content */}
      {isEditing ? (
        <CardContent>
          <Typography variant="h6">Edit Location</Typography>
          <input
            type="text"
            name="name_location"
            value={updatedLocation.name_location}
            onChange={handleInputChange}
            placeholder="Location Name"
          />
          <input
            type="number"
            name="space_location"
            value={updatedLocation.space_location}
            onChange={handleInputChange}
            placeholder="Space (sqft)"
          />
          <input
            type="text"
            name="owner_contact"
            value={updatedLocation.owner_contact}
            onChange={handleInputChange}
            placeholder="Owner Contact"
          />
          <input
            type="text"
            name="description"
            value={updatedLocation.description}
            onChange={handleInputChange}
            placeholder="Description"
          />
          <input
            type="number"
            name="amount"
            value={updatedLocation.amount}
            onChange={handleInputChange}
            placeholder="Price"
          />
          <Button onClick={handleUpdate}>Update</Button>
        </CardContent>
      ) : (
        <>
          <CardMedia
            component="img"
            alt={props.nameofplace}
            height="140"
            src={props.img || 'https://via.placeholder.com/300'}
          />
          <CardContent>
            <Typography variant="h5">{`${props.nameofplace} - ${props.space} sqft`}</Typography>
            <Typography variant="body1">Contact: {props.contact}</Typography>
            <Typography variant="body2">{props.description}</Typography>
            <Typography variant="body2">Brokerage: {props.userType === 'free' ? '5%' : '3%'}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleOpenMap}>View Location</Button>
            <Button size="small">₹{props.price} rent for 1 day</Button>
          </CardActions>
        </>
      )}

      <MapPopup open={isMapOpen}
        onClose={handleCloseMap}
        locationData={locationData}
        latitude={props.latitude}
        longitude={props.longitude}/>    
    </Card>
  );
}

export default Cards;
