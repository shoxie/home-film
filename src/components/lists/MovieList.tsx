import MovieCard from "../cards/MovieCard"
import { ScrollArea } from "../ui/scroll-area"

type Movie = {
    adult: boolean
    id: number
}

const MoviesList = ({ data }: { data: Movie[] }) => {
    return (
        <ScrollArea className="w-full">
            <div className="grid grid-cols-5 items-center gap-5">
                {
                    data.map((item, index) => (
                        <MovieCard
                            key={item.id}
                            id={item.id}
                            aspectRatio="portrait"
                            width={300}
                            height={550}
                        />
                    ))
                }
            </div>
        </ScrollArea>
    )
}

export default MoviesList