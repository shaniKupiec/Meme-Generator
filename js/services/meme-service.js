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

function setLineTxt(){
    
}

function createMeme(imgIdx){
    gMeme = {
        selectedImgId: imgIdx,   
    };
}

function getMeme(){
    return gMeme;
}
