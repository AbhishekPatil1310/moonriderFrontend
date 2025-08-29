import { useState, useContext } from "react";
import { signup } from "../api/Auth";
import { AuthContext } from "../context/AuthContext";
import GoogleSignInButton from "./GoogleLogin";

export default function SignupForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { setAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(" ");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // clear previous error
    try {
      const res = await signup(form);
      setAccessToken(res.data.accessToken);
      localStorage.setItem("accessToken", res.data.accessToken);
    } catch (err) {
      console.log(err.response?.data?.message);
      setError(err.response?.data?.message || "Something went wrong"); // <-- set error message
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side */}
      <div className="bg-indigo-600 flex-1 flex flex-col justify-center items-center p-8">
        <div className="mb-16">
          <div className="text-white text-4xl font-bold tracking-wide mb-4">BASE</div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1 flex justify-center items-center bg-gray-50">
        <div className="bg-white px-8 py-10 rounded-lg shadow-md w-full max-w-md mx-4">
          <h2 className="text-2xl font-bold mb-2">Sign Up</h2>
          <p className="text-gray-500 mb-4">Create your account</p>
          {/* Show error if exists */}
          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          {/* Social signup */}
          <div className="flex gap-2 mb-4">
            <GoogleSignInButton text="Sign up with Google" />
            <button className="flex-1 border px-3 py-2 rounded bg-gray-100 text-gray-400" disabled>
              Sign up with Apple
            </button>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              required
              className="border rounded px-4 py-2"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              required
              className="border rounded px-4 py-2"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              required
              className="border rounded px-4 py-2"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded">
              Signup
            </button>
          </form>
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-indigo-600 hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
