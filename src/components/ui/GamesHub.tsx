import { Sparkles, Heart } from 'lucide-react';
import CuteLoveIllustration from './CuteLoveIllustration';
import FloatingPetals from './FloatingPetals';

export default function GamesHub({ onNavigate }: { onNavigate?: (page: string) => void }) {
  return (
    <div className="relative z-10 flex flex-col items-center justify-start min-h-screen w-full app-container page-edges">
      <FloatingPetals />

      {/* Redesigned Hero Card */}
      <section className="w-full flex items-center justify-center mb-12">
        <div className="w-full max-w-full glass-panel rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block py-1 px-4 rounded-full bg-rose-50 text-rose-700 font-semibold text-sm tracking-wider mb-4 shadow-sm border border-rose-100">
              Hey there… 💕
            </span>

            <h1
              className="font-romantic text-rose-700 mb-4 leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.75rem)' }}
            >
              An Evening of Little Surprises
            </h1>

            <p className="text-base sm:text-lg text-rose-900/80 max-w-xl leading-relaxed mb-6">
              Explore playful moments crafted just for you — games, letters, and tiny treasures. Start with a quick surprise or enjoy the journey.
            </p>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <button
                onClick={() => onNavigate?.('proposal')}
                className="btn-valentine px-6 py-3 text-lg flex items-center gap-3"
              >
                <Heart className="w-5 h-5" />
                Surprise Me
              </button>

              <button
                onClick={() => onNavigate?.('letters')}
                className="btn-valentine-outline px-5 py-3 text-base flex items-center gap-2"
              >
                <span>Love Letters</span>
              </button>
            </div>
          </div>

          <div className="flex-1 flex justify-center items-center">
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-rose-200/30 rounded-full blur-3xl" />
              <CuteLoveIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* Games Grid Section */}
      <section className="w-full max-w-5xl mx-auto flex flex-col items-center animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700">
        <div className="flex items-center justify-center gap-3 mb-10">
          <Sparkles className="w-6 h-6 text-rose-400" />
          <h2 className="text-3xl md:text-4xl font-romantic text-rose-800">Choose Your Adventure</h2>
          <Sparkles className="w-6 h-6 text-rose-400" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full">
          <button
            onClick={() => onNavigate?.('puzzle')}
            className="group flex flex-col items-center p-8 glass-card glass-card-border-rose hover:bg-white transition-all duration-300 hover:-translate-y-3"
          >
            <div className="w-20 h-20 mb-6 bg-rose-50 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
              <span className="text-5xl">🧩</span>
            </div>
            <h3 className="font-bold text-xl text-rose-900 mb-2">Image Puzzle</h3>
            <p className="text-sm text-rose-600/80 text-center font-medium">Piece us together</p>
          </button>
          
          <button
            onClick={() => onNavigate?.('memory')}
            className="group flex flex-col items-center p-8 glass-card glass-card-border-purple hover:bg-white transition-all duration-300 hover:-translate-y-3"
          >
            <div className="w-20 h-20 mb-6 bg-purple-50 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
              <span className="text-5xl">🎮</span>
            </div>
            <h3 className="font-bold text-xl text-purple-900 mb-2">Memory Game</h3>
            <p className="text-sm text-purple-600/80 text-center font-medium">Match our moments</p>
          </button>
          
          <button
            onClick={() => onNavigate?.('quiz')}
            className="group flex flex-col items-center p-8 glass-card glass-card-border-red hover:bg-white transition-all duration-300 hover:-translate-y-3"
          >
            <div className="w-20 h-20 mb-6 bg-red-50 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
              <span className="text-5xl">❤️</span>
            </div>
            <h3 className="font-bold text-xl text-red-900 mb-2">Love Quiz</h3>
            <p className="text-sm text-red-600/80 text-center font-medium">Test your knowledge</p>
          </button>
          
          <button
            onClick={() => onNavigate?.('letters')}
            className="group flex flex-col items-center p-8 glass-card glass-card-border-amber hover:bg-white transition-all duration-300 hover:-translate-y-3"
          >
            <div className="w-20 h-20 mb-6 bg-amber-50 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
              <span className="text-5xl">💌</span>
            </div>
            <h3 className="font-bold text-xl text-amber-900 mb-2">Love Letters</h3>
            <p className="text-sm text-amber-600/80 text-center font-medium">Read my heart</p>
          </button>
        </div>
      </section>
    </div>
  );
}
