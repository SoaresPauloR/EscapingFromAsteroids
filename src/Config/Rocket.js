export class Rocket {
  //#region Config Variable
  constructor(difficult) {
    this.size = { width: 50, height: 50 };

    this.position = {
      x: this.ctx.canvas.width / 2,
      y: this.ctx.canvas.height / 2,
    };

    this.difficult = difficult;

    this.speed = 0;
    this.angle = 0;
    this.turnRate = 2;
    this.isMoving = true;

    this.imagem = new Image();
    this.imagem.src = "rocket.png";

    this.keysPressed = [];

    this.speedUpInterval = null;
    this.speedDownInterval = null;
    this.turnLeftInterval = null;
    this.turnRightInterval = null;

    this.listen();
  }
  //#endregion

  //#region Listening Events
  listen() {
    addEventListener("keydown", this.handleKeyDown.bind(this));
    addEventListener("keyup", this.handleKeyUp.bind(this));
  }

  handleKeyDown(e) {
    this.keysPressed[e.code] = true;

    if (
      this.speedUpInterval == null &&
      (this.keysPressed["KeyW"] || this.keysPressed["ArrowUp"])
    ) {
      this.speedUpInterval = setInterval(
        () => this.adjustSpeed(0.02, 0.5 + this.difficult / 3),
        10
      );
    }

    if (
      this.speedDownInterval == null &&
      (this.keysPressed["KeyS"] || this.keysPressed["ArrowDown"])
    ) {
      this.speedDownInterval = setInterval(() => {
        this.adjustSpeed(-0.02, 0.5 + this.difficult / 3);
      }, 10);
    }

    if (
      this.turnLeftInterval == null &&
      (this.keysPressed["KeyA"] || this.keysPressed["ArrowLeft"])
    ) {
      this.turnLeftInterval = setInterval(
        () => this.adjustAngle(-this.turnRate),
        10
      );
    }

    if (
      this.turnRightInterval == null &&
      (this.keysPressed["KeyD"] || this.keysPressed["ArrowRight"])
    ) {
      this.turnRightInterval = setInterval(
        () => this.adjustAngle(this.turnRate),
        10
      );
    }
  }

  handleKeyUp(e) {
    this.keysPressed[e.code] = false;

    if (!this.keysPressed["KeyW"] && !this.keysPressed["ArrowUp"]) {
      this.clearIntervalSafely(this.speedUpInterval);
      this.speedUpInterval = null;
    }

    if (!this.keysPressed["KeyS"] && !this.keysPressed["ArrowDown"]) {
      this.clearIntervalSafely(this.speedDownInterval);
      this.speedDownInterval = null;
    }

    if (!this.keysPressed["KeyA"] && !this.keysPressed["ArrowLeft"]) {
      this.clearIntervalSafely(this.turnLeftInterval);
      this.turnLeftInterval = null;
    }

    if (!this.keysPressed["KeyD"] && !this.keysPressed["ArrowRight"]) {
      this.clearIntervalSafely(this.turnRightInterval);
      this.turnRightInterval = null;
    }
  }

  adjustSpeed(delta, maxSpeed) {
    this.speed = Math.max(0, Math.min(this.speed + delta, maxSpeed));

    if (this.speed > 0) {
      this.isMoving = true;
    } else {
      this.isMoving = false;
    }
  }

  adjustAngle(delta) {
    this.angle += delta * (Math.PI / 180);
  }

  clearIntervalSafely(interval) {
    if (interval !== null) {
      clearInterval(interval);
    }
  }
  //#endregion

  //#region Update Function
  update() {
    this.position.x += Math.sin(this.angle) * this.speed;
    this.position.y -= Math.cos(this.angle) * this.speed;

    this.wrapAroundCanvas();

    this.draw();
  }

  draw() {
    this.ctx.save();
    this.ctx.translate(this.position.x, this.position.y);
    this.ctx.rotate(this.angle);
    this.ctx.drawImage(
      this.imagem,
      -this.size.width / 2,
      -this.size.height / 2,
      this.size.width,
      this.size.height
    );
    this.ctx.restore();
  }

  wrapAroundCanvas() {
    if (this.position.x < 0) {
      this.position.x = this.ctx.canvas.width;
    } else if (this.position.x > this.ctx.canvas.width) {
      this.position.x = 0;
    }

    if (this.position.y < 0) {
      this.position.y = this.ctx.canvas.height;
    } else if (this.position.y > this.ctx.canvas.height) {
      this.position.y = 0;
    }
  }
  //#endregion
}
