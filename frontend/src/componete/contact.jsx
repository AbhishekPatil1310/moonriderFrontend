// src/pages/Contact.jsx
import React, { useState } from "react";
import { sendMessage } from "../api/contactApi";
import GoBackButton from "../componete/BackButton";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await sendMessage(form);
      setStatus(res.data.message || "Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus(err.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <GoBackButton />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-500 mb-6">
            Fill out the form below and we’ll get back to you shortly.
          </p>

          {status && (
            <p
              className={`mb-4 font-semibold ${status.includes("success") ? "text-green-600" : "text-red-600"
                }`}
            >
              {status}
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="border px-4 py-2 rounded-lg"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="border px-4 py-2 rounded-lg"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              className="border px-4 py-2 rounded-lg min-h-[120px]"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
