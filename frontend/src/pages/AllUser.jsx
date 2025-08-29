// src/pages/Users.jsx
import React, { useEffect, useState } from "react";
import { getAllUser, deleteUser, updateUser } from "../api/UserApi";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState(null); // user being edited
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedInId: "",
    instgramId: "",
    githubId: "",
  });

  const fetchUsers = async () => {
    try {
      const res = await getAllUser();
      setUsers(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      linkedInId: user.linkedInId || "",
      instgramId: user.instgramId || "",
      githubId: user.githubId || "",
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUser(editingUser, formData);
      setUsers((prev) =>
        prev.map((u) => (u._id === editingUser ? { ...u, ...formData } : u))
      );
      setEditingUser(null);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update user");
    }
  };

  if (loading)
    return <p className="p-4 text-gray-500 text-center">Loading users...</p>;
  if (error)
    return (
      <p className="p-4 text-red-500 text-center font-semibold">{error}</p>
    );

  return (
    <div className="p-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Users</h1>
      <div
        className="overflow-x-auto rounded-xl shadow-lg bg-white bg-opacity-30 backdrop-blur-md border border-white border-opacity-20"
        style={{
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
      >
        <table className="w-full table-auto border-collapse text-gray-900">
          <thead>
            <tr className="bg-blue-700 text-white uppercase text-sm tracking-wider">
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Created At</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-200 hover:bg-white transition-colors duration-200"
                >
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="px-6 py-4 text-center text-gray-500"
                  colSpan={5}
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Popup */}
      {editingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setEditingUser(null)}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="LinkedIn ID"
                value={formData.linkedInId}
                onChange={(e) =>
                  setFormData({ ...formData, linkedInId: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Instagram ID"
                value={formData.instgramId}
                onChange={(e) =>
                  setFormData({ ...formData, instgramId: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="GitHub ID"
                value={formData.githubId}
                onChange={(e) =>
                  setFormData({ ...formData, githubId: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Update User
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
