/* // src/components/PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { auth } = useAuth();

  return (
    <Route
      {...rest}
      element={auth ? <Component {...rest} /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
 */