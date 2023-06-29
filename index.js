const detail = document.querySelector("input");
const createButton = document.querySelector("button");
const sketchPad = document.querySelector(".sketch-pad");

const draw = (e) => {
  if (e.buttons === 1 || e.type === "click") {
    e.target.style.backgroundColor = "black";
  }
};

const createSketchPad = (e) => {
  // negative numbers
  // decimal numbers
  // numbers less than 16 and greater than 100
  // text? periods?
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
