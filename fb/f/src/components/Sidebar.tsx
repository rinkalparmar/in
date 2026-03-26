import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();

  const checkCurrentUser = JSON.parse(
    localStorage.getItem("currentUser") || "{}",
  );

  const isAdmin = checkCurrentUser.role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div className="flex h-screen">
      <div
        className={`bg-black p-6 text-white ${isOpen ? "w-64" : "w-16"} text-center`}
      >
        <span
          className="flex text-2xl flex-row-reverse "
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </span>
        <nav className="flex flex-col gap-10 font-bold text-xl py-8">
          {isAdmin ? (
            <>
              <Link
                to="/dashboard"
                className="hover:bg-gray-100 hover:text-black"
              >
                {!isOpen ? "D" : "Dashboard"}
              </Link>
              <Link to="/users" className="hover:bg-gray-100 hover:text-black">
                {!isOpen ? "U" : "Users"}
              </Link>
              <Link to="/cards" className="hover:bg-gray-100 hover:text-black">
                {!isOpen ? "C" : "Cards"}
              </Link>
              <button
                className="bg-red-600 rounded py-2 px-2 md:py-2 md:px-4 hover:bg-red-400"
                onClick={handleLogout}
              >
                {!isOpen ? "L" : "Logout"}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="hover:bg-gray-100 hover:text-black"
              >
                {!isOpen ? "D" : "Dashboard"}
              </Link>
              <button
                className="bg-red-600 rounded py-2 px-2 md:py-2 md:px-4 hover:bg-red-400"
                onClick={handleLogout}
              >
                {!isOpen ? "L" : "Logout"}
              </button>
            </>
          )}
        </nav>
      </div>
      <div className="mx-auto mt-8">
        <Outlet />
      </div>
    </div>
  );
}

export default Sidebar;
