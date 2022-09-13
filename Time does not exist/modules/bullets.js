export default class Bullet{
    constructor(canvas,x,y,velocity, bulletColor){
        this.canvas = canvas
        this.x = x;
        this.y = y;
        this.velocity = velocity
        this.bulletColor =bulletColor;

        this.width = 20;
        this.height = 5;
        this.color = "red";
    }

    draw(context){
        this.x += this.velocity
        context.fillStyle = this.bulletColor;
        context.fillRect(this.x,this.y, this.width, this.height)
    }
    collideWith(sprite) {
        if (
          this.x < sprite.x + sprite.width &&
          this.x + this.width > sprite.x &&
          this.y < sprite.y + sprite.height &&
          this.y + this.height > sprite.y
        ) {
          sprite.takeDamage(this.damage);
          return true;
        }
        return false;
      }
}