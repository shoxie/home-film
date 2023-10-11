
import { motion } from 'framer-motion';

const PlaylistView = () => {
    return (
        <motion.div key="playlistview" initial={{
            x: -100,
            opacity: 0
        }}
        animate={{
            x: 0,
            opacity: 1
        }}
        exit={{
            x: -100,
            opacity: 0
        }}
        >playlist view</motion.div>
    )
}

export default PlaylistView