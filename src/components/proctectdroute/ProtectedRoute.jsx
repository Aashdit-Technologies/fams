import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/Store';

export const ProtectedRoute = ({ children }) => {
  const { authenticated } = useAuthStore();
  const location = useLocation();

  if (!authenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};