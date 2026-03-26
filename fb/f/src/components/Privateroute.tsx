import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function Privateroute() {
  const getCurrentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null",
  );

  return getCurrentUser ? <Outlet /> : <Navigate to="/" />;
}

export default Privateroute;
