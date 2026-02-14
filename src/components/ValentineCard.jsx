import { useEffect, useRef } from 'react'
import html2canvas from 'html2canvas'
import HeartsRain from './HeartsRain'
import { uploadToCloudinary } from '../services/cloudinary'

const ValentineCard = ({ isSmiling, captureRef }) => {
  const audioRef = useRef(null)

  useEffect(() => {
    if (!isSmiling || !captureRef.current) return

    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    }

    const timeout = setTimeout(async () => {
      const canvas = await html2canvas(captureRef.current)
      const flippedCanvas = document.createElement('canvas')
      const ctx = flippedCanvas.getContext('2d')

      flippedCanvas.width = canvas.width
      flippedCanvas.height = canvas.height

      ctx.save()
      ctx.scale(-1, 1)
      ctx.drawImage(canvas, -canvas.width, 0)
      ctx.restore()

      const imageData = flippedCanvas.toDataURL('image/png')

      const link = document.createElement('a')
      link.href = imageData
      link.download = 'valentine.png'
      link.click()

      const cloudUrl = await uploadToCloudinary(imageData)
      if (cloudUrl) {
        console.log('Uploaded to Cloudinary:', cloudUrl)
      }
    }, 500)

    return () => {
      clearTimeout(timeout)
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [isSmiling, captureRef])

  return (
    <>
      {isSmiling && <HeartsRain captureRef={captureRef} />}

      <audio ref={audioRef} src="/love.mp3" loop />
    </>
  )
}

export default ValentineCard
