import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5124/",
});

export default api;
