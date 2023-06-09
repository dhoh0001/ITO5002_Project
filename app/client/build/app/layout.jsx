import '@styles/globals.css';
import Nav from '@components/Nav';
import { AuthContextProvider } from '@/context/AuthContext'

export const metadata = {
  title: "VertiGuard",
  description: "Data delivered for your Vertical Farm"
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900 tracking-tight">
        <main className='app flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip'>
        <AuthContextProvider>
          <Nav />
          {children}
        </AuthContextProvider>
        </main>
      </body>
    </html>
  )
}

export default RootLayout