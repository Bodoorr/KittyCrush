import './App.css'
import Home from './pages/Home'
import { useEffect, useState } from 'react'

const App = () => {
  const [isMobile, setIsMobile] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)


    const loadTimeout = setTimeout(() => setLoading(false), 3000) 
    return () => {
      window.removeEventListener('resize', checkMobile)
      clearTimeout(loadTimeout)
    }
  }, [])

  if (!isMobile) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-white px-4">
        <h1 className="font-emily text-pink-500 text-center text-2xl font-bold mb-6">
          This app works only on mobile devices
        </h1>
        <img src="/logo.jpg" alt="Logo" className="w-32 h-32 object-contain" />
      </div>
    )
  }

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <img
          src="/logo.jpg"
          alt="Logo"
          className="w-24 h-24 object-contain mb-6 animate-bounce"
        />
        <h1 className="font-emily text-pink-600 text-2xl font-bold">
          Loading Valentine App...
        </h1>
      </div>
    )
  }

  return <Home />
}

export default App
