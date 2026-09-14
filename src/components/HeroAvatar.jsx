import React from "react";

export default function HeroAvatar({ className = "w-48 h-48", eyeOffset = { x: 0, y: 0 } }) {
  return (
    <div className={`relative ${className} group`}>
      {/* Glow Behind */}
      <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full group-hover:bg-amber-400/40 transition-all duration-1000 animate-pulse"></div>

      {/* Inline SVG - Aegis Helmet */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full relative z-10 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]"
      >
        <defs>
          <linearGradient id="armor-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="50%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <linearGradient id="visor-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        {/* Floating background nodes (mesh vibe) */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="rgba(245,158,11,0.2)"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="animate-[spin_20s_linear_infinite]"
        />
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="rgba(245,158,11,0.4)"
          strokeWidth="0.5"
          strokeDasharray="2 6"
          className="animate-[spin_15s_linear_infinite_reverse]"
        />

        {/* Main Helmet Base */}
        <path
          d="M 25,40 C 25,20 40,15 50,15 C 60,15 75,20 75,40 L 75,65 C 75,80 60,85 50,85 C 40,85 25,80 25,65 Z"
          fill="url(#armor-grad)"
          stroke="#334155"
          strokeWidth="2"
        />

        {/* Angular Carbon-Composite Collar/Cheek Armor */}
        <path
          d="M 22,50 L 32,55 L 32,70 L 45,80 L 55,80 L 68,70 L 68,55 L 78,50 L 75,70 L 60,88 L 40,88 L 25,70 Z"
          fill="#0f172a"
          stroke="#475569"
          strokeWidth="1"
        />

        {/* Ocular Visor */}
        <path
          d="M 30,45 C 35,42 45,40 50,40 C 55,40 65,42 70,45 L 72,55 C 65,60 55,62 50,62 C 45,62 35,60 28,55 Z"
          fill="url(#visor-grad)"
        />
        <path
          d="M 30,45 C 35,42 45,40 50,40 C 55,40 65,42 70,45 L 72,55 C 65,60 55,62 50,62 C 45,62 35,60 28,55 Z"
          fill="none"
          stroke="#fcd34d"
          strokeWidth="1.5"
          className="animate-pulse"
        />

        {/* Visor Glare / Scanning Line */}
        <g style={{ transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`, transition: "transform 0.1s ease-out" }}>
          <path
            d="M 38,48 L 62,48"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="1"
            className="animate-pulse"
            style={{ filter: "drop-shadow(0 0 5px #fbbf24)" }}
          />
        </g>

        {/* Chest/Neck Kinetic Core */}
        <circle cx="50" cy="78" r="4" fill="#f59e0b" />
        <circle
          cx="50"
          cy="78"
          r="6"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="1"
          strokeDasharray="1 2"
          className="animate-[spin_3s_linear_infinite]"
        />

        {/* Ventilation/Detail lines */}
        <line
          x1="40"
          y1="25"
          x2="45"
          y2="25"
          stroke="#334155"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="55"
          y1="25"
          x2="60"
          y2="25"
          stroke="#334155"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="45"
          y1="30"
          x2="55"
          y2="30"
          stroke="#334155"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Subtle idle breathing animation via CSS classes */}
      <style>{`
        @keyframes hover-breathe {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        .group { animation: hover-breathe 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
