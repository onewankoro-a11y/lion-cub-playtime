import lionImage from '@/assets/lion-character.png';
import { cn } from '@/lib/utils';

interface LionCharacterProps {
  className?: string;
  isJumping?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const LionCharacter = ({
  className,
  isJumping = false,
  size = 'md',
}: LionCharacterProps) => {
  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
  };

  return (
    <div
      className={cn(
        'relative',
        sizeClasses[size],
        isJumping ? 'animate-jump' : 'animate-float',
        className
      )}
    >
      <img
        src={lionImage}
        alt="ライオンくん"
        className="w-full h-full object-contain drop-shadow-lg"
      />
    </div>
  );
};
