/** @jsx jsx */
import { css, jsx, keyframes, SerializedStyles } from "@emotion/core"
import { useState } from "react"

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

const clickAnimation = keyframes({
    "100%": {
        transform: "scale(1.12)"
    },

    "60%": {
        transform: "scale(1.15)"
    },

    "0%": {
        transform: "scale(0.93)"
    },

    "15%": {
        transform: "scale(0.9)"
    },
})

const clickCSS = css({
    animation: `${clickAnimation} 0.25s ease-out`
})

const hoverCSS = css({
    transform: "scale(1.12)",
})

const baseStyle = css({
    transition: "transform 0.15s",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "84px",
    lineHeight: "98px",
    transform: "scale(1.0)"

})

const TextButton = ({ enabled, enabledStyle, disabledStyle, onClick, children}: TextButtonProps) => {
    const [isClickAnimationPlaying, setIsClickAnimationPlaying] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    function handleClick() {
        if (enabled) {
            setIsClickAnimationPlaying(true)
            onClick()
        }
    }

    function computeCSS() {
        const enabledOrDisabled =  enabled ? enabledStyle : disabledStyle
        const cursorStyle = enabled ? css({cursor: "pointer"}) : css({pointerEvents: "none"})
        const clickStyle = isClickAnimationPlaying ? clickCSS : null
        const hoverStyle = isHovering ? hoverCSS : null
        return [baseStyle, enabledOrDisabled, cursorStyle, containerCSS, clickStyle, hoverStyle]
    }

    function onAnimationEnd() {
        setIsClickAnimationPlaying(false)
    }

    return (
        <div
            onClick={handleClick}
            css={computeCSS()}
            onAnimationEnd={onAnimationEnd}
            onMouseOver={() => {setIsHovering(true)}}
            onMouseOut={() => {setIsHovering(false)}}
        >
            {children}
        </div>
    )
}

export default TextButton
