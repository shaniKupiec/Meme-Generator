"use strict";

function startEditMeme(imgIdx) {
//   console.log("startEditMeme", imgIdx);
  initCanvas();
  document.querySelector(".img-gallery").setAttribute("hidden", "");
  document.querySelector(".meme-editor").removeAttribute("hidden");
  createMeme(imgIdx);
  renderMeme();
}

function renderMeme() {
  setImg();
//   console.log('renderMeme');
}

function setLineTxt() {}
