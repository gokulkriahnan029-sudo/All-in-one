import { useState, useEffect } from "react";

const Snake_Game = () => {

    const gridSize = 15;
  const initialSnake = [{ x: 7, y: 7 }];

  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(randomFood());
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  function randomFood() {
    return {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
  }

  // Keyboard controls
  useEffect(() => {
    function handleKey(e) {
      if (!isRunning) return;
      switch (e.key) {
        case "ArrowUp":
        case "w":
          setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
        case "s":
          setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
        case "a":
          setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
        case "d":
          setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isRunning]);

  // Game loop
  useEffect(() => {
    if (!isRunning || gameOver) return;

    const interval = setInterval(() => {
      setSnake((prev) => {
        const newSnake = [...prev];
        const head = {
          x: (newSnake[0].x + direction.x + gridSize) % gridSize,
          y: (newSnake[0].y + direction.y + gridSize) % gridSize,
        };

        // Collision with itself
        if (newSnake.some((s) => s.x === head.x && s.y === head.y)) {
          setGameOver(true);
          setIsRunning(false);
          return prev;
        }

        newSnake.unshift(head);

        // Eating food
        if (head.x === food.x && head.y === food.y) {
          setFood(randomFood());
          setScore((prevScore) => prevScore + 1);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [direction, food, gameOver, isRunning]);

  function startGame() {
    setSnake(initialSnake);
    setFood(randomFood());
    setDirection({ x: 0, y: 0 });
    setScore(0);
    setGameOver(false);
    setIsRunning(true);
  }

  function restartGame() {
    startGame();
  }

  function move(dir) {
    if (!isRunning) return;
    if (dir === "up") setDirection({ x: 0, y: -1 });
    if (dir === "down") setDirection({ x: 0, y: 1 });
    if (dir === "left") setDirection({ x: -1, y: 0 });
    if (dir === "right") setDirection({ x: 1, y: 0 });
  }



    return (
        <>
            <div style={{ textAlign: "center", fontFamily: "Arial", marginTop: 20 }}>
      <h1>🐍 Snake Game</h1>

      {!isRunning && !gameOver && (
        <button onClick={startGame} style={{ padding: "10px 20px", marginBottom: 10 }}>
          ▶️ Start Game
        </button>
      )}

      <h2>Score: {score}</h2>

      {gameOver && (
        <div>
          <h2 style={{ color: "red" }}>Game Over!</h2>
          <button onClick={restartGame}>🔄 Restart</button>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 20px)`,
          gridTemplateRows: `repeat(${gridSize}, 20px)`,
          gap: "1px",
          margin: "auto",
          background: "#ccc",
          width: gridSize * 21,
        }}
      >
        {Array.from({ length: gridSize * gridSize }).map((_, i) => {
          const x = i % gridSize;
          const y = Math.floor(i / gridSize);
          const isSnake = snake.some((s) => s.x === x && s.y === y);
          const isFood = food.x === x && food.y === y;

          return (
            <div
              key={i}
              style={{
                width: 20,
                height: 20,
                background: isSnake ? "green" : isFood ? "red" : "white",
              }}
            />
          );
        })}
      </div>

      {isRunning && !gameOver && (
        <div style={{ marginTop: 20 }}>
          <button onClick={() => move("up")}>⬆️</button>
          <div>
            <button onClick={() => move("left")}>⬅️</button>
            <button onClick={() => move("down")}>⬇️</button>
            <button onClick={() => move("right")}>➡️</button>
          </div>
        </div>
      )}
    </div>
        </>
    )
}

export default Snake_Game;