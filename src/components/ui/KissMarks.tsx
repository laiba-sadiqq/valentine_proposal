 import { useEffect, useState } from 'react';
import kissMarkImage from '@/assets/kiss-mark.png';
 
 interface KissMark {
   id: number;
   x: number;
   y: number;
   rotation: number;
   scale: number;
   delay: number;
 }
 
 export default function KissMarks() {
   const [marks, setMarks] = useState<KissMark[]>([]);
 
   useEffect(() => {
     const totalMarks = 12;
     const newMarks: KissMark[] = [];
     
     for (let i = 0; i < totalMarks; i++) {
       newMarks.push({
         id: i,
         x: 10 + Math.random() * 80,
         y: 10 + Math.random() * 80,
         rotation: -30 + Math.random() * 60,
         scale: 0.6 + Math.random() * 0.6,
         delay: i * 0.3,
       });
     }
     
     setMarks(newMarks);
   }, []);
 
   return (
     <div className="fixed inset-0 pointer-events-none overflow-hidden z-[2]">
       {marks.map((mark) => (
         <div
           key={mark.id}
           className="absolute animate-kiss-appear"
           style={{
             left: `${mark.x}%`,
             top: `${mark.y}%`,
             animationDelay: `${mark.delay}s`,
           }}
         >
          <img
            src={kissMarkImage}
            alt=""
            className="drop-shadow-lg"
            style={{
              width: `${50 * mark.scale}px`,
              height: 'auto',
              transform: `rotate(${mark.rotation}deg)`,
            }}
          />
         </div>
       ))}
     </div>
   );
 }