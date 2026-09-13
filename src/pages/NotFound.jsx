import React from "react";
import { Link } from "react-router-dom";
import { AlertOctagon, Home } from "lucide-react";
import { useSound } from "../context/SoundContext";

export default function NotFound() {
  const { playHover, playClick } = useSound();

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 min-h-[70vh]">
      <div className="bg-white dark:bg-slate-900/80 border border-red-500/50 p-8 rounded-xl max-w-md w-full text-center shadow-[0_0_30px_rgba(239,68,68,0.2)]">
        <AlertOctagon className="w-16 h-16 text-red-500 mx-auto mb-4 animate-pulse" />
        <h1 className="text-4xl font-black text-slate-900 dark:text-white font-mono tracking-widest mb-2">
          404
        </h1>
        <h2 className="text-xl font-bold text-red-600 dark:text-red-400 font-mono mb-4">
          SECTOR UNREACHABLE
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8 font-mono text-sm">
          The coordinates you entered do not exist within the Aegis grid. The
          location may be classified or offline.
        </p>
        <Link
          to="/"
          onMouseEnter={playHover}
          onClick={playClick}
          className="inline-flex items-center gap-2 bg-blue-700 dark:bg-cyan-600 hover:bg-blue-800 dark:hover:bg-cyan-500 text-white dark:text-slate-950 font-bold px-6 py-3 rounded uppercase font-mono tracking-wider transition-colors"
        >
          <Home className="w-4 h-4" />
          Return to Base
        </Link>
      </div>
    </div>
  );
}
