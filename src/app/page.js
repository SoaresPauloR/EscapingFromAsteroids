"use client";

import Canvas from "@/components/Canvas";
import { useState } from "react";

export default function Home() {
  const [pontuation, setPontuation] = useState({ level: 1, score: 0 });

  return (
    <section className="main">
      <div className="title">
        <h1>Escaping from Asteroids</h1>
      </div>

      <div className="center">
        <div className="objective">
          <h3>Objective of the Game:</h3>
          <p>Escape from the asteroids and survive as long as possible.</p>
        </div>
        <Canvas
          className="canvas"
          width={800}
          height={400}
          setPontuation={setPontuation}
        ></Canvas>
        <div className="rules">
          <h3>Rules:</h3>
          <ul className="list-disc ml-8">
            <li>Avoid colliding with asteroids</li>
            <li>If you stay still for too long there will be a penalty.</li>
            <li>The score is equivalent to survival time</li>
            <li>The phase change will occur every 10 seconds</li>
            <li>With each phase the number of asteroids will increase</li>
          </ul>
        </div>
      </div>
      <div className="foot">
        <div className="potuation">
          <div className="level">Level: {pontuation.level}</div>
          <div className="score">Score: {pontuation.score}</div>
        </div>
        <div className="how-play">
          <div className="keys">
            <div>
              <div className="key">w</div>
            </div>
            <div>
              <div className="key">a</div>
              <div className="key">s</div>
              <div className="key">d</div>
            </div>
          </div>
          <h1>Ou</h1>
          <div className="keys">
            <div>
              <div className="key">↑</div>
            </div>
            <div>
              <div className="key">←</div>
              <div className="key">↓</div>
              <div className="key">→</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
