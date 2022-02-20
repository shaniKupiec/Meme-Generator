"use strict";

var gCanvas;
var gCtx;
var gTxtBoxLocations = [];
var gEmojisLoactions = [];
var gStartPos = null;
const gTouchEvs = ["touchstart", "touchmove", "touchend"];

function initCanvas() {
  gCanvas = document.querySelector("#my-canvas");
  gCtx = gCanvas.getContext("2d");
  addListenersMeme();
  resizeCanvas();
}

// add txt box according to number of line
function addTxtBox(isEmoji = false, emojiInfo = false) {
  var w = gCanvas.width;
  if (isEmoji) {
    // add unique sizw to emoji txt box
    var txtBox = createTxtBox(w / 2, w / 2);
    txtBox.height = emojiInfo.size;
    txtBox.width = emojiInfo.size;
    gTxtBoxLocations.push(txtBox);
    return;
  }
  var lines = getLinesInfo();
  var txtLines = lines.filter((line) => !line.isEmoji);
  if (txtLines.length === 1) {
    gTxtBoxLocations.push(createTxtBox(w / 20, w / 20));
    return;
  }
  if (txtLines.length === 2) {
    gTxtBoxLocations.push(createTxtBox(w / 20, w - w / 20 - w / 7));
    return;
  }
  if (txtLines.length === 3) {
    gTxtBoxLocations.push(createTxtBox(w / 20, w / 2 - w / 7 / 2));
    return;
  } else {
    // random from the 4th txt box
    gTxtBoxLocations.push(
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

function createTxtBoxForEmoji(x, y, size) {
  return {
    // x: x,
    // y: y,
    x: x - size /2,
    y: y - size /2,
    // height: x - size /2,
    // width: y - size /2,
    height: size * 3,
    width: size * 3,
    isDrag: false,
  };
}

function deleteTxtBox() {
  var currLine = getCurrLineIdx();
  gTxtBoxLocations.splice(currLine, 1);
}

function renderMeme(forDisplay = false) {
  drawImg();
  var meme = getMeme();
  gTxtBoxLocations.forEach((txtBox, index) => {
    var txtInfo = meme.lines[index];
    // check selected line and if it's not the first line - change the inputs value to the existing text
    var isCurrLine = meme.selectedLineIdx === index;
    // if we render not for diaplay (save / download / share) we don't put focus on selected line
    if (forDisplay) isCurrLine = false;

    if (txtInfo.isEmoji) {
      // emoji
      // draw rectangle
      if (isCurrLine){
        drawTransparentRect(
          txtBox.x,
          txtBox.y,
          txtBox.width,
          txtBox.height,
        );
        console.log('isCurrLine',isCurrLine);
        console.log('index',index);
      }
      gCtx.font = `${txtInfo.size}px Impact`;
      gCtx.fillText(txtInfo.txt, txtBox.x, txtBox.y + txtBox.height / 2);
      // add emoji
    } else {
      // normal text
      if (isCurrLine && !isFirstLine()) {
        // clean up the editor
        setInputVal(txtInfo.txt);
        setColors(txtInfo.outlineColor, txtInfo.fontColor);
      }
      // draw rectangle
      if (isCurrLine) drawRect(txtBox.x, txtBox.y, txtBox.width, txtBox.height);
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
    }
  });
}

function drawImg() {
  var meme = getMeme();
  var imgIdx = meme.selectedImgId;
  var elImg = getElImg(imgIdx);
  gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
}

function drawRect(x, y, width, height) {
  gCtx.beginPath();
  gCtx.rect(x, y, width, height);
  // gCtx.fillStyle = "rgb(255 255 255 / 37%)";
  // gCtx.fillRect(x, y, width, height);
  // gCtx.strokeStyle = "black";
  gCtx.stroke();
}

function drawTransparentRect(x, y, width, height) {
  gCtx.beginPath();
  gCtx.rect(x, y, width, height);
  // gCtx.fillStyle = "rgb(255 255 255 / 37%)";
  gCtx.stroke();
}

function resizeCanvas() {
  var elContainer = getElContainer();
  gCanvas.width = elContainer.offsetWidth;
  gCanvas.height = elContainer.offsetWidth;
  if (gCanvas.width < 400) setDefalutSize(30);
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
  gTxtBoxLocations.forEach((txtBox, index) => {
    if (txtBox.x <= clickedPos.x && clickedPos.x - txtBox.x <= txtBox.width) {
      if (txtBox.y <= clickedPos.y && clickedPos.y - txtBox.y <= txtBox.height)
        lineIdx = index;
    }
  });
  return lineIdx;
}

function setBoxDrag(isDragBool) {
  var idx = getCurrLineIdx();
  gTxtBoxLocations[idx].isDrag = isDragBool;
}

function onDown(ev) {
  const pos = getEvPos(ev);
  var currLine = isTxtBoxClicked(pos);
  if (currLine === undefined) return;

  setCursor("grabbing");
  setSelectedLine(currLine);

  setBoxDrag(true);
  gStartPos = pos;
  gStartPos.offset = {
    x: ev.x - pos.x,
    y: ev.y - pos.y,
  };
  renderMeme();
}

function onMove(ev) {
  var idx = getCurrLineIdx();
  if (!gStartPos || !gTxtBoxLocations[idx].isDrag) return;
  setCursor("grabbing");
  const pos = getEvPos(ev);
  gTxtBoxLocations[idx].x += pos.x - gStartPos.x;
  gTxtBoxLocations[idx].y += pos.y - gStartPos.y;
  gStartPos = pos;
  renderMeme();
}

function onUp() {
  if (gStartPos === null) return;
  setBoxDrag(false);
  gStartPos = null;
  setCursor("auto");
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
  return gTxtBoxLocations;
}

function setTxtBoxes(txtBoxes) {
  gTxtBoxLocations = txtBoxes;
}
