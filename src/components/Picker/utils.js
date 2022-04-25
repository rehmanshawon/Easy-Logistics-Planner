export const parseHSL = (color) =>
  color
    .replace(/[^\d.,]/g, "")
    .split(",")
    .map(Number);

export const copyToClipboard = (input) => {
  const el = document.createElement("textarea");
  el.value = input;
  el.setAttribute("readonly", "");
  el.style.contain = "strict";
  el.style.position = "absolute";
  el.style.left = "-9999px";
  el.style.fontSize = "12pt";

  const selection = document.getSelection();
  let originalRange = false;
  if (selection.rangeCount > 0) {
    originalRange = selection.getRangeAt(0);
  }

  document.body.appendChild(el);
  el.select();
  el.selectionStart = 0;
  el.selectionEnd = input.length;

  let success = false;
  try {
    success = document.execCommand("copy");
  } catch (err) {}

  document.body.removeChild(el);

  if (originalRange) {
    selection.removeAllRanges();
    selection.addRange(originalRange);
  }

  return success;
};

export const convertRGBtoHSL = (rgb) => {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const delta = max - min;
  let h;
  let s;

  if (max === min) {
    h = 0;
  } else if (r === max) {
    h = (g - b) / delta;
  } else if (g === max) {
    h = 2 + (b - r) / delta;
  } else if (b === max) {
    h = 4 + (r - g) / delta;
  }

  h = Math.min(h * 60, 360);

  if (h < 0) {
    h += 360;
  }

  const l = (min + max) / 2;

  if (max === min) {
    s = 0;
  } else if (l <= 0.5) {
    s = delta / (max + min);
  } else {
    s = delta / (2 - max - min);
  }

  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
};

const toHex = (c) => {
  const n = c.toString(16);
  return n.length === 1 ? "0" + n.toUpperCase() : n.toUpperCase();
};

export const convertHSLToRGB = ([h, s, l, a]) => {
  var r, g, b;
  h = h / 360;
  s = s / 100;
  l = l / 100;

  if (s === 0) {
    r = g = b = l;
  } else {
    var hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const red = Math.round(r * 255);
  const green = Math.round(g * 255);
  const blue = Math.round(b * 255);

  const rgb = `rgb(${red}, ${green}, ${blue})`;
  const rgba = `rgba(${red}, ${green}, ${blue}, ${a === 1 ? 1 : a.toFixed(2)})`;
  const hex = `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
  const hexa = `#${toHex(red)}${toHex(green)}${toHex(blue)}${toHex(
    Math.round(a * 255)
  )}`;

  return { rgb, rgba, hex, hexa, red, green, blue, a };
};

export const RGBAToHSLA = (rgba) => {
  let sep = rgba.indexOf(",") > -1 ? "," : " ";
  rgba = rgba.substr(5).split(")")[0].split(sep);

  // Strip the slash if using space-separated syntax
  if (rgba.indexOf("/") > -1) rgba.splice(3, 1);

  for (let R in rgba) {
    let r = rgba[R];
    if (r.indexOf("%") > -1) {
      let p = r.substr(0, r.length - 1) / 100;

      if (R < 3) {
        rgba[R] = Math.round(p * 255);
      } else {
        rgba[R] = p;
      }
    }
  }

  // Make r, g, and b fractions of 1
  let r = rgba[0] / 255,
    g = rgba[1] / 255,
    b = rgba[2] / 255,
    a = rgba[3];
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;
  // Calculate hue
  // No difference
  if (delta === 0) h = 0;
  // Red is max
  else if (cmax === r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax === g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;
  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return "hsla(" + h + "," + s + "%," + l + "%," + a + ")";
  // console.log(rgba[0], rgba[1], rgba[2], a);
  // Rest of RGB-to-HSL logic
  //...
};
