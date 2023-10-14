import { getOneMovie } from "@/apis/get"
import { IMovie } from "@/interfaces/IMovie"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useEffect, useState } from "react"

type Props = {
    id: number
    aspectRatio: string
    width: number
    height: number
}

const MovieCard = ({ id, aspectRatio, width, height }: Props) => {
    const [data, setData] = useState<IMovie | null>(null)

    useEffect(() => {
        if (!id) return
        async function run() {
            const {data} = await getOneMovie(id)
            // console.log('data', JSON.stringify(data))
            setData(data)
        }
        run();
    }, [id])

    if (!data) return null
    
    return (
        <div>
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}${data.poster_path}`}
              alt={data.title}
              width={width}
              height={height}
              className={cn(
                "h-auto w-auto object-cover transition-all hover:scale-105",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            />
            <div>
                <span>{data.title}</span>
            </div>
        </div>
    )
}

export default MovieCard