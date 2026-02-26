import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { LuGrip } from "react-icons/lu";
import { IoHome } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { TbArrowRoundaboutRight } from "react-icons/tb";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { RiLogoutBoxLine } from "react-icons/ri";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigate();

  const getCurrentUser = JSON.parse(
    localStorage.getItem("currentUser") || "{}",
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    navigation("/");
  };

  const isAdmin = getCurrentUser.role === "admin";

  return (
    <div className="flex h-screen">
      <div
        className={`bg-black text-white p-4 pt-7 ${isOpen ? " w-56" : "w-16"}`}
      >
        <div className="flex justify-end">
          <button
            className="mb-4 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="text-2xl">
              <LuGrip />
            </span>
          </button>
        </div>
        <nav className="flex flex-col mt-4 gap-10 mt-10 text-center">
          {isAdmin ? (
            <>
              <Link to="/welcome" className="rounded hover:bg-gray-500">
                {isOpen ? "Welcome" : <IoHome />}
              </Link>
              <Link to="/users" className="rounded hover:bg-gray-500">
                {isOpen ? "Users" : <FaUsers />}
              </Link>
              <button
                className="mb-4 text-white rounded hover:bg-gray-500"
                onClick={handleLogout}
              >
                {isOpen ? "Logout" : <RiLogoutBoxLine />}
              </button>
            </>
          ) : (
            <>
              <Link to="/about" className="rounded hover:bg-gray-500">
                {isOpen ? "About" : <TbArrowRoundaboutRight />}
              </Link>
              <Link to="/home" className="rounded hover:bg-gray-500">
                {isOpen ? "Home" : <SiHomeassistantcommunitystore />}
              </Link>
              <Link to="/welcome" className="rounded hover:bg-gray-500">
                {isOpen ? "Welcome" : <IoHome />}
              </Link>
              <button
                className="mb-4 text-white rounded hover:bg-gray-500"
                onClick={handleLogout}
              >
                {isOpen ? "Logout" : <RiLogoutBoxLine />}
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

export default Sidebar;
