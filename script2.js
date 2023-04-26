//player1
let p1X = 50;
let p1Y = 200;
let pWidth = 50;
let pHeight = 50;
let pSpeed = 3;

//player
let p2X = 50;
let p2Y = 300;
let p2Width = 50;
let p2Height = 50;
let p2Speed = 3;

//seed
let seed1X = p1X + p2X;
let seed1Y = p1Y + p2Y;
let seed1Position = 0; //keeping track of where the seed is at the moment
let seedWidth = 18;
let seedHeight = 10;
let seedSpeed = 5;
let fire = false; //am i firing the seed?




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

let groundArray = [{
    x: 450, y: 180, hit: false 
}, {x: 300, y: 100, hit: false
}, {x: 280, y: 220, hit: false
}, {x: 320, y: 355, hit: false
}, {x: 340, y: 280, hit: false
}, {x: 430, y: 30, hit: false
}
];

function setup() {
    createCanvas(500, 600);
  }  




function draw(){
    //call looping functions
    keyPressed();
    keyTyped();
     

    background(255, 255, 255);


    //draw player2
    noStroke();
    fill(128, 36, 66);
    ellipse(p1X, p1Y, pWidth, pHeight);

     //draw player2
     noStroke();
     fill(8, 6, 226);
     ellipse(p2X, p2Y, p2Width, p2Height);


    //activate the seed function
    seeds(); 


    //collisions between seed and ground gap
    for (let i = 0; i < 6; i++) {
        noStroke();
        fill(0, 0, 0);
        ellipse(groundArray[i].x, groundArray[i].y, gHeight, gWidth);
        if (dist(seed1X, seed1Y, groundArray[i].x, groundArray[i].y) <= 40) {
            groundArray[i].hit = true;
            seed1Position = 2;
        }      
        if (groundArray[i].hit) {
           hole(groundArray[i].x, groundArray[i].y);
        } 
    }

}


function hole(x, y){
//draw hole with seed
noStroke();
fill(0, 0, 0);
ellipse(x, y, holeHeight, holeWidth);
fill(128, 36, 66);
ellipse(x, y, 18, 10);
} 


function seeds(){
//seed positions
    //0 = with player1 ready to be fired
    //1 = in motion after firing
    //2 = collision with object, return to p1
    

//draw seed   
noStroke();
fill(198, 136, 66);
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


//make the player1 move up and down
function keyPressed(){
    
    if(keyCode === UP_ARROW && keyIsPressed){ //player1 moving only when the key is pressed
        p1Y = p1Y - pSpeed;
    }

    if(keyCode === DOWN_ARROW && keyIsPressed){ //player1 moving only when the key is pressed
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

    if(key === 'e' && keyIsPressed){
        fire = true; //seed will be fired on key press
    }
    else{
        fire = false;
    }
}




//codes inspired by https://www.youtube.com/watch?v=NFIUnssR65g&list=PLBDInqUM5B25FzygoJ9Ifg1TZXmIHz4zh&index=3