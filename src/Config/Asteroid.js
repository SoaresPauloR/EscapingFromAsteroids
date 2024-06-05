import { AsteroidConfig } from "./AsteroidConfig.js";

export class Asteroid extends AsteroidConfig {
  constructor(level, canvas) {
    super(level);
    this.canvas = canvas;
    this.speed.value = this.speed.value * level;
    this.start();
  }

  start() {
    // 0 = top; 1 = direita; 2 = base; 3 = esquerda;
    const eixo = Math.floor(Math.random() * 4);

    switch (eixo) {
      case 0:
        this.x = Math.random() * this.canvas.width;
        this.y = 0 - this.radius.value * 2;

        this.dy = Math.abs(this.dy);
        break;
      case 1:
        this.x = this.canvas.width + this.radius.value * 2;
        this.y = Math.random() * this.canvas.height;

        this.dx = -Math.abs(this.dx);
        break;
      case 2:
        this.x = Math.random() * this.canvas.width;
        this.y = this.canvas.height + this.radius.value * 2;

        this.dy = -Math.abs(this.dy);
        break;
      case 3:
        this.x = 0 - this.radius.value * 2;
        this.y = Math.random() * this.canvas.height;

        this.dx = Math.abs(this.dx);
        break;
      default:
        this.x = 0;
        this.y = 0;
        break;
    }
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x < -this.radius.value * 2) {
      this.x = this.canvas.width + this.radius.value * 2;
    } else if (this.x > this.canvas.width + this.radius.value * 2) {
      this.x = -this.radius.value * 2;
    }

    if (this.y < -this.radius.value * 2) {
      this.y = this.canvas.height + this.radius.value * 2;
    } else if (this.y > this.canvas.height + this.radius.value * 2) {
      this.y = -this.radius.value * 2;
    }
  }
}
