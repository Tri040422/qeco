import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user, ready } = useAuth();
  if (!ready) return null; // chờ xác thực
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
