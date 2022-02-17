"use strict";

var gFirstLine = false;
// add event key up to detect any change in the text input
const elInputTxt = document.querySelector(".btn-input-txt");
elInputTxt.addEventListener("keyup", onSetLineTxt);

function startEditMeme(imgIdx, readyMemeIdx = -1) {
  // console.log("startEditMeme", imgIdx);
  // change web sidplay from gallery / meme to editor
  toggleEditor(true);
  if (readyMemeIdx === -1) { // create new meme
    createMeme(imgIdx);
  } else { // use existing meme
    var savedMemes = getSavedMemes();
    var savedMeme = savedMemes[readyMemeIdx].memeInfo;
    setMeme(savedMeme);
  }
  initCanvas();
  renderMeme();
}

function toggleFirstLine() {
  gFirstLine = !gFirstLine;
  // console.log(gFirstLine);
}

// switch focus on line
function onSwitchLine() {
  switchLine();
  renderMeme();
}

// change in text input
function onSetLineTxt() {
  changeTxtMeme();
  renderMeme();
}

function onDeleteLine() {
  deleteTxtBox();
  deleteLine();
  renderMeme();
}

function onSetFont() {
  var newFont = document.querySelector(".btn-select-font").value;
  console.log(newFont);
  setFont(newFont);
  renderMeme();
}

// add new text box
function onAddLineTxt() {
  // if the user start typing without a text box, we dont erase the text
  if (!gFirstLine) {
    document.querySelector(".btn-input-txt").value = "";
    // console.log('not first line');
  }
  addLine();
  addTxtBox();
  renderMeme();
}

function setAlign(position) {
  changeAlign(position);
  renderMeme();
}

function setFontSize(isIncrease) {
  changeFontSize(isIncrease);
  renderMeme();
}

// change color
function setOutlineColor() {
  const color = document.querySelector("[name=outlineColor]").value;
  setColor("outlineColor", color);
  renderMeme();
}

function setTextColor() {
  const color = document.querySelector("[name=textColor]").value;
  setColor("fontColor", color);
  renderMeme();
}

// savw download
function save() {
  var name = prompt("name this meme");
  createSavedMeme(name, getMeme());
  alert("saved! you can see it on memes");
}

function onDownload(elLink) {
  // console.log('saved!');
  var canvas = getCanvas()
  elLink.href = canvas.toDataURL('image/png');
  elLink.download = 'my-cool-meme';
}

// extra func - get and set
function getFirstLine() {
  return gFirstLine;
}