


// x = 500;
// y = 125;


// function flower(x, y) {
//     push();
//     noStroke();
  
//     //petals
//     fill(252, 235, 61);
//     ellipse(x + 62, y, 15);
//     ellipse(x + 60, y - 10, 15);
//     ellipse(x + 48, y - 14, 15);
//     ellipse(x + 40, y - 6, 15);
//     ellipse(x + 55, y + 6, 15);
//     ellipse(x + 43, y + 5, 15);
//     //inner flower
//     fill(0, 0, 0);
//     ellipse(x + 50, y - 5, 12); 
//     //stem
    
//     strokeWeight(2);
//     stroke(163, 234, 65);
//     line(x + 49, y + 12, x + 50, y + 45);

// //     //left leaf
// //     translate(x + 45, y - 33); // Move the origin to the center of the canvas
// //     // Diagonal oval
// //     rotate(PI / 4); // Rotate by 45 degrees (in radians)
// //     fill(97, 181, 49); // Yellow color for the oval
// //     noStroke();
// //     ellipse(x, y, 20, 10); // Adjust the size of the oval by changing the values of 20 and 10
// //     pop();
    
    
   
// //  // Reset transformations
// //  resetMatrix();
 

// } 

// flower(50, 50);
// flower(150, 50);





let mainObjectX = 200;
let mainObjectY = 200;
let bulletX;
let bulletY;
let bulletSpeed = 5;
let invisibleObjectX = 150;
let invisibleObjectY = 150;
let invisibleObjectWidth = 100;
let invisibleObjectHeight = 100;
let isBulletActive = false;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  // Draw the invisible object
  noFill();
  stroke(0, 0, 0);
  rect(invisibleObjectX, invisibleObjectY, invisibleObjectWidth, invisibleObjectHeight);

  // Draw the main object
  fill(255, 0, 0); // Red color
  rect(mainObjectX, mainObjectY, 50, 50);

  // Check for collision between bullet and invisible object
  if (isBulletActive && checkCollision(bulletX, bulletY, 10, 10, invisibleObjectX, invisibleObjectY, invisibleObjectWidth, invisibleObjectHeight)) {
    // Bullet hit the invisible object
    invisibleObjectX = -100; // Move the invisible object off-screen
    isBulletActive = false; // Disable the bullet
  }

  // Move and draw the bullet if it is active
  if (isBulletActive) {
    bulletY -= bulletSpeed;
    fill(0, 0, 255); // Blue color
    ellipse(bulletX, bulletY, 10, 10);
  }

  // Update the position of the main object
  mainObjectX = mouseX;
  mainObjectY = mouseY;
}

function mousePressed() {
  // Shoot a bullet from the main object
  if (!isBulletActive) {
    bulletX = mainObjectX;
    bulletY = mainObjectY;
    isBulletActive = true;
  }
}

function checkCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
  // Check if two rectangles overlap
  if (
    x1 + w1 >= x2 &&
    x1 <= x2 + w2 &&
    y1 + h1 >= y2 &&
    y1 <= y2 + h2
  ) {
    return true;
  }
  return false;
}
