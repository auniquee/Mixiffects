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
    $(".buttons").append($(`<button onclick="stopSound()" id="stopbtn">Click to stop the sound</button>`))
    $(".buttons").append($(`<button onclick="speedUpSound()" id="speedupbtn">Click to speed up the sound</button>`))
    $(".buttons").append($(`<button onclick="slowDownSound()" id="slowdownbtn">Click to slow down the sound</button>`))
    $(".buttons").append($(`<button onclick="uploadSound()" id="uploadbtn">Click to upload the sound to the servers!</button>`))
    setupAudio()
}
function setupAudio(){
  audio = null;
  audio = new Audio(`uploads/temp/${filename}`);
}

function playSound() {
  audio.play();
}

function stopSound() {
  audio.pause();
  audio.currentTime = 0;
}
async function speedUpSound() {
  stopSound();
  await fetch(`/edit/py/${filename}&speedup&1.5`, {
    method: "POST"
  });
  setupAudio();
  displaySuccess();
}


async function slowDownSound() {
  stopSound();
  await fetch(`/edit/py/${filename}&slowdown&0.5`, {
    method: "POST"
  });
  setupAudio();
  displaySuccess();
}
function uploadSound() {
    
    window.location = `http://localhost:3000/uploadvideotodb/${filename}`;
}

function displaySuccess() {
  document.getElementById("success").style.display = "block"
  setTimeout(() => {
    document.getElementById("success").style.display = "none"
  }, 500);
}

// bug: filen går ej att stoppa om man speedar upp den när man ändrar den, felet är att jag gör en ny referens som är sound, så de som spelas är bara gamla som inte finns längre
// lösning, stoppa ljud innan man ladda upp med kraft.
// status: LÖST