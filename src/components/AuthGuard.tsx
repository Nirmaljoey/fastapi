import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

type AuthGuardProps = {
  children: React.ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken"); 
      console.log("Checking authentication...");
      console.log("Access Token:", token);
      setIsAuthenticated(!!token);
    };

    checkAuth(); // Initial check

    return () => {
      console.log("Cleaning up AuthGuard...");
    };
  }, []);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    console.log("Authentication check in progress...");
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    console.log("User not authenticated, redirecting to login...");
    return <Navigate to="/login" replace />;
  }

  console.log("User authenticated, granting access.");
  return <>{children}</>;
};

export default AuthGuard;
