import { useState } from 'react';
import { ArrowLeft, Heart, Mail, Lock, Unlock } from 'lucide-react';

type Letter = {
  id: number;
  title: string;
  author: string;
  content: string;
  locked?: boolean;
  password?: string;
  icon: string;
};

const letters: Letter[] = [
  {
    id: 1,
    title: 'The First Time I Saw You',
    author: 'Your Lover',
    icon: '👀',
    content: `I remember the exact moment. The way you entered the room, the smile on your face, the warmth in your eyes. Everything else faded away and all I could see was you.

In that moment, I didn't know my life was about to change forever. I didn't know that this single moment would become the beginning of the most beautiful story of my life.

Every detail is etched into my memory like a precious photograph. The way you laughed, the way you moved, the way your presence made me feel alive.

Thank you for that moment. Thank you for being the person who changed everything. 💕`,
  },
  {
    id: 2,
    title: 'Why I Love You',
    author: 'Your Admirer',
    icon: '💭',
    content: `I love you for so many reasons that I couldn't possibly list them all. But let me try...

I love you for your kindness and the way you care about others. I love you for your strength and resilience. I love you for making me laugh even on the darkest days.

I love you for being patient with me, for understanding me, for believing in me when I didn't believe in myself.

I love you for being exactly who you are - perfectly imperfect, beautifully flawed, and absolutely wonderful.

But most of all, I love you for loving me back. 🌹`,
  },
  {
    id: 3,
    title: 'Our Future',
    author: 'Your Greatest Fan',
    icon: '🌟',
    content: `I can see our future so clearly. Not every detail, but the feeling of it. A future filled with love, laughter, and endless moments of joy together.

I see us building a life together, creating memories that will last forever. Adventures in new places, quiet moments at home, growing old together.

I see us facing challenges and coming out stronger. I see us celebrating victories together. I see a love that only grows deeper with time.

I see forever with you, and I'm not scared. I'm excited. I'm hopeful. I'm ready.

Because with you, I know I'm home. 💫`,
  },
  {
    id: 4,
    title: '💌 A Secret Message',
    author: 'Your Secret Admirer',
    icon: '🔐',
    locked: true,
    password: 'love',
    content: `My dearest,

You are the reason I believe in soulmates. You are the answer to prayers I didn't even know I was making. You are my greatest blessing and my most beautiful dream come true.

In a world full of temporary things, you are my forever. In a world full of noise, you are my peace. In a world full of darkness, you are my light.

I promise to love you through every season of life. I promise to hold your hand through the storms and celebrate every rainbow with you.

You are my home, my heart, my everything.

Forever yours,
Always 💕

P.S. The password to this message was the first thing you heard about us. The thing that defines what we are. 🔑`,
  },
];

export default function LettersPage({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordAttempted, setPasswordAttempted] = useState(false);

  const handleLetterClick = (letter: Letter) => {
    if (letter.locked) {
      setPasswordInput('');
      setPasswordAttempted(false);
    }
    setSelectedLetter(letter);
  };

  const handlePasswordSubmit = () => {
    if (passwordInput.toLowerCase() === selectedLetter?.password?.toLowerCase()) {
      setPasswordAttempted(true);
    }
  };

  const isPasswordCorrect = passwordAttempted && passwordInput.toLowerCase() === selectedLetter?.password?.toLowerCase();

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full app-container page-edges">
      <div className="fixed top-2 left-2 sm:top-4 sm:left-4 z-50">
        <button
          onClick={() => {
            if (selectedLetter) {
              setSelectedLetter(null);
            } else {
              onNavigate?.('hub');
            }
          }}
          className="btn-valentine-outline !py-2 !px-4 text-sm sm:text-base bg-white/80 backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>{selectedLetter ? 'Back to Letters' : 'Back to Games'}</span>
        </button>
      </div>

      <div className="flex flex-col items-center justify-center text-center w-full max-w-6xl mx-auto mt-12 sm:mt-0">
      {selectedLetter ? (
        <div className="animate-in zoom-in duration-500 w-full max-w-4xl mx-auto">
          <div className="rounded-[3rem] glass-card p-8 sm:p-16 relative overflow-hidden">
            {/* Letter Header */}
            <div className="text-center mb-10 bg-white/50 p-6 rounded-3xl shadow-sm">
              <div className="text-6xl sm:text-7xl mb-6">{selectedLetter.icon}</div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-romantic text-rose-700 mb-4 drop-shadow-md">
                {selectedLetter.title}
              </h2>
              <p className="text-lg sm:text-xl text-rose-950 font-bold tracking-wider uppercase">— {selectedLetter.author}</p>
              <div className="w-24 h-1.5 bg-gradient-to-r from-rose-400 to-pink-500 mx-auto mt-6 rounded-full shadow-sm"></div>
            </div>

            {/* Envelope flap */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 sm:w-96 h-12 bg-gradient-to-r from-rose-200 to-pink-200 origin-top shadow-sm"
              style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }}
            ></div>

            {selectedLetter.locked && !isPasswordCorrect ? (
              <div className="py-12 flex flex-col items-center bg-white/80 rounded-3xl border border-rose-100 shadow-inner p-8">
                <Lock className="w-16 h-16 text-rose-500 mb-6 drop-shadow-md" />
                <p className="text-rose-950 mb-8 text-lg sm:text-xl font-bold max-w-md">
                  This letter is protected with a password. Enter the password to read it.
                </p>
                <div className="w-full max-w-md">
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                    placeholder="Enter password..."
                    className="w-full px-6 py-4 rounded-2xl border-2 border-rose-300 bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-200 focus:outline-none mb-6 text-lg shadow-sm transition-all duration-300 font-medium"
                  />
                  <button
                    onClick={handlePasswordSubmit}
                    className="btn-valentine w-full"
                  >
                    Unlock Letter
                  </button>
                  {passwordAttempted && (
                    <p className="text-red-600 text-lg mt-4 font-bold animate-shake bg-red-50 p-3 rounded-xl border border-red-200">
                      ❌ Wrong password. Try again!
                    </p>
                  )}
                  <p className="text-base text-rose-900 mt-6 font-semibold bg-rose-50 p-3 rounded-xl border border-rose-100">
                    Hint: Think about what defines our relationship... 💭
                  </p>
                </div>
              </div>
            ) : (
              <div className="prose prose-lg sm:prose-xl max-w-none w-full">
                <div className="bg-gradient-to-b from-white/90 to-rose-50/90 rounded-3xl p-8 sm:p-12 max-h-[60vh] overflow-y-auto shadow-inner border border-rose-100/50">
                  {selectedLetter.locked && isPasswordCorrect && (
                    <div className="flex items-center justify-center gap-3 text-green-700 font-semibold mb-8 p-4 bg-green-100/80 rounded-xl border border-green-300/50 shadow-sm w-fit mx-auto">
                      <Unlock className="w-5 h-5" />
                      Password Correct!
                    </div>
                  )}
                  <p className="text-left text-rose-950/80 whitespace-pre-wrap leading-relaxed text-lg sm:text-xl font-medium tracking-wide">
                    {selectedLetter.content}
                  </p>
                </div>

                {/* Decorative hearts */}
                <div className="flex justify-center gap-4 mt-10">
                  {[...Array(5)].map((_, i) => (
                    <Heart
                      key={i}
                      className="w-6 h-6 sm:w-8 sm:h-8 text-rose-400 fill-rose-400 animate-pulse drop-shadow-md"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 mb-12 glass-panel p-8 rounded-3xl max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-romantic text-amber-700 mb-4 drop-shadow-md">
              Love Letters 💌
            </h1>
            <p className="text-amber-950 text-lg sm:text-xl font-bold tracking-wide">
              Letters written straight from my heart to yours
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto px-4">
            {letters.map(letter => (
              <button
                key={letter.id}
                onClick={() => handleLetterClick(letter)}
                className="group relative h-full p-8 sm:p-10 rounded-[2.5rem] glass-card hover:bg-white transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 text-left flex flex-col overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-rose-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-6 right-6 z-10">
                  {letter.locked ? (
                    <div className="bg-rose-100 p-3 rounded-full border border-rose-200 shadow-sm">
                      <Lock className="w-6 h-6 text-rose-600 drop-shadow-sm" />
                    </div>
                  ) : (
                    <div className="bg-amber-100 p-3 rounded-full border border-amber-200 shadow-sm">
                      <Mail className="w-6 h-6 text-amber-600 drop-shadow-sm" />
                    </div>
                  )}
                </div>
                <div className="text-6xl sm:text-7xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 origin-bottom-left relative z-10 drop-shadow-sm">{letter.icon}</div>
                <h3 className="font-bold text-amber-950 mb-3 text-xl sm:text-2xl group-hover:text-rose-600 transition-colors drop-shadow-sm relative z-10">
                  {letter.title}
                </h3>
                <p className="text-base sm:text-lg text-amber-900 font-bold tracking-wider uppercase mb-8 relative z-10 bg-amber-50 self-start px-4 py-1 rounded-full border border-amber-100">
                  — {letter.author}
                </p>
                <div className="mt-auto flex items-center text-rose-600 font-bold text-lg group-hover:text-rose-700 transition-colors relative z-10 bg-white shadow-sm border border-rose-100 px-6 py-3 rounded-full w-fit">
                  <span>Read letter</span>
                  <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
