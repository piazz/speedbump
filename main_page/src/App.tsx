/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import CountDownContainer from "./components/CountDown"
import { Colors } from "./components/css"
import { jsx, css } from "@emotion/core"
import Mountain from "../src/assets/mountains.png"
import Buttons from "./components/Buttons"

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

  background: "linear-gradient(180deg, rgba(150, 255, 230, 0.5) 0%, rgba(196, 196, 196, 0) 20%)",
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
    color: Colors.darkPurple,
    fontSize: "24px"
  }
})

const backgroundImageStyle = css({
  backgroundImage: `url(${Mountain})`,
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
  background: "linear-gradient(254.66deg, #D942FF 28.2%, #9542FF 80.69%)",
  position: "absolute",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
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
    // If we're in dev mode, there's no extension, no so browser.
    if (process.env.NODE_ENV !== "production" ) {
      console.log("App running standalone without extension")
      return
    }

    browser.storage.local.get(STATE_KEY).then(state => {
      setLocalState(state[STATE_KEY])
      console.log(state)
    })
  }, [])

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
            css={{maxWidth: "400px", color: Colors.purpleText}}
          />
        </div>
      </div>
    </div>
  )
}

interface ITitleProps {
  title: string;
}

const Title = ({title}: ITitleProps) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}

interface ISubtitleProps {
  siteName: string;
  className?: string;
}

const Subtitle = ({siteName, className}: ISubtitleProps) => (
  <div className={className}>
    <h2>
        {`Did you really mean to go to ${siteName}?`}
    </h2>
  </div>
)

const buttonStyle = css({
  height: 25,
  width: 25,
  margin: "10px",
  border: `4px solid ${Colors.lightPurple}`,
  backgroundColor: Colors.white
})

interface IButtonProps {
  onClick: () => void;
  isClicked: boolean;
  enabled: boolean;
}

const Button = ({onClick, isClicked, enabled}: IButtonProps) => {
  function handleClick(): void {
    enabled ? onClick() : () => {}
  }

  return (
    <div css={buttonStyle} onClick={handleClick}>{ isClicked ? "X" : null }</div>
  )
}

export default App;
