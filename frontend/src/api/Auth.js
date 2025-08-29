import axios from "axios";

const API = axios.create({
    baseURL: "https://moonriderbackend.onrender.com/api/auth",
    withCredentials: true, // allows cookies (refresh token)
});

export const signup = (data) => API.post("/signup", data);
export const signin = (data) => API.post("/signin", data);
export const refreshToken = () => API.post("/refresh");
export const logout = () => API.post("/logout");