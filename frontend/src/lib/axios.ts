import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

const requestConfig: AxiosRequestConfig = {
  baseURL: "http://localhost:5000",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
};
export type IConfig = AxiosRequestConfig;
export const axiosInstance = axios.create(requestConfig);

export default function initRequest() {
  axiosInstance.interceptors.request.use(
    (config) => {
      // Add any custom request logic here, such as attaching tokens
      console.log("Request Interceptor", config);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      // Add any custom response logic here
      console.log("Response Interceptor", response);
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}