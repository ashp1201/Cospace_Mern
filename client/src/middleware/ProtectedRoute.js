import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const isAuthenticated = () => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'tokenAdmin') {
      try {
        const decodedToken = jwtDecode(value);
        const currentTime = Date.now() / 1000; // Current time in seconds
        // Check if token has expired
        if (decodedToken.exp > currentTime) {
          return true;
        } else {
          return false; // Token has expired
        }
      } catch (error) {
        console.error("Invalid token:", error);
        return false; // Invalid token format
      }
    }
  }
  return false;
};

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/admin" />;
};

export default ProtectedRoute;
