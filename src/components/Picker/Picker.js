import React, { useState, useRef, useEffect, forwardRef } from "react";
import styled from "styled-components";
import {
  parseHSL,
  convertHSLToRGB,
  copyToClipboard,
  RGBAToHSLA,
} from "./utils";
import Modal from "./Modal";
import Hue from "./Hue";
import Square from "./Square";
import Input from "./Input";
import Alpha from "./Alpha";
import Svg from "./Svg";
import Menu from "./Menu";
import config from "./config";
import imgNone from "./../../images/no.png";

const defaultColors = Array.from({ length: 10 }, () => "");

const { squareSize, barSize, crossSize, inputSize, outputSize, colorsSize } =
  config;

export const PickerWrapper = styled.div`
  user-select: none;
`;

export const SwatchWrapper = styled.div.attrs((p) => ({
  style: {
    backgroundColor: p.color,
    backgroundImage: p.color !== "nill" ? "none" : `url(${p.bg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}))`
  width: 50px;
  height: 20px;
  display: inline-block;
  cursor: pointer;
`;

export const PickerOuter = styled.div`
  width: ${squareSize + 20}px;
  display: grid;
  border-radius: 2px;
  background: #ffffff;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.3);
`;

export const PickerInner = styled.div.attrs((p) => ({
  style: {
    gridTemplateRows: p.showColors
      ? `${squareSize + 20}px ${barSize}px ${
          barSize + 10
        }px ${inputSize}px ${outputSize}px ${colorsSize}px`
      : `${squareSize + 20}px ${barSize}px ${
          barSize + 10
        }px ${inputSize}px ${outputSize}px`,
  },
}))`
  display: grid;
  align-items: center;
  justify-items: center;
`;

export const Inputs = styled.div`
  align-self: flex-end;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  justify-items: center;
  padding-left: 5px;
  padding-right: 5px;
`;

export const Outputs = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  justify-items: center;
  padding-left: 10px;
  padding-right: 10px;
  .arrow {
    width: 100%;
    height: 100%;
    display: grid;
    align-items: center;
    justify-items: center;
    &:hover svg {
      fill: #333333;
    }
    svg {
      width: 12px;
      height: 12px;
      fill: #606060;
    }
  }
  .noColor {
    width: 100%;
    height: 100%;
    display: grid;
    align-items: center;
    justify-items: center;
    &:hover svg {
      fill: #dd0000;
    }
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const OutputText = styled.div`
  align-self: center;
  width: 100%;
  display: grid;
  grid-template-columns: 20px 1fr;
  align-items: center;
  border: 1px solid #ddd;
  .cycle {
    display: grid;
    align-items: center;
    justify-items: center;
    svg {
      width: 12px;
      height: 12px;
      fill: #606060;
    }
  }
  input {
    justify-self: flex-start;
    width: 100%;
    text-align: center;
    font-family: monospace;
    font-size: 15px;
    outline: 0;
    border: 0;
    padding: 4px 2px;
    cursor: auto;
    &::selection {
      background: transparent;
    }
  }
`;

export const Colors = styled.div`
  width: 100%;
  height: ${colorsSize}px;
  display: ${(p) => (p.show ? "grid" : "none")};
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 1fr 1fr;
  align-items: center;
  justify-items: start;
  padding-bottom: 5px;
  padding-right: 10px;
  padding-left: 10px;
  button {
    font-size: 11px;
    width: 50px;
    height: 28px;
  }
`;

export const Color = styled.div`
  width: 30px;
  height: 30px;
  background: ${(p) => p.color || "#fafafa"};
  border: 1px solid #ddd;
`;

export const ColorAction = styled.div.attrs((p) => ({
  style: {
    gridColumn: p.col,
    gridRow: p.row,
  },
}))`
  width: 25px;
  height: 25px;
  display: grid;
  align-items: center;
  justify-items: center;
  font-size: 14px;
  svg {
    width: 12px;
    height: 12px;
    fill: #606060;
  }
`;

function computeHueX(h) {
  return Math.round((squareSize / 360) * h - barSize / 2);
}

function computeSquareXY(s, l) {
  const t = (s * (l < 50 ? l : 100 - l)) / 100;
  const s1 = Math.round((200 * t) / (l + t)) | 0;
  const b1 = Math.round(t + l);
  const x = (squareSize / 100) * s1 - crossSize / 2;
  const y = squareSize - (squareSize / 100) * b1 - crossSize / 2;
  return [x, y];
}

function computeAlphaX(a) {
  return Math.round((squareSize / 100) * a - barSize / 2);
}

const Picker = forwardRef(({ swatchStyle, setPickerColor, type }, ref) => {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState([0, 0]);
  const [hue, setHue] = useState(180);
  const [hueX, setHueX] = useState(() => squareSize / 2 - barSize / 2);
  const [square, setSquare] = useState([0, type === "Stroke" ? 0 : 100]);
  const [squareXY, setSquareXY] = useState(() => [
    squareSize - crossSize / 2,
    crossSize / -2,
  ]);
  const [alpha, setAlpha] = useState(100);
  const [alphaX, setAlphaX] = useState(squareSize - barSize / 2);
  const [offsetTop, setOffsetTop] = useState(0);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [color, setColor] = useState(
    type === "Stroke" ? `hsla(180, 0%, 0%, 1)` : `hsla(180, 0%, 100%, 1)`
  );
  const [outputFormat, setOutputFormat] = useState("hsla");
  const [copied, setCopied] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [colors, setColors] = useState(defaultColors);
  const [showMenu, setShowMenu] = useState(false);
  const [positionMenu, setPositionMenu] = useState([0, 0]);
  const [swatchBG, setSwatchBG] = useState("");
  const modalPicker = useRef(null);
  const modalMenu = useRef(null);
  const modalSwatch = useRef(null);
  const setActiveStrokeColor = (strokeColor) => {
    //console.log("calling child fn... params are: ", strokeColor);
    if (strokeColor !== "nill") {
      let c = RGBAToHSLA(strokeColor);
      setColor(c);
      let [h, s, l, a] = parseHSL(c);
      onHueChange(h);
      setSquare([s, l]);
      setSquareXY(computeSquareXY(s, l));
      onAlphaChange(a * 100);
      //console.log(hs);
    } else {
      setColor("nill");
    }
  };

  ref.current = setActiveStrokeColor;
  useEffect(() => {
    let initalColors =
      JSON.parse(window.localStorage.getItem(type + "_colors")) ||
      defaultColors;
    setColors(initalColors);
    //activeObjectStrokeRef.current = changeColor;
  }, [type]);

  useEffect(() => {
    window.localStorage.setItem(type + "_colors", JSON.stringify(colors));
  }, [type, colors]);

  useEffect(() => {
    function onResize() {
      const { innerWidth, innerHeight } = window;
      const x = innerWidth / 2 - (squareSize + 20) / 2;
      const y =
        innerHeight / 2 -
        (squareSize +
          20 +
          barSize +
          barSize +
          5 +
          inputSize +
          outputSize +
          colorsSize) /
          2;
      let px = modalSwatch.current.offsetLeft;
      let py = modalSwatch.current.offsetTop + 25;
      setPosition([px, py]);
      setOffsetTop(modalPicker.current.offsetTop);
      setOffsetLeft(modalPicker.current.offsetLeft);
    }
    if (modalPicker.current) {
      onResize();
      window.addEventListener("resize", onResize);
    } else {
      window.removeEventListener("resize", onResize);
    }

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [show]);

  useEffect(() => {
    let id;
    if (copied) {
      id = setTimeout(() => setCopied(false), 4000);
    }
    return () => {
      clearTimeout(id);
    };
  }, [copied]);

  useEffect(() => {
    setColor(`hsla(${hue}, ${square[0]}%, ${square[1]}%, ${alpha / 100})`);
    let c = `hsla(${hue}, ${square[0]}%, ${square[1]}%, ${alpha / 100})`;
    setPickerColor(convertHSLToRGB(parseHSL(c)).rgba);
    //let { red, green, blue, a } = convertHSLToRGB(parseHSL(c));
    //console.log(red, green, blue, a);
  }, [hue, square, alpha, setPickerColor]);

  function onHueChange(n) {
    setAnimate(true);
    setHue(n);
    setHueX(computeHueX(n));
    let c = `hsla(${n}, ${square[0]}%, ${square[1]}%, ${alpha / 100})`;
    setPickerColor(convertHSLToRGB(parseHSL(c)).rgba);
  }

  function onSaturationChange(n) {
    setAnimate(true);
    setSquare([n, square[1]]);
    setSquareXY(computeSquareXY(n, square[1]));
    let c = `hsla(${hue}, ${n}%, ${square[1]}%, ${alpha / 100})`;
    setPickerColor(convertHSLToRGB(parseHSL(c)).rgba);
  }

  function onLightnessChange(n) {
    setAnimate(true);
    setSquare([square[0], n]);
    setSquareXY(computeSquareXY(square[0], n));
    let c = `hsla(${hue}, ${square[0]}%, ${n}%, ${alpha / 100})`;
    setPickerColor(convertHSLToRGB(parseHSL(c)).rgba);
  }

  function onAlphaChange(n) {
    setAnimate(true);
    setAlpha(n);
    setAlphaX(computeAlphaX(n));
    let c = `hsla(${hue}, ${square[0]}%, ${square[1]}%, ${n})`;
    setPickerColor(convertHSLToRGB(parseHSL(c)).rgba);
  }

  function addColor() {
    let index = colors.findIndex((c) => !c);
    if (index !== -1) {
      let newColors = colors.slice();
      newColors[index] = color;
      setColors(newColors);
    }
  }

  function removeColor(e, i) {
    e.preventDefault();
    let shouldRemove = window.confirm("Delete color?");
    if (shouldRemove) {
      let newColors = colors.slice();
      newColors.splice(i, 1, "");
      setColors(newColors);
    }
  }

  function resetColors() {
    let shouldReset = window.confirm("Delete all colors?");
    if (shouldReset) {
      setColors(defaultColors);
      setShowMenu(false);
    }
  }

  function onColorClick(c) {
    if (c) {
      setPickerColor(convertHSLToRGB(parseHSL(c)).rgba);
      let [h, s, l, a] = parseHSL(c);
      onHueChange(h);
      setSquare([s, l]);
      setSquareXY(computeSquareXY(s, l));
      onAlphaChange(a * 100);
      copyToClipboard(formatOutput(c));
      setCopied(true);
    }
  }

  function formatOutput(c) {
    if (outputFormat === "hsla") return c;
    else if (outputFormat === "rgba") return convertHSLToRGB(parseHSL(c)).rgba;
    else if (outputFormat === "hexa") return convertHSLToRGB(parseHSL(c)).hexa;
  }

  function cycleFormat() {
    setOutputFormat((curr) =>
      curr === "hsla" ? "rgba" : curr === "rgba" ? "hexa" : "hsla"
    );
  }

  function openMenu(e) {
    const { clientX, clientY } = e;
    setPositionMenu([clientX + 20, clientY - 100]);
    setShowMenu(true);
  }

  return (
    <>
      <PickerWrapper color={color}>
        <SwatchWrapper
          styles={swatchStyle}
          ref={modalSwatch}
          color={color}
          bg={swatchBG}
          onClick={() => setShow(true)}
        />
        <Modal
          modal={modalPicker}
          show={show}
          position={position}
          zIndex={2}
          backdrop={true}
          animate={true}
          onClose={() => setShow(false)}
        >
          <PickerOuter>
            <PickerInner showColors={showColors}>
              <Square
                hue={hue}
                squareXY={squareXY}
                offsetTop={offsetTop}
                offsetLeft={offsetLeft}
                animate={animate}
                setSquare={setSquare}
                setSquareXY={setSquareXY}
                setAnimate={setAnimate}
              />
              <Hue
                hueX={hueX}
                offsetLeft={offsetLeft}
                animate={animate}
                setHueX={setHueX}
                setHue={setHue}
                setAnimate={setAnimate}
              />
              <Alpha
                hue={hue}
                alphaX={alphaX}
                offsetLeft={offsetLeft}
                animate={animate}
                setAlpha={setAlpha}
                setAlphaX={setAlphaX}
                setAnimate={setAnimate}
              />
              <Inputs>
                <Input
                  label="H"
                  value={hue}
                  min={0}
                  max={360}
                  defaultValue={180}
                  setValue={onHueChange}
                />
                <Input
                  label="S"
                  value={square[0]}
                  min={0}
                  max={100}
                  defaultValue={100}
                  setValue={onSaturationChange}
                />
                <Input
                  label="L"
                  value={square[1]}
                  min={0}
                  max={100}
                  defaultValue={100}
                  setValue={onLightnessChange}
                />
                <Input
                  label="A"
                  value={alpha}
                  min={0}
                  max={100}
                  defaultValue={100}
                  setValue={onAlphaChange}
                />
              </Inputs>
              <Outputs>
                <OutputText>
                  <div className="cycle" onClick={cycleFormat}>
                    <Svg name="refresh" />
                  </div>
                  <input
                    value={copied ? "Copied..." : formatOutput(color)}
                    readOnly={true}
                    onClick={() => onColorClick(color)}
                  />
                </OutputText>
                {/* <div
                    className="noColor"
                    // onClick={() => setShowColors(!showColors)}
                  >
                    <Svg name="noColor" />
                  </div> */}
              </Outputs>
              <Colors show={true}>
                {colors.map((c, i) => (
                  <Color
                    key={i}
                    color={c}
                    onClick={() => onColorClick(c)}
                    onContextMenu={(e) => removeColor(e, i)}
                  />
                ))}
                <ColorAction col={6} row={1} onClick={addColor}>
                  <Svg name="add" />
                </ColorAction>
                <ColorAction col={6} row={2}>
                  <button
                    style={
                      {
                        // backgroundImage: `url(${imgNone})`,
                        // backgroundRepeat: "no-repeat",
                        // backgroundSize: "cover",
                        // color: "white",
                      }
                    }
                    onClick={() => {
                      setSwatchBG(imgNone);
                      setColor("nill");
                      setPickerColor("nill");
                      //console.log("clicked");
                    }}
                  >
                    No {type}
                  </button>
                </ColorAction>
                {/* <ColorAction col={6} row={2} onClick={openMenu}>
                  <Svg name="menu" />
                </ColorAction> */}
              </Colors>
            </PickerInner>
          </PickerOuter>
        </Modal>
        <Modal
          modal={modalMenu}
          show={showMenu}
          position={positionMenu}
          zIndex={4}
          backdrop={false}
          animate={false}
          onClose={() => setShowMenu(false)}
        >
          <Menu resetColors={resetColors} />
        </Modal>
      </PickerWrapper>
    </>
  );
});

export default Picker;
