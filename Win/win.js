function setup() {
    createCanvas(1200, 700);

    // Create the button
  button = createButton("Click here to play again");
  button.position(500, 650);
  button.mousePressed(goToLevel1);
}


function preload() {
    backgroundImage = loadImage('../images/winningScreen.png'); // Load the background image
  }


function draw() {
    background(backgroundImage);
 }

 // Function to handle button click
function goToLevel1() {
    window.location.href = "../index.html"; // Redirect to level1.html
  }