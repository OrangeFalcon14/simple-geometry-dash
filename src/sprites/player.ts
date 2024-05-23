import { canvas, ctx } from "../main";
import playerPath from "/assets/player.png";

const GRAVITY = 0.5;
const BOUNCE = 0;
const JUMP_HEIGHT = 3;
export const SPEED = 10;
const FLOOR = /* document.querySelector<HTMLCanvasElement>("#canvas")!.height */520;
console.log(FLOOR);


export class Player {
  width: number;
  height: number;
  x: number;
  y: number;
  speedX = SPEED;
  speedY = 0;
  gravity = GRAVITY;
  upAccel = 0;
  downVelocity = 0;
  upVelocity = 0;
  
  shouldJump = false;
  
  image;

  constructor(width: number, height: number, x: number, y: number) {
    [this.width, this.height, this.x, this.y] = [width, height, x, y];
    this.image = new Image(this.width, this.height);
    this.image.src = playerPath;
  }

  update() {
    this.downVelocity += this.gravity;
    this.upVelocity += this.upAccel;
    if (this.upAccel > 0) this.upAccel -= this.gravity;

    if (this.x < canvas.width / 2.5 - this.width) this.x += this.speedX;
    this.y += this.speedY + this.downVelocity - this.upVelocity;

    if (this.y > FLOOR - this.height) {
      this.y = FLOOR - this.height;
      this.upAccel = 0;
      this.upVelocity = 0;
      this.downVelocity *= -1 * BOUNCE;
      if (this.shouldJump) {
        this.upAccel = JUMP_HEIGHT;
        this.shouldJump = false;
      }
    }
  }

  render() {
    // ctx.beginPath();
    // ctx.strokeStyle = "#00ffff";
    // ctx.fillStyle = "#005050";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    // ctx.rect(this.x, this.y, this.width, this.height);
    // ctx.fill();
    // ctx.stroke();
    // ctx.closePath();
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
  }

  jump() {
    if (Math.abs(this.y + this.height - FLOOR) < 40)
      this.shouldJump = true;
  }
  isHittingTriangle(x:number, y:number, width:number, height:number){
    if(this.x + this.width > x && 
      this.x < x + width &&
      this.y + this.height > y - height) return true;
    // if(this.y + this.height > y + height) return true;
  }
}
