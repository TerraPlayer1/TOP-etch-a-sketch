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
        :drawBlack();
};

//Here be buttons

const clear = document.getElementById("clear");
clear.onclick = function() {
  resetGrid()
}

const black = document.getElementById("black");
black.onclick = function() {
  drawBlack();
  mode = "black";
}

const rgb = document.getElementById("rgb");
rgb.onclick = function() {
  drawRGB();
  mode = "rgb";
}

const dark = document.getElementById("darken");
dark.onclick = function() {
  drawDark();
  mode = "dark";
}



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
drawBlack();

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

function drawDark() { //Not working for now
  for (c = 0; c < grid.length; c++) {
    grid[c].addEventListener('mouseover',function(){
      if(!draw) return
      increment(this);
        // for (let i = 0; i < arr.length; i++) {
        //   break
        // };
      });
    grid[c].addEventListener('mousedown',function(){
      increment(this);
      });
  };
};

function increment(item) {
  // if (item.style.backgroundColor == "rgb(255,255,255)") {
  //   item.style.backgroundColor = "rgba(0,0,0, 0.1)"
  // }
  // let cut = item.style.backgroundColor.slice(4, -1);
  let cut = "0,0,0";

  if (item.classList.contains("100%")) {
    item.style.backgroundColor = `rgba(${cut},${0.1})`
    item.classList.remove("100%");
    item.classList.add("90%");
  } else if (item.classList.contains("90%")){
   item.style.backgroundColor = `rgba(${cut},${0.2})`
   item.classList.remove("90%");
   item.classList.add("80%");
  } else if (item.classList.contains("80%")){
   item.style.backgroundColor = `rgba(${cut},${0.3})`
   item.classList.remove("80%");
   item.classList.add("70%");
  } else if (item.classList.contains("70%")){
    item.style.backgroundColor = `rgba(${cut},${0.4})`
    item.classList.remove("70%");
    item.classList.add("60%");
  } else if (item.classList.contains("60%")){
    item.style.backgroundColor = `rgba(${cut},${0.5})`
    item.classList.remove("60%");
    item.classList.add("50%");
  } else if (item.classList.contains("50%")){
    item.style.backgroundColor = `rgba(${cut},${0.6})`
    item.classList.remove("50%");
    item.classList.add("40%");
  } else if (item.classList.contains("40%")){
    item.style.backgroundColor = `rgba(${cut},${0.7})`
    item.classList.remove("40%");
    item.classList.add("30%");
  } else if (item.classList.contains("30%")){
    item.style.backgroundColor = `rgba(${cut},${0.8})`
    item.classList.remove("30%");
    item.classList.add("20%");
  } else if (item.classList.contains("20%")){
    item.style.backgroundColor = `rgba(${cut},${0.9})`
    item.classList.remove("20%");
    item.classList.add("10%");
  } else if (item.classList.contains("10%")){
    item.style.backgroundColor = `rgba(${cut},${1})`
    item.classList.remove("10%");
    item.classList.add("0%");
  } else if (item.classList.contains("10%")){
    item.style.backgroundColor = `rgba(${cut},${1})`
    item.classList.remove("10%");
    item.classList.add("0%");
  }else item.style.backgroundColor = `rgba(${cut},${1})`
}

window.addEventListener("mousedown", function(){
  draw = true
})
window.addEventListener("mouseup", function(){
  draw = false
})
