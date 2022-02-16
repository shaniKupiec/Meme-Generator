"use strict";

var gMeme;

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
  }
  // at each change of key we copy the wholl value of the input
  gMeme.lines[currLine].txt = document.querySelector(".btn-input-txt").value;
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
  };
}

function getMeme() {
  return gMeme;
}

function getLinesInfo() {
  return gMeme.lines;
}

function setSelectedLine(lineIdx) {
  gMeme.selectedImgId = lineIdx;
}