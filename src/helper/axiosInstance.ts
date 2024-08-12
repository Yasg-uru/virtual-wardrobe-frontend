import axios from "axios";
export const authInstance = axios.create({
  baseURL: "http://localhost:5000/",
  timeout: 1000,
});
export const clothInstance = axios.create({
  baseURL: "http://localhost:5001",
  timeout: 1000,
});
