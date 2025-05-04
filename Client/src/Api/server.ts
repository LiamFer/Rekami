import axios from "axios";
import { store } from "../Redux/store";

export const serverApi = axios.create({
  baseURL: "http://localhost:2409",
  withCredentials: true,
});

serverApi.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.user.user?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
