import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
    const { isAuthenticated } = useSelector((state) => state.userDetails);

  return (
    ( isAuthenticated ? <Outlet/> : <Navigate replace to="/login" /> )
  );

}

export default ProtectedRoute;