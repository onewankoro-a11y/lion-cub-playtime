import { useEffect, useState } from 'react';
import { useSound } from '@/hooks/useSound';

interface FailureOverlayProps {
  show: boolean;
  onComplete?: () => void;
}

export const FailureOverlay = ({ show, onComplete }: FailureOverlayProps) => {
  const { playSound } = useSound();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      playSound('failure');
      
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [show, playSound, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="animate-shake flex flex-col items-center">
        <div className="text-8xl md:text-9xl opacity-80">
          🤔
        </div>
        <p className="text-xl md:text-2xl font-bold text-muted-foreground mt-4 bg-white/80 px-6 py-2 rounded-full">
          あれれ？
        </p>
      </div>
    </div>
  );
};
