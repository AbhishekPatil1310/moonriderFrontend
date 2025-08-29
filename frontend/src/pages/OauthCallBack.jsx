// src/pages/OAuthCallback.jsx
import { useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function OAuthCallback() {
    const [searchParams] = useSearchParams();
    const { setAccessToken } = useContext(AuthContext);

    useEffect(() => {
        const token = searchParams.get("accessToken");
        if (token) {
            setAccessToken(token);
            localStorage.setItem("accessToken", token);
        }
        window.location.href = "/dashboard"; // redirect home
    }, []);

    return <div>Logging in...</div>;
}
