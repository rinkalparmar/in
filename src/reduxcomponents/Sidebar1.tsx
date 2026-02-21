import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Sidebar1() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const isADMIN = currentUser?.role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div className="flex h-screen">
      <div
        className={`bg-black text-white p-4 pt-7.5 ${isOpen ? "w-64" : "w-20"}`}
      >
        <button className="mb-4 text-white" onClick={() => setIsOpen(!isOpen)}>
          <span className="text-2xl">☰</span>
        </button>
        <nav className="flex flex-col mt-4 gap-y-8">
          {isADMIN ? (
            <>
              <Link to="/dashboard" className="hover:bg-gray-700 p-2 rounded">
                {isOpen ? "Dashboard" : "🏠"}
              </Link>
              <Link to="/users" className="hover:bg-gray-700 p-2 rounded">
                {isOpen ? "Users" : "👥"}
              </Link>
              <button className="py-1 px-1 bg-red-500" onClick={handleLogout}>
                {isOpen ? "Logout" : "🚪"}
              </button>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="hover:bg-gray-700 p-2 rounded">
                {isOpen ? "Dashboard" : "🏠"}
              </Link>
              <button className="py-1 px-1 bg-red-500" onClick={handleLogout}>
                {isOpen ? "Logout" : "🚪"}
              </button>
            </>
          )}
        </nav>
      </div>
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}
