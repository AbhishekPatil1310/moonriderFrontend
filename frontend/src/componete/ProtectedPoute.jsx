// src/auth/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
    const { accessToken } = useContext(AuthContext);

    // If no token, redirect to login
    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }

    // If token exists, render children
    return children;
}
