import React, { useEffect, useState } from 'react';
import Cards from '../admincomponent/Cards';
import { getlocation } from '../helper/helper';
import './Location.css';
import { useLocation } from 'react-router-dom';

function Location() {
  const location = useLocation();
  const amount = location.state ? location.state.amount : null;

  const [freeLocations, setFreeLocations] = useState([]);
  const [basicLocations, setBasicLocations] = useState([]);
  const [advanceLocations, setAdvanceLocations] = useState([]);

  useEffect(() => {
    // Fetch locations for free users by default
    getlocation({ user_type: 'free' })
      .then(data => {
        setFreeLocations(data);
      })
      .catch(error => {
        console.error('Error fetching free data:', error);
      });

    // Fetch locations for basic users if the amount is 399
    if (amount === 399  || amount === 999) {
      getlocation({ user_type: 'basic' })
        .then(data => {
          setBasicLocations(data);
        })
        .catch(error => {
          console.error('Error fetching basic data:', error);
        });
    }

    // Fetch locations for advance users if the amount is 999
    if (amount === 999) {
      getlocation({ user_type: 'advance' })
        .then(data => {
          setAdvanceLocations(data);
        })
        .catch(error => {
          console.error('Error fetching advance data:', error);
        });
    }
  }, [amount]);

  return (
    <div className='location'>
      {/* Display free user cards */}
      <div className="location_header">This is free tier Users</div>
      <div className="location_card">
        {freeLocations.map(location => (
          <Cards
            key={location.id}
            nameofplace={location.name_location}
            space={location.space_location}
            img={location.photo}
            contact={location.owner_contact}
            description={location.description}
            price={location.amount}
            latitude={location.latitude}
              longitude={location.longitude}
              userType='free'
          />
        ))}
      </div>

      {/* Display basic user cards if amount is 399 */}
      {(amount === 399 || amount === 999) && (
        <div>
          <div className="location_header">This is Basic tier Users</div>
          <div className="location_card">
            {basicLocations.map(location => (
              <Cards
                key={location.id}
                nameofplace={location.name_location}
                space={location.space_location}
                img={location.photo}
                contact={location.owner_contact}
                description={location.description}
                price={location.amount}
                latitude={location.latitude}
              longitude={location.longitude}
              userType='basic'
              />
            ))}
          </div>
        </div>
      )}

      {/* Display advance user cards if amount is 999 */}
      {amount=== 999 && (
        <div>
          <div className="location_header">This is Advance tier Users</div>
          <div className="location_card">
            {advanceLocations.map(location => (
              <Cards
                key={location.id}
                nameofplace={location.name_location}
                space={location.space_location}
                img={location.photo}
                contact={location.owner_contact}
                description={location.description}
                price={location.amount}
                latitude={location.latitude}
              longitude={location.longitude}
              userType='advance'
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Location;
