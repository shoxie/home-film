import ReactPlayer from 'react-player'
import { useState, useEffect } from 'react'

const WatchPage = ({ src } :{ src: string}) => {
    const [hasWindow, setHasWindow] = useState(false);
    const [playerState, setPlayerState] = useState({
      playing: false
    })
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  const handlePlayPause = () => {
    setPlayerState({...playerState, playing: !playerState.playing})
  }

    return(
        <div className="w-screen h-screen">
            {/* <video contorls className="w-full h-full" src={src} /> */}
            { hasWindow && <ReactPlayer 
            url={src} 
            playing={playerState.playing}
            controls
            />
            }
        <div className="flex flex-row items-center">
          <button onClick={handlePlayPause}>{playerState.playing ? "Play" : "Stop"}</button>
        </div>
        </div>

    )
}

export default WatchPage