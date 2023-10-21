import axios, { AxiosError } from "axios";
import { token } from "constants/index";

export default () => {
  const baseURL = import.meta.env.VITE_API_URL;
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const axiosInstance = axios.create({
    baseURL,
    headers,
  });

  axiosInstance.interceptors.response.use(
    ({ data }) =>
      new Promise((resolve) => {
        resolve(data);
      }),
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        console.log("status === 401");
      }

      return new Promise((_resolve, reject) => {
        reject(error);
      });
    }
  );
  return axiosInstance;
};
