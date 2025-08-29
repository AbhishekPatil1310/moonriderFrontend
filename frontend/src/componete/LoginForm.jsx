import { useState, useContext, useEffect } from "react";
import { signin } from "../api/Auth";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import GoogleSignInButton from "./GoogleLogin";
import { FaGithub, FaTwitter, FaLinkedin, FaDiscord } from "react-icons/fa";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { accessToken, setAccessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (accessToken) {
      navigate("/dashboard", { replace: true });
    }
  }, [accessToken, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await signin(form);
      // If your backend returns tokens in cookies, no need to set them manually
      if (res.data.accessToken) {
        setAccessToken(res.data.accessToken);
      }
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* LEFT: Blue angled panel */}
      <div
        className="flex-1 flex flex-col items-center justify-between p-8 bg-indigo-600 relative"
        style={{ clipPath: "polygon(0 0, 100% 0, 60% 100%, 0% 100%)" }}
      >
        <div className="flex flex-col items-center mt-16 mb-12 w-full z-10">
          <div className="w-14 h-14 mb-3 flex items-center justify-center rounded-full bg-white bg-opacity-10">
            <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="16" fill="white" fillOpacity="0.9" />
              <path d="M8 18c2.1-1.5 6.27-3.33 8.27-2.97C18.85 15.16 24 17.5 24 17.5" stroke="#6366F1" strokeWidth="2.2" strokeLinejoin="round" />
              <path d="M8 12.5C11 11 17.36 11 24 15.5" stroke="#6366F1" strokeWidth="2.2" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="text-white text-4xl font-bold tracking-wide mt-3">BASE</div>
        </div>
        <div className="flex space-x-7 mb-10 z-10">
          <a href="https://github.com/AbhishekPatil1310" className="text-white text-2xl opacity-90 hover:opacity-100"><FaGithub /></a>
          <a href="https://x.com/abhishekpa78700" className="text-white text-2xl opacity-90 hover:opacity-100"><FaTwitter /></a>
          <a href="http://www.linkedin.com/in/abhishek-patil-a0a82431a" className="text-white text-2xl opacity-90 hover:opacity-100"><FaLinkedin /></a>
          <a href="https://discord.com/users/prime096345" className="text-white text-2xl opacity-90 hover:opacity-100"><FaDiscord /></a>
        </div>
      </div>

      {/* RIGHT: Card content */}
      <div className="flex-1 flex justify-center items-center bg-gray-50">
        <div className="bg-white px-8 py-10 rounded-2xl shadow-md w-full max-w-md mx-4">
          <h2 className="text-2xl font-bold mb-2">Sign In</h2>
          <p className="text-gray-500 mb-4">Sign in to your account</p>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          {/* Social Login */}
          <div className="flex gap-2 mb-4">
            <GoogleSignInButton text="Sign in with Google" />
            <button
              className="flex-1 border px-3 py-2 rounded bg-gray-100 text-gray-400"
              disabled
            >
              Sign in with Apple
            </button>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col text-sm text-gray-800 font-medium">
              Email address
              <input
                type="email"
                placeholder="johndoe@email.com"
                value={form.email}
                required
                className="border mt-1 rounded px-4 py-2"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </label>
            <label className="flex flex-col text-sm text-gray-800 font-medium">
              Password
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                required
                className="border mt-1 rounded px-4 py-2"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </label>
            <div className="flex justify-end mb-2">
              <a href="#" className="text-indigo-600 text-xs hover:underline">Forgot password?</a>
            </div>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded"
            >
              Sign In
            </button>
            <span className="text-center text-sm mt-3">
              Don&apos;t have an account?{" "}
              <a href="/register" className="text-indigo-600 hover:underline">Register here</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}
