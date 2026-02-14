import { useEffect, useState, useRef } from 'react'
import * as faceapi from 'face-api.js'

const SmileDetector = ({ videoRef, setIsSmiling }) => {
  const [expression, setExpression] = useState('waiting')
  const frownVideoRef = useRef(null)

  useEffect(() => {
    let interval

    const startDetection = async () => {
      interval = setInterval(async () => {
        if (!videoRef.current) return

        const detection = await faceapi
          .detectSingleFace(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceExpressions()

        if (!detection) {
          setExpression('waiting')
          setIsSmiling(false)
          frownVideoRef.current?.pause()
        } else if (detection.expressions.happy > 0.5) {
          setExpression('smile')
          setIsSmiling(true)
          frownVideoRef.current?.pause()
        } else if (detection.expressions.sad > 0.1) {
          setExpression('sad')
          setIsSmiling(false)
          if (frownVideoRef.current?.paused) {
            frownVideoRef.current.currentTime = 0
            frownVideoRef.current.play()
          }
        } else {
          setExpression('waiting')
          setIsSmiling(false)
          frownVideoRef.current?.pause()
        }
      }, 500)
    }

    const loadModelsAndStart = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models')
      await faceapi.nets.faceExpressionNet.loadFromUri('/models')
      console.log('Models loaded successfully')
      startDetection()
    }

    loadModelsAndStart()

    return () => clearInterval(interval)
  }, [videoRef, setIsSmiling])

  return (
    <>

{(expression === 'smile' || expression === 'waiting') && (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
    <div className="-translate-y-20 bg-white/80 px-5 py-2 rounded-2xl text-center font-bold shadow-md font-emily text-pink-600">
      {expression === 'smile' && 'You are my valentine!'}
      {expression === 'waiting' && 'Waiting for your expression...'}
    </div>
  </div>
)}

      {expression === 'sad' && (
        <video
          ref={frownVideoRef}
          src="/smile.mp4"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10 opacity-95"
          loop
        />
      )}
    </>
  )
}

export default SmileDetector
