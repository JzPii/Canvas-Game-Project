let canvas;
let ctx;
let keysPressed = {};
let bgReady, heroReady, monsterReady1, monsterReady2, monsterReady3, monsterReady4;
let bgImage, heroImage, monsterImage1, monsterImage2, monsterImage3, monsterImage4;
//Square
let heroWide = 62;
let heroHigh = 62;
let heroX = 200;
let heroY = 200;


//Monster
let monsterHigh = 120;
let monsterWide = 120;
let monsterX = Math.floor(Math.random()*(1200-monsterWide));
let monsterY = Math.floor(Math.random()*(800-monsterHigh));
let monsterXdir = 1;
let monsterYdir = 1


let monsterCaught = 0


let startTime = Date.now();
const SECONDS_PER_ROUND = 20;
let elapsedTime = 0;


function setup() {
    
        bgImage = new Image();
        bgImage.onload = function () {
          // show the background image
          bgReady = true;
        };
        bgImage.src = "images/background2.jpg";

        //All the hero images
        heroImage = new Image(20,20);
        heroImage.onload = function () {
          // show the hero image
          heroReady = true;
        };
        heroImage.src = "images/hero1.png";
      

        //
        // ALL the monster Img
        monsterImage1 = new Image(20,20);
        monsterImage1.onload = function () {
          monsterReady1 = false;
        };
        monsterImage1.src = "images/monster1.png";


        monsterImage2 = new Image(20,20);
        monsterImage2.onload = function () {
          monsterReady = false;
        };
        monsterImage2.src = "images/monster2.png";

        monsterImage3 = new Image(20,20);
        monsterImage3.onload = function () {
          monsterReady3 = false;
        };
        monsterImage3.src = "images/monster3.png";

        monsterImage4 = new Image(20,20);
        monsterImage4.onload = function () {
          monsterReady4 = false;
        };
        monsterImage4.src = "images/monster4.png";


        

    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = 1500;
    canvas.height = 800;
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
  // Update the time.
  elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    // If right arrow is pressed, move 
    // the square to the right.
    if(keysPressed[39] == true) { // 39 is right key
      heroX += 5;
    } if(keysPressed[40] == true) { // 40 is down key
      heroY += 5;
    } if(keysPressed[37] == true) { // 37 is left
      heroX -= 5;
    } if(keysPressed[38] == true) { //38 is up key
      heroY -= 5;
    }

    //trying to do the pause
    // if (keysPressed == 32) pauseGame();
    // function pauseGame() {
    //   if (!gamePaused) {
    //     game = clearTimeout(game);
    //     gamePaused = true;
    //   } else if (gamePaused) {
    //     game = setTimeout(gameLoop, 1000 / 30);
    //     gamePaused = false;
    //     }
    //   }

    //this one is to 4 walls block
    // heroX = Math.min(1200 - heroWide, heroX);
    // heroX = Math.max(0, heroX);
    // heroY = Math.min(canvas.height - heroHigh, heroY)
    // heroY = Math.max(0,heroY)

    //this is for walk thru walls
    if(heroX <= 0) {
        heroX = 1200 - heroWide
    } if(heroX >= 1160) {
        heroX = 0;
    } if (heroY <= 0) {
        heroY = canvas.height - heroHigh
    } if (heroY >= canvas.height)
      { heroY = 0 }

    if ((monsterCaught == 0 || (monsterCaught - 2) == 0)) {(monsterReady1 = true);(monsterReady2 = false);(monsterReady3 = false);(monsterReady4 = false) };

    // Check if player and monster collided. Our images
  // are about 32 pixels big.
  if (
    heroX <= (monsterX + monsterWide)
    && monsterX <= (heroX + heroWide)
    && heroY <= (monsterY + monsterHigh)
    && monsterY <= (heroY + heroHigh)
  ) {
    // Pick a new location for the monster.
    // Note: Change this to place the monster at a new, random location.
    monsterX = Math.floor(Math.random()*(1200-monsterWide))
    monsterY = Math.floor(Math.random()*(800-monsterHigh))
    monsterCaught = monsterCaught + 1;
    // if ((monsterCaught - 1) == 0 || (monsterCaught - 5) == 0 || (monsterCaught - 8) == 0) {(monsterReady1 = false);(monsterReady2 = true);(monsterReady3 = false);(monsterReady4 = false) };
    // if ((monsterCaught - 2) == 0 || (monsterCaught - 6) == 0 || (monsterCaught - 9) == 0) {(monsterReady1 = false);(monsterReady2 = false);(monsterReady3 = true);(monsterReady4 = false) };
    // if ((monsterCaught - 3) == 0 || (monsterCaught - 7) == 0) {(monsterReady1 = false);(monsterReady2 = false);(monsterReady3 = false);(monsterReady4 = true) };
    
    if ((monsterCaught % 4) == 0 || (monsterCaught % 6) == 0 || (monsterCaught - 1) == 0) {(monsterReady1 = false);(monsterReady2 = true);(monsterReady3 = false);(monsterReady4 = false) };
    if ((monsterCaught % 3) == 0 || (monsterCaught % 11) == 0 ) {(monsterReady1 = false);(monsterReady2 = false);(monsterReady3 = true);(monsterReady4 = false) };
    if ((monsterCaught % 5) == 0 || (monsterCaught % 13) == 0 ) {(monsterReady1 = false);(monsterReady2 = false);(monsterReady3 = false);(monsterReady4 = true) };
    }
  monsterX = monsterX + 5*monsterXdir
  monsterY = monsterY - 5*monsterYdir
  if (monsterX + 120 > 1200) { monsterXdir = -monsterXdir }
  if (monsterY + 120 > 800) { monsterYdir = -monsterYdir }
  if (monsterX < 0) { monsterXdir = -monsterXdir }
  if (monsterY < 0) { monsterYdir = -monsterYdir }
}


function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //this is for the images to be loaded
    if (bgReady) {
        ctx.drawImage(bgImage,0,0);
    } 
    if (heroReady) {
        ctx.drawImage(heroImage, heroX, heroY);
    } 
    if (monsterReady1) {
        ctx.drawImage(monsterImage1, monsterX, monsterY);
    }
    if (monsterReady2) {
      ctx.drawImage(monsterImage2, monsterX, monsterY);
    }
    if (monsterReady3) {
      ctx.drawImage(monsterImage3, monsterX, monsterY);
    }
    if (monsterReady4) {
      ctx.drawImage(monsterImage4, monsterX, monsterY);
    }
    ctx.fillText(`Seconds Remaining: ${SECONDS_PER_ROUND - elapsedTime}`, 1200, 150);
    if ((SECONDS_PER_ROUND - elapsedTime) == 0 ) {alert ('you loss')}
    // this is for nothing just to see if the button is worked
ctx.fillText("heroX: " + heroX, 1300, 30);
ctx.fillText("heroY: " + heroY, 1400, 30);
ctx.fillText("monsterX: " + monsterX, 1300, 50);
ctx.fillText("monsterY: " + monsterY, 1400, 50);

ctx.font = " 20px cursive"
ctx.fillText("You got: " + monsterCaught, 1350, 80);

  }
  
setup();
main();
