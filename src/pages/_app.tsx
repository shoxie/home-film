import Layout from '@/components/layout'
import ThemeProvider from '@/providers/theme'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { motion, AnimatePresence } from "framer-motion"

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Layout>
        <AnimatePresence mode="wait" initial={false}>
          <Component {...pageProps} key={router.asPath} />
        </AnimatePresence>
      </Layout>
    </ThemeProvider>
  )
}
