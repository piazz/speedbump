/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import CountDownContainer from "./components/CountDown"
import { Colors } from "./components/css"
import { jsx, css } from "@emotion/core"
import Mountain from "../src/assets/mountains.png"

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
    color: Colors.lightRed,
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
  marginTop: "325px"
})

interface ILocalState {
  redirectURL: string;
  id: number;
}
const STATE_KEY = "PAUSE_STATE"
let isUnloading = false

const App = () => {
  console.log("Repainting")
  const [localState, setLocalState] = useState({
    redirectURL: "",
    id: -1,
  } as ILocalState)

  useEffect(() => {
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

  return (
    <div css={appStyle}>
      <div css={backgroundImageStyle} />
      <div css={backgroundBarStyle}>
        <Buttons css={buttonsStyle}
          turnBackSelected={retreat}
          proceedSelected={proceed}
        />
      </div>
      <div css={containerStyle}>
        <CountDownContainer 
          onReachZero={proceed}
        />
        <div>
          <Title title="Pause." />
          <Subtitle 
            siteName={localState.redirectURL}
            css={{maxWidth: "400px"}}
          />
        </div>
      </div>
    </div>
  );
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

interface IButtonsProps {
  turnBackSelected: () => void;
  proceedSelected: () => void;
  className?: string;
}

interface ButtonsState {
  goBackButtons: Array<ButtonState>
  proceedButtons: Array<ButtonState>
}

interface ButtonState {
  id: string;
  isSelected: boolean;
  isVisible: boolean;
  text: string;
}

// TODO: Parameterize this
const defaultButtonState: ButtonsState = {
  proceedButtons: [
    {
      id: "1",
      isSelected: false,
      isVisible: true,
      text: "👉 Yep."
    },
    {
      id: "2",
      isSelected: false,
      isVisible: false,
      text: "👍 Really!"
    },
    {
      id: "3",
      isSelected: false,
      isVisible: false,
      text: "👍 I promise."
    }
  ],
  goBackButtons: [
    {
      id: "1",
      isSelected: false, 
      isVisible: true,
      text: "👈 Nah."
    },
  ],
}

const Buttons = (props: IButtonsProps) => {
  const [buttonState, setButtonState] = useState(defaultButtonState)

  function handleGoBackClick() {
    const newState: ButtonsState = {...buttonState,
                        goBackButtons: [{
                          id: buttonState.goBackButtons[0].id,
                          isSelected: !buttonState.goBackButtons[0].isSelected,
                          isVisible: buttonState.goBackButtons[0].isVisible,
                          text: buttonState.goBackButtons[0].text
                        }]
                      }
    setNewState(newState)
  }

  // TODO: this algorithm could def be refactored
  function handleProceedClick(id: string) {
    let newState = {...buttonState}
    for (let i = 0; i < newState.proceedButtons.length; i++) {
      let button = newState.proceedButtons[i]
      if (button.id === id) {
        button.isSelected = !button.isSelected

        // If still room, set the next buttons visibility
        if (i < newState.proceedButtons.length - 1) {
          const selectedState = button.isSelected

          // If we just selected it, make the next one visible
          if (selectedState) {
            let nextButton = newState.proceedButtons[i + 1]
            nextButton.isVisible = button.isSelected
          } else {
            // If we just unselected it, we have to make ALL the next buttons invisible
            for (let j = i + 1; j < newState.proceedButtons.length; j++) {
              newState.proceedButtons[j].isVisible = false
              newState.proceedButtons[j].isSelected = false
            }
          }
        }
        break
      }
    }

    setNewState(newState)
  }

  function setNewState(state: ButtonsState) {
    // Just 1 back has to be selected
    function goBackSelected(): boolean {
      return state.goBackButtons.reduce((acc: boolean, cur) => (
        acc || cur.isSelected
      ), false)
    }

    // All proceed have to be selected
    function proceedSelected(): boolean {
      return state.proceedButtons.reduce((acc: boolean, cur) => (
        acc && cur.isSelected
      ), state.proceedButtons[0].isSelected)
    }
    
    setButtonState(state)

    if (goBackSelected()) {
      props.turnBackSelected()
    } else if (proceedSelected()) {
      props.proceedSelected()
    }
  }

  // TODO: Could extract some sort of buttonState -> button mapper func
  return (
    <div css={buttonColumnsContainer} className={props.className}>
      <div css={buttonColumnStyle}>
        {
          buttonState.goBackButtons.map(e => ( e.isVisible ? 
            <ButtonHolder 
              onClick={handleGoBackClick}
              isClicked={e.isSelected}
              text={e.text}
              key={e.id}
            /> : null
          ))
        }
      </div>
      <div css={buttonColumnStyle}>
        {
          buttonState.proceedButtons.map(e => ( e.isVisible ? 
            <ButtonHolder 
              onClick={() => { handleProceedClick(e.id)}}
              isClicked={e.isSelected}
              text={e.text}
              key={e.id}
            /> : null
          ))
        }
      </div>
    </div>
  )
}

const buttonColumnStyle = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "start"
})

const buttonColumnsContainer = css({
  display: "flex",
  flexDirection: "row",
})

interface IButtonHolderProps {
  onClick: () => void;
  isClicked: boolean;
  text: string;
}

const buttonHolderStyle = css({
  display: "flex",
  flexDirection: "row",
  fontStyle: "italic",
  alignItems: "center",
  justifyContent: "space-between"
})

const ButtonHolder = (props: IButtonHolderProps) => {
  return (
    <div css={buttonHolderStyle} >
      <Button 
        onClick={props.onClick}
        isClicked={props.isClicked}
      />
      <p>{props.text}</p>
    </div>
  )
}

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
}

const Button = ({onClick, isClicked}: IButtonProps) => {
  return (
    <div css={buttonStyle} onClick={onClick}>{ isClicked ? "X" : null }</div>
  )
}

export default App;
