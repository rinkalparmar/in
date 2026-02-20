import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes() {
  const user = JSON.parse(localStorage.getItem("currentUser") || "null");

  return user ? <Outlet /> : <Navigate to="/" />;
}
