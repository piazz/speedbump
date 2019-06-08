/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import React from "react"

import { Colors } from "../../utility/constants"
import TextButton from "./TextButton"

interface ButtonProps {
  turnBackSelected: () => void
  proceedSelected: () => void
  className?: string
  proceedEnabled: boolean
}

const goForwardStyle = css({
  color: Colors.white
})

const disabledStyle = css({
  color: Colors.disabledText1
})

const buttonsStyle = css({
  padding: 45,
  borderRadius: 3,
  display: "flex",
  flexDirection: "row",
})

const Buttons: React.FC<ButtonProps> = (props) => {
  const goBackStyle = () => {
    const color = props.proceedEnabled ? Colors.darkText2 : Colors.darkText1
    return css({
      color
    })
  }
  return (
    <div css={buttonsStyle} className={props.className}>
        <TextButton
            enabled={true}
            enabledStyle={goBackStyle()}
            disabledStyle={disabledStyle}
            onClick={props.turnBackSelected}
        >Nope.</TextButton>
        <TextButton
            enabled={props.proceedEnabled}
            enabledStyle={goForwardStyle}
            disabledStyle={disabledStyle}
            onClick={props.proceedSelected}
        >Yep.</TextButton>
    </div>
  )
}

export default Buttons
