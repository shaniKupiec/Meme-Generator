"use strict";

var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 };
var gImgs;
// [{ id: 1, url: "img/1.jpg", keywords: ["funny", "cat"] }];

function getImgs(){
    return gImgs;
}

function createImgs(){
    gImgs = [];
    gImgs.push(createImg(1, ["funny", "cat"]))
    gImgs.push(createImg(2, ["funny", "cat"]))
    gImgs.push(createImg(3, ["funny", "cat"]))
    gImgs.push(createImg(4, ["funny", "cat"]))
    gImgs.push(createImg(5, ["funny", "cat"]))
    gImgs.push(createImg(6, ["funny", "cat"]))
    gImgs.push(createImg(7, ["funny", "cat"]))
    gImgs.push(createImg(8, ["funny", "cat"]))
    gImgs.push(createImg(9, ["funny", "cat"]))
    gImgs.push(createImg(10, ["funny", "cat"]))
    gImgs.push(createImg(11, ["funny", "cat"]))
    gImgs.push(createImg(12, ["funny", "cat"]))
    gImgs.push(createImg(13, ["funny", "cat"]))
    gImgs.push(createImg(14, ["funny", "cat"]))
    gImgs.push(createImg(15, ["funny", "cat"]))
    gImgs.push(createImg(16, ["funny", "cat"]))
    gImgs.push(createImg(17, ["funny", "cat"]))
    gImgs.push(createImg(18, ["funny", "cat"]))
}

function createImg(imgIdx, keywords){
    return {
        id: imgIdx,
        url: `img/img-gall/${imgIdx}.jpg`,
        keywords
    }
}

// function getImgIdx(imgIdx){
//     return gImgs[imgIdx-1];
// }