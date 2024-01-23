import React, { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const isAuthenticated = localStorage.getItem("jwt");
  console.log(isAuthenticated, "jefijiefj");
  if (!JSON.parse(isAuthenticated)) {
    return <Navigate to="/auth/login" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
