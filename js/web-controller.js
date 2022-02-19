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

function getImgsForDisplay(){
  var keyword = document.querySelector('#search-choice').value;
  var imgs = getImgs();
  if(!keyword.length) return imgs
  return imgs.filter(img => img.keywords.includes(keyword))
}

function renderGalleryImgs() {
  var imgs = getImgsForDisplay()
  console.log(imgs);
  var str = imgs.map(
    (img, index) =>
      `<img data-img="${index}" onclick="startEditMeme(${
        index
      })" src="${img.url}" alt=""></img>`
  );
  document.querySelector(".grid-container-gall").innerHTML = str.join("");
}

function getMemesForDisplay(){
  var keyword = document.querySelector('#search-choice').value;
  var memes = getSavedMemes();
  if(!keyword.length) return memes
  return memes.filter(memes => memes.imgInfo.keywords.includes(keyword))
}

function renderGalleryMemes() {
  console.log("renderGalleryMemes rendering meme gallery");
  var memes = getMemesForDisplay();
  var str = memes.map((meme, index) => {
    var imgIdx = meme.memeInfo.selectedImgId;
    return `<div class="" onclick="startEditMeme(${imgIdx},${index})" >
    ${meme.fileName}, created at : ${meme.memeInfo.createdAt} <br>
    <img data-img="${imgIdx}" class="small-img" src="${meme.imgInfo.url}" alt="">
    </img> </div> `;
  });
  console.log('renderGalleryMemes str to render', str);
  document.querySelector(".grid-container-gall").innerHTML = str.join("");
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

// Menue
function toggleMenu() {
  document.body.classList.toggle("menu-open");
  document.querySelector(".second-nav").classList.toggle("flex");
  console.log("toggle menu");
}

function isMenuOpen() {
  return document.body.classList.length ? true : false;
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