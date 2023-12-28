import { ToastContainer } from 'react-toastify'
import { Providers } from './Providers'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import './globals.css'
import { Inter, Poppins } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css';
import BottomNavBar from './components/BottomNavBar/BottomNavBar'
import VendorMobileNavbar from './components/VendorMobileNavbar/VendorMobileNavbar'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-popp',
})


export const metadata = {
  title: 'Cleantech Mart: Your One-Stop Destination for Sustainable Solutions',
  description: 'Connecting Dots for Net Zero Future',
}

export default function Layout({ children }) {

  return (
    <html lang="en">
      <Providers>
        <body className={`${inter.variable} ${poppins.variable} font-sans`}>
          <Header />
          <VendorMobileNavbar />
          <ToastContainer />
          {children}
          <Footer />
          <BottomNavBar />
        </body>
      </Providers>
    </html>
  )
}
