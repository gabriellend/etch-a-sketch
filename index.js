// TODO
// figure out how to start with actual color (mousedown and click are both firing I think)
// make default grid size to begin with
// add color picker
// add eraser
// add undo button

// ELEMENTS
const tooltip = document.querySelector(".tooltip");
const gridSizeInput = document.querySelector("input");
const button = document.querySelector(".create-button");
const sketchPad = document.querySelector(".sketch-pad");
const colors = document.querySelectorAll(".color");

// VARIABLES
let currentColor = "";

// FUNCTIONS
const darken = (color) => {
  // color comes in as an rgb string. This isolates just the values.
  const rgbValues = color.slice(4, color.length - 1).split(", ");
  const tenPercentOfInitialRGBValue = 255 * 0.1;

  let darkenedColorRGBValues = [];
  for (let i = 0; i < rgbValues.length; i++) {
    if (Number(rgbValues[i]) > 0) {
      const newValue = Number(rgbValues[i]) - tenPercentOfInitialRGBValue;
      darkenedColorRGBValues.push(newValue);
    } else {
      darkenedColorRGBValues.push(rgbValues[i]);
    }
  }

  const darkenedColor = `rgb(${darkenedColorRGBValues[0]}, ${darkenedColorRGBValues[1]}, ${darkenedColorRGBValues[2]})`;
  currentColor = darkenedColor;

  return darkenedColor;
};

const chooseColor = (e) => {
  const computedStyle = window.getComputedStyle(e.target);
  const backgroundColor = computedStyle.backgroundColor;
  currentColor = backgroundColor;
};

const draw = (e) => {
  if (
    (e.buttons !== 1 && e.type === "click") ||
    (e.buttons === 1 && e.type === "mousedown")
  ) {
    const newColor = darken(currentColor);
    e.target.style.backgroundColor = newColor;
  } else if (e.buttons === 1 || e.type === "click") {
    e.target.style.backgroundColor = currentColor;
  }
};

const showToolTip = (message) => {
  gridSizeInput.focus();
  tooltip.innerText = message;
  tooltip.style.visibility = "visible";
};

const clearTooltip = () => {
  if (tooltip.style.visibility === "visible") {
    tooltip.style.visibility = "hidden";
  }
};

const clearInput = () => {
  gridSizeInput.value = "";
  gridSizeInput.focus();

  clearTooltip();
};

checkEdgeCases = () => {
  let message;
  if (gridSizeInput.value === "" || isNaN(Number(gridSizeInput.value))) {
    message = "Please enter a number";
  } else if (gridSizeInput.value % 1 !== 0) {
    message = "Please enter a whole number";
  } else if (gridSizeInput.value < 16 || gridSizeInput.value > 100) {
    message = "Please enter a number between 16 and 100";
  }

  if (message) {
    showToolTip(message);
    return false;
  } else {
    return true;
  }
};

const clearSketchPad = () => {
  sketchPad.innerHTML = "";

  clearInput();
  button.innerText = "Create";
  button.removeEventListener("click", clearSketchPad);
  button.addEventListener("click", createSketchPad);
};

const showClearButton = () => {
  button.innerText = "Clear";
  button.removeEventListener("click", createSketchPad);
  button.addEventListener("click", clearSketchPad);
};

const createSketchPad = () => {
  const passed = checkEdgeCases();
  if (!passed) {
    return;
  }

  showClearButton();
  clearTooltip();

  for (let i = 1; i <= gridSizeInput.value; i++) {
    const column = document.createElement("div");
    column.classList.add("column");
    for (let j = 1; j <= gridSizeInput.value; j++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.addEventListener("click", draw);
      square.addEventListener("mousemove", draw);
      square.addEventListener("mousedown", draw);

      column.appendChild(square);
    }

    sketchPad.appendChild(column);
  }
};

// EVENT LISTENERS
button.addEventListener("click", createSketchPad);
gridSizeInput.addEventListener("focus", clearInput);
colors.forEach((color) => {
  color.addEventListener("click", chooseColor);
});
