 import { useEffect, useState } from 'react';
 
 interface Petal {
   id: number;
   left: number;
   delay: number;
   duration: number;
   size: number;
   rotation: number;
 }
 
 export default function FloatingPetals() {
   const [petals, setPetals] = useState<Petal[]>([]);
 
   useEffect(() => {
     const petalCount = 15;
     const newPetals: Petal[] = [];
     
     for (let i = 0; i < petalCount; i++) {
       newPetals.push({
         id: i,
         left: Math.random() * 100,
         delay: Math.random() * 8,
         duration: 8 + Math.random() * 6,
         size: 16 + Math.random() * 12,
         rotation: Math.random() * 360,
       });
     }
     
     setPetals(newPetals);
   }, []);
 
   return (
     <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
       {petals.map((petal) => (
         <div
           key={petal.id}
           className="absolute animate-petal-fall"
           style={{
             left: `${petal.left}%`,
             animationDelay: `${petal.delay}s`,
             animationDuration: `${petal.duration}s`,
           }}
         >
           <svg
             width={petal.size}
             height={petal.size}
             viewBox="0 0 24 24"
             style={{ transform: `rotate(${petal.rotation}deg)` }}
             className="opacity-70"
           >
             <ellipse
               cx="12"
               cy="12"
               rx="6"
               ry="10"
               fill="url(#petalGradient)"
             />
             <defs>
               <linearGradient id="petalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                 <stop offset="0%" stopColor="#FFB6C1" />
                 <stop offset="50%" stopColor="#FF69B4" />
                 <stop offset="100%" stopColor="#E91E63" />
               </linearGradient>
             </defs>
           </svg>
         </div>
       ))}
     </div>
   );
 }