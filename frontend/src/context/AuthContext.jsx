// src/auth/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { refreshToken } from "../api/Auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);

    // Refresh token on load
    useEffect(() => {
        const refresh = async () => {
            try {
                const res = await refreshToken(); // assumes cookie contains refreshToken
                setAccessToken(res.data.accessToken);
            } catch (err) {
                setAccessToken(null);
            }
        };
        refresh();
    }, []);

    const logout = () => {
        setAccessToken(null); // clear context
        // optionally call API to clear cookies
        fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    };

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
