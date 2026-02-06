'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function SimpleMusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/Pal Ek Pal - Instrumental _ Bgm.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    audio.preload = 'auto';
    
    audio.addEventListener('play', () => setIsPlaying(true));
    audio.addEventListener('pause', () => setIsPlaying(false));
    
    audioRef.current = audio;

    return () => {
      audio.pause();
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    setHasInteracted(true);
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.log('Play error:', error);
        // If autoplay is blocked, show alert
        if (error.name === 'NotAllowedError') {
          alert('Click the button again to play music');
        }
      });
    }
  };

  return (
    <button
      onClick={toggleMusic}
      className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/80 backdrop-blur-sm border border-gray-300 shadow-lg hover:scale-110 transition-transform duration-200 group"
      aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 text-green-600" />
      ) : (
        <VolumeX className="w-5 h-5 text-gray-600 group-hover:text-green-600" />
      )}
      
      {!hasInteracted && (
        <span className="absolute -bottom-8 right-0 text-xs text-gray-600 whitespace-nowrap animate-pulse bg-white px-2 py-1 rounded border border-gray-200">
          <Music className="w-3 h-3 inline mr-1" />
          Click for music
        </span>
      )}
    </button>
  );
}