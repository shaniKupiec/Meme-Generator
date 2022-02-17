"use strict";

var gCanvas;
var gCtx;
var txtBoxLocations = [];
var gStartPos;
const gTouchEvs = ["touchstart", "touchmove", "touchend"];

function initCanvas() {
  gCanvas = document.querySelector("#my-canvas");
  gCtx = gCanvas.getContext("2d");
  addListenersMeme();
  resizeCanvas();
}

function addTxtBox() {
  var lines = getLinesInfo();
  if (lines.length === 1) {
    txtBoxLocations.push(createTxtBox(25, 0));
    return;
  }
  if (lines.length === 2) {
    txtBoxLocations.push(createTxtBox(25, 385));
    return;
  }
  // add text box in the middle
}

function deleteTxtBox() {
  var currLine = getCurrLineIdx();
  txtBoxLocations.splice(currLine, 1);
  console.log(txtBoxLocations);
}

function createTxtBox(x, y) {
  return {
    x,
    y,
    height: 65,
    width: 400,
    isDrag: false,
  };
}

function renderMeme(forDisplay = false) {
  setImg();
  var meme = getMeme();
  txtBoxLocations.forEach((txtBox, index) => {
    var txtInfo = meme.lines[index];
    var isCurrLine = meme.selectedLineIdx === index ? true : false;
    if (isCurrLine && !getFirstLine())
      document.querySelector(".btn-input-txt").value = txtInfo.txt;
    if(forDisplay) isCurrLine = false
    drawRect(txtBox.x, txtBox.y, isCurrLine, txtBox.width, txtBox.height);
    // console.log('index', index);
    // console.log('meme.selectedLineIdx', meme.selectedLineIdx);
    gCtx.strokeStyle = txtInfo.outlineColor;
    gCtx.textAlign = txtInfo.align; // add
    gCtx.fillStyle = txtInfo.fontColor;
    gCtx.font = `${txtInfo.size}px ${txtInfo.font}`;
    gCtx.fillText(txtInfo.txt, txtBox.x + 25, txtBox.y + 40);
    gCtx.strokeText(txtInfo.txt, txtBox.x + 25, txtBox.y + 40);
  });
}

function setImg() {
  console.log(getMeme());
  var imgIdx = getMeme().selectedImgId;
  console.log(imgIdx);
  var elImg = document.querySelector(`[data-img="${imgIdx}"]`);
  console.log(elImg);
  gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
}

function drawRect(x, y, isCurrLine, width, height) {
  gCtx.beginPath();
  gCtx.rect(x, y, width, height);
  if (isCurrLine) {
    gCtx.fillStyle = "rgb(255 255 255 / 37%)";
    gCtx.fillRect(x, y, width, height);
  }
  gCtx.strokeStyle = "black";
  gCtx.stroke();
}

function resizeCanvas() {
  var elContainer = document.querySelector(".canvas-container");
  gCanvas.width = elContainer.offsetWidth;
  gCanvas.height = elContainer.offsetWidth;
  // gCanvas.height = elContainer.offsetHeight; for not squre imgs
  // console.log('resizeCanvas');
}

// drag and drop

function addListenersMeme() {
  addMouseListeners();
  addTouchListeners();
  window.addEventListener("resize", () => {
    resizeCanvas();
    renderMeme();
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

// check if a txt box was clicked
function isTxtBoxClicked(clickedPos) {
  var lineIdx;
  txtBoxLocations.forEach((txtBox, index) => {
    if (txtBox.x <= clickedPos.x && clickedPos.x - txtBox.x <= gCanvas.width) {
      if (txtBox.y <= clickedPos.y && clickedPos.y - txtBox.y <= gCanvas.height)
        lineIdx = index;
    }
  });
  return lineIdx;
}

function onDown(ev) {
  const pos = getEvPos(ev);
  console.log("onDown()");
  var currLine = isTxtBoxClicked(pos);
  if (!currLine) return;
  setSelectedLine(currLine);
  setBoxDrag(true);
  gStartPos = pos;
  document.body.style.cursor = "grabbing";
}

function setBoxDrag(isDrag) {
  var idx = getCurrLineIdx();
  txtBoxLocations[idx].isDrag = isDrag;
}

function onMove(ev) {
  console.log("onMove()");
  var idx = getCurrLineIdx();
  if (idx === -1) return;
  if (txtBoxLocations[idx].isDrag) {
    const pos = getEvPos(ev);
    const dx = pos.x - gStartPos.x;
    const dy = pos.y - gStartPos.y;
    moveTxtBox(dx, dy);
    gStartPos = pos;
    renderMeme();
  }
}

function moveTxtBox(x, y) {
  // drawRect(x, y, true, 'black', 400, 65)
}

function onUp() {
  console.log("onUp()");
  setBoxDrag(false);
  document.body.style.cursor = "grab"; // normal cursor
}

function getEvPos(ev) {
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  };
  if (gTouchEvs.includes(ev.type)) {
    ev.preventDefault();
    ev = ev.changedTouches[0];
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    };
  }
  return pos;
}

// removes change of marked line
function getCanvas() {
  renderMeme(true)
  return gCanvas;
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

// function changeTxtCanvas() {
//   var meme = getMeme();
//   if (!txtBoxLocations.length) return;
//   var currLineBox = txtBoxLocations[meme.selectedLineIdx];
//   var txtInfo = meme.lines[meme.selectedLineIdx];

//   gCtx.font = `${txtInfo.size}px ${txtInfo.font}`;
//   gCtx.fillText(txtInfo.txt, currLineBox.x + 10, currLineBox.y + 10);
// }
