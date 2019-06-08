/** @jsx jsx */
import { css, jsx } from "@emotion/core"

import { Colors } from "../../utility/constants"

interface SubtitleProps {
  siteName: string;
  className?: string;
}

const subtitleStyle = css({
  h2: {
    fontSize: "42px",
    margin: "0px",
  },

  span: {
    color: Colors.white
  }
})

const Subtitle = ({siteName, className}: SubtitleProps) => (
  <div css={subtitleStyle} className={className}>
    <h2>
      Really go to <span>{siteName}?</span>
    </h2>
  </div>
)

export default Subtitle
