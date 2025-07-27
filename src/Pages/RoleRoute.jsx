import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const RoleRoute = ({ isAuthenticated, role, allowedRoles }) => {
  if (!isAuthenticated) return <Navigate to="/loginPage" replace />;

  if (!allowedRoles.includes(role)) {
    return <h1>403 Forbidden - Unauthorized Access</h1>;
  }

  return <Outlet />;
};

export default RoleRoute;
