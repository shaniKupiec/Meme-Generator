"use strict";

var gMeme;
// var gMeme = {
//   selectedImgId: 5,
//   selectedLineIdx: 0,
//   lines: [
//     {
//       txt: "I sometimes eat Falafel",
//       size: 20,
//       align: "left",
//     },
//     {
//       txt: "I sometimes eat Falafel",
//       size: 20,
//       align: "left",
//     },
//   ],
// };

function createMeme(imgIdx) {
  gMeme = {
    selectedImgId: imgIdx,
    selectedLineIdx: 0,
    lines: [],
  };
  //   console.log('createMeme');
}

function changeTxtMeme(key){
    var currLine = gMeme.selectedLineIdx
    // console.log(currLine);
    if(!gMeme.lines.length){ 
        onAddLineTxt()
        gMeme.selectedLineIdx;
        currLine;
    }
    gMeme.lines[currLine].txt = (key === "Backspace") ? gMeme.lines[currLine].txt.slice(0, -1) : gMeme.lines[currLine].txt += key;
    // console.log(gMeme.lines[currLine].txt);
}

function getCurrLine(){
    return gMeme.selectedLineIdx;
}

// function getMeme(){
//     return gMeme.lines[gMeme.selectedLineIdx];
// }

function getLinesInfo(){
    return gMeme.lines;
}

function setSelectedLine(lineIdx){
    gMeme.selectedImgId = lineIdx;
}

function addLine(){
    gMeme.lines.push(ceateLine())
}

function ceateLine() {
  return {
    txt: "",
    size: 40,
    align: "left",
    font: 'emoji'
  };
}

function getMeme() {
  return gMeme;
}
