import React from 'react';

import { Navigate , Outlet } from 'react-router-dom';

import { isAuthenticated } from '../utils/Helper' ;

const ProtectedRoute = () => {
    if (!isAuthenticated()) {
      return <Navigate to="/login" />;
    }
    return <Outlet />;
}

export default ProtectedRoute ;