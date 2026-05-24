import peejoImg from '../../assets/peejo-2.jpg';

export default function CuteLoveIllustration({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? 'w-full h-full' : 'mx-auto mb-4 sm:mb-6 w-full max-w-sm flex justify-center'}>
      <div className={`rounded-full overflow-hidden border-4 border-rose-400 shadow-romantic flex items-center justify-center ${compact ? 'w-full h-full' : 'w-48 h-48 sm:w-64 sm:h-64'}`}>
        <img 
          src={peejoImg} 
          alt="You and me" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
