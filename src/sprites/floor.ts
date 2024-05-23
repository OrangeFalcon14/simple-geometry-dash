import { canvas, ctx } from "../main";

export class Floor {
    height:number;
    constructor(height:number) {
        this.height = height
    }
    render(){
        ctx.beginPath();
        ctx.fillStyle = "#167456";
        ctx.fillRect(0, this.height, canvas.width, canvas.height - this.height);
        ctx.fill();
        ctx.closePath();
    }
}
