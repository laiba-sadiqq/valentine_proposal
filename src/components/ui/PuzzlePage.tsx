import { useState } from 'react';
import { ArrowLeft, Heart, Sparkles } from 'lucide-react';
import ImagePuzzle from './ImagePuzzle';
import confetti from 'canvas-confetti';

export default function PuzzlePage({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [puzzleSolved, setPuzzleSolved] = useState(false);

  const handlePuzzleSolved = () => {
    setPuzzleSolved(true);
    
    const duration = 3200;
    const end = Date.now() + duration;
    const kissColors = ['#3e0505'];
    const kiss = (confetti as any).shapeFromText({ text: '💋', scalar: 1 });

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 40,
        origin: { x: 0, y: 0.62 },
        colors: kissColors,
        shapes: [kiss],
        scalar: 1.2,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 40,
        origin: { x: 1, y: 0.62 },
        colors: kissColors,
        shapes: [kiss],
        scalar: 1.2,
      });
      confetti({
        particleCount: 1,
        angle: 90,
        spread: 60,
        origin: { x: 0.5, y: 0.35 },
        colors: kissColors,
        shapes: [kiss],
        scalar: 1.4,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    frame();
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full app-container page-edges">
      <div className="fixed top-2 left-2 sm:top-4 sm:left-4 z-50">
        <button
          onClick={() => onNavigate?.('hub')}
          className="btn-valentine-outline !py-2 !px-4 text-sm sm:text-base bg-white/80 backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-medium">Back to Games</span>
        </button>
      </div>

      <div className="flex flex-col items-center justify-center text-center w-full max-w-3xl mx-auto mt-8 sm:mt-0">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 mb-6 sm:mb-8 glass-panel p-5 rounded-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-romantic text-rose-700 mb-3 drop-shadow-md">
            Picture Puzzle 🧩
          </h1>
          <p className="text-rose-950 text-base sm:text-lg font-semibold tracking-wide">
            Rearrange the tiles to complete our beautiful picture
          </p>
        </div>

        <div className="animate-in fade-in zoom-in duration-1000 delay-300 rounded-[2rem] glass-card p-6 sm:p-8 mb-6 w-full">
          <div className="flex justify-center scale-95 sm:scale-100 transform transition-transform duration-300 hover:scale-105 my-6 sm:my-8">
            <ImagePuzzle size={2} onSolved={handlePuzzleSolved} />
          </div>

          {puzzleSolved && (
            <div className="animate-scale-in space-y-6 mt-8 sm:mt-12">
              {/* Confetti emoji burst */}
              <div className="text-5xl sm:text-6xl mb-6 flex justify-center gap-4">
                <span className="animate-bounce" style={{ animationDelay: '0s' }}>✨</span>
                <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>💕</span>
                <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>✨</span>
              </div>

              {/* Cute love note */}
              <div className="p-8 sm:p-10 glass-panel rounded-[2rem] max-w-2xl mx-auto relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 to-pink-50/50"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-3 text-rose-700 font-romantic text-4xl mb-6 drop-shadow-sm">
                    <Heart className="w-8 h-8 fill-current animate-pulse" />
                    Puzzle Solved!
                    <Heart className="w-8 h-8 fill-current animate-pulse" />
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6 sm:p-8 mb-6 shadow-sm border border-rose-100 flex items-center justify-center">
                    <p className="text-rose-950 font-bold text-xl m-0">You discovered something special! 🎁</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
