const canvas = document.getElementById('particle');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particulesArray;

// Get mouse position
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height/80) * (canvas.width/80),
}

window.addEventListener('mousemove', 
    function(event){
	mouse.x = event.x;
	mouse.y = event.y;
    });

// Create particle

class Particle {
    constructor(x, y, directionX, directionY, size, color){
	this.x = x;
	this.y = y;
	this.directionX = directionX;
	this.directionY = directionY;
	this.size = size;
	this.color = color;
    }
    //Method to draw individual particle
    draw() {
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
	ctx.fillStyle = '#ADD8E6';
	ctx.fill();
    }
    //Check particle position, check mouse position, move the particle, draw the particle
    update() {
	//Check if particle is still in the canvas
	if(this.x > canvas.width || this.x < 0) {
	    this.directionX = -this.directionX;
	}

	if(this.y > canvas.height || this.y < 0) {
	    this.directionY = -this.directionY;
	}

	//Check collision detection - mouse position / particle postion
	let dx = mouse.x - this.x;
	let dy = mouse.y - this.y;
	let distance = Math.sqrt(dx * dx + dy * dy);
	let v = 5;

	if(distance < mouse.radius + this.size) {
	    //collision detected
	    if(mouse.x < this.x && this.x < canvas.width - this.size*v){
		this.x += v;
	    }

	    if(mouse.x > this.x && this.x > this.size*v){
		this.x -= v;
	    }

	    if(mouse.y < this.y && this.y < canvas.height - this.size*v){
		this.y += v;
	    }

	    if(mouse.y > this.y && this.y > this.size*v){
		this.y -= v;
	    }
	}
	//Move particle
	this.x += this.directionX;
	this.y += this.directionY;
	//Draw particle
	this.draw();
    }
}

//Create particle array
function init() {
    particulesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) /20000;
    for(let i = 0; i < numberOfParticles; i++){
	let size = (Math.random() * 3)+1;
	let x = (Math.random() * ((innerWidth - size*2) - (size*2)) + size*2);
	let y = (Math.random() * ((innerHeight - size*2) - (size*2)) + size*2);
	let directionX = ((Math.random() * 2) -1)/2;
	let directionY = ((Math.random() * 2) -1)/2;
	let color = '#ADD8E6';

	particulesArray.push(new Particle(x,y,directionX,directionY,size,color));
    }
}

//Animation Loop

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight);

    
    for(let i = 0; i < particulesArray.length; i++){
	particulesArray[i].update();
    }
    connect()
}

//Check if particles are close enough to draw line between them

function connect(){
    let opacityValue;
    for(let i = 0; i < particulesArray.length; i++){
	for(let j = i; j < particulesArray.length; j++){
	    let dx = particulesArray[i].x - particulesArray[j].x;
	    let dy = particulesArray[i].y - particulesArray[j].y;
	    let distance = dx*dx + dy*dy;
	    if(distance < (canvas.width/7) * (canvas.height/7)){
		opacityValue = 1 - (distance/20000);
		ctx.strokeStyle = 'rgba(169,169,169,'+ opacityValue +')' ;
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(particulesArray[i].x, particulesArray[i].y);
		ctx.lineTo(particulesArray[j].x, particulesArray[j].y);
		ctx.stroke();
	    }
	}
    }
}

//Resize event
window.addEventListener('resize', windowResize());

function windowResize(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = ((canvas.height/80)*(canvas.height/80));
    init();
}

//Mouse out event

window.addEventListener('mouseout', mouseOut())

function mouseOut(){
    mouse.x = undefined;
    mouse.y = undefined;
}

init();
animate();
