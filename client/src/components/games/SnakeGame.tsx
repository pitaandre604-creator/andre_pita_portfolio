import { useState, useEffect, useRef } from 'react';
import { RotateCcw } from 'lucide-react';

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameActive, setGameActive] = useState(true);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameStateRef = useRef({
    snake: [{ x: 10, y: 10 }],
    food: { x: 15, y: 15 },
    direction: { x: 1, y: 0 },
    nextDirection: { x: 1, y: 0 },
    score: 0,
    gameOver: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gridSize = 20;
    const tileCount = canvas.width / gridSize;

    const drawGame = () => {
      const state = gameStateRef.current;

      // Clear canvas
      ctx.fillStyle = '#0a0e27';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = 'rgba(0, 217, 255, 0.1)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= tileCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
      }

      // Draw snake
      state.snake.forEach((segment, index) => {
        if (index === 0) {
          ctx.fillStyle = '#39ff14';
          ctx.shadowColor = 'rgba(57, 255, 20, 0.8)';
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = '#00d9ff';
          ctx.shadowColor = 'rgba(0, 217, 255, 0.5)';
          ctx.shadowBlur = 5;
        }
        ctx.fillRect(segment.x * gridSize + 1, segment.y * gridSize + 1, gridSize - 2, gridSize - 2);
      });
      ctx.shadowColor = 'transparent';

      // Draw food
      ctx.fillStyle = '#ff006e';
      ctx.shadowColor = 'rgba(255, 0, 110, 0.8)';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(state.food.x * gridSize + gridSize / 2, state.food.y * gridSize + gridSize / 2, gridSize / 2 - 1, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowColor = 'transparent';
    };

    const updateGame = () => {
      const state = gameStateRef.current;
      if (state.gameOver || !gameActive) return;

      state.direction = state.nextDirection;
      const head = state.snake[0];
      const newHead = { x: head.x + state.direction.x, y: head.y + state.direction.y };

      // Check collisions
      if (newHead.x < 0 || newHead.x >= tileCount || newHead.y < 0 || newHead.y >= tileCount) {
        state.gameOver = true;
        setGameOver(true);
        return;
      }

      for (let segment of state.snake) {
        if (newHead.x === segment.x && newHead.y === segment.y) {
          state.gameOver = true;
          setGameOver(true);
          return;
        }
      }

      state.snake.unshift(newHead);

      // Check food collision
      if (newHead.x === state.food.x && newHead.y === state.food.y) {
        state.score += 10;
        setScore(state.score);
        state.food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
      } else {
        state.snake.pop();
      }
    };

    const gameLoop = setInterval(() => {
      updateGame();
      drawGame();
    }, 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      const state = gameStateRef.current;
      switch (e.key) {
        case 'ArrowUp':
          if (state.direction.y === 0) state.nextDirection = { x: 0, y: -1 };
          e.preventDefault();
          break;
        case 'ArrowDown':
          if (state.direction.y === 0) state.nextDirection = { x: 0, y: 1 };
          e.preventDefault();
          break;
        case 'ArrowLeft':
          if (state.direction.x === 0) state.nextDirection = { x: -1, y: 0 };
          e.preventDefault();
          break;
        case 'ArrowRight':
          if (state.direction.x === 0) state.nextDirection = { x: 1, y: 0 };
          e.preventDefault();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(gameLoop);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameActive]);

  const resetGame = () => {
    gameStateRef.current = {
      snake: [{ x: 10, y: 10 }],
      food: { x: 15, y: 15 },
      direction: { x: 1, y: 0 },
      nextDirection: { x: 1, y: 0 },
      score: 0,
      gameOver: false,
    };
    setScore(0);
    setGameOver(false);
    setGameActive(true);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-card border neon-border rounded-lg">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold text-neon-green mb-2">SNAKE GAME</h3>
        <div className="text-neon-cyan font-bold">Pontuação: {score}</div>
      </div>

      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="w-full border neon-border rounded mb-4"
      />

      {gameOver && (
        <div className="text-center mb-4 p-4 bg-neon-magenta/10 border border-neon-magenta rounded">
          <p className="text-neon-magenta font-bold">GAME OVER! Pontuação final: {score}</p>
        </div>
      )}

      <div className="text-center text-xs text-muted-foreground mb-4">
        Use as setas do teclado para controlar
      </div>

      <button
        onClick={resetGame}
        className="w-full bg-neon-green hover:bg-neon-green/80 text-neon-dark font-bold py-2 rounded transition-all flex items-center justify-center gap-2"
      >
        <RotateCcw className="w-4 h-4" />
        Novo Jogo
      </button>
    </div>
  );
}
