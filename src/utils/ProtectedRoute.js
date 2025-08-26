// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element }) => {
  const { authenticated } = useAuth();
  const redirectPath = authenticated ? '/wallet' : '/signin';
  return authenticated ? (
    element
  ) : (
    <Navigate to={redirectPath} replace={true} state={{ from: window.location.pathname }} />
  );
};

export default ProtectedRoute;
