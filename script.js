const container = document.querySelector(".container")  // Html imports
const drawingArea = document.querySelector(".drawing-area");
const slider = document.getElementById("myRange")
const output = document.getElementById("demo");

output.innerHTML = slider.value+ " * " + slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value + " * " + this.value;
}

// Update the current drawingArea
slider.onmouseup = function() {
  delRows();
  makeRows(this.value, this.value);
} 


function makeRows(rows, cols) {
  drawingArea.style.setProperty('--grid-rows', rows); // Update root css values
  drawingArea.style.setProperty('--grid-cols', cols);
  for (c = 0; c < (rows * cols); c++) {         // Create grid
    let cell = document.createElement("div");
    drawingArea.appendChild(cell).className = "grid-item";
  };
};


function delRows() {
  while (drawingArea.hasChildNodes()){
    drawingArea.removeChild(drawingArea.firstChild);
  }
  container.appendChild(drawingArea);
};


makeRows(slider.value, slider.value);