function setup() {
  createCanvas(1200, 700);
}

//seed character
function player1(player1X, player1Y) {
  push();
  translate(player1X, player1Y);

  //head
  noStroke();
  fill(198, 136, 66);
  ellipse(200, 240, 30, 35);

  //eyes
  stroke(51, 164, 164);
  fill(66, 198, 198);
  ellipse(193, 240, 5, 6);
  fill(0, 0, 0);
  ellipse(193, 240, 3);
  stroke(51, 164, 164);
  fill(66, 198, 198);
  ellipse(208, 240, 5, 6);
  fill(0, 0, 0);
  ellipse(208, 240, 3);

  pop();
}

//water character
function player2(player2X, player2Y) {
  push();
  translate(player2X, player2Y);

  fill(0, 0, 255);
  ellipse(0, 0, 20, 50);

  pop();
}

//creating the snow
// function createSnow() {
//   const x = Math.random() * width;
//   const y = Math.random() * height;
//   const v = 0.2 + Math.random();
//   return { x: x, y: y, velocity: v };
// }

// function drawSnow(snow) {
//   push();
//   translate(snow.x, snow.y);
//   noStroke();
//   fill(255, 255, 255, 290);
//   ellipse(0, 0, 6);
//   pop();
// }

// function updateSnow(snow) {
//   snow.y = snow.y + snow.velocity;
// }

// for (let i = 0; i < 600; i++) {
//   const snow = createSnow();
//   snows.push(snow);
// }

//VARIABLES
let y = 0;
let snows = [];
//player1
let player1X = -150;
let player1Y = -150;
//player2
let player2X = 100;
let player2Y = 100;

function draw() {
  player1(player1X, player1Y);
  player2(player2X, player2Y);
  //   for (let snow of snows) {
  //     drawSnow(snow);
  //     updateSnow(snow);
  //   }
}
