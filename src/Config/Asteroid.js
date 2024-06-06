export class Asteroid {
  constructor(difficult) {
    // Configuração inicial
    this.speed = this.calcSpeed() * difficult * 0.5;
    this.radius = this.calcRadius();
    this.angle = this.calcAngle();

    // Inicializar movimento
    this.calcMove();
    this.start();
  }
}

// Métodos no protótipo
Asteroid.prototype.calcSpeed = function () {
  const min = 0.1;
  const max = 0.5;
  return Math.random() * (max - min) + min;
};

Asteroid.prototype.calcRadius = function () {
  const min = 20;
  const max = 30;
  return Math.random() * (max - min) + min;
};

Asteroid.prototype.calcAngle = function () {
  return Math.random() * 2 * Math.PI;
};

Asteroid.prototype.calcMove = function () {
  const dx = Math.cos(this.angle) * this.speed;
  const dy = Math.sin(this.angle) * this.speed;

  this.dx = dx;
  this.dy = dy;
};

// Método para iniciar a posição do asteroide
Asteroid.prototype.start = function () {
  // 0 = top; 1 = direita; 2 = base; 3 = esquerda;
  const eixo = Math.floor(Math.random() * 4);

  switch (eixo) {
    case 0:
      this.x = Math.random() * this.ctx.canvas.width;
      this.y = 0 - this.radius * 2;
      this.dy = Math.abs(this.dy);
      break;
    case 1:
      this.x = this.ctx.canvas.width + this.radius * 2;
      this.y = Math.random() * this.ctx.canvas.height;
      this.dx = -Math.abs(this.dx);
      break;
    case 2:
      this.x = Math.random() * this.ctx.canvas.width;
      this.y = this.ctx.canvas.height + this.radius * 2;
      this.dy = -Math.abs(this.dy);
      break;
    case 3:
      this.x = 0 - this.radius * 2;
      this.y = Math.random() * this.ctx.canvas.height;
      this.dx = Math.abs(this.dx);
      break;
    default:
      this.x = 0;
      this.y = 0;
      break;
  }

  if (this.isMove) this.update();
};

Asteroid.prototype.isMove = true;

Asteroid.prototype.update = function () {
  this.x += this.dx;
  this.y += this.dy;

  // Verificação se passou da borda
  if (this.x < -this.radius * 2) {
    this.x = this.ctx.canvas.width + this.radius * 2;
  } else if (this.x > this.ctx.canvas.width + this.radius * 2) {
    this.x = -this.radius * 2;
  }

  if (this.y < -this.radius * 2) {
    this.y = this.ctx.canvas.height + this.radius * 2;
  } else if (this.y > this.ctx.canvas.height + this.radius * 2) {
    this.y = -this.radius * 2;
  }

  this.draw();
};

Asteroid.prototype.draw = function () {
  this.ctx.beginPath();
  this.ctx.drawImage(
    this.img,
    this.x - this.radius,
    this.y - this.radius,
    this.radius * 2,
    this.radius * 2
  );
  this.ctx.stroke();
};

// Adiciona a imagem como uma propriedade estática da classe
Asteroid.prototype.img = new Image();
Asteroid.prototype.img.src = "asteroid.png";
