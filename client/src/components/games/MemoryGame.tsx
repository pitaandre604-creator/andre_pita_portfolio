import { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';

interface Card {
  id: number;
  value: string;
  flipped: boolean;
  matched: boolean;
}

export default function MemoryGame() {
  const symbols = ['🎮', '💻', '⚡', '🔥', '🌟', '💡', '🚀', '🎯'];
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const gameCards = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((value, id) => ({ id, value, flipped: false, matched: false }));
    setCards(gameCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
  };

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first].value === cards[second].value) {
        setMatched([...matched, first, second]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 600);
      }
      setMoves(moves + 1);
    }
  }, [flipped]);

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setGameWon(true);
    }
  }, [matched, cards.length]);

  const handleCardClick = (id: number) => {
    if (flipped.includes(id) || matched.includes(id) || flipped.length === 2) return;
    setFlipped([...flipped, id]);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-card border neon-border rounded-lg">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-neon-magenta mb-2">MEMORY GAME</h3>
        <div className="flex justify-around text-sm">
          <div className="text-neon-cyan">Movimentos: <span className="font-bold">{moves}</span></div>
          <div className="text-neon-green">Pares: <span className="font-bold">{matched.length / 2}/8</span></div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square rounded text-2xl font-bold transition-all duration-300 transform hover:scale-105 ${
              flipped.includes(card.id) || matched.includes(card.id)
                ? 'bg-neon-cyan/20 border border-neon-cyan neon-glow'
                : 'bg-neon-card border border-neon-magenta/50 hover:border-neon-magenta'
            }`}
          >
            {flipped.includes(card.id) || matched.includes(card.id) ? card.value : '?'}
          </button>
        ))}
      </div>

      {gameWon && (
        <div className="text-center mb-4 p-4 bg-neon-green/10 border border-neon-green rounded">
          <p className="text-neon-green font-bold">🎉 VITÓRIA! Você completou em {moves} movimentos!</p>
        </div>
      )}

      <button
        onClick={initializeGame}
        className="w-full bg-neon-green hover:bg-neon-green/80 text-neon-dark font-bold py-2 rounded transition-all flex items-center justify-center gap-2"
      >
        <RotateCcw className="w-4 h-4" />
        Novo Jogo
      </button>
    </div>
  );
}
