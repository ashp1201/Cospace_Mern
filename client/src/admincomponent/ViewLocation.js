import React, { useState, useEffect } from 'react';
import img1 from '../asserts/off10.png'
import './ViewLocation.css';
import Cards from './Cards';
import { getlocation } from '../helper/helper';

function ViewLocation() {
  // Create state variables for different user types
  const [freeLocations, setFreeLocations] = useState([]);
  const [basicLocations, setBasicLocations] = useState([]);
  const [advanceLocations, setAdvanceLocations] = useState([]);

  useEffect(() => {
    // Fetch locations for each user type and update the respective state variable
    getlocation({ user_type: 'free' })
      .then(data => {
        setFreeLocations(data);
      })
      .catch(error => {
        console.error('Error fetching free data:', error);
      });

    getlocation({ user_type: 'basic' })
      .then(data => {
        setBasicLocations(data);
      })
      .catch(error => {
        console.error('Error fetching basic data:', error);
      });

    getlocation({ user_type: 'advance' })
      .then(data => {
        setAdvanceLocations(data);
      })
      .catch(error => {
        console.error('Error fetching advance data:', error);
      });
  }, []);

  return (
    <div className='viewlocation'>
      <div>
        <h2 className='viewlocation_header'>For Free Users</h2>
        <div className='cards_free'>
          {freeLocations.map(location => (
            <Cards
              key={location.id}
              nameofplace={location.name_location}
              space={location.space_location}
              img={location.photo}
              contact={location.owner_contact}
              description={location.description}
              price={location.amount}
              userType='free'
              latitude={location.latitude}
              longitude={location.longitude}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className='viewlocation_header'>For Basic Users</h2>
        <div className='cards_basic'>
          {basicLocations.map(location => (
            <Cards
              key={location.id}
              nameofplace={location.name_location}
              space={location.space_location}
              img={location.photo}
              contact={location.owner_contact}
              description={location.description}
              price={location.amount}
              userType='basic'
              latitude={location.latitude}
              longitude={location.longitude}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className='viewlocation_header'>For Advance Users</h2>
        <div className='cards_advance'>
          {advanceLocations.map(location => (
            <Cards
              key={location.id}
              nameofplace={location.name_location}
              space={location.space_location}
              img={location.photo}
              contact={location.owner_contact}
              description={location.description}
              price={location.amount}
              userType='advance'
              latitude={location.latitude}
              longitude={location.longitude}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewLocation;
