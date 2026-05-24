import { useState } from 'react';
import { ArrowLeft, Heart } from 'lucide-react';

type Question = {
  id: number;
  question: string;
  options: string[];
  correct: number;
};

const quizQuestions: Question[] = [
  {
    id: 1,
    question: 'What makes you smile the most?',
    options: ['Your laugh', 'Your smile', 'Your presence', 'Everything about you'],
    correct: 3,
  },
  {
    id: 2,
    question: 'My favorite time with you is...',
    options: ['Early morning cuddles', 'Late night talks', 'Any time together', 'All of the above'],
    correct: 3,
  },
  {
    id: 3,
    question: 'You make me feel...',
    options: ['Happy', 'Loved', 'Complete', 'Like the luckiest person alive'],
    correct: 3,
  },
  {
    id: 4,
    question: 'Forever with you sounds...',
    options: ['Nice', 'Good', 'Amazing', 'Like a dream come true'],
    correct: 3,
  },
  {
    id: 5,
    question: 'The best thing about us is...',
    options: ['How we laugh together', 'Our connection', 'Our understanding', 'Everything'],
    correct: 3,
  },
];

export default function QuizPage({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswerClick = (index: number) => {
    if (answered) return;
    
    setSelectedAnswer(index);
    setAnswered(true);
    
    if (index === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(false);
      setSelectedAnswer(null);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setAnswered(false);
    setSelectedAnswer(null);
    setQuizComplete(false);
  };

  const question = quizQuestions[currentQuestion];
  const isCorrect = selectedAnswer === question.correct;

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

      <div className="flex flex-col items-center justify-center text-center w-full max-w-4xl mx-auto mt-12 sm:mt-0">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 mb-8 sm:mb-12 glass-panel p-6 rounded-3xl">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-romantic text-red-700 mb-4 drop-shadow-md">
            Love Quiz ❤️
          </h1>
          <p className="text-red-950 text-lg sm:text-xl font-semibold tracking-wide">
            Test your love knowledge!
          </p>
        </div>

        {!quizComplete ? (
          <div className="animate-in fade-in zoom-in duration-1000 delay-300 rounded-[3rem] glass-card p-8 sm:p-12 mb-8 w-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 to-pink-50/30"></div>
            <div className="relative z-10">
              <div className="mb-10">
                <div className="flex justify-between items-center mb-6 px-2">
                  <span className="text-lg font-bold text-rose-800 bg-rose-50 border border-rose-100 px-5 py-2 rounded-full shadow-sm">Question {currentQuestion + 1}/{quizQuestions.length}</span>
                  <span className="text-lg font-bold text-rose-800 bg-rose-50 border border-rose-100 px-5 py-2 rounded-full shadow-sm">Score: {score}</span>
                </div>
                <div className="w-full bg-rose-100 rounded-full h-4 shadow-inner border border-rose-200">
                  <div
                    className="bg-gradient-to-r from-red-500 to-pink-500 h-4 rounded-full transition-all duration-500 shadow-sm"
                    style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-rose-950 mb-10 drop-shadow-sm leading-tight bg-white p-6 rounded-2xl border border-rose-100 shadow-sm">
                {question.question}
              </h2>

              <div className="space-y-4 mb-8">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    disabled={answered}
                    className={`w-full p-5 rounded-2xl font-bold text-lg sm:text-xl transition-all duration-300 border-2 shadow-sm flex items-center justify-center ${
                      selectedAnswer === index
                        ? isCorrect
                          ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-green-500 text-green-900 scale-[1.02] shadow-md'
                          : 'bg-gradient-to-r from-red-100 to-pink-100 border-red-500 text-red-900 scale-[1.02] shadow-md'
                        : answered
                        ? index === question.correct
                          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-400 text-green-800'
                          : 'bg-gray-50 border-gray-200 text-gray-400 opacity-60'
                        : 'bg-white border-rose-200 text-rose-900 hover:bg-rose-50 hover:border-rose-400 hover:scale-[1.02] hover:shadow-md'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {answered && (
                <div className={`p-6 rounded-2xl mb-8 animate-scale-in shadow-md ${isCorrect ? 'bg-green-100 border-2 border-green-400' : 'bg-yellow-100 border-2 border-yellow-400'}`}>
                  <p className={`font-bold text-lg sm:text-xl ${isCorrect ? 'text-green-900' : 'text-yellow-900'}`}>
                    {isCorrect ? '✨ Correct! ' : '💭 That\'s beautiful too! '}
                    {isCorrect && 'You really know me!'}
                  </p>
                </div>
              )}

              {answered && (
                <button
                  onClick={handleNext}
                  className="btn-valentine w-full sm:w-auto mx-auto mt-8 block"
                >
                  {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="animate-in zoom-in duration-500 rounded-[3rem] glass-card p-8 sm:p-12 mb-8 w-full max-w-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-pink-50/50"></div>
            <div className="relative z-10 text-center">
              <div className="text-7xl sm:text-8xl mb-8 animate-bounce">
                {score === quizQuestions.length ? '💕' : score >= 4 ? '💖' : '💗'}
              </div>
              <h2 className="text-4xl sm:text-5xl font-romantic text-rose-700 mb-6 drop-shadow-sm">
                Quiz Complete!
              </h2>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-rose-100 mb-8 max-w-sm mx-auto">
                <p className="text-2xl sm:text-3xl font-bold text-rose-950 mb-2">
                  Score: <span className="text-rose-600">{score}/{quizQuestions.length}</span>
                </p>
              </div>
              <p className="text-lg sm:text-xl text-rose-900 mb-10 font-bold leading-relaxed max-w-lg mx-auto bg-rose-50 p-6 rounded-2xl border border-rose-100">
                {score === quizQuestions.length
                  ? '🌹 Perfect score! You know exactly what to say to my heart!'
                  : score >= 4
                  ? '🌺 Amazing! Your love is truly special!'
                  : '💕 You\'re wonderful, even if not all answers are the same!'}
              </p>
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
        )}
      </div>
    </div>
  );
}
