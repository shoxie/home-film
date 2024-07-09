import { getMovies } from "@/api";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    getMovies().then(console.log);
  }, []); 
  return (
    <>
      hello
    </>
  );
}