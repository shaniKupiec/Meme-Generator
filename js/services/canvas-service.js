"use strict";

var gCanvas;
var gCtx;
var txtBoxLocations = [];
var gStartPos = null;
const gTouchEvs = ["touchstart", "touchmove", "touchend"];

function initCanvas() {
  gCanvas = document.querySelector("#my-canvas");
  gCtx = gCanvas.getContext("2d");
  addListenersMeme();
  resizeCanvas();
}

// add txt box according to number of line
function addTxtBox() {
  var lines = getLinesInfo();
  var w = gCanvas.width;
  if (lines.length === 1) {
    txtBoxLocations.push(createTxtBox(w / 20, w / 20));
    return;
  }
  if (lines.length === 2) {
    txtBoxLocations.push(createTxtBox(w / 20, w - w / 20 - w / 7));
    return;
  }
  if (lines.length === 3) {
    txtBoxLocations.push(createTxtBox(w / 20, w / 2 - w / 7 / 2));
    return;
  } else { // random from the 4th txt box
    txtBoxLocations.push(
      createTxtBox(w / 20, getRandomInt(w / 20, w - w / 20 - w / 7))
    );
    return;
  }
}

function getTxtBoxes(){
  return txtBoxLocations
}

function setTxtBoxes(txtBoxes){
  txtBoxLocations = txtBoxes
}

// move to util
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function deleteTxtBox() {
  var currLine = getCurrLineIdx();
  txtBoxLocations.splice(currLine, 1);
  console.log(txtBoxLocations);
}

function createTxtBox(x, y) {
  var w = gCanvas.width;
  return {
    x,
    y,
    height: w / 7,
    width: w - w / 10,
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
    if (forDisplay) isCurrLine = false;
    drawRect(txtBox.x, txtBox.y, isCurrLine, txtBox.width, txtBox.height);
    // console.log('index', index);
    // console.log('meme.selectedLineIdx', meme.selectedLineIdx);
    gCtx.strokeStyle = txtInfo.outlineColor;
    console.log('txtInfo.outlineColor',txtInfo.outlineColor);
    gCtx.textAlign = txtInfo.align; // change aline!
    gCtx.fillStyle = txtInfo.fontColor;
    gCtx.font = `${txtInfo.size}px ${txtInfo.font}`;
    var txtX = txtBox.x + txtBox.x;
    var txtY = txtBox.y + txtBox.height - txtBox.x;
    gCtx.fillText(txtInfo.txt, txtX, txtY, txtBox.width - txtX);
    gCtx.strokeText(txtInfo.txt, txtX, txtY, txtBox.width - txtX);
  });
}

function setImg() {
  var meme = getMeme()
  var imgIdx = meme.selectedImgId;
  var elImg = document.querySelector(`[data-img="${imgIdx}"]`);
  gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
}

function drawRect(x, y, isCurrLine, width, height) {
  gCtx.beginPath();
  gCtx.rect(x, y, width, height);
  if (isCurrLine) { // if its on focus make the bgc transparent white
    gCtx.fillStyle = "rgb(255 255 255 / 37%)";
    gCtx.fillRect(x, y, width, height);
  }
  gCtx.strokeStyle = "black";
  gCtx.stroke();
}

function resizeCanvas() {
  var elContainer = document.querySelector(".canvas-container");
  gCanvas.width = elContainer.offsetWidth;
  gCanvas.height = elContainer.offsetWidth;// for not squre imgs
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
    if (txtBox.x <= clickedPos.x && clickedPos.x - txtBox.x <= txtBox.width) {
      if (txtBox.y <= clickedPos.y && clickedPos.y - txtBox.y <= txtBox.height)
        lineIdx = index;
    }
  });
  return lineIdx;
}

function onDown(ev) {
  const pos = getEvPos(ev);
  console.log("onDown()");
  var currLine = isTxtBoxClicked(pos);
  console.log(currLine);
  if (currLine === undefined) return;

  setSelectedLine(currLine);
  setBoxDrag(true);
  gStartPos = pos;
  // gStartPos.offsetX = ev.x - pos.x
  // gStartPos.offsetY = ev.y - pos.y
  gStartPos.offset = {
    x: ev.x - pos.x,
    y: ev.y - pos.y
  }
  // document.body.style.cursor = "grabbing";
}

function setBoxDrag(isDragBool) {
  var idx = getCurrLineIdx();
  txtBoxLocations[idx].isDrag = isDragBool;
}

function onMove(ev) {
  console.log("onMove()");
  var idx = getCurrLineIdx();
  if (!gStartPos) return;
  if (txtBoxLocations[idx].isDrag) {
    document.body.style.cursor = "grabbing";
    const pos = getEvPos(ev);
    // pos.x = ev.x - pos.offset.x
    // pos.y = ev.y - pos.offset.y
    txtBoxLocations[idx].x = pos.x - gStartPos.x;
    txtBoxLocations[idx].y = pos.y - gStartPos.y;
    // txtBoxLocations[idx].x = pos.x;
    // txtBoxLocations[idx].y = pos.y;
    // txtBoxLocations[idx].x
    // txtBoxLocations[idx].y
    gStartPos = pos;
    renderMeme();
  }
}

function onUp() {
  if (gStartPos === null) return;
  console.log("onUp()");
  setBoxDrag(false);
  document.body.style.cursor = "auto"; // normal cursor
  gStartPos = null;
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

// removes marked line bgc before save / download / share
function getCanvas() {
  renderMeme(true);
  return gCanvas;
}
