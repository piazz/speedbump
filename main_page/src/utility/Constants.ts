/** @jsx jsx */
import { jsx, css } from "@emotion/core"

export const Colors = {
  white: "#FFFFFF",
  lightRed: "#FFA7A7",
  darkText1: "#432C5C",
  gradient1: "linear-gradient(254.66deg, #D942FF 28.2%, #9542FF 80.69%)",
  gradient2: "linear-gradient(180deg, rgba(150, 255, 230, 0.5) 0%, rgba(196, 196, 196, 0) 20%)",
}

export const Styles = {
  dropShadowed: css({
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  })
}

export const Storage = {
  STATE_KEY: "PAUSE_STATE"
}