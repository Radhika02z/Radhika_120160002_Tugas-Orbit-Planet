class Planet {
  constructor(orbitRadius, previousOrbitRadius, nextOrbitRadius) {
    let halfDistToPrevOrbit = (orbitRadius - previousOrbitRadius) / 2;
    let halfDistToNextOrbit = (nextOrbitRadius - orbitRadius) / 2;
    this.prMax = min(halfDistToPrevOrbit, halfDistToNextOrbit);
    this.prMax = min(this.prMax, maxPlanetRadius);
    this.pr = random(minPlanetRadius, this.prMax); // planet radius
    this.or = orbitRadius;
    this.a = random(0, PI * 2); // planet angle (polar location)
    this.ra = random(0, PI * 2)  // angle of rings
    this.c = color(random(255), random(255), random(255));
    this.s = random(speed * 0.5, speed * 1.5) // planet speed
    // planets either get a ring, moons, or nothing
    let x = random(0, 3);
    if (x < 1) {
      this.hasMoons = true;
      this.numOfMoons = floor(random(1, 6));
      this.moons = [];
      this.createMoons();
    } else if (x < 2) {
      this.hasRing = true;
    }

  }

  draw() {
    push();
    rotate(this.a);
    this.drawPlanet();
    if (this.hasMoons) {
      this.drawMoons();
    } else if (this.hasRing){
      this.drawRing();
    }
    pop();
  }

  drawOrbit() {
    noFill();
    stroke(125);
    circle(0, 0, this.or * 2);
  }

  drawPlanet() {
    noStroke();
    fill(this.c);
    circle(this.or, 0, this.pr * 2);
  }

  drawMoons() {
    for (let moon of this.moons) {
      moon.draw(this.pr * 3);
    }
  }
  
  drawRing(){
    stroke(192);
    noFill();
    strokeWeight(floor(map(this.pr, minPlanetRadius, maxPlanetRadius, 2, 4)));
    push();
    translate(this.or, 0);
    rotate((-1 * this.a) + this.ra);
    this.ra += this.s * 2;
    arc(0, 0, this.pr * 2.5, this.pr * 0.25, -(PI / 48), PI + (PI / 48));
    pop();
  }

  move() {
    this.a += this.s;
  }

  createMoons() {
    for (let i = 0; i < this.numOfMoons; i++) {
      this.moons.push(new Moon(this.pr * 1.75, this.or, this.s));
    }
    print(this.moons);
  }

}