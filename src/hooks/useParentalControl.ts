import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface ParentalSettings {
  dailyTimeLimit: number; // minutes
  isTimeLimitEnabled: boolean;
  todayUsage: number; // minutes
  lastUsageDate: string;
}

export const useParentalControl = () => {
  const [settings, setSettings] = useLocalStorage<ParentalSettings>('parental-settings', {
    dailyTimeLimit: 30,
    isTimeLimitEnabled: false,
    todayUsage: 0,
    lastUsageDate: new Date().toDateString(),
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const generateMathProblem = useCallback(() => {
    const a = Math.floor(Math.random() * 5) + 1;
    const b = Math.floor(Math.random() * 5) + 1;
    return {
      question: `${a} + ${b} = ?`,
      answer: a + b,
    };
  }, []);

  const verifyAnswer = useCallback(
    (userAnswer: number, correctAnswer: number) => {
      const isCorrect = userAnswer === correctAnswer;
      if (isCorrect) {
        setIsAuthenticated(true);
      }
      return isCorrect;
    },
    []
  );

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  const updateSettings = useCallback(
    (updates: Partial<ParentalSettings>) => {
      setSettings({ ...settings, ...updates });
    },
    [settings, setSettings]
  );

  const addUsageTime = useCallback(
    (minutes: number) => {
      const today = new Date().toDateString();
      const newUsage =
        settings.lastUsageDate === today ? settings.todayUsage + minutes : minutes;

      setSettings({
        ...settings,
        todayUsage: newUsage,
        lastUsageDate: today,
      });
    },
    [settings, setSettings]
  );

  const isTimeLimitReached = useCallback(() => {
    if (!settings.isTimeLimitEnabled) return false;
    const today = new Date().toDateString();
    if (settings.lastUsageDate !== today) return false;
    return settings.todayUsage >= settings.dailyTimeLimit;
  }, [settings]);

  return {
    settings,
    isAuthenticated,
    generateMathProblem,
    verifyAnswer,
    logout,
    updateSettings,
    addUsageTime,
    isTimeLimitReached,
  };
};
