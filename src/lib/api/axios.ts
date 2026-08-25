import axios, { AxiosError } from "axios";
import type { InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
  // baseURL: import.meta.env.VITE_API_URL,
  baseURL: "/api",
  withCredentials: true,
});

let refreshPromise: Promise<void> | null = null;

const refreshAccessToken = async (): Promise<void> => {
  await api.post("/auth/refresh");
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (
      originalRequest.url === "/auth/refresh" ||
      error.response?.status !== 401 ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
      }

      await refreshPromise;

      return api(originalRequest);
    } catch (err) {
      return Promise.reject(err);
    }
  },
);
