import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // baseURL: "https://petlove-backend-jniu.onrender.com/api"
  withCredentials: true,
});

let refreshPromise: Promise<void> | null = null;

const refreshAccessToken = async () => {
  await api.post("/auth/refresh");
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
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
