import { useState, useEffect, useRef } from 'react';
import { RotateCcw } from 'lucide-react';

export default function FlappyBirdGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const gameStateRef = useRef({
    bird: { x: 50, y: 150, width: 20, height: 20, velocity: 0 },
    pipes: [] as Array<{ x: number; gapY: number }>,
    score: 0,
    gameOver: false,
    pipeSpacing: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !gameStarted) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gravity = 0.5;
    const pipeGap = 120;
    const pipeWidth = 60;

    const drawGame = () => {
      const state = gameStateRef.current;

      // Clear canvas
      ctx.fillStyle = '#0a0e27';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw background grid
      ctx.strokeStyle = 'rgba(0, 217, 255, 0.1)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }

      // Draw bird
      ctx.fillStyle = '#39ff14';
      ctx.shadowColor = 'rgba(57, 255, 20, 0.8)';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(state.bird.x, state.bird.y, state.bird.width / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowColor = 'transparent';

      // Draw pipes
      ctx.fillStyle = '#ff006e';
      ctx.shadowColor = 'rgba(255, 0, 110, 0.6)';
      ctx.shadowBlur = 8;
      state.pipes.forEach((pipe) => {
        // Top pipe
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.gapY);
        // Bottom pipe
        ctx.fillRect(pipe.x, pipe.gapY + pipeGap, pipeWidth, canvas.height - (pipe.gapY + pipeGap));
      });
      ctx.shadowColor = 'transparent';

      // Draw score
      ctx.fillStyle = '#00d9ff';
      ctx.font = 'bold 24px Space Mono';
      ctx.shadowColor = 'rgba(0, 217, 255, 0.5)';
      ctx.shadowBlur = 8;
      ctx.fillText(`Score: ${state.score}`, 20, 40);
      ctx.shadowColor = 'transparent';
    };

    const updateGame = () => {
      const state = gameStateRef.current;
      if (state.gameOver) return;

      // Apply gravity
      state.bird.velocity += gravity;
      state.bird.y += state.bird.velocity;

      // Check boundaries
      if (state.bird.y - state.bird.width / 2 < 0 || state.bird.y + state.bird.width / 2 > canvas.height) {
        state.gameOver = true;
        setGameOver(true);
        return;
      }

      // Move pipes
      state.pipes = state.pipes.filter((pipe) => pipe.x + pipeWidth > 0);
      state.pipes.forEach((pipe) => {
        pipe.x -= 5;
      });

      // Add new pipe
      state.pipeSpacing++;
      if (state.pipeSpacing > 120) {
        state.pipes.push({
          x: canvas.width,
          gapY: Math.random() * (canvas.height - pipeGap - 100) + 50,
        });
        state.pipeSpacing = 0;
      }

      // Check collisions
      state.pipes.forEach((pipe) => {
        if (
          state.bird.x + state.bird.width / 2 > pipe.x &&
          state.bird.x - state.bird.width / 2 < pipe.x + pipeWidth
        ) {
          if (
            state.bird.y - state.bird.width / 2 < pipe.gapY ||
            state.bird.y + state.bird.width / 2 > pipe.gapY + pipeGap
          ) {
            state.gameOver = true;
            setGameOver(true);
            return;
          }

          // Passed pipe
          if (pipe.x + pipeWidth === state.bird.x) {
            state.score++;
            setScore(state.score);
          }
        }
      });
    };

    const gameLoop = setInterval(() => {
      updateGame();
      drawGame();
    }, 30);

    const handleClick = () => {
      gameStateRef.current.bird.velocity = -10;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        gameStateRef.current.bird.velocity = -10;
        e.preventDefault();
      }
    };

    canvas.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(gameLoop);
      canvas.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameStarted]);

  const startGame = () => {
    gameStateRef.current = {
      bird: { x: 50, y: 150, width: 20, height: 20, velocity: 0 },
      pipes: [],
      score: 0,
      gameOver: false,
      pipeSpacing: 0,
    };
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-card border neon-border rounded-lg">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold text-neon-cyan mb-2">FLAPPY BIRD</h3>
      </div>

      <canvas
        ref={canvasRef}
        width={300}
        height={400}
        className="w-full border neon-border rounded mb-4 cursor-pointer bg-neon-dark"
      />

      {!gameStarted && !gameOver && (
        <div className="text-center mb-4 p-4 bg-neon-cyan/10 border border-neon-cyan rounded">
          <p className="text-neon-cyan font-bold">Clique no jogo ou pressione ESPAÇO para começar</p>
        </div>
      )}

      {gameOver && (
        <div className="text-center mb-4 p-4 bg-neon-magenta/10 border border-neon-magenta rounded">
          <p className="text-neon-magenta font-bold">GAME OVER! Pontuação: {score}</p>
        </div>
      )}

      <div className="flex gap-2">
        {!gameStarted && (
          <button
            onClick={startGame}
            className="flex-1 bg-neon-green hover:bg-neon-green/80 text-neon-dark font-bold py-2 rounded transition-all"
          >
            Começar
          </button>
        )}
        {gameStarted && (
          <button
            onClick={resetGame}
            className="flex-1 bg-neon-magenta hover:bg-neon-magenta/80 text-white font-bold py-2 rounded transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Sair
          </button>
        )}
      </div>
    </div>
  );
}
