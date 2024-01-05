import axios from "axios";

const api = axios.create({
  baseURL: "https://kenziefy-musicapp.onrender.com",
  timeout: 20000
});

export default api;
