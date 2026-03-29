import { useState, useEffect, useRef } from 'react'

const useTimer = (initialTime, onExpire, timerKey) => {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const onExpireRef = useRef(onExpire)

  useEffect(() => {
    onExpireRef.current = onExpire
  }, [onExpire])

  useEffect(() => {
    setTimeLeft(initialTime)
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval)
          onExpireRef.current()
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [timerKey, initialTime])

  return { timeLeft }
}

export default useTimer
