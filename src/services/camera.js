export const useCamera = () => {
  const startCamera = async (videoRef) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      videoRef.current.srcObject = stream
    } catch (err) {
      alert('Camera access denied!')
      console.error(err)
    }
  }

  return { startCamera }
}
