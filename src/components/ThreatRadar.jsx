import React from "react";

export default function ThreatRadar() {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white/90 dark:bg-slate-950/80 border border-slate-300 dark:border-cyan-900/50 rounded-xl shadow-xl dark:shadow-[0_0_20px_rgba(6,182,212,0.1)] backdrop-blur-md overflow-hidden relative">
      <div className="absolute top-4 left-4 font-mono text-xs text-slate-500 dark:text-cyan-600/50">
        RADAR_SWEEP_ACTIVE
      </div>

      <div className="relative w-64 h-64 rounded-full border border-cyan-500/30 flex items-center justify-center overflow-hidden bg-slate-900">
        {/* Grid lines */}
        <div className="absolute w-full h-px bg-cyan-500/20"></div>
        <div className="absolute h-full w-px bg-cyan-500/20"></div>
        <div className="absolute w-48 h-48 rounded-full border border-cyan-500/20"></div>
        <div className="absolute w-32 h-32 rounded-full border border-cyan-500/20"></div>
        <div className="absolute w-16 h-16 rounded-full border border-cyan-500/20"></div>

        {/* Radar Sweep */}
        <div className="absolute w-32 h-32 origin-bottom-right bottom-1/2 right-1/2 bg-gradient-to-tr from-transparent to-cyan-500/40 animate-[spin_4s_linear_infinite] border-r border-cyan-400"></div>

        {/* Blips */}
        <div className="absolute top-10 left-20 w-2 h-2 rounded-full bg-red-500 animate-ping"></div>
        <div className="absolute top-10 left-20 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_red]"></div>

        <div
          className="absolute bottom-16 right-12 w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute bottom-16 right-12 w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_8px_yellow]"></div>
      </div>

      <div className="mt-6 flex justify-between w-full text-xs font-mono text-slate-600 dark:text-cyan-400">
        <span>SENSORS: ONLINE</span>
        <span>THREATS DETECTED: 2</span>
      </div>
    </div>
  );
}
