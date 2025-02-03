import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const authToken = localStorage.getItem("authToken");    
  return authToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
