import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '../components/ui/NavBar'
import { AppWrapper } from '../context'
import Toast from '@/components/ui/Toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'devTracker',
  description: 'Track Your Development Hours with Ease!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body
        className={`${inter.className} bg-primary-content min-h-screen overflow-x-clip relative`}
      >
        <AppWrapper>
          <NavBar />
          {children}
          <Toast />
        </AppWrapper>
      </body>
    </html>
  )
}
