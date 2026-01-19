export interface GameInfo {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: string;
  color: string;
  isAvailable: boolean;
}

export const gameList: GameInfo[] = [
  {
    id: 'shape-puzzle',
    title: 'かたちあてパズル',
    description: 'ライオンくんのからだをかんせいさせよう！',
    path: '/games/shape-puzzle',
    icon: '🧩',
    color: 'bg-[hsl(var(--pastel-pink))]',
    isAvailable: true,
  },
  {
    id: 'color-match',
    title: 'いろあてゲーム',
    description: 'おなじいろをみつけよう！',
    path: '/games/color-match',
    icon: '🎨',
    color: 'bg-[hsl(var(--pastel-blue))]',
    isAvailable: false,
  },
  {
    id: 'counting',
    title: 'かずをかぞえよう',
    description: 'いくつあるかな？',
    path: '/games/counting',
    icon: '🔢',
    color: 'bg-[hsl(var(--pastel-yellow))]',
    isAvailable: false,
  },
  {
    id: 'animal-sounds',
    title: 'どうぶつのこえ',
    description: 'なんのどうぶつかな？',
    path: '/games/animal-sounds',
    icon: '🦁',
    color: 'bg-[hsl(var(--pastel-green))]',
    isAvailable: false,
  },
  {
    id: 'memory',
    title: 'えあわせ',
    description: 'おなじえをさがそう！',
    path: '/games/memory',
    icon: '🃏',
    color: 'bg-[hsl(var(--pastel-purple))]',
    isAvailable: false,
  },
  {
    id: 'tracing',
    title: 'せんをなぞろう',
    description: 'ゆびでなぞってみよう！',
    path: '/games/tracing',
    icon: '✏️',
    color: 'bg-[hsl(var(--pastel-orange))]',
    isAvailable: false,
  },
];
