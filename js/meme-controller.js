"use strict";

var gFirstLine = false;
// add event key up to detect any change in the text input
const elInputTxt = document.querySelector(".btn-input-txt");
elInputTxt.addEventListener("keyup", onSetLineTxt);
// emojis
var gEmojis = [
  createEmoji(0, "👒"),
  createEmoji(1, "🌻"),
  createEmoji(2, "👻"),
  createEmoji(3, "🍸"),
  createEmoji(4, "⚽"),
  createEmoji(5, "📌"),
  createEmoji(6, "🎶"),
];
const EMOJI_NAV_LENGHT = 3;
var gIdxStart = 0;
var gIdxEnd = EMOJI_NAV_LENGHT - 1;
var gEmojisForDis = [gEmojis[0], gEmojis[1], gEmojis[2]];

function startEditMeme(imgIdx, readyMemeIdx = -1) {
  toggleEditor(true);
  if (readyMemeIdx === -1) {
    // create new meme
    createMeme(imgIdx);
    setTxtBoxes([]);
    document.querySelector(".btn-input-txt").value = "";
    console.log("createMeme");
    setColors("#FFFFFF", "#000000");
  } else {
    // use existing meme
    var savedMemes = getSavedMemes();
    setMeme(savedMemes[readyMemeIdx].memeInfo);
    setTxtBoxes(savedMemes[readyMemeIdx].txtBoxesInfo);
    console.log("setMeme");
  }
  initCanvas();
  renderEmojis();
  renderMeme();
}

// i'm flexible
function randomMeme() {
  startEditMeme(getRandomInt(0, 17));
  addLine();
  addTxtBox();
  setRandLineTxt();
  renderMeme();
}

// function from HTML
// switch focus on line
function onSwitchLine() {
  switchLine();
  renderMeme();
}

// change in text input
function onSetLineTxt() {
  var meme = getMeme()
 if(meme.lines.length && meme.lines[gMeme.selectedLineIdx].isEmoji) setSelectedLine(-1)
  
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
  createSavedMeme(
    name,
    getImgs()[getMeme().selectedImgId],
    getMeme(),
    getTxtBoxes()
  );
  alert("saved! you can see it on memes");
}

function onDownload(elLink) {
  var canvas = getCanvas();
  elLink.href = canvas.toDataURL("image/png");
  elLink.download = "my-cool-meme";
}

// extra func - get, set and toggle
function toggleFirstLine() {
  gFirstLine = !gFirstLine;
  console.log(gFirstLine);
}

function isFirstLine() {
  return gFirstLine;
}

function setInputVal(newVal) {
  document.querySelector(".btn-input-txt").value = newVal;
}

function getElImg(imgIdx) {
  return document.querySelector(`[data-img="${imgIdx}"]`);
}

function getElContainer() {
  return document.querySelector(".canvas-container");
}

function setCursor(newVal) {
  document.querySelector("body").style.cursor = newVal;
}

function setColors(outLine, txt) {
  document.querySelector("[name=outlineColor]").value = outLine;
  document.querySelector("[name=textColor]").value = txt;
}

// emojis
function createEmoji(index, str) {
  return {
    index,
    str
  };
}

function moveCarousel(idx) {
  if (idx === 1) {
    gEmojisForDis.shift();
    gIdxStart = gIdxStart === gEmojis.length - 1 ? 0 : gIdxStart + 1;
    gIdxEnd = gIdxEnd === gEmojis.length - 1 ? 0 : gIdxEnd + 1;
    gEmojisForDis.push(gEmojis[gIdxEnd]);
    renderEmojis();
    return;
  }
  gEmojisForDis.pop();
  gIdxEnd = gIdxEnd === 0 ? gEmojis.length - 1 : gIdxEnd - 1;
  gIdxStart = gIdxStart === 0 ? gEmojis.length - 1 : gIdxStart - 1;
  gEmojisForDis.unshift(gEmojis[gIdxStart]);
  renderEmojis();
}

function renderEmojis() {
  var str = gEmojisForDis.map((emoji) => `<div class="emoji-icon" onclick="addEmoji(${emoji.index})">${emoji.str}</div>`);
  document.querySelector(".emojis-area").innerHTML = str.join("");
}

function addEmoji(idxEmoji){
  addLine(true, gEmojis[idxEmoji]);
  addTxtBox(true);
  renderMeme();
}
