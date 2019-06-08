/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import React from "react"

import { Colors } from "../../utility/constants"
import Buttons from "./Buttons"
import CountDownContainer from "./CountDown"
import Subtitle from "./Subtitle"
import Title from "./Title"

const appStyle = css({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100vh",
  backgroundColor: Colors.white,
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "bold",

  background: Colors.gradient2,
  h1: {
    color: "white",
    fontSize: "144px",
    textShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
    lineHeight: "169px",
    margin: "0px"
  },

  h2: {
    fontSize: "42px",
    margin: "0px"
  },

  p: {
    fontSize: "24px",
    color: Colors.darkText1
  }
})

const backgroundImageStyle = css({
  opacity: 0.5,
  position: "absolute",
  backgroundRepeat: "no-repeat",
  backgroundSize: "100%",
  width: "100vw",
  height: "100vh",
})

const containerStyle = css({
  display: "flex",
  justifyContent: "center",
  zIndex: 0,
  alignItems: "center",
})

const backgroundBarStyle = css({
  height: 300,
  width: "100%",
  background: Colors.gradient1,
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "start",
  flexDirection: "column"
})

const buttonsStyle = css({
  marginTop: 250
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

  return (
    <div css={appStyle}>
      <div css={backgroundImageStyle} />
      <div css={backgroundBarStyle}>
        <Buttons
          css={buttonsStyle}
          turnBackSelected={didClickRetreat}
          proceedSelected={didClickProceed}
          proceedEnabled={proceedEnabled}
        />
      </div>
      <div css={containerStyle}>
        <CountDownContainer
          onReachZero={enableProceedButton}
        />
        <div>
          <Title title="Pause." />
          <Subtitle
            siteName={friendlyURL}
            css={{maxWidth: "400px", color: Colors.darkText1}}
          />
        </div>
      </div>
    </div>
  )
}

export default App;
