import React from "react";

function Dashboard() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const isAdmin = currentUser.role === "admin";

  console.log("isAdmin", isAdmin);

  return (
    <div className="text-2xl font-bold mt-10">
      {isAdmin ? (
        <h2 className="font-bold">Welcome Back, Admin {currentUser.name}</h2>
      ) : (
        <h2 className="font-bold">Welcome Back, User {currentUser.name}</h2>
      )}
    </div>
  );
}

export default Dashboard;
