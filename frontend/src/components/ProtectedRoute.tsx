import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  allowedRoles?: ('admin' | 'professional')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, role } = useAuth();

  if (!user) {
    // Si no está logueado, al login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    // Si su rol no está autorizado para esta vista
    return <Navigate to={role === 'admin' ? '/admin' : '/dashboard'} replace />;
  }

  // Si todo está bien, renderiza la página solicitada
  return <Outlet />;
};

export default ProtectedRoute;