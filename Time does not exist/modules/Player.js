


export default class Player{

  rightPressed = false;
  leftPressed = false;
  upPressed = false;
  downPressed = false;
  shootPressed= false;



  constructor(canvas,velocity, bulletController){
    this.velocity = velocity
    this.canvas = canvas;
    this.bulletController = bulletController;
    this.speed = 5
    this.x = this.canvas.width/15;
    this.y = this.canvas.height -380;

    this.width = 120;
    this.height = 120;
    this.image = new Image()
    this.image.src = "./img/Group 1.png";
    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup)
  }
    draw(context){
      if(this.shootPressed){
        const bulletX = this.x + this.width / 2;
        const bulletY = this.y;
        this.bulletController.shoot(bulletX +50, bulletY +56, 4, 10);
        
      }
      this.move();
      context.drawImage(this.image, this.x, this.y, this.width, this.height)
      
      
    }



    move(){
      if(this.downPressed){
        this.y += this.speed;
      }
      if(this.upPressed){
        this.y -= this.speed;
      }
      if(this.leftPressed){
        this.x -= this.speed;
      }
      if(this.rightPressed){
        this.x += this.speed;
      }
    }
    

    keydown = (e) =>{
      if(e.code === 'ArrowUp'){
        this.upPressed = true;
      }
      if(e.code === 'ArrowDown'){
        this.downPressed = true;
      }
      if(e.code === 'ArrowLeft'){
        this.leftPressed = true;
      }
      if(e.code ==='ArrowRight'){
        this.rightPressed = true;
      }
      if(e.code ==='Space'){
        this.shootPressed = true;
      }
    }
    keyup = (e) =>{
      if(e.code === 'ArrowUp'){
        this.upPressed = false;
      }
      if(e.code === 'ArrowDown'){
        this.downPressed = false;
      }
      if(e.code === 'ArrowLeft'){
        this.leftPressed = false;
      }
      if(e.code ==='ArrowRight'){
        this.rightPressed = false;
      }
      if(e.code ==='Space'){
        this.shootPressed = false;
      }
    }
};