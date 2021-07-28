import { useState, useEffect } from 'react'
import { calculateTimeLeft } from 'utils/timer'

export interface TimeLeft {
  [key: string]: number
}
export const useCountDownTimer = (expireTimestamp: number) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(expireTimestamp))
  const [updater, setUpdater] = useState<boolean>(false)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      let time = calculateTimeLeft(expireTimestamp)

      if (Object.keys(time).length > 0) setUpdater(!updater)

      setTimeLeft(calculateTimeLeft(expireTimestamp))
    }, 1000)

    return () => clearTimeout(timer)
  }, [updater])

  return timeLeft
}
