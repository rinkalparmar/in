import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    gender: "",
    hobbies: [] as string[],
    role: "",
  });

  const navigate = useNavigate();

  const handleInput = (e: any) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setData({
        ...data,
        hobbies: checked
          ? [...data.hobbies, value]
          : data.hobbies.filter((h) => h !== value),
      });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const fetchApi = await fetch("http://localhost:5001/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await fetchApi.json();
      
      if (!fetchApi.ok) {
        alert(result.message);
      } else {
        alert(result.message);
        navigate("/");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="max-w-2xl m-auto p-6 rounded bg-white shadow-2xl mt-8">
      <h1 className="font-bold text-2xl text-center">Signup</h1>

      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="" className="block text-lg font-semibold">
          Name :
        </label>
        <input
          type="text"
          name="name"
          value={data.name}
          className="p-2 border w-full rounded-xl mb-2"
          onChange={handleInput}
        />
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
          Mobile :
        </label>
        <input
          type="number"
          name="mobile"
          value={data.mobile}
          className="p-2 border w-full rounded-xl mb-2"
          onChange={handleInput}
        />
        <label htmlFor="" className="block text-lg font-semibold">
          Gender :
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={handleInput}
            checked={data.gender === "male"}
          />
          male
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={handleInput}
            checked={data.gender === "female"}
          />
          female
        </div>
        <label htmlFor="" className="block text-lg font-semibold">
          Hobbies :
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="checkbox"
            name="hobbies"
            value="dance"
            onChange={handleInput}
            checked={data.hobbies.includes("dance")}
          />
          dance
          <input
            type="checkbox"
            name="hobbies"
            value="music"
            onChange={handleInput}
            checked={data.hobbies.includes("music")}
          />
          music
          <input
            type="checkbox"
            name="hobbies"
            value="reading"
            onChange={handleInput}
            checked={data.hobbies.includes("reading")}
          />
          reading
          <input
            type="checkbox"
            name="hobbies"
            value="writing"
            onChange={handleInput}
            checked={data.hobbies.includes("writing")}
          />
          writing
        </div>
        <label htmlFor="" className="block text-lg font-semibold">
          Role :
        </label>
        <select
          name="role"
          className="p-2 border w-full rounded-xl mb-2"
          onChange={handleInput}
          value={data.role}
        >
          <option value="">Select role</option>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
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
          <span className="p-1"> Already have an account</span>
          <Link to="/" className="text-blue-500">
            Login
          </Link>{" "}
        </div>

        <div className="flex justify-center mt-2">
          <button className="py-2 px-4 bg-green-600 rounded">Signup</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
