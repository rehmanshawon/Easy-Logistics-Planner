import React from "react";
import styled, { keyframes, css } from "styled-components";

const zoom = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;

export const Backdrop = styled.div.attrs((p) => ({
  style: {
    zIndex: p.zIndex,
    display: p.show ? "block" : "none",
    background: p.backdrop ? "rgba(0, 0, 0, 0.1)" : "transparent",
  },
}))`
  position: fixed;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const ModalWrapper = styled.div.attrs((p) => ({
  style: {
    top: p.top + "px",
    left: p.left + "px",
    zIndex: p.zIndex,
    display: p.show ? "block" : "none",
  },
}))`
  position: fixed;
  max-width: 100%;
  height: auto;
  animation: ${(p) =>
    p.animate &&
    css`
      ${zoom} .2s
    `};
`;
const Modal = ({
  modal,
  show,
  position,
  zIndex,
  backdrop,
  animate,
  onClose,
  children,
}) => {
  return (
    <>
      <Backdrop
        show={show}
        zIndex={zIndex - 1}
        backdrop={backdrop}
        onClick={onClose}
      />
      <ModalWrapper
        ref={modal}
        show={show}
        top={position[1]}
        left={position[0]}
        zIndex={zIndex}
        animate={animate}
      >
        {children}
      </ModalWrapper>
    </>
  );
};

export default Modal;
