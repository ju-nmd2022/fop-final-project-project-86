
let bg;
let y = 0;
let snows = [];


function setup() {
  bg = loadImage('images/background2.png');
  createCanvas(1200, 700);
  
  }

//seed character 
function player1(){
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



}

//creating the snow
function createSnow() {
  const x = Math.random() * width;
  const y = Math.random() * height;
  const v = 0.2 + Math.random();
  return { x: x, y: y, velocity: v };
}

function drawSnow(snow) {
  push();
  translate(snow.x, snow.y);
  noStroke();
  fill(255, 255, 255, 290);
  ellipse(0, 0, 6);
  pop();
}

function updateSnow(snow) {
  snow.y = snow.y + snow.velocity;
}

for (let i = 0; i < 600; i++) {
  const snow = createSnow();
  snows.push(snow);
}



function draw(){
  background(bg);
  player1();
  // for (let snow of snows) {
  //   drawSnow(snow);
  //   updateSnow(snow);
  // }

}

 

  
  
  