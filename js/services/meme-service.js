"use strict";

var gMeme;
var gDefalutSize = 40;
// var gOutlineColor = "black";
// var gTextColor = "white";
var gFont = "Impact";
const memesSentences = [
  "I never eat falafel",
  "DOMS DOMS EVERYWHERE",
  "Stop Using i in for loops",
  "Armed in knowledge",
  'Js error "Unexpected String"',
  "One does not simply write js",
  "I`m a simple man i see vanilla JS, i click like!",
  "JS, HTML,CSS?? Even my momma can do that",
  "May the force be with you",
  "I know JS",
  "JS Where everything is made up and the rules dont matter",
  "Not sure if im good at programming or good at googling",
  "But if we could",
  "JS what is this?",
  "Write hello world , add to cv 7 years experienced",
];

function createMeme(imgIdx) {
  gMeme = {
    selectedImgId: imgIdx,
    selectedLineIdx: -1,
    lines: [],
    createdAt: getDateInFormat(),
  };
}

function addLine(isEmoji = false, emoji = false) {
  gMeme.lines.push(ceateLine(isEmoji, emoji));
  gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function ceateLine(isEmoji, emoji) {
  if (!isEmoji) {
    return {
      txt: "",
      size: gDefalutSize,
      align: "left",
      font: gFont,
      fontColor: "#FFFFFF",
      outlineColor: "#000000",
      isEmoji: false,
    };
  }
  return {
    txt: emoji.str,
    size: gDefalutSize,
    isEmoji: true,
  };
}

function deleteLine() {
  var currLine = gMeme.selectedLineIdx;
  gMeme.lines.splice(currLine, 1);
  if (!gMeme.lines.length) {
    // if the uer delete the last line
    gMeme.selectedLineIdx = -1;
    document.querySelector(".btn-input-txt").value = "";
  } else gMeme.selectedLineIdx = 0;
}

// change focus on line
function switchLine() {
  gMeme.selectedLineIdx =
    gMeme.selectedLineIdx === gMeme.lines.length - 1
      ? 0
      : gMeme.selectedLineIdx + 1;
}

function changeTxtMeme() {
  var currLine = gMeme.selectedLineIdx;
  // if the user start typing without a text box, we create one
  if (currLine === -1) {
    toggleFirstLine();
    onAddLineTxt();
    // currLine++;
    currLine = gMeme.lines.length - 1;
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
  }
  // at each change of key we copy the wholl value of the input
  gMeme.lines[currLine].txt = document.querySelector(".btn-input-txt").value;
  if (isFirstLine()) toggleFirstLine();
}

function setColor(type, color) {
  var currLine = gMeme.selectedLineIdx;
  gMeme.lines[currLine][type] = color;
}

function setFont(newFont) {
  gMeme.lines.forEach((line) => {
    line.font = newFont;
  });
  gFont = newFont;
}

function changeAlign(position) {
  var currLine = gMeme.selectedLineIdx;
  if (!gMeme.lines.length) return;
  gMeme.lines[currLine].align = position;
}

function changeFontSize(isIncrease) {
  if (!gMeme.lines.length) return;
  var currLine = gMeme.selectedLineIdx;
  if (
    (gMeme.lines[currLine].size < 20 && !isIncrease) ||
    (gMeme.lines[currLine].size > 60 && isIncrease)
  )
    return;
  gMeme.lines[currLine].size += isIncrease ? 3 : -3;
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

function setRandLineTxt() {
  var currLine = gMeme.selectedLineIdx;
  gMeme.lines[currLine].txt = memesSentences[getRandomInt(0, 15)];
}

function setDefalutSize(newVal) {
  gDefalutSize = newVal;
}
