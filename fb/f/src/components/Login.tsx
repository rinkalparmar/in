import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState<{ email?: string; password?: string }>({});


  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const validation = () => {
    const newError: { email?: string; password?: string } = {};

    if (!data.email || !validateEmail(data.email)) {
      newError.email = "Enter valid email";
    }

    if (!data.password) {
      newError.password = "Enter password";
    }

    setError(newError);

    return Object.keys(newError).length < 1;
  };

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validation()) return;
    try {
      const api = await fetch(`http://localhost:5001/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("api", api);

      const response = await api.json();
      console.log("response", response);

      if (!api.ok) {
        alert(response.message);
      } else {
        localStorage.setItem("token", response.token);
        localStorage.setItem("currentUser", JSON.stringify(response.existUser));
        navigate("/dashboard");
      }

      setData({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="max-w-2xl m-auto bg-white rounded shadow-xl p-6 mt-10">
        <h1 className="font-bold text-xl text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <label className="block font-semibold mt-1">Email</label>
          <input
            type="text"
            name="email"
            className="border p-2 w-full rounded"
            value={data.email}
            onChange={handleInput}
          />
          <span className="text-red-500">{error?.email}</span>
          <label className="block font-semibold  mt-1">Password</label>
          <input
            type="password"
            name="password"
            className="border p-2 w-full rounded"
            value={data.password}
            onChange={handleInput}
          />
          <span className="text-red-500">{error?.password}</span>

          <div className="flex justify-end mt-1 gap-1">
            <span>Create account </span>
            <Link to="/signup" className="text-blue-400">
              Signup
            </Link>
          </div>
          <div className="flex justify-center">
            <button className="px-2 py-2 bg-green-400 rounded font-bold">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
