"use strict";

var gFirstLine = false;
// add event key up to detect any change in the text input
const elInputTxt = document.querySelector(".btn-input-txt");
elInputTxt.addEventListener("keyup", onSetLineTxt);

function startEditMeme(imgIdx, readyMemeIdx = -1) {
  toggleEditor(true);
  if (readyMemeIdx === -1) { // create new meme
    createMeme(imgIdx);
    setTxtBoxes([]);
    document.querySelector(".btn-input-txt").value = "";
    console.log('createMeme');
    setColors('#FFFFFF', '#000000')
  } else { // use existing meme
    var savedMemes = getSavedMemes();
    setMeme(savedMemes[readyMemeIdx].memeInfo);
    setTxtBoxes(savedMemes[readyMemeIdx].txtBoxesInfo)
    console.log('setMeme');
  }
  initCanvas();
  renderMeme();
}

// i'm flexible
function randomMeme(){
  startEditMeme(getRandomInt(0, 17))
  addLine()
  addTxtBox();
  setRandLineTxt()
  renderMeme();
}

function toggleFirstLine() {
  gFirstLine = !gFirstLine;
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
  setFont(newFont);
  renderMeme();
}

// add new text box
function onAddLineTxt() {
  // if the user start typing without a text box, we dont erase the text
  if (!gFirstLine) {
    document.querySelector(".btn-input-txt").value = "";
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

// save download
function save() {
  var name = prompt("name this meme");
  // var imgs = getImgs()
  createSavedMeme(name, getImgs()[getMeme().selectedImgId], getMeme(), getTxtBoxes());
  alert("saved! you can see it on memes");
}

function onDownload(elLink) {
  var canvas = getCanvas()
  elLink.href = canvas.toDataURL('image/png');
  elLink.download = 'my-cool-meme';
}

// extra func - get and set
function isFirstLine() {
  return gFirstLine;
}

function setInputVal(newVal){
  document.querySelector(".btn-input-txt").value = newVal
}

function getElImg(imgIdx){
  return document.querySelector(`[data-img="${imgIdx}"]`);
}

function getElContainer(){
  return document.querySelector(".canvas-container");
}

function setCursor(newVal){
  document.querySelector("body").style.cursor = newVal
}

function setColors(outLine, txt){
  console.log('set');
  document.querySelector("[name=outlineColor]").value = outLine;
  document.querySelector("[name=textColor]").value = txt;
}