function setup() {
    createCanvas(1200, 700);

    // Create the button
    button = createButton("");
    button.position(925, 560);
    button.size(240, 95); 
    button.mousePressed(goToLevel1);
    button.style("background-color", "transparent");
    //button.style("border", "none");
}


function preload() {
    backgroundImage = loadImage('../images/winningScreen.png'); // Load the background image
  }


function draw() {
    background(backgroundImage);
 }

 // Function to handle button click
function goToLevel1() {
    window.location.href = "../index.html"; // Redirect to the start
  }