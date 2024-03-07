import axios, { AxiosResponse } from "axios";
import { HttpError } from "./http";
import { API_URL } from "../../config";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => res.data,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const response: AxiosResponse = error.response;

      return Promise.reject(
        new HttpError(response.status, response.statusText, response.data),
      );
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
