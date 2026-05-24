import { useState } from 'react';
import BackgroundMusic from '@/components/ui/BackgroundMusic';
import ProposalCard from '@/components/ui/ProposalCard';
import PuzzlePage from '@/components/ui/PuzzlePage';
import MemoryGamePage from '@/components/ui/MemoryGamePage';
import QuizPage from '@/components/ui/QuizPage';
import LettersPage from '@/components/ui/LettersPage';
import GamesHub from '@/components/ui/GamesHub';

export default function Index() {
  const [currentPage, setCurrentPage] = useState<'hub' | 'proposal' | 'puzzle' | 'memory' | 'quiz' | 'letters'>('hub');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNavigate = (page: string) => {
    if (page === currentPage) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page as any);
      setIsTransitioning(false);
    }, 300); // 300ms fade out
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden selection:bg-rose-200 selection:text-rose-900">
      <BackgroundMusic />
      
      {/* Dynamic Background subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-rose-50/20 pointer-events-none" />

      <div className={`relative z-10 flex h-full w-full items-center justify-center transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <div className="w-full h-full flex justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          {currentPage === 'hub' && <GamesHub onNavigate={handleNavigate} />}
          {currentPage === 'proposal' && <ProposalCard onNavigate={handleNavigate} />}
          {currentPage === 'puzzle' && <PuzzlePage onNavigate={handleNavigate} />}
          {currentPage === 'memory' && <MemoryGamePage onNavigate={handleNavigate} />}
          {currentPage === 'quiz' && <QuizPage onNavigate={handleNavigate} />}
          {currentPage === 'letters' && <LettersPage onNavigate={handleNavigate} />}
        </div>
      </div>
    </main>
  );
}
