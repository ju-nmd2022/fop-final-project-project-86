function setup() {
    createCanvas(1200, 700);

    // Create the button
  button = createButton("");
  button.position(865, 540);
  button.size(280, 95); 
  button.mousePressed(goToLevel1);
  button.style("background-color", "transparent");
  button.style("border", "none");
}


function preload() {
    backgroundImage = loadImage('../images/level2StartScreen.png'); // Load the background image
  }


function draw() {
    background(backgroundImage);
 }

 // Function to handle button click
function goToLevel1() {
    window.location.href = "../Level2/level2.html"; // Redirect to level1.html
  }