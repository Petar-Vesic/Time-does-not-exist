import Player from "./modules/Player.js";
import BulletController from "./modules/Bulletcontroller.js";



const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const collisionCanvas = document.getElementById('collisionCanvas');
const collisionCtx = collisionCanvas.getContext('2d');
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;
// stars

const stars = []
function init() {
  const banner = document.getElementById('banner')
  canvas.width = banner.offsetWidth
  canvas.height = banner.offsetHeight
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random(),
      y: Math.random(),
      size: Math.random(),
      change: 0.15,
    })
  }
}
function update() {
  for (const star of stars) {
    star.x += 0.0001
    if (star.x > 1) {
      star.x = 0
    }
    if (star.size < 0.7) {
      star.change = 0.001
    } else if (star.size > 0.9) {
      star.change = -0.1;
    }
    star.size += star.change;
  }
}
function render() {
  const { width, height } = canvas
  context.clearRect(0, 0, width, height)
  for (let star of stars) {
    context.beginPath()
    context.arc(
      star.x * width,
      star.y * height,
      star.size * 3,
      0,
      2 * Math.PI,
      false
    )
    context.fillStyle = 'white'
    context.fill();
  }
}

function twinkle() {
  update()
  render()
}



setInterval(twinkle, 1, )
init()

render()

// player
const bulletController = new BulletController(canvas, 999, "red", true)
const player = new Player(canvas, 3, bulletController);

// Enemy
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let score = 0
context.font = '50px Impact'

let timeToNextPirat = 0;
let piratInterval = 500;
let lastTime = 0




let pirates = []

class Pirat{
  
  constructor(){
    this.spriteWidth = 271;
    this.piratHealth = 1;
    this.spriteHeight = 194;
    this.sizeModifier = Math.random() * 0.2 + 0.25;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteWidth * this.sizeModifier;
    this.x = canvas.width;
    this.y = Math.random() * (canvas.height - this.height);
    this.directionX = Math.random() * 4 + 0.5;
    this.directionY = Math.random() * 4 - 0.5;
    this.markedForDeletion = false;
    this.image = new Image()
    this.image.src = 'img/true one 2.png'
    this.frame = 0;
    this.maxFrame = 4;

    this.flapInterval = Math.random() * 50 + 50
    this.randomColoros = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)]
    this.color = 'rgb(' + this.randomColoros[0] + ',' + this.randomColoros[1] + ',' + this.randomColoros[2] + ')';
  }



  update(deltatime){
    if(this.y < 0 || this.y > canvas.height - this.height){
      this.directionY = this.directionY * -1
    }
    this.x -= this.directionX
    this.y += this.directionY
    if(this.x < 0 - this.width) this.markedForDeletion = true;
    this.timeSinceFlap += deltatime;
    if(this.timeSinceFlap > this.flapInterval){
      if(this.frame > this.maxFrame) this.frame = 0
      else this.frame++;
      this.timeSinceFlap = 0
    }

  
  }
 
  
  draw(){
    collisionCtx.fillStyle = this.color;
    collisionCtx.fillRect(this.x, this.y, this.width, this.height)
    context.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)

  }

  takeDamage(piratHealth){
    this.piratHealth -= piratHealth;
  }



}



function drawScore(){
  context.fillStyle = 'black';
  context.fillText('Score:' + score, 50, 75)
  context.fillStyle = 'white';
  context.fillText('Score:' + score, 55, 80)
}
// ovaj ovde deo bi trebao da bude za Enemy Collision i remove, ali nisam uspeo da zavrsim :(
// pa sam ovde napravio onclick funciju da mogu da se uniste neprijatelji i poveca score
const pirat = new Pirat()
window.addEventListener('click', function(e){
  const detectPixelColor = collisionCtx.getImageData(e.x,e.y, 1, 1)
  const pc = detectPixelColor.data;
  pirates.forEach(object =>{
      if(object.randomColoros[0] === pc[0] && object.randomColoros[1] === pc[1] && object.randomColoros[2] === pc[2] || bulletController.collideWith(pirat)){
        object.markedForDeletion = true;
        score++
      }
    })
  
})



function animate(timestamp){
  collisionCtx.clearRect(0, 0, canvas.width, canvas.height);
  let deltatime = timestamp - lastTime
  lastTime = timestamp
  timeToNextPirat += deltatime
  if(timeToNextPirat > piratInterval){
    pirates.push(new Pirat())
    timeToNextPirat = 0
    pirates.sort(function(a,b){
      return a.width - b.width;
    })
  }
  


  drawScore();
  [...pirates].forEach(object => object.update(deltatime));
  [...pirates].forEach(object => object.draw());
  pirates.filter((pirat) => {
    if (bulletController.collideWith(pirat)) {
      pirates = pirates.filter(object => !object.markedForDeletion)
    }
  });

  pirates = pirates.filter(object => !object.markedForDeletion)


  

  
  bulletController.draw(context);
  player.draw(context);


  
  


 


  requestAnimationFrame(animate);
}
animate(0);

