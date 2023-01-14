/* eslint-disable react/prop-types */
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { ADMIN_USER_ROLE } from '../utils/constants';
import { useCurrentUser } from '../utils/hooks';
import Nav from './Nav';

function ProtectedRoutes({ allowedRole }) {
  const user = useCurrentUser();
  const location = useLocation();

  if (!user) return (window.location.href = '/');

  const isAdmin = user.data.role === ADMIN_USER_ROLE;

  return user && user.data.role === allowedRole ? (
    <>
      {!isAdmin ? <Nav /> : null}
      <Outlet />
    </>
  ) : user && user.data.role !== allowedRole ? (
    <Navigate to={'/unauthorized'} state={{ from: location }} replace />
  ) : (
    <Navigate to={'/'} state={{ from: location }} replace />
  );
}

export default ProtectedRoutes;
