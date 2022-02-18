"use strict";

var gMeme;
var gOutlineColor = "black";
var gTextColor = "white";
var gFont = "Impact";
const memesSentences = [
  'I never eat falafel',
  'DOMS DOMS EVERYWHERE',
  'Stop Using i in for loops',
  'Armed in knowledge',
  'Js error "Unexpected String"',
  'One does not simply write js',
  'I`m a simple man i see vanilla JS, i click like!',
  'JS, HTML,CSS?? Even my momma can do that',
  'May the force be with you',
  'I know JS',
  'JS Where everything is made up and the rules dont matter',
  'Not sure if im good at programming or good at googling',
  'But if we could',
  'JS what is this?',
  'Write hello world , add to cv 7 years experienced',
];

function createMeme(imgIdx) {
  gMeme = {
    selectedImgId: imgIdx,
    selectedLineIdx: -1,
    lines: [],
    createdAt: getDateInFormat(),
  };
  //   console.log('createMeme');
}

function getDateInFormat(){
  let date = new Date();
  return date.toLocaleString('en-US')
}

// change focus on line
function switchLine() {
  gMeme.selectedLineIdx =
    gMeme.selectedLineIdx === gMeme.lines.length - 1
      ? 0
      : gMeme.selectedLineIdx + 1;
  //   console.log(gMeme.selectedLineIdx);
}

function deleteLine() {
  var currLine = gMeme.selectedLineIdx;
  console.log("gMeme.selectedLineIdx ", gMeme.selectedLineIdx);
  gMeme.lines.splice(currLine, 1);
  console.log(gMeme);
  if (!gMeme.lines.length) { // if the uer delete the last line
    gMeme.selectedLineIdx = -1;
    document.querySelector(".btn-input-txt").value = "";
  } else gMeme.selectedLineIdx = 0;
  console.log("gMeme.selectedLineIdx ", gMeme.selectedLineIdx);
}

function changeTxtMeme() {
  var currLine = gMeme.selectedLineIdx;
  // if the user start typing without a text box, we create one
  if (currLine === -1) {
    toggleFirstLine();
    onAddLineTxt();
    currLine++;
    // console.log('firstLine');
  }
  // at each change of key we copy the wholl value of the input
  gMeme.lines[currLine].txt = document.querySelector(".btn-input-txt").value;
  if (getFirstLine()) toggleFirstLine();
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
  gFont = newFont;
}

// need to work on
function changeAlign(position) {
  var currLine = gMeme.selectedLineIdx;
  if (!gMeme.lines.length) return;
  gMeme.lines[currLine].align = position;
}

function changeFontSize(isIncrease) {
  if (!gMeme.lines.length) return;
  var currLine = gMeme.selectedLineIdx;
  if (gMeme.lines[currLine].size < 25 || gMeme.lines[currLine].size > 60) return;
  gMeme.lines[currLine].size += isIncrease ? 3 : -3;
  // console.log( gMeme.lines[currLine].size);
}

function addLine() {
  gMeme.lines.push(ceateLine());
  // console.log(gMeme);
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

// extra functions - get and set
function getMeme() {
  return gMeme;
}

function getLinesInfo() {
  return gMeme.lines;
}

function getCurrLineIdx() {
  return gMeme.selectedLineIdx;
}

function setSelectedLine(lineIdx) {
  gMeme.selectedLineIdx = lineIdx;
}

function setMeme(meme) {
  gMeme = meme;
}

function setRandLineTxt(){
  var currLine = gMeme.selectedLineIdx;
  gMeme.lines[currLine].txt = memesSentences[getRandomInt(0, 15)]
}
