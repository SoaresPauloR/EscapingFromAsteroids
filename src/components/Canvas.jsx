"use client";

import React, { useEffect, useRef, useState } from "react";
import { Asteroid } from "@/Config/Asteroid";
import { Rocket } from "@/Config/Rocket";
import { Game } from "@/Config/Game";

export default (props) => {
  const prop = { ...props };
  const { setPontuation } = props;
  delete prop.setPontuation;

  const ref = useRef();

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext("2d");

    // Adiciona a imagem como uma propriedade estática da classe
    Asteroid.prototype.img = new Image();
    Asteroid.prototype.img.src = "asteroid.png";

    Asteroid.prototype.ctx = context;
    Rocket.prototype.ctx = context;

    const game = new Game(Rocket);
    let cont = 10;
    let contPenalidade = 0;
    let penalidade = true;

    let time = setInterval((e) => {
      setPontuation({
        level: game.level,
        score: game.score,
      });

      if (cont == 0) {
        game.level += 1;
        cont = 10;
        game.qtnInicial += 3 * game.difficult;
        contPenalidade = 0;
        penalidade = true;
      } else {
        cont--;
      }

      if (!game.rocket.isMoving) {
        contPenalidade++;
      } else {
        contPenalidade = 0;
      }

      if (contPenalidade > 3 && penalidade) {
        game.score -= 10;
        penalidade = false;
        contPenalidade = 0;
      }

      game.score++;
    }, 1000);

    let animationFrameId;

    const render = () => {
      if (game.qtnInicial > 0) {
        game.asteroids.push(new Asteroid(game.difficult));
        game.qtnInicial--;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);

      game.update();

      if (game.state) {
        animationFrameId = window.requestAnimationFrame(render);
      } else {
        clearInterval(time);
        window.cancelAnimationFrame(animationFrameId);
      }
    };
    render();

    return () => {
      clearInterval(time);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={ref} {...prop}></canvas>;
};
