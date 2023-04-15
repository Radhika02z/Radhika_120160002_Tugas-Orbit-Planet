// Title: Coding Challenge #6 - Mitosis
// Author: Daniel Kaye
//  URL: http://dnkaye.com/2020_CodingChallenges.html
//
// Based on Daniel Schiffman's (Coding Train) coding challenges
//  URL: https://thecodingtrain.com/CodingChallenges/007-solarsystemgenerator
//  
// What is this?
//  Attempt to draw a moving model of a 2D solar system
//
// How do I do this?
//  I attempt to complete Daniel Schiffman's coding challenges before watching
//  his video, then afterwards I watch and see what he did differently, and learn!

// Things I'm proud of / differences from The Coding Train version:
// -Video makes planets as recursive object (sun, planets, moon, all same class), which at first I was impressed by, but as video progressed I'm glad I made them all seperate, it seemed unbenefitial in this case
// -orbit and planet radius generation that avoids overlaps
// -mine draws the orbit lines
// -spent a long time trying to make this work with elliptical orbits, too much math, gave up
// -random chance of moons OR rings

let planets = [];
let orbitRadii = [];
let numOfPlanets = 6;
let speed = 0.001;
let minPlanetRadius = 5;
let maxPlanetRadius = 20;
let sunRadius = 20;

function setup() {
  createCanvas(400, 400);
  generateOrbitRadii();
  generatePlanets();
}

function draw() {
  if (focused || frameCount < 30) {
    background(0);
    translate(width / 2, height / 2);
    drawSun();
    drawAllOrbits();
    moveAllPlanets();
    drawAllPlanets();
  } else {
    drawUnpauseInstructions();
  }
}

function drawUnpauseInstructions() {
  noStroke();
  fill(255);
  textAlign(CENTER);
  textSize(18);
  text('click to activate', width / 2, height - height / 5);
}

function generatePlanets() {
  for (let i = 0; i < numOfPlanets; i++) {
    if (i == 0) {
      planets.push(new Planet(orbitRadii[i], sunRadius, orbitRadii[i + 1]));
    } else if (i < numOfPlanets - 1) {
      planets.push(new Planet(orbitRadii[i], orbitRadii[i - 1], orbitRadii[i + 1]));
    } else {
      planets.push(new Planet(orbitRadii[i], orbitRadii[i - 1], orbitRadii[i] * 2));
    }
  }
}

// ensures radi don't overlap and are evenly spaced
function generateOrbitRadii() {
  let previousRadius = sunRadius;
  let numOfPlanetsRemaining = numOfPlanets;
  let minOrbitForNextPlanet = previousRadius + minPlanetRadius;
  let availableSpaceForNextOrbit = width / 2 - previousRadius;
  let maxOrbitForNextPlanet = (availableSpaceForNextOrbit / numOfPlanetsRemaining) + previousRadius;
  for (let i = numOfPlanets; i > 0; i--) {
    orbitRadii.push(random(minOrbitForNextPlanet, maxOrbitForNextPlanet));
    previousRadius = orbitRadii[orbitRadii.length - 1];
    // numOfPlanetsRemaining -= 1;
    minOrbitForNextPlanet = previousRadius + minPlanetRadius;
    availableSpaceForNextOrbit = width / 2 - previousRadius;
    maxOrbitForNextPlanet = (availableSpaceForNextOrbit / i) + previousRadius;
  }
  print(orbitRadii);
}

function drawAllPlanets() {
  for (let planet of planets) {
    planet.draw();
  }
}

function moveAllPlanets() {
  for (let planet of planets) {
    planet.move();
  }
}

function drawSun() {
  fill(253, 184, 19); // sun yellow/orange
  noStroke();
  circle(0, 0, sunRadius * 2);
}

function drawAllOrbits() {
  for (let planet of planets) {
    planet.drawOrbit();
  }
}

function isHovered() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    return true;
  } else {
    noStroke();
    fill(255);
    textAlign(CENTER);
    text('mouseover canvas to activate', width / 2, height - 30);
    return false;
  }
}