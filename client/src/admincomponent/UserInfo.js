import React, { useEffect, useState } from 'react'
import './UserInfo.css';
import img1 from '../asserts/totaluser.png'
import img2 from '../asserts/location.png'
import img3 from '../asserts/totalrevenue.png';
import { getAllUsers } from '../helper/helper.js';

// import { PieChart } from 'react-minimal-pie-chart';
import DonutChart from 'react-donut-chart';
function UserInfo() {
  const [users, setUsers] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    // Fetch all users when the component mounts
    getAllUsers()
      .then((data) => {
        setUsers(data);
        // Calculate the total revenue by summing up user.revenue values
        const revenueSum = data.reduce((acc, user) => acc + (user.card || 0), 0);
      setTotalRevenue(revenueSum);
      })
      .catch((error) => console.error('Error fetching users:', error));
  }, []);



  return (
    <div className='userInfo'>
      <div className="user-info-container">
        <div className="box">
          <img src={img1} alt="" />
          <h3>{users.length}</h3>
          <p>No of Users</p>
        </div>
        <div className="box">
          <img src={img2} alt="" />
          <h3>5</h3>
          <p>Total Locations</p>
          </div>
        <div className="box">
          <img src={img3} alt="" />
          <h3> <strong>₹{totalRevenue}</strong></h3>
          <p>Total Revenue</p>
          </div>
      </div>
    {users.length!==0 ?
      <div className='user-info-table'>
          <div className="mainrow">
            <strong className='child'>Srno</strong>
            <strong className='childemail'>Email</strong>
            <strong  className='child'>Type</strong>
            <strong className='childlocation'>location</strong>
            <strong className='child'>Revenue</strong>
          </div>
          {users.map((user, index) => (
          <div className="userrow">
            <p className='child'>{index + 1}</p>
            <p className='childemail'>{user.email}</p>
            <p className='child'>{user.user_type || 'free'}</p>
            <p className='childlocation'>{user.location || '-'}</p>
            <p className='child' id='revenue' >{user.card || '0'}</p>
          </div>
      ))}
      </div>
      :
      <h4 className='nouserfound'>No User Found</h4>
}
    </div>
  )
}

export default UserInfo