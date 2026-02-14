import './App.css'
import Home from './pages/Home'
import { useEffect, useState } from 'react'


const App = () => {
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!isMobile) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-white px-4">
        <h1 className="text-pink-500 text-center text-2xl font-bold mb-6 font-emily">
          Sorry, This app works only on mobile devices
        </h1>
        <img src={"./logo.jpg"} alt="Logo" className="w-32 h-32 object-contain" />
      </div>
    )
  }

  return <Home />
}

export default App
