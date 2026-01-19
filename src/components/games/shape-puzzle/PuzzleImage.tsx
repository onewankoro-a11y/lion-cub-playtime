import { LionCharacter } from '@/components/common/LionCharacter';
import { cn } from '@/lib/utils';

interface PuzzleImageProps {
  missingPartEmoji: string;
  isComplete: boolean;
}

export const PuzzleImage = ({ missingPartEmoji, isComplete }: PuzzleImageProps) => {
  return (
    <div className="relative flex flex-col items-center justify-center p-4">
      <div className="relative">
        <LionCharacter size="lg" isJumping={isComplete} />
        
        {/* Missing part indicator */}
        {!isComplete && (
          <div
            className={cn(
              'absolute -bottom-2 -right-2',
              'w-16 h-16 rounded-full',
              'bg-white border-4 border-dashed border-primary',
              'flex items-center justify-center',
              'animate-pulse'
            )}
          >
            <span className="text-2xl opacity-30">{missingPartEmoji}</span>
          </div>
        )}
        
        {/* Completed part */}
        {isComplete && (
          <div
            className={cn(
              'absolute -bottom-2 -right-2',
              'w-16 h-16 rounded-full',
              'bg-[hsl(var(--pastel-orange))]',
              'flex items-center justify-center',
              'animate-success-pop'
            )}
          >
            <span className="text-2xl">{missingPartEmoji}</span>
          </div>
        )}
      </div>
    </div>
  );
};
