"use strict";

var gStrokeColor;
var gFillColor;
var gCanvas;
var gCtx;

function initCanvas() {
  gCanvas = document.querySelector("#my-canvas");
  gCtx = gCanvas.getContext("2d");
  resizeCanvas();
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
