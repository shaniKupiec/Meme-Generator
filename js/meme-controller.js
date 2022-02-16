"use strict";

const elInputTxt = document.querySelector('.btn-input-txt');
elInputTxt.addEventListener('keyup', onSetLineTxt);

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

function renderMeme() {
  setImg();
//   console.log('renderMeme');
}

function onSetLineTxt(event) {
    // console.log('write');
    console.log(event.key);
    changeTxtMeme(event.key);
    renderMeme2();
}

function onAddLineTxt() {
    console.log('add line');
    addLine()
    addTxtBox()
}
