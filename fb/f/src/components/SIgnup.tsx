import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    role: "",
  });
  const [error, setError] = useState<{
    email?: string;
    password?: string;
    name?: string;
    role?: string;
  }>({});

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const validateEmail = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const validateName = (name: string) => {
    return /^[a-zA-Z]{3,}$/.test(name);
  };

  const validation = () => {
    const newError: {
      email?: string;
      password?: string;
      name?: string;
      role?: string;
    } = {};

    if (!data.email || !validateEmail(data.email)) {
      newError.email = "Enter valid email";
    }

    if (!data.password) {
      newError.password = "Enter password";
    }

    if (!data.name || !validateName(data.name)) {
      newError.name = "Enter name more than 3 characters";
    }

    if (!data.role) {
      newError.role = "Please select role";
    }

    setError(newError);

    return Object.keys(newError).length < 1;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validation()) return;

    try {
      const api = await fetch("http://localhost:5001/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const response = await api.json();
      console.log("response", response);

      if (!api.ok) {
        alert(response.message);
      } else {
        alert(response.message);
        navigate("/");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="max-w-2xl m-auto bg-white rounded shadow-xl p-6 mt-10">
      <h1 className="font-bold text-xl text-center">Signup</h1>

      <form onSubmit={handleSubmit}>
        <label className="block font-semibold mt-1">Name</label>
        <input
          type="text"
          name="name"
          className="border p-2 w-full rounded"
          value={data.name}
          onChange={handleInput}
        />
        <span className="text-red-500">{error?.name}</span>
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

        <label className="block font-semibold mt-1">Role</label>
        <select
          name="role"
          value={data.role}
          onChange={handleInput}
          className="border p-2 w-full rounded"
        >
          <option value="">Select role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <span className="text-red-500">{error?.role}</span>

        <div className="flex justify-end mt-1 gap-1">
          <span>Already have an account </span>
          <Link to="/" className="text-blue-400">
            Login
          </Link>
        </div>
        <div className="flex justify-center">
          <button className="px-2 py-2 bg-green-400 rounded font-bold">
            Signup
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
