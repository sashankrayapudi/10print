
let offset = 50;
let tileStep = (innerHeight - offset) / 6;
let startSize = tileStep;
let degreeDirections = [ -1,-2,-3]  //the degree to which in inner circles move
let innerDirections = [ -1, 1] //the direction in which in the inner circles move

const COLORS = [[238, 66, 102], [31, 64, 104], [242, 228, 181]]; // pinkish/red, navy, beige


function setup() {
  createCanvas(innerWidth, innerHeight);
  background(0);
  stroke(0, 32, 63);
  strokeWeight(4)
  noLoop();
}


//recursive function for inner circles
drawCircle = (x, y, diameter, xMovement, yMovement, steps,
              direction) => {

  let random_index = Math.floor(Math.random() * COLORS.length);
  const [r, g, b] = COLORS[random_index];
  //const [r, g, b] = COLORS[random_index];
  fill(r, g, b);
  circle(x, y, diameter); 
  
  //base case
  if(steps >= 0) { 
    let newSize = (startSize) * (steps / startSteps); 
    let Xdir;
    let Ydir;
      if(direction == 1){                     //statement that determines if circles will go left/up or right/down
        Xdir = x - (diameter - newSize) / 2
        Ydir = y - (diameter - newSize) / 2
      } else {
        Xdir = x + (diameter - newSize) / 2
        Ydir = y + (diameter - newSize) / 2
      }
      Xdir = Xdir - ((x - Xdir) / (steps + 2)) * xMovement   //xMovement and yMovement determine the degree to which the circles move left/up or right/down
      Ydir = Ydir - ((y - Ydir) / (steps + 2)) * yMovement 

    drawCircle(Xdir, Ydir, newSize, xMovement, yMovement, steps - 1, direction);
  }
  
}


function draw(){  
  setTimeout(draw,2500)
    
  for( let x = offset; x < innerWidth ; x += tileStep) {
    for( var y = offset; y < innerHeight ; y += tileStep) {
      startSteps = 2 + Math.ceil(Math.random() * 3)   //2 inner circles is the default, and 1-3 inner circlesare added for some variance
      let xDirection = degreeDirections[Math.floor(Math.random() * degreeDirections.length)];
      let yDirection = degreeDirections[Math.floor(Math.random() * degreeDirections.length)];
      let direction = innerDirections[Math.floor(Math.random() * innerDirections.length)];
      drawCircle(x, y, startSize, xDirection, yDirection, startSteps - 1, direction)
    }
  }
}



