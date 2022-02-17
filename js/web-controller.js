"use strict";

var gCurrPage = "gallery";

function init() {
  // console.log('hi');
  createImgs();
  upLoadPage();
  getSavedFromStorge();
}

function upLoadPage() {
  if (gCurrPage === "gallery") renderGalleryImgs();
  else if (gCurrPage === "memes") renderGalleryMemes();
  else console.log("about");
}

function renderGalleryImgs() {
  var imgs = getImgs();
  var str = imgs.map(
    (img, index) =>
      `<img data-img="${index + 1}" onclick="startEditMeme(${
        index + 1
      })" src="${img.url}" alt=""></img>`
  );
  document.querySelector(".grid-container-gall").innerHTML = str.join("");
}

function renderGalleryMemes() {
  console.log("rendering meme gallery");
  var memes = getSavedMemes();
  var imgs = getImgs();
  // console.log(JSON.stringify(memes[0].memeInfo));
  var str = memes.map((meme, index) => {
    var imgIdx = meme.memeInfo.selectedImgId;
    return `<div class="" onclick="startEditMeme(${imgIdx},${index})" >
    ${meme.fileName}, created at : ${meme.memeInfo.createdAt}
    <img data-img="${imgIdx}" class="small-img" onclick="startEditMeme(${imgIdx})" src="${imgs[imgIdx].url}" alt="">
    </img> </div> `;
  });
  console.log(str);
  document.querySelector(".grid-container-gall").innerHTML = str.join("");
}

function toggleMenu() {
  document.body.classList.toggle("menu-open");
  document.querySelector(".second-nav").classList.toggle("flex");
  console.log("toggle menu");
}

function isMenuOpen() {
  return document.body.classList.length ? true : false;
}

function showGallery(ev) {
  if (!isMenuOpen()) ev.stopPropagation();
  if (gCurrPage === "editor") toggleEditor(false);
  console.log("gallery");
  gCurrPage = "gallery";
  upLoadPage();
}

function showMemes(ev) {
  if (!isMenuOpen()) ev.stopPropagation();
  if (gCurrPage === "editor") toggleEditor(false);
  console.log("memes");
  gCurrPage = "memes";
  upLoadPage();
}

function showAbout(ev) {
  if (!isMenuOpen()) ev.stopPropagation();
  if (gCurrPage === "editor") toggleEditor(false);
  // console.log("modal about");
  gCurrPage = "about";
  upLoadPage();
}

function toggleEditor(isEditorShown) {
  if (isEditorShown) {
    document.querySelector(".img-gallery").setAttribute("hidden", "");
    document.querySelector(".main-content").removeAttribute("hidden");
    gCurrPage = "editor";
  } else {
    document.querySelector(".img-gallery").removeAttribute("hidden");
    document.querySelector(".main-content").setAttribute("hidden", "");
  }
}
