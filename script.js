const container = document.querySelector(".container");  // Html imports
const drawingArea = document.querySelector(".drawing-area");
const slider = document.getElementById("myRange")
const output = document.getElementById("demo");

output.innerHTML = slider.value+ " * " + slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value + " * " + this.value;
}

// Update the current drawingArea
slider.onchange = function() {
  delRows();
  makeRows(this.value, this.value);
} 


let draw = false;
let color = "black";
//Build the rows for the drawing area
function makeRows(rows, cols) {
  drawingArea.style.setProperty('--grid-rows', rows); // Update root css values
  drawingArea.style.setProperty('--grid-cols', cols);
  for (c = 0; c < (rows * cols); c++) {         // Create grid
    let cell = document.createElement("div");
    drawingArea.appendChild(cell).className = "grid-item";

    
    cell.addEventListener('mouseover', function(){
      if(!draw) return
      cell.style.backgroundColor = color;
  })
  cell.addEventListener('mousedown', function(){
      cell.style.backgroundColor = color;
  })

  drawingArea.appendChild(cell)
};
};

window.addEventListener("mousedown", function(){
  draw = true
})
window.addEventListener("mouseup", function(){
  draw = false
})

function delRows() {
  while (drawingArea.hasChildNodes()){
    drawingArea.removeChild(drawingArea.firstChild);
  }
  container.appendChild(drawingArea);
};

makeRows(slider.value, slider.value);

const clear = document.getElementById("clear");
clear.onclick = function() {
  drawingArea.innerHTML = "";
  makeRows(slider.value, slider.value);
}