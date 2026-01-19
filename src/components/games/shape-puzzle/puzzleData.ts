export interface PuzzlePiece {
  id: string;
  name: string;
  isCorrect: boolean;
  emoji: string;
  color: string;
}

export interface PuzzleQuestion {
  id: string;
  missingPart: string;
  missingPartEmoji: string;
  description: string;
  options: PuzzlePiece[];
}

export const puzzleQuestions: PuzzleQuestion[] = [
  {
    id: 'tail',
    missingPart: 'しっぽ',
    missingPartEmoji: '🦁',
    description: 'ライオンくんのしっぽがないよ！',
    options: [
      {
        id: 'correct-tail',
        name: 'ライオンのしっぽ',
        isCorrect: true,
        emoji: '🌸',
        color: 'bg-[hsl(var(--pastel-orange))]',
      },
      {
        id: 'wrong-tail',
        name: 'さかな',
        isCorrect: false,
        emoji: '🐟',
        color: 'bg-[hsl(var(--pastel-blue))]',
      },
    ],
  },
  {
    id: 'ear',
    missingPart: 'みみ',
    missingPartEmoji: '👂',
    description: 'ライオンくんのみみがないよ！',
    options: [
      {
        id: 'wrong-ear',
        name: 'ほし',
        isCorrect: false,
        emoji: '⭐',
        color: 'bg-[hsl(var(--pastel-yellow))]',
      },
      {
        id: 'correct-ear',
        name: 'ライオンのみみ',
        isCorrect: true,
        emoji: '🧡',
        color: 'bg-[hsl(var(--pastel-orange))]',
      },
    ],
  },
  {
    id: 'ball',
    missingPart: 'ボール',
    missingPartEmoji: '⚽',
    description: 'ライオンくんのボールがないよ！',
    options: [
      {
        id: 'correct-ball',
        name: 'まるいボール',
        isCorrect: true,
        emoji: '🔴',
        color: 'bg-[hsl(var(--pastel-pink))]',
      },
      {
        id: 'wrong-ball',
        name: 'しかく',
        isCorrect: false,
        emoji: '🟦',
        color: 'bg-[hsl(var(--pastel-blue))]',
      },
    ],
  },
];
