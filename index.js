const tooltip = document.querySelector(".tooltip");
const detail = document.querySelector("input");
const createButton = document.querySelector("button");
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
const createSketchPad = (e) => {
  if (
    isNaN(Number(detail.value)) ||
    detail.value % 1 !== 0 ||
    detail.value < 16 ||
    detail.value > 100
  ) {
    return;
  }

  sketchPad.innerHTML = "";

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
