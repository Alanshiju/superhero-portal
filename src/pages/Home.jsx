import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HybridChatbot from "../components/Chatbot";
import HeroAvatar from "../components/HeroAvatar";
import {
  Scan,
  AlertTriangle,
  ShieldAlert,
  Activity,
  Wifi,
  TerminalSquare,
  Target,
  ChevronRight,
} from "lucide-react";
import { useSound } from "../context/SoundContext";

export default function Home() {
  const [showChat, setShowChat] = useState(true);
  const { playHover, playClick } = useSound();

  // Tactical Diagnostics state
  const [diagnostics, setDiagnostics] = useState({
    load: 45,
    latency: 12,
    threat: "LOW",
  });

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setShowChat(false);
    }
    const interval = setInterval(() => {
      setDiagnostics({
        load: Math.floor(Math.random() * 20) + 30,
        latency: Math.floor(Math.random() * 8) + 8,
        threat: Math.random() > 0.9 ? "ELEVATED" : "LOW",
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 zoom-in-95 duration-700 ease-out min-h-screen relative pb-20 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 relative z-10 w-full">
        {/* Asymmetric Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          {/* Left: Vertical Telemetry Rail */}
          <div className="hidden lg:flex lg:col-span-3 flex-col justify-between border-l-2 border-slate-300 dark:border-slate-800 pl-6 py-2 h-full">
            <div className="space-y-6">
              <div>
                <h4 className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase mb-2">
                  Sector Status
                </h4>
                <div
                  className={`flex items-center gap-2 text-sm font-mono font-bold ${diagnostics.threat === "LOW" ? "text-emerald-600 dark:text-emerald-400" : "text-amber-500 animate-pulse"}`}
                >
                  <ShieldAlert className="w-4 h-4" />
                  THREAT: {diagnostics.threat}
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase mb-2">
                  Kinetic Dampeners
                </h4>
                <div className="w-full bg-slate-200 dark:bg-slate-900 rounded-sm h-1.5 overflow-hidden mb-1">
                  <div
                    className="bg-sky-500 h-full transition-all duration-1000"
                    style={{ width: `${diagnostics.load}%` }}
                  ></div>
                </div>
                <div className="text-xs font-mono text-slate-600 dark:text-slate-400">
                  {diagnostics.load}% READY
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase mb-2">
                  Mesh Latency
                </h4>
                <div className="flex items-center gap-2 text-sm font-mono font-bold text-sky-600 dark:text-sky-400">
                  <Wifi className="w-4 h-4" />
                  {diagnostics.latency}ms Ping
                </div>
              </div>
            </div>

            <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase border-t border-slate-300 dark:border-slate-800 pt-4 mt-8">
              [ SEC-07 // ONLINE ]
            </div>
          </div>

          {/* Right/Center: Hero Typography */}
          <div className="lg:col-span-9 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-500 rounded-sm text-[10px] font-mono font-bold tracking-widest uppercase w-max mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
              Emergency Broadcast Active
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tight text-slate-950 dark:text-white leading-[0.9] mb-6">
              Project Aegis <br />
              <span className="text-slate-400 dark:text-slate-600">
                The Kinetic Shield
              </span>
            </h1>

            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 font-medium max-w-2xl mb-8 leading-relaxed">
              Dr. Alexander Vance was consumed by the Kinetic-0 reactor. Now, he
              exists as a living, omnipresent electromagnetic field. He is the
              grid. He is the shield. And he is listening.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/dispatch"
                onMouseEnter={playHover}
                onClick={playClick}
                className="group relative inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-8 py-4 rounded-sm uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]"
              >
                <span>Initiate Dispatch</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/intel"
                onMouseEnter={playHover}
                onClick={playClick}
                className="inline-flex items-center gap-2 px-6 py-4 border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold font-mono text-xs tracking-widest uppercase transition-colors rounded-sm"
              >
                [ Read Dossier ]
              </Link>
            </div>
          </div>
        </div>

        {/* Tactical Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Wide Card: Radar Sweep (Span 2) */}
          <div className="lg:col-span-2 bg-slate-50/80 dark:bg-[#0d1117]/80 backdrop-blur-md border border-slate-300 dark:border-slate-800/80 p-6 rounded-sm flex flex-col relative overflow-hidden group min-h-[300px]">
            <div className="flex items-center justify-between mb-4 relative z-10 border-b border-slate-300 dark:border-slate-800/80 pb-3">
              <h3 className="font-mono font-bold text-xs text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                <Target className="w-4 h-4 text-sky-500" /> Live Sweep Feed
              </h3>
              <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400 font-bold">
                OP: ACTIVE
              </span>
            </div>

            <div className="flex-1 relative flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.1)_0%,transparent_70%)]" />

              {/* Simple Radar CSS implementation */}
              <div className="relative w-48 h-48 rounded-full border border-sky-500/30 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-sky-500/10 scale-50" />
                <div className="absolute inset-0 rounded-full border border-sky-500/10 scale-75" />
                <div className="absolute w-full h-[1px] bg-sky-500/20" />
                <div className="absolute h-full w-[1px] bg-sky-500/20" />

                {/* Scanner line */}
                <div
                  className="absolute top-1/2 left-1/2 w-24 h-24 origin-top-left border-r-2 border-b-2 border-sky-400 rounded-br-full opacity-50 animate-[spin_4s_linear_infinite]"
                  style={{
                    background:
                      "linear-gradient(135deg, transparent 50%, rgba(56,189,248,0.2) 100%)",
                  }}
                />

                {/* Blips */}
                <div className="absolute w-2 h-2 bg-amber-500 rounded-full top-[30%] left-[60%] animate-ping" />
                <div className="absolute w-1.5 h-1.5 bg-sky-400 rounded-full top-[60%] left-[20%] opacity-70" />
                <div className="absolute w-1.5 h-1.5 bg-sky-400 rounded-full top-[70%] left-[70%] opacity-50" />
              </div>

              <div className="absolute bottom-0 right-0 text-[10px] font-mono text-slate-400">
                [GRID_REF: 44.2.99]
              </div>
            </div>
          </div>

          {/* Tall Card: Civilian Distress Wire */}
          <div className="lg:col-span-1 bg-slate-50/80 dark:bg-[#0d1117]/80 backdrop-blur-md border border-slate-300 dark:border-slate-800/80 p-6 rounded-sm flex flex-col relative overflow-hidden h-[300px]">
            <div className="flex items-center justify-between mb-4 relative z-10 border-b border-slate-300 dark:border-slate-800/80 pb-3">
              <h3 className="font-mono font-bold text-xs text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                <TerminalSquare className="w-4 h-4 text-amber-500" /> Distress
                Wire
              </h3>
            </div>

            <div className="flex-1 overflow-hidden relative flex flex-col gap-3 font-mono text-[10px] uppercase">
              <div className="border-l-2 border-sky-500 pl-3">
                <div className="text-sky-600 dark:text-sky-400 mb-1">
                  SYS_LOG //{" "}
                  {new Date().toISOString().split("T")[1].slice(0, 8)}
                </div>
                <div className="text-slate-600 dark:text-slate-400">
                  Auto-dampeners engaged at Transit Core. Civilian casualties:
                  0.
                </div>
              </div>
              <div className="border-l-2 border-amber-500 pl-3 opacity-80">
                <div className="text-amber-600 dark:text-amber-500 mb-1">
                  INCIDENT // T-MINUS 12m
                </div>
                <div className="text-slate-600 dark:text-slate-400">
                  Seismic anomaly detected in Sector 14. Dispatching
                  surveillance.
                </div>
              </div>
              <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-3 opacity-50">
                <div className="text-slate-500 mb-1">
                  ROUTINE // T-MINUS 45m
                </div>
                <div className="text-slate-600 dark:text-slate-400">
                  Handshake protocol refresh successful.
                </div>
              </div>

              {/* Fade out bottom */}
              <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-slate-50 dark:from-[#0d1117] to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chatbot Widget (PRESERVED) */}
      <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 flex flex-col items-end pointer-events-none">
        {showChat && (
          <div className="pointer-events-auto animate-in slide-in-from-bottom-5 duration-300 origin-bottom-right fixed inset-x-3 bottom-20 z-50 max-h-[75vh] md:max-h-none md:relative md:inset-x-auto md:bottom-auto md:mb-4 rounded-xl shadow-2xl flex justify-center border border-slate-300 dark:border-slate-800">
            <HybridChatbot
              variant="floating"
              onClose={() => setShowChat(false)}
            />
          </div>
        )}
        {!showChat && (
          <div className="pointer-events-auto relative group">
            <button
              onClick={() => {
                playClick();
                setShowChat(true);
              }}
              onMouseEnter={playHover}
              className="bg-slate-100 dark:bg-slate-900 border border-slate-400 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-500 rounded-full p-2 shadow-lg transition-transform hover:scale-110 flex items-center justify-center animate-bounce"
              title="Open Aegis Comm-Link"
            >
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border border-slate-900"></span>
              </span>
              <HeroAvatar className="w-10 h-10 shrink-0" />
            </button>
            <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 bg-slate-900 border border-slate-700 text-sky-400 text-xs font-mono font-bold rounded-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity hidden md:block uppercase tracking-widest">
              COMM-LINK STANDBY
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
