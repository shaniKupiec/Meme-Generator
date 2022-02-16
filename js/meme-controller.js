"use strict";

// add event key up to detect any change in the text input
const elInputTxt = document.querySelector('.btn-input-txt');
elInputTxt.addEventListener('keyup', onSetLineTxt);

// change gallery to editor 
function startEditMeme(imgIdx) {
//   console.log("startEditMeme", imgIdx);
  initCanvas();
  document.querySelector(".img-gallery").setAttribute("hidden", "");
  var elEditorPage = document.querySelector(".meme-editor")
  elEditorPage.removeAttribute("hidden");
  elEditorPage.classList.add("flex");
  createMeme(imgIdx);
  renderMeme();
}

// switch focus on line
function onSwitchLine(){
    switchLine()
    renderMeme();
}

// change in text input
function onSetLineTxt() {
    changeTxtMeme();
    renderMeme();
}

// add new text box
function onAddLineTxt(isFirstLine = false) {
    // if the user start typing without a text box, we dont erase the text
    if(!isFirstLine) document.querySelector('.btn-input-txt').value = ''
    addLine()
    addTxtBox()
    renderMeme()
}
