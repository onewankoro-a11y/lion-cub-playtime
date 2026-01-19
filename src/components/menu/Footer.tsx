import { Settings, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FooterProps {
  onSettingsClick: () => void;
  onParentalClick: () => void;
}

export const Footer = ({ onSettingsClick, onParentalClick }: FooterProps) => {
  return (
    <footer className="w-full py-4 px-6 flex justify-center gap-6">
      <button
        onClick={onSettingsClick}
        className={cn(
          'flex items-center gap-2 px-4 py-2',
          'text-sm text-muted-foreground',
          'bg-white/50 rounded-full',
          'hover:bg-white/70 transition-colors',
          'border border-border/50'
        )}
      >
        <Settings className="w-4 h-4" />
        <span>せってい</span>
      </button>
      
      <button
        onClick={onParentalClick}
        className={cn(
          'flex items-center gap-2 px-4 py-2',
          'text-sm text-muted-foreground',
          'bg-white/50 rounded-full',
          'hover:bg-white/70 transition-colors',
          'border border-border/50'
        )}
      >
        <Shield className="w-4 h-4" />
        <span>ほごしゃメニュー</span>
      </button>
    </footer>
  );
};
