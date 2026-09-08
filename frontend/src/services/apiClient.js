import axios from "axios";

// Single Axios instance for the whole app. Module-specific services
// (e.g. giveawaysService.js in Module 2) import this instead of creating
// their own client, so base URL, auth headers, and error handling stay
// consistent everywhere.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1",
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("aas_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token missing/expired — Module 1 wires this up to redirect to /login.
      localStorage.removeItem("aas_token");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
