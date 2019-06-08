/** @jsx jsx */
import { css } from "@emotion/core"

export const Colors = {
  white: "#FFFFFF",
  lightRed: "#FFA7A7",
  lightText1: "#265C8D",
  lightText2: "#A23A85",
  darkText1: "#093E6E",
  darkText2: "#7A2463",
  disabledText1: "rgba(72, 85, 130, 0.25)",
  gradient1: "linear-gradient(254.66deg, #D942FF 28.2%, #9542FF 80.69%)",
  gradient2: "linear-gradient(180deg, rgba(150, 255, 230, 0.5) 0%, rgba(196, 196, 196, 0) 20%)",
  background1: "#2BCBFE",
  background2: "linear-gradient(180deg, #F27FD1 0%, #FF658A 100%)",
  timerBackground1: "#14A5D3",
  timerBackground2: "rgba(179, 58, 142, 0.2)"
}

export const Styles = {
  dropShadowed: css({
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
  })
}

export const StorageConstants = {
  STATE_KEY: "PAUSE_STATE"
}
