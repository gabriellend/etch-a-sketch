const chooseSizeArea = document.querySelector(".choose-size");
const tooltip = document.querySelector(".tooltip");
const detail = document.querySelector("input");
const createButton = document.querySelector(".create-button");
const sketchPad = document.querySelector(".sketch-pad");

const draw = (e) => {
  if (e.buttons === 1 || e.type === "click") {
    e.target.style.backgroundColor = "black";
  }
};

const showToolTip = (message) => {
  tooltip.innerText = message;
  tooltip.style.visibility = "visible";
};

const clearInput = () => {
  detail.value = "";

  if (tooltip.style.visibility === "visible") {
    tooltip.style.visibility = "hidden";
  }
};

checkEdgeCases = () => {
  let message;
  if (detail.value === "" || isNaN(Number(detail.value))) {
    message = "Please enter a number";
  } else if (detail.value % 1 !== 0) {
    message = "Please enter a whole number";
  } else if (detail.value < 16 || detail.value > 100) {
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
  const clearButton = document.querySelector(".clear-button");
  if (clearButton) {
    chooseSizeArea.style.paddingLeft = "80px";
    clearButton.remove();
    clearInput();
  }
};

const showClearButton = () => {
  chooseSizeArea.style.paddingLeft = 0;

  const clearButton = document.createElement("button");
  clearButton.innerText = "Clear";
  clearButton.classList.add("clear-button");
  clearButton.addEventListener("click", clearSketchPad);

  chooseSizeArea.appendChild(clearButton);
};

const createSketchPad = (e) => {
  const passed = checkEdgeCases();
  if (!passed) {
    return;
  }

  clearSketchPad();
  showClearButton();

  for (let i = 1; i <= detail.value; i++) {
    const column = document.createElement("div");
    column.classList.add("column");
    for (let j = 1; j <= detail.value; j++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.addEventListener("click", draw);
      square.addEventListener("mousemove", draw);
      column.appendChild(square);
    }

    sketchPad.appendChild(column);
  }
};

createButton.addEventListener("click", createSketchPad);
detail.addEventListener("focus", clearInput);
