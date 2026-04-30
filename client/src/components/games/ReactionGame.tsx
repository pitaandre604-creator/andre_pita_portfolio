import { useState } from 'react';
import { RotateCcw, Zap } from 'lucide-react';

export default function ReactionGame() {
  const [gameState, setGameState] = useState<'idle' | 'waiting' | 'ready' | 'playing' | 'result'>('idle');
  const [reactionTime, setReactionTime] = useState(0);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [startTime, setStartTime] = useState(0);

  const startGame = () => {
    setGameState('waiting');
    setMessage('Aguarde a cor mudar...');
    const delay = Math.random() * 3000 + 1000;

    const timer = setTimeout(() => {
      setGameState('ready');
      setMessage('CLIQUE AGORA!');
      setStartTime(Date.now());
    }, delay);

    return () => clearTimeout(timer);
  };

  const handleClick = () => {
    if (gameState === 'ready') {
      const time = Date.now() - startTime;
      setReactionTime(time);
      setGameState('result');
      setMessage(`Seu tempo: ${time}ms`);

      if (bestTime === null || time < bestTime) {
        setBestTime(time);
      }
    } else if (gameState === 'waiting') {
      setGameState('result');
      setMessage('Clicou cedo demais! ⚡');
      setReactionTime(0);
    }
  };

  const resetGame = () => {
    setGameState('idle');
    setReactionTime(0);
    setMessage('');
  };

  const getButtonClass = () => {
    if (gameState === 'waiting') {
      return 'bg-neon-cyan/20 border-2 border-neon-cyan text-neon-cyan neon-glow';
    } else if (gameState === 'ready') {
      return 'bg-neon-green/20 border-2 border-neon-green text-neon-green neon-glow-green animate-pulse';
    } else {
      return 'bg-neon-card border-2 border-neon-magenta/50 text-muted-foreground hover:border-neon-magenta';
    }
  };

  const getButtonText = () => {
    if (gameState === 'idle') return 'Clique para começar';
    if (gameState === 'waiting') return 'Aguardando...';
    if (gameState === 'ready') return 'CLIQUE!';
    return 'Pronto?';
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-card border neon-border rounded-lg">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-neon-magenta mb-2">REACTION TIME</h3>
        {bestTime !== null && (
          <div className="text-sm text-neon-green">Melhor tempo: {bestTime}ms</div>
        )}
      </div>

      <button
        onClick={handleClick}
        disabled={gameState === 'idle' || gameState === 'result'}
        className={`w-full aspect-square rounded-lg mb-6 font-bold text-2xl transition-all transform hover:scale-105 disabled:hover:scale-100 ${getButtonClass()}`}
      >
        {getButtonText()}
      </button>

      {message && (
        <div className={`text-center mb-6 p-4 rounded border ${
          gameState === 'result' && reactionTime > 0
            ? 'bg-neon-green/10 border-neon-green text-neon-green'
            : 'bg-neon-magenta/10 border-neon-magenta text-neon-magenta'
        }`}>
          <p className="font-bold">{message}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="p-3 bg-neon-cyan/10 border border-neon-cyan rounded text-center">
          <div className="text-xs text-muted-foreground mb-1">Tempo Atual</div>
          <div className="text-xl font-bold text-neon-cyan">{reactionTime}ms</div>
        </div>
        <div className="p-3 bg-neon-green/10 border border-neon-green rounded text-center">
          <div className="text-xs text-muted-foreground mb-1">Melhor Tempo</div>
          <div className="text-xl font-bold text-neon-green">{bestTime ? `${bestTime}ms` : '-'}</div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={startGame}
          disabled={gameState !== 'idle' && gameState !== 'result'}
          className="flex-1 bg-neon-green hover:bg-neon-green/80 disabled:opacity-50 text-neon-dark font-bold py-2 rounded transition-all flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4" />
          {gameState === 'idle' ? 'Começar' : 'Novo Teste'}
        </button>
        <button
          onClick={resetGame}
          className="flex-1 bg-neon-magenta hover:bg-neon-magenta/80 text-white font-bold py-2 rounded transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Limpar
        </button>
      </div>

      <div className="mt-6 p-4 bg-neon-dark border border-neon-border rounded text-xs text-muted-foreground">
        <p className="font-bold text-neon-cyan mb-2">Como jogar:</p>
        <ol className="space-y-1 list-decimal list-inside">
          <li>Clique em Começar</li>
          <li>Aguarde a cor mudar para verde</li>
          <li>Clique o mais rápido possível</li>
          <li>Seu tempo será registrado</li>
        </ol>
      </div>
    </div>
  );
}
