class Moon{
  constructor(moonOrbitRadius, planetOrbitRadius, planetSpeed){
    this.mr = moonOrbitRadius / 5;
    this.moonOrbitRadius = moonOrbitRadius;
    this.planetOrbitRadius = planetOrbitRadius;
    this.moonAngle = random(0, 2 * PI);
    this.moonSpeed = random(planetSpeed * 8, planetSpeed * 12);
  }
  
  draw(){
    this.move();
    noStroke();
    fill(192);
    push();
    translate(this.planetOrbitRadius, 0);
    rotate(this.moonAngle);
    circle(this.moonOrbitRadius, 0, this.mr * 2);
    pop();
  }
  
  move(){
    this.moonAngle += this.moonSpeed;
  }
}
