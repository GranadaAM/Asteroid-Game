// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/hacZU523FyM

let ship;
let asteroids = [];
let lasers = [];
let button;
let highscore;
let highscoreFont;
let musik;
let lazerLyd;

function preload(){
  //soundFormats('mp3', 'ogg');
  musik = loadSound("Lyd/music.mp3", lydSuccess, lydFejl);
  lazerLyd = loadSound("Lyd/laser.mp3", null, lydFejl);
  highscoreFont = loadFont("Font/ARCADECLASSIC.TTF");
}

function lydFejl(){
  console.log("jeg kan ikke finde lyd-filen");
} 

function lydSuccess() {
  //musik.volume(0.5);
  musik.play();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  for (let i = 0; i < 5; i++) {
    asteroids.push(new Asteroid());
  }
  highscore = 0;
}

function draw() {
  background(0);
  fill('white');
  textSize(36);
  textFont(highscoreFont);
  text("Highscore   " + highscore, 30, 60);
  noFill();

  for (let i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i])) {
      console.log('ooops!');
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }

  for (let i = lasers.length - 1; i >= 0; i--) {
    lasers[i].render();
    lasers[i].update();
    if (lasers[i].offscreen()) {
      lasers.splice(i, 1);
    } else {
      for (let j = asteroids.length - 1; j >= 0; j--) {
        if (lasers[i].hits(asteroids[j])) {
          if (asteroids[j].r > 10) {
            let newAsteroids = asteroids[j].breakup();
            asteroids = asteroids.concat(newAsteroids);
          }
          highscore += 1;
          console.log(highscore);
          asteroids.splice(j, 1);
          lasers.splice(i, 1);
          break;
        }
      }
    }
  }

  console.log(lasers.length);

  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
}

function keyReleased() {
  ship.setRotation(0);
  ship.boosting(false);
}

function keyPressed() {
  if (key == ' ') {
    lasers.push(new Laser(ship.pos, ship.heading))
    lazerLyd.play();
  } else if (keyCode == RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if (keyCode == UP_ARROW) {
    ship.boosting(true);
  }
}