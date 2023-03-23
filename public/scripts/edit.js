$.noConflict();


jQuery(document).ready( () => {
    console.log('asdf');
    build();
})
let sound;
function build() {
    sound.play();

}

function preload() {
    soundFormats('wav');
    sound = loadSound(`uploads/temp/${ window.location.href.split('#')[1] }`);
}
function setup() {
    
}
