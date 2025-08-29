import axios from "axios";

const API = axios.create({
    baseURL: "https://moonriderbackend.onrender.com/api/users",
    withCredentials: true, // allows cookies (refresh token)
})

export const getAllUser = () => API.get("/getAllUser");
export const addUser = (formData) => API.post("/addUser", formData);
export const deleteUser = (id) => API.delete(`/deleteUser/${id}`);
export const updateUser = (id, data) => API.put(`/updateUser/${id}`, data);
