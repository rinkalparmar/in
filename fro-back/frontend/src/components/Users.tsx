import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  gender: string;
  hobbies: string[];
  address: string;
  city: string;
}

function Users() {
  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    hobbies: [] as string[],
    address: "",
    city: "",
  });

  const [users, setUsers] = useState([]);
  const [edit, setEdit] = useState<null | object | string>({});

  const [isOpen, setIsOpen] = useState(false);

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

  //   const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   try {
  //     const fetchApi = await fetch("http://localhost:5001/api/user/create", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     const result = await fetchApi.json();

  //     if (!fetchApi.ok) {
  //       alert(result.message);
  //     } else {
  //       alert(result.message);
  //       navigate("/users");
  //     }

  //     setData({
  //       name: "",
  //       email: "",
  //       mobile: "",
  //       gender: "",
  //       hobbies: [] as string[],
  //       address: "",
  //       city: "",
  //     });
  //   } catch (error) {
  //     alert(error);
  //   }
  // };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const url = !edit
        ? "http://localhost:5001/api/user/create"
        : ` http://localhost:5001/api/user/update/${edit}`;

      const method = !edit ? "POST" : "PATCH";

      const fetchApi = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });

      const result = await fetchApi.json();

      if (!fetchApi.ok) {
        alert(result.message);
      } else {
        alert(result.message);
        fetchAllUsers();
        setIsOpen(false);
        setEdit(null);
      }

      setData({
        name: "",
        email: "",
        mobile: "",
        gender: "",
        hobbies: [] as string[],
        address: "",
        city: "",
      });
    } catch (error) {
      alert(error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/user/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
      } else {
        setUsers(result.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/user/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
      } else {
        alert(result.message);
        fetchAllUsers();
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleUpdate = (user: User) => {
    setEdit(user._id);
    setIsOpen(true);
    setData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      gender: user.gender,
      hobbies: user.hobbies,
      address: user.address,
      city: user.city,
    });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {users && (
        <div className="max-w-5xl m-auto bg-white shadow-lg rounded p-6">
          <div className="flex justify-end">
            <button
              className="bg-blue-500 py-2 px-2 rounded text-white"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              Add New Users
            </button>
          </div>
          <h1 className="text-2xl font-black text-center mb-3">List Of User</h1>
          <table className="borderw-full border ">
            <tr>
              <th className="p-2 font-semibold border">Name</th>
              <th className="p-2 font-semibold border">Email</th>
              <th className="p-2 font-semibold border">Address</th>
              <th className="p-2 font-semibold border">Mobile</th>
              <th className="p-2 font-semibold border">Gender</th>
              <th className="p-2 font-semibold border">hobbies</th>
              <th className="p-2 font-semibold border">City</th>
              <th className="p-2 font-semibold border" colSpan={2}>
                Action
              </th>
            </tr>
            {users.map((user: User) => (
              <tr>
                <td className="p-2 font-semibold border">{user.name}</td>
                <td className="p-2 font-semibold border">{user.email}</td>
                <td className="p-2 font-semibold border">{user.address}</td>
                <td className="p-2 font-semibold border">{user.mobile}</td>
                <td className="p-2 font-semibold border">{user.gender}</td>
                <td className="p-2 font-semibold border">{user.hobbies}</td>
                <td className="p-2 font-semibold border">{user.city}</td>
                <td className="p-2 font-semibold border">
                  <button
                    className="bg-green-600 py-1 px-2 rounded-lg text-white"
                    onClick={() => handleUpdate(user)}
                  >
                    Edit
                  </button>
                </td>
                <td className="p-2 font-semibold border">
                  <button
                    className="bg-red-600 py-1 px-2 rounded-lg text-white"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
      {isOpen && (
        <div className="max-w-2xl m-auto p-6 rounded bg-white shadow-2xl mt-8">
          <h1 className="font-bold text-2xl text-center">Add User</h1>
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
              Address :
            </label>
            <textarea
              rows={5}
              cols={8}
              name="address"
              onChange={handleInput}
              className="p-2 border w-full rounded-xl mb-2"
              value={data.address}
            />
            <label htmlFor="" className="block text-lg font-semibold">
              City :
            </label>
            <select
              name="city"
              className="p-2 border w-full rounded-xl mb-2"
              onChange={handleInput}
              value={data.city}
            >
              <option value="">Select city</option>
              <option value="suart">suart</option>
              <option value="mumbai">mumbai</option>
              <option value="rajkot">rajkot</option>
              <option value="goa">goa</option>
            </select>

            <div className="flex justify-center mt-2">
              <button className="py-2 px-4 bg-green-600 rounded">
                Add User
              </button>
              <button
                className="py-2 px-4 bg-gray-100  rounded ml-5"
                onClick={handleClose}
              >
                close
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Users;
