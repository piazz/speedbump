/** @jsx jsx */
import { css, jsx } from "@emotion/core"
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

const countDownStyle = css({
  position: "absolute"
})

const buttonsStyle = css({
})

const textContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
})

const titleStyle = css({
  color: Colors.white
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
            css={buttonsStyle}
            turnBackSelected={didClickRetreat}
            proceedSelected={didClickProceed}
            proceedEnabled={proceedEnabled}
          />
        </div>
        </div>
    )
}

export default App;
