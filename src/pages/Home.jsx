import HeroSection from '../components/HeroSection';
import Chatbot from '../components/Chatbot';
import KineticMesh from '../components/KineticMesh';

export default function Home() {
  return (
    <div className="min-h-screen text-white font-sans selection:bg-cyan-500 selection:text-slate-900 relative">
      
      {/* The Real-Time Math Background */}
      <KineticMesh />
      
      {/* Ensure UI components sit above the canvas layer */}
      <div className="relative z-10">
        <HeroSection />
        
        <div className="max-w-4xl mx-auto px-4 py-12" id="dispatch-console">
          <h2 className="text-3xl font-bold text-cyan-400 mb-6 text-center tracking-wide font-mono uppercase">
            [ Secure Dispatch Console ]
          </h2>
          <Chatbot />
        </div>
      </div>
      
    </div>
  );
}