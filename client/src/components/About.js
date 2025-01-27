import React from 'react';
import avatar from '../asserts/avatar.jpg';
import './About.css';

function About() {
  return (
    <>
      <div className="about-section">
        <h1>Co-Space</h1>
        <p>This is cospace bringing new technology for co-living.</p>
      </div>

      <h2 style={{ textAlign: 'center' }}>Our Team</h2>
      <div className="row">
        <div className="column">
          <div className="card">
            <img src={avatar} alt="Jane" style={{ width: '100%' }} />
            <div className="container">
              <h2>Mr Atharva Parab</h2>
              <p className="title">CEO & Founder</p>
              <p>atharva123@gmail.com</p>
              <p><button className="button">Contact</button></p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <img src={avatar} alt="Mike" style={{ width: '100%' }} />
            <div className="container">
              <h2>Mr Prathamesh Padenekar</h2>
              <p className="title">Art Director</p>
              <p>prat123@example.com</p>
              <p><button className="button">Contact</button></p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <img src={avatar} alt="Mike" style={{ width: '100%' }} />
            <div className="container">
              <h2>Advait Pungle</h2>
              <p className="title">Manager</p>
              <p>advait1223@example.com</p>
              <p><button className="button">Contact</button></p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <img src={avatar} alt="John" style={{ width: '100%' }} />
            <div className="container">
              <h2>Ashok Purohit</h2>
              <p className="title">Designer</p>
              <p>ash123@gmail.com</p>
              <p><button className="button">Contact</button></p>
            </div>
          </div>
        </div>
      </div>

      <div className="mission">
        <strong>Our Mission</strong>
        <p>Our mission is to transform the way businesses work by providing flexible, inspiring, and fully-equipped office spaces for rent. We are dedicated to fostering a dynamic environment where entrepreneurs, startups, and established companies can thrive, connect, and create together. Through our platform, we aspire to enhance productivity, encourage innovation, and contribute to the success of our diverse community of professionals. Join us in reimagining workspaces and unlocking the potential of every business.</p>
      </div>

      <div className="vision">
        <strong>Vision</strong>
        <p>Our vision is to be the leading global platform that redefines how people work, collaborate, and innovate.</p>
      </div>
    </>
  );
}

export default About;
