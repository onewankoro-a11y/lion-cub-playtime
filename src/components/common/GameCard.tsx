import { cn } from '@/lib/utils';
import { useSound } from '@/hooks/useSound';
import { Lock } from 'lucide-react';

interface GameCardProps {
  title: string;
  icon: string;
  color: string;
  isAvailable: boolean;
  onClick: () => void;
}

export const GameCard = ({
  title,
  icon,
  color,
  isAvailable,
  onClick,
}: GameCardProps) => {
  const { playSound } = useSound();

  const handleClick = () => {
    if (isAvailable) {
      playSound('pop');
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={!isAvailable}
      className={cn(
        'game-card relative flex flex-col items-center justify-center',
        'w-full aspect-square rounded-3xl',
        'shadow-lg border-4 border-white/50',
        'transition-all duration-200',
        color,
        isAvailable
          ? 'cursor-pointer hover:shadow-xl active:scale-95'
          : 'opacity-60 cursor-not-allowed'
      )}
    >
      <span className="text-5xl md:text-6xl mb-2">{icon}</span>
      <span className="text-sm md:text-base font-bold text-foreground/80 px-2 text-center leading-tight">
        {title}
      </span>
      
      {!isAvailable && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-3xl">
          <Lock className="w-8 h-8 text-white/80" />
        </div>
      )}
    </button>
  );
};
