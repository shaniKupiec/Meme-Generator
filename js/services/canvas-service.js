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
  } else {
    // random from the 4th txt box
    txtBoxLocations.push(
      createTxtBox(w / 20, getRandomInt(w / 20, w - w / 20 - w / 7))
    );
    return;
  }
}

function createTxtBox(x, y) {
  var w = gCanvas.width;
  return {
    x,
    y,
    height: w / 7, //14.5%
    width: w - w / 10, // 90%
    isDrag: false,
  };
}

function deleteTxtBox() {
  var currLine = getCurrLineIdx();
  txtBoxLocations.splice(currLine, 1);
}

function renderMeme(forDisplay = false) {
  drawImg();
  var meme = getMeme();
  txtBoxLocations.forEach((txtBox, index) => {
    var txtInfo = meme.lines[index];
    // check selected line and if it's not the first line - change the inputs value to the existing text
    var isCurrLine = meme.selectedLineIdx === index ? true : false;
    if (isCurrLine && !isFirstLine()){
      // clean up the editor
      setInputVal(txtInfo.txt);
      setColors(txtInfo.outlineColor, txtInfo.fontColor)
    }
    // if we render not for diaplay (save / download / share) we don't put focus on selected line
    if (forDisplay) isCurrLine = false;
    // draw rectangle
    drawRect(txtBox.x, txtBox.y, isCurrLine, txtBox.width, txtBox.height);
    // set font style
    gCtx.strokeStyle = txtInfo.outlineColor;
    gCtx.fillStyle = txtInfo.fontColor;
    gCtx.font = `${txtInfo.size}px ${txtInfo.font}`;
    // set align
    var gap = gCanvas.width / 20;
    gCtx.textAlign = txtInfo.align;
    var txtX;
    if (txtInfo.align === "left") txtX = txtBox.x + gap;
    else if (txtInfo.align === "right") txtX = txtBox.x + txtBox.width - gap;
    else txtX = txtBox.x + txtBox.width / 2;
    var txtY = txtBox.y + txtBox.height - gap;
    var maxWidth = txtBox.width - gap * 2;
    // draw font
    gCtx.fillText(txtInfo.txt, txtX, txtY, maxWidth);
    gCtx.strokeText(txtInfo.txt, txtX, txtY, maxWidth);
  });
}

function drawImg() {
  var meme = getMeme();
  var imgIdx = meme.selectedImgId;
  var elImg = getElImg(imgIdx);
  gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
}

function drawRect(x, y, isCurrLine, width, height) {
  gCtx.beginPath();
  gCtx.rect(x, y, width, height);
  if (isCurrLine) {
    // if its on focus make the bgc transparent white
    gCtx.fillStyle = "rgb(255 255 255 / 37%)";
    gCtx.fillRect(x, y, width, height);
  }
  gCtx.strokeStyle = "black";
  gCtx.stroke();
}

function resizeCanvas() {
  var elContainer = getElContainer()
  gCanvas.width = elContainer.offsetWidth;
  gCanvas.height = elContainer.offsetWidth; // for not squre imgs
  if(gCanvas.width < 400) setDefalutSize(30)
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
  gCanvas.addEventListener("mousedown", onDown);
  gCanvas.addEventListener("mousemove", onMove);
  gCanvas.addEventListener("mouseup", onUp);
}

function addTouchListeners() {
  gCanvas.addEventListener("touchstart", onDown);
  gCanvas.addEventListener("touchmove", onMove);
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

function setBoxDrag(isDragBool) {
  var idx = getCurrLineIdx();
  txtBoxLocations[idx].isDrag = isDragBool;
}

function onDown(ev) {
  const pos = getEvPos(ev);
  // console.log("onDown()");
  var currLine = isTxtBoxClicked(pos);
  console.log(currLine);
  if (currLine === undefined) return;

  setCursor("grabbing");
  setSelectedLine(currLine);

  setBoxDrag(true);
  gStartPos = pos;
  gStartPos.offset = {
    x: ev.x - pos.x,
    y: ev.y - pos.y,
  };
  // document.body.style.cursor = "grabbing";
  renderMeme();
}

function onMove(ev) {
  // console.log("onMove()");
  var idx = getCurrLineIdx();
  if (!gStartPos || !txtBoxLocations[idx].isDrag) return;
  setCursor("grabbing")
  // document.body.style.cursor = "grabbing";
  const pos = getEvPos(ev);
  // console.log(pos);
  txtBoxLocations[idx].x += pos.x - gStartPos.x;
  txtBoxLocations[idx].y += pos.y - gStartPos.y;
  gStartPos = pos;
  renderMeme();
}

function onUp() {
  if (gStartPos === null) return;
  // console.log("onUp()");
  setBoxDrag(false);
  gStartPos = null;
  setCursor("auto")

  // document.body.style.cursor = "auto"; // normal cursor
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

// extra functions - get and set
function getTxtBoxes() {
  return txtBoxLocations;
}

function setTxtBoxes(txtBoxes) {
  txtBoxLocations = txtBoxes;
}
