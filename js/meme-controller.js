'use strict'

function renderMeme(){
    var meme = getMeme();
}

function editMeme(imgIdx) {
    console.log('meme created', imgIdx);
    document.querySelector('.img-gallery').setAttribute("hidden", "");
    document.querySelector('.meme-editor').removeAttribute("hidden");
    createMeme(imgIdx);
}

function showGallery(){
    console.log('gallery');
}

function showMemes(){
    console.log('memes');
}

function showAbout(){
    console.log('modal about');
}

// gCanvas.addEventListener("mouseup", onUp);