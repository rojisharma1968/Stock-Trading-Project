
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/authContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  if (!isAuthenticated) {
    // Redirect to the login page, but save the current location they were trying to access
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  return <>{children}</>;
}
