import axios from "axios";
import { serverApi } from "../Api/server";

export async function login(email: string, password: string) {
  try {
    const response = await serverApi.post(`/auth/login`, { email, password });
    return { success: true, data: response.data.data };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.message || "Unknown Error";

      if (status === 401) {
        return { success: false, error: "Invalid Credentials." };
      } else if (status === 400) {
        return { success: false, error: message };
      } else {
        return {
          success: false,
          error: "Error while connecting to the Server.",
        };
      }
    }

    return { success: false, error: "Unexpected Error." };
  }
}

export async function refreshToken() {
  try {
    const response = await serverApi.post(`/auth/refresh`, {});
    return { success: true, data: response.data.data };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.message || "Unknown Error";

      if (status === 401) {
        return { success: false, error: "Invalid Refresh Token." };
      } else if (status === 400) {
        return { success: false, error: message };
      } else {
        return {
          success: false,
          error: "Error while connecting to the Server.",
        };
      }
    }

    return { success: false, error: "Unexpected Error." };
  }
}