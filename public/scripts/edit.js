$(document).ready( () => {
    //console.log('asdf'); //WORKING, remov dis line
    build();
})
let sound;
function build() {
    //sound.play();

}

function preload() {
    soundFormats('wav');
    sound = loadSound(`uploads/temp/${ window.location.href.split('#')[1] }`);
}
function setup() {
    $(".buttons").append($(`<button onclick="playSound()" id="playbtn">Click to play the sound</button>`))
    $(".buttons").append($(`<button onclick="speedUpSound()" id="speedupbtn">Click to speed up the sound</button>`))
    $(".buttons").append($(`<button onclick="slowDownSound()" id="slowdownbtn">Click to slow down the sound</button>`))
    $(".buttons").append($(`<button onclick="uploadSound()" id="uploadbtn">Click to upload the sound to the servers!</button>`))
}
function playSound() {
    sound.play();
}
let rate = 1;
function speedUpSound() {
    rate += 0.5;
    sound.rate(rate);
}
function slowDownSound() {
    rate /= 1.5;
    sound.rate(rate);
}
function uploadSound() {
    sound.dispose();
    uploadSoundFile(sound.getBlob());
    //window.location = `http://localhost:3000/uploadvideotodb/${window.location.href.split('#')[1]}`;
    
}
async function uploadSoundFile(blob) {
    
    const formData = new FormData();
    formData.append("file", blob, window.location.href.split('#')[1] + ".wav");
    console.log("trying!")
    try {
      const response = await fetch("http://localhost:3000/savevideo", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        console.log("File uploaded successfully");
      } else {
        console.error("Upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }