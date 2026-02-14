export const downloadImage = (dataUrl, filename) => {
  const a = document.createElement('a')
  a.href = dataUrl
  a.download = filename
  a.click()
}
