import React, { useState, useContext } from "react";
import {
  Home,
  CreditCard,
  Calendar,
  Users,
  Settings,
  Phone,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout as apiLogout } from "../api/Auth";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { setAccessToken } = useContext(AuthContext); // <-- get context

  const handleLogout = async () => {
    try {
      // Call backend to clear cookies
      await apiLogout({ credentials: "include" });

      // Clear React state
      setAccessToken(null);

      // Redirect to login
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-600 text-white shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-600 text-white flex flex-col justify-between shadow-lg transform transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:shadow-none`}
      >
        {/* Top section */}
        <div>
          <div className="p-6 text-2xl font-bold tracking-wide">BASE</div>
          <nav className="flex flex-col gap-2 px-4">
            <SidebarButton to="/dashboard" icon={<Home size={20} />} label="Dashboard" />
            <SidebarButton to="/transactions" icon={<CreditCard size={20} />} label="Transactions" />
            <SidebarButton to="/schedules" icon={<Calendar size={20} />} label="Schedules" />
            <SidebarButton to="/users" icon={<Users size={20} />} label="Users" />
            <SidebarButton to="/settings" icon={<Settings size={20} />} label="Settings" />
          </nav>
        </div>

        {/* Bottom section */}
        <div className="mb-6 px-4 flex flex-col gap-2">
          <SidebarButton to="/contact" icon={<Phone size={20} />} label="Contact Us" />
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}

function SidebarButton({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-colors ${
          isActive ? "bg-blue-700" : "hover:bg-blue-500"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
