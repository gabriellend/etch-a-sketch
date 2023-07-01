// ELEMENTS
const tooltip = document.querySelector(".tooltip");
const gridSizeInput = document.querySelector("input");
const button = document.querySelector(".create-button");
const sketchPad = document.querySelector(".sketch-pad");
const colors = document.querySelectorAll(".color");

// VARIABLES
let currentColor = "";

// FUNCTIONS
const chooseColor = (e) => {
  const computedStyle = window.getComputedStyle(e.target);
  const backgroundColor = computedStyle.backgroundColor;

  currentColor = backgroundColor;
};

const draw = (e) => {
  if (e.buttons === 1 || e.type === "click") {
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
