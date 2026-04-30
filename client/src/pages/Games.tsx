import { useState } from 'react';
import { ArrowLeft, Gamepad2 } from 'lucide-react';
import { Link } from 'wouter';
import SnakeGame from '@/components/games/SnakeGame';
import FlappyBirdGame from '@/components/games/FlappyBirdGame';
import ReactionGame from '@/components/games/ReactionGame';
import MemoryGame from '@/components/games/MemoryGame';

/**
 * DESIGN PHILOSOPHY: Cyberpunk Neon Futurista
 * Página de jogos interativos com tema neon, engajamento do usuário
 * e estratégia de permanência no site
 */

export default function Games() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const games = [
    {
      id: 'snake',
      name: 'Snake Game',
      description: 'O clássico jogo da cobrinha com visual neon futurista',
      emoji: '🐍',
      component: SnakeGame,
    },
    {
      id: 'flappy',
      name: 'Flappy Bird',
      description: 'Desvie dos canos e teste suas habilidades',
      emoji: '🐦',
      component: FlappyBirdGame,
    },
    {
      id: 'reaction',
      name: 'Reaction Time',
      description: 'Teste sua velocidade de reação',
      emoji: '⚡',
      component: ReactionGame,
    },
    {
      id: 'memory',
      name: 'Memory Game',
      description: 'Encontre os pares e teste sua memória',
      emoji: '🧠',
      component: MemoryGame,
    },
  ];

  if (selectedGame) {
    const game = games.find((g) => g.id === selectedGame);
    if (!game) return null;

    const GameComponent = game.component;

    return (
      <div className="min-h-screen bg-background text-foreground pt-20">
        <div className="container py-8">
          <button
            onClick={() => setSelectedGame(null)}
            className="flex items-center gap-2 text-neon-cyan hover:text-neon-cyan/80 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar aos Jogos
          </button>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-neon-green">{game.emoji}</span> {game.name}
            </h1>
            <p className="text-muted-foreground">{game.description}</p>
          </div>

          <div className="flex justify-center">
            <GameComponent />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-neon-magenta">GAMES</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Divirta-se enquanto conhece meu trabalho. Estes jogos foram desenvolvidos com as mesmas tecnologias que uso em projetos profissionais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => setSelectedGame(game.id)}
              className="group relative p-8 bg-card border neon-border rounded-lg hover:neon-glow transition-all duration-300 text-left"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 to-neon-magenta/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="text-5xl mb-4">{game.emoji}</div>
                <h3 className="text-2xl font-bold text-neon-green mb-2">{game.name}</h3>
                <p className="text-muted-foreground mb-4">{game.description}</p>
                <div className="flex items-center gap-2 text-neon-cyan group-hover:gap-3 transition-all">
                  <span>Jogar Agora</span>
                  <Gamepad2 className="w-4 h-4" />
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="bg-card border neon-border rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-neon-cyan mb-4">Desenvolvido com Tecnologia de Ponta</h2>
          <p className="text-muted-foreground mb-4">
            Estes jogos foram criados usando React, TypeScript e HTML5 Canvas - as mesmas tecnologias que uso em projetos profissionais para empresas reais.
          </p>
          <Link href="/">
            <a className="inline-block bg-neon-green hover:bg-neon-green/80 text-neon-dark font-bold py-3 px-6 rounded transition-all">
              Voltar ao Portfólio
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
