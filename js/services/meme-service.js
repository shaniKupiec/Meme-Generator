"use strict";

var gMeme;
var gStrokeColor = "black";
var gTextColor = "black";

function createMeme(imgIdx) {
  gMeme = {
    selectedImgId: imgIdx,
    selectedLineIdx: -1,
    lines: [],
  };
  //   console.log('createMeme');
}

function switchLine() {
  gMeme.selectedLineIdx =
    gMeme.selectedLineIdx === gMeme.lines.length - 1
      ? 0
      : gMeme.selectedLineIdx + 1;
  //   console.log(gMeme.selectedLineIdx);
}

function changeTxtMeme() {
  var currLine = gMeme.selectedLineIdx;
  // if the user start typing without a text box, we create one
  if (!gMeme.lines.length) {
    onAddLineTxt(true);
    currLine++;
    // console.log('firstLine');
  }
  // at each change of key we copy the wholl value of the input
  gMeme.lines[currLine].txt = document.querySelector(".btn-input-txt").value;
//   console.log('here');
}

function setColor(type, color) {
  gMeme.lines.forEach((txtBox) => {
    txtBox[type] = color;
  });
  if (type === "strokeColor") gStrokeColor = color;
  else gTextColor = color;
}

function changeAlign(position) {
  var currLine = gMeme.selectedLineIdx;
  if (!gMeme.lines.length) return;
  gMeme.lines[currLine].align = position;
}

function changeFontSize(isIncrease) {
  var currLine = gMeme.selectedLineIdx;
  if (!gMeme.lines.length) return;
  gMeme.lines[currLine].size += isIncrease ? 5 : -5;
}

function addLine() {
  gMeme.lines.push(ceateLine());
  gMeme.selectedLineIdx++;
}

function ceateLine() {
  return {
    txt: "",
    size: 40,
    align: "left",
    font: "emoji",
    fontColor: gTextColor,
    strokeColor: gStrokeColor,
  };
}

function getMeme() {
  return gMeme;
}

function getLinesInfo() {
  return gMeme.lines;
}

function getCurrLineIdx(){
    return gMeme.selectedLineIdx
}

function setSelectedLine(lineIdx) {
  gMeme.selectedImgId = lineIdx;
}
