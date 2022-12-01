/*

Screen->

0 Menu
1 Game Menu - Fill The Shape
2 Game Menu - Click The Dot
3 Game Menu - Track The Circle
4 Game Menu - Typing Reaction
5 Instructions
11 Game 1 - Trace The Letters
12 Game 2 - Click The Dot
13 Game 3 - Track The Circle
14 Game 4 - Typing Reaction
15 Game Over

*/

var Screen = 0; //keeps track of current screen
var prevScreen = 0; //keeps track of previous screen

let Game; //Object
var fail; //sound effect
var gameOva; //sound effect
var bg; //background img
var arrow;//arrow img

var CanWidth = 600; //canvas width
var CanHeight = 600; //canvas height

function preload() {
  fail = loadSound("Rip.mp3");
  gameOva = loadSound("gameOver.mp3");
  bg = loadImage("bg.jpg"); // Load the image
  arrow = loadImage("arrow.png");
}

function setup() {
  createCanvas(CanWidth, CanHeight);
  textFont("Impact");
  noLoop();
  menu();
}

function draw() {
  switch (Screen) {
    case 11:
      Game.draw();
      break;
    case 13:
      Game.draw();
      break;
  }
}

function changeScreen() {
  switch (Screen) {
    case 0:
      menu();
      break;
    case 1:
      gameMenus("Fill the Shape");
      break;
    case 2:
      gameMenus("Click the Dot");
      break;
    case 3:
      gameMenus("Track the Circle");
      break;
    case 4:
      gameMenus("Typing Reaction");
      break;
    case 5:
      instructions();
      break;
    case 11:
      Game = new traceTheShapes();
      Game.setup();
      break;
    case 12:
      Game = new clickTheDot();
      Game.setup();
      break;
    case 13:
      Game = new trackTheCircle();
      Game.setup();
      break;
    case 14:
      Game = new typingReaction();
      Game.setup();
      break;
    case 15:
      gameOver();
      break;
  }
}

function menu() {
  background(220);
  image(bg, 0, 0, height, width);
  
  textAlign(CENTER);
  textSize(48);
  fill("White");
  text("Stroke Recovery Game Hub", height / 2, width * 0.2);
  textAlign(LEFT);

  //Screen 1
  textSize(32);
  fill("White");
  rect(40, 200, 270, 70);
  fill("Black");
  text("Fill The Shape", 50, 250);

  //Screen 2
  textSize(32);
  fill("White");
  rect(40, 300, 270, 70);
  fill("Black");
  text("Click The Dot", 50, 350);

  //Screen 3
  textSize(32);
  fill("White");
  rect(40, 400, 270, 70);
  fill("Black");
  text("Track The Circle", 50, 450);

  //Screen 4
  textSize(32);
  fill("White");
  rect(40, 500, 270, 70);
  fill("Black");
  text("Typing Reaction", 50, 550);

  textAlign(CENTER);
}

function menuClickAction() {
  //checks if mouse is hovering over any game while clicking
  //outer if statement checks if mouse is between the bounding boxes of all games
  if (mouseX > 40 && mouseX < 310) {
    //inner if statement checks for each game
    if (mouseY > 200 && mouseY < 270) {
      updateScreen(1);
    } else if (mouseY > 300 && mouseY < 370) {
      updateScreen(2);
    } else if (mouseY > 400 && mouseY < 470) {
      updateScreen(3);
    } else if (mouseY > 500 && mouseY < 570) {
      updateScreen(4);
    }
  }
}

function mouseClicked() {
  switch (Screen) {
    case 0:
      menuClickAction();
      changeScreen();
      break;
    case 1:
      gameMenusClickAction();
      changeScreen();
      break;
    case 2:
      gameMenusClickAction();
      changeScreen();
      break;
    case 3:
      gameMenusClickAction();
      changeScreen();
      break;
    case 4:
      gameMenusClickAction();
      changeScreen();
      break;
    case 5:
      instructionsClickAction();
      changeScreen();
      break;
    case 12:
      Game.mouseClicked();
      break;
    case 15:
      gameOverClickAction();
      break;
  }
}

function gameMenus(GameName) {
  background(220);
  image(bg, 0, 0, height, width);

  textAlign(CENTER);
  textSize(48);
  fill("White");
  text(GameName, height / 2, width * 0.2);

  textAlign(LEFT);
  //Start Game
  textSize(32);
  fill("White");
  rect(40, 200, 270, 70);
  fill("Black");
  text("Start Game", 50, 250);

  //Instructions
  textSize(32);
  fill("White");
  rect(40, 300, 270, 70);
  fill("Black");
  text("Instructions", 50, 350);

  //Back to Menu
  textSize(32);
  fill("White");
  rect(40, 400, 270, 70);
  fill("Black");
  text("Back to Menu", 50, 450);

  textAlign(CENTER);
}

function gameMenusClickAction() {
  if (mouseX > 40 && mouseX < 310) {
    if (mouseY > 200 && mouseY < 270) {
      //starts different games based on which screen its on
      switch (Screen) {
        case 1:
          updateScreen(11);
          break;
        case 2:
          updateScreen(12);
          break;
        case 3:
          updateScreen(13);
          break;
        case 4:
          updateScreen(14);
          break;
      }

      changeScreen();
    } else if (mouseY > 300 && mouseY < 370) {
      //instructions
      updateScreen(5);
    } else if (mouseY > 400 && mouseY < 470) {
      updateScreen(0);
    }
  }
}

function instructions() {
  background(166, 190, 255);
  textSize(48);
  text("Instructions", 300, 100);

  var Instructions = "";

  switch (prevScreen) {
    case 1:
      Instructions = `The player has to fill the shape in that appears on the screen, while remaining in the borders of the shape. The accuracy meter at the end shows how accurately the shape was filled in.`;
      break;
    case 2:
      Instructions = `The player has to click the circles that will appear randomly on the screen. A miss click results in a strike. 3 strikes and the game is over.`;
      break;
    case 3:
      Instructions = `The player must keep the cursor inside the circle as it moves across the screen in random directions. Leaving the circle for more than 3 seconds ends the game.
`;
      break;
    case 4:
      Instructions = `The player has to type the letter that appears on the screen as soon as possible. An incorrect letter pressed earns a strike. 3 strikes ends the game`;
      break;
  }

  textAlign(LEFT);
  textSize(20);
  text(Instructions, 50, 170, 510);

  fill("White");
  rect(40, 500, 150, 60);
  textSize(32);
  fill("Black");
  text("Back", 50, 540);

  textAlign(CENTER);
}

function instructionsClickAction() {
  if (mouseX > 40 && mouseX < 190) {
    if (mouseY > 500 && mouseY < 560) {
      Screen = prevScreen;
    }
  }
}

function keyTyped() {
  switch (Screen) {
    case 14:
      Game.keyTyped();
  }
}

function updateScreen(Screen) {
  prevScreen = this.Screen;
  this.Screen = Screen;
}

function gameOver(score) {
  updateScreen(15);

  background(166, 190, 255);
  textSize(48);
  fill("Black");
  text("Game Over", 300, 170);
  gameOva.play();

  //Score
  textSize(20);
  text("Score : " + score, 300, 220);

  //Play Again
  textSize(32);
  fill("White");
  rect(160, 250, 280, 70);
  fill("Black");
  text("Play Again", 300, 295);

  //Back to Menu
  textSize(32);
  fill("White");
  rect(160, 350, 280, 70);
  fill("Black");
  text("Back to Menu", 300, 395);
}

function gameOverClickAction() {
  if (mouseX > 160 && mouseX < 440) {
    if (mouseY > 250 && mouseY < 320) {
      updateScreen(prevScreen);
      changeScreen();
    }
    if (mouseY > 350 && mouseY < 420) {
      updateScreen(0);
      changeScreen();
    }
    if (mouseY > 450 && mouseY < 520) {
      updateScreen(16);
      changeScreen();
    }
  }
}

//Game 1
class traceTheShapes {
  
  constructor(){
   this.squareSize = (int(random(25,151))) * 2;
    this.score="0.00%";
  }

setup() {
  background(166, 190, 255);
  fill("Black")
  textSize(30)
  text("Fill the square!",width/2,70)
  this.shapeGenerator();
  
  textSize(25);
  fill("White");
  rect(450, 525, 100, 50);
  fill("Black");
  text("Finish?", 502, 560);
  loop();
}

draw() {
  if(mouseX >= 100 && mouseX <= 500 && mouseY >= 100 && mouseY <= 500){
  if(mouseX >= 300 - (this.squareSize/2) && mouseX <= 300 + (this.squareSize/2) && mouseY >= 300 - (this.squareSize/2) && mouseY <= 300 + (this.squareSize/2)){
    fill("green");
  } else {
    fill("red");
  }
  if(mouseIsPressed){
  noStroke();
  circle(mouseX, mouseY, 20);
  }
}
  if(mouseX >= 450 && mouseX <= 550 && mouseY >= 525 && mouseY <= 575){
      if(mouseIsPressed){
        this.findar();
  }
    }
}
  findar(){
  stroke(0, 0, 0, 255);
  strokeWeight(1);
  let counterGreen = 0;
  let counterRed = 0;
  let counterWhite = 0;
  var greenTester = [0, 128, 0, 255];
  var redTester = [255, 0, 0, 255];
  var whiteTester = [255, 255, 255, 255];
  let tested;
  let totalCount;
  let calculatedAcc;
  
for(var y = 100; y < 501; y++){
    for(var x = 100; x < 501; x++){
       var index = (x + y * width)*4;
      tested = get(x,y);
      if(greenTester[0] == tested[0] && greenTester[1] == tested[1] && greenTester[2] == tested[2] && greenTester[3] == tested[3]){
        counterGreen++;
      }
      if(redTester[0] == tested[0] && redTester[1] == tested[1] && redTester[2] == tested[2] && greenTester[3] == tested[3]){
        counterRed++;
      }
      if(whiteTester[0] == tested[0] && whiteTester[1] == tested[1] && whiteTester[2] == tested[2] && whiteTester[3] == tested[3]){
        counterWhite++;
      }
      
    }   
  }
  console.log("Green Pixels Counted: " + counterGreen);
  console.log("Red Pixels Counted: " + counterRed);
  console.log("White Pixels Counted: " + counterWhite);
  totalCount = counterRed + counterGreen + counterWhite;
  calculatedAcc = (counterGreen/totalCount) * 100;
  console.log("Total Accuracy: " + calculatedAcc.toPrecision(4) + "%")
    this.score=calculatedAcc.toPrecision(4)+"%";
    noLoop();  
    gameOver(this.score);
}
shapeGenerator(){
  fill("White")
  square(300-(this.squareSize/2),300-(this.squareSize/2),this.squareSize);
}

}

//Game 2
class clickTheDot {
  constructor() {
    let randX;
    let randY;
    this.score = 0;
    this.strikes = 0;
    this.radius = 30;
  }

  setup() {
    // createCanvas(CanWidth, CanHeight);
    background(166, 190, 255);
    this.randX = random(100, 550);
    this.randY = random(100, 550);
    fill("White");
    circle(this.randX, this.randY, this.radius * 2);

    fill("Black");
    textSize(20);
    text("Score", 550, 20);
    text(this.score, 550, 40);
    text("Strikes", 480, 20);
    text(this.strikes, 480, 40);
  }

  mouseClicked() {
    if (
      sqrt(
        (mouseX - this.randX) * (mouseX - this.randX) +
          (mouseY - this.randY) * (mouseY - this.randY)
      ) < this.radius
    ) {
      this.score++;
      this.randomCoords();
      this.circleAndUpdateScore();
    } else {
      this.strikes++;
      this.circleAndUpdateScore();
      if (this.strikes > 2) {
        gameOver(this.score);
        return;
      }
      image(arrow, this.randX-this.radius+4, this.randY-this.radius*3, 50, 50);
      fail.play();
    }
  }

  randomCoords() {
    this.randX = random(this.radius * 2, width - this.radius * 2);
    this.randY = random(this.radius * 2, height - this.radius * 2);
  }

  circleAndUpdateScore() {
    background(166, 190, 255);
    fill("White");
    circle(this.randX, this.randY, this.radius * 2);

    fill("Black");
    textSize(20);
    text("Score", 550, 20);
    text(this.score, 550, 40);
    text("Strikes", 480, 20);
    text(this.strikes, 480, 40);
  }
}

//Game 3
class trackTheCircle {
  constructor() {
    this.xSpeed = 2;
    this.ySpeed = 2;
    this.circleX = 100;
    this.circleY = 200;
    this.countdown = 10;
    this.timer = 1; // its 1 to avoid complication for random movement
    this.seconds = 0;
    this.radius = 50;
  }
  setup() {
    loop();
  }
  draw() {
    background(166, 190, 255);

    textSize(20);
    fill("Black");
    text("Score", 550, 20);
    text(this.seconds, 550, 40);
    if (this.timer % 60 == 0) {
      this.seconds = this.timer / 60;
    }

    this.circleX = this.circleX + this.xSpeed;
    this.circleY = this.circleY + this.ySpeed;

    fill("blue");
    circle(this.circleX, this.circleY, this.radius * 2);

    if (this.timer % 300 == 0) {
      //every 5 seconds random direction
      this.xSpeed = random(-3, 3);
      this.ySpeed = random(-3, 3);
    }
    if (this.circleX < this.radius || this.circleX > width - this.radius) {
      this.xSpeed = this.xSpeed * -1;
    }

    if (this.circleY < this.radius || this.circleY > height - this.radius) {
      this.ySpeed = this.ySpeed * -1;
    }
    if (frameCount % 30 == 0 && this.countdown > 0) {
      this.countdown -= 0.5;
    }

    if (
      sqrt(
        (mouseX - this.circleX) * (mouseX - this.circleX) +
          (mouseY - this.circleY) * (mouseY - this.circleY)
      ) < this.radius
    ) {
      fill("green");
      circle(this.circleX, this.circleY, this.radius * 2);
      this.countdown = 3.5; //3.5 instead of 3 extra time for readability
      this.timer++;
    } else {
      fill("Black");
      text("Keep your cursor inside the circle!", 300, 20);
      text(Math.trunc(this.countdown), 300, 40);
    }

    if (this.countdown == 0) {
      noLoop();
      gameOver(this.seconds);
    }
  }
}

//Game 4
class typingReaction {
  constructor() {
    let randomLetter;
    let letter;
    this.score = 0;
    this.strikes = 0;
  }

  setup() {
    // createCanvas(CanWidth, CanHeight);
    background(166, 190, 255);
    this.randomLetter = random(1, 26);
    this.letter = String.fromCharCode(65 + this.randomLetter);

    textSize(50);
    text(this.letter, 290, 290, 100);

    textSize(20);
    text("Score", 550, 20);
    text(this.score, 550, 40);
    text("Strikes", 480, 20);
    text(this.strikes, 480, 40);
  }

  keyTyped() {
    if (key == String.fromCharCode(97 + this.randomLetter)) {
      this.score += 1;
      this.updateScore();
    } else {
      this.strikes++;
      if (this.strikes > 2) {
        gameOver(this.score);
        return;
      }
      fail.play();
      
      this.updateScore();
    }
  }

  updateScore() {
    background(166, 190, 255);
    textSize(20);
    text("Score", 550, 20);
    text(this.score, 550, 40);
    text("Strikes", 480, 20);
    text(this.strikes, 480, 40);
    this.changeLetter();
  }
  changeLetter() {
    this.randomLetter = Math.trunc(random(1, 26));
    this.letter = String.fromCharCode(65 + this.randomLetter);
    textSize(50);
    text(this.letter, random(20,400), random(20,400), 100);
  }
}
