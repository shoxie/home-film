import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

const requestConfig: AxiosRequestConfig = {
  baseURL: "https://api.themoviedb.org/3",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
};

export type IConfig = AxiosRequestConfig;

export const axiosInstance = axios.create(requestConfig);

export default function initRequest() {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {

      // if (accessToken && config.headers) {
      // }

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error.response?.data);
    }
  );

  axiosInstance.interceptors.response.use(
    (res: any) => {
      return res.data;
    },
    async (error: any) => {
      const statusCode = error.response?.data?.code;
      const originalConfig = error.config;
      switch (statusCode) {
        case 401: {
          //   return refresh(originalConfig, logOut);
        }
        case 500:
          {
            break;
          }
          break;
        default:
          break;
      }
      return Promise.reject(error.response?.data);
    }
  );
}
