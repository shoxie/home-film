import { AxiosInstance } from "axios";
import { axiosInstance, IConfig } from "./axios";

export interface IResponse<T = unknown> {
  data?: T;
  code: number;
  messages: string[];
}

class HttpRequest {
  api: AxiosInstance;

  constructor() {
    this.api = axiosInstance;
  }

  async get<T = any>(url: string, config?: IConfig) {
    return this.api.get<IResponse<T>, IResponse<T>>(url, config);
  }

  async post<T = any, D = any>(url: string, data: D, config?: IConfig) {
    return this.api.post<IResponse<T>, IResponse<T>, D>(url, data, config);
  }

  async put<T = any, D = any>(url: string, data: D, config?: IConfig) {
    return this.api.put<IResponse<T>, IResponse<T>, D>(url, data, config);
  }

  async patch<T = any, D = any>(url: string, data?: D, config?: IConfig) {
    return this.api.patch<IResponse<T>, IResponse<T>, D>(url, data, config);
  }

  async delete<T = any>(url: string, config?: IConfig) {
    return this.api.delete<IResponse<T>, IResponse<T>>(url, config);
  }
}

const httpRequest = new HttpRequest();

export default httpRequest;
