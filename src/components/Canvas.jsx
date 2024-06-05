"use client";

import React, { useEffect, useRef } from "react";
import { Asteroid } from "@/Config/Asteroid";
import { Game } from "@/Config/Game";

export default (props) => {
  const ref = useRef();
  const asteroides = useRef([]); // Usar useRef para manter a referência dos asteroides

  const imgAsteroid = new Image();
  imgAsteroid.src = "asteroid.png";

  const draw = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (const asteroide of asteroides.current) {
      checkCollision(asteroide);

      ctx.beginPath();

      ctx.drawImage(
        imgAsteroid,
        asteroide.x,
        asteroide.y,
        asteroide.radius.value * 2,
        asteroide.radius.value * 2
      );

      asteroide.move();

      ctx.stroke();
    }
  };

  function checkCollision(asteroide) {
    for (const asteroide2 of asteroides.current) {
      if (asteroide === asteroide2) continue;

      const cateto1 = asteroide.x - asteroide2.x;
      const cateto2 = asteroide.y - asteroide2.y;
      const distancia = Math.sqrt(cateto1 * cateto1 + cateto2 * cateto2);

      if (distancia < asteroide.radius.value + asteroide2.radius.value) {
        const dx = asteroide.x - asteroide2.x;
        const dy = asteroide.y - asteroide2.y;
        const angle = Math.atan2(dy, dx);

        // Atualizar a direção do círculo
        asteroide2.angle = angle + Math.PI;
        // Atualizar a direção do outro círculo
        asteroide.angle = angle;

        asteroide.calcMove();
        asteroide2.calcMove();
      }
    }
  }

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext("2d");

    for (let i = 0; i < Game.qtnInicial; i++) {}

    let animationFrameId;

    const render = () => {
      if (Game.qtnInicial > 0) {
        asteroides.current.push(new Asteroid(Game.level, canvas));
        Game.qtnInicial--;
      }
      draw(context);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={ref} {...props}></canvas>;
};
