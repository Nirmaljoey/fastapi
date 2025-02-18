import { Navigate } from 'react-router-dom';

type AuthGuardProps = {
  children: React.ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
  // Check for access token in localStorage
  const token = localStorage.getItem('access_token');

  // If token exists, render children; otherwise, redirect
  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

export default AuthGuard;
