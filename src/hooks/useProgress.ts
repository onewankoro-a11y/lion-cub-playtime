import { useLocalStorage } from './useLocalStorage';

interface GameProgress {
  [gameId: string]: {
    completed: boolean;
    currentLevel: number;
    highScore: number;
    lastPlayed: string;
  };
}

export const useProgress = () => {
  const [progress, setProgress] = useLocalStorage<GameProgress>('game-progress', {});

  const updateGameProgress = (
    gameId: string,
    updates: Partial<GameProgress[string]>
  ) => {
    const now = new Date().toISOString();
    setProgress({
      ...progress,
      [gameId]: {
        completed: false,
        currentLevel: 0,
        highScore: 0,
        ...progress[gameId],
        ...updates,
        lastPlayed: now,
      },
    });
  };

  const markGameCompleted = (gameId: string) => {
    updateGameProgress(gameId, { completed: true });
  };

  const getGameProgress = (gameId: string) => {
    return progress[gameId] || {
      completed: false,
      currentLevel: 0,
      highScore: 0,
      lastPlayed: null,
    };
  };

  const resetProgress = () => {
    setProgress({});
  };

  return {
    progress,
    updateGameProgress,
    markGameCompleted,
    getGameProgress,
    resetProgress,
  };
};
