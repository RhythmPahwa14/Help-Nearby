// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContextNew';

const ProtectedRoute = ({ children }) => {
  const { user: currentUser } = useAuth();

  // If there is no logged-in user, redirect to the /login page
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If the user is logged in, show the page they were trying to access
  return children;
};

export default ProtectedRoute;