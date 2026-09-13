import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import ThreatRadar from "../components/ThreatRadar";
import HybridChatbot from "../components/Chatbot";
import { Scan, AlertTriangle, MessageSquare } from "lucide-react";
import { useSound } from "../context/SoundContext";

function SurveillanceTerminal() {
  const [lines, setLines] = useState([]);
  const [isScanning, setIsScanning] = useState(true);
  const { playHover, playClick } = useSound();

  const scanSequence = [
    "INITIATING KINETIC SWEEP...",
    "HANDSHAKE PROTOCOL: SECURE.",
    "SCANNING VISITOR HARDWARE...",
    "KINETIC DISPERSION: STABLE.",
    "ISOLATING BIOMETRIC SIGNATURE...",
    "THREAT LEVEL: CIVILIAN.",
    "AEGIS (VANCE, A.): 'I see you. You are safe here. State your emergency.'",
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < scanSequence.length) {
        setLines((prev) => [...prev, scanSequence[currentLine]]);
        currentLine++;
      } else {
        setIsScanning(false);
        clearInterval(interval);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white dark:bg-slate-950/80 border border-slate-400 dark:border-cyan-900/50 p-6 rounded-xl font-mono text-sm shadow-xl dark:shadow-[0_0_20px_rgba(6,182,212,0.1)] backdrop-blur-md relative overflow-hidden transition-colors h-full flex flex-col">
      {isScanning && (
        <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/50 dark:bg-cyan-500/50 shadow-[0_0_10px_rgba(59,130,246,1)] dark:shadow-[0_0_10px_rgba(6,182,212,1)] animate-[scan_2s_ease-in-out_infinite]" />
      )}

      <div className="flex items-center gap-2 mb-4 text-blue-700 dark:text-blue-700 dark:text-cyan-500 border-b border-slate-400 dark:border-cyan-900/50 pb-2">
        <Scan className={`w-5 h-5 ${isScanning ? "animate-spin" : ""}`} />
        <span className="font-bold tracking-widest uppercase">
          Live Surveillance Feed
        </span>
      </div>

      <div className="space-y-2 text-slate-800 dark:text-blue-600 dark:text-cyan-400 flex-1">
        {lines.map((line, idx) => (
          <div key={idx} className="flex gap-2">
            <span className="text-slate-400 dark:text-slate-600">&gt;</span>
            <span
              className={
                idx === scanSequence.length - 1
                  ? "text-emerald-600 dark:text-emerald-400 font-bold"
                  : ""
              }
            >
              {line}
            </span>
          </div>
        ))}
        {isScanning && (
          <span className="animate-pulse inline-block w-2 h-4 bg-blue-600 dark:bg-cyan-500 ml-2" />
        )}
      </div>

      {!isScanning && (
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 animate-in fade-in zoom-in duration-500">
          <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-500 animate-pulse" />
          <Link
            to="/dispatch"
            onMouseEnter={playHover}
            onClick={playClick}
            className="flex-1 text-center bg-blue-600 dark:bg-cyan-600 hover:bg-blue-700 dark:hover:bg-cyan-500 text-white dark:text-slate-950 font-bold px-6 py-3 rounded uppercase tracking-widest transition-all hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] dark:hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]"
          >
            Enter Dispatch Terminal
          </Link>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [showChat, setShowChat] = useState(true);
  const { playHover, playClick } = useSound();

  return (
    <div className="min-h-screen relative pb-20">
      <HeroSection />

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SurveillanceTerminal />
          <ThreatRadar />
        </div>
      </div>

      {/* Floating Chatbot Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
        {showChat && (
          <div className="mb-4 pointer-events-auto animate-in slide-in-from-bottom-5 duration-300 origin-bottom-right">
            <HybridChatbot
              variant="floating"
              onClose={() => setShowChat(false)}
            />
          </div>
        )}
        {!showChat && (
          <button
            onClick={() => {
              playClick();
              setShowChat(true);
            }}
            onMouseEnter={playHover}
            className="pointer-events-auto bg-cyan-600 hover:bg-cyan-500 text-white rounded-full p-4 shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-transform hover:scale-110 flex items-center justify-center animate-bounce"
            title="Open Aegis Comm-Link"
          >
            <MessageSquare className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}
