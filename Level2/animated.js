


x = 500;
y = 125;


function flower(x, y) {
    push();
    noStroke();
  
    //petals
    fill(252, 235, 61);
    ellipse(x + 62, y, 15);
    ellipse(x + 60, y - 10, 15);
    ellipse(x + 48, y - 14, 15);
    ellipse(x + 40, y - 6, 15);
    ellipse(x + 55, y + 6, 15);
    ellipse(x + 43, y + 5, 15);
    //inner flower
    fill(0, 0, 0);
    ellipse(x + 50, y - 5, 12); 
    //stem
    
    strokeWeight(2);
    stroke(163, 234, 65);
    line(x + 49, y + 12, x + 50, y + 45);

//     //left leaf
//     translate(x + 45, y - 33); // Move the origin to the center of the canvas
//     // Diagonal oval
//     rotate(PI / 4); // Rotate by 45 degrees (in radians)
//     fill(97, 181, 49); // Yellow color for the oval
//     noStroke();
//     ellipse(x, y, 20, 10); // Adjust the size of the oval by changing the values of 20 and 10
//     pop();
    
    
   
//  // Reset transformations
//  resetMatrix();
 

} 

flower(50, 50);
flower(150, 50);





  