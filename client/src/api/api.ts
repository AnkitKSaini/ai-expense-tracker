import axios from "axios";
import { getToken, saveToken, removeToken } from "../utils/token";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const res = await api.post("/auth/refresh-token");

        const accessToken = res.data.data.accessToken;

        saveToken(accessToken);

        originalRequest.headers.Authorization =
          `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch {
        removeToken();

        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default api;