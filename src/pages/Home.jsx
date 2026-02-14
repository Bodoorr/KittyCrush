import { useRef, useState } from 'react'
import CameraView from '../components/CameraView'
import SmileDetector from '../components/SmileDetector'
import HeartsRain from '../components/HeartsRain'
import ValentineCard from '../components/ValentineCard'
import '../App.css'

const Home = () => {
  const videoRef = useRef(null)
  const captureRef = useRef(null)
  const [started, setStarted] = useState(false)
  const [isSmiling, setIsSmiling] = useState(false)

  const [loading, setLoading] = useState(false)

  const handleStart = async () => {
    setLoading(true)
    await new Promise((res) => setTimeout(res, 1500)) 
    setStarted(true)
    setLoading(false)
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

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-white relative">
      <div className="w-full bg-white h-20 sm:h-24 flex items-center px-4">
        <div className="flex items-center gap-3">
          <img
            src={'./logo.jpg'}
            alt="KittyCrush logo"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
          />
          <span className="font-emily text-lg sm:text-xl text-pink-600 font-semibold tracking-wide">
            KittyCrush
          </span>
        </div>
      </div>

      <div
        className="w-full flex-1 flex flex-col items-center justify-center bg-center bg-cover"
        style={{ backgroundImage: "url('./cardbg.png')" }}
      >
        {!started ? (
          <div className="text-center space-y-6 px-4">
            <h1
              className="text-4xl sm:text-5xl font-emily"
              style={{ color: '#B92E3F' }}
            >
              Will You Be My Valentine?
            </h1>

            <h3
              className="text-2xl sm:text-3xl font-emily"
              style={{ color: '#B92E3F' }}
            >
              Show it with a smile... or a frown
            </h3>

            <button
              onClick={handleStart}
              className="mt-4 px-6 py-2 rounded-md text-xl font-emily hover:opacity-90 transition text-pink-600"
              style={{ backgroundColor: '#FBF6F2', color: '#B92E3F' }}
            >
              Start
            </button>
          </div>
        ) : (
          <div
            className="w-full flex-1 flex flex-col items-center justify-center bg-center bg-cover"
            style={{ backgroundImage: "url('./cardbg2.png')" }}
          >
            <div className="w-full flex justify-center items-center mt-12">
              <div
                ref={captureRef}
                className="relative overflow-hidden"
                style={{
                  width: '100vw',
                  maxWidth: '1000px',
                  height: 'auto',
                  aspectRatio: 'auto',
                  WebkitMaskImage: 'url("./heart.png")',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskSize: '98%',
                  WebkitMaskPosition: 'center',
                  maskImage: 'url("./heart.png")',
                  maskRepeat: 'no-repeat',
                  maskSize: '100%',
                  maskPosition: 'center'
                }}
              >
                <CameraView
                  videoRef={videoRef}
                  className="w-full h-full object-cover"
                />
              </div>

              <HeartsRain isSmiling={isSmiling} captureRef={captureRef} />
              <ValentineCard isSmiling={isSmiling} captureRef={captureRef} />
            </div>

            <SmileDetector videoRef={videoRef} setIsSmiling={setIsSmiling} />
          </div>
        )}
      </div>

      <div className="w-full bg-white h-12 sm:h-16"></div>
    </div>
  )
}

export default Home
