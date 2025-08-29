// src/api/ContactApi.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://moonriderbackend.onrender.com/api/contact", // adjust if needed
  withCredentials: true,
});

export const sendMessage = (data) => API.post("/sendMessage", data);
