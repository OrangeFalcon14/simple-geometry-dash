import { ctx } from "../main";
import { SPEED } from "./player";

export class Triangle{
    size = 50;
    width:number;
    height:number;
    x:number;
    y:number;
    type:number;
    constructor(x:number, y:number, type:number){
        this.x = x;
        this.y = y;
        this.type = type;
        this.height = this.size;
        this.width = this.size * this.type;
    }
    update(){
        this.x -= SPEED;
    }
    drawTriangle(iteration:number){
        let x = this.x + this.size*iteration;
        let y = this.y;
        console.log(x,y);
        ctx.beginPath();
        ctx.strokeStyle = "#29ce9a";
        ctx.fillStyle = "#143a2e";
        ctx.lineTo(x + 50, y);
        ctx.lineTo(x + this.size/2, y - this.size)
        ctx.lineTo(x, y);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
    render(){
        for (let i = 0; i < this.type; i++) {
            this.drawTriangle(i)
        }
    }
}
