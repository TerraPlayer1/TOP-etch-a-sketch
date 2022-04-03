const container = document.querySelector(".container");  // Html imports
const drawingArea = document.querySelector(".drawing-area");
const slider = document.getElementById("myRange")
const output = document.getElementById("demo");

output.innerHTML = slider.value+ " * " + slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value + " * " + this.value;
}

slider.onchange = function() {
  resetGrid();
} 

function makeGrid(rows, cols) {
  drawingArea.style.setProperty('--grid-rows', rows); // Update root css values
  drawingArea.style.setProperty('--grid-cols', cols);

  for (c = 0; c < (rows * cols); c++) {         // Create grid
    let cell = document.createElement("div");
    drawingArea.appendChild(cell).className = "grid-item";
}};

function resetGrid() {
  drawingArea.innerHTML = "";
  makeGrid(slider.value, slider.value);
};

makeGrid(slider.value, slider.value);

//Here be buttons
const clear = document.getElementById("clear");
clear.onclick = function() {
  resetGrid()
}

const black = document.getElementById("black");
black.onclick = function() {
  drawBlack();
}

const rgb = document.getElementById("rgb");
rgb.onclick = function() {
  drawRGB();
}
// To do: Here go the rest of the button function calls


let grid = drawingArea.children;
let draw = false;
function drawBlack() {
  for (c = 0; c < grid.length; c++) {
    grid[c].addEventListener('mouseover',function(){
      if(!draw) return
      this.style.backgroundColor = "black";
      });
    grid[c].addEventListener('mousedown',function(){
      this.style.backgroundColor = "black";
      });
  };
};

function drawRGB() {  // To do: Remove black from color pool
  for (c = 0; c < grid.length; c++) {
    grid[c].addEventListener('mouseover',function(){
      if(!draw) return
        let randomColor = Math.floor(Math.random()*16777215).toString(16);
        this.style.backgroundColor = "#" + randomColor;
      });
    grid[c].addEventListener('mousedown',function(){
        let randomColor = Math.floor(Math.random()*16777215).toString(16);
        this.style.backgroundColor = "#" + randomColor;
      });
  };
};
// To do: Here go the rest of the button functions


window.addEventListener("mousedown", function(){
  draw = true
})
window.addEventListener("mouseup", function(){
  draw = false
})
