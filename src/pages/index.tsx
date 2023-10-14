import { getMoviesChanges } from "@/apis/get";
import MoviesList from "@/components/lists/MovieList";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    async function run() {
      const { data } = await getMoviesChanges(1);
      console.log('data', data)

      setData(data.results)
    }
    run()
  }, [])

  return (
    <motion.div key="idx">
      <MoviesList data={data} />
    </motion.div>
  )

}

export default Home