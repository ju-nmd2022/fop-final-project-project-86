function setup() {
  createCanvas(1200, 700);

  // Create the button
// Create the button
button = createButton("");
button.position(770, 560);
button.size(280, 95); 
button.mousePressed(goToLevel1);
button.style("background-color", "transparent");
button.style("border", "none");
}


function preload() {
  backgroundImage = loadImage('./images/start-screen.png'); // Load the background image
}


function draw() {
  background(backgroundImage);
}

// Function to handle button click
function goToLevel1() {
  window.location.href = "./PreLevel1/prelevel1.html"; // Redirect
}

