/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useEffect, useState } from "react"

import Configuration from "../presentation/configuration"
import CountDownClock from "../presentation/CountDownClock"

interface CountDownContainerProps {
  className?: string
  onReachZero: () => void
}

const CountDownClockContainer = ({onReachZero, className}: CountDownContainerProps) => {
  const [timeRemaining, setTimeRemaining] = useState(Configuration.defaultTimeout)
  const [isBig, setIsBig] = useState(false)
  const SEC_TO_MSEC = 1000;

  const pulse = () => {
    setIsBig(true)
    setTimeout(() => {
      setIsBig(false);
    }, 0.8 * SEC_TO_MSEC)
  }

  useEffect(() => {
    const decrementCount = () => {
      if (timeRemaining <= 0) {
        return;
      }

      if (timeRemaining === 1) {
        onReachZero()
      }

      pulse()
      setTimeRemaining(timeRemaining - 1)
    }

    setTimeout(decrementCount, 1 * SEC_TO_MSEC)
  }, [timeRemaining])

  return (
    <CountDownClock
      className={className}
      seconds={timeRemaining}
      startingVal={Configuration.defaultTimeout}
      isBig={isBig}
    />
  )
}

export default CountDownClockContainer
