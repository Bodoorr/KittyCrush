import axios from 'axios'

const CLOUD_NAME = import.meta.env.CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.CLOUDINARY_UPLOAD_PRESET

export const uploadToCloudinary = async (imageData) => {
  const formData = new FormData()
  formData.append('file', imageData)
  formData.append('upload_preset', UPLOAD_PRESET)

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData
    )
    return res.data.secure_url
  } catch (err) {
    console.error('Cloudinary upload failed', err)
    return null
  }
}
