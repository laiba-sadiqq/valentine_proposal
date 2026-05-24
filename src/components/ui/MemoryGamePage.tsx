import { useState, useEffect } from 'react';
import { ArrowLeft, Heart } from 'lucide-react';

type Card = {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export default function MemoryGamePage({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const emojis = ['💕', '💖', '💗', '💝', '🌹', '💐', '💑', '👫'];
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    if (matched.length === emojis.length * 2) {
      setGameWon(true);
    }
  }, [matched]);

  const initGame = () => {
    const shuffled = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    const newCards = shuffled.map((emoji, i) => ({
      id: i,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(newCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
  };

  const handleCardClick = (id: number) => {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);
    setMoves(m => m + 1);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        setMatched([...matched, first, second]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full app-container page-edges">
      <div className="fixed top-2 left-2 sm:top-4 sm:left-4 z-50">
        <button
          onClick={() => onNavigate?.('hub')}
          className="btn-valentine-outline !py-2 !px-4 text-sm sm:text-base bg-white/80 backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Back to Games</span>
        </button>
      </div>

      <div className="flex flex-col items-center justify-center text-center w-full max-w-5xl mx-auto mt-12 sm:mt-0">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 mb-8 sm:mb-12 glass-panel p-6 rounded-3xl">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-romantic text-purple-700 mb-4 drop-shadow-md">
            Memory Game 🎮
          </h1>
          <p className="text-purple-950 text-lg sm:text-xl font-semibold tracking-wide">
            Find matching pairs to win my heart!
          </p>
        </div>

        <div className="animate-in fade-in zoom-in duration-1000 delay-300 rounded-[3rem] glass-card p-8 sm:p-12 mb-8 w-full max-w-3xl">
          <div className="flex justify-between items-center mb-10 px-4">
            <div className="text-lg sm:text-xl font-bold text-purple-900 bg-purple-50 px-6 py-2 rounded-full shadow-inner border border-purple-200">
              Moves: <span className="text-2xl ml-2">{moves}</span>
            </div>
            <div className="text-lg sm:text-xl font-bold text-rose-700 bg-rose-50 px-6 py-2 rounded-full shadow-inner border border-rose-200">
              Pairs: <span className="text-2xl ml-2">{matched.length / 2}/{emojis.length}</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 sm:gap-6 mb-10">
            {cards.map(card => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                disabled={matched.includes(card.id)}
                className={`aspect-square text-4xl sm:text-6xl rounded-2xl transition-all duration-500 font-bold border-4 flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl ${
                  flipped.includes(card.id) || matched.includes(card.id)
                    ? 'bg-gradient-to-br from-pink-100 to-rose-200 border-rose-400 rotate-y-180'
                    : 'bg-gradient-to-br from-purple-400 to-pink-500 border-purple-300 hover:scale-105 hover:-translate-y-1 text-white'
                } ${matched.includes(card.id) ? 'opacity-60 scale-95' : ''}`}
                style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
              >
                {flipped.includes(card.id) || matched.includes(card.id) ? (
                  <span className="animate-scale-in">{card.emoji}</span>
                ) : (
                  <span className="drop-shadow-md">?</span>
                )}
              </button>
            ))}
          </div>

          {gameWon ? (
            <div className="p-8 sm:p-10 glass-panel rounded-[2rem] mt-12 animate-in zoom-in duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 text-purple-700 font-romantic text-4xl mb-4 drop-shadow-sm">
                  <Heart className="w-8 h-8 fill-current text-rose-500 animate-pulse" />
                  You Won!
                  <Heart className="w-8 h-8 fill-current text-rose-500 animate-pulse" />
                </div>
                <div className="bg-white rounded-2xl p-6 sm:p-8 mb-8 shadow-sm border border-purple-100">
                  <p className="text-lg sm:text-xl text-purple-950 font-bold">
                    Completed in <span className="text-rose-600 text-2xl">{moves}</span> moves!
                  </p>
                  <p className="text-purple-900 mt-2 font-medium">You're amazing! 💕</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                  <button
                    onClick={() => onNavigate?.('proposal')}
                    className="btn-valentine group text-lg"
                  >
                    <span>Will you be my Valentine? 💍</span>
                    <Heart className="w-5 h-5 group-hover:scale-110 group-hover:fill-current transition-all duration-300" />
                  </button>
                  <button
                    onClick={() => onNavigate?.('hub')}
                    className="btn-valentine-outline text-lg"
                  >
                    More Games
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-base sm:text-lg text-purple-950 font-bold mt-8 bg-purple-50 inline-block px-6 py-2 rounded-full border border-purple-200">
              Click cards to find matching pairs. Match all pairs to win! 🎯
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
