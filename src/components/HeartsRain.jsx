import { useState, useEffect } from 'react'

const HeartsRain = ({ isSmiling }) => {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    let interval
    if (isSmiling) {
      interval = setInterval(() => {
        const id = Math.random().toString(36).substr(2, 9)
        const left = Math.random() * 100
        const duration = Math.random() * 5 + 3

        setHearts((prev) => [...prev, { id, left, duration }])

        setTimeout(() => {
          setHearts((prev) => prev.filter((h) => h.id !== id))
        }, duration * 1000)
      }, 100)
    }

    return () => clearInterval(interval)
  }, [isSmiling])

  return (
    <>
      {hearts.map((heart) => (
        <img
          key={heart.id}
          src="https://pngimg.com/uploads/heart/heart_PNG51335.png"
          className="heart absolute w-[25px] top-0"
          style={{
            left: `${heart.left}%`,
            animation: `fall ${heart.duration}s linear forwards`
          }}
          alt="heart"
        />
      ))}

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(110vh);
          }
        }
      `}</style>
    </>
  )
}

export default HeartsRain
