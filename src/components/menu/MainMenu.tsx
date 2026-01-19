import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameList } from '@/data/gameList';
import { GameCard } from '@/components/common/GameCard';
import { LionCharacter } from '@/components/common/LionCharacter';
import { Footer } from './Footer';
import { ParentalGate } from './ParentalGate';
import { SettingsModal } from '@/components/settings/SettingsModal';
import { ParentSettings } from '@/components/settings/ParentSettings';

export const MainMenu = () => {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const [showParentalGate, setShowParentalGate] = useState(false);
  const [showParentSettings, setShowParentSettings] = useState(false);

  const handleGameClick = (path: string) => {
    navigate(path);
  };

  const handleParentalSuccess = () => {
    setShowParentSettings(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(var(--pastel-yellow))] via-[hsl(var(--pastel-pink)/0.3)] to-[hsl(var(--pastel-blue)/0.3)] flex flex-col">
      {/* Header with Lion */}
      <header className="py-6 px-4 flex flex-col items-center">
        <LionCharacter size="lg" />
        <h1 className="text-2xl md:text-3xl font-bold text-primary mt-2">
          ライオンくんとあそぼ！
        </h1>
      </header>

      {/* Game Grid */}
      <main className="flex-1 px-4 pb-4">
        <div className="max-w-2xl mx-auto grid grid-cols-3 gap-3 md:gap-4">
          {gameList.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              icon={game.icon}
              color={game.color}
              isAvailable={game.isAvailable}
              onClick={() => handleGameClick(game.path)}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer
        onSettingsClick={() => setShowSettings(true)}
        onParentalClick={() => setShowParentalGate(true)}
      />

      {/* Modals */}
      <SettingsModal open={showSettings} onOpenChange={setShowSettings} />
      <ParentalGate
        open={showParentalGate}
        onOpenChange={setShowParentalGate}
        onSuccess={handleParentalSuccess}
      />
      <ParentSettings
        open={showParentSettings}
        onOpenChange={setShowParentSettings}
      />
    </div>
  );
};
