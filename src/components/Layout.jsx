import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import KineticMesh from "./KineticMesh";

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    setPulse(true);
    const timer = setTimeout(() => setPulse(false), 800);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 flex flex-col selection:bg-cyan-500/30 relative isolate overflow-x-hidden pb-6">
      <KineticMesh />

      {/* Perimeter Glow */}
      <div
        className={`pointer-events-none fixed inset-0 z-50 border-4 border-blue-600/30 dark:border-cyan-500/50 shadow-[inset_0_0_50px_rgba(37,99,235,0.2)] dark:shadow-[inset_0_0_50px_rgba(6,182,212,0.3)] transition-opacity duration-700 ${pulse ? "opacity-100" : "opacity-0"}`}
      ></div>

      <Navbar />
      <main className="flex-1 relative z-10 w-full flex flex-col">
        {children}
      </main>
      <Footer />

      {/* Persistent Aegis HUD */}
      <div className="fixed bottom-0 left-0 w-full h-6 bg-white/95 dark:bg-slate-950/90 border-t-2 border-slate-300 dark:border-cyan-950 z-50 flex items-center justify-center overflow-hidden pointer-events-none select-none shadow-md">
        <div className="flex gap-4 sm:gap-12 items-center text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-slate-800 dark:text-cyan-400 uppercase">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-700 dark:bg-cyan-400 animate-pulse"></span>
            AEGIS KINETIC SHIELD: ACTIVE
          </span>
          <span className="hidden sm:inline">|</span>
          <span>CITIZEN STATUS: PROTECTED</span>
          <span className="hidden sm:inline">|</span>
          <span>THREAT INTERCEPTION: ENGAGED</span>
        </div>
      </div>
    </div>
  );
}
