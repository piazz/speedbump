/** @jsx jsx */
import { css, jsx, SerializedStyles } from "@emotion/core"

interface TextButtonProps {
    enabled: boolean
    className?: string
    enabledStyle: SerializedStyles
    disabledStyle: SerializedStyles
    onClick: () => void;
    children: string
}

const containerCSS = css({
    margin: "0px 20px"
})

const baseStyle = css({
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "84px",
    lineHeight: "98px",
})

const TextButton = ({ enabled, enabledStyle, disabledStyle, onClick, children}: TextButtonProps) => {
    function handleClick() {
        if (enabled) {
            onClick()
        }
    }

    function computeCSS() {
        const enabledOrDisabled =  enabled ? enabledStyle : disabledStyle
        const cursorStyle = enabled ? css({cursor: "pointer"}) : css({pointerEvents: "none"})
        return [baseStyle, enabledOrDisabled, cursorStyle, containerCSS]
    }

    return (
        <div onClick={handleClick} css={computeCSS()} >
            {children}
        </div>
    )
}

export default TextButton
