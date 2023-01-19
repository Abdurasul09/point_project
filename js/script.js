// GLOBAL VARIABLES
const canvas = document.querySelector("canvas"),
  toolBtns = document.querySelectorAll(".tool"),
  fillColor = document.querySelector("#fill-color"),
	sizeSlider = document.querySelector("#size-slider"),
	colorsBtns = document.querySelectorAll(".colors .option"),
	colorPicker = document.querySelector("#color-picker"),
	clearCanvasBtn = document.querySelector(".clear-canvas"),
	saveImgBtn = document.querySelector(".save-img");

// VARIABLES WITH DEFAULT VALUES
let ctx = canvas.getContext("2d"),
  isDrawing = false,
  brushWidth = 5,
  selectedTool = "brush",
	selectedColor = "#000",
  prevMouseX,
  prevMouseY,
  snapshot;

	// SET CANVAS BACKGROUND

	const setCanvasBg = () =>{
		ctx.fillStyle = "#fff";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = selectedColor
	}

// SET CANVAS WIDTH AND HIGHT
window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  console.log(canvas.height);
	setCanvasBg()
});

// START DRAW
const startDraw = (e) => {
  isDrawing = true;
  ctx.lineWidth = brushWidth;
  prevMouseX = e.offsetX;
  prevMouseY = e.offsetY;
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
	ctx.strokeStyle = selectedColor;
	ctx.fillStyle = selectedColor;
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

// DRAW TRIANGLE

const drawTriangle = (e) => {
  ctx.beginPath();
  ctx.moveTo(prevMouseX, prevMouseY);
	ctx.lineTo(e.offsetX, e.offsetY);
	ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
	ctx.closePath();
	ctx.stroke();
	fillColor.checked ? ctx.fill() : ctx.stroke();
}

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
		case "triangle":
			drawTriangle(e);
			break
		case "eraser": 
		  ctx.strokeStyle = "#fff"
			ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
		  break
		default: 
		   break
  }
};

// CHANGE BRUSH WIDTH

sizeSlider.addEventListener("change", () => brushWidth = sizeSlider.value)

// SET COLOR TO SHIPS
colorsBtns.forEach(btn => {
	btn.addEventListener("click", e => {
		document.querySelector(".options .selected").classList.remove("selected");
    btn.classList.add("selected");
		const bgColor = window.getComputedStyle(btn).getPropertyValue("background-color")
		selectedColor = bgColor;
		console.log(bgColor);
	})
})

// SET COLOR FROM COLOR PICKER
colorPicker.addEventListener("change", () => {
  colorPicker.parentElement.style.background = colorPicker.value
	colorPicker.parentElement.click()
})

// CLEAR CANVAS BTN
clearCanvasBtn.addEventListener("click", (e) => {
	ctx.clearRect(0,0,canvas.width, canvas.height)
	setCanvasBg()
})

// SAVE IMG

saveImgBtn.addEventListener("click", () => {
	const link = document.createElement("a");
	link.download = `rasul-point${Date.now()}.jpg`;
	link.href = canvas.toDataURL();
	link.click()
})

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
