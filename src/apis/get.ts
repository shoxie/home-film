import { axiosInstance } from "@/lib/initRequest";

export const getMoviesChanges = (pages: number) => {
  return axiosInstance.get(`movie/changes?page=${pages}`);
};

export const getOneMovie = (id: number) => {
  return axiosInstance.get(`movie/${id}`)
}