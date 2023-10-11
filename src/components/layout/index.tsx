import Header from "./Header"
import SideBar, { playlists } from "./Sidebar";
import { motion } from 'framer-motion';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <motion.div key="main" className="flex flex-col h-screen max-h-screen min-h-screen">
            <Header />
            <motion.div key="body" className="flex flex-row h-full">
                <div className="w-64 border-r">
                    <SideBar playlists={playlists} />
                </div>
                {children}
            </motion.div>
        </motion.div>
    )
}

export default Layout;