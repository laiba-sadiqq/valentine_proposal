'use client';

import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Mail, ArrowLeft } from 'lucide-react';
import FloatingPetals from './FloatingPetals';
import peejoImage from '@/assets/peejo-2.jpg';

export default function ProposalCard() {
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

  const handleYes = () => {
    setAnswered(true);
    setAnswer('yes');
    
    const duration = 4000;
    const end = Date.now() + duration;
    const kissColors = ['#FF0000', '#CC0000', '#E91E63', '#C2185B', '#AD1457'];
    const kiss = (confetti as any).shapeFromText({ text: '💋', scalar: 2 });

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: kissColors,
        shapes: [kiss],
        scalar: 2.5,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: kissColors,
        shapes: [kiss],
        scalar: 2.5,
      });
      confetti({
        particleCount: 2,
        angle: 90,
        spread: 80,
        origin: { x: 0.5, y: 0.3 },
        colors: kissColors,
        shapes: [kiss],
        scalar: 3,
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
      particleCount: 20,
      spread: 60,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#FF69B4', '#FF1493', '#C71585', '#DB7093'],
    });
  };

  const goBackToProposal = () => {
    setAnswered(false);
    setAnswer(null);
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
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-3 sm:px-4 py-4 sm:py-8 overflow-hidden">
        <style>{shimmerStyle}</style>
        
        {/* Love Letter Modal */}
        {showLoveLetter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm">
            <div className="relative animate-scale-in max-w-md w-full max-h-[90vh] overflow-y-auto">
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
                  <div className="bg-white/90 rounded-lg p-2 sm:p-3 md:p-4 shadow-inner border border-rose-100 max-h-[40vh] sm:max-h-[50vh] overflow-y-auto">
                    <div className="space-y-2 md:space-y-3 text-left">
                      
                      
                      <p className="text-gray-800 leading-relaxed text-xs md:text-sm mt-2">
                        You matter to me more than u think and more than i show 🫀🫂💋
                      </p>
                    
                      <p className="text-gray-800 leading-relaxed font-semibold text-rose-800 mt-2 text-xs md:text-sm">
                        Thankyouuu sooo muchhh for everything 🫠💖
                      </p>
                      
                      <p className="text-gray-800 leading-relaxed font-semibold text-rose-800 text-xs md:text-sm">
                        thankyouuu so much for being in my life 🫀🫁🫂💕
                      </p>
                      
                      <div className="flex justify-end mt-4">
                        <div className="text-right">
                          <p className="text-xs text-rose-600">Forever yours,</p>
                          <p className="text-sm font-romantic text-rose-800">Always ❤️</p>
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
                      className="flex items-center gap-1 px-3 py-1.5 text-xs bg-white border border-rose-200 rounded-full shadow-sm hover:shadow-md hover:bg-rose-50 transition-all hover:scale-105"
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
        <div className="glass-card p-4 sm:p-6 md:p-8 lg:p-12 text-center animate-scale-in max-w-lg mx-auto w-full relative">
          {/* Back to proposal button */}
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
            <button
              onClick={goBackToProposal}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 border border-gray-200"
            >
              <ArrowLeft className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span className="font-medium">Ask Again</span>
            </button>
          </div>
          
          {/* Photo with heart frame */}
          <div className="mb-3 sm:mb-4 md:mb-6 relative mt-6 sm:mt-2">
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto rounded-full overflow-hidden border-3 sm:border-4 border-rose-400 shadow-romantic rotate-12">
              <img 
                src={peejoImage} 
                alt="My Love" 
                className="w-full h-full object-cover"
              />
            </div>
            <Heart className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-rose-500 fill-rose-500 animate-pulse" />
            <Heart className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-pink-400 fill-pink-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-romantic text-gradient-love mb-1 sm:mb-2 md:mb-3">
            Yay!
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground font-light mb-1 sm:mb-2">
            Best decision ever 😌💖
          </p>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-foreground/80 mb-0.5 sm:mb-1">
            Now you're stuck with me forever.
          </p>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-foreground/80 mb-0.5 sm:mb-1">
            No escape, sorry 😌
          </p>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-foreground/80 mb-2 sm:mb-3">
            My heart already claimed you.
          </p>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-romantic italic mb-3 sm:mb-6">
            Let's do forever our way 💕
          </p>
          
          {/* Floating hearts */}
          <div className="mb-3 sm:mb-4 md:mb-6 flex justify-center gap-1 sm:gap-1.5 md:gap-2">
            {[...Array(5)].map((_, i) => (
              <Heart
                key={i}
                className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-rose-500 fill-rose-500 animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          
          {/* Surprise Letter Button */}
          <div className="mt-1 sm:mt-2 md:mt-4 pt-3 sm:pt-4 border-t border-gray-200/30">
            <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mb-1.5 sm:mb-2">There's something special for u 💌</p>
            
            <button
              onClick={handleLoveLetterClick}
              className="group relative mx-auto w-32 sm:w-40 md:w-48 h-12 sm:h-14 md:h-16 bg-gradient-to-r from-rose-100 to-pink-100 hover:from-rose-200 hover:to-pink-200 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-rose-200 hover:scale-105"
              aria-label="Open love letter"
            >
              <div className="absolute top-0 right-0 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-rose-300 to-pink-300 rounded-bl-full shadow-md"></div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-1.5 sm:p-2">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-rose-500 mb-0.5 group-hover:animate-pulse" />
                <span className="text-[10px] sm:text-xs md:text-sm font-medium text-rose-700">
                  Open this
                </span>
                <span className="text-[8px] sm:text-[10px] text-rose-500">💌 Click to read</span>
              </div>
              
              <div className="absolute top-0 left-0 right-0 h-1.5 sm:h-2 bg-gradient-to-r from-rose-200/50 to-pink-200/50 rounded-t-lg"></div>
            </button>
            
            <p className="text-[10px] sm:text-xs text-gray-400 mt-1.5 sm:mt-2">
              A heartfelt message just for you 💝
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-3 sm:px-4 py-4 sm:py-8">
      <style>{shimmerStyle}</style>
      <FloatingPetals />
      
      <div className="glass-card p-5 sm:p-8 md:p-12 text-center max-w-xl mx-auto w-full">
        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <p className="text-sm sm:text-base md:text-lg text-foreground/70 mb-1.5 sm:mb-2 font-light tracking-wide">
            My Dearest Love...
          </p>
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-romantic text-gradient-love mb-4 sm:mb-6 leading-tight bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 bg-clip-text text-transparent animate-text-shimmer bg-[length:200%_auto]">
            Will You Be My Valentine?
          </h1>
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <p className="text-xs sm:text-sm md:text-base text-foreground/60 mb-5 sm:mb-8 leading-relaxed">
            Every moment with you feels like a beautiful dream. 
            You are the reason my heart smiles.
          </p>
        </div>
        
        <div className="animate-fade-in flex flex-col sm:flex-row gap-2.5 sm:gap-4 justify-center items-center relative" style={{ animationDelay: '1.2s' }}>
          <button
            onClick={handleYes}
            className="px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 text-xs sm:text-sm md:text-base bg-gradient-to-r from-pink-300 to-rose-300 hover:from-pink-400 hover:to-rose-400 text-rose-800 font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group w-full sm:w-auto"
          >
            <span className="flex items-center justify-center gap-1.5 sm:gap-2">
              Yes, I'd love to!
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 group-hover:fill-current transition-all" />
            </span>
          </button>
          
          <button
            onClick={handleYes}
            className="px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 text-xs sm:text-sm md:text-base bg-gradient-to-r from-purple-300 to-pink-300 hover:from-purple-400 hover:to-pink-400 text-purple-900 font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group relative overflow-hidden w-full sm:w-auto"
          >
            <span className="flex items-center justify-center gap-1.5 sm:gap-2">
              <span className="group-hover:animate-bounce">✨</span>
              Absolutely!
              <span className="group-hover:animate-bounce">✨</span>
            </span>
          </button>
        </div>
        
        <div className="animate-fade-in mt-5 sm:mt-8" style={{ animationDelay: '1.5s' }}>
          <p className="text-foreground/50 font-romantic text-xs sm:text-sm">
            Made with love, just for you
          </p>
        </div>
      </div>
    </div>
  );
}