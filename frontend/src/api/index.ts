import httpRequest from "@/lib/requestInstance";

const getMovies = async () => {
  const response = await httpRequest.get('/movies');
  return response.data;
};

export {
  getMovies,
};