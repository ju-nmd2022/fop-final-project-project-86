
function setup() {
  createCanvas(1200, 700);
  startTime = millis(); // Store the start time
  // imageMode(CENTER);
}  

//game control
let stage = 0; //keeps track of function run

let backgroundImage;
let player1Image;
let player2Image;

//player1
let p1X = 50;
let p1Y = 200;
let pWidth = 90;
let pHeight = 150;
let pSpeed = 3;

//player
let p2X = 50;  
let p2Y = 300; 
let p2Width = 90;
let p2Height = 150;
let p2Speed = 3;

//seed
let seed1X = p1X;
let seed1Y = p1Y;
let seed1Position = 0; //keeping track of where the seed is at the moment
let seedWidth = 50;
let seedHeight = 80;
let seedSpeed = 5;
let fire = false; //am i firing the seed?

//water droplets
let waterX = p2X;
let waterY = p2Y;
let waterPosition = 0; //keeping track of where the seed is at the moment
let waterWidth = 15;
let waterHeight = 20;
let waterSpeed = 5;
let fire2 = false; //am i firing the seed?



//ground hole
let g1X = 500;
let g1Y = 180;
let g1hit = false;
let gWidth = 40;
let gHeight = 40;

//hole with seed
let hole1X = 500;
let hole1Y = 180;
let holeWidth = 40;
let holeHeight = 40;


//hole with water droplets
let flower2B = 450;
let flower2C = 180;
let flowerWidth = 40;
let flowerHeight = 40; 



 
let groundArray = [{
    x: 900, y: 320, hit: false 
}, {x: 1150, y: 380, hit: false
}, {x: 1020, y: 470, hit: false
}, {x: 900, y: 670, hit: false
}, {x: 1030, y: 580, hit: false
}, {x: 850, y: 540,  hit: false
}
]; 

let flowerGroundArray = [{
  x: 900, y: 320, hit: false 
}, {x: 1150, y: 380, hit: false
}, {x: 1020, y: 470, hit: false
}, {x: 900, y: 670, hit: false
}, {x: 1030, y: 580, hit: false
}, {x: 850, y: 540,  hit: false
}
];




let startTime; // Variable to store the start time
let elapsedTime = 0; // Variable to store the elapsed time





  //LEVEL 2
  function game() {

  //player1 - seed character  
  
     
  //player2 - water character



   //draw player1
   push();
   noStroke();
   fill(128, 36, 66);
  //  ellipse(p1X, p1Y, pWidth, pHeight);
   image(player1Image, p1X, p1Y, pWidth, pHeight);
   pop();

  
    //draw player2
    push();
    noStroke();
    fill(8, 6, 226);
    // ellipse(p2X, p2Y, p2Width, p2Height);
    image(player2Image, p2X, p2Y, p2Width, p2Height);
    pop();


   //activate the seed function
   seeds();
   water(); 

    //collisions between seed and ground gap
    for (let i = 0; i < 6; i++) {
      noStroke();
      fill(154, 109, 44);
      ellipse(groundArray[i].x, groundArray[i].y, gHeight, gWidth);
      if (dist(seed1X, seed1Y, groundArray[i].x, groundArray[i].y) <= 1200) {
          groundArray[i].hit = true;
          seed1Position = 2;
      }
      if (groundArray[i].hit) {
          hole(groundArray[i].x, groundArray[i].y);
      }
  }
  
  for (let i = 0; i < 6; i++) {
      noStroke();
      fill(154, 109, 44);
      ellipse(flowerGroundArray[i].x, flowerGroundArray[i].y, gHeight, gWidth);
      if (dist(waterX, waterY, flowerGroundArray[i].x, flowerGroundArray[i].y) <= 1200 && groundArray[i].hit) {
        flowerGroundArray[i].hit = true;
          waterPosition = 3;
      }
  }
  //the following part of the code was aided by Chatgpt
  for (let i = 0; i < 6; i++) {
      if (groundArray[i].hit) {
          hole(groundArray[i].x, groundArray[i].y);
      }
      if (flowerGroundArray[i].hit) {
        flower(flowerGroundArray[i].x, flowerGroundArray[i].y);
      }
  }

  // Calculate the elapsed time
  elapsedTime = millis() - startTime;

  // Check if 30 seconds have passed 
  if (elapsedTime >= 50000) {
    window.location.href = "../LoseLevel2/lose2.html"; 
  }

  
  }


function draw(){


  background(backgroundImage);

  //game stage
  game();

    //call looping functions
    keyPressedChecked();
    keyTyped();
    

   
  // Display the timer
  let remainingTime = 50 - Math.floor(elapsedTime / 1000); // Calculate remaining time in seconds
  
  push();
  fill(255,0,0);
  rect(495, 5, 90, 40); 
  fill(0);
  textSize(20);
  text("Time: " + remainingTime, 500, 30);
  pop();
  
}  

  //   for (let i = 0; i < 6; i++) {
  //     noStroke();
  //     fill(0, 0, 0);
  //     ellipse(groundArray[i].x, groundArray[i].y, gHeight, gWidth);
  //     if (dist(seed1X, seed1Y, groundArray[i].x, groundArray[i].y) <= 40) {
  //         groundArray[i].hit = true;
  //         seed1Position = 2;
  //     }
  //     if (groundArray[i].hit) {
  //         hole(groundArray[i].x, groundArray[i].y);
  //     }
  // }
  
//   for (let i = 0; i < 6; i++) {
//       noStroke();
//       fill(0, 0, 0);
//       ellipse(waterGroundArray[i].x, waterGroundArray[i].y, gHeight, gWidth);
//       if (dist(waterX, waterY, waterGroundArray[i].x, waterGroundArray[i].y) <= 40) {
//           waterGroundArray[i].hit = true;
//           waterPosition = 3;
//       }
//   }
  
//   for (let i = 0; i < 6; i++) {
//       if (groundArray[i].hit) {
//           hole(groundArray[i].x, groundArray[i].y);
//       }
//       if (waterGroundArray[i].hit) {
//           waterHole(waterGroundArray[i].x, waterGroundArray[i].y);
//       }
//   }

// }


function hole(x, y){
//draw hole with seed
noStroke();
fill(154, 109, 44);
ellipse(x, y, holeHeight, holeWidth);
fill(110, 77, 30);
ellipse(x, y, 18, 10);
} 

function flower(b, c){
  //draw hole with waterdroplets
  push();
  noStroke();
  fill(99, 68, 14);
  
  fill(99, 68, 14);
  ellipse(b, c, 20);
  
  push();
  noStroke();

  //petals
  fill(252, 235, 61);
  ellipse(b + 62, c, 15);
  ellipse(b + 60, c - 10, 15);
  ellipse(b + 48, c - 14, 15);
  ellipse(b + 40, c - 6, 15);
  ellipse(b + 55, c + 6, 15);
  ellipse(b + 43, c + 5, 15);
  //inner flower
  fill(0, 0, 0);
  ellipse(b + 50, c - 5, 12); 
  //stem
  
  strokeWeight(2);
  stroke(163, 234, 65);
  line(b + 49, c + 12, b + 50, c + 45);
  }  



function seeds(){
//seed positions
    //0 = with player1 ready to be fired
    //1 = in motion after firing
    //2 = collision with object, return to p1
    


//draw seed   
noStroke();
fill(110, 77, 30);
ellipse(seed1X, seed1Y, seedWidth, seedHeight);  

//keep track and fire the seeds
  if(fire === true && seed1Position === 0){
    seed1Position = 1;
  }
//fire seeds code
  if(seed1Position === 1){
    seed1Y = seed1Y; //stops following p1
    seed1X = seed1X + seedSpeed; //moves horizontally

    //if it misses
    if(seed1X >= 500){
        seed1Position = 2; //reload
    }

  }
  else{
    //when you are not firing, the seed should be with p1
    seed1Y = p1Y;
    seed1X = p1X;
    
  }

//reload on #2 command
  if(seed1Position === 2){
    seed1Y = p1Y;
    seed1X = p1X;
    seed1Position = 0;//reset so you can fire again
  } 
  
}


function water(){
  //seed positions
      //0 = with player1 ready to be fired
      //1 = in motion after firing
      //3 = collision with object, return to p2
      
  
  //draw water   
  noStroke();
  fill(81, 213, 242);
  ellipse(waterX, waterY, waterWidth, waterHeight);  
  
  //keep track and fire the seeds
    if(fire2 === true && waterPosition === 0){
      waterPosition = 1;
    }
  //fire seeds code
    if(waterPosition === 1){
      waterY = waterY; //stops following p1
      waterX = waterX + waterSpeed; //moves horizontally
  
      //if it misses
      if(waterX >= 500){
        waterPosition = 3; //reload
      }
  
    }
    else{
      //when you are not firing, the droplet should be with p1
      waterY = p2Y;
      waterX = p2X;
      
    }
  
  //reload on #2 command
    if(waterPosition === 3){
      waterY = p2Y;
      waterX = p2X;
      waterPosition = 0;//reset so you can fire again
    } 
    
  }


//make the player1 and player2 move up and down
function keyPressedChecked(){
    
    if(keyIsDown(UP_ARROW)){ //player1 moving only when the key is pressed
        p1Y = p1Y - pSpeed;
    }

    if(keyIsDown(DOWN_ARROW)){ //player1 moving only when the key is pressed
        p1Y = p1Y + pSpeed;
    } 

    if(keyCode === (87) && keyIsPressed){ //player2 moving only when the key is pressed
        p2Y = p2Y - p2Speed;
    }

    if(keyCode === (83)&& keyIsPressed){ //player2 moving only when the key is pressed
        p2Y = p2Y + p2Speed;
    } 

}

function keyTyped(){

    if(key === 'p' && keyIsPressed){
        fire = true; //seed will be fired on key press
    }
    else{
        fire = false;
    }

    if(key === 'e' && keyIsPressed) {

      console.log("shoot");
        fire2 = true; //water will be fired on key press
    }
    else{
        fire2 = false;
    }
}


function preload() {
  backgroundImage = loadImage("../images/level2-screen.png"); // Load the background image
  player1Image = loadImage("../images/player1Right.png");
  player2Image = loadImage("../images/player2Right.png");
}



//codes inspired by https://www.youtube.com/watch?v=NFIUnssR65g&list=PLBDInqUM5B25FzygoJ9Ifg1TZXmIHz4zh&index=3