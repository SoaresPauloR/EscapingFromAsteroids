export class AsteroidConfig {
  constructor() {
    this.speed.value = this.calcSpeed();
    this.radius.value = this.calcRadius();
    this.angle = this.calcAngle();

    this.calcMove();
  }

  speed = { value: 0, min: 0.1, max: 0.5 };
  radius = { value: 0, min: 20, max: 30 };
  angle = 0;

  calcSpeed() {
    return Math.random() * (this.speed.min - this.speed.max) + this.speed.max;
  }

  calcRadius() {
    return (
      Math.random() * (this.radius.max - this.radius.min) + this.radius.min
    );
  }

  calcAngle() {
    return Math.random() * 2 * Math.PI;
  }

  calcMove() {
    const dx = Math.cos(this.angle) * this.speed.value;
    const dy = Math.sin(this.angle) * this.speed.value;

    this.dx = dx;
    this.dy = dy;
  }
}
