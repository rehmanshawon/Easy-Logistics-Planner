import React, { useEffect } from "react"
import config from "./config"

const { squareSize, barSize, checkerSize, checkerFill } = config

const usePaintAlpha = (canvas, hue) => {
  useEffect(() => {
    const ctx = canvas.current.getContext("2d")
    ctx.clearRect(0, 0, squareSize, barSize)

    const rows = Math.round(barSize / checkerSize)
    const cols = Math.round(squareSize / checkerSize)
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols / 2; j++) {
        const x = j * checkerSize * 2 + (i % 2 ? 0 : checkerSize)
        const y = i * checkerSize
        ctx.rect(x, y, checkerSize, checkerSize)
      }
    }
    ctx.fillStyle = checkerFill
    ctx.fill()

    const gradient = ctx.createLinearGradient(0, 0, squareSize, 0)
    gradient.addColorStop(0, `hsla(${hue}, 100%, 50%, 0)`)
    gradient.addColorStop(1, `hsla(${hue}, 100%, 50%, 1)`)
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, squareSize, barSize)
  }, [canvas, hue])
}

export default usePaintAlpha
