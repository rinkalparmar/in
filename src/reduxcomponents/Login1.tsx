import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";

function Login1() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error: reduxError, isAuthenticated } = useSelector(
    (state: any) => state.auth,
  );

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<{ email?: string; password?: string }>({});

  const email = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const password = (password: string) => {
    const startWith = /^[A-Z]/.test(password);
    const number = /[0-9]/.test(password);
    const specialChar = /[!@#$%^&*(){}|]/.test(password);
    return startWith && number && specialChar;
  };

  const validation = () => {
    const newError: { email?: string; password?: string } = {};

    if (!data.email || !email(data.email)) {
      newError.email = "Enter valid email";
    }

    if (!data.password || !password(data.password)) {
      newError.password =
        "Enter passord with start with capital letter, number and special character";
    }

    setError(newError);

    return Object.keys(newError).length < 1;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!validation()) return;

    dispatch(login(data));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setError({ ...error, [name]: "" });
  };

  return (
    <div className="max-w-2xl m-auto bg-white shadow-lg rounded p-6 mt-10">
      <h1 className="font-bold text-xl text-center">login form</h1>

      <form onSubmit={handleSubmit}>
        <label className="block font-semibold text-sm mt-3">Email :</label>
        <input
          type="email"
          name="email"
          className="w-full rounded border p-2"
          value={data.email}
          onChange={handleInput}
        />
        <span className="error">{error?.email}</span>
        <label className="block font-semibold text-sm mt-3">Password :</label>
        <input
          type="password"
          name="password"
          className="w-full rounded border p-2 "
          value={data.password}
          onChange={handleInput}
        />
        <span className="error">{error?.password}</span>
        <div className="flex items-center justify-end ">
          <span className="p-1">Dont't have an account</span>
          <Link to="/signup" className="text-blue-500">
            {" "}
            signup
          </Link>
        </div>
        {reduxError && <p style={{ color: "red" }}>{reduxError}</p>}
        <div className="flex justify-center">
          <button className="bg-green-500 font-bold text-base py-2 px-8 rounded-lg">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login1;
