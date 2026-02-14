import { useEffect } from 'react'
import { useCamera } from '../services/camera'
const CameraView = ({ videoRef }) => {
  const { startCamera } = useCamera()
  useEffect(() => {
    startCamera(videoRef)
  }, [])
  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      className="w-full h-full object-cover scale-x-[-1]"
    />
  )
}
export default CameraView
