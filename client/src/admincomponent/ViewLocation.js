import React, { useState, useEffect } from 'react';
import './ViewLocation.css';
import Cards from './Cards';
import { getlocation } from '../helper/helper';

function ViewLocation() {
  // State to hold locations based on user types
  const [locations, setLocations] = useState({
    free: [],
    basic: [],
    advance: [],
  });

  // Fetch locations for all user types
  useEffect(() => {
    const userTypes = ['free', 'basic', 'advance'];

    const fetchLocations = async () => {
      try {
        for (const type of userTypes) {
          const data = await getlocation({ user_type: type });
          setLocations((prev) => ({
            ...prev,
            [type]: data,
          }));
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  // Function to update the location in the parent state
  const handleUpdateLocation = (updatedLocation) => {
    setLocations((prevLocations) => {
      const updatedLocations = { ...prevLocations };
      // Update the correct user type's locations
      const userType = updatedLocation.userType; // Assuming userType is passed in the updated location data
      updatedLocations[userType] = updatedLocations[userType].map((location) =>
        location._id === updatedLocation._id ? updatedLocation : location
      );
      return updatedLocations;
    });
  };

  // Component to render locations dynamically
  const RenderLocations = ({ userType, locations }) => (
    <div>
      <h2 className="viewlocation_header">
        For {userType.charAt(0).toUpperCase() + userType.slice(1)} Users
      </h2>
      <div className={`cards_${userType}`}>
        {locations.length > 0 ? (
          locations.map((location) => (
            <Cards
              key={location._id} // Ensure the unique key is correct
              id={location._id}
              nameofplace={location.name_location}
              space={location.space_location}
              img={location.photo}
              contact={location.owner_contact}
              description={location.description}
              price={location.amount}
              userType={userType}
              latitude={location.latitude}
              longitude={location.longitude}
              onDelete={(id) => {
                // Remove the location with the specific _id from the locations list
                setLocations((prevLocations) => ({
                  ...prevLocations,
                  [userType]: prevLocations[userType].filter((loc) => loc._id !== id),
                }));
              }}
              onUpdate={handleUpdateLocation} // Pass onUpdate function to update location
            />
          ))
        ) : (
          <p>No locations available for {userType} users.</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="viewlocation">
      {['free', 'basic', 'advance'].map((userType) => (
        <RenderLocations
          key={userType}
          userType={userType}
          locations={locations[userType]}
        />
      ))}
    </div>
  );
}

export default ViewLocation;
