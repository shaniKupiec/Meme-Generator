"use strict";

var gCanvas;
var gCtx;
var txtBoxLocations = [];

function initCanvas() {
  gCanvas = document.querySelector("#my-canvas");
  gCtx = gCanvas.getContext("2d");
  //   resizeCanvas();
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

function drawRect(x, y, isCurrLine, strokeColor,  width = 400, height = 65) {
  var color = isCurrLine ? "red" : "black"; //change
  gCtx.beginPath();
  gCtx.rect(x, y, width, height);
  //   gCtx.fillStyle = color;
  //   gCtx.fillRect(x, y, width, height);
  gCtx.strokeStyle = strokeColor;
  gCtx.stroke();
}

// not is use

function resizeCanvas() {
  var elContainer = document.querySelector(".canvas-container");
  gCanvas.width = elContainer.offsetWidth;
  gCanvas.height = elContainer.offsetWidth;
  // gCanvas.height = elContainer.offsetHeight; for not squre imgs
  // console.log('resizeCanvas');
}

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
