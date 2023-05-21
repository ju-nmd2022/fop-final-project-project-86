function setup() {
    createCanvas(1200, 700);

    // Create the button
  button = createButton("Click here to try again");
  button.position(500, 500);
  button.mousePressed(goToLevel1);
}


function preload() {
    backgroundImage = loadImage('../images/lose-screen.png'); // Load the background image
  }


function draw() {
    background(backgroundImage);
 }

 // Function to handle button click
function goToLevel1() {
    window.location.href = "../Level2/level2.html"; // Redirect to level1.html
  }