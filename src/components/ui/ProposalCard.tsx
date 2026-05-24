'use client';

import { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, Heart, Mail } from 'lucide-react';
import CuteLoveIllustration from './CuteLoveIllustration';
import FloatingPetals from './FloatingPetals';

export default function ProposalCard({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const shimmerStyle = `
    @keyframes textShimmer {
      0% {
        background-position: 0% center;
        filter: drop-shadow(0 0 10px rgba(236, 72, 153, 0.4));
      }
      50% {
        filter: drop-shadow(0 0 30px rgba(236, 72, 153, 0.8)) drop-shadow(0 0 60px rgba(236, 72, 153, 0.4));
      }
      100% {
        background-position: 200% center;
        filter: drop-shadow(0 0 10px rgba(236, 72, 153, 0.4));
      }
    }
    .animate-text-shimmer {
      animation: textShimmer 3s ease-in-out infinite;
    }
  `;
  const [answered, setAnswered] = useState(false);
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null);
  const [showLoveLetter, setShowLoveLetter] = useState(false);
  const [puzzleSolved, setPuzzleSolved] = useState(false);

  const resetPuzzle = () => {
    setPuzzleSolved(false);
  };

  const handleYes = () => {
    setAnswered(true);
    setAnswer('yes');
    
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

  const handleLoveLetterClick = () => {
    setShowLoveLetter(true);
    confetti({
      particleCount: 12,
      spread: 50,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#FFB6C1', '#FFC1D6', '#FF9BB2', '#FF7FA3', '#FFD9E6'],
    });
  };

  const goBackToProposal = () => {
    setAnswered(false);
    setAnswer(null);
    setShowLoveLetter(false);
    setPuzzleSolved(false);
  };

  const [noClicked, setNoClicked] = useState(false);

  useEffect(() => {
    // Prevent page scroll while love letter modal is open
    if (typeof window === 'undefined') return;
    const prev = document.body.style.overflow;
    if (showLoveLetter) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = prev || '';
    }
    return () => {
      document.body.style.overflow = prev || '';
    };
  }, [showLoveLetter]);
  const [isMoved, setIsMoved] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const handleNoClick = () => {
    if (noClicked) return;
    setNoClicked(true);
    confetti({ particleCount: 12, spread: 40, origin: { x: 0.5, y: 0.6 }, colors: ['#ddd', '#bbb', '#eee'] });
  };

  const moveNoAway = () => {
    setIsMoved(true);
    if (typeof window !== 'undefined') {
      const maxX = window.innerWidth - 150;
      const maxY = window.innerHeight - 80;
      const x = Math.max(20, Math.random() * maxX);
      const y = Math.max(20, Math.random() * maxY);
      setNoPos({ x, y });
    }
  };

  // Generate tiny hearts for the border - more hearts, smaller size
  const generateHeartBorder = () => {
    const hearts = [];
    const totalHeartsPerSide = 12;
    
    // Top edge hearts
    for (let i = 0; i < totalHeartsPerSide; i++) {
      const percentage = (i / (totalHeartsPerSide - 1)) * 100;
      hearts.push(
        <div
          key={`top-${i}`}
          className="absolute -top-2 flex items-center justify-center"
          style={{ left: `${percentage}%`, transform: 'translateX(-50%)' }}
        >
          <Heart 
            className="w-3 h-3 text-rose-400 fill-rose-400 animate-pulse" 
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        </div>
      );
    }
    
    // Bottom edge hearts
    for (let i = 0; i < totalHeartsPerSide; i++) {
      const percentage = (i / (totalHeartsPerSide - 1)) * 100;
      hearts.push(
        <div
          key={`bottom-${i}`}
          className="absolute -bottom-2 flex items-center justify-center"
          style={{ left: `${percentage}%`, transform: 'translateX(-50%)' }}
        >
          <Heart 
            className="w-3 h-3 text-pink-400 fill-pink-400 animate-pulse" 
            style={{ animationDelay: `${i * 0.1 + 0.5}s` }}
          />
        </div>
      );
    }
    
    // Left edge hearts
    for (let i = 1; i < totalHeartsPerSide - 1; i++) {
      const percentage = (i / (totalHeartsPerSide - 1)) * 100;
      hearts.push(
        <div
          key={`left-${i}`}
          className="absolute -left-2 flex items-center justify-center"
          style={{ top: `${percentage}%`, transform: 'translateY(-50%)' }}
        >
          <Heart 
            className="w-3 h-3 text-rose-400 fill-rose-400 animate-pulse" 
            style={{ animationDelay: `${i * 0.1 + 0.3}s` }}
          />
        </div>
      );
    }
    
    // Right edge hearts
    for (let i = 1; i < totalHeartsPerSide - 1; i++) {
      const percentage = (i / (totalHeartsPerSide - 1)) * 100;
      hearts.push(
        <div
          key={`right-${i}`}
          className="absolute -right-2 flex items-center justify-center"
          style={{ top: `${percentage}%`, transform: 'translateY(-50%)' }}
        >
          <Heart 
            className="w-3 h-3 text-pink-400 fill-pink-400 animate-pulse" 
            style={{ animationDelay: `${i * 0.1 + 0.7}s` }}
          />
        </div>
      );
    }
    
    return hearts;
  };

  if (answered && answer === 'yes') {
    return (
      <div className="relative z-10 flex flex-col items-center justify-center h-screen w-full app-container page-edges overflow-hidden">
        <style>{shimmerStyle}</style>
        
        {/* Love Letter Modal */}
        {showLoveLetter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm overflow-hidden">
            <div className="relative animate-scale-in max-w-[9in] w-[min(92vw,9in)] max-h-[80vh] overflow-visible">
              {/* Love Letter with Complete Tiny Heart Border */}
              <div className="relative bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl sm:rounded-2xl shadow-2xl overflow-visible border-2 border-rose-200 m-3 sm:m-4">
                
                {/* Tiny Hearts Border - All Around */}
                {generateHeartBorder()}
                
                {/* Corner hearts - slightly larger */}
                <div className="absolute -top-3 -left-3 w-6 h-6 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg z-10">
                  <Heart className="w-3.5 h-3.5 text-white fill-white" />
                </div>
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center shadow-lg z-10">
                  <Heart className="w-3.5 h-3.5 text-white fill-white" />
                </div>
                <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center shadow-lg z-10">
                  <Heart className="w-3.5 h-3.5 text-white fill-white" />
                </div>
                <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg z-10">
                  <Heart className="w-3.5 h-3.5 text-white fill-white" />
                </div>
                
                {/* Envelope flap */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 sm:w-48 h-6 sm:h-8 bg-gradient-to-r from-rose-200 to-pink-200 origin-top"
                  style={{
                    clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
                  }}
                ></div>
                
                {/* Letter Content */}
                <div className="p-3 sm:p-4 md:p-6 relative mt-4 sm:mt-6">
                  {/* Heart seal in center top */}
                  <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white" />
                    </div>
                  </div>
                  
                  {/* Letter header */}
                  <div className="text-center mb-3 sm:mb-4 pt-3 sm:pt-4">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-rose-400 mx-auto mb-1" />
                    <h2 className="text-base sm:text-lg md:text-xl font-romantic text-rose-800">My Heart's Words</h2>
                    <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-rose-300 to-pink-300 mx-auto mt-1 rounded-full"></div>
                  </div>
                  
                  {/* Letter body */}
                  <div className="bg-white/95 rounded-lg p-4 sm:p-6 md:p-8 shadow-inner border border-rose-100 overflow-visible">
                    <div className="space-y-3 md:space-y-4 text-left sm:columns-2 sm:gap-8">
                      <p className="text-gray-800 leading-relaxed text-sm md:text-base mt-2">
                        From the moment our paths crossed, something inside me shifted — in the most beautiful way. You bring a calm to my chaos, a laugh to my quiet, and a reason to look forward to every tomorrow. Every shared glance, silly joke, and gentle touch has become a part of the story I want to write with you.
                      </p>

                      <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                        You are the warmth on a cold day, the anchor when storms arrive, and the softest corner of my heart. I love how you see the world, how you believe, and how you make ordinary moments feel magical. Thank you for being you, for choosing me, and for letting me love you.
                      </p>

                      <p className="text-gray-800 leading-relaxed font-semibold text-rose-800 text-sm md:text-base">
                        I promise to be there — to laugh, to hold, to listen, and to grow alongside you. I promise to cherish small moments, to apologize when I'm wrong, and to celebrate you every single day.
                      </p>

                      <div className="flex justify-end mt-4">
                        <div className="text-right">
                          <p className="text-sm text-rose-600">Forever yours,</p>
                          <p className="text-lg font-romantic text-rose-800">Always ❤️</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative hearts inside */}
                  <div className="flex justify-center gap-2 mt-3">
                    {[...Array(3)].map((_, i) => (
                      <Heart
                        key={i}
                        className="w-3 h-3 md:w-4 md:h-4 text-rose-400 animate-pulse"
                        style={{ animationDelay: `${i * 0.3}s` }}
                      />
                    ))}
                  </div>
                  
                  {/* Small Close Button inside letter */}
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={() => setShowLoveLetter(false)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs bg-white/95 border border-rose-200 rounded-full shadow-lg hover:shadow-2xl hover:bg-rose-50 transition-all hover:scale-105 z-60"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      <span>Back</span>
                    </button>
                  </div>
                </div>
                
                {/* Envelope bottom */}
                <div className="h-2 md:h-3 bg-gradient-to-r from-rose-300/50 to-pink-300/50"></div>
              </div>
            </div>
          </div>
        )}
        
        {/* Main Celebration Content */}
          <div className="flex flex-col items-center justify-center text-center animate-scale-in max-w-3xl mx-auto w-full relative">
          {/* Back to proposal button */}
          <div className="fixed top-2 left-2 sm:top-4 sm:left-4 z-[60]">
            <button
              onClick={goBackToProposal}
              className="btn-valentine-outline !py-2 !px-4 text-sm sm:text-base bg-white/95 backdrop-blur-sm border-rose-200 shadow-lg text-rose-700"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-medium">Ask Again</span>
            </button>
          </div>
          
          {/* Photo with heart frame */}
          <div className="mb-6 sm:mb-10 relative mt-8 sm:mt-12">
            <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 mx-auto rounded-full overflow-hidden border-8 border-rose-400 shadow-[0_20px_50px_-10px_rgba(225,29,72,0.5)] rotate-6 bg-gradient-to-br from-rose-100 via-pink-50 to-white hover:rotate-0 hover:scale-105 transition-all duration-500">
              <CuteLoveIllustration compact />
            </div>
            <Heart className="absolute -top-4 -right-4 w-12 h-12 sm:w-16 sm:h-16 text-rose-500 fill-rose-500 animate-pulse drop-shadow-lg" />
            <Heart className="absolute -bottom-2 -left-4 w-10 h-10 sm:w-14 sm:h-14 text-pink-400 fill-pink-400 animate-pulse drop-shadow-lg" style={{ animationDelay: '0.5s' }} />
          </div>
          
          <h1
            className="font-romantic text-rose-600 drop-shadow-xl mb-4 sm:mb-6"
            style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}
          >
            Yay!
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-rose-900/80 font-light mb-4 drop-shadow-sm">
            Best decision ever 😌💖
          </p>
          <div className="text-base sm:text-lg md:text-xl text-rose-800/80 space-y-2 mb-8 font-medium">
            <p>Now you're stuck with me forever.</p>
            <p>No escape, sorry 😌</p>
            <p>My heart already claimed you.</p>
            <p>I can't wait to spend every single day making you smile.</p>
            <p>You are truly the best thing that ever happened to me 💖</p>
          </div>
          <p className="text-2xl sm:text-3xl text-rose-600 font-romantic italic mb-8">
            Let's do forever our way 💕
          </p>
          
          {/* Floating hearts */}
          <div className="mb-8 flex justify-center gap-3 sm:gap-4 md:gap-6">
            {[...Array(5)].map((_, i) => (
              <Heart
                key={i}
                className="w-6 h-6 sm:w-8 sm:h-8 text-rose-500 fill-rose-500 animate-pulse drop-shadow-md"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          
          {/* Surprise Letter Button */}
          <div className="mt-6 pt-8 border-t border-rose-200/50 w-full max-w-md mx-auto">
            <p className="text-lg text-rose-700/70 mb-4 font-medium">There's something special for u 💌</p>
            
            <button
              onClick={handleLoveLetterClick}
              className="group relative mx-auto w-48 sm:w-64 h-16 sm:h-20 glass-card hover:bg-white/80 rounded-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col items-center justify-center shadow-premium"
              aria-label="Open love letter"
            >
              <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-rose-300 to-pink-300 rounded-bl-full shadow-md"></div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-rose-500 mb-1 group-hover:scale-125 transition-transform duration-300" />
                <span className="text-sm sm:text-base font-bold text-rose-700 tracking-wide">
                  Open this
                </span>
              </div>
            </button>
            
            <p className="text-sm text-rose-600/60 mt-4">
              A heartfelt message just for you 💝
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-screen overflow-hidden px-4 sm:px-8 py-6 w-full">
      <style>{shimmerStyle}</style>
      <FloatingPetals />
      
      <div className="fixed top-2 left-2 sm:top-4 sm:left-4 z-[60]">
        <button
          onClick={() => onNavigate?.('hub')}
          className="btn-valentine-outline !py-2 !px-4 text-sm sm:text-base bg-white/95 backdrop-blur-sm border-rose-200 shadow-lg text-rose-700"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-medium">Back to Games</span>
        </button>
      </div>

      <div className="flex flex-col items-center justify-center text-center w-full app-container relative z-20 h-full max-h-[90vh]">
        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <p className="text-xl sm:text-2xl md:text-3xl text-rose-900/80 mb-4 font-medium tracking-widest uppercase">
            My Dearest Love...
          </p>
        </div>
        
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 w-full">
          <h1
            className="font-romantic mb-8 sm:mb-12 leading-[1.05] bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 bg-clip-text text-transparent animate-text-shimmer bg-[length:200%_auto] drop-shadow-xl max-w-full text-center"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)' }}
          >
            Will You Be My Valentine?
          </h1>
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <p className="text-lg sm:text-xl md:text-2xl text-rose-900/70 mb-10 sm:mb-16 leading-relaxed max-w-2xl mx-auto drop-shadow-sm font-medium">
            Every moment with you feels like a beautiful dream. 
            You are the reason my heart smiles.
          </p>
        </div>

        <div className="animate-fade-in mb-8" style={{ animationDelay: '1.05s' }}>
          <div className="w-48 h-48 sm:w-64 sm:h-64 mx-auto drop-shadow-2xl hover:scale-105 transition-transform duration-700">
            <CuteLoveIllustration />
          </div>
        </div>

        <div className="animate-fade-in flex flex-row items-center justify-center gap-6 mt-6 relative w-full h-24" style={{ animationDelay: '1.35s' }}>
          <button
            onClick={handleYes}
            className="btn-valentine w-48 sm:w-64 !py-4 text-xl sm:text-2xl z-20"
          >
            <span className="flex items-center justify-center gap-2">
              <span className="group-hover:animate-bounce">✨</span>
              Absolutely!
              <span className="group-hover:animate-bounce">✨</span>
            </span>
          </button>
          
          <button
            onClick={handleNoClick}
            onMouseEnter={moveNoAway}
            onMouseMove={moveNoAway}
            disabled={noClicked}
            style={isMoved ? { position: 'fixed', left: noPos.x, top: noPos.y, transition: 'all 0.1s ease' } : { transition: 'all 0.1s ease' }}
            className={`btn-valentine-outline !bg-gray-100 !text-gray-500 !border-gray-300 z-[60] w-32 sm:w-40 !py-4 text-xl sm:text-2xl ${noClicked ? 'opacity-0 pointer-events-none' : ''}`}
            aria-disabled={noClicked}
          >
            No
          </button>
        </div>
        
        <div className="animate-fade-in mt-12 sm:mt-16" style={{ animationDelay: '1.5s' }}>
          <p className="text-rose-900/40 font-romantic text-lg sm:text-xl">
            Made with love, just for you
          </p>
        </div>
      </div>
    </div>
  );
}