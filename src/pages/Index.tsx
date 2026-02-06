import ProposalCard from "@/components/ui/ProposalCard";
import BackgroundMusic from "@/components/ui/BackgroundMusic";
import valenBg from "@/assets/valen.webp";


const Index = () => {
  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Valentine hearts pattern background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${valenBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
        }}
      />
      
      {/* Dimmed overlay with blur for readability */}
      <div className="fixed inset-0 z-0 bg-background/40 backdrop-blur-[2px]" />
      
      {/* Subtle glow overlay */}
      <div className="fixed inset-0 romantic-glow pointer-events-none z-5" />
      
      {/* Background Music Toggle */}
      <BackgroundMusic />
      
      {/* Main content */}
      <ProposalCard />
    </div>
  );
};

export default Index;
