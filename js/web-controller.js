"use strict";

var gCurrPage = "gallery";

function init() {
  createImgs();
  switchPage(null, gCurrPage)
  getSavedFromStorage();
  setSizeKeywords();
}

function upLoadPage(selector = false) { // what page to render
  // if the user pressed the keywords, increase size and render
  if(selector){
    updateCountMap(selector)
    setSizeKeywords(selector);
  }
  if (gCurrPage === "gallery") renderGalleryImgs(selector);
  else if (gCurrPage === "memes") renderGalleryMemes(selector);
}

function getImgsForDisplay(selector){
  var keyword = (selector) ? selector : document.querySelector('#search-choice').value;
  var imgs = getImgs();
  if(!keyword.length) return imgs
  return imgs.filter(img => img.keywords.includes(keyword))
}

function renderGalleryImgs(selector) {
  var imgs = getImgsForDisplay(selector)
  var str = imgs.map(
    (img, index) =>
      `<img data-img="${index}" onclick="startEditMeme(${
        index
      })" src="${img.url}" alt=""></img>`
  );
  document.querySelector(".grid-container-gall").innerHTML = str.join("");
}

function getMemesForDisplay(selector){
  var keyword = (selector) ? selector : document.querySelector('#search-choice').value;
  var memes = getSavedMemes();
  if(!keyword.length) return memes
  return memes.filter(memes => memes.imgInfo.keywords.includes(keyword))
}

function renderGalleryMemes(selector) {
  var memes = getMemesForDisplay(selector);
  var str = memes.map((meme, index) => {
    var imgIdx = meme.memeInfo.selectedImgId;
    return `<div class="" onclick="startEditMeme(${imgIdx},${index})" >
    ${meme.fileName}, created at : ${meme.memeInfo.createdAt} <br>
    <img data-img="${imgIdx}" class="small-img" src="${meme.imgInfo.url}" alt="">
    </img> </div> `;
  });
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

// Menu
function toggleMenu() {
  document.body.classList.toggle("menu-open");
  document.querySelector(".second-nav").classList.toggle("flex");
}

function isMenuOpen() {
  return document.body.classList.length ? true : false;
}

// switch between pages
function switchPage(ev, pageName){
  if(ev && !isMenuOpen()) ev.stopPropagation();
  document.querySelector(`.${gCurrPage}`).classList.remove('active')
  if(pageName !== 'editor'){
    if(gCurrPage === 'editor') toggleEditor(false)
    gCurrPage = pageName;
    document.querySelector(`.${gCurrPage}`).classList.add('active')
  } else gCurrPage = pageName;

  upLoadPage();
}

// keywords
function setSizeKeywords(selector){
  var map = getKeywordMap()
  for (var keyword in map) {
    var elKey = document.querySelector(`[data-keyword="${keyword}"]`)
    elKey.style.fontSize = map[keyword] * 2 + 'px'
  }
  console.log('changes');
  if(selector === undefined) return 
  document.querySelector('[name="search-choice"]').value = selector
}