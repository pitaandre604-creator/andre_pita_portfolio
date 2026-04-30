import { useState, useEffect } from 'react';
import { AlertTriangle, Shield, Zap } from 'lucide-react';

export default function VirusAttackOverlay() {
  const [isAttacking, setIsAttacking] = useState(false);
  const [message, setMessage] = useState('');
  const [threatLevel, setThreatLevel] = useState(0);

  const attackMessages = [
    '🚨 ATAQUE DDoS DETECTADO!',
    '⚠️ Eliminando backdoors...',
    '🛡️ Neutralizando trojans...',
    '💻 Desintegrando malware...',
    '🔥 Bloqueando worms...',
    '⚡ Eliminando ransomware...',
    '🎯 Neutralizando spyware...',
    '🔐 Eliminando rootkits...',
    '💥 Desativando botnets...',
    '✅ Sistema protegido!',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAttacking(true);
      setThreatLevel(Math.floor(Math.random() * 100) + 1);

      let messageIndex = 0;
      const messageInterval = setInterval(() => {
        if (messageIndex < attackMessages.length) {
          setMessage(attackMessages[messageIndex]);
          messageIndex++;
        } else {
          clearInterval(messageInterval);
          setTimeout(() => setIsAttacking(false), 500);
        }
      }, 300);

      return () => clearInterval(messageInterval);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  if (!isAttacking) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Glitch effect background */}
      <div className="absolute inset-0 bg-neon-dark/80 backdrop-blur-sm animate-pulse" />

      {/* Scanlines effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 217, 255, 0.15) 0px, rgba(0, 217, 255, 0.15) 1px, transparent 1px, transparent 2px)',
        }}
      />

      {/* Red alert lines */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-neon-magenta to-transparent animate-pulse" />
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-neon-magenta to-transparent animate-pulse" />
        <div className="absolute bottom-1/4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-neon-magenta to-transparent animate-pulse" />
      </div>

      {/* Central warning box */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
        <div className="max-w-md w-full mx-4 bg-neon-dark border-4 border-neon-magenta rounded-lg p-8 shadow-2xl"
          style={{
            boxShadow: '0 0 30px rgba(255, 0, 110, 0.8), inset 0 0 20px rgba(255, 0, 110, 0.2)',
          }}
        >
          {/* Alert header */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <AlertTriangle className="w-8 h-8 text-neon-magenta animate-bounce" />
            <h2 className="text-2xl font-bold text-neon-magenta">ALERTA DE SEGURANÇA</h2>
            <AlertTriangle className="w-8 h-8 text-neon-magenta animate-bounce" />
          </div>

          {/* Threat level */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-neon-cyan font-bold">Nível de Ameaça:</span>
              <span className="text-neon-magenta font-bold">{threatLevel}%</span>
            </div>
            <div className="w-full bg-neon-dark border border-neon-cyan rounded overflow-hidden">
              <div
                className="h-4 bg-gradient-to-r from-neon-green via-neon-cyan to-neon-magenta transition-all duration-300"
                style={{ width: `${threatLevel}%` }}
              />
            </div>
          </div>

          {/* Main message */}
          <div className="text-center mb-6 p-4 bg-neon-magenta/10 border border-neon-magenta rounded">
            <p className="text-neon-magenta font-bold text-lg h-8 flex items-center justify-center">
              {message}
            </p>
          </div>

          {/* Status messages */}
          <div className="space-y-2 mb-6 text-sm font-mono">
            <div className="text-neon-green flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Firewall ativo</span>
            </div>
            <div className="text-neon-cyan flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Antivírus em execução</span>
            </div>
            <div className="text-neon-magenta flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Programador André Pita defendendo...</span>
            </div>
          </div>

          {/* Terminal-style output */}
          <div className="bg-neon-dark border border-neon-cyan rounded p-3 text-xs font-mono text-neon-cyan mb-6 max-h-24 overflow-y-auto">
            <div>&gt; Analisando tráfego de rede...</div>
            <div>&gt; Bloqueando IPs maliciosos...</div>
            <div>&gt; Eliminando payloads...</div>
            <div>&gt; Sistema protegido ✓</div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground">
            <p>Seu site está seguro sob proteção</p>
            <p className="text-neon-green font-bold mt-1">Programador André Pita - Segurança em Primeiro Lugar</p>
          </div>
        </div>
      </div>

      {/* Corner glitch effects */}
      <div className="absolute top-0 left-0 w-20 h-20 border-2 border-neon-cyan opacity-50" />
      <div className="absolute top-0 right-0 w-20 h-20 border-2 border-neon-magenta opacity-50" />
      <div className="absolute bottom-0 left-0 w-20 h-20 border-2 border-neon-magenta opacity-50" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-2 border-neon-cyan opacity-50" />
    </div>
  );
}
