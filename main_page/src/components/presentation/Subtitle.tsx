/** @jsx jsx */
import { jsx } from "@emotion/core"

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

export default Subtitle
