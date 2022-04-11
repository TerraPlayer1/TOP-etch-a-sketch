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
    cell.classList.add("100%");
    cell.style.backgroundColor = "rgb(255,255,255)"
    cell.style.filter = "brightness(100%)"
}};

function resetGrid() {
  drawingArea.innerHTML = "";
  makeGrid(slider.value, slider.value);
  drawMode() // Reassign previous draw mode on grid reset
};

makeGrid(slider.value, slider.value);


let mode;
function drawMode() { // Check draw mode
  return mode === "rgb" ? drawRGB()
        :mode === "dark" ? drawDark()
        :mode === "light"? drawLight()
        :drawBlack();
};

//Here be buttons

const clear = document.getElementById("clear");
clear.onclick = function() {
  resetGrid()
}

const black = document.getElementById("black");
black.onclick = function() {
  clearListeners();
  drawBlack();
  mode = "black";

};

const rgb = document.getElementById("rgb");
rgb.onclick = function(){
  clearListeners();
  drawRGB();
  mode = "rgb";
};

const dark = document.getElementById("darken");
dark.onclick = function() {
  clearListeners();
  drawDark();
  mode = "dark";
};

const light = document.getElementById("lighten");
light.onclick = function() {
  clearListeners();
  drawLight();
  mode = "light";
}

function clearListeners() {
  listener = [blackHover,blackClick,rgbHover,rgbClick,darkHover,darkClick,lightHover,lightClick];
  listener.forEach(element => {
    for (c = 0; c < grid.length; c++) {
      grid[c].removeEventListener('mouseover',element);
      grid[c].removeEventListener('mousedown',element);
    };
  });
};


let grid = drawingArea.children;
let draw = false;
let blackHover = function(){
  if(!draw) return
  this.style.backgroundColor = "rgb(0,0,0)";
};
let blackClick = function(){
  this.style.backgroundColor = "rgb(0,0,0)";
};
function drawBlack() {
  for (c = 0; c < grid.length; c++) {
    grid[c].removeEventListener('mouseover',blackHover);
    grid[c].addEventListener('mouseover',blackHover);

    grid[c].removeEventListener('mousedown',blackClick);
    grid[c].addEventListener('mousedown',blackClick);
  };
};
drawBlack();


let rgbHover = function() {
  if(!draw) return
  let randomColor = Math.floor(Math.random()*16777215).toString(16);
  this.style.backgroundColor = "#" + randomColor;
  this.style.filter = "brightness(100%)"
};
let rgbClick = function() {
  let randomColor = Math.floor(Math.random()*16777215).toString(16);
  this.style.backgroundColor = "#" + randomColor;
  this.style.filter = "brightness(100%)"
};
function drawRGB() {  // To do: Remove black from color pool
  for (c = 0; c < grid.length; c++) {
    grid[c].removeEventListener('mouseover', rgbHover);
    grid[c].addEventListener('mouseover', rgbHover);
    
    grid[c].removeEventListener('mousedown',rgbClick);
    grid[c].addEventListener('mousedown',rgbClick);
  };
};


let darkHover = function(){
  if(!draw) return
  increment(this);
};
let darkClick = function(){
  increment(this);
};
function drawDark() {
  for (c = 0; c < grid.length; c++) {
    grid[c].removeEventListener('mouseover',darkHover);
    grid[c].addEventListener('mouseover',darkHover);

    grid[c].removeEventListener('mousedown',darkClick);
    grid[c].addEventListener('mousedown',darkClick);
  };
};
function increment(item) {
  if (mode === "dark"){
  let val = parseFloat(item.style.filter.replace(/[^-\d\.]/g, ''))
  item.style.filter = `brightness(${val-10}%)`
  } else item.style.filter = "brightness(100%)"
};

let lightHover = function() {
  if(!draw) return
  decrement(this);
};
let lightClick = function() {
  decrement(this);
};
function drawLight() {
  for (c = 0; c < grid.length; c++) {
    grid[c].removeEventListener('mouseover',lightHover);
    grid[c].addEventListener('mouseover',lightHover);

    grid[c].removeEventListener('mousedown',lightClick);
    grid[c].addEventListener('mousedown',lightClick);
  };
}; 
function decrement(item) {
  if (mode === "light"){
  let color = item.style.backgroundColor.replace(/[^-\d\,\.]+/g, "")
  let colorSplit = color.split(",").map(Number);
  item.style.backgroundColor = `rgb(${colorSplit[0]+20},${colorSplit[1]+20},${colorSplit[2]+20})`;
  } else alert("Mode not selected")
};

window.addEventListener("mousedown", function(){
  draw = true
});
window.addEventListener("mouseup", function(){
  draw = false
});
