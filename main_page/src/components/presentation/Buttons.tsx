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

const goBackStyle = css({
  color: Colors.darkText1
})

const goForwardStyle = css({
  color: Colors.white
})

const disabledStyle = css({
  color: "rgba(255, 255, 255, 0.25)"
})

const buttonsStyle = css({
  padding: 45,
  borderRadius: 3,
  display: "flex",
  flexDirection: "row",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
})

const Buttons: React.FC<ButtonProps> = (props) => {
  return (
    <div css={buttonsStyle} className={props.className}>
        <TextButton
            enabled={true}
            enabledStyle={goBackStyle}
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
