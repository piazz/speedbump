/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import CountDownContainer from "./CountDown"
import { Colors } from "../../utility/Constants"
import { jsx, css } from "@emotion/core"
import Buttons from "./Buttons"
import Title from "./Title"
import Subtitle from "./Subtitle"

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

interface ILocalState {
  redirectURL: string;
  id: number;
}

const STATE_KEY = "PAUSE_STATE"
let isUnloading = false

const App: React.FC = () => {
  const [localState, setLocalState] = useState({
    redirectURL: "",
    id: -1,
  } as ILocalState)

  const [isProceedEnabled, setIsProceedEnabled] = useState(false)

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      isUnloading = true
    })
  }, [])

  function proceed() {
    browser.runtime.sendMessage({
      type: "PROCEED",
      id: localState.id
    })
  }
  
  function enableButton() {
    setIsProceedEnabled(true)
  }

  function retreat() {
    history.back()
    setTimeout(function() {
      if (!isUnloading) {
        sendRetreatMessage()
      }
    }, 1000)
  }

  function sendRetreatMessage() {
    browser.runtime.sendMessage({
      type: "RETREAT",
      id: localState.id
    })
  }

  function shortenRedirectURL(url: string) {
    const prefixRemoved = url.replace(/^(.*:\/\/)(www\.)/m, "")
    const suffixRemoved = prefixRemoved.replace(/\..*$/m, "")
    return suffixRemoved
  }

  return (
    <div css={appStyle}>
      <div css={backgroundImageStyle} />
      <div css={backgroundBarStyle}>
        <Buttons 
          css={buttonsStyle}
          turnBackSelected={retreat}
          proceedSelected={proceed}
          proceedEnabled={isProceedEnabled}
        />
      </div>
      <div css={containerStyle}>
        <CountDownContainer 
          onReachZero={enableButton}
        />
        <div>
          <Title title="Pause." />
          <Subtitle 
            siteName={shortenRedirectURL(localState.redirectURL)}
            css={{maxWidth: "400px", color: Colors.darkText1}}
          />
        </div>
      </div>
    </div>
  )
}

export default App;
