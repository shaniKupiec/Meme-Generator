"use strict";

var gMeme;
var gOutlineColor = "black";
var gTextColor = "white";
var gFont = "Impact"

function createMeme(imgIdx) {
  gMeme = {
    selectedImgId: imgIdx,
    selectedLineIdx: -1,
    lines: [],
    createdAt: Date.now()
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

function deleteLine(){
  var currLine = gMeme.selectedLineIdx;
  console.log('gMeme.selectedLineIdx ',gMeme.selectedLineIdx );
  gMeme.lines.splice(currLine, 1);
  console.log(gMeme);
  if(!gMeme.lines.length){
    gMeme.selectedLineIdx = -1;
    document.querySelector(".btn-input-txt").value = ''
  }
  else gMeme.selectedLineIdx = 0;
  console.log('gMeme.selectedLineIdx ',gMeme.selectedLineIdx );
  
}

function changeTxtMeme() {
  var currLine = gMeme.selectedLineIdx;
  // if the user start typing without a text box, we create one
  if (currLine === -1) {
    toggleFirstLine()
    onAddLineTxt();
    currLine++;
    // console.log('firstLine');
  }
  // at each change of key we copy the wholl value of the input
  gMeme.lines[currLine].txt = document.querySelector(".btn-input-txt").value;
  // debugger
  // console.log('here');
  if(getFirstLine()) toggleFirstLine()
}

function setColor(type, color) {
  gMeme.lines.forEach((line) => {
    line[type] = color;
  });
  if (type === "outlineColor") gOutlineColor = color;
  else gTextColor = color;
}

function setFont(newFont) {
  gMeme.lines.forEach((line) => {
    line.font = newFont;
  });
  gFont = newFont
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
  console.log(gMeme);
  gMeme.selectedLineIdx++;
}

function ceateLine() {
  return {
    txt: "",
    size: 40,
    align: "left",
    font: gFont,
    fontColor: gTextColor,
    outlineColor: gOutlineColor,
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

function setMeme(meme){
  gMeme = meme
}
