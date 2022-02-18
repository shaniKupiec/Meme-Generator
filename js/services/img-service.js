"use strict";

var gKeywordSearchCountMap = { funny: 12, movie: 16, politic: 2, animel: 1,  baby: 1, sport: 4};
var gImgs;
var gSavedMeme = [];
const SAVED_MEME_KEY = "savedMemeData";

function getSavedFromStorge(){ // called on Init
    gSavedMeme = loadFromStorage(SAVED_MEME_KEY);
    console.log('loadFromStorage(SAVED_MEME_KEY)' , gSavedMeme);
    if (!gSavedMeme) gSavedMeme = [];
    console.log('gSavedMeme' , gSavedMeme);
}

function getSavedMemes() {
  return gSavedMeme;
}

function createSavedMeme(fileName, memeInfo, txtBoxesInfo) {
  var savedMeme = {
    fileName,
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
  gImgs.push(createImg(0, ["funny", "movie"]));
  gImgs.push(createImg(1, ["funny", "politic"]));
  gImgs.push(createImg(2, ["funny", "animel"]));
  gImgs.push(createImg(3, ["funny", "baby", 'animel']));
  gImgs.push(createImg(4, ["funny", "animel"]));
  gImgs.push(createImg(5, ["funny", "baby"]));
  gImgs.push(createImg(6, ["funny", "movie"]));
  gImgs.push(createImg(7, ["funny", "baby"]));
  gImgs.push(createImg(8, ["funny", "movie"]));
  gImgs.push(createImg(9, ["funny", "baby"]));
  gImgs.push(createImg(10, ["funny", "politic"]));
  gImgs.push(createImg(11, ["funny", "sport"]));
  gImgs.push(createImg(12, ["funny", "movie"]));
  gImgs.push(createImg(13, ["funny", "movie"]));
  gImgs.push(createImg(14, ["funny", "movie"]));
  gImgs.push(createImg(15, ["funny", "movie"]));
  gImgs.push(createImg(16, ["funny", "movie"]));
  gImgs.push(createImg(17, ["funny", "politic"]));
}

function createImg(imgIdx, keywords) {
  return {
    id: imgIdx,
    url: `img/img-gall/${imgIdx}.jpg`,
    keywords,
  };
}
