import React from "react";

function Dashboard1() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const isAdmin = currentUser?.role === "admin";

  return (
    <div className="flex justify-center">
      {isAdmin ? (
        <div className="bg-amber-200 inline-block font-bold text-2xl mt-10 shadow ">
          Welcome Back {' '}{currentUser.name}
        </div>
      ) : (
        <div className="bg-amber-200 inline-block font-bold text-2xl mt-10 shadow ">
          Welcome Back {' '} {currentUser.name}
        </div>
      )}
    </div>
  );
}

export default Dashboard1;
