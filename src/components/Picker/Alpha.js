import React, { useRef, useEffect } from "react"
import styled from "styled-components"
import throttle from "lodash.throttle"
import Svg from "./Svg"
import usePaintAlpha from "./usePaintAlpha"
import config from "./config"

const { squareSize, barSize, delay } = config

export const AlphaWrapper = styled.div`
  align-self: flex-end;
  position: relative;
  width: ${squareSize + "px"};
  height: ${barSize + "px"};
  cursor: ew-resize;
`

export const Canvas = styled.canvas.attrs(p => ({
  width: squareSize,
  height: barSize
}))``

export const Handle = styled.div.attrs(p => ({
  style: {
    left: p.left + "px",
    transition: p.animate ? "left .2s ease-out" : "0s"
  }
}))`
  position: absolute;
  top: 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${barSize}px;
  height: ${barSize}px;
  pointer-events: none;
  svg {
    width: 100%;
    height: 100%;
  }
`

const Alpha = ({
  hue,
  alphaX,
  offsetLeft,
  animate,
  setAlphaX,
  setAlpha,
  setAnimate
}) => {
  const bar = useRef(null)
  const canvas = useRef(null)

  usePaintAlpha(canvas, hue)

  useEffect(() => {
    function computePosition(e) {
      return Math.max(
        barSize / -2,
        Math.min(e.clientX - offsetLeft - barSize + 5, squareSize - barSize / 2)
      )
    }

    function computeAlpha(x) {
      return Math.round((x + barSize / 2) * (100 / squareSize))
    }

    const onMouseMove = throttle(e => {
      const x = computePosition(e)
      const hue = computeAlpha(x)

      setAlphaX(x)
      setAlpha(hue)
    }, delay)

    function onMouseUp(e) {
      const x = computePosition(e)
      const hue = computeAlpha(x)
      setAlphaX(x)
      setAlpha(hue)
      document.body.removeEventListener("mousemove", onMouseMove)
      document.body.removeEventListener("mouseup", onMouseUp)
    }

    function onMouseDown(e) {
      setAnimate(false)
      document.body.addEventListener("mousemove", onMouseMove)
      document.body.addEventListener("mouseup", onMouseUp)
    }

    const barRef = bar.current
    barRef.addEventListener("mousedown", onMouseDown)

    return () => {
      barRef.removeEventListener("mousedown", onMouseDown)
      document.body.removeEventListener("mousemove", onMouseMove)
      document.body.removeEventListener("mouseup", onMouseUp)
    }
  }, [offsetLeft, setAlpha, setAlphaX, setAnimate])

  return (
    <AlphaWrapper ref={bar}>
      <Handle left={alphaX} animate={animate}>
        <Svg name="handle" />
      </Handle>
      <Canvas ref={canvas} />
    </AlphaWrapper>
  )
}

export default Alpha
