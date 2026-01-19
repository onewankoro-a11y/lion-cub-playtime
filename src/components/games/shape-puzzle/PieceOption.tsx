import { cn } from '@/lib/utils';
import { useState } from 'react';

interface PieceOptionProps {
  emoji: string;
  name: string;
  color: string;
  isCorrect: boolean;
  disabled: boolean;
  onSelect: (isCorrect: boolean) => void;
}

export const PieceOption = ({
  emoji,
  name,
  color,
  isCorrect,
  disabled,
  onSelect,
}: PieceOptionProps) => {
  const [isShaking, setIsShaking] = useState(false);
  const [isMerging, setIsMerging] = useState(false);

  const handleClick = () => {
    if (disabled) return;

    if (isCorrect) {
      setIsMerging(true);
      setTimeout(() => {
        onSelect(true);
      }, 400);
    } else {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
        onSelect(false);
      }, 500);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        'w-full aspect-square rounded-3xl',
        'flex flex-col items-center justify-center gap-2',
        'shadow-lg border-4 border-white/50',
        'transition-all duration-200',
        color,
        !disabled && 'hover:scale-105 active:scale-95',
        disabled && 'opacity-50 cursor-not-allowed',
        isShaking && 'animate-shake',
        isMerging && 'animate-piece-merge'
      )}
    >
      <span className="text-5xl md:text-6xl">{emoji}</span>
      <span className="text-sm md:text-base font-bold text-foreground/80 px-2 text-center">
        {name}
      </span>
    </button>
  );
};
