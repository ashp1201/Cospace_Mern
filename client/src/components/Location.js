import React, { useEffect, useState } from 'react';
import Cards from './CardsView';
import { getlocation } from '../helper/helper';
import './Location.css';
import { useLocation } from 'react-router-dom';

function Location() {
  const location = useLocation();
  const amount = location.state ? location.state.amount : null; // Get the amount from the location state

  const [locations, setLocations] = useState({
    free: [],
    basic: [],
    advance: [],
  });

  useEffect(() => {
    // Function to fetch location data based on user type
    const fetchLocations = async (userType) => {
      try {
        const data = await getlocation({ user_type: userType });
        setLocations((prevLocations) => ({
          ...prevLocations,
          [userType]: data,
        }));
      } catch (error) {
        console.error(`Error fetching ${userType} data:`, error);
      }
    };

    // Always fetch for free users
    fetchLocations('free');

    // Fetch for basic users if the amount is 399 or 999
    if (amount === 399 || amount === 999) {
      fetchLocations('basic');
    }

    // Fetch for advance users if the amount is 999
    if (amount === 999) {
      fetchLocations('advance');
    }
  }, [amount]); // Re-run if amount changes

  return (
    <div className="location">
      {/* Display free user cards */}
      <div className="location_header">This is free tier Users</div>
      <div className="location_card">
        {locations.free.map((location) => (
          <Cards
            key={location._id}
            nameofplace={location.name_location}
            space={location.space_location}
            img={location.photo}
            contact={location.owner_contact}
            description={location.description}
            price={location.amount}
            latitude={location.latitude}
            longitude={location.longitude}
            userType="free"
          />
        ))}
      </div>

      {/* Display basic user cards if amount is 399 or 999 */}
      {(amount === 399 || amount === 999) && (
        <>
          <div className="location_header">This is Basic tier Users</div>
          <div className="location_card">
            {locations.basic.map((location) => (
              <Cards
                key={location._id}
                nameofplace={location.name_location}
                space={location.space_location}
                img={location.photo}
                contact={location.owner_contact}
                description={location.description}
                price={location.amount}
                latitude={location.latitude}
                longitude={location.longitude}
                userType="basic"
              />
            ))}
          </div>
        </>
      )}

      {/* Display advance user cards if amount is 999 */}
      {amount === 999 && (
        <>
          <div className="location_header">This is Advance tier Users</div>
          <div className="location_card">
            {locations.advance.map((location) => (
              <Cards
                key={location._id}
                nameofplace={location.name_location}
                space={location.space_location}
                img={location.photo}
                contact={location.owner_contact}
                description={location.description}
                price={location.amount}
                latitude={location.latitude}
                longitude={location.longitude}
                userType="advance"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Location;
