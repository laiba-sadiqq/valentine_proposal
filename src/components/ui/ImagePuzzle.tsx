import { useEffect, useState } from 'react';
import cutepic from '../../assets/cutepic.jpg';
import confetti from 'canvas-confetti';

type ImagePuzzleProps = {
  size?: number; // grid size (n x n)
  onSolved?: () => void;
};

export default function ImagePuzzle({ size = 3, onSolved }: ImagePuzzleProps) {
  const total = size * size;

  const createSolved = () => Array.from({ length: total }, (_, i) => i);

  const [tiles, setTiles] = useState<number[]>(createSolved());
  const [moves, setMoves] = useState(0);

  // shuffle to start (ensure not solved)
  useEffect(() => {
    const shuffle = () => {
      let arr = createSolved().slice();
      // simple Fisher-Yates
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      // if solved, reshuffle
      if (arr.every((v, idx) => v === idx)) return shuffle();
      setTiles(arr);
      setMoves(0);
    };

    shuffle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (moves > 0 && tiles.every((v, i) => v === i)) {
      onSolved?.();
    }
  }, [tiles, moves, onSolved]);

  const idxToRowCol = (idx: number) => ({ r: Math.floor(idx / size), c: idx % size });

  const canMove = (tileIdx: number, emptyIdx: number) => {
    const a = idxToRowCol(tileIdx);
    const b = idxToRowCol(emptyIdx);
    const dr = Math.abs(a.r - b.r);
    const dc = Math.abs(a.c - b.c);
    return (dr === 1 && dc === 0) || (dr === 0 && dc === 1);
  };

  const handleClick = (index: number) => {
    const emptyIdx = tiles.indexOf(total - 1);
    if (index === emptyIdx) return;
    if (!canMove(index, emptyIdx)) return;
    const next = tiles.slice();
    [next[index], next[emptyIdx]] = [next[emptyIdx], next[index]];
    setTiles(next);
    setMoves((m) => m + 1);
  };

  const reset = () => {
    const arr = createSolved().slice();
    let shuffled = arr.slice();
    // shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    if (shuffled.every((v, idx) => v === idx)) return reset(); // if solved, reshuffle
    setTiles(shuffled);
    setMoves(0);
  };

  const solve = () => {
    setTiles(createSolved());
    setMoves((m) => m + 1);
  };

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div className="relative rounded-lg overflow-hidden border-2 border-rose-200 shadow-md bg-white" style={{ width: 240, height: 240 }}>
        <div className="grid absolute inset-0" style={{ display: 'grid', gridTemplateColumns: `repeat(${size}, 1fr)`, gap: 2, padding: 2 }}>
          {tiles.map((tile, i) => {
            const isEmpty = tile === total - 1;
            const { r, c } = idxToRowCol(tile);
            const bgPosX = (c / (size - 1)) * 100;
            const bgPosY = (r / (size - 1)) * 100;

            return (
              <button
                key={i}
                onClick={() => handleClick(i)}
                aria-label={isEmpty ? 'empty' : `tile-${tile}`}
                className={`rounded-sm overflow-hidden border border-rose-200 shadow-sm transition-all hover:scale-105 ${isEmpty ? 'bg-transparent border-transparent' : 'bg-white cursor-pointer hover:shadow-md'}`}
                style={{
                  width: 240 / size - 8,
                  height: 240 / size - 8,
                  backgroundImage: isEmpty ? undefined : `url(${cutepic})`,
                  backgroundSize: `${size * 100}% ${size * 100}%`,
                  backgroundPosition: `${bgPosX}% ${bgPosY}%`,
                  backgroundRepeat: 'no-repeat',
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm">
        <button onClick={reset} className="px-6 py-2 rounded-full bg-rose-100 text-rose-800 border border-rose-200 hover:bg-rose-200 transition-all font-bold shadow-sm hover:shadow hover:-translate-y-0.5">
          Reset
        </button>
        <button onClick={solve} className="px-6 py-2 rounded-full bg-purple-100 text-purple-800 border border-purple-200 hover:bg-purple-200 transition-all font-bold shadow-sm hover:shadow hover:-translate-y-0.5">
          Auto-Solve ✨
        </button>
        <span className="text-rose-950 font-semibold bg-white px-6 py-2 rounded-full border border-rose-100 shadow-sm">Moves: <span className="text-rose-600 text-lg ml-1">{moves}</span></span>
      </div>
    </div>
  );
}
