const container = document.querySelector(".container");

const fillContainer = (numOfSquares) => {
  for (let i = 1; i <= numOfSquares; i++) {
    const column = document.createElement("div");
    column.classList.add("column");
    for (let j = 1; j <= numOfSquares; j++) {
      const square = document.createElement("div");
      square.classList.add("square");
      column.appendChild(square);
    }

    container.appendChild(column);
  }
};

fillContainer(16);
