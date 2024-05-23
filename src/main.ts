import "./style.css";
import { Player } from "./sprites/player";
import { initInput, Bindings } from "./input";
import { Floor } from "./sprites/floor";
import { Triangle } from "./sprites/triangles";

const FPS = 90;
let frame = 0;

export const canvas = <HTMLCanvasElement>document.querySelector("#canvas");
export const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 720;

const enemies: Triangle[] = [];

const player = new Player(50, 50, 20, 520 / 3);

const bindings: Bindings = { " ": () => player.jump() };
initInput(bindings);

const floor = new Floor(520);

let GAME_OVER = false;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  floor.render();

  for (let i = enemies.length - 1; i >= 0; i--) {
    const enemy = enemies[i];
    if (enemy.x + enemy.width < 0) enemies.splice(i, 1);

    enemy.update();
    enemy.render();

    if (player.isHittingTriangle(enemy.x, enemy.y, enemy.width, enemy.height)) {
      GAME_OVER = true;
    }
  }

  if (!GAME_OVER) {
    if (frame % FPS == 3) {
      let offset = 2 * Math.floor(Math.random()*100 - 100);
      enemies.push(new Triangle(canvas.width + offset, 520, Math.ceil(Math.random() * 3)));
      console.log(enemies);
    }

    player.update();
    player.render();
  }
  frame++;
}

setInterval(draw, 1000 / FPS);
