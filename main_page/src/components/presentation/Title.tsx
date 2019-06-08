/** @jsx jsx */
import { css, jsx } from "@emotion/core"

interface TitleProps {
  title: string;
  className?: string;
}

const titleStyle = css({
  h1: {
    fontSize: 152,
    lineHeight: "1px"
  },
})

const Title = ({title, className}: TitleProps) => {
  return (
    <div css={titleStyle} className={className}>
      <h1>{title}</h1>
    </div>
  )
}

export default Title
