/** @jsx jsx */
import { jsx } from "@emotion/core"

interface SubtitleProps {
  siteName: string;
  className?: string;
}

const Subtitle = ({siteName, className}: SubtitleProps) => (
  <div className={className}>
    <h2>
        {`Did you really mean to go to ${siteName}?`}
    </h2>
  </div>
)

export default Subtitle
