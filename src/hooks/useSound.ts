import { useCallback, useEffect, useRef } from 'react';
import { useLocalStorage } from './useLocalStorage';

type SoundType = 'pop' | 'success' | 'failure' | 'click' | 'sparkle';

// Simple oscillator-based sound effects
const playTone = (
  frequency: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume: number = 0.3
) => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = type;
  gainNode.gain.value = volume;

  oscillator.start();
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  oscillator.stop(audioContext.currentTime + duration);
};

export const useSound = () => {
  const [volume, setVolume] = useLocalStorage('app-volume', 0.5);
  const [isMuted, setIsMuted] = useLocalStorage('app-muted', false);

  const playSound = useCallback(
    (soundType: SoundType) => {
      if (isMuted || volume === 0) return;

      const adjustedVolume = volume * 0.5;

      switch (soundType) {
        case 'pop':
          playTone(400, 0.1, 'sine', adjustedVolume);
          setTimeout(() => playTone(500, 0.1, 'sine', adjustedVolume), 50);
          break;
        case 'success':
          playTone(523, 0.15, 'sine', adjustedVolume);
          setTimeout(() => playTone(659, 0.15, 'sine', adjustedVolume), 100);
          setTimeout(() => playTone(784, 0.2, 'sine', adjustedVolume), 200);
          break;
        case 'failure':
          playTone(200, 0.2, 'triangle', adjustedVolume * 0.7);
          setTimeout(() => playTone(180, 0.3, 'triangle', adjustedVolume * 0.5), 150);
          break;
        case 'click':
          playTone(600, 0.05, 'sine', adjustedVolume * 0.3);
          break;
        case 'sparkle':
          playTone(800, 0.1, 'sine', adjustedVolume * 0.4);
          setTimeout(() => playTone(1000, 0.1, 'sine', adjustedVolume * 0.3), 100);
          setTimeout(() => playTone(1200, 0.1, 'sine', adjustedVolume * 0.2), 200);
          break;
      }
    },
    [isMuted, volume]
  );

  return {
    playSound,
    volume,
    setVolume,
    isMuted,
    setIsMuted,
    toggleMute: () => setIsMuted(!isMuted),
  };
};
