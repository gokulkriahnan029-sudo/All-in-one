
import { useState, useEffect } from "react";

const Flappy_Game = () => {


   const [birdY, setBirdY] = useState(50); // bird position
  const [velocity, setVelocity] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const gravity = 0.5;
  const jump = -8;
  const gameWidth = 400;
  const gameHeight = 400;
  const obstacleWidth = 40;
  const gapHeight = 120;

  // 🕹️ Start Game
  function startGame() {
    setBirdY(50);
    setVelocity(0);
    setObstacles([{ x: 400, gapY: Math.random() * 200 + 50 }]);
    setScore(0);
    setGameOver(false);
    setIsRunning(true);
  }

  // 🕹️ Handle jump
  function flap() {
    if (!isRunning) return;
    setVelocity(jump);
  }

  // 🕹️ Keyboard jump
  useEffect(() => {
    function handleKey(e) {
      if (e.key === " " || e.key === "ArrowUp") flap();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isRunning]);

  // 🕹️ Game loop
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setBirdY((y) => Math.max(0, y + velocity));
      setVelocity((v) => v + gravity);

      setObstacles((obs) =>
        obs
          .map((o) => ({ ...o, x: o.x - 5 }))
          .filter((o) => o.x + obstacleWidth > 0)
      );

      // Add new obstacle
      if (obstacles[obstacles.length - 1]?.x < 200) {
        setObstacles((obs) => [
          ...obs,
          { x: 400, gapY: Math.random() * 200 + 50 },
        ]);
      }

      // Collision detection
      obstacles.forEach((o) => {
        if (
          20 + 20 > o.x && // bird width 20
          20 < o.x + obstacleWidth &&
          (birdY < o.gapY || birdY + 20 > o.gapY + gapHeight)
        ) {
          setGameOver(true);
          setIsRunning(false);
        }
      });

      // Score
      obstacles.forEach((o) => {
        if (o.x === 0) setScore((s) => s + 1);
      });

      // Hit ground
      if (birdY + 20 >= gameHeight) {
        setGameOver(true);
        setIsRunning(false);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [velocity, birdY, obstacles, isRunning]);

return (
           <div className="game" style={{ textAlign: "center", fontFamily: "Arial", marginTop: 20 }}>
      <h1>🕊️ Flappy Game</h1>
      {!isRunning && !gameOver && (
        <button onClick={startGame}>▶️ Start Game</button>
      )}

      {gameOver && (
        <div>
          <h2 style={{ color: "red" }}>Game Over! Score: {score}</h2>
          <button onClick={startGame}>🔄 Restart</button>
        </div>
      )}

      <div
        style={{
          position: "relative",
          width: gameWidth,
          height: gameHeight,
          background: "#87CEEB",
          margin: "20px auto",
          overflow: "hidden",
          borderRadius: "10px",
        }}
        onClick={flap} // click to flap
      >
        {/* Bird */}
        <div
          style={{
            position: "absolute",
            width: 20,
            height: 20,
            background: "yellow",
            borderRadius: "50%",
            left: 50,
            top: birdY,
          }}
        ></div>

        {/* Obstacles */}
        {obstacles.map((o, i) => (
          <div key={i}>
            <div
              style={{
                position: "absolute",
                width: obstacleWidth,
                height: o.gapY,
                background: "green",
                left: o.x,
                top: 0,
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                width: obstacleWidth,
                height: gameHeight - o.gapY - gapHeight,
                background: "green",
                left: o.x,
                top: o.gapY + gapHeight,
              }}
            ></div>
          </div>
        ))}
      </div>
      <h3>Score: {score}</h3>
      <p>Press Space / ↑ or Click the game area to flap!</p>
    </div>
)
}

export default Flappy_Game;