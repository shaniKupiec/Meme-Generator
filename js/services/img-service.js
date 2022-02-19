"use strict";

var gKeywordSearchCountMap = { Funny: 12, Movie: 16, Politic: 2, Animel: 1,  Baby: 1, TV: 4};
var gImgs;
var gSavedMeme = [];
const SAVED_MEME_KEY = "savedMemeData";

function getSavedFromStorge(){ // called on Init
    gSavedMeme = loadFromStorage(SAVED_MEME_KEY);
    // console.log('loadFromStorage(SAVED_MEME_KEY)' , gSavedMeme);
    if (!gSavedMeme) gSavedMeme = [];
    // console.log('gSavedMeme' , gSavedMeme);
}

function getSavedMemes() {
  return gSavedMeme;
}

function createSavedMeme(fileName, imgInfo, memeInfo, txtBoxesInfo) {
  var savedMeme = {
    fileName,
    imgInfo,
    memeInfo,
    txtBoxesInfo
  };
  gSavedMeme.push(savedMeme);
  console.log('gSavedMeme',gSavedMeme);
  saveToStorage(SAVED_MEME_KEY, gSavedMeme);
}

function getImgs() {
  return gImgs;
}

function createImgs() {
  gImgs = [];
  gImgs.push(createImg(0, ["Funny", "Movie"]));
  gImgs.push(createImg(1, ["Funny", "Politic"]));
  gImgs.push(createImg(2, ["Funny", "Animel"]));
  gImgs.push(createImg(3, ["Funny", "Baby", 'Animel']));
  gImgs.push(createImg(4, ["Funny", "Animel"]));
  gImgs.push(createImg(5, ["Funny", "Baby"]));
  gImgs.push(createImg(6, ["Funny", "TV"]));
  gImgs.push(createImg(7, ["Funny", "Baby"]));
  gImgs.push(createImg(8, ["Funny", "Movie"]));
  gImgs.push(createImg(9, ["Funny", "Baby"]));
  gImgs.push(createImg(10, ["Funny", "Politic"]));
  gImgs.push(createImg(11, ["Funny", "TV"]));
  gImgs.push(createImg(12, ["Funny", "TV"]));
  gImgs.push(createImg(13, ["Funny", "Movie"]));
  gImgs.push(createImg(14, ["Funny", "Movie"]));
  gImgs.push(createImg(15, ["Funny", "Movie"]));
  gImgs.push(createImg(16, ["Funny", "Movie"]));
  gImgs.push(createImg(17, ["Funny", "Politic"]));
}

function createImg(imgIdx, keywords) {
  return {
    id: imgIdx,
    url: `img/img-gall/${imgIdx}.jpg`,
    keywords,
  };
}
