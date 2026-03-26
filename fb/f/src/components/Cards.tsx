import React, { useEffect, useState } from "react";

interface Card {
  _id: string;
  name: string;
  description: string;
  category: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
}

function Cards() {
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "",
    createdBy: "",
  });

  const [error, setError] = useState<{
    name?: string;
    description?: string;
    category?: string;
  }>({});

  const [store, setStore] = useState<Card[]>([]);

  const [isOpen, setIsOpen] = useState(false);

  const [edit, setEdit] = useState<string | null>(null);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const validation = () => {
    const newError: {
      name?: string;
      description?: string;
      category?: string;
    } = {};

    if (!data.name) {
      newError.name = "Enter valid email";
    }

    if (!data.description) {
      newError.description = "Enter description";
    }
    if (!data.category) {
      newError.category = "Enter category";
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
      const url = edit
        ? `http://localhost:5001/api/card/update/${edit}`
        : "http://localhost:5001/api/card/create";

      const method = edit ? "PATCH" : "POST";

      const api = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });

      const response = await api.json();
      console.log("response", response);

      if (!api.ok) {
        alert(response.message);
      } else {
        setStore(response.data);
        alert(response.message);
        getCards(currentPage);
        setIsOpen(false);
      }

      setData({ name: "", description: "", category: "", createdBy: "" });
    } catch (error) {
      console.log("error", error);
    }
  };

  const getCards = async (currentPage: number) => {
    try {
      const api = await fetch(
        `http://localhost:5001/api/card/getAllCard?page=${currentPage}&limit=3`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const response = await api.json();
      console.log("response", response);

      if (!api.ok) {
        alert(response.message);
      } else {
        setStore(response.find);
        setTotalPages(response.pages);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getCards(currentPage);
  }, [currentPage]);
  const handleUpdate = (card: Card) => {
    setEdit(card._id);
    setIsOpen(true);
    setData({
      name: card.name,
      description: card.description,
      category: card.category,
      createdBy: card.createdBy._id,
    });
  };

  const handleDelete = async (id: string) => {
    try {
      const api = await fetch(`http://localhost:5001/api/card/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const response = await api.json();

      if (!api.ok) {
        alert(response.message);
      } else {
        alert(response.message);
        getCards(currentPage);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setData({
      name: "",
      description: "",
      category: "",
      createdBy: "",
    });
  };

  const filteredCards = store.filter((item: Card) => {
    const value = search.toLowerCase();

    return (
      item.name.toLowerCase().includes(value) ||
      item.description.toLowerCase().includes(value) ||
      item.category.toLowerCase().includes(value) ||
      item.createdBy?.name?.toLowerCase().includes(value)
    );
  });

  return (
    <>
      {store && (
        <div className="max-w-5xl m-auto bg-white shadow-lg rounded p-6 ">
          <div className=" flex justify-end mb-2 gap-10">
            <h1 className="text-lg font-bold mb-2">List of Cards</h1>
            <button
              className="bg-blue-700 py-1 px-2 text-white rounded"
              onClick={() => setIsOpen(!isOpen)}
            >
              Add New Card
            </button>
            <input
              type="text"
              name="search"
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
              placeholder="Search cards..."
              className="border p-1 rounded"
            />
          </div>
          <table className="w-full border">
            <thead>
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">CreatedBy</th>
                <th className="p-2 border" colSpan={2}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCards.map((item: Card) => (
                <tr key={item._id}>
                  <td className="p-2 border">{item?.name}</td>
                  <td className="p-2 border">{item?.description}</td>
                  <td className="p-2 border">{item?.category}</td>
                  <td className="p-2 border">{item?.createdBy.name}</td>
                  <td className="p-2 border">
                    <button
                      className="bg-green-600 py-2 px-2 text-white rounded"
                      onClick={() => {
                        handleUpdate(item);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="p-2 border">
                    <button
                      className="bg-red-600 py-2 px-2 text-white rounded"
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4 gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => setCurrentPage(i + 1)}>
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded shadow-xl p-6 w-full max-w-md relative">
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleCancel}
            >
              ✕
            </button>
            <div className="max-w-2xl m-auto bg-white rounded shadow-xl p-6 mt-10">
              <h1 className="font-bold text-xl text-center">Card</h1>

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

                <label className="block font-semibold mt-1">Description</label>
                <textarea
                  name="description"
                  cols={6}
                  rows={6}
                  className="border p-2 w-full rounded"
                  value={data.description}
                  onChange={handleInput}
                />
                <span className="text-red-500">{error?.description}</span>

                <label className="block font-semibold  mt-1">Category</label>
                <input
                  type="text"
                  name="category"
                  className="border p-2 w-full rounded"
                  value={data.category}
                  onChange={handleInput}
                />
                <span className="text-red-500">{error?.category}</span>

                <div className="flex justify-center mt-5 gap-6">
                  <button className="px-2 py-2 bg-green-200 rounded font-bold">
                    {edit ? "Edit Card" : "Add Card"}
                  </button>
                  <button
                    className="px-2 py-2 bg-gray-200 rounded font-bold"
                    onClick={handleCancel}
                  >
                    cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cards;
