import Bullet from "./bullets.js";

export default class BulletController{

    bulltes = []
    timeTillNextBulletAllowed = 0


    constructor(canvas,maxBulletAtTime, bullteColor, soundEnabled, x, y){
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.maxBulletAtTime = maxBulletAtTime;
        this.bullteColor = bullteColor;
        this.soundEnabled = soundEnabled;
        this.shootSound = new Audio("../sounds_shoot.wav")
        this.shootSound.volume = 0.5;
    }
    draw(context){



        this.bulltes = this.bulltes.filter(bullet=>bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height)
        this.bulltes.forEach(bullet=>bullet.draw(context))
        this.bulltes = this.bulltes.filter(bulltes =>!bulltes.markedForDeletion);
        if(this.timeTillNextBulletAllowed > 0){
            this.timeTillNextBulletAllowed--
        }
    }
    

    shoot(x, y,velocity, timeTillNextBulletAllowed = 5){
        if(this.timeTillNextBulletAllowed <= 0 && this.bulltes.length < this. maxBulletAtTime){
            const bullet = new Bullet(this.canvas,x,y,velocity,this.bullteColor)
            this.bulltes.push(bullet)
            if(this.soundEnabled){
                this.shootSound.currentTime = 0;
                this.shootSound.play()
            }
            this.timeTillNextBulletAllowed = timeTillNextBulletAllowed; //inace jedan mali hack je ako se izbrise ova linija koda , onda se puca laser
        }

    }
    collideWith(sprite) {
        return this.bulltes.some((bullet) => {
          if (bullet.collideWith(sprite)) {
            this.bulltes.splice(this.bulltes.indexOf(bullet), 1);
            return true;
          }
          return false;
        });
      }

}