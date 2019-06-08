/** @jsx jsx */
import { css, jsx, keyframes } from "@emotion/core"
import { useEffect, useState } from "react"

import { Colors } from "../../utility/constants"
import Configuration from "./configuration"

interface CountDownClockProps {
  seconds: number;
  startingVal: number;
  isBig: boolean;
}

interface CountDownContainerProps {
  onReachZero: () => void;
}

const countDownClockCircleStyle = css({
    transform: "rotate(-90deg)",
    transformOrigin: "50% 50%",
})

const countDownClockCircleAnimationStyle = (circ: number, duration: number) => {
  // const offset = -1 * progress * circ
  const animation = keyframes({
    "0%": {
      "stroke-dashoffset": `${0}`,
    },
    "100%": {
      "stroke-dashoffset": (-1 * circ),
    }
  })

  return css({
    "stroke-dashoffset": `${0}`,
    "stroke-dasharray": `${circ} ${circ}`,
    "animation": `${duration}s linear ${animation}`
  })
}

const countDownClockText = css({
    fontFamily: "Roboto",
    fontSize: "78px",
    color: Colors.lightRed,
})

const bounce = keyframes({
  "0% 100%": {
    transform: "scale(1.0, 1.0)", opacity: 100,
  },
  "33%": {
    transform: "scale(1.05, 1.05)",
    opacity: 85,
  },
  "66%": {
    transform: "scale(0.97, 0.97)"
  }
})

const bigClockStyle = css({
  animation: `0.4s ease-out ${bounce} `
});

const bigTextStyle = css({
  animation: `0.4s ease-out 0.05s ${bounce} `
});

const svgStyle = css({
    position: "absolute",
    width: "100%",
    height: "100%",
    transition: "transform 0.1s ease-out",
})

const CountDownContainer = ({onReachZero}: CountDownContainerProps) => {
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
      seconds={timeRemaining}
      startingVal={Configuration.defaultTimeout}
      isBig={isBig}
    />
  )
}

const CountDownClock = ({seconds, startingVal, isBig}: CountDownClockProps) => {
    const length = 180
    const strokeWidth = 20
    const radius = (length / 2) - strokeWidth
    const circ = Math.PI * radius * 2

    return (
        <div css={{
            height: length,
            width: length,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
        }}>
          <div css={[countDownClockText, (isBig ? bigTextStyle : {})]}>
              {`${seconds}`}
          </div>
          <svg
            css={[svgStyle, (isBig ? bigClockStyle : {})]}
            width={length}
            height={length}
          >
            <circle
              cx={length / 2}
              cy={length / 2}
              fill="transparent"
              r={radius}
              stroke-width={5}
              stroke="rgba(255, 255, 255, 0.4)"
            />
            <circle
                cx={length / 2}
                cy={length / 2}
                stroke-width={strokeWidth}
                stroke={Colors.white}
                fill="transparent"
                strokeLinecap="round"
                r={radius}
                filter="drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.15))"
                css={[countDownClockCircleStyle, countDownClockCircleAnimationStyle(circ, startingVal)]}
              />
          </svg>
    </div>
  )
}

export default CountDownContainer
