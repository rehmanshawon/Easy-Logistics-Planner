import React, { useRef, useState } from "react";
import { fabric } from "fabric";
import { SketchPicker } from "react-color";
import MediaQuery from "react-responsive";
import reactCSS from "reactcss";

import "./styles.css";
import styles from "./rightMenu.module.css";
import tbStyles from "./toolbar.module.css";

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
const App = () => {
  //const mforceUpdate = useForceUpdate();
  // for undo/redoing
  const [past, setPast] = useState([initialState]);
  const [future, setFuture] = useState([initialState]);
  //const [newAction, setNewAction] = useState(0);
  const [pageLoad, setPageLoad] = useState(null);
  // const canvasRender = useRef(0);
  const canvasRef = useRef();
  const mainDiv = useRef(null);
  const rightBar = useRef();
  const shapeCount = useRef(0);
  const isDrawing = useRef(false);
  const currentStroke = useRef("");
  const editPoly = useRef(true);
  const openPoly = useRef(null);
  const polyType = useRef("");
  //const [reRender, forceUpdate] = useReducer((x) => x + 1, 0);
  //const forceUpdate = React.useReducer(() => ({}))[1];
  //const [, updateComponent] = React.useState();
  //const forceUpdateComponent = React.useCallback(() => updateComponent({}), []);
  //anchors
  const [canvas, setCanvas] = useState();
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
    setShapeAttributes({
      stroke:
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
      fireMiddleClick: true, // <-- enable firing of middle click events
      stopContextMenu: true,
      controlsAboveOverlay: false,
      preserveObjectStacking: true,
      perPixelTargetFind: true,
    });
    if (pageLoad === null && sessionStorage.myFabricJSCanvas !== undefined) {
      setPageLoad(1);
      //console.log(sessionStorage.myFabricJSCanvas);
      const data = JSON.parse(sessionStorage.myFabricJSCanvas);
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
        document.getElementById("select").click();
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
        document.getElementById("select").click();
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

    canvas.on("object:moving", function (options) {
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
      if (e.button === 2) return;
      // this.selection = true;
      if (canvas.isDrawingMode) {
        var allObjects = canvas.getObjects();
        var path = allObjects[allObjects.length - 1];
        path.set({ name: "shape-path-" + shapeCount.current });
        //console.log(path);
        shapeCount.current = shapeCount.current + 1;
        canvas.selection = true;
        document.getElementById("select").click();
        canvas.setActiveObject(allObjects[allObjects.length - 1]);
        canvas.renderAll();
        const newCanvasState = canvas.toJSON(["name"]);
        saveCanvasState(newCanvasState);
        // }
      }

      if (canvasTool === "text") {
        //console.log(canvas.getObjects());
        pointer.current = canvas.getPointer(e);
        var text = new fabric.IText("Click to edit", {
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
        document.getElementById("select").click();
        canvas.setActiveObject(text);
        canvas.renderAll();
        shapeCount.current = shapeCount.current + 1;
        // Save the canvas to State variable
        const newCanvasState = canvas.toJSON(["name"]);

        saveCanvasState(newCanvasState);
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
            originX: "center",
            originY: "center",
            //selectable: false,
            hoverCursor: "default",
            name: "shape-line-" + shapeCount.current,
          });
          canvas.add(line.current);
          shapeCount.current = shapeCount.current + 1;
          newShape.current = false;
        } else {
          pointer.current = canvas.getPointer(e);
          line.current.set({ x2: pointer.current.x, y2: pointer.current.y });
          document.getElementById("select").click();
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
            strokeWidth: strokeWidth,
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
            top: line.current.y2,
            left: line.current.x2,
            width: 15,
            height: 15,
            originX: "center",
            originY: "center",
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
            }
          );
          shapeCount.current = shapeCount.current + 1;
          selectedShape.current.set(
            "name",
            "shape-arrow-" + shapeCount.current + 1
          );
          canvas.add(selectedShape.current);
          canvas.setActiveObject(selectedShape.current);
          document.getElementById("select").click();
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
              strokeWidth: strokeWidth,
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
                strokeWidth: strokeWidth,
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
                var polyLine = null;
                polyPoints.current.pop();
                polyPoints.current.push(polyPoints.current[0]);
                console.log(polyPoints.current);
                polyLine = new fabric.Polygon(polyPoints.current, {
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
                console.log(fill);
                canvas.add(polyLine);
                canvas.setActiveObject(polyLine);
                document.getElementById("select").click();
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
              strokeWidth: strokeWidth,
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
                strokeWidth: strokeWidth,
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
              perPixelTargetFind: false,
              strokeWidth: strokeWidth,
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
              hasControls: false,
              hasBorders: false,
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
            name: "shape-rpolygon-" + shapeCount.current,
            // hasControls: false,
            // hasBorders: false,
            //selectable: false,
            hoverCursor: "default",
          });
          canvas.add(updatedPoly);
          canvas.setActiveObject(updatedPoly);
          document.getElementById("select").click();
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
            strokeWidth: strokeWidth,
            strokeDashArray: [dashSize, gapSize],
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
          newShape.current = true;
          canvas.setActiveObject(Rectangle.current);
          document.getElementById("select").click();
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
            strokeWidth: strokeWidth,
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
          document.getElementById("select").click();
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
            strokeWidth: strokeWidth,
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
          document.getElementById("select").click();
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
            strokeWidth: strokeWidth,
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
          newShape.current = true;
          canvas.setActiveObject(ellipse.current);
          document.getElementById("select").click();
          canvas.renderAll();
          // Save the canvas to State variable
          const newCanvasState = canvas.toJSON(["name"]);
          saveCanvasState(newCanvasState);
        }
      }
      //check if user clicked an object
      if (e.target) {
        var evt = e.e;
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
          if (activeShape.stroke && activeShape.type !== "i-text") {
            if (currentStroke.current !== null) {
              var rgba = currentStroke.current
                .substr(5)
                .split(")")[0]
                .split(",");
              setStrokeColor({
                r: rgba[0],
                g: rgba[1],
                b: rgba[2],
                a: rgba[3],
              });
            }
            setStrokeWidth(activeShape.strokeWidth);
          }
          if (activeShape.fill) {
            console.log(activeShape.fill);
            rgba = activeShape.fill.substr(5).split(")")[0].split(",");
            setFillColor({ r: rgba[0], g: rgba[1], b: rgba[2], a: rgba[3] });
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
        pointer.current = canvas.getPointer(opt);
        line.current.set({ x2: pointer.current.x, y2: pointer.current.y });
        canvas.renderAll();
      }
      if (canvasTool === "arrow") {
        pointer.current = canvas.getPointer(opt);
        line.current.set({
          x2: pointer.current.x,
          y2: pointer.current.y,
        });
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
          endPoint = canvas.getPointer(opt);
          line.current.set({
            x2: endPoint.x,
            y2: endPoint.y,
          });
          canvas.renderAll();
        }
      }
      if (canvasTool === "rpolygon") {
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
        pointer.current = canvas.getPointer(opt);
        radius =
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
        canvas.renderAll();
      }
      if (canvasTool === "ellipse") {
        pointer.current = canvas.getPointer(opt);
        var rx = Math.abs(origX.current - pointer.current.x) / 2;
        var ry = Math.abs(origY.current - pointer.current.y) / 2;
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
    if (event.key === "s") {
      setActiveTool(event, "select");
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
                <img src="images/undo2.png" alt="Undo"></img>
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
                <img src="images/redo2.png" alt="Redo"></img>
                <span className={tbStyles.tooltiptextDown}>Redo</span>
              </div>
            </button>
            <button
              className={tbStyles.buttontoolbar}
              onClick={deleteObjects}
              id="del"
            >
              <div className={tbStyles.tooltipDown}>
                <img src="images/delete2.png" alt="Delete"></img>
                <span className={tbStyles.tooltiptextDown}>Delete</span>
              </div>
            </button>
          </a>
          <div className={tbStyles.dropdown}>
            <button className={tbStyles.buttontoolbar} id="wList">
              <img src="images/lineWidth2.png" alt="Line Width"></img>
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
                  <img src="images/stroke1.png" alt="1"></img>
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
                  <img src="images/stroke2.png" alt="2"></img>
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
                  <img src="images/stroke4.png" alt="4"></img>
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
                  <img src="images/stroke5.png" alt="5"></img>
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
                  <img src="images/stroke10.png" alt="10"></img>
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
                  <img src="images/stroke12.png" alt="12"></img>
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
                  <img src="images/stroke15.png" alt="15"></img>
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
                  <img src="images/stroke20.png" alt="20"></img>
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
                  <img src="images/stroke25.png" alt="25"></img>
                </a>
              </div>
            </button>
          </div>
          <div className={tbStyles.dropdown}>
            <button className={tbStyles.buttontoolbar} id="sList">
              <img src="images/LineStyle2.png" alt="Line Style"></img>
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
                  <img src="images/lineStyle1.png" alt="1"></img>
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
                  <img src="images/lineStyle2png.png" alt="1"></img>
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
                  <img src="images/lineStyle3.png" alt="1"></img>
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
                  <img src="images/lineStyle4.png" alt="1"></img>
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
                  <img src="images/lineStyle5.png" alt="1"></img>
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
                  <img src="images/lineStyle6.png" alt="1"></img>
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
                  <img src="images/lineStyle7.png" alt="1"></img>
                </a>
              </div>
            </button>
          </div>
          <button className={tbStyles.buttontoolbar} id="dropper">
            <div className={tbStyles.tooltipDown}>
              <img src="images/dropper2.png" alt="Pick a color"></img>
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
            <div style={swatchStyles.swatch} onClick={StrokeSwatchClick}>
              <div style={swatchStyles.stroke} />
            </div>
            {showStrokePicker ? (
              <div style={swatchStyles.popover}>
                <div style={swatchStyles.cover} onClick={StrokeSwatchClose} />
                <SketchPicker color={stroke} onChange={StrokeSwatchChange} />
              </div>
            ) : null}
          </div>
          &nbsp;Fill Color&nbsp;
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
          </div>
          &nbsp;HighlightText&nbsp;
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
          </div>
          &nbsp;
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
              <img src="images/noStroke2.png" alt="No stroke"></img>
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
              <img src="images/noFill2.png" alt="No fill"></img>
              <span className={tbStyles.tooltiptextDown}>Set No Fill</span>
            </div>
          </button>
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
                <img src="images/FileAccess2.png" alt="FileAccess"></img>
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
                <img src="images/Canvas2.png" alt="Canvas Settings"></img>
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
                <img src="images/Layers2.png" alt="Layers"></img>
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
                <img src="images/Warehouse2.png" alt="Warehouse"></img>
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
                <img src="images/Phases2.png" alt="Phases"></img>
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
                <img src="images/Measure2.png" alt="Measurements"></img>
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
                <img src="images/Animation2.png" alt="Animation"></img>
                <span className={styles.tooltiptextleft}>Phase Player</span>
              </div>
            </button>
            <div className={styles.tabbar}></div>
          </div>
        </div>
        <div id="Library" className={styles.library}>
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
                  <img src="images/NewFile2.png" alt="NewFile"></img>
                </button>
                <span className={styles.tooltiptextB}>New File</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src="images/OpenFile2.png" alt="OpenFile"></img>
                </button>
                <span className={styles.tooltiptextB}>Open File</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src="images/recentFile2.png" alt="RecentFile"></img>
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
                  <img src="images/CanvasSize2.png" alt="CanvasSize"></img>
                </button>
                <span className={styles.tooltiptextB}>Canvas Size</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src="images/CanvasColor2.png" alt="CanvasColor"></img>
                </button>
                <span className={styles.tooltiptextB}>Canvas Color</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src="images/CanvasImage2.png" alt="CanvasImage"></img>
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
                  <img
                    src="images/InsertBefore2.png"
                    alt="AddLayerBefore"
                  ></img>
                </button>
                <span className={styles.tooltiptextB}>Add Layer Before</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src="images/InsertAfter2.png" alt="AddLayerAfter"></img>
                </button>
                <span className={styles.tooltiptextB}>Add Layer After</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src="images/Up2.png" alt="LayerUp"></img>
                </button>
                <span className={styles.tooltiptextB}>Layer Up</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src="images/Down2.png" alt="LayerDown"></img>
                </button>
                <span className={styles.tooltiptextB}>Layer Down</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src="images/Hide2.png" alt="HideLayer"></img>
                </button>
                <span className={styles.tooltiptextB}>Hide Layer</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src="images/Lock2.png" alt="LockLayer"></img>
                </button>
                <span className={styles.tooltiptextB}>Lock Layer</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src="images/SortAlpha2.png" alt="SortLayer"></img>
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
                  <img src="images/Crane2.png" alt="Crane"></img>
                </button>
                <span className={styles.tooltiptextB}>Crane</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src="images/Elevator2.png" alt="Elevator"></img>
                </button>
                <span className={styles.tooltiptextB}>Elevator</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src="images/labels2.png" alt="Labels"></img>
                </button>
                <span className={styles.tooltiptextB}>Labels</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src="images/CloudTool2.png" alt="Cloud"></img>
                </button>
                <span className={styles.tooltiptextB}>Cloud</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src="images/CallOut2.png" alt="Callout"></img>
                </button>
                <span className={styles.tooltiptextB}>Callout</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src="images/wedge2.png" alt="Wedge"></img>
                </button>
                <span className={styles.tooltiptextB}>Wedge</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src="images/Ring2.png" alt="Ring"></img>
                </button>
                <span className={styles.tooltiptextB}>Ring</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src="images/FilledArc2.png" alt="FilledArc"></img>
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
                  <img src="images/NewPhase2.png" alt="NewPhase"></img>
                </button>
                <span className={styles.tooltiptextB}>NewPhase</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src="images/StartDate2.png" alt="StartDate"></img>
                </button>
                <span className={styles.tooltiptextB}>Start Date</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src="images/EndDate2.png" alt="EndDate"></img>
                </button>
                <span className={styles.tooltiptextB}>End Date</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src="images/DeletePhase2.png" alt="DeletePhase"></img>
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
                  <img src="images/PageScale2.png" alt="PageScale"></img>
                </button>
                <span className={styles.tooltiptextB}>Page Scale</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src="images/setunit2.png" alt="SetUnits"></img>
                </button>
                <span className={styles.tooltiptextB}>Set Units</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src="images/Length2.png" alt="Length"></img>
                </button>
                <span className={styles.tooltiptextB}>Length</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src="images/Perimeter2.png" alt="Perimeter"></img>
                </button>
                <span className={styles.tooltiptextB}>Perimeter</span>
              </div>
              <div className={styles.tooltip}>
                <button>
                  <img src="images/Area2.png" alt="Area"></img>
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
                  <img src="images/Play2.png" alt="Play"></img>
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
                <img src={"images/Select2.png"} alt="Select"></img>
                <span className={styles.tooltiptext}>Selection</span>
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
                <img src={"images/TextBox2.png"} alt="TextBox"></img>
                <span className={styles.tooltiptext}>Text</span>
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
                <img src={"images/PenTool2.png"} alt="Pen"></img>
                <span className={styles.tooltiptext}>Free-hand</span>
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
                <img src={"images/Cloud2.png"} alt="Cloud"></img>
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
                <img src={"images/CallOut2.png"} alt="Callout"></img>
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
                <img src={"images/Image2.png"} alt="Edit"></img>
                <span className={styles.tooltiptext}>Image Edit</span>
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
                <img src={"images/Line2.png"} alt="Line"></img>
                <span className={styles.tooltiptext}>Line</span>
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
                <img src={"images/Polyline2.png"} alt="Polyline"></img>
                <span className={styles.tooltiptext}>Polyline</span>
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
                <img src={"images/Arrow2.png"} alt="Arrow"></img>
                <span className={styles.tooltiptext}>Arrow</span>
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
                <img src={"images/Arc2.png"} alt="Arc"></img>
                <span className={styles.tooltiptext}>Arc</span>
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
                <img src={"images/Rectangle2.png"} alt="Rectangle"></img>
                <span className={styles.tooltiptext}>Rectangle.current</span>
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
                <img src={"images/Polygon2.png"} alt="Polygon"></img>
                <span className={styles.tooltiptext}>Polygon</span>
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
                <img src={"images/RPolygon2.png"} alt="Regular Polygon"></img>
                <span className={styles.tooltiptext}>Regular Polygon</span>
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
                <img src={"images/Circle2.png"} alt="Circle"></img>
                <span className={styles.tooltiptext}>Circle</span>
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
                <img src={"images/Ellipse2.png"} alt="Ellipse"></img>
                <span className={styles.tooltiptext}>Ellipse</span>
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
                <img src={"images/Dimension2.png"} alt="Dimension"></img>
                <span className={styles.tooltiptext}>Dimension</span>
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
                <img src={"images/Area2.png"} alt="Area"></img>
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
                <img src={"images/Length2.png"} alt="Length"></img>
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
                <img src={"images/Perimeter2.png"} alt="Perimeter"></img>
                <span className={styles.tooltiptext}>Perimeter</span>
              </div>
            </button>
          </div>
        </div>
        <div>
          <canvas
            ref={canvasRef}
            id="my-fabric-canvas"
            width="1191"
            height="842"
          ></canvas>
        </div>
      </div>
    </MediaQuery>
  );
};

export default App;
