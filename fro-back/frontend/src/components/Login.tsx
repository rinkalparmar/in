import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setData((pre) => ({ ...pre, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
      } else {
        localStorage.setItem("token", result.token);
        localStorage.setItem("currentUser", JSON.stringify(result.findUser));
        alert(result.message);
        navigate("/welcome");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-2xl m-auto p-6 rounded bg-white shadow-2xl mt-8">
      <h1 className="font-bold text-2xl text-center">Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="" className="block text-lg font-semibold">
          Email :
        </label>
        <input
          type="email"
          name="email"
          value={data.email}
          className="p-2 border w-full rounded-xl mb-2"
          onChange={handleInput}
        />
        <label htmlFor="" className="block text-lg font-semibold">
          Password :
        </label>
        <input
          type="password"
          name="password"
          value={data.password}
          className="p-2 border w-full rounded-xl mb-2"
          onChange={handleInput}
        />
        <div className="flex items-center justify-end">
          <span className="p-1"> Create an account</span>
          <Link to="/signup" className="text-blue-500">
            Signup
          </Link>{" "}
        </div>

        <div className="flex justify-center mt-2">
          <button className="py-2 px-4 bg-green-600 rounded">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
