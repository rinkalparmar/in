import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup1() {
  const [data, setData] = useState({
    name: "",
    email: "",
    address: "",
    mobile: "",
    gender: "",
    city: "",
    hobbies: [] as string[],
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState<{
    name?: string;
    email?: string;
    password?: string;
    mobile?: string;
    address?: string;
    gender?: string;
    hobbies?: string;
    role?: string;
    city?: string;
  }>({});

  const name = (name: string) => {
    return /^[a-zA-Z]{3,}$/.test(name);
  };

  const email = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA_Z]{2,}$/.test(email);
  };

  const password = (password: string) => {
    const startWith = /^[A-Z]/.test(password);
    const number = /[0-9]/.test(password);
    const specialChar = /[!@#$%^&*(){}|]/.test(password);
    return startWith && number && specialChar;
  };

  const mobile = (mobile: string) => {
    return /^[0-9]{10}$/.test(mobile);
  };

  const validation = () => {
    const newError: {
      name?: string;
      email?: string;
      password?: string;
      address?: string;
      gender?: string;
      hobbies?: string;
      role?: string;
      city?: string;
      mobile?: string;
    } = {};

    if (!data.name || !name(data.name)) {
      newError.name = "Enter valid name with minimum 3 character";
    }

    if (!data.email || !email(data.email)) {
      newError.email = "Enter valid email";
    }

    if (!data.mobile || !mobile(data.mobile)) {
      newError.mobile = "Enter 10 digit mobile number";
    }

    if (!data.password || !password(data.password)) {
      newError.password =
        "Enter passord with start with capital letter, number and special character";
    }

    if (!data.address) {
      newError.address = "Enter valid address";
    }

    if (!data.city) {
      newError.city = "Select city";
    }

    if (!data.role) {
      newError.role = "Select role";
    }

    if (!data.gender) {
      newError.gender = "Select gender";
    }

    if (!data.hobbies || data.hobbies.length === 0) {
      newError.hobbies = "Select hobbbies";
    }

    setError(newError);

    return Object.keys(newError).length < 1;
  };

  const handleInput = (e: any) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setData({
        ...data,
        hobbies: checked
          ? [...data.hobbies, value]
          : data.hobbies.filter((hobby) => hobby !== value),
      });
    } else {
      setData({ ...data, [name]: value });
    }
    setError({ ...error, [name]: "" });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!validation()) return;

    const existUsers = JSON.parse(localStorage.getItem("users") || "[]");

    const userLenght = existUsers?.length ? existUsers?.length + 1 : 1;

    const newUser = {
      id: userLenght,
      ...data,
    };

    existUsers.push(newUser);

    localStorage.setItem("users", JSON.stringify(existUsers));
    navigate("/");

    setData({
      name: "",
      email: "",
      address: "",
      mobile: "",
      gender: "",
      city: "",
      hobbies: [],
      password: "",
      role: "",
    });
  };

  return (
    <div className="max-w-2xl m-auto bg-white shadow-lg rounded p-6 mt-10">
      <h1 className="font-bold text-xl text-center">signup form</h1>

      <form onSubmit={handleSubmit}>
        <label className="block font-semibold text-sm mt-2">Name :</label>
        <input
          type="text"
          name="name"
          className="w-full rounded border p-2"
          value={data.name}
          onChange={handleInput}
        />
        <span className="error">{error.name}</span>
        <label className="block font-semibold text-sm mt-2">Email :</label>
        <input
          type="email"
          name="email"
          className="w-full rounded border p-2"
          value={data.email}
          onChange={handleInput}
        />
        <span className="error">{error.email}</span>
        <label className="block font-semibold text-sm mt-2">Address :</label>
        <textarea
          cols={5}
          rows={4}
          className="w-full rounded border p-2"
          value={data.address}
          name="address"
          onChange={handleInput}
        />
        <span className="error">{error.address}</span>
        <label className="block font-semibold text-sm mt-2">Mobile :</label>
        <input
          type="number"
          name="mobile"
          className="w-full rounded border p-2"
          value={data.mobile}
          onChange={handleInput}
        />
        <span className="error">{error.mobile}</span>
        <label className="block font-semibold text-sm mt-2">Gender :</label>
        <div className="flex gap-3">
          <input
            type="radio"
            name="gender"
            value="male"
            checked={data.gender === "male"}
            onChange={handleInput}
          />
          male
          <input
            type="radio"
            name="gender"
            value="female"
            checked={data.gender === "female"}
            onChange={handleInput}
          />
          female
        </div>
        <span className="error">{error.gender}</span>
        <label className="block font-semibold text-sm mb-2">City :</label>
        <select
          name="city"
          className="w-full rounded border p-2"
          value={data.city}
          onChange={handleInput}
        >
          <option value="">--select city--</option>
          <option value="surat">Suart</option>
          <option value="mumbai">Mumbai</option>
          <option value="rajkot">Rajkot</option>
          <option value="goa">Goa</option>
        </select>
        <span className="error">{error.city}</span>
        <label className="block font-semibold text-sm mb-2">Hobbies :</label>
        <div className="flex gap-3">
          <input
            type="checkbox"
            name="hobbies"
            value="dance"
            checked={data.hobbies.includes("dance")}
            onChange={handleInput}
          />
          Dance
          <input
            type="checkbox"
            name="hobbies"
            value="music"
            onChange={handleInput}
            checked={data.hobbies.includes("music")}
          />
          MUsic
          <input
            type="checkbox"
            name="hobbies"
            value="cooking"
            checked={data.hobbies.includes("cooking")}
            onChange={handleInput}
          />
          Cooking
          <input
            type="checkbox"
            name="hobbies"
            value="reading"
            checked={data.hobbies.includes("reading")}
            onChange={handleInput}
          />
          Reading
        </div>
        <span className="error">{error.hobbies}</span>
        <label className="block font-semibold text-sm mb-2">Role :</label>
        <select
          name="role"
          className="w-full rounded border p-2"
          value={data.role}
          onChange={handleInput}
        >
          <option>--select Role--</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <span className="error">{error.role}</span>
        <label className="block font-semibold text-sm mt-2">Password :</label>
        <input
          type="password"
          name="password"
          className="w-full rounded border p-2"
          value={data.password}
          onChange={handleInput}
        />
        <span className="error">{error.password}</span>
        <div className="flex items-center justify-end ">
          <span className="p-1">Already have an account</span>
          <Link to="/" className="text-blue-500">
            {" "}
            Login
          </Link>
        </div>
        <div className="flex justify-center">
          <button className="bg-green-500 font-bold text-base py-2 px-8 rounded-lg">
            Signup
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup1;
