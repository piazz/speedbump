/** @jsx jsx */
import React from "react"
import TextButton from "./TextButton"
import { jsx, css } from "@emotion/core"
import { Colors } from "./css";

interface IButtonsProps {
  turnBackSelected: () => void
  proceedSelected: () => void
  className?: string
  proceedEnabled: boolean
}

const goBackStyle = css({
  color: Colors.purpleText
})

const goForwardStyle = css({
  color: Colors.white
})

const disabledStyle = css({
  color: "rgba(255, 255, 255, 0.25)"
})

const buttonsStyle = css({
  padding: 45,
  background: "linear-gradient(180deg, #FF8A8A 0%, #FA6D6D 100%)",
  borderRadius: 3,
  display: "flex",
  flexDirection: "row",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
})

const Buttons: React.FC<IButtonsProps> = (props) => {
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