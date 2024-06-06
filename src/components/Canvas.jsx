"use client";

import React, { useEffect, useRef, useState } from "react";
import { Asteroid } from "@/Config/Asteroid";
import { Rocket } from "@/Config/Rocket";
import { Game } from "@/Config/Game";

export default (props) => {
  const ref = useRef();

  const { setPontuation } = props;

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  function handleMouseMove(event) {
    const canvas = event.target;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const mouseX = (event.clientX - rect.left) * scaleX;
    const mouseY = (event.clientY - rect.top) * scaleY;

    if (mouseX != "undefined" || mouseY != "undefined")
      setMouse({ x: Math.floor(mouseX), y: Math.floor(mouseY) });
  }

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext("2d");

    let score = 1;

    let time = setInterval((e) => {
      setPontuation({
        stage: 1,
        score: score,
      });
      score++;
    }, 1000);

    let animationFrameId;

    Asteroid.prototype.ctx = context;
    Rocket.prototype.ctx = context;

    const game = new Game(Rocket);

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

  return <canvas onMouseMove={handleMouseMove} ref={ref} {...props}></canvas>;
};
