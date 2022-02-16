"use strict";

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

function setLineTxt() {}
