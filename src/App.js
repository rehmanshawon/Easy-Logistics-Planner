import React, { useRef, useState } from "react";
import { fabric } from "fabric";
import { SketchPicker } from "react-color";
import Picker from "../src/components/Picker/Picker";
import MediaQuery from "react-responsive";
import { useMediaQuery } from "react-responsive";
import reactCSS from "reactcss";

import imgUndo from "./images/undo2.png";
import imgRedo from "./images/redo2.png";
import imgDelete from "./images/delete2.png";
import imglineWidth from "./images/lineWidth2.png";
import imgStroke1 from "./images/stroke1.png";
import imgStroke2 from "./images/stroke2.png";
import imgStroke4 from "./images/stroke4.png";
import imgStroke5 from "./images/stroke5.png";
import imgStroke10 from "./images/stroke10.png";
import imgStroke12 from "./images/stroke12.png";
import imgStroke15 from "./images/stroke15.png";
import imgStroke20 from "./images/stroke20.png";
import imgStroke25 from "./images/stroke25.png";
import imgLineStyle from "./images/LineStyle2.png";
import imgLineStyle1 from "./images/lineStyle1.png";
import imgLineStyle2 from "./images/lineStyle2png.png";
import imgLineStyle3 from "./images/lineStyle3.png";
import imgLineStyle4 from "./images/lineStyle4.png";
import imgLineStyle5 from "./images/lineStyle5.png";
import imgLineStyle6 from "./images/lineStyle6.png";
import imgLineStyle7 from "./images/lineStyle7.png";
import imgText from "./images/TextBox2.png";
import imgFreeHand from "./images/PenTool2.png";
import imgSelection from "./images/Select2.png";
import imgCloud from "./images/Cloud2.png";
import imgCallout from "./images/CallOut2.png";
import imgImageEdit from "./images/Image2.png";
import imgLine from "./images/Line2.png";
import imgPolyline from "./images/Polyline2.png";
import imgArrow from "./images/Arrow2.png";
import imgArc from "./images/Arc2.png";
import imgRect from "./images/Rectangle2.png";
import imgPolygon from "./images/Polygon2.png";
import imgRPolygon from "./images/RPolygon2.png";
import imgCircle from "./images/Circle2.png";
import imgEllipse from "./images/Ellipse2.png";
import imgDimension from "./images/Dimension2.png";
import imgArea from "./images/Area2.png";
import imgLength from "./images/Length2.png";
import imgPerimeter from "./images/Perimeter2.png";
import imgDropper from "./images/dropper2.png";
import imgNoStroke from "./images/noStroke2.png";
import imgNoFill from "./images/noFill2.png";
import imgFileAccess from "./images/FileAccess2.png";
import imgNewFile from "./images/NewFile2.png";
import imgOpenFile from "./images/OpenFile2.png";
import imgRecentFile from "./images/recentFile2.png";
import imgCanvasSettings from "./images/Canvas2.png";
import imgCanvasSize from "./images/CanvasSize2.png";
import imgCanvasColor from "./images/CanvasColor2.png";
import imgCanvasImage from "./images/CanvasImage2.png";
import imgLayers from "./images/Layers2.png";
import imgLayerBefore from "./images/InsertBefore2.png";
import imgLayerAfter from "./images/InsertAfter2.png";
import imgLayerUp from "./images/Up2.png";
import imgLayerDown from "./images/Down2.png";
import imgLayerHide from "./images/Hide2.png";
import imgLayerLock from "./images/Lock2.png";
import imgLayerSort from "./images/SortAlpha2.png";
import imgWarehouse from "./images/Warehouse2.png";
import imgCrane from "./images/Crane2.png";
import imgElevator from "./images/Elevator2.png";
import imgLabels from "./images/labels2.png";
import imgCloud2 from "./images/CloudTool2.png";
import imgWedge from "./images/wedge2.png";
import imgRing from "./images/Ring2.png";
import imgFilledArc from "./images/FilledArc2.png";
import imgPhase from "./images/Phases2.png";
import imgNewPhase from "./images/NewPhase2.png";
import imgPhaseStart from "./images/StartDate2.png";
import imgPhaseEnd from "./images/EndDate2.png";
import imgPhaseDelete from "./images/DeletePhase2.png";
import imgMeasurement from "./images/Measure2.png";
import imgPageScale from "./images/PageScale2.png";
import imgSetUnits from "./images/setunit2.png";
import imgAnimation from "./images/Animation2.png";
import imgPlay from "./images/Play2.png";

import "./styles.css";
import styles from "./rightMenu.module.css";
import tbStyles from "./toolbar.module.css";
import styled from "styled-components";

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

const initialState = {
  version: "3.6.3",
  objects: [
    {
      type: "rect",
      version: "3.6.3",
      originX: "left",
      originY: "top",
      left: 0,
      top: 0,
      width: 1,
      height: 1,
      fill: "black",
      stroke: null,
      strokeWidth: 1,
      strokeDashArray: null,
      strokeLineCap: "butt",
      strokeDashOffset: 0,
      strokeLineJoin: "miter",
      strokeMiterLimit: 4,
      scaleX: 1,
      scaleY: 1,
      angle: 0,
      flipX: false,
      flipY: false,
      opacity: 1,
      shadow: null,
      visible: false,
      clipTo: null,
      backgroundColor: "",
      fillRule: "nonzero",
      paintFirst: "fill",
      globalCompositeOperation: "source-over",
      transformMatrix: null,
      skewX: 0,
      skewY: 0,
      rx: 0,
      ry: 0,
      name: "shape-rect-n",
    },
  ],
};

const fontCheck = new Set(
  [
    // Windows 10
    "Arial",
    "Arial Black",
    "Bahnschrift",
    "Calibri",
    "Cambria",
    "Cambria Math",
    "Candara",
    "Comic Sans MS",
    "Consolas",
    "Constantia",
    "Corbel",
    "Courier New",
    "Ebrima",
    "Franklin Gothic Medium",
    "Gabriola",
    "Gadugi",
    "Georgia",
    "HoloLens MDL2 Assets",
    "Impact",
    "Ink Free",
    "Javanese Text",
    "Leelawadee UI",
    "Lucida Console",
    "Lucida Sans Unicode",
    "Malgun Gothic",
    "Marlett",
    "Microsoft Himalaya",
    "Microsoft JhengHei",
    "Microsoft New Tai Lue",
    "Microsoft PhagsPa",
    "Microsoft Sans Serif",
    "Microsoft Tai Le",
    "Microsoft YaHei",
    "Microsoft Yi Baiti",
    "MingLiU-ExtB",
    "Mongolian Baiti",
    "MS Gothic",
    "MV Boli",
    "Myanmar Text",
    "Nirmala UI",
    "Palatino Linotype",
    "Segoe MDL2 Assets",
    "Segoe Print",
    "Segoe Script",
    "Segoe UI",
    "Segoe UI Historic",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "SimSun",
    "Sitka",
    "Sylfaen",
    "Symbol",
    "Tahoma",
    "Times New Roman",
    "Trebuchet MS",
    "Verdana",
    "Webdings",
    "Wingdings",
    "Yu Gothic",
    // macOS
    "American Typewriter",
    "Andale Mono",
    "Arial",
    "Arial Black",
    "Arial Narrow",
    "Arial Rounded MT Bold",
    "Arial Unicode MS",
    "Avenir",
    "Avenir Next",
    "Avenir Next Condensed",
    "Baskerville",
    "Big Caslon",
    "Bodoni 72",
    "Bodoni 72 Oldstyle",
    "Bodoni 72 Smallcaps",
    "Bradley Hand",
    "Brush Script MT",
    "Chalkboard",
    "Chalkboard SE",
    "Chalkduster",
    "Charter",
    "Cochin",
    "Comic Sans MS",
    "Copperplate",
    "Courier",
    "Courier New",
    "Didot",
    "DIN Alternate",
    "DIN Condensed",
    "Futura",
    "Geneva",
    "Georgia",
    "Gill Sans",
    "Helvetica",
    "Helvetica Neue",
    "Herculanum",
    "Hoefler Text",
    "Impact",
    "Lucida Grande",
    "Luminari",
    "Marker Felt",
    "Menlo",
    "Microsoft Sans Serif",
    "Monaco",
    "Noteworthy",
    "Optima",
    "Palatino",
    "Papyrus",
    "Phosphate",
    "Rockwell",
    "Savoye LET",
    "SignPainter",
    "Skia",
    "Snell Roundhand",
    "Tahoma",
    "Times",
    "Times New Roman",
    "Trattatello",
    "Trebuchet MS",
    "Verdana",
    "Zapfino",
  ].sort()
);

//const useForceUpdate = () => useState()[1];
// Or you can use:
// const fabric = require("fabric").fabric;
//const canvas = new fabric.Canvas("my-fabric-canvas");
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}
function determineAdjustedCoords(fromX, fromY, toX, toY) {
  // this function uses the last point plotted, the length of the lines to the new x and y coords (using toX and toY) to determine an adjusted rubber band end-point

  // find the angle subtended by the current rubber band line i.e. unadjusted (as dictated by the actual mouse coords) and the x axis
  // var xLen = Math.abs(toX - fromX);
  // var yLen = Math.abs(toY - fromY);
  var xLen = toX - fromX;
  var yLen = toY - fromY;
  // if x or y difference is zero then no action needed so return
  if (xLen === 0 && yLen === 0) return;
  var theta = Math.atan(yLen / xLen) * (180 / Math.PI);
  // find the hypontenuse of the triangle bounded by the x axis and the actual rubber band line - this will also be the hypontenuse of the adjusted rubber band line
  var hyp;
  // verify if any of the components are zero
  if (Math.sin(theta * (Math.PI / 180)) === 0) hyp = xLen;
  else {
    if (yLen === 0) hyp = xLen;
    else hyp = yLen / Math.sin(theta * (Math.PI / 180));
  }
  // find which sector the angle lies in and round it to the nearest sector
  var sector = Math.round(theta / 15);
  // find the angle subtended by the adjusted rubber band line (as dictated by the coords we are trying to determine)
  var thetaNew = sector * 15;
  // find new x and y coords of the adjusted rubber band line end points
  var xNew = Math.cos(thetaNew * (Math.PI / 180)) * hyp;
  var yNew = Math.sin(thetaNew * (Math.PI / 180)) * hyp;
  // required coords equal the new coords added to the last point plotted (fromX,fromY)
  var px = fromX + Math.round(xNew);
  var py = fromY + Math.round(yNew);

  return { tx: px, ty: py };
}
const App = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  //const mforceUpdate = useForceUpdate();
  // for undo/redoing
  const [past, setPast] = useState([initialState]);
  const [future, setFuture] = useState([initialState]);
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  //const [newAction, setNewAction] = useState(0);
  const [pageLoad, setPageLoad] = useState(null);
  // const canvasRender = useRef(0);
  const mouseMoving = useRef(false);
  const canvasRef = useRef();
  const containerRef = useRef();
  const mainDiv = useRef(null);
  const rightBar = useRef();
  const shapeCount = useRef(0);
  const isDrawing = useRef(false);
  const currentStroke = useRef("");
  const editPoly = useRef(true);
  const openPoly = useRef(null);
  const polyType = useRef("");
  const someValue = useRef(0.0);
  const activeObjectStrokeRef = useRef(null);
  const activeObjectFillRef = useRef(null);
  const imgFileRef = useRef(null);
  const imageData = useRef(null);
  //const [reRender, forceUpdate] = useReducer((x) => x + 1, 0);
  //const forceUpdate = React.useReducer(() => ({}))[1];
  //const [, updateComponent] = React.useState();
  //const forceUpdateComponent = React.useCallback(() => updateComponent({}), []);
  //anchors
  const [canvas, setCanvas] = useState();

  const [pickerStroke, setPickerColorStroke] = useState(`rgba(0, 0, 0, 1)`);
  const [pickerFill, setPickerColorFill] = useState(`rgba(0, 0, 0, 1)`);
  //const [canvasHistory, setCanvasHistory] = useState([initialState]);
  //const [canvasHistory, setCanvasHistory] = useState([]);
  // const [canvasState, setCanvasState] = useState(initialState);
  //const [canvasState, setCanvasState] = useState();
  const [canvasTool, setCanvasTool] = useState("select");
  const [strokeWidth, setStrokeWidth] = useState(1);
  // const [stroke, setStrokeColor] = useState("black");
  const [stroke, setStrokeColor] = useState({
    r: "0",
    g: "0",
    b: "0",
    a: "1",
  });
  const [fill, setFillColor] = useState({
    r: "0",
    g: "0",
    b: "0",
    a: "0",
  });
  const [textHighlight, setHighlight] = useState({
    r: "255",
    g: "255",
    b: "0",
    a: "1",
  });
  // const [fill, setFillColor] = useState("black");
  const [dashSize, setDashSize] = useState(0);
  const [gapSize, setGapSize] = useState(0);
  const [opacity, setOpacity] = useState(100);
  // const [snap, setSnap] = useState(false);
  const [font, setFont] = useState("");
  const [fontSize, setFontSize] = useState(30);
  const [fontWeight, setFontWeight] = useState("normal");
  const [fontStyle, setFontStyle] = useState("regular");
  //const [textHighlight, setHighlight] = useState("yellow");

  const [showStrokePicker, setShowStrokePicker] = useState(false);
  const [showFillPicker, setShowFillPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  //const [shapeCount, setShapeCount] = useState(0);

  //const opacity = useRef(100);
  const snap = useRef(false);
  const newShape = useRef(true);
  const anchors = useRef([]);
  const pointer = useRef();
  const line = useRef(null);
  const origX = useRef();
  const origY = useRef();
  const angle = useRef();
  const arrow = useRef(null);
  const selectedShape = useRef(null);
  const polyPoints = useRef([]);
  const rpolygon = useRef(null);
  const Rectangle = useRef(null);
  const circle = useRef(null);
  const ellipse = useRef(null);
  const polyLine = useRef(null);
  const polyLines = useRef([]);
  const currentToolId = useRef(null);

  var currentOpenPanel = "none";
  var drawingObject = {};
  drawingObject.type = "";
  drawingObject.background = "";
  drawingObject.border = "";

  const StrokeSwatchClick = () => {
    setShowStrokePicker((showStrokePicker) => !showStrokePicker);
    if (!showStrokePicker) {
      //Todo
      var activeShape = canvas.getActiveObject();
      if (activeShape) {
        if (activeShape.stroke === "rgba(255,255,255,0)") {
          setStrokeColor({ r: 255, g: 255, b: 255, a: 1 });
          setShapeAttributes({
            stroke: "rgba(255,255,255,1)",
          });
        }
      }
    }
  };
  const FillSwatchClick = () => {
    setShowFillPicker((showFillPicker) => !showFillPicker);
    if (!showFillPicker) {
      //Todo
      var activeShape = canvas.getActiveObject();
      if (activeShape) {
        if (activeShape.fill === "rgba(255,255,255,0)") {
          setFillColor({ r: 255, g: 255, b: 255, a: 1 });
          setShapeAttributes({
            fill: "rgba(255,255,255,1)",
          });
        }
      }
    }
  };
  const HighlightSwatchClick = () => {
    setShowHighlightPicker((showHighlightPicker) => !showHighlightPicker);
  };
  const StrokeSwatchClose = () => {
    setShowStrokePicker(false);
  };
  const FillSwatchClose = () => {
    setShowFillPicker(false);
  };
  const HighlightSwatchClose = () => {
    setShowHighlightPicker(false);
  };
  const StrokeSwatchChange = (color) => {
    //console.log(stroke);
    setStrokeColor(color.rgb);
    // setShapeAttributes({
    //   stroke:
    //     "rgba(" +
    //     color.rgb.r +
    //     ", " +
    //     color.rgb.g +
    //     ", " +
    //     color.rgb.b +
    //     ", " +
    //     color.rgb.a +
    //     ")",
    // });
    setShapeAttributes({
      stroke: pickerStroke,
    });
  };
  const FillSwatchChange = (color) => {
    //console.log(stroke);
    setFillColor(color.rgb);
    setShapeAttributes({
      fill:
        "rgba(" +
        color.rgb.r +
        ", " +
        color.rgb.g +
        ", " +
        color.rgb.b +
        ", " +
        color.rgb.a +
        ")",
    });
    //console.log(swatchStyles.fill);
  };
  const HighlightSwatchChange = (color) => {
    //console.log(stroke);
    setHighlight(color.rgb);
    setShapeAttributes({
      textBackgroundColor:
        "rgba(" +
        color.rgb.r +
        ", " +
        color.rgb.g +
        ", " +
        color.rgb.b +
        ", " +
        color.rgb.a +
        ")",
    });
  };
  var calcPolygonPoints = (sideCount, radius) => {
    var sweep = (Math.PI * 2) / sideCount;
    var cx = radius;
    var cy = radius;
    var points = [];

    for (var i = 0; i < sideCount; i++) {
      var x = cx + radius * Math.cos(i * sweep);
      var y = cy + radius * Math.sin(i * sweep);
      points.push({ x: x, y: y });
    }
    return points;
  };
  /*
  function click(id) {
    var ev = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    var el = document.getElementById(id);
    el.dispatchEvent(ev);
  }
  */
  const saveCanvasState = (newCanvasState) => {
    past.push(newCanvasState);
    setPast(past);
    setFuture([]);
    sessionStorage.clear();
    sessionStorage.myFabricJSCanvas = JSON.stringify(newCanvasState);
    // sessionStorage.setItem("history", JSON.stringify(past));
  };
  /*
  const onObjectModified = useCallback(
    (e) => {
      const newCanvasState = e.target.canvas.toJSON(["name"]);
      //const newCanvasState = canvas.toJSON(["name"]);
      setCanvasState(newCanvasState);
      // Limit history depth
      setCanvasHistory((history) => [...history, newCanvasState].slice(-32));
      //setPast([...past, newCanvasState]);
      //setFuture([]);
      console.log(newCanvasState);
    },
    [setCanvasState, setCanvasHistory]
  );
*/
  React.useEffect(() => {
    // window.localStorage.setItem("colors", JSON.stringify(colors));
    // setShapeAttributes({
    //   stroke: pickerStroke,
    // });
    if (canvas === undefined) return;
    var activeShape = canvas.getActiveObject();
    if (activeShape) {
      // if (activeShape.stroke === "rgba(255,255,255,0)") {
      // setStrokeColor({ r: 255, g: 255, b: 255, a: 1 });
      setShapeAttributes({
        stroke: pickerStroke,
      });
      // }
    }
    // console.log(pickerStroke);
  }, [pickerStroke, setPickerColorStroke, canvas]);
  React.useEffect(() => {
    // window.localStorage.setItem("colors", JSON.stringify(colors));
    // setShapeAttributes({
    //   stroke: pickerStroke,
    // });
    if (canvas === undefined) return;
    var activeShape = canvas.getActiveObject();
    if (activeShape) {
      // if (activeShape.stroke === "rgba(255,255,255,0)") {
      // setStrokeColor({ r: 255, g: 255, b: 255, a: 1 });
      setShapeAttributes({
        fill: pickerFill,
      });
      // }
    }
    // console.log(pickerStroke);
  }, [pickerFill, setPickerColorFill, canvas]);

  React.useEffect(() => {
    /*
    ---disabled for memory issues--
    var history = JSON.parse(sessionStorage.getItem("history")); //get them back    
    if (history !== null) setPast(history);
    */
    const fontAvailable = new Set();
    for (const font of fontCheck.values()) {
      if (document.fonts.check(`12px "${font}"`)) {
        fontAvailable.add(font);
        var x = document.getElementById("fonts");
        var option = document.createElement("option");
        option.text = font;
        x.add(option);
      }
    }
  }, []);
  // React.useEffect(() => {}, [canvasState]);

  React.useEffect(() => {
    //console.log("shift pressed");
    const canvas = new fabric.Canvas(canvasRef.current);
    canvas.set({
      fireRightClick: true,
      fireMiddleClick: true, // <-- enable firing of middle click events
      stopContextMenu: true,
      controlsAboveOverlay: false,
      targetFindTolerance: 15,
      preserveObjectStacking: true,
      perPixelTargetFind: true,
    });
    if (pageLoad === null && sessionStorage.myFabricJSCanvas !== undefined) {
      setPageLoad(1);
      //console.log(sessionStorage.myFabricJSCanvas);
      const data = JSON.parse(sessionStorage.myFabricJSCanvas);
      console.log(data);
      canvas.loadFromJSON(data);
      canvas.forEachObject(function (o) {
        if (o.name.includes("anchor")) {
          canvas.remove(o);
        }
      });
      anchors.current = [];
      var json = canvas.toJSON(["name"]);
      past.push(json);
      setPast(past);
      /*
      //disabled for memory issues. as a result, undoing after refresh is not possible
      var history = JSON.parse(sessionStorage.getItem("history")); //get them back      
      if (history !== null) setPast(history);
      */
      setFuture([]);
    } else {
      canvas.loadFromJSON(past[past.length - 1]);
    }
    canvas.renderAll();

    function handleResize() {
      const ratio = canvas.getWidth() / canvas.getHeight();
      const containerWidth =
        containerRef.current.clientWidth > 1191
          ? 1191
          : containerRef.current.clientWidth - 100;
      const containerHeight = containerRef.current.clientHeight - 100;
      const scale = containerWidth / canvas.getWidth();
      const zoom = canvas.getZoom() * scale;
      canvas.setDimensions({
        width: containerWidth,
        height: containerWidth / ratio,
      });
      canvas.setViewportTransform([zoom, 0, 0, zoom, 0, 0]);
    }

    window.addEventListener("resize", handleResize);

    function handleImageFileLoad(e) {
      var file = e.target.files[0];
      var reader = new FileReader();
      reader.onload = function (f) {
        imageData.current = f.target.result;
        if (imageData.current !== null) {
          new fabric.Image.fromURL(imageData.current, (img) => {
            var oImg = img.set({
              left: pointer.current.x,
              top: pointer.current.y,
              angle: 0,
              name: "shape-image-" + shapeCount.current,
              // width: canvas.getWidth(),
              // height: canvas.getHeight(),
            });
            shapeCount.current = shapeCount.current + 1;
            canvas.add(oImg);
            canvas.renderAll();
            // newShape.current = true;
            const newCanvasState = canvas.toJSON(["name"]);
            saveCanvasState(newCanvasState);
            //setImgURL("");
          });
          imageData.current = null;
        }
      };
      if (file) reader.readAsDataURL(file);
    }

    imgFileRef.current.addEventListener("change", handleImageFileLoad);

    editPoly.current = true;
    if (canvasTool === "pen") {
      canvas.isDrawingMode = 1;
      canvas.freeDrawingBrush.color =
        "rgba(" +
        stroke.r +
        ", " +
        stroke.g +
        ", " +
        stroke.b +
        ", " +
        stroke.a +
        ")";
      canvas.freeDrawingBrush.width = strokeWidth;
    }
    if (canvasTool !== "select") {
      canvas.selection = false;
      canvas.defaultCursor = "crosshair";
      canvas.forEachObject(function (o) {
        o.selectable = false;
        o.hoverCursor = "move";
      });
      if (openPoly.current !== null) {
        openPoly.current = null;
        canvas.forEachObject(function (o) {
          if (o.name.includes("anchor")) {
            canvas.remove(o);
          }
        });
        anchors.current = [];
        canvas.renderAll();
        const newCanvasState = canvas.toJSON(["name"]);
        saveCanvasState(newCanvasState);
        sessionStorage.myFabricJSCanvas = JSON.stringify(newCanvasState);
      }
    } else {
      canvas.selection = true;
      canvas.forEachObject(function (o) {
        o.selectable = true;
      });
      var allObjects = canvas.getObjects();
      var lastObjectCreated = allObjects[allObjects.length - 1];
      canvas.setActiveObject(lastObjectCreated);
      //console.log(lastObjectCreated);
      canvas.renderAll();
    }

    canvas.on("object:rotating", function (options) {
      if (!snap.current) return;
      var angle = options.target.angle;
      var locked = Math.ceil(options.target.angle / 5) * 5;
      if (Math.abs(angle - locked) < 10 || Math.abs(locked - angle) < 10) {
        angle = locked;
      }

      options.target.set({
        angle: angle,
      });
    });
    canvas.on("before:render", function () {
      var ctx = canvas.getSelectionContext();
      if (ctx) canvas.clearContext(ctx);
    });
    //canvas.on("object:added", onObjectModified);
    // canvas.on("object:modified", onObjectModified);
    canvas.on("object:modified", function (e) {
      const newCanvasState = e.target.canvas.toJSON(["name"]);
      past.push(newCanvasState);
      setPast(past);
      //console.log(past);
      setFuture([]);
      sessionStorage.clear();
      sessionStorage.myFabricJSCanvas = JSON.stringify(newCanvasState);
      // sessionStorage.setItem("history", JSON.stringify(past));
    });
    canvas.on("object:removed", function (e) {
      const newCanvasState = e.target.canvas.toJSON(["name"]);
      past.push(newCanvasState);
      setPast(past);
      //console.log(past);
      setFuture([]);
      sessionStorage.clear();
      sessionStorage.myFabricJSCanvas = JSON.stringify(newCanvasState);
      // sessionStorage.setItem("history", JSON.stringify(past));
    });

    canvas.on("mouse:dblclick", function (e) {
      if (canvasTool === "polygon") {
        canvas.remove(line.current);
        for (var i = 0; i < polyLines.current.length; i++) {
          canvas.remove(polyLines.current[i]);
        }
        newShape.current = true;
        isDrawing.current = false;
        var polyGon = null;
        polyGon = new fabric.Polygon(polyPoints.current, {
          stroke:
            "rgba(" +
            stroke.r +
            ", " +
            stroke.g +
            ", " +
            stroke.b +
            ", " +
            stroke.a +
            ")",
          fill:
            "rgba(" +
            fill.r +
            ", " +
            fill.g +
            ", " +
            fill.b +
            ", " +
            fill.a +
            ")",
          strokeWidth: strokeWidth,
          selectable: false,
          hoverCursor: "default",
          name: "shape-polygon-" + shapeCount.current,
        });
        canvas.add(polyGon);
        editPoly.current = true;
        canvas.setActiveObject(polyGon);
        // document.getElementById("select").click();
        canvas.renderAll();
        shapeCount.current++;
        const newCanvasState = canvas.toJSON(["name"]);
        saveCanvasState(newCanvasState);
      }

      if (canvasTool === "polyline") {
        canvas.remove(line.current);
        for (i = 0; i < polyLines.current.length; i++) {
          canvas.remove(polyLines.current[i]);
        }
        newShape.current = true;
        isDrawing.current = false;
        var polyLine = new fabric.Polyline(polyPoints.current, {
          stroke:
            "rgba(" +
            stroke.r +
            ", " +
            stroke.g +
            ", " +
            stroke.b +
            ", " +
            stroke.a +
            ")",
          fill: "",
          strokeWidth: strokeWidth,
          selectable: false,
          hoverCursor: "default",
          name: "shape-polyline-" + shapeCount.current,
        });
        canvas.add(polyLine);
        canvas.setActiveObject(polyLine);
        // document.getElementById("select").click();
        editPoly.current = true;
        canvas.renderAll();
        shapeCount.current++;
        const newCanvasState = canvas.toJSON(["name"]);
        saveCanvasState(newCanvasState);
      }
      if (canvasTool === "select") {
        console.log(e.target);
        if (e.target === null) return;
        if (e.target.type === "polyline" && editPoly.current) {
          canvas.set({
            perPixelTargetFind: false,
          });
          canvas.forEachObject(function (o) {
            if (o.name.includes("anchor")) {
              canvas.remove(o);
            }
          });
          anchors.current = [];
          polyType.current = "polyline";

          // polyPoints = [];
          var editable = e.target;
          openPoly.current = editable; //for future hiding the anchor points.
          editable.set({
            hasControls: false,
            hasBorders: false,
            selectable: false,
            hoverCursor: "default",
          });
          editPoly.current = false;
          // console.log(editable.get("points"));
          var str = editable.get("name");
          var id = str.split("-");
          var matrix = editable.calcTransformMatrix();
          var transformedPoints = editable
            .get("points")
            .map(function (p) {
              return new fabric.Point(
                p.x - editable.pathOffset.x,
                p.y - editable.pathOffset.y
              );
            })
            .map(function (p) {
              return fabric.util.transformPoint(p, matrix);
            });
          var pFill = editable.get("fill");
          var pStroke = editable.get("stroke");
          var pName = editable.get("name");
          canvas.remove(editable);
          var updatedPoly = new fabric.Polyline(transformedPoints, {
            fill: pFill,
            stroke: pStroke,
            name: pName,
            hasControls: false,
            hasBorders: false,
            selectable: false,
            hoverCursor: "default",
          });
          canvas.add(updatedPoly);
          canvas.sendToBack(updatedPoly);
          openPoly.current = updatedPoly;
          anchors.current = [];
          transformedPoints.forEach(function (p, index) {
            var anchor = new fabric.Circle({
              left: p.x,
              top: p.y,
              radius: 15,
              fill: "green",
              originX: "center",
              originY: "center",
              hasControls: false,
              hasBorders: false,
              name: "anchor-" + id[2] + "-" + index,
            });
            canvas.add(anchor);
            anchors.current.push(anchor);
          });
          canvas.renderAll();
          return;
        }
        //if (e.target === null && !editPoly.current) {
        if (e.target.type === "polyline" && !editPoly.current) {
          canvas.set({
            perPixelTargetFind: true,
          });
          polyType.current = "";
          editable = e.target;
          editable.set({
            hasControls: true,
            hasBorders: true,
            selectable: true,
            hoverCursor: "move",
          });
          editPoly.current = true;
          anchors.current.forEach(function (anchor) {
            canvas.remove(anchor);
          });
          anchors.current = [];
          openPoly.current = null;
          canvas.renderAll();
          return;
        }
        if (e.target.type === "polygon" && editPoly.current) {
          if (e.target === null) return;
          if (e.target.name.includes("rpolygon")) return;
          canvas.set({
            perPixelTargetFind: false,
          });
          canvas.forEachObject(function (o) {
            if (o.name.includes("anchor")) {
              canvas.remove(o);
            }
          });
          anchors.current = [];
          polyType.current = "polygon";
          // polyPoints = [];
          editable = e.target;
          openPoly.current = editable; //for future hiding the anchor points.
          editable.set({
            hasControls: false,
            hasBorders: false,
            selectable: false,
            hoverCursor: "default",
          });
          editPoly.current = false;
          // console.log(editable.get("points"));
          str = editable.get("name");
          id = str.split("-");
          matrix = editable.calcTransformMatrix();
          transformedPoints = editable
            .get("points")
            .map(function (p) {
              return new fabric.Point(
                p.x - editable.pathOffset.x,
                p.y - editable.pathOffset.y
              );
            })
            .map(function (p) {
              return fabric.util.transformPoint(p, matrix);
            });
          pFill = editable.get("fill");
          pStroke = editable.get("stroke");
          pName = editable.get("name");
          canvas.remove(editable);
          updatedPoly = new fabric.Polygon(transformedPoints, {
            fill: pFill,
            stroke: pStroke,
            name: pName,
            hasControls: false,
            hasBorders: false,
            selectable: false,
            hoverCursor: "default",
          });
          canvas.add(updatedPoly);
          canvas.sendToBack(updatedPoly);
          anchors.current = [];
          transformedPoints.forEach(function (p, index) {
            var anchor = new fabric.Circle({
              left: p.x,
              top: p.y,
              radius: 15,
              fill: "green",
              originX: "center",
              originY: "center",
              hasControls: false,
              hasBorders: false,
              name: "anchor-" + id[2] + "-" + index,
            });
            canvas.add(anchor);
            anchors.current.push(anchor);
          });
          canvas.renderAll();
          return;
        }
        if (e.target.type === "polygon" && !editPoly.current) {
          if (e.target.name.includes("rpolygon")) return;
          canvas.set({
            perPixelTargetFind: true,
          });
          polyType.current = "";
          editable = e.target;
          editable.set({
            hasControls: true,
            hasBorders: true,
            selectable: true,
            hoverCursor: "move",
          });
          editPoly.current = true;
          anchors.current.forEach(function (anchor) {
            canvas.remove(anchor);
          });
          anchors.current = [];
          canvas.renderAll();
          return;
        }
      }
    });
    // canvas.on("dragenter", function (options) {
    //   alert("draggin");
    // });
    canvas.on("object:moving", function (options) {
      // if (options.e.altKey) alert("moving");
      if (options.target.type !== "circle") {
        if (openPoly.current !== null) {
          openPoly.current = null;
          editPoly.current = true;
          anchors.current.forEach(function (anchor) {
            canvas.remove(anchor);
          });
          anchors.current = [];
          canvas.renderAll();
          return;
        }
      }
      if (options.target.type === "circle") {
        var p = options.target;
        //console.log(p.get("name"));
        if (p.name.includes("circle")) return;
        if (p.name.includes("arc")) return;
        var str = p.name.split("-");
        if (polyType.current === "polyline") {
          var pname = "shape-polyline-" + str[1];
        }
        if (polyType.current === "polygon") {
          pname = "shape-polygon-" + str[1];
        }

        //console.log(pname);
        var object = null;
        var objects = canvas.getObjects();
        for (var i = 0; i < objects.length; i++) {
          if (objects[i].name && objects[i].name === pname) {
            object = objects[i];
            break;
          }
        }
        // console.log(object);
        object.points[str[2]] = {
          x: p.getCenterPoint().x,
          y: p.getCenterPoint().y,
        };

        //console.log(p.getCenterPoint());
        var pFill = object.get("fill");
        var pStroke = object.get("stroke");
        var pName = object.get("name");
        var pPoints = object.get("points");
        //UNCOMMENT LINES 39 - 42 TO HAVE A WORKAROUND
        canvas.remove(object);
        if (polyType.current === "polyline") {
          var updatedPoly = new fabric.Polyline(pPoints, {
            fill: pFill,
            stroke: pStroke,
            name: pName,
            hasControls: false,
            hasBorders: false,
            selectable: false,
            hoverCursor: "default",
          });
        }
        if (polyType.current === "polygon") {
          updatedPoly = new fabric.Polygon(pPoints, {
            fill: pFill,
            stroke: pStroke,
            name: pName,
            hasControls: false,
            hasBorders: false,
            selectable: false,
            hoverCursor: "default",
          });
        }
        canvas.add(updatedPoly);
        canvas.sendToBack(updatedPoly);
        canvas.renderAll();
      }
    });

    canvas.on("mouse:up", function (e) {
      this.setViewportTransform(this.viewportTransform);
      this.isDragging = false;
      mouseMoving.current = false;
      if (e.button === 2) return;
      // if (e.button === 3) {
      //   setActiveTool(e, "select");
      //   setCanvas("select");
      //   return;
      // }
      // this.selection = true;
      if (canvas.isDrawingMode) {
        var allObjects = canvas.getObjects();
        var path = allObjects[allObjects.length - 1];
        path.set({ name: "shape-path-" + shapeCount.current });
        //console.log(path);
        shapeCount.current = shapeCount.current + 1;
        canvas.selection = true;
        // document.getElementById("select").click();
        canvas.setActiveObject(allObjects[allObjects.length - 1]);
        canvas.renderAll();
        const newCanvasState = canvas.toJSON(["name"]);
        saveCanvasState(newCanvasState);
        // }
      }

      if (canvasTool === "text") {
        //console.log(canvas.getObjects());
        pointer.current = canvas.getPointer(e);
        var text = new fabric.IText("Esc to edit", {
          left: pointer.current.x,
          top: pointer.current.y,
          fontFamily: "Arial",
          fontSize: "30",
          // fontWeight: "regular",
          //stroke: stroke,
          // strokeWidth: strokeWidth,
          // selectable: false,
          hoverCursor: "default",
          name: "shape-text-" + shapeCount.current,
        });
        //console.log(text);
        canvas.add(text);
        // document.getElementById("select").click();
        canvas.setActiveObject(text);
        canvas.renderAll();

        shapeCount.current = shapeCount.current + 1;
        // Save the canvas to State variable
        const newCanvasState = canvas.toJSON(["name"]);

        saveCanvasState(newCanvasState);
      }
      if (canvasTool === "image") {
        pointer.current = canvas.getPointer(e);
        newShape.current = true;
        //var fileupload = document.getElementById("FileUpload1");
        imgFileRef.current.click();
      }
      if (canvasTool === "line") {
        if (newShape.current) {
          pointer.current = canvas.getPointer(e);
          var points = [
            pointer.current.x,
            pointer.current.y,
            pointer.current.x,
            pointer.current.y,
          ];
          line.current = new fabric.Line(points, {
            strokeWidth: strokeWidth,
            stroke: pickerStroke,
            originX: "center",
            originY: "center",
            padding: 15,
            //selectable: false,
            hoverCursor: "default",
            name: "shape-line-" + shapeCount.current,
          });
          canvas.add(line.current);

          shapeCount.current = shapeCount.current + 1;
          newShape.current = false;
        } else {
          pointer.current = canvas.getPointer(e);
          if (e.e.shiftKey) {
            var { tx, ty } = determineAdjustedCoords(
              line.current.x1,
              line.current.y1,
              pointer.current.x,
              pointer.current.y
            );
            line.current.set({ x2: tx, y2: ty });
            // var deltaX = Math.abs(pointer.current.x - line.current.x1);
            // var deltaY = Math.abs(pointer.current.y - line.current.y1);
            // if (deltaX > deltaY)
            //   line.current.set({ x2: pointer.current.x, y2: line.current.y1 });
            // if (deltaY > deltaX)
            //   line.current.set({ x2: line.current.x1, y2: pointer.current.y });
          } else
            line.current.set({ x2: pointer.current.x, y2: pointer.current.y });
          // line.current.set({ x2: pointer.current.x, y2: pointer.current.y });
          // document.getElementById("select").click();
          canvas.setActiveObject(line.current);
          canvas.renderAll();
          newShape.current = true;
          // Save the canvas to State variable
          const newCanvasState = canvas.toJSON(["name"]);
          saveCanvasState(newCanvasState);
        }
      }
      if (canvasTool === "arrow") {
        if (newShape.current) {
          pointer.current = canvas.getPointer(e);
          let arrowLinePoints = [
            pointer.current.x,
            pointer.current.y,
            pointer.current.x,
            pointer.current.y,
          ];
          line.current = new fabric.Line(arrowLinePoints, {
            stroke: pickerStroke,
            strokeWidth: strokeWidth,
            originX: "center",
            originY: "center",
            padding: 15,
          });
          // reference points for arrowhead
          origX.current = line.current.x2;
          origY.current = line.current.y2;
          let dx = line.current.x2 - line.current.x1,
            dy = line.current.y2 - line.current.y1;
          /* calculate angle.current of arrow.current */
          angle.current = Math.atan2(dy, dx);
          angle.current *= 180 / Math.PI;
          angle.current += 90;

          arrow.current = new fabric.Triangle({
            angle: angle.current,
            fill: pickerFill,
            top: line.current.y2,
            left: line.current.x2,
            width: 15,
            height: 15,
            originX: "center",
            originY: "center",
            stroke: pickerStroke,
            strokeWidth: strokeWidth,
          });
          canvas.add(line.current);
          canvas.add(arrow.current);
          canvas.renderAll();
          newShape.current = false;
        } else {
          canvas.remove(line.current);
          canvas.remove(arrow.current);
          selectedShape.current = new fabric.Group(
            [line.current, arrow.current],
            {
              hasBorders: true,
              hasControls: true,
              selectable: false,
              hoverCursor: "default",
              originX: "center",
              originY: "center",
            }
          );
          shapeCount.current = shapeCount.current + 1;
          selectedShape.current.set(
            "name",
            "shape-arrow-" + shapeCount.current + 1
          );
          canvas.add(selectedShape.current);
          canvas.setActiveObject(selectedShape.current);
          // document.getElementById("select").click();
          newShape.current = true;
          // Save the canvas to State variable
          const newCanvasState = canvas.toJSON(["name"]);
          saveCanvasState(newCanvasState);
        }
      }
      if (canvasTool === "polyline") {
        if (newShape.current) {
          polyPoints.current = [];
          isDrawing.current = true;
          pointer.current = canvas.getPointer(e);
          origX.current = pointer.current.x;
          origY.current = pointer.current.y;
          polyPoints.current.push(pointer.current);
          line.current = new fabric.Line(
            [
              pointer.current.x,
              pointer.current.y,
              pointer.current.x,
              pointer.current.y,
            ],
            {
              stroke: pickerStroke,
              strokeWidth: strokeWidth,
              hasControls: false,
              hasBorders: false,
              selectable: false,
              lockMovementX: true,
              lockMovementY: true,
              hoverCursor: "default",
              originX: "center",
              originY: "center",
              padding: 15,
            }
          );
          canvas.add(line.current);
          //polyLines.current.push(polyline);
          newShape.current = false;
        } else {
          pointer.current = canvas.getPointer(e);
          line.current.set({ x1: pointer.current.x, y1: pointer.current.y });
          polyPoints.current.push(pointer.current);
          if (polyPoints.current.length > 1) {
            var startPoint = polyPoints.current[polyPoints.current.length - 2];
            var endPoint = polyPoints.current[polyPoints.current.length - 1];
            var evt = e.e;
            if (evt.shiftKey === true) {
              if (
                Math.abs(pointer.current.x - startPoint.x) >
                Math.abs(pointer.current.y - startPoint.y)
              ) {
                console.log("line should be horizontally strait");
                endPoint.y = startPoint.y;
                line.current.set({ x1: pointer.current.x, y1: endPoint.y });
              } else {
                console.log("line should be vertically strait");
                endPoint.x = startPoint.x;
                line.current.set({
                  x1: startPoint.x,
                  y1: pointer.current.y,
                });
              }
              polyPoints.current.pop();
              polyPoints.current.push(endPoint);
            }
            var newPolyLine = new fabric.Line(
              [startPoint.x, startPoint.y, endPoint.x, endPoint.y],
              {
                stroke: pickerStroke,
                strokeWidth: strokeWidth,
                hasControls: false,
                hasBorders: false,
                selectable: false,
                lockMovementX: true,
                lockMovementY: true,
                hoverCursor: "default",
                originX: "center",
                originY: "center",
                padding: 15,
              }
            );
            var distance = Math.sqrt(
              Math.pow(origX.current - pointer.current.x, 2) +
                Math.pow(origY.current - pointer.current.y, 2)
            );
            console.log(distance);
            if (distance < 20) {
              if (
                window.confirm(
                  "Close the shape? Press OK to close it. Cancel to keep the shape open."
                )
              ) {
                newPolyLine.set({
                  x2: origX.current,
                  y2: origY.current,
                });
                canvas.add(newPolyLine);
                canvas.renderAll();
                polyLines.current.push(newPolyLine);

                canvas.remove(line.current);
                for (var i = 0; i < polyLines.current.length; i++) {
                  canvas.remove(polyLines.current[i]);
                }
                newShape.current = true;
                isDrawing.current = false;
                polyLine.current = null;
                polyPoints.current.pop();
                polyPoints.current.push(polyPoints.current[0]);
                console.log(polyPoints.current);
                polyLine.current = new fabric.Polygon(polyPoints.current, {
                  stroke: pickerStroke,
                  fill: pickerFill,
                  strokeWidth: strokeWidth,
                  padding: 15,
                  selectable: false,
                  hoverCursor: "default",
                  name: "shape-polygon-" + shapeCount.current,
                });
                // console.log(fill);
                canvas.add(polyLine.current);
                canvas.setActiveObject(polyLine.current);
                // document.getElementById("select").click();
                editPoly.current = true;
                canvas.renderAll();
                shapeCount.current++;
                const newCanvasState = canvas.toJSON(["name"]);
                saveCanvasState(newCanvasState);
                return;
              } else {
                // Do nothing!
                console.log("Shape still open double click to finish");
              }
            }
            canvas.add(newPolyLine);
            polyLines.current.push(newPolyLine);
            canvas.renderAll();
          }
        }
      }
      if (canvasTool === "polygon") {
        if (newShape.current) {
          polyPoints.current = [];
          isDrawing.current = true;
          pointer.current = canvas.getPointer(e);
          polyPoints.current.push(pointer.current);
          line.current = new fabric.Line(
            [
              pointer.current.x,
              pointer.current.y,
              pointer.current.x,
              pointer.current.y,
            ],
            {
              stroke: pickerStroke,
              strokeWidth: strokeWidth,
              padding: 15,
              hasControls: false,
              hasBorders: false,
              selectable: false,
              lockMovementX: true,
              lockMovementY: true,
              hoverCursor: "default",
              originX: "center",
              originY: "center",
            }
          );
          canvas.add(line.current);
          newShape.current = false;
        } else {
          pointer.current = canvas.getPointer(e);
          line.current.set({ x1: pointer.current.x, y1: pointer.current.y });
          polyPoints.current.push(pointer.current);
          if (polyPoints.current.length > 1) {
            startPoint = polyPoints.current[polyPoints.current.length - 2];
            endPoint = polyPoints.current[polyPoints.current.length - 1];
            newPolyLine = new fabric.Line(
              [startPoint.x, startPoint.y, endPoint.x, endPoint.y],
              {
                stroke: pickerStroke,
                strokeWidth: strokeWidth,
                padding: 15,
                hasControls: false,
                hasBorders: false,
                selectable: false,
                lockMovementX: true,
                lockMovementY: true,
                hoverCursor: "default",
                originX: "center",
                originY: "center",
              }
            );
            canvas.add(newPolyLine);
            polyLines.current.push(newPolyLine);
            canvas.renderAll();
          }
        }
      }
      if (canvasTool === "rpolygon") {
        if (newShape.current) {
          pointer.current = canvas.getPointer(e);
          origX.current = pointer.current.x;
          origY.current = pointer.current.y;
          rpolygon.current = new fabric.Polygon(
            calcPolygonPoints(
              8,
              Math.abs(origX.current - pointer.current.x) / 2
            ),
            {
              objectCaching: false,
              left: origX.current,
              top: origY.current,
              originX: "center",
              originY: "center",
              fill: pickerFill,
              perPixelTargetFind: false,
              strokeWidth: strokeWidth,
              stroke: pickerStroke,
              hasControls: false,
              hasBorders: false,
              padding: 15,
              name: "shape-rpolygon-" + shapeCount.current,
            }
          );
          canvas.add(rpolygon.current);
          newShape.current = false;
          shapeCount.current++;
        } else {
          newShape.current = true;
          var matrix = rpolygon.current.calcTransformMatrix();
          var transformedPoints = rpolygon.current
            .get("points")
            .map(function (p) {
              return new fabric.Point(
                p.x - rpolygon.current.pathOffset.x,
                p.y - rpolygon.current.pathOffset.y
              );
            })
            .map(function (p) {
              return fabric.util.transformPoint(p, matrix);
            });
          canvas.remove(rpolygon.current);
          var updatedPoly = new fabric.Polygon(transformedPoints, {
            fill: pickerFill,
            stroke: pickerStroke,
            padding: 15,
            name: "shape-rpolygon-" + shapeCount.current,
            // hasControls: false,
            // hasBorders: false,
            //selectable: false,
            hoverCursor: "default",
          });
          updatedPoly.set({
            originX: "center",
            originY: "center",
            left: origX.current + updatedPoly.width / 2,
            top: origY.current + updatedPoly.height / 2,
          });
          canvas.add(updatedPoly);
          canvas.setActiveObject(updatedPoly);
          //  document.getElementById("select").click();
          canvas.renderAll();
          // Save the canvas to State variable
          const newCanvasState = canvas.toJSON(["name"]);
          saveCanvasState(newCanvasState);
        }
      }
      if (canvasTool === "rect") {
        if (newShape.current) {
          pointer.current = canvas.getPointer(e);
          origX.current = pointer.current.x;
          origY.current = pointer.current.y;
          Rectangle.current = new fabric.Rect({
            left: origX.current,
            top: origY.current,
            fill: pickerFill,
            stroke: pickerStroke,
            strokeWidth: strokeWidth,
            padding: 15,
            strokeDashArray: [dashSize, gapSize],
            centeredScaling: true,
            opacity: opacity,
            selectable: false,
            hoverCursor: "default",
            name: "shape-rect-" + shapeCount.current,
          });
          shapeCount.current++;

          canvas.add(Rectangle.current);
          newShape.current = false;
        } else {
          pointer.current = canvas.getPointer(e);

          if (origX.current > pointer.current.x) {
            Rectangle.current.set({ left: Math.abs(pointer.current.x) });
          }
          if (origY.current > pointer.current.y) {
            Rectangle.current.set({ top: Math.abs(pointer.current.y) });
          }
          Rectangle.current.set({
            width: Math.abs(origX.current - pointer.current.x),
          });
          Rectangle.current.set({
            height: Math.abs(origY.current - pointer.current.y),
          });
          Rectangle.current.set({
            originX: "center",
            originY: "center",
            left: origX.current + Rectangle.current.width / 2,
            top: origY.current + Rectangle.current.height / 2,
          });
          newShape.current = true;
          canvas.setActiveObject(Rectangle.current);

          //  document.getElementById("select").click();
          canvas.renderAll();
          // Save the canvas to State variable
          const newCanvasState = canvas.toJSON(["name"]);
          saveCanvasState(newCanvasState);
        }
      }
      if (canvasTool === "arc") {
        if (newShape.current) {
          pointer.current = canvas.getPointer(e);
          origX.current = pointer.current.x;
          origY.current = pointer.current.y;
          circle.current = new fabric.Circle({
            left: origX.current,
            top: origY.current,
            originX: "left",
            originY: "top",
            radius: pointer.current.x - origX.current,
            angle: 45,
            startAngle: 0,
            endAngle: Math.PI,
            fill: pickerFill,
            stroke: pickerStroke,
            strokeWidth: strokeWidth,
            padding: 15,
            selectable: false,
            hoverCursor: "default",
            name: "shape-arc-" + shapeCount.current,
          });
          canvas.add(circle.current);
          newShape.current = false;
          shapeCount.current++;
        } else {
          pointer.current = canvas.getPointer(e);
          var radius =
            Math.max(
              Math.abs(origY.current - pointer.current.y),
              Math.abs(origX.current - pointer.current.x)
            ) / 2;
          if (radius > circle.current.strokeWidth) {
            radius -= circle.current.strokeWidth / 2;
          }
          circle.current.set({ radius: radius });

          if (origX.current > pointer.current.x) {
            circle.current.set({ originX: "right" });
          } else {
            circle.current.set({ originX: "left" });
          }
          if (origY.current > pointer.current.y) {
            circle.current.set({ originY: "bottom" });
          } else {
            circle.current.set({ originY: "top" });
          }
          newShape.current = true;
          canvas.setActiveObject(circle.current);
          // document.getElementById("select").click();
          canvas.renderAll();
          // Save the canvas to State variable
          const newCanvasState = canvas.toJSON(["name"]);
          saveCanvasState(newCanvasState);
        }
      }
      if (canvasTool === "circle") {
        if (newShape.current) {
          pointer.current = canvas.getPointer(e);
          origX.current = pointer.current.x;
          origY.current = pointer.current.y;
          circle.current = new fabric.Circle({
            left: origX.current,
            top: origY.current,
            originX: "left",
            originY: "top",
            radius: pointer.current.x - origX.current,
            angle: 0,
            fill: pickerFill,
            stroke: pickerStroke,
            strokeWidth: strokeWidth,
            padding: 15,
            selectable: false,
            hoverCursor: "default",
            name: "shape-circle-" + shapeCount.current,
          });
          canvas.add(circle.current);
          newShape.current = false;
          shapeCount.current++;
        } else {
          pointer.current = canvas.getPointer(e);
          radius =
            Math.max(
              Math.abs(origY.current - pointer.current.y),
              Math.abs(origX.current - pointer.current.x)
            ) / 2;

          if (radius > circle.current.strokeWidth) {
            radius -= circle.current.strokeWidth / 2;
          }
          radius += someValue.current;
          circle.current.set({ radius: radius });

          if (origX.current > pointer.current.x) {
            circle.current.set({ originX: "right" });
          } else {
            circle.current.set({ originX: "left" });
          }
          if (origY.current > pointer.current.y) {
            circle.current.set({ originY: "bottom" });
          } else {
            circle.current.set({ originY: "top" });
          }
          circle.current.set({
            originX: "center",
            originY: "center",
            left: origX.current + circle.current.radius,
            top: origY.current + circle.current.radius,
          });
          newShape.current = true;
          canvas.setActiveObject(circle.current);
          //  document.getElementById("select").click();
          canvas.renderAll();
          // Save the canvas to State variable
          const newCanvasState = canvas.toJSON(["name"]);
          saveCanvasState(newCanvasState);
        }
      }
      if (canvasTool === "ellipse") {
        if (newShape.current) {
          pointer.current = canvas.getPointer(e);
          origX.current = pointer.current.x;
          origY.current = pointer.current.y;
          ellipse.current = new fabric.Ellipse({
            left: origX.current,
            top: origY.current,
            originX: "left",
            originY: "top",
            rx: pointer.current.x - origX.current,
            ry: pointer.current.y - origY.current,
            angle: 0,
            fill: pickerFill,
            stroke: pickerStroke,
            strokeWidth: strokeWidth,
            padding: 15,
            type: "ellipse",
            selectable: false,
            hoverCursor: "default",
            name: "shape-ellipse-" + shapeCount.current,
          });
          canvas.add(ellipse.current);
          newShape.current = false;
        } else {
          pointer.current = canvas.getPointer(e);
          var rx = Math.abs(origX.current - pointer.current.x) / 2;
          var ry = Math.abs(origY.current - pointer.current.y) / 2;
          rx += someValue.current;
          ry += someValue.current;
          if (rx > ellipse.current.strokeWidth) {
            rx -= ellipse.current.strokeWidth / 2;
          }
          if (ry > ellipse.current.strokeWidth) {
            ry -= ellipse.current.strokeWidth / 2;
          }
          ellipse.current.set({ rx: rx, ry: ry });

          if (origX.current > pointer.current.x) {
            ellipse.current.set({ originX: "right" });
          } else {
            ellipse.current.set({ originX: "left" });
          }
          if (origY.current > pointer.current.y) {
            ellipse.current.set({ originY: "bottom" });
          } else {
            ellipse.current.set({ originY: "top" });
          }
          ellipse.current.set({
            originX: "center",
            originY: "center",
            left: origX.current + ellipse.current.rx,
            top: origY.current + ellipse.current.ry,
          });
          newShape.current = true;
          canvas.setActiveObject(ellipse.current);
          // document.getElementById("select").click();
          canvas.renderAll();
          // Save the canvas to State variable
          const newCanvasState = canvas.toJSON(["name"]);
          saveCanvasState(newCanvasState);
        }
      }
      //check if user clicked an object
      if (e.target) {
        evt = e.e;
        if (evt.altKey === true) {
          if (e.target.name.includes("anchor")) {
            console.log(e.target);
            var editable = openPoly.current;
            var newPoints = editable.get("points");
            console.log(newPoints.length);
            if (newPoints.length <= 3) return;
            canvas.remove(e.target);

            var pFill = editable.get("fill");
            var pStroke = editable.get("stroke");
            var pName = editable.get("name");

            var id = e.target.name.split("-");
            var pointIndex = parseInt(id[2]);
            var cloneArray = newPoints.slice();
            cloneArray.splice(pointIndex, 1);
            console.log(newPoints);
            console.log(cloneArray);

            //canvas.remove(openPoly.current);
            editable.set({ points: cloneArray });
            console.log(editable);
            /*
            var updatedPoly = new fabric.Polyline(cloneArray, {
              fill: pFill,
              stroke: pStroke,
              name: pName,
              hasControls: false,
              hasBorders: false,
              selectable: false,
              hoverCursor: "default",
            });
            canvas.add(updatedPoly);
            canvas.sendToBack(updatedPoly);
            */
            canvas.renderAll();
            //anchors.current = [];
          }
        }
        if (!editPoly.current) return;
        var activeShape = canvas.getActiveObject();
        //if (activeShape.length > 1) return;
        //        console.log(activeShape.type);
        if (activeShape) {
          console.log(activeShape);
          // if (activeShape.stroke && activeShape.type !== "i-text") {
          //   if (currentStroke.current !== null) {
          //     var rgba = currentStroke.current
          //       .substr(5)
          //       .split(")")[0]
          //       .split(",");
          //     setStrokeColor({
          //       r: rgba[0],
          //       g: rgba[1],
          //       b: rgba[2],
          //       a: rgba[3],
          //     });
          //     //if()
          //     console.log(activeShape.stroke);
          //     setPickerColor(activeShape.stroke);

          //     currentStroke.current = activeShape.stroke;
          //     // activeObjectStrokeRef.current();
          //     if (activeObjectStrokeRef?.current) {
          //       activeObjectStrokeRef.current(activeShape.stroke);
          //     }
          //   }
          //   setStrokeWidth(activeShape.strokeWidth);
          // } else {
          //   if (activeObjectStrokeRef?.current) {
          //     activeObjectStrokeRef.current("nill");
          //   }
          // }
          if (activeShape.stroke !== null && activeShape.type !== "i-text") {
            // setPickerColorStroke(activeShape.stroke);
            if (activeObjectStrokeRef?.current) {
              activeObjectStrokeRef.current(activeShape.stroke);
            }
          } else {
            if (activeObjectStrokeRef?.current) {
              activeObjectStrokeRef.current("nill");
            }
          }
          if (activeShape.fill) {
            // setPickerColorFill(activeShape.fill);
            if (activeObjectFillRef?.current) {
              activeObjectFillRef.current(activeShape.fill);
            }
          } else {
            if (activeObjectFillRef?.current) {
              activeObjectFillRef.current("nill");
            }
            // console.log(activeShape.fill);
            // rgba = activeShape.fill.substr(5).split(")")[0].split(",");
            // setFillColor({ r: rgba[0], g: rgba[1], b: rgba[2], a: rgba[3] });
          }
          //console.log(activeShape.opacity);
          if (Number.isNaN(activeShape.opacity)) setOpacity(100);
          else setOpacity(activeShape.opacity * 100);
          //setOpacity(activeShape.opacity * 100);
          //setFont(activeShape.fontFamily);
          ///setFontSize(activeShape.fontSize);
          //setFontWeight(activeShape.fontWeight);
          //setFontStyle(activeShape.fontStyle);
        }
      }
    });

    canvas.on("mouse:wheel", function (opt) {
      var delta = opt.e.deltaY;
      var zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
      var vpt = this.viewportTransform;
      if (zoom < 400 / 1000) {
        vpt[4] = 200 - (1000 * zoom) / 2;
        vpt[5] = 200 - (1000 * zoom) / 2;
      } else {
        if (vpt[4] >= 0) {
          vpt[4] = 0;
        } else if (vpt[4] < canvas.getWidth() - 1000 * zoom) {
          vpt[4] = canvas.getWidth() - 1000 * zoom;
        }
        if (vpt[5] >= 0) {
          vpt[5] = 0;
        } else if (vpt[5] < canvas.getHeight() - 1000 * zoom) {
          vpt[5] = canvas.getHeight() - 1000 * zoom;
        }
      }
    });
    //object.on
    canvas.on("mouse:down", function (opt) {
      if (canvasTool !== "select") {
        this.selection = false;
      }
      var evt = opt.e;
      if (opt.button === 2) {
        this.isDragging = true;
        this.selection = false;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
      }
      // if (opt.button === 3) {
      //   setCanvasTool("select");
      //   setActiveTool(evt, "select");
      //   //document.getElementById("select").click();
      //   // canvas.renderAll();
      //   //this.selection = true;
      //   canvasRef.current.click();

      //   //return;
      // }
      if (opt.e.altKey) {
        if (evt.target) {
          var temp, oObjectType;
          var oObject = canvas.getActiveObject();

          if (oObject) {
            oObjectType = oObject.get("type");
            oObject.clone(function (cloned) {
              temp = cloned;
            });
            shapeCount.current = shapeCount.current + 1;
            temp.set({
              hasControls: false,
              hasBorders: false,
              name: oObjectType + shapeCount.current,
            });

            canvas.add(temp);
            canvas.renderAll();

            // Save the canvas to State variable
            const newCanvasState = canvas.toJSON(["name"]);
            saveCanvasState(newCanvasState);
          }
        }
      }
    });
    canvas.on("mouse:move", function (opt) {
      if (this.isDragging) {
        var e = opt.e;
        var vpt = this.viewportTransform;
        vpt[4] += e.clientX - this.lastPosX;
        vpt[5] += e.clientY - this.lastPosY;
        this.requestRenderAll();
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
      }
      if (newShape.current === true && canvasTool !== "pen") {
        return;
      }
      if (canvasTool === "rect") {
        mouseMoving.current = true;
        pointer.current = canvas.getPointer(opt);
        if (origX.current > pointer.current.x) {
          Rectangle.current.set({ left: Math.abs(pointer.current.x) });
        }
        if (origY.current > pointer.current.y) {
          Rectangle.current.set({ top: Math.abs(pointer.current.y) });
        }
        Rectangle.current.set({
          width: Math.abs(origX.current - pointer.current.x),
        });
        Rectangle.current.set({
          height: Math.abs(origY.current - pointer.current.y),
        });
        canvas.requestRenderAll();
      }
      if (canvasTool === "line") {
        mouseMoving.current = true;
        pointer.current = canvas.getPointer(opt);
        if (opt.e.shiftKey) {
          var { tx, ty } = determineAdjustedCoords(
            line.current.x1,
            line.current.y1,
            pointer.current.x,
            pointer.current.y
          );
          line.current.set({ x2: tx, y2: ty });
          // var deltaX = Math.abs(pointer.current.x - line.current.x1);
          // var deltaY = Math.abs(pointer.current.y - line.current.y1);
          // if (deltaX > deltaY)
          //   line.current.set({ x2: pointer.current.x, y2: line.current.y1 });
          // if (deltaY > deltaX)
          //   line.current.set({ x2: line.current.x1, y2: pointer.current.y });
        } else
          line.current.set({ x2: pointer.current.x, y2: pointer.current.y });

        canvas.renderAll();
      }
      if (canvasTool === "arrow") {
        mouseMoving.current = true;
        pointer.current = canvas.getPointer(opt);
        if (opt.e.shiftKey) {
          var { tx, ty } = determineAdjustedCoords(
            line.current.x1,
            line.current.y1,
            pointer.current.x,
            pointer.current.y
          );
          line.current.set({ x2: tx, y2: ty });
          // var deltaX = Math.abs(pointer.current.x - line.current.x1);
          // var deltaY = Math.abs(pointer.current.y - line.current.y1);
          // if (deltaX > deltaY)
          //   line.current.set({ x2: pointer.current.x, y2: line.current.y1 });
          // if (deltaY > deltaX)
          //   line.current.set({ x2: line.current.x1, y2: pointer.current.y });
        } else
          line.current.set({ x2: pointer.current.x, y2: pointer.current.y });

        let dx = line.current.x2 - line.current.x1,
          dy = line.current.y2 - line.current.y1;
        angle.current = Math.atan2(dy, dx);
        angle.current *= 180 / Math.PI;
        angle.current += 90;
        arrow.current.set({
          top: line.current.y2,
          left: line.current.x2,
          angle: angle.current,
          width: 15,
          height: 15,
        });
        canvas.renderAll();
      }
      if (canvasTool === "polyline") {
        if (isDrawing.current) {
          mouseMoving.current = true;
          var endPoint = canvas.getPointer(opt);
          var evt = opt.e;
          if (evt.shiftKey === true) {
            if (
              Math.abs(endPoint.x - line.current.x1) >
              Math.abs(endPoint.y - line.current.y1)
            ) {
              console.log("line should be horizontally strait");
              line.current.set({
                x2: endPoint.x,
                y2: line.current.y1,
              });
              canvas.renderAll();
              return;
            } else {
              console.log("line should be vertically strait");
              line.current.set({
                x2: line.current.x1,
                y2: endPoint.y,
              });
              canvas.renderAll();
              return;
            }
          }
          line.current.set({
            x2: endPoint.x,
            y2: endPoint.y,
          });
          canvas.renderAll();
        }
      }
      if (canvasTool === "polygon") {
        if (isDrawing.current) {
          mouseMoving.current = true;
          endPoint = canvas.getPointer(opt);
          line.current.set({
            x2: endPoint.x,
            y2: endPoint.y,
          });
          canvas.renderAll();
        }
      }
      if (canvasTool === "rpolygon") {
        mouseMoving.current = true;
        pointer.current = canvas.getPointer(opt);
        rpolygon.current.set({
          points: calcPolygonPoints(
            8,
            Math.abs(origX.current - pointer.current.x) / 2
          ),
          left: origX.current,
          top: origY.current,
        });
        canvas.renderAll();
      }
      if (canvasTool === "arc") {
        mouseMoving.current = true;
        pointer.current = canvas.getPointer(opt);
        var radius =
          Math.max(
            Math.abs(origY.current - pointer.current.y),
            Math.abs(origX.current - pointer.current.x)
          ) / 2;
        if (radius > circle.current.strokeWidth) {
          radius -= circle.current.strokeWidth / 2;
        }
        circle.current.set({ radius: radius });
        if (origX.current > pointer.current.x) {
          circle.current.set({ originX: "right" });
          circle.current.set({ angle: -135 });
        } else {
          circle.current.set({ originX: "left" });
          circle.current.set({ angle: 135 });
        }
        if (origY.current > pointer.current.y) {
          circle.current.set({ originY: "bottom" });
        } else {
          circle.current.set({ originY: "top" });
        }
        canvas.renderAll();
      }
      if (canvasTool === "circle") {
        mouseMoving.current = true;
        pointer.current = canvas.getPointer(opt);
        someValue.current =
          Math.max(
            Math.abs(origX.current - pointer.current.x),
            Math.abs(origY.current - pointer.current.y)
          ) / 20;
        radius =
          Math.max(
            Math.abs(origX.current - pointer.current.x),
            Math.abs(origY.current - pointer.current.y)
          ) / 2;
        // radius = Math.abs(origX.current - pointer.current.x) / 2;
        radius += someValue.current;
        if (radius > circle.current.strokeWidth) {
          radius -= circle.current.strokeWidth / 2;
        }
        circle.current.set({ radius: radius });
        if (origX.current > pointer.current.x) {
          circle.current.set({ originX: "right" });
        } else {
          circle.current.set({ originX: "left" });
        }
        if (origY.current > pointer.current.y) {
          circle.current.set({ originY: "bottom" });
        } else {
          circle.current.set({ originY: "top" });
        }
        canvas.renderAll();
      }
      if (canvasTool === "ellipse") {
        mouseMoving.current = true;
        pointer.current = canvas.getPointer(opt);
        var rx = Math.abs(origX.current - pointer.current.x) / 2;
        var ry = Math.abs(origY.current - pointer.current.y) / 2;
        someValue.current =
          Math.max(
            Math.abs(origX.current - pointer.current.x),
            Math.abs(origY.current - pointer.current.y)
          ) / 20;
        rx += someValue.current;
        ry += someValue.current;
        if (rx > ellipse.current.strokeWidth) {
          rx -= ellipse.current.strokeWidth / 2;
        }
        if (ry > ellipse.current.strokeWidth) {
          ry -= ellipse.current.strokeWidth / 2;
        }
        ellipse.current.set({ rx: rx, ry: ry });
        if (origX.current > pointer.current.x) {
          ellipse.current.set({ originX: "right" });
        } else {
          ellipse.current.set({ originX: "left" });
        }
        if (origY.current > pointer.current.y) {
          ellipse.current.set({ originY: "bottom" });
        } else {
          ellipse.current.set({ originY: "top" });
        }
        canvas.renderAll();
      }
    });

    canvas.on("mouse:over", function (e) {
      /*
      if (e.target) {
        //console.log(currentStroke.current);
        currentStroke.current = e.target.get("stroke");
        //console.log(currentStroke.current);
        e.target.set("stroke", "rgba(255,0,0,1)");
        canvas.renderAll();
      }
      */
    });

    canvas.on("mouse:out", function (e) {
      /*
      if (e.target) {
        e.target.set("stroke", currentStroke.current);
        canvas.renderAll();
      }
      */
    });

    setCanvas(canvas);

    return () => {
      canvas.dispose();
      imgFileRef.current.removeEventListener("change", handleImageFileLoad);
      window.removeEventListener("resize", handleResize);
    };
  }, [canvasRef, canvasTool, setCanvas]);

  //const onUndo = useCallback(() => moveHistory(-1), [moveHistory]);
  const onUndo = () => {
    const present = past.pop();
    const newFuture = [present, ...future];
    setFuture(newFuture);
    const previous = past[past.length - 1];
    canvas.loadFromJSON(previous);
    setPast(past);
    console.log(past);
  };
  // const onRedo = useCallback(() => moveHistory(1), [moveHistory]);
  const onRedo = () => {
    const next = future[0];
    canvas.loadFromJSON(next);
    const newFuture = future.slice(1);
    past.push(next);
    setPast(past);
    setFuture(newFuture);
    console.log(future);
  };
  const setShapeAttributes = (attributes) => {
    if (canvas === undefined) return;
    var activeShape = canvas.getActiveObject();
    if (activeShape) {
      var Attributes = attributes || {};
      if (activeShape.type === "group") {
        activeShape.item(0).set({
          stroke: Attributes.stroke || activeShape.item(1).stroke,
          strokeWidth:
            Attributes.strokeWidth || activeShape.item(1).strokeWidth,
        });
        activeShape.item(1).set({
          stroke: Attributes.stroke || activeShape.item(1).stroke,
          strokeWidth:
            Attributes.strokeWidth || activeShape.item(1).strokeWidth,
          fill: Attributes.fill || activeShape.item(1).fill,
        });
      }
      activeShape.set({
        strokeWidth: Attributes.strokeWidth || activeShape.strokeWidth,
        stroke:
          Attributes.stroke === "nill"
            ? null
            : Attributes.stroke || activeShape.stroke,
        fill:
          Attributes.fill === "nill"
            ? null
            : Attributes.fill || activeShape.fill,
        opacity: Attributes.opacity / 100 || activeShape.opacity,
        strokeDashArray:
          Attributes.strokeDashArray || activeShape.strokeDashArray,
        fontFamily: Attributes.fontFamily || activeShape.fontFamily,
        fontSize: Attributes.fontSize || activeShape.fontSize,
        fontWeight: Attributes.fontWeight || activeShape.fontWeight,
        fontStyle: Attributes.fontStyle || activeShape.fontStyle,
        textBackgroundColor:
          Attributes.textBackgroundColor || activeShape.textBackgroundColor,
      });
      canvas.renderAll();
      canvas.setActiveObject(activeShape);
      const newCanvasState = canvas.toJSON(["name"]);
      saveCanvasState(newCanvasState);
    }
  };

  function deleteObjects() {
    if (canvas.getActiveObjects().length === 0) {
      // window.location.reload();
      return;
    }
    canvas.getActiveObjects().forEach((obj) => {
      canvas.remove(obj);
    });
  }

  /*
  var simulateMouseEvent = function (element, eventName, coordX, coordY) {
    element.dispatchEvent(
      new MouseEvent(eventName, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: coordX,
        clientY: coordY,
        button: 0,
      })
    );
  };

  
  function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);
    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }
*/
  function w3_openPanel(evt, panelId) {
    if (currentOpenPanel !== panelId) {
      document.getElementById("Library").style.height = "400px";
      document.getElementById(panelId).style.display = "block";
      if (currentOpenPanel !== "none")
        document.getElementById(currentOpenPanel).style.display = "none";
      currentOpenPanel = panelId;
      return;
    }

    if (currentOpenPanel === panelId) {
      if (panelId === "none") return;
      document.getElementById(panelId).style.display = "none";
      currentOpenPanel = "none";
      document.getElementById("Library").style.height = "0px";
    }
    /*
    else {
      if (currentOpenPanel !== "None") {
        document.getElementById(currentOpenPanel).style.display = "none";
      }
      document.getElementById("Library").style.height = "400px";
      document.getElementById(panelId).style.display = "block";
      currentOpenPanel = panelId;
    }
    */
  }

  const setActiveTool = (e, id) => {
    if (currentToolId.current !== null) {
      //console.log(currentToolId);
      document.getElementById(currentToolId.current).style.backgroundColor =
        "#003059";
      document.getElementById(id).style.backgroundColor = "grey";
      currentToolId.current = id;
      return;
    } else {
      //console.log(id);
      document.getElementById(id).style.backgroundColor = "grey";
      currentToolId.current = id;
    }
  };

  function handleKeyDown(event) {
    if (mouseMoving.current === false) {
      if (event.key === "Escape") {
        setCanvasTool("select");
        setActiveTool(event, "select");
        return;
      }
      if (event.key === "s") {
        setCanvasTool("select");
        setActiveTool(event, "select");
        return;
      }
      if (event.key === "r") {
        setCanvasTool("rect");
        setActiveTool(event, "rect");
        return;
      }
      if (event.key === "l") {
        setCanvasTool("line");
        setActiveTool(event, "line");
        return;
      }
      if (event.key === "a") {
        setCanvasTool("arrow");
        setActiveTool(event, "arrow");
        return;
      }
      if (event.key === "c") {
        setCanvasTool("circle");
        setActiveTool(event, "circle");
        return;
      }
      if (event.key === "e") {
        setCanvasTool("ellipse");
        setActiveTool(event, "ellipse");
        return;
      }
      if (event.key === "t") {
        setCanvasTool("text");
        setActiveTool(event, "text");
        return;
      }
      if (event.key === "p") {
        setCanvasTool("pen");
        setActiveTool(event, "pen");
        return;
      }
      if (event.key === "Delete") {
        deleteObjects();
        return;
      }

      if (event.ctrlKey && event.key === "z") {
        if (past.length === 1) return;
        onUndo();
        return;
      }
      if (event.ctrlKey && event.key === "y") {
        if (future.length === 0) return;
        onRedo();
        return;
      }
      if (event.ctrlKey && event.key === "[") {
        var activeObj = canvas.getActiveObject();
        canvas.sendBackwards(activeObj);
        canvas.renderAll();
      }
      if (event.altKey && event.key === "[") {
        activeObj = canvas.getActiveObject();
        canvas.sendToBack(activeObj);
        canvas.renderAll();
      }
      if (event.ctrlKey && event.key === "]") {
        activeObj = canvas.getActiveObject();
        canvas.bringForward(activeObj);
        canvas.renderAll();
      }
      if (event.altKey && event.key === "]") {
        activeObj = canvas.getActiveObject();
        canvas.bringToFront(activeObj);
        canvas.renderAll();
      }
    }
    if (mouseMoving.current === true) {
      mouseMoving.current = false;
      if (event.key === "Escape") {
        if (canvasTool === "rect") {
          canvas.remove(Rectangle.current);
          newShape.current = true;
          shapeCount.current--;
          return;
        }
        if (canvasTool === "line") {
          canvas.remove(line.current);
          newShape.current = true;
          shapeCount.current--;
          return;
        }
        if (canvasTool === "arrow") {
          canvas.remove(line.current);
          canvas.remove(arrow.current);
          newShape.current = true;
          return;
        }
        if (canvasTool === "polyline") {
          canvas.remove(line.current);
          //canvas.remove(polyLine.current);
          newShape.current = true;
          return;
        }
        if (canvasTool === "polygon") {
          canvas.remove(line.current);
          newShape.current = true;
          return;
        }
        if (canvasTool === "rpolygon") {
          canvas.remove(rpolygon.current);
          newShape.current = true;
          shapeCount.current--;
          return;
        }
        if (canvasTool === "arc") {
          canvas.remove(circle.current);
          newShape.current = true;
          shapeCount.current--;
          return;
        }
        if (canvasTool === "circle") {
          canvas.remove(circle.current);
          newShape.current = true;
          shapeCount.current--;
          return;
        }
        if (canvasTool === "ellipse") {
          canvas.remove(ellipse.current);
          newShape.current = true;
          shapeCount.current--;
          return;
        }
      }
      //setActiveTool(event, "select");
    }
  }

  let url = "#";

  const swatchStyles = reactCSS({
    default: {
      stroke: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: `rgba(${stroke.r}, ${stroke.g}, ${stroke.b}, ${stroke.a})`,
      },
      blank: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
      },
      fill: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: `rgba(${fill.r}, ${fill.g}, ${fill.b}, ${fill.a})`,
      },
      highlight: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: `rgba(${textHighlight.r}, ${textHighlight.g}, ${textHighlight.b}, ${textHighlight.a})`,
      },
      swatch: {
        padding: "0px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
        backgroundImage: "url(images/no.png)",
      },
      pickerContainer: {
        display: "inline-block",
      },
      popover: {
        position: "absolute",
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        top: "50px",
        right: "0px",
        bottom: "0px",
        left: "100px",
      },
    },
  });

  return (
    <MediaQuery minDeviceWidth={1224}>
      {/* <h1>Device Test!</h1>
      {isDesktopOrLaptop && <p>You are a desktop or laptop</p>}
      {isBigScreen && <p>You have a huge screen</p>}
      {isTabletOrMobile && <p>You are a tablet or mobile phone</p>}
      <p>Your are in {isPortrait ? "portrait" : "landscape"} orientation</p>
      {isRetina && <p>You are retina</p>} */}
      <div
        ref={mainDiv}
        className="App"
        id="mainDiv"
        onKeyDown={(e) => {
          handleKeyDown(e);
          document.getElementById("my-fabric-canvas").focus();
        }}
        tabIndex={-1}
        // tabIndex="0"
      >
        <div className={tbStyles.propBar}>
          <a href={url}>
            <button
              className={tbStyles.buttontoolbar}
              onClick={onUndo}
              id="undo"
              //disabled={canvasHistory[0] === canvasState}
              disabled={past.length === 1}
            >
              <div className={tbStyles.tooltipDown}>
                <img src={imgUndo} alt="Undo"></img>
                <span className={tbStyles.tooltiptextDown}>Undo</span>
              </div>
            </button>
            <button
              className={tbStyles.buttontoolbar}
              onClick={onRedo}
              id="redo"
              //disabled={canvasHistory[canvasHistory.length - 1] === canvasState}
              disabled={future.length === 0}
            >
              <div className={tbStyles.tooltipDown}>
                <img src={imgRedo} alt="Redo"></img>
                <span className={tbStyles.tooltiptextDown}>Redo</span>
              </div>
            </button>
            <button
              className={tbStyles.buttontoolbar}
              onClick={deleteObjects}
              id="del"
            >
              <div className={tbStyles.tooltipDown}>
                <img src={imgDelete} alt="Delete"></img>
                <span className={tbStyles.tooltiptextDown}>Delete</span>
              </div>
            </button>
          </a>
          <div className={tbStyles.dropdown}>
            <button className={tbStyles.buttontoolbar} id="wList">
              <img src={imglineWidth} alt="Line Width"></img>
              <div id="wlDropDown" className={tbStyles.dropdowncontent}>
                <a
                  href={url}
                  onClick={(e) => {
                    setStrokeWidth(1);
                    setShapeAttributes({
                      strokeWidth: 1,
                    });
                  }}
                >
                  <img src={imgStroke1} alt="1"></img>
                </a>
                <a
                  href={url}
                  onClick={(e) => {
                    setStrokeWidth(2);
                    setShapeAttributes({
                      strokeWidth: 2,
                    });
                  }}
                >
                  <img src={imgStroke2} alt="2"></img>
                </a>
                <a
                  href={url}
                  onClick={(e) => {
                    setStrokeWidth(4);
                    setShapeAttributes({
                      strokeWidth: 4,
                    });
                  }}
                >
                  <img src={imgStroke4} alt="4"></img>
                </a>
                <a
                  href={url}
                  onClick={(e) => {
                    setStrokeWidth(5);
                    setShapeAttributes({
                      strokeWidth: 5,
                    });
                  }}
                >
                  <img src={imgStroke5} alt="5"></img>
                </a>
                <a
                  href={url}
                  onClick={(e) => {
                    setStrokeWidth(10);
                    setShapeAttributes({
                      strokeWidth: 10,
                    });
                  }}
                >
                  <img src={imgStroke10} alt="10"></img>
                </a>
                <a
                  href={url}
                  onClick={(e) => {
                    setStrokeWidth(12);
                    setShapeAttributes({
                      strokeWidth: 12,
                    });
                  }}
                >
                  <img src={imgStroke12} alt="12"></img>
                </a>
                <a
                  href={url}
                  onClick={(e) => {
                    setStrokeWidth(15);
                    setShapeAttributes({
                      strokeWidth: 15,
                    });
                  }}
                >
                  <img src={imgStroke15} alt="15"></img>
                </a>
                <a
                  href={url}
                  onClick={(e) => {
                    setStrokeWidth(20);
                    setShapeAttributes({
                      strokeWidth: 20,
                    });
                  }}
                >
                  <img src={imgStroke20} alt="20"></img>
                </a>
                <a
                  href={url}
                  onClick={(e) => {
                    setStrokeWidth(25);
                    setShapeAttributes({
                      strokeWidth: 25,
                    });
                  }}
                >
                  <img src={imgStroke25} alt="25"></img>
                </a>
              </div>
            </button>
          </div>
          <div className={tbStyles.dropdown}>
            <button className={tbStyles.buttontoolbar} id="sList">
              <img src={imgLineStyle} alt="Line Style"></img>
              <div id="lsDropDown" className={tbStyles.dropdowncontent}>
                <a
                  href={url}
                  onClick={(e) => {
                    setDashSize(0);
                    setGapSize(0);
                    setShapeAttributes({
                      strokeDashArray: [0, 0],
                    });
                  }}
                >
                  <img src={imgLineStyle1} alt="1"></img>
                </a>
                <a
                  href={url}
                  onClick={(e) => {
                    setDashSize(10);
                    setGapSize(5);
                    setShapeAttributes({
                      strokeDashArray: [10, 5],
                    });
                  }}
                >
                  <img src={imgLineStyle2} alt="1"></img>
                </a>
                <a
                  href={url}
                  onClick={(e) => {
                    setDashSize(10);
                    setGapSize(5);
                    setShapeAttributes({
                      strokeDashArray: [10, 5],
                    });
                  }}
                >
                  <img src={imgLineStyle3} alt="1"></img>
                </a>
                <a
                  href={url}
                  onClick={(e) => {
                    setDashSize(20);
                    setGapSize(5);
                    setShapeAttributes({
                      strokeDashArray: [20, 5],
                    });
                  }}
                >
                  <img src={imgLineStyle4} alt="1"></img>
                </a>
                <a
                  href={url}
                  onClick={(e) => {
                    setDashSize(20);
                    setGapSize(10);
                    setShapeAttributes({
                      strokeDashArray: [20, 10],
                    });
                  }}
                >
                  <img src={imgLineStyle5} alt="1"></img>
                </a>
                <a
                  href={url}
                  onClick={(e) => {
                    setDashSize(5);
                    setGapSize(5);
                    setShapeAttributes({
                      strokeDashArray: [5, 5],
                    });
                  }}
                >
                  <img src={imgLineStyle6} alt="1"></img>
                </a>
                <a
                  href={url}
                  onClick={(e) => {
                    setDashSize(2);
                    setGapSize(2);
                    setShapeAttributes({
                      strokeDashArray: [2, 2],
                    });
                  }}
                >
                  <img src={imgLineStyle7} alt="1"></img>
                </a>
              </div>
            </button>
          </div>
          <button className={tbStyles.buttontoolbar} id="dropper">
            <div className={tbStyles.tooltipDown}>
              <img src={imgDropper} alt="Pick a color"></img>
              <span className={tbStyles.tooltiptextDown}>Pick a color</span>
            </div>
          </button>
          &nbsp;Stroke&nbsp;
          <input
            type="number"
            id="strokePoint"
            value={strokeWidth}
            min="0"
            max="50"
            onChange={(e) => {
              setStrokeWidth(+e.target.value);
              setShapeAttributes({
                strokeWidth: +e.target.value,
              });
            }}
          ></input>
          &nbsp;Dash&nbsp;
          <input
            type="number"
            min="0"
            max="20"
            id="dashSize"
            value={dashSize}
            onChange={(e) => {
              setDashSize(+e.target.value);
              setShapeAttributes({
                strokeDashArray: [+e.target.value, +e.target.value],
              });
            }}
          ></input>
          &nbsp;Stroke Color&nbsp;
          <div style={swatchStyles.pickerContainer}>
            <Picker
              setPickerColor={setPickerColorStroke}
              type="Stroke"
              ref={activeObjectStrokeRef}
            />
          </div>
          &nbsp;Fill Color&nbsp;
          <div style={swatchStyles.pickerContainer}>
            <Picker
              setPickerColor={setPickerColorFill}
              type="Fill"
              ref={activeObjectFillRef}
            />
          </div>
          {/* <div style={swatchStyles.pickerContainer}>
            <div style={swatchStyles.swatch} onClick={StrokeSwatchClick}>
              <div style={swatchStyles.stroke} />
            </div>
            {showStrokePicker ? (
              <div style={swatchStyles.popover}>
                <div style={swatchStyles.cover} onClick={StrokeSwatchClose} />
                <SketchPicker color={stroke} onChange={StrokeSwatchChange} />
              </div>
            ) : null}
          </div> */}
          {/* &nbsp;Fill Color&nbsp;
          <div style={swatchStyles.pickerContainer}>
            <div style={swatchStyles.swatch} onClick={FillSwatchClick}>
              <div id="fillSwatch" style={swatchStyles.fill} />
            </div>
            {showFillPicker ? (
              <div style={swatchStyles.popover}>
                <div style={swatchStyles.cover} onClick={FillSwatchClose} />
                <SketchPicker color={fill} onChange={FillSwatchChange} />
              </div>
            ) : null}
          </div> */}
          {/* &nbsp;HighlightText&nbsp;
          <div style={swatchStyles.pickerContainer}>
            <div style={swatchStyles.swatch} onClick={HighlightSwatchClick}>
              <div style={swatchStyles.highlight} />
            </div>
            {showHighlightPicker ? (
              <div style={swatchStyles.popover}>
                <div
                  style={swatchStyles.cover}
                  onClick={HighlightSwatchClose}
                />
                <SketchPicker
                  color={textHighlight}
                  onChange={HighlightSwatchChange}
                />
              </div>
            ) : null}
          </div> */}
          {/* &nbsp;
          <button
            id="noStroke"
            onClick={(e) => {
              setStrokeColor({ r: 255, g: 255, b: 255, a: 0 });
              setShapeAttributes({
                stroke: "rgba(255,255,255,0)",
              });
            }}
          >
            <div className={tbStyles.tooltipDown}>
              <img src={imgNoStroke} alt="No stroke"></img>
              <span className={tbStyles.tooltiptextDown}>Set No Stroke</span>
            </div>
          </button>
          &nbsp;
          <button
            id="noFill"
            onClick={(e) => {
              setFillColor({ r: 255, g: 255, b: 255, a: 0 });
              setShapeAttributes({
                fill: "rgba(255,255,255,0)",
              });
            }}
          >
            <div className={tbStyles.tooltipDown}>
              <img src={imgNoFill} alt="No fill"></img>
              <span className={tbStyles.tooltiptextDown}>Set No Fill</span>
            </div>
          </button> */}
          &nbsp;Opacity
          <input
            type="range"
            id="opacityRange"
            value={opacity}
            onChange={(e) => {
              //opacity.current = e.target.value;
              setOpacity(e.target.value);
              setShapeAttributes({
                opacity: e.target.value,
              });
            }}
          ></input>
          &nbsp; Angle snap:
          <input
            type="checkbox"
            id="chkSnap"
            onChange={(e) => {
              //console.log(e.target.checked);
              snap.current = e.target.checked;
            }}
          ></input>
          &nbsp;Font
          <select
            name="fonts"
            id="fonts"
            onChange={(e) => {
              setFont(e.target.value);
              setShapeAttributes({ fontFamily: e.target.value });
            }}
          ></select>
          &nbsp;Size
          <input
            type="number"
            id="fontSize"
            value={fontSize}
            min="0"
            max="100"
            onChange={(e) => {
              setFontSize(+e.target.value);
              setShapeAttributes({
                fontSize: +e.target.value,
              });
            }}
          ></input>
          &nbsp;
          <label>
            FontWeight:
            <select
              value={fontWeight}
              onChange={(e) => {
                setFontWeight(e.target.value);
                setShapeAttributes({
                  fontWeight: e.target.value,
                });
              }}
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
            </select>
          </label>
          <label>
            FontSyle:
            <select
              value={fontStyle}
              onChange={(e) => {
                setFontStyle(e.target.value);
                setShapeAttributes({
                  fontStyle: e.target.value,
                });
              }}
            >
              <option value="regular">Regular</option>
              <option value="italic">Italic</option>
            </select>
          </label>
          <input
            ref={imgFileRef}
            type="file"
            id="FileUpload1"
            style={{ display: "none" }}
          />
        </div>
        <div id="lMenu" className={styles.menu}>
          <div className={styles.tableft}>
            <button
              onMouseEnter={(e) => {
                w3_openPanel(e, "File");
              }}
              onClick={(e) => {
                w3_openPanel(e, currentOpenPanel);
              }}
            >
              <div className={styles.tooltip}>
                <img src={imgFileAccess} alt="FileAccess"></img>
                <span className={styles.tooltiptextleft}>File Access</span>
              </div>
            </button>
            <button
              onClick={(e) => {
                w3_openPanel(e, currentOpenPanel);
              }}
              onMouseEnter={(e) => {
                w3_openPanel(e, "CanvasSet");
              }}
            >
              <div className={styles.tooltip}>
                <img src={imgCanvasSettings} alt="Canvas Settings"></img>
                <span className={styles.tooltiptextleft}>Canvas Settings</span>
              </div>
            </button>
            <button
              onClick={(e) => {
                w3_openPanel(e, currentOpenPanel);
              }}
              onMouseEnter={(e) => {
                w3_openPanel(e, "LayerSet");
              }}
            >
              <div className={styles.tooltip}>
                <img src={imgLayers} alt="Layers"></img>
                <span className={styles.tooltiptextleft}>Layers</span>
              </div>
            </button>
            <button
              onClick={(e) => {
                w3_openPanel(e, currentOpenPanel);
              }}
              onMouseEnter={(e) => {
                w3_openPanel(e, "Warehouse");
              }}
            >
              <div className={styles.tooltip}>
                <img src={imgWarehouse} alt="Warehouse"></img>
                <span className={styles.tooltiptextleft}>Warehouse</span>
              </div>
            </button>
            <button
              onClick={(e) => {
                w3_openPanel(e, currentOpenPanel);
              }}
              onMouseEnter={(e) => {
                w3_openPanel(e, "Phases");
              }}
            >
              <div className={styles.tooltip}>
                <img src={imgPhase} alt="Phases"></img>
                <span className={styles.tooltiptextleft}>Phases</span>
              </div>
            </button>
            <button
              onClick={(e) => {
                w3_openPanel(e, currentOpenPanel);
              }}
              onMouseEnter={(e) => {
                w3_openPanel(e, "Measures");
              }}
            >
              <div className={styles.tooltip}>
                <img src={imgMeasurement} alt="Measurements"></img>
                <span className={styles.tooltiptextleft}>Measures</span>
              </div>
            </button>
            <button
              onClick={(e) => {
                w3_openPanel(e, currentOpenPanel);
              }}
              onMouseEnter={(e) => {
                w3_openPanel(e, "Animation");
              }}
            >
              <div className={styles.tooltip}>
                <img src={imgAnimation} alt="Animation"></img>
                <span className={styles.tooltiptextleft}>Phase Player</span>
              </div>
            </button>
            <div className={styles.tabbar}></div>
          </div>
        </div>
        <div
          id="Library"
          className={styles.library}
          onClick={(e) => {
            //document.getElementById("File").style.display = "none";
            w3_openPanel(e, currentOpenPanel);
          }}
        >
          <div id="File" className={styles.File} style={{ display: "none" }}>
            File Access
            <span
              onClick={(e) => {
                //document.getElementById("File").style.display = "none";
                w3_openPanel(e, currentOpenPanel);
              }}
              className={tbStyles.close}
              title="Close Modal"
            >
              &times;
            </span>
            <div className={styles.btngroup}>
              <div className={styles.tooltip}>
                <button>
                  <img src={imgNewFile} alt="NewFile"></img>
                </button>
                <span className={styles.tooltiptextB}>New File</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src={imgOpenFile} alt="OpenFile"></img>
                </button>
                <span className={styles.tooltiptextB}>Open File</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src={imgRecentFile} alt="RecentFile"></img>
                </button>
                <span className={styles.tooltiptextB}>Recent File</span>
              </div>
            </div>
          </div>
          <div
            id="CanvasSet"
            className={styles.CanvasSet}
            style={{ display: "none" }}
          >
            Canvas Settings
            <span
              onClick={(e) => {
                //document.getElementById("File").style.display = "none";
                w3_openPanel(e, currentOpenPanel);
              }}
              className={tbStyles.close}
              title="Close Modal"
            >
              &times;
            </span>
            <div className={styles.btngroup}>
              <div className={styles.tooltip}>
                <button>
                  <img src={imgCanvasSize} alt="CanvasSize"></img>
                </button>
                <span className={styles.tooltiptextB}>Canvas Size</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src={imgCanvasColor} alt="CanvasColor"></img>
                </button>
                <span className={styles.tooltiptextB}>Canvas Color</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src={imgCanvasImage} alt="CanvasImage"></img>
                </button>
                <span className={styles.tooltiptextB}>Canvas Image</span>
              </div>
            </div>
          </div>
          <div
            id="LayerSet"
            className={styles.LayerSet}
            style={{ display: "none" }}
          >
            Layers
            <span
              onClick={(e) => {
                //document.getElementById("File").style.display = "none";
                w3_openPanel(e, currentOpenPanel);
              }}
              className={tbStyles.close}
              title="Close Modal"
            >
              &times;
            </span>
            <div className={styles.sbtngroup}>
              <div className={styles.tooltip}>
                <button>
                  <img src={imgLayerBefore} alt="AddLayerBefore"></img>
                </button>
                <span className={styles.tooltiptextB}>Add Layer Before</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src={imgLayerAfter} alt="AddLayerAfter"></img>
                </button>
                <span className={styles.tooltiptextB}>Add Layer After</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src={imgLayerUp} alt="LayerUp"></img>
                </button>
                <span className={styles.tooltiptextB}>Layer Up</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src={imgLayerDown} alt="LayerDown"></img>
                </button>
                <span className={styles.tooltiptextB}>Layer Down</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src={imgLayerHide} alt="HideLayer"></img>
                </button>
                <span className={styles.tooltiptextB}>Hide Layer</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src={imgLayerLock} alt="LockLayer"></img>
                </button>
                <span className={styles.tooltiptextB}>Lock Layer</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src={imgLayerSort} alt="SortLayer"></img>
                </button>
                <span className={styles.tooltiptextB}>Sort layer</span>
              </div>
            </div>
            <ul className={styles.a}>
              <li>Shapes</li>
              <ul>
                <li>Circle</li>
                <li>Rectangle</li>
              </ul>
              <li>Texts</li>
              <li>Lines</li>
            </ul>
          </div>
          <div
            id="Warehouse"
            className={styles.Warehouse}
            style={{ display: "none" }}
          >
            Warehouse
            <span
              onClick={(e) => {
                //document.getElementById("File").style.display = "none";
                w3_openPanel(e, currentOpenPanel);
              }}
              className={tbStyles.close}
              title="Close Modal"
            >
              &times;
            </span>
            <div className={styles.btngroup}>
              <div className={styles.tooltip}>
                <button>
                  <img src={imgCrane} alt="Crane"></img>
                </button>
                <span className={styles.tooltiptextB}>Crane</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src={imgElevator} alt="Elevator"></img>
                </button>
                <span className={styles.tooltiptextB}>Elevator</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src={imgLabels} alt="Labels"></img>
                </button>
                <span className={styles.tooltiptextB}>Labels</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src={imgCloud2} alt="Cloud"></img>
                </button>
                <span className={styles.tooltiptextB}>Cloud</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src={imgCallout} alt="Callout"></img>
                </button>
                <span className={styles.tooltiptextB}>Callout</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src={imgWedge} alt="Wedge"></img>
                </button>
                <span className={styles.tooltiptextB}>Wedge</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src={imgRing} alt="Ring"></img>
                </button>
                <span className={styles.tooltiptextB}>Ring</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src={imgFilledArc} alt="FilledArc"></img>
                </button>
                <span className={styles.tooltiptextB}>Filled Arc</span>
              </div>
            </div>
          </div>
          <div
            id="Phases"
            className={styles.Phases}
            style={{ display: "none" }}
          >
            Phases
            <span
              onClick={(e) => {
                //document.getElementById("File").style.display = "none";
                w3_openPanel(e, currentOpenPanel);
              }}
              className={tbStyles.close}
              title="Close Modal"
            >
              &times;
            </span>
            <div className={styles.btngroup}>
              <div className={styles.tooltip}>
                <button>
                  <img src={imgNewPhase} alt="NewPhase"></img>
                </button>
                <span className={styles.tooltiptextB}>NewPhase</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src={imgPhaseStart} alt="StartDate"></img>
                </button>
                <span className={styles.tooltiptextB}>Start Date</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src={imgPhaseEnd} alt="EndDate"></img>
                </button>
                <span className={styles.tooltiptextB}>End Date</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src={imgPhaseDelete} alt="DeletePhase"></img>
                </button>
                <span className={styles.tooltiptextB}>Delete Phase </span>
              </div>
            </div>
          </div>
          <div
            id="Measures"
            className={styles.Measures}
            style={{ display: "none" }}
          >
            Measurement
            <span
              onClick={(e) => {
                //document.getElementById("File").style.display = "none";
                w3_openPanel(e, currentOpenPanel);
              }}
              className={tbStyles.close}
              title="Close Modal"
            >
              &times;
            </span>
            <div className={styles.btngroup}>
              <div className={styles.tooltip}>
                <button>
                  <img src={imgPageScale} alt="PageScale"></img>
                </button>
                <span className={styles.tooltiptextB}>Page Scale</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src={imgSetUnits} alt="SetUnits"></img>
                </button>
                <span className={styles.tooltiptextB}>Set Units</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src={imgLength} alt="Length"></img>
                </button>
                <span className={styles.tooltiptextB}>Length</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src={imgPerimeter} alt="Perimeter"></img>
                </button>
                <span className={styles.tooltiptextB}>Perimeter</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src={imgArea} alt="Area"></img>
                </button>
                <span className={styles.tooltiptextB}>Area</span>
              </div>
            </div>
          </div>
          <div
            id="Animation"
            className={styles.Animation}
            style={{ display: "none" }}
          >
            Phase Player
            <span
              onClick={(e) => {
                //document.getElementById("File").style.display = "none";
                w3_openPanel(e, currentOpenPanel);
              }}
              className={tbStyles.close}
              title="Close Modal"
            >
              &times;
            </span>
            <div className={styles.sbtngroup}>
              <div className={styles.tooltip}>
                <button>Phase1</button>
                <span className={styles.tooltiptextB}>Play</span>
              </div>
              <div className={styles.tooltip}>
                <button>Phase2</button>
                <span className={styles.tooltiptextB}>Play</span>
              </div>
              <div className={styles.tooltip}>
                <button>Phase3</button>
                <span className={styles.tooltiptextB}>Play</span>
              </div>
            </div>
            <div className={styles.sbtngroup}>
              <div className={styles.tooltip}>
                <button>
                  <img src={imgPlay} alt="Play"></img>
                </button>
                <span className={styles.tooltiptextB}>Play/Stop</span>
              </div>
              <input type="range" min="1" max="100"></input>
              Play Speed
              <div className={styles.tooltip}>
                <button>1</button>
                <span className={styles.tooltiptextB}>1 Day/Second</span>
              </div>
              <div className={styles.tooltip}>
                <button>2</button>
                <span className={styles.tooltiptextB}>2 Day/Second</span>
              </div>
              <div className={styles.tooltip}>
                <button>5</button>
                <span className={styles.tooltiptextB}>5 Day/Second</span>
              </div>
              <div className={styles.tooltip}>
                <button>10</button>
                <span className={styles.tooltiptextB}>10 Day/Second</span>
              </div>
              <div className={styles.tooltip}>
                <button>30</button>
                <span className={styles.tooltiptextB}>30 Day/Second</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right} ref={rightBar}>
          <div className={styles.tab}>
            <button
              id="select"
              onClick={(e) => {
                canvas.isDrawingMode = false;
                canvas.selection = true;
                setCanvasTool("select");
                setActiveTool(e, "select");
              }}
            >
              <div className={styles.tooltip}>
                <img src={imgSelection} alt="Select"></img>
                <span className={styles.tooltiptext}>Selection [S]</span>
              </div>
            </button>
            <button
              id="text"
              onClick={(e) => {
                canvas.isDrawingMode = false;
                canvas.selection = false;
                setCanvasTool("text");
                setActiveTool(e, "text");
              }}
            >
              <div className={styles.tooltip}>
                <img src={imgText} alt="TextBox"></img>
                <span className={styles.tooltiptext}>Text [T]</span>
              </div>
            </button>
            <button
              id="pen"
              onClick={(e) => {
                setCanvasTool("pen");
                canvas.isDrawingMode = 1;
                if (stroke.a === 0) setStrokeColor({ r: 0, g: 0, b: 0, a: 1 });
                canvas.freeDrawingBrush.color = stroke;
                canvas.freeDrawingBrush.width = strokeWidth;
                setActiveTool(e, "pen");
              }}
            >
              <div className={styles.tooltip}>
                <img src={imgFreeHand} alt="Pen"></img>
                <span className={styles.tooltiptext}>Free-hand [H]</span>
              </div>
            </button>
            <button
              id="cloud"
              onClick={(e) => {
                canvas.isDrawingMode = false;
                canvas.selection = false;
                setCanvasTool("cloud");
                setActiveTool(e, "cloud");
              }}
            >
              <div className={styles.tooltip}>
                <img src={imgCloud} alt="Cloud"></img>
                <span className={styles.tooltiptext}>Cloud</span>
              </div>
            </button>
            <button
              id="callout"
              onClick={(e) => {
                canvas.isDrawingMode = false;
                canvas.selection = false;
                setCanvasTool("callout");
                setActiveTool(e, "callout");
              }}
            >
              <div className={styles.tooltip}>
                <img src={imgCallout} alt="Callout"></img>
                <span className={styles.tooltiptext}>Callout</span>
              </div>
            </button>
            <button
              id="image"
              onClick={(e) => {
                canvas.isDrawingMode = false;
                canvas.selection = false;
                setCanvasTool("image");
                setActiveTool(e, "image");
              }}
            >
              <div className={styles.tooltip}>
                <img src={imgImageEdit} alt="Edit"></img>
                <span className={styles.tooltiptext}>Image Edit [I]</span>
              </div>
            </button>
            <div className={styles.tabspace}></div>
            <button
              id="line"
              onClick={(e) => {
                canvas.isDrawingMode = false;
                canvas.selection = false;
                editPoly.current = true;
                setCanvasTool("line");
                setActiveTool(e, "line");
              }}
            >
              <div className={styles.tooltip}>
                <img src={imgLine} alt="Line"></img>
                <span className={styles.tooltiptext}>Line [L]</span>
              </div>
            </button>
            <button
              id="polyline"
              onClick={(e) => {
                canvas.isDrawingMode = false;
                setCanvasTool("polyline");
                setActiveTool(e, "polyline");
                canvas.selection = false;
                var objects = canvas.getObjects();
                for (var i = 0; i < objects.length; i++) {
                  objects[i].set({ selectable: false, evented: false });
                }
              }}
            >
              <div className={styles.tooltip}>
                <img src={imgPolyline} alt="Polyline"></img>
                <span className={styles.tooltiptext}>Polyline [P]</span>
              </div>
            </button>
            <button
              id="arrow"
              onClick={(e) => {
                canvas.isDrawingMode = false;
                canvas.selection = false;
                setCanvasTool("arrow");
                setActiveTool(e, "arrow");
              }}
            >
              <div className={styles.tooltip}>
                <img src={imgArrow} alt="Arrow"></img>
                <span className={styles.tooltiptext}>Arrow [A]</span>
              </div>
            </button>
            <button
              id="arc"
              onClick={(e) => {
                canvas.isDrawingMode = false;
                canvas.selection = false;
                setCanvasTool("arc");
                setActiveTool(e, "arc");
              }}
            >
              <div className={styles.tooltip}>
                <img src={imgArc} alt="Arc"></img>
                <span className={styles.tooltiptext}>Arc [Q]</span>
              </div>
            </button>
            <button
              id="rect"
              onClick={(e) => {
                canvas.isDrawingMode = false;
                canvas.selection = false;
                canvas.selection = false;
                canvas.forEachObject(function (o) {
                  o.selectable = false;
                });
                canvas.renderAll();
                setCanvasTool("rect");
                setActiveTool(e, "rect");
              }}
            >
              <div className={styles.tooltip}>
                <img src={imgRect} alt="Rectangle"></img>
                <span className={styles.tooltiptext}>Rectangle [R]</span>
              </div>
            </button>
            <button
              id="polygon"
              onClick={(e) => {
                canvas.isDrawingMode = false;
                canvas.selection = false;
                setCanvasTool("polygon");
                setActiveTool(e, "polygon");
              }}
            >
              <div className={styles.tooltip}>
                <img src={imgPolygon} alt="Polygon"></img>
                <span className={styles.tooltiptext}>Polygon [G]</span>
              </div>
            </button>
            <button
              id="rpolygon"
              onClick={(e) => {
                canvas.isDrawingMode = false;
                canvas.selection = false;
                setCanvasTool("rpolygon");
                setActiveTool(e, "rpolygon");
              }}
            >
              <div className={styles.tooltip}>
                <img src={imgRPolygon} alt="Regular Polygon"></img>
                <span className={styles.tooltiptext}>Regular Polygon [U]</span>
              </div>
            </button>
            <button
              id="circle"
              onClick={(e) => {
                canvas.isDrawingMode = false;
                canvas.selection = false;
                setCanvasTool("circle");
                setActiveTool(e, "circle");
              }}
            >
              <div className={styles.tooltip}>
                <img src={imgCircle} alt="Circle"></img>
                <span className={styles.tooltiptext}>Circle [C]</span>
              </div>
            </button>
            <button
              id="ellipse"
              onClick={(e) => {
                canvas.isDrawingMode = false;
                canvas.selection = false;
                setCanvasTool("ellipse");
                setActiveTool(e, "ellipse");
              }}
            >
              <div className={styles.tooltip}>
                <img src={imgEllipse} alt="Ellipse"></img>
                <span className={styles.tooltiptext}>Ellipse {"  "} [E]</span>
              </div>
            </button>
            <div className={styles.tabspace}></div>
            <button
              id="dimension"
              onClick={(e) => {
                canvas.isDrawingMode = false;
                canvas.selection = false;
                setCanvasTool("dimension");
                setActiveTool(e, "dimension");
              }}
            >
              <div className={styles.tooltip}>
                <img src={imgDimension} alt="Dimension"></img>
                <span className={styles.tooltiptext}>Dimension [D]</span>
              </div>
            </button>

            <button
              id="area"
              onClick={(e) => {
                canvas.isDrawingMode = false;
                canvas.selection = false;
                setCanvasTool("area");
                setActiveTool(e, "area");
              }}
            >
              <div className={styles.tooltip}>
                <img src={imgArea} alt="Area"></img>
                <span className={styles.tooltiptext}>Area</span>
              </div>
            </button>
            <button
              id="length"
              onClick={(e) => {
                canvas.isDrawingMode = false;
                canvas.selection = false;
                setCanvasTool("length");
                setActiveTool(e, "length");
              }}
            >
              <div className={styles.tooltip}>
                <img src={imgLength} alt="Length"></img>
                <span className={styles.tooltiptext}>Length</span>
              </div>
            </button>
            <button
              id="perimeter"
              onClick={(e) => {
                canvas.isDrawingMode = false;
                canvas.selection = false;
                setCanvasTool("perimeter");
                setActiveTool(e, "perimeter");
              }}
            >
              <div className={styles.tooltip}>
                <img src={imgPerimeter} alt="Perimeter"></img>
                <span className={styles.tooltiptext}>Perimeter</span>
              </div>
            </button>
          </div>
        </div>
        <div ref={containerRef}>
          <canvas
            ref={canvasRef}
            id="my-fabric-canvas"
            width={
              isBigScreen
                ? 1191
                : isDesktopOrLaptop
                ? 1086
                : isTabletOrMobile
                ? 960
                : 640
            }
            height={
              isBigScreen
                ? 842
                : isDesktopOrLaptop
                ? 768
                : isTabletOrMobile
                ? 540
                : 320
            }
          ></canvas>
        </div>
      </div>
    </MediaQuery>
  );
};

export default App;
