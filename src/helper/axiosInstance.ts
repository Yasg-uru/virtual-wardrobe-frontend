import axios from "axios";
export const authInstance = axios.create({
  baseURL: "http://localhost:5000/",
  timeout: 1000,
});
