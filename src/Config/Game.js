export class Game {
  constructor(Rocket) {
    this.level = 1;
    this.difficult = 1;
    this.qtnInicial = 30;
    this.state = true;

    this.asteroids = [];
    this.rocket = new Rocket();
  }

  update() {
    this.checkCollisions();
    this.asteroids.forEach((asteroid) => asteroid.update());
    this.rocket.update();
  }

  checkCollisions() {
    this.asteroids.forEach((asteroid) => {
      if (this.detectCollision(this.rocket, asteroid)) {
        this.gameOver();
        return;
      }

      this.checkCollisionAsteroid(asteroid);
    });
  }

  checkCollisionAsteroid(asteroidOne) {
    this.asteroids.forEach((asteroidTwo) => {
      if (asteroidOne === asteroidTwo) return;

      const cateto1 = asteroidOne.x - asteroidTwo.x;
      const cateto2 = asteroidOne.y - asteroidTwo.y;
      const hipotenusa = Math.sqrt(cateto1 * cateto1 + cateto2 * cateto2);

      if (hipotenusa < asteroidOne.radius + asteroidTwo.radius) {
        const dx = asteroidOne.x - asteroidTwo.x;
        const dy = asteroidOne.y - asteroidTwo.y;
        const angle = Math.atan2(dy, dx);

        asteroidTwo.angle = angle + Math.PI;
        asteroidOne.angle = angle;

        asteroidOne.calcMove();
        asteroidTwo.calcMove();
      }
    });
  }

  detectCollision(rocket, asteroid) {
    const cateto1 = rocket.position.x - asteroid.x;
    const cateto2 = rocket.position.y - asteroid.y;
    const hipotenusa = Math.sqrt(cateto1 * cateto1 + cateto2 * cateto2);

    if (hipotenusa < rocket.size.width / 4 + asteroid.radius) {
      return true;
    }
    return false;
  }

  gameOver() {
    this.state = false;
  }
}
