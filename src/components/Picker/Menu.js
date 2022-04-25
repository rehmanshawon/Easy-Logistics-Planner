import React from "react"
import Svg from "./Svg"
import styled from "styled-components"

export const MenuWrapper = styled.div`
  width: 120px;
  height: 100px;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  background: #ffffff;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.3);
`

export const MenuItem = styled.div`
  display: grid;
  grid-template-columns: 25px 1fr;
  align-items: center;
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
  span {
    width: 100%;
    height: 100%;
    display: grid;
    align-items: center;
    font-size: 10px;
  }
  svg {
    justify-self: center;
    width: 12px;
    height: 12px;
    fill: #333333;
  }
`

const Menu = ({ resetColors }) => {
  return (
    <MenuWrapper>
      <MenuItem onClick={() => {}}>
        <span>
          <Svg name="add" />
        </span>
        <span>Load Colors</span>
      </MenuItem>
      <MenuItem onClick={() => {}}>
        <span>
          <Svg name="add" />
        </span>
        <span>Save Colors</span>
      </MenuItem>
      <MenuItem onClick={resetColors}>
        <span>
          <Svg name="add" />
        </span>
        <span>Reset Colors</span>
      </MenuItem>
    </MenuWrapper>
  )
}

export default Menu
