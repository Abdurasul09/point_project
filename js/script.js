// GLOBAL VARIABLES
const canvas = document.querySelector("canvas"),
  toolBtns = document.querySelectorAll(".tool"),
  fillColor = document.querySelector("#fill-color");

// VARIABLES
let ctx = canvas.getContext("2d"),
  isDrawing = false,
  brushWidth = 5,
  selectedTool = "brush",
  prevMouseX,
  prevMouseY,
  snapshot;

// SET CANVAS WIDTH AND HIGHT
window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  console.log(canvas.height);
});

// START DRAW
const startDraw = (e) => {
  isDrawing = true;
  ctx.beginPath();
  ctx.lineWidth = brushWidth;
  prevMouseX = e.offsetX;
  prevMouseY = e.offsetY;
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
};

// DRAW RECTANGLE
const drawRectangle = (e) => {
  fillColor.checked
    ? ctx.fillRect(
        e.offsetX,
        e.offsetY,
        prevMouseX - e.offsetX,
        prevMouseY - e.offsetX
      )
    : ctx.strokeRect(
        e.offsetX,
        e.offsetY,
        prevMouseX - e.offsetX,
        prevMouseY - e.offsetX
      );
};

// DRAW CIRCLE
const drawCircle = (e) => {
	ctx.beginPath()
  const radius =
    Math.sqrt(Math.pow(prevMouseX - e.offsetX, 2)) +
    Math.pow(prevMouseY - e.offsetY, 2);
  ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
	fillColor.checked ? ctx.fill() : ctx.stroke();
};

// DRAWING
const drawing = (e) => {
  if (!isDrawing) return;
  ctx.putImageData(snapshot, 0, 0);
  switch (selectedTool) {
    case "brush":
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      break;
    case "rectangle":
      drawRectangle(e);
      break;
    case "circle":
      drawCircle(e);
      break;
  }
};

// STOP DRAW
const stopDraw = () => {
  isDrawing = false;
};

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", stopDraw);

// TOOLS BTN AND SET TO VARIABLES SELECTED TO
toolBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".options .active").classList.remove("active");
    btn.classList.add("active");
    selectedTool = btn.id;
    console.log(btn.id);
  });
});
