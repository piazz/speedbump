/** @jsx jsx */
import { css, jsx, keyframes } from "@emotion/core"

import { Colors } from "../../utility/constants"

interface CountDownClockProps {
  seconds: number
  startingVal: number
  isBig: boolean
  className?: string
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

const bounce = keyframes({
  "0% 100%": {
    transform: "scale(1.0)"
  },
  "25%": {
    transform: "scale(1.02)",
  },
  "66%": {
    transform: "scale(0.99)"
  },
})

const bigClockStyle = css({
  animation: `0.6s ease ${bounce} `
});

const svgStyle = css({
    position: "absolute",
    width: "100%",
    height: "100%",
    transition: "transform 0.1s ease-out",
})

const Constants = {
  diameter: 725,
  strokeWidthOuter: 20,
  strokeWidthInner: 10
}

const countDownClockStyle = css({
  height: Constants.diameter,
  width: Constants.diameter,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  pointerEvents: "none"
})

const radius = (Constants.diameter / 2) - Constants.strokeWidthOuter

const BackgroundCircle = ({ color }: {color: string}) => (
  <circle
    cx={Constants.diameter / 2}
    cy={Constants.diameter / 2}
    fill="transparent"
    r={radius}
    stroke-width={Constants.strokeWidthInner}
    stroke={color}
    css={countDownClockCircleStyle}
  />
)

const ForegroundCircle = ({startingVal}: {startingVal: number}) => {
  const circ = Math.PI * radius * 2
  return (
    <circle
        cx={Constants.diameter / 2}
        cy={Constants.diameter / 2}
        stroke-width={Constants.strokeWidthOuter}
        stroke={Colors.white}
        fill="transparent"
        strokeLinecap="round"
        r={radius}
        css={[countDownClockCircleStyle, countDownClockCircleAnimationStyle(circ, startingVal)]}
      />
  )
}

// const countDownClockText = css({
//     fontFamily: "Roboto",
//     fontSize: "78px",
//     color: Colors.lightRed,
// })

// const bigTextStyle = css({
//   animation: `0.4s ease-out 0.05s ${bounce} `
// });

// const Counter = ({ isBig, seconds }: { isBig: boolean, seconds: number }) => (
//   <div css={[countDownClockText, (isBig ? bigTextStyle : {})]}>
//       {`${seconds}`}
//   </div>
// )

const CountDownClock = ({seconds, startingVal, isBig, className}: CountDownClockProps) => {

    return (
        <div
          css={countDownClockStyle}
          className={className}
        >
          {/* <Counter seconds={seconds} isBig={isBig}/> */}
          <svg
            css={[svgStyle, (isBig ? bigClockStyle : {})]}
            width={Constants.diameter}
            height={Constants.diameter}
          >
            <BackgroundCircle
              color={ seconds > 0 ? Colors.timerBackground1 : Colors.timerBackground2 }/>
            { seconds > 0 ? <ForegroundCircle startingVal={startingVal} /> : null }
          </svg>
    </div>
  )
}

export default CountDownClock
