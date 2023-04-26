function setup() {
    createCanvas(500, 600);
  }  


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


let seed1 = 50;
let seed2 = 50;




// let c = 50;
// let d = 200;


function seeds(c, d) {
    push();
    noStroke();
    fill(198, 136, 66);
    ellipse(c, d, 20, 10);
    pop();
}



  function draw() {
    background(255, 255, 255);

    //draw player2
    push();
    noStroke();
    fill(128, 36, 66);
    ellipse(p1X, p1Y, pWidth, pHeight);

     //draw player2
     noStroke();
     fill(8, 6, 226);
     ellipse(p2X, p2Y, p2Width, p2Height);
     pop();


     seeds(seed1, 200);
     seeds(seed2, 300);
    

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