const drawingArea = document.querySelector(".drawing-area");

let a = 0
while (a < 32) {
  const addDiv =  document.createElement("div");
  drawingArea.appendChild(addDiv);
  a += 1
};

