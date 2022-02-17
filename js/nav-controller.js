"use strict";

function toggleMenu(){
  document.body.classList.toggle('menu-open')
  document.querySelector('.second-nav').classList.toggle('flex')
  console.log('toggle menu');
}

function showGallery() {
  console.log("gallery");
}

function showMemes() {
  console.log("memes");
}

function showAbout() {
  console.log("modal about");
}
