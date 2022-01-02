/** @jsx jsx */
import { css, jsx, keyframes } from "@emotion/core"
import React from "react"

import { Colors } from "../../utility/constants"
import CountDownClockContainer from "../container/CountDownClockContainer"
import Buttons from "./Buttons"
import Subtitle from "./Subtitle"
import Title from "./Title"

const appStyle = css({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100vh",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "bold",

  p: {
    fontSize: "24px",
    color: Colors.lightText1
  }
})

const circleEntryAnimation = keyframes({
  "0%": {
     transform: "scale(1.15)",
      opacity: 0
  },
  "25%": {
     opacity: 1
  },
  "30%": {
      transform: "scale(0.95)"
  },
  "60%": {
      transform: "scale(0.99)"
  },
  "100%": {
     transform: "scale(1)"
  },
})

const countDownStyle = css({
  position: "absolute",
  animation: `${circleEntryAnimation} 1s ease-out`
})

const textContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
})

const titleAnimation = keyframes({
  "0%": {
    opacity: 0,
    transform: "scale(0.95)"
  },

  "50%": {
    opacity: 0.8,
    transform: "scale(0.98)"
  },

  "100%": {
    opacity: 1,
    transform: "scale(1)"
  }
})

const titleStyle = css({
  color: Colors.white,
  animation: `${titleAnimation} 0.75s ease-out`
})

const baseSubtitleCSS = css({
  maxWidth: "400px"
})

interface AppProps {
  friendlyURL: string
  proceedEnabled: boolean
  didClickProceed: () => void
  didClickRetreat: () => void
  enableProceedButton: () => void
}

const versionTextStyle = css({
  position: "absolute",
  bottom: 10,
  right: 10,
  color: Colors.white,
  "font-size": "12px"
})

const VersionText = () => {
  return (
  <div css={versionTextStyle}>
    v{String(process.env.REACT_APP_VERSION)} ❤ ️piazza
  </div>)
}

const App: React.FC<AppProps> = (
  {
    friendlyURL,
    proceedEnabled,
    didClickProceed,
    didClickRetreat,
    enableProceedButton
  }) => {

    const computeAppCSS = () => {
      const backgroundCSS = proceedEnabled ?
        css({backgroundImage: Colors.background2}) :
        css({backgroundColor: Colors.background1})
      return [appStyle, backgroundCSS]
    }

    const computeSubtitleCSS = () => {
      const color = proceedEnabled ? Colors.lightText2 : Colors.lightText1
      return [baseSubtitleCSS, css({
        color
      })]
    }

    return (
      <div css={computeAppCSS()}>
        <CountDownClockContainer
          onReachZero={enableProceedButton}
          css={countDownStyle}
        />
        <div css={textContainerStyle}>
          <Title title="Pause."
            css={titleStyle}
          />
          <Subtitle
            siteName={friendlyURL}
            css={computeSubtitleCSS()}
          />
          <Buttons
            turnBackSelected={didClickRetreat}
            proceedSelected={didClickProceed}
            proceedEnabled={proceedEnabled}
          />
          <VersionText/ >
        </div>
        </div>
    )
}

export default App;
