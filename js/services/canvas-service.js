"use strict";

var gCanvas;
var gCtx;
var txtBoxLocations = [];
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function initCanvas() {
  gCanvas = document.querySelector("#my-canvas");
  gCtx = gCanvas.getContext("2d");
  addListeners();
  resizeCanvas();
}

function addTxtBox() {
  var lines = getLinesInfo();
  if (lines.length === 1) {
    var txtBox = { x: 25, y: 0 };
    txtBoxLocations.push(txtBox);
    return;
  }
  if (lines.length === 2) {
    var txtBox = { x: 25, y: 385 };
    txtBoxLocations.push(txtBox);
    return;
  }
  // add text box in the middle
}

function renderMeme() {
  setImg();
  var meme = getMeme();
  txtBoxLocations.forEach((txtBox, index) => {
    var txtInfo = meme.lines[index];
    var isCurrLine = meme.selectedLineIdx === index ? true : false;
    if (isCurrLine)
      document.querySelector(".btn-input-txt").value = txtInfo.txt;
    drawRect(txtBox.x, txtBox.y, isCurrLine, txtInfo.strokeColor);
    // console.log('index', index);
    // console.log('meme.selectedLineIdx', meme.selectedLineIdx);
    gCtx.textAlign = txtInfo.align; // add
    gCtx.fillStyle = txtInfo.fontColor;
    gCtx.font = `${txtInfo.size}px ${txtInfo.font}`;
    gCtx.fillText(txtInfo.txt, txtBox.x + 25, txtBox.y + 40);
  });
}

function setImg() {
  var imgIdx = getMeme().selectedImgId;
  var elImg = document.querySelector(`[data-img="${imgIdx}"]`);
  gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
}

function drawRect(x, y, isCurrLine, strokeColor, width = 400, height = 65) {
  var color = isCurrLine ? "red" : "black"; //change
  gCtx.beginPath();
  gCtx.rect(x, y, width, height);
  //   gCtx.fillStyle = color;
  //   gCtx.fillRect(x, y, width, height);
  gCtx.strokeStyle = strokeColor;
  gCtx.stroke();
}

function resizeCanvas() {
  var elContainer = document.querySelector(".canvas-container");
  gCanvas.width = elContainer.offsetWidth;
  gCanvas.height = elContainer.offsetWidth;
  // gCanvas.height = elContainer.offsetHeight; for not squre imgs
  // console.log('resizeCanvas');
}

function addLisrenderMeme() {
  addMouseListeners();
  addTouchListeners();
  window.addEventListener("resize", () => {
    resizeCanvas();
    renderCanvas();
  });
}

function addMouseListeners() {
  gCanvas.addEventListener("mousemove", onMove);
  gCanvas.addEventListener("mousedown", onDown);
  gCanvas.addEventListener("mouseup", onUp);
}

function addTouchListeners() {
  gCanvas.addEventListener("touchmove", onMove);
  gCanvas.addEventListener("touchstart", onDown);
  gCanvas.addEventListener("touchend", onUp);
}

function isTxtBoxClicked(clickedPos) {
    const { pos } = gCircle
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    return distance <= gCircle.size
}

function onDown(ev) {
    const pos = getEvPos(ev)
    console.log('onDown()');
    if (!isCircleClicked(pos)) return
    setCircleDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'

}

function onMove(ev) {
    console.log('onMove()');
    const circle = getCircle();
    if (circle.isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveCircle(dx, dy)
        gStartPos = pos
        renderCanvas()
    }
}

function onUp() {
    console.log('onUp()');
    setCircleDrag(false)
    document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}



// not is use
function draw(ev) {
  const offsetX = ev.offsetX;
  const offsetY = ev.offsetY;
  console.log(offsetX, offsetY);
  switch (gCurrShape) {
    case "triangle":
      isLine = false;
      drawTriangle(offsetX, offsetY);
      break;
    case "rectangle":
      isLine = false;
      drawRect(offsetX, offsetY);
      break;
    case "circle":
      isLine = false;
      drawCircle(offsetX, offsetY);
      break;
    case "line":
      isLine = true;
      break;
  }
}

function changeTxtCanvas() {
  var meme = getMeme();
  if (!txtBoxLocations.length) return;
  var currLineBox = txtBoxLocations[meme.selectedLineIdx];
  var txtInfo = meme.lines[meme.selectedLineIdx];

  gCtx.font = `${txtInfo.size}px ${txtInfo.font}`;
  gCtx.fillText(txtInfo.txt, currLineBox.x + 10, currLineBox.y + 10);
}
