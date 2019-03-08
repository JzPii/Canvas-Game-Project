let canvas;
let ctx;
let keysPressed = {};
//Square
let squareWide = 10;
let squareHigh = 10;
let squareX = 200;
let squareY = 200;

let bgReady, heroReady, monsterReady;
let bgImage, heroImage, monsterImage;

//Monster
let monsterHigh = 20;
let monsterWide = 20;
let monsterX = (moX + Math.floor(Math.random()*(500-monsterWide)))
let monsterY = (moY + Math.floor(Math.random()*(400-monsterHigh)))

let monsterCaught = 0



function setup() {
    
        // bgImage = new Image();
        // bgImage.onload = function () {
        //   // show the background image
        //   bgReady = true;
        // };
        // bgImage.src = "images/background.png";
        // heroImage = new Image();
        // heroImage.onload = function () {
        //   // show the hero image
        //   heroReady = true;
        // };
        // heroImage.src = "images/hero.png";
      
        // monsterImage = new Image();
        // monsterImage.onload = function () {
        //   // show the monster image
        //   monsterReady = true;
        // };
        // monsterImage.src = "images/monster.png";
    
        
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 400;
    
    document.body.appendChild(canvas);
    
    addEventListener("keydown", function(key) {
      keysPressed[key.keyCode] = true;
    });
    addEventListener("keyup", function(key) {
      delete keysPressed[key.keyCode];
    });
}

  function main() {
    update();
    render();
    requestAnimationFrame(main);
  }

function update() {
    // If right arrow is pressed, move 
    // the square to the right.
    if(keysPressed[39] == true) { // 39 is right key
      squareX += 5;
    } 
    if(keysPressed[40] == true) { // 40 is down key
      squareY += 5;
    }
    if(keysPressed[37] == true) { // 37 is left
      squareX -= 5;
    }
    if(keysPressed[38] == true) { //38 is up key
      squareY -= 5;
    }
    // squareX = Math.min(canvas.width - squareWide, squareX);
    // squareX = Math.max(0, squareX);
    // squareY = Math.min(canvas.height - squareHigh, squareY)
    // squareY = Math.max(0,squareY)
    if(squareX <= 0) {
        squareX = canvas.width - squareWide
    } if(squareX >= canvas.width) {
        squareX = 0;
    } if (squareY <= 0) {
        squareY = canvas.height - squareHigh
    } if (squareY >= canvas.height)
      { squareY = 0 }


    // Check if player and monster collided. Our images
  // are about 32 pixels big.
  if (
    squareX <= (monsterX + monsterWide)
    && monsterX <= (squareX + monsterWide)
    && squareY <= (monsterY + monsterHigh)
    && monsterY <= (squareY + squareHigh)
  ) {
    // Pick a new location for the monster.
    // Note: Change this to place the monster at a new, random location.
    monsterX = Math.floor(Math.random()*(500-monsterWide))
    monsterY = Math.floor(Math.random()*(400-monsterHigh))
    monsterCaught = monsterCaught + 1;
    squareWide = squareWide + 10;
    }
}

function render() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#FF0000";
    ctx.fillRect(monsterX, monsterY, monsterWide, monsterHigh);

    ctx.fillStyle = "#000000";
    ctx.fillRect(squareX, squareY, squareWide, squareHigh);
    // if (bgReady) {
        // ctx.drawImage(bgImage, );
    //   }
    //   if (heroReady) {
    //     ctx.drawImage(heroImage, heroX, heroY);
    //   }
    //   if (monsterReady) {
    //     ctx.drawImage(monsterImage, monsterX, monsterY);
    //   }
    
    // this is for nothing just to see if the button is worked
ctx.fillText("squareX: " + squareX, 10, 30);
ctx.fillText("squareY: " + squareY, 80, 30);
ctx.fillText("monsterX: " + monsterX, 10, 50);
ctx.fillText("monsterY: " + monsterY, 80, 50);
ctx.fillText("You got: " + monsterCaught, 10, 80);

  }
setup();
main();