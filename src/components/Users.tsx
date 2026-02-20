import React, { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  mobile: string;
  gender: string;
}

function Users() {
  const [data, setData] = useState({
    name: "",
    email: "",
    address: "",
    mobile: "",
    gender: "",
  });

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [error, setError] = useState<{
    name?: string;
    email?: string;
    mobile?: string;
    address?: string;
    gender?: string;
  }>({});

  const [store, setStore] = useState<User[]>([]);

  const [edit, setEdit] = useState<string | null>(null);

  const name = (name: string) => {
    return /^[a-zA-Z]{3,}$/.test(name);
  };

  const email = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA_Z]{2,}$/.test(email);
  };

  const mobile = (mobile: string) => {
    return /^[0-9]{10}$/.test(mobile);
  };

  const validation = () => {
    const newError: {
      name?: string;
      email?: string;
      address?: string;
      gender?: string;
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

    if (!data.address) {
      newError.address = "Enter valid address";
    }

    if (!data.gender) {
      newError.gender = "Select gender";
    }

    setError(newError);

    return Object.keys(newError).length < 1;
  };

  const handleInput = (e: any) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!validation()) return;

    if (edit) {
      if (!edit) return;
      const update = store.map((u) => (u.id === edit ? { ...u, ...data } : u));
      localStorage.setItem("myUsers", JSON.stringify(update));
      setStore(update);
    } else {
      const existUsers = JSON.parse(localStorage.getItem("myUsers") || "[]");

      const userLenght = existUsers?.length ? existUsers?.length + 1 : 1;

      const newUser = {
        id: userLenght,
        ...data,
      };

      existUsers.push(newUser);

      localStorage.setItem("myUsers", JSON.stringify(existUsers));

      setStore(existUsers);
    }

    setData({
      name: "",
      email: "",
      address: "",
      mobile: "",
      gender: "",
    });
  };

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("myUsers") || "[]");
    if (users) {
      setStore(users);
    }
  }, []);

  const handleDelete = (id: string) => {
    const user = store.filter((u) => u.id !== id);
    localStorage.setItem("myUsers", JSON.stringify(user));
    setStore(user);
  };

  const handleUpdate = (id: string) => {
    const user = store.find((u) => u.id === id);
    if (!user) return;
    setData(user);
    setEdit(id);
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
  };

  return (
    <>
      {store && (
        <>
          <div className="flex justify-end">
            <button
              className="flex py-3 px-3 bg-blue-500 text-white justify-end mt-10 ml-50"
              onClick={() => {
                setData({
                  name: "",
                  email: "",
                  address: "",
                  mobile: "",
                  gender: "",
                });
                setEdit(null);
                setIsFormOpen(true);
              }}
            >
              Add New Member
            </button>
          </div>
          <h1 className="flex font-bold text-2xl  items-center justify-center">
            List of Members
          </h1>
          <div className="max-w-5xl m-auto bg-white shadow-lg rounded p-6 ">
            <table className="w-full border ">
              <tr className="bg-gray-100">
                <th className="p-2 border">Id</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Address</th>
                <th className="p-2 border">Mobile</th>
                <th className="p-2 border">Gender</th>
                <td className="p-2 border" colSpan={2}>
                  Action
                </td>
              </tr>
              {store.map((user) => (
                <tr key={user.id}>
                  <td className="p-2 border">{user.id}</td>
                  <td className="p-2 border">{user.name}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">{user.address}</td>
                  <td className="p-2 border">{user.mobile}</td>
                  <td className="p-2 border">{user.gender}</td>
                  <td className="p-2 border">
                    <button
                      className="bg-green-600 py-1 px-2 rounded-lg text-white"
                      onClick={() => handleUpdate(user.id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="p-2 border">
                    <button
                      className="bg-red-600 py-1 px-2 rounded-lg text-white"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </>
      )}
      {isFormOpen && (
        <div className="max-w-2xl m-auto bg-white shadow-lg rounded p-6 mt-10">
          <h1 className="font-bold text-xl text-center">Add Members</h1>

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
            <label className="block font-semibold text-sm mt-2">
              Address :
            </label>
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

            <div className="flex justify-center gap-2">
              <button className="bg-green-500 font-bold text-base py-2 px-8 rounded-lg">
                {edit ? "Update" : "Submit"}
              </button>
              <button
                className="bg-sky-300 font-bold text-base py-2 px-8 rounded-lg"
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
