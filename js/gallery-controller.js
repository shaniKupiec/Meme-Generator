"use strict";

function init(){
    console.log('hi');
    createImgs();
    renderGallery();
}

function renderGallery(){
    var imgs = getImgs();
    var str = imgs.map( (img, index) =>
    `<img data-img="${index + 1}" onclick="startEditMeme(${index + 1})" src="${img.url}" alt=""></img>`
    );
    document.querySelector('.grid-container').innerHTML = str.join('');
}