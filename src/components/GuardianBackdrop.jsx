import React from "react";
import { useLocation } from "react-router-dom";

export default function GuardianBackdrop() {
  const location = useLocation();

  // Dynamic Stance Shifts by Route
  let stanceClasses = "scale-100 translate-x-0";
  let opacityMode = "opacity-25 dark:opacity-20";
  let filterMode = "";

  switch (location.pathname) {
    case "/":
      stanceClasses = "scale-100 translate-x-0";
      break;
    case "/dispatch":
      stanceClasses = "translate-x-12 lg:translate-x-24 scale-105 rotate-1 translate-y-4";
      break;
    case "/intel":
      stanceClasses = "scale-110 -translate-x-[20%] lg:-translate-x-[40%]";
      filterMode = "mix-blend-screen brightness-150 contrast-150 grayscale sepia drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]";
      break;
    case "/operations":
      stanceClasses = "-translate-y-8 scale-95 -translate-x-[10%]";
      break;
    case "/lab":
      stanceClasses = "-translate-x-24 lg:-translate-x-48 scale-100";
      break;
    default:
      stanceClasses = "scale-100 translate-x-0";
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-end justify-center lg:justify-end">
      <div 
        className={`relative w-full max-w-[800px] h-[90vh] transition-all duration-1000 ease-out ${stanceClasses} ${opacityMode} ${filterMode}`}
        style={{
          maskImage: "linear-gradient(to top, black 60%, transparent)",
          WebkitMaskImage: "linear-gradient(to top, black 60%, transparent)"
        }}
      >
        <svg viewBox="0 0 500 800" className="w-full h-full drop-shadow-[0_0_30px_rgba(245,158,11,0.5)]" preserveAspectRatio="xMidYMax meet">
          <defs>
            <linearGradient id="body-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="40%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <linearGradient id="accent-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            
            <pattern id="schematic" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#fbbf24" strokeWidth="0.5" opacity="0.5"/>
            </pattern>
          </defs>

          <path d="M 150,200 C 100,300 80,500 100,800 L 400,800 C 420,500 400,300 350,200 Z" fill="#020617" stroke="#1e293b" strokeWidth="2" opacity="0.9" />
          
          <path d="M 200,150 L 300,150 L 330,220 L 320,400 L 280,450 L 280,550 L 220,550 L 220,450 L 180,400 L 170,220 Z" fill={location.pathname === "/intel" ? "url(#schematic)" : "url(#body-grad)"} stroke="#475569" strokeWidth="3" />

          <path d="M 170,160 L 130,200 L 150,280 L 180,240 Z" fill="#0f172a" stroke="#334155" strokeWidth="2" />
          <path d="M 330,160 L 370,200 L 350,280 L 320,240 Z" fill="#0f172a" stroke="#334155" strokeWidth="2" />

          <path d="M 150,280 L 110,450 L 140,480 L 180,400 Z" fill="#1e293b" stroke="#334155" strokeWidth="2" />
          <path d="M 350,280 L 390,450 L 360,480 L 320,400 Z" fill="#1e293b" stroke="#334155" strokeWidth="2" />

          <path d="M 220,550 L 180,800 L 240,800 L 250,580 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
          <path d="M 280,550 L 320,800 L 260,800 L 250,580 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />

          <g className="animate-pulse">
            <circle cx="250" cy="280" r="25" fill="#f59e0b" />
            <circle cx="250" cy="280" r="35" fill="none" stroke="#fbbf24" strokeWidth="3" strokeDasharray="5 5" className="animate-[spin_10s_linear_infinite]" />
            <circle cx="250" cy="280" r="45" fill="none" stroke="#fcd34d" strokeWidth="1" opacity="0.5" />
            
            {location.pathname === "/intel" && (
              <>
                <circle cx="250" cy="280" r="80" fill="none" stroke="#fbbf24" strokeWidth="1" className="animate-ping" style={{animationDuration: "3s"}} />
                <circle cx="250" cy="280" r="120" fill="none" stroke="#f59e0b" strokeWidth="0.5" className="animate-ping" style={{animationDuration: "4s", animationDelay: "1s"}} />
              </>
            )}
          </g>

          <path d="M 210,130 C 210,70 240,60 250,60 C 260,60 290,70 290,130 L 290,170 C 290,190 260,200 250,200 C 240,200 210,190 210,170 Z" fill="#1e293b" stroke="#475569" strokeWidth="3" />

          <path d="M 220,135 C 230,130 245,128 250,128 C 255,128 270,130 280,135 L 285,150 C 270,155 255,158 250,158 C 245,158 230,155 215,150 Z" fill="url(#accent-grad)" />
          <path d="M 220,135 C 230,130 245,128 250,128 C 255,128 270,130 280,135 L 285,150 C 270,155 255,158 250,158 C 245,158 230,155 215,150 Z" fill="none" stroke="#fcd34d" strokeWidth="2" className="animate-pulse" />
          
          <path d="M 225,142 L 275,142" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" className="animate-pulse" style={{ filter: "drop-shadow(0 0 10px #fbbf24)" }} />
        </svg>
      </div>
    </div>
  );
}