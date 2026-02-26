import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes() {
  const getCurrentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null",
  );

  return getCurrentUser ? <Outlet /> : <Navigate to="/" />;
}
