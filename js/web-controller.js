"use strict";

var gCurrPage = "gallery";

function init() {
  createImgs();
  switchPage(null, gCurrPage)
  getSavedFromStorge();
}

function upLoadPage() { // what page to render
  if (gCurrPage === "gallery") renderGalleryImgs();
  else if (gCurrPage === "memes") renderGalleryMemes();
  else if (gCurrPage === "about") console.log("about")
  else console.log("editor");
}

function renderGalleryImgs() {
  var imgs = getImgs();
  var str = imgs.map(
    (img, index) =>
      `<img data-img="${index}" onclick="startEditMeme(${
        index
      })" src="${img.url}" alt=""></img>`
  );
  document.querySelector(".grid-container-gall").innerHTML = str.join("");
}

function renderGalleryMemes() {
  console.log("renderGalleryMemes rendering meme gallery");
  var memes = getSavedMemes();
  var imgs = getImgs();
  var str = memes.map((meme, index) => {
    var imgIdx = meme.memeInfo.selectedImgId;
    return `<div class="" onclick="startEditMeme(${imgIdx},${index})" >
    ${meme.fileName}, created at : ${meme.memeInfo.createdAt}
    <img data-img="${imgIdx}" class="small-img" src="${imgs[imgIdx].url}" alt="">
    </img> </div> `;
  });
  console.log('renderGalleryMemes str to render', str);
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

function toggleEditor(isEditorShown) {
  if (isEditorShown) {
    document.querySelector(".img-gallery").setAttribute("hidden", "");
    document.querySelector(".main-content").removeAttribute("hidden");
    // gCurrPage = "editor";
    switchPage(null, "editor")
  } else {
    document.querySelector(".img-gallery").removeAttribute("hidden");
    document.querySelector(".main-content").setAttribute("hidden", "");
  }
}

// switch between pages
function switchPage(ev, pageName){
  if(ev) {
    if (!isMenuOpen()) ev.stopPropagation();
  }
  document.querySelector(`.${gCurrPage}`).style.boxShadow = ""

  if(pageName !== 'editor'){
    if(gCurrPage === 'editor') toggleEditor(false)
    gCurrPage = pageName;
    document.querySelector(`.${gCurrPage}`).style.boxShadow = "inset 0px -7px 12px 4px rgb(255 191 78 / 63%)"
  } else gCurrPage = pageName;

  upLoadPage();
}