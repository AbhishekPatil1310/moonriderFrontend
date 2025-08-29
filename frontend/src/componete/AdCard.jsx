import React, { useState } from "react";
import { addUser } from "../api/UserApi";

export default function AddUserCard() {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    linkedInId: "",
    instgramId: "",
    githubId: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addUser(form);
      alert("User added successfully!");
      setShowModal(false);
      setForm({
        name: "",
        email: "",
        phone: "",
        linkedInId: "",
        instgramId: "",
        githubId: "",
      });
      console.log(form);
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      alert("Failed to add user");
    }
  };

  return (
    <>
      {/* Glassmorphic plus button */}
      <div
        className="cursor-pointer flex items-center justify-center rounded-xl p-6 border border-dashed border-gray-300 hover:bg-white hover:bg-opacity-10 transition"
        onClick={() => setShowModal(true)}
        style={{
          backdropFilter: "blur(15px)",
          backgroundColor: "rgba(255, 255, 255, 0)",
        }}
      >
        <div className="border-dashed border-2 border-gray-300 rounded-full w-20 h-20 flex items-center justify-center">
          <span className="text-gray-400 text-4xl select-none">+</span>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)", // for Safari
          }}
        >
          <div
            className="relative w-full max-w-lg rounded-xl bg-white bg-opacity-10 p-6 backdrop-blur-xl border border-white border-opacity-20 shadow-lg"
            style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)" }}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-lg font-bold text-black hover:text-blue-400 transition"
              onClick={() => setShowModal(false)}
              aria-label="Close modal"
            >
              &times;
            </button>

            {/* Tabs */}
            <div className="flex border-b border-white border-opacity-30 mb-6 text-black select-none">
              <button
                className={`flex-1 py-3 text-center transition ${
                  activeTab === "basic"
                    ? "border-b-4 border-blue-600 font-semibold"
                    : "text-gray-500 hover:text-blue-600"
                }`}
                onClick={() => setActiveTab("basic")}
              >
                Basic
              </button>
              <button
                className={`flex-1 py-3 text-center transition ${
                  activeTab === "social"
                    ? "border-b-4 border-blue-600 font-semibold"
                    : "text-gray-500 hover:text-blue-600"
                }`}
                onClick={() => setActiveTab("social")}
              >
                Social
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5 text-black">
              {activeTab === "basic" && (
                <>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md bg-white bg-opacity-20 border border-blue-600 border-opacity-30 px-4 py-3 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-70 transition"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md bg-white bg-opacity-20 border border-blue-600 border-opacity-30 px-4 py-3 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-70 transition"
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full rounded-md bg-white bg-opacity-20 border border-blue-600 border-opacity-30 px-4 py-3 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-70 transition"
                  />
                </>
              )}

              {activeTab === "social" && (
                <>
                  <input
                    type="text"
                    name="linkedInId"
                    placeholder="LinkedIn ID"
                    value={form.linkedInId}
                    onChange={handleChange}
                    className="w-full rounded-md bg-white bg-opacity-20 border border-blue-600 border-opacity-30 px-4 py-3 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-70 transition"
                  />
                  <input
                    type="text"
                    name="instgramId"
                    placeholder="Instagram ID"
                    value={form.instgramId}
                    onChange={handleChange}
                    className="w-full rounded-md bg-white bg-opacity-20 border border-blue-600 border-opacity-30 px-4 py-3 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-70 transition"
                  />
                  <input
                    type="text"
                    name="githubId"
                    placeholder="GitHub ID"
                    value={form.githubId}
                    onChange={handleChange}
                    className="w-full rounded-md bg-white bg-opacity-20 border border-blue-600 border-opacity-30 px-4 py-3 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-70 transition"
                  />
                </>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg py-3 font-semibold transition"
              >
                Add User
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
