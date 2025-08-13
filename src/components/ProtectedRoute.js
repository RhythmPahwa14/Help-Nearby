// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  // If there is no logged-in user, redirect to the /login page
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If the user is logged in, show the page they were trying to access
  return children;
};

export default ProtectedRoute;