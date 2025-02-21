import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

type AuthGuardProps = {
  children: React.ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkAuth = () => {
    const token = localStorage.getItem("access_token");
    console.log("🔑 Checking token in localStorage:", token ? "Found" : "Not found");
    setIsAuthenticated(!!token);
  };

  useEffect(() => {
    console.log(" AuthGuard: Checking authentication status...");
    checkAuth();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "access_token") {
        console.log(" Storage event detected, rechecking auth...");
        checkAuth();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (isAuthenticated === null) {
    console.log("⌛ AuthGuard: Authentication check in progress...");
    return <div className="text-center text-lg font-semibold mt-10">🔄 Loading...</div>;
  }

  if (!isAuthenticated) {
    console.log(" AuthGuard: User not authenticated, redirecting to login...");
    return <Navigate to="/login" replace />;
  }

  console.log(" AuthGuard: User authenticated, granting access.");
  return <>{children}</>;
};

export default AuthGuard;