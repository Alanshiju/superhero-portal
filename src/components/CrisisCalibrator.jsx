import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Activity, Wind, AlertCircle, X, ShieldAlert, Zap } from "lucide-react";
import { useSound } from "../context/SoundContext";

export default function CrisisCalibrator() {
  const [isOpen, setIsOpen] = useState(false);
  const { playHover, playClick, playResonance } = useSound();

  useEffect(() => {
    let interval;
    if (isOpen) {
      playResonance();
      interval = setInterval(() => {
        playResonance();
      }, 12000);
    }
    return () => clearInterval(interval);
  }, [isOpen, playResonance]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        playClick();
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, playClick]);

  const modalContent = isOpen ? (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          playClick();
          setIsOpen(false);
        }
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-xl overflow-y-auto"
    >
      <div className="bg-slate-900 border border-slate-700 rounded-sm shadow-[0_0_60px_rgba(245,158,11,0.2)] w-full max-w-2xl max-h-[85vh] flex flex-col relative animate-in fade-in zoom-in-95 duration-200 my-auto">
        {/* Modal Header */}
        <div className="bg-slate-900/90 backdrop-blur-md p-4 px-6 border-b border-slate-800 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2 text-amber-500 font-mono font-bold uppercase tracking-widest text-sm sm:text-base">
            <ShieldAlert className="w-5 h-5 text-amber-500 animate-pulse" />
            Stabilization Protocol
          </div>
          <button
            onClick={() => {
              playClick();
              setIsOpen(false);
            }}
            onMouseEnter={playHover}
            className="text-slate-400 hover:text-white bg-slate-800/80 hover:bg-red-950 hover:border-red-500/50 border border-slate-700/50 p-1.5 rounded-sm transition-colors cursor-pointer flex items-center gap-1 text-xs font-mono"
            aria-label="Close modal"
          >
            <span className="hidden sm:inline text-[10px] text-slate-400">
              ESC
            </span>
            <X className="w-4 h-4 text-amber-500 hover:text-red-400" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-10 overflow-y-auto flex-1">
          {/* Grounding / Breathing Pacer */}
          <div className="flex flex-col items-center text-center space-y-6">
            <h3 className="font-mono text-sky-500 font-bold text-xs uppercase tracking-widest">
              Kinetic Core Synchronization
            </h3>
            <p className="text-slate-400 text-xs font-mono uppercase tracking-wide max-w-md">
              Sync your breathing with the kinetic core. You are safe.
              Stabilizing heart rate.
            </p>

            <div className="relative w-48 h-48 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-amber-500/20 animate-[ping_12s_ease-in-out_infinite]" />
              <div className="absolute inset-4 rounded-full border border-sky-400/40 animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-8 rounded-full border border-amber-300/60 animate-[spin_15s_linear_infinite_reverse]" />

              <div className="w-24 h-24 rounded-full bg-amber-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.4)] animate-[breathe_12s_ease-in-out_infinite]">
                <Wind className="w-8 h-8 text-amber-500" />
              </div>
            </div>

            <div className="font-mono text-amber-500 font-bold text-xs tracking-wider border border-amber-500/30 px-4 py-2 bg-amber-500/10">
              <span>IN (4s) - HOLD (4s) - OUT (4s)</span>
            </div>
          </div>

          {/* Emergency Offline Quick-Guide */}
          <div className="space-y-4 border-t border-slate-800 pt-6">
            <h3 className="font-mono text-sky-500 font-bold text-xs uppercase tracking-widest mb-4">
              Emergency Tactical Directives
            </h3>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="bg-[#0d1117] p-4 rounded-sm border border-slate-800 hover:border-amber-500/40 transition-colors">
                <h4 className="font-bold text-white font-mono uppercase tracking-wide mb-2 flex items-center gap-2 text-[10px]">
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />{" "}
                  Structural Yield
                </h4>
                <ul className="text-[10px] font-mono text-slate-400 space-y-1.5 list-disc list-inside">
                  <li>Evacuate immediately if path is clear.</li>
                  <li>Seek load-bearing archways.</li>
                  <li>Cover neck and head.</li>
                  <li>Aegis dampeners auto-target seismic anomalies.</li>
                </ul>
              </div>

              <div className="bg-[#0d1117] p-4 rounded-sm border border-slate-800 hover:border-sky-500/40 transition-colors">
                <h4 className="font-bold text-white font-mono uppercase tracking-wide mb-2 flex items-center gap-2 text-[10px]">
                  <Zap className="w-4 h-4 text-sky-500 shrink-0" /> Grid Failure
                </h4>
                <ul className="text-[10px] font-mono text-slate-400 space-y-1.5 list-disc list-inside">
                  <li>Stay indoors and away from glass.</li>
                  <li>Disconnect non-essential electronics.</li>
                  <li>Kinetic mesh intercepts atmospheric friction.</li>
                </ul>
              </div>

              <div className="bg-[#0d1117] p-4 rounded-sm border border-slate-800 hover:border-red-500/40 transition-colors">
                <h4 className="font-bold text-white font-mono uppercase tracking-wide mb-2 flex items-center gap-2 text-[10px]">
                  <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />{" "}
                  Hostile Threat
                </h4>
                <ul className="text-[10px] font-mono text-slate-400 space-y-1.5 list-disc list-inside">
                  <li>Avoid direct confrontation.</li>
                  <li>Find immediate cover.</li>
                  <li>Maintain low profile.</li>
                  <li>Aegis intercepts physical projectiles instantly.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer with Dismiss button */}
        <div className="p-3 px-6 bg-[#0d1117] border-t border-slate-800 flex justify-end shrink-0">
          <button
            onClick={() => {
              playClick();
              setIsOpen(false);
            }}
            onMouseEnter={playHover}
            className="px-4 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-sm border border-slate-700 hover:border-amber-500/50 transition-colors cursor-pointer"
          >
            DISENGAGE
          </button>
        </div>
      </div>

      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          33% { transform: scale(1.6); opacity: 1; }
          66% { transform: scale(1.6); opacity: 1; }
        }
      `}</style>
    </div>
  ) : null;

  return (
    <>
      <button
        onClick={() => {
          playClick();
          setIsOpen(true);
        }}
        onMouseEnter={playHover}
        className="fixed bottom-16 right-6 md:right-8 z-40 bg-[#0d1117]/90 hover:bg-slate-900 border border-amber-500/50 text-amber-500 font-mono text-[10px] px-3 py-2 rounded-sm shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all flex items-center gap-2 hover:scale-105 backdrop-blur-md uppercase tracking-widest cursor-pointer"
      >
        <Activity className="w-4 h-4 animate-pulse" />
        Crisis Calibrator
      </button>

      {modalContent && createPortal(modalContent, document.body)}
    </>
  );
}
