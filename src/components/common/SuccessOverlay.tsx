import { useEffect } from 'react';
import { useSound } from '@/hooks/useSound';
import { LionCharacter } from './LionCharacter';

interface SuccessOverlayProps {
  show: boolean;
  onComplete?: () => void;
}

export const SuccessOverlay = ({ show, onComplete }: SuccessOverlayProps) => {
  const { playSound } = useSound();

  useEffect(() => {
    if (show) {
      playSound('success');
      playSound('sparkle');
      
      const timer = setTimeout(() => {
        onComplete?.();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [show, playSound, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="relative flex flex-col items-center">
        {/* はなまる */}
        <div className="animate-success-pop text-[150px] md:text-[200px] leading-none">
          ◎
        </div>
        
        {/* キラキラエフェクト */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="absolute text-3xl animate-sparkle"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              ✨
            </span>
          ))}
        </div>

        {/* ジャンプするライオン */}
        <LionCharacter size="lg" isJumping={true} className="mt-4" />
        
        <p className="text-2xl md:text-3xl font-bold text-primary mt-4 animate-bounce">
          すごい！
        </p>
      </div>
    </div>
  );
};
