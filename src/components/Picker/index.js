import React from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"
import Picker from "./Picker"
import { GlobalStyle } from "./GlobalStyle"

const AppWrapper = styled.div`
  height: 100vh;
  padding: 20px;
`

function App() {
  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <Picker />
      </AppWrapper>
    </>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
