import React from "react";

export default function HeroVisual({ className = "w-full max-w-lg mx-auto" }) {
  return (
    <div
      className={`relative ${className} group perspective-1000 flex justify-center items-center`}
    >
      {/* Layer 1: Ambient Backdrop Glows & Grids */}
      <div className="absolute inset-0 bg-cyan-500/10 blur-3xl rounded-full group-hover:bg-cyan-400/20 transition-all duration-1000"></div>

      {/* Hexagonal Forcefield Pattern (Background) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden flex items-center justify-center">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full text-cyan-500 animate-[spin_60s_linear_infinite]"
        >
          <pattern
            id="hexagons"
            width="40"
            height="69.282"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(0.5)"
          >
            <path
              d="M 40 0 L 20 11.547 L 0 0 L 0 -23.094 L 20 -34.641 L 40 -23.094 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M 40 69.282 L 20 80.829 L 0 69.282 L 0 46.188 L 20 34.641 L 40 46.188 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      {/* Layer 2: Rotating HUD Target Reticles */}
      <div className="absolute w-[120%] h-[120%] pointer-events-none flex items-center justify-center z-0 opacity-40">
        <svg viewBox="0 0 200 200" className="w-full h-full text-cyan-400">
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="5 15"
            className="animate-[spin_20s_linear_infinite]"
          />
          <circle
            cx="100"
            cy="100"
            r="75"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="1 10 30 10"
            className="animate-[spin_15s_linear_infinite_reverse]"
          />
          <path
            d="M 10 100 L 30 100 M 170 100 L 190 100 M 100 10 L 100 30 M 100 170 L 100 190"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Layer 3: High-Fidelity Full-Scale Aegis Vector Portrait */}
      <svg
        viewBox="0 0 200 250"
        className="w-full h-auto relative z-10 drop-shadow-[0_0_25px_rgba(6,182,212,0.4)]"
      >
        <defs>
          <linearGradient id="armor-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              stopColor="#1e293b"
              className="dark:stop-color-[#0f172a]"
            />
            <stop
              offset="50%"
              stopColor="#0f172a"
              className="dark:stop-color-[#020617]"
            />
            <stop
              offset="100%"
              stopColor="#020617"
              className="dark:stop-color-[#000000]"
            />
          </linearGradient>
          <linearGradient id="visor-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="50%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
          <linearGradient id="core-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
        </defs>

        {/* Shoulders & Upper Chest Plate */}
        <path
          d="M 20,200 L 40,130 L 100,110 L 160,130 L 180,200 L 160,250 L 100,220 L 40,250 Z"
          fill="url(#armor-grad)"
          stroke="#475569"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M 40,130 L 100,150 L 160,130 L 140,180 L 100,200 L 60,180 Z"
          fill="#0f172a"
          stroke="#334155"
          strokeWidth="1.5"
        />

        {/* Kinetic Gauntlets / Arms (Hinted at edges) */}
        <path
          d="M 10,250 L 20,200 L 35,210 L 25,250 Z"
          fill="url(#armor-grad)"
          stroke="#475569"
          strokeWidth="1.5"
        />
        <path
          d="M 190,250 L 180,200 L 165,210 L 175,250 Z"
          fill="url(#armor-grad)"
          stroke="#475569"
          strokeWidth="1.5"
        />

        {/* Neck Guard */}
        <path
          d="M 70,110 L 100,130 L 130,110 L 120,80 L 100,90 L 80,80 Z"
          fill="#020617"
          stroke="#334155"
          strokeWidth="2"
        />

        {/* Helmet Base */}
        <path
          d="M 50,70 C 50,20 80,10 100,10 C 120,10 150,20 150,70 L 140,110 C 140,120 120,130 100,130 C 80,130 60,120 60,110 Z"
          fill="url(#armor-grad)"
          stroke="#475569"
          strokeWidth="2"
        />

        {/* Angular Carbon-Composite Cheek Armor */}
        <path
          d="M 55,80 L 70,95 L 70,115 L 100,125 L 130,115 L 130,95 L 145,80 L 140,110 L 100,130 L 60,110 Z"
          fill="#0f172a"
          stroke="#475569"
          strokeWidth="1.5"
        />

        {/* Luminous Cyan Visor */}
        <path
          d="M 65,65 C 75,55 90,52 100,52 C 110,52 125,55 135,65 L 140,85 C 130,95 110,98 100,98 C 90,98 70,95 60,85 Z"
          fill="url(#visor-grad)"
          className="animate-pulse"
        />
        <path
          d="M 65,65 C 75,55 90,52 100,52 C 110,52 125,55 135,65 L 140,85 C 130,95 110,98 100,98 C 90,98 70,95 60,85 Z"
          fill="none"
          stroke="#cffafe"
          strokeWidth="1.5"
        />

        {/* Visor Glare & Scanning Array */}
        <path
          d="M 70,72 L 130,72"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.9"
          className="animate-[pulse_3s_ease-in-out_infinite]"
        />
        <path
          d="M 100,52 L 100,65"
          stroke="#ffffff"
          strokeWidth="1.5"
          opacity="0.5"
        />

        {/* Glowing Quantum Core Conduit (Chest) */}
        <circle
          cx="100"
          cy="165"
          r="15"
          fill="url(#core-grad)"
          className="animate-pulse"
        />
        <circle
          cx="100"
          cy="165"
          r="18"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          className="animate-[spin_4s_linear_infinite]"
        />
        <circle
          cx="100"
          cy="165"
          r="22"
          fill="none"
          stroke="#06b6d4"
          strokeWidth="0.5"
          strokeDasharray="1 6"
          className="animate-[spin_6s_linear_infinite_reverse]"
        />
        <circle
          cx="100"
          cy="165"
          r="5"
          fill="#ffffff"
          className="animate-pulse opacity-80"
        />

        {/* Energy Lines channeling from Core to Shoulders */}
        <path
          d="M 85,160 C 60,150 45,140 30,135"
          fill="none"
          stroke="#06b6d4"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          className="animate-[pulse_2s_linear_infinite]"
        />
        <path
          d="M 115,160 C 140,150 155,140 170,135"
          fill="none"
          stroke="#06b6d4"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          className="animate-[pulse_2s_linear_infinite]"
        />
      </svg>

      {/* Ambient Breathing Animation */}
      <style>{`
        @keyframes hero-breathe {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-8px) scale(1.02); }
        }
        .group { animation: hero-breathe 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
