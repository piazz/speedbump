/** @jsx jsx */
import { jsx, css } from "@emotion/core"

interface ITitleProps {
  title: string;
  className?: string;
}

const Title = ({title, className}: ITitleProps) => {
  return (
    <div>
      <h1 className={className}>{title}</h1>
    </div>
  )
}

export default Title