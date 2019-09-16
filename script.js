var cluster = [];
var particles = [];
var nParticles = 500
var iter = 100
var r = 4;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
  cluster[0] = new Particle(width/2, height/2, true);
  for (var i = 0; i < nParticles; i++) {
    particles[i] = new Particle();
  }
}

function draw(){
	background(0);
  
	for (var i = 0; i < cluster.length; i++) {
    cluster[i].show()
	}
  
  for (var i = 0; i < particles.length; i++) {
    particles[i].show()
  }
  for (var n = 0; n < iter; n++) {
    for (var i  = 0; i < particles.length; i++){
      particles[i].walk();
      // if (particles[i].outBound()) {
      //   particles.splice(i, 1);
      // }
      if (particles[i].checkAgg(cluster)) {
        cluster.push(particles[i]);
        particles.splice(i, 1);
      }
    }
  }
}
function Particle(x, y, stuck) {
  if (x && y) {
    this.pos = createVector(x, y)
  } else {
    this.pos = randomPoint();
  }
  this.out = false;
  this.stuck = stuck;
  this.walk = function() {
    var v = p5.Vector.random2D();
    this.pos.add(v)
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);
  }
  this.outBound = function() {
    if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0) {
      return true;
    }
    return false;
  }
  this.checkAgg = function(others) {
      for (var i = 0; i < others.length; i++) {
        var d = distSq(this.pos, others[i].pos);
        if (d < (r * r * 4)) {
          this.stuck = true;
          return true
          break;
        }
      }
      return false
  }
  
  this.show = function() {
		stroke(255);
    if (this.stuck) {
      fill(52, 235, 216);
    } else {
      fill(255);
    }
		ellipse(this.pos.x, this.pos.y, r*2, r*2)
  }
}
function randomPoint() {
  var i = floor(random(4));
  
  if (i === 0) {
    var x = Math.floor(Math.random() * ((0.95*width) - (0.05*width) + 1)) + (0.05*width)
    return createVector(x, 0.95* height);
  } else if (i === 1) {
    var x = Math.floor(Math.random() * ((0.95*width) - (0.05*width) + 1)) + (0.05*width)
    return createVector(x, 0.05*height);
  } else if (i === 2) {
    var y = Math.floor(Math.random() * ((0.95*height) - (0.05*height) + 1)) + (0.05*height)
    return createVector(0.05 * width, y);
  } else {
    var y = Math.floor(Math.random() * ((0.95*height) - (0.05*height) + 1)) + (0.05*height)
    return createVector(0.95 * width, y);
  }
}

function distSq(a, b) {
  var dx = b.x - a.x;
  var dy = b.y - a.y;
  return (dy*dy) + (dx * dx);
}