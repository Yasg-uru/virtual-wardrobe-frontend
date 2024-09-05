import axios from "axios";
export const authInstance = axios.create({
  // baseURL: "http://localhost:5000/",
  baseURL: "https://wordrobe-authentication-service.vercel.app",
  // timeout: 1000,
});
export const clothInstance = axios.create({
  // baseURL: "http://localhost:5001",
  baseURL: "https://wardrobe-service.vercel.app",
});
