"use strict";

// var gStrokeColor;
// var gFillColor;
var gCanvas;
var gCtx;
var txtBoxLocations = [];

function initCanvas() {
  gCanvas = document.querySelector("#my-canvas");
  gCtx = gCanvas.getContext("2d");
  resizeCanvas();
}

function addTxtBox() {
  var lines = getLinesInfo();
  console.log(lines.length);
  if (lines.length === 1) {
    var txtBox = { x: 25, y: 0 };
    drawRect(txtBox.x, txtBox.y);
    txtBoxLocations.push(txtBox);
  }
  if (lines.length === 2) {
    var txtBox = { x: 25, y: 385 };
    drawRect(txtBox.x, txtBox.y);
    txtBoxLocations.push(txtBox);
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

function renderMeme2() {
  setImg();
  var meme = getMeme();
  txtBoxLocations.forEach((txtBox, index) => {
    drawRect(txtBox.x, txtBox.y);
    var txtInfo = meme.lines[index];
    gCtx.font = `${txtInfo.size}px ${txtInfo.font}`;
    gCtx.fillText(txtInfo.txt, txtBox.x + 25, txtBox.y + 40);
  });
}

function resizeCanvas() {
  var elContainer = document.querySelector(".canvas-container");
  gCanvas.width = elContainer.offsetWidth;
  gCanvas.height = elContainer.offsetWidth;
  // gCanvas.height = elContainer.offsetHeight; for not squre imgs
  //   console.log('resizeCanvas');
}

function setImg() {
  var imgIdx = getMeme().selectedImgId;
  var elImg = document.querySelector(`[data-img="${imgIdx}"]`);
  //   console.log(elImg);
  gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
  //   console.log("setImg");
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

function drawRect(x, y, width = 400, height = 65) {
  gCtx.beginPath();
  gCtx.rect(x, y, width, height);
  // gCtx.fillStyle = gFillColor;
  // gCtx.fillRect(x, y, 100, 100);
  gCtx.strokeStyle = "black";
  gCtx.stroke();
}
