$(document).ready( () => {
    //console.log('asdf'); //WORKING, remov dis line
    build();
})

function build() {
    setup();
}
let audio;
let filename = window.location.href.split('#')[1];
function setup() {
    $(".buttons").append($(`<button onclick="playSound()" id="playbtn">Click to play the sound</button>`))
    $(".buttons").append($(`<button onclick="speedUpSound()" id="speedupbtn">Click to speed up the sound</button>`))
    $(".buttons").append($(`<button onclick="slowDownSound()" id="slowdownbtn">Click to slow down the sound</button>`))
    $(".buttons").append($(`<button onclick="uploadSound()" id="uploadbtn">Click to upload the sound to the servers!</button>`))
    audio = new Audio(`uploads/temp/${filename}`);
}
function playSound() {
  
  audio.play();
}

function speedUpSound() {
  fetch(`/edit/py/${filename}&speedup&1.5`, {
    method: "POST"
  });
}
function slowDownSound() {

}
function uploadSound() {
    
    window.location = `http://localhost:3000/uploadvideotodb/${filename}`;
    
}