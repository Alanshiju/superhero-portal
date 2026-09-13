import React from "react";
import { Activity, ShieldAlert, TerminalSquare } from "lucide-react";
import { useSound } from "../context/SoundContext";

export default function Footer() {
  const { playHover, playClick } = useSound();

  return (
    <footer className="border-t border-cyan-500/20 dark:border-cyan-500/30 bg-slate-50 dark:bg-slate-950/80 backdrop-blur-md mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Status */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
              <span className="font-mono font-bold text-lg text-slate-900 dark:text-white uppercase">
                Aegis
                <span className="text-cyan-600 dark:text-cyan-400">_Sys</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Global Kinetic Defense Network. <br />
              Protecting civilian sectors from anomalous threats.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400">
              <Activity className="h-4 w-4" />
              SYSTEM DIAGNOSTIC: OPTIMAL
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            <h3 className="font-mono font-bold text-slate-900 dark:text-white mb-2 uppercase">
              Quick Access
            </h3>
            <a
              href="/dispatch"
              onMouseEnter={playHover}
              onClick={playClick}
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-500 transition-colors"
            >
              Emergency Dispatch
            </a>
            <a
              href="/intel"
              onMouseEnter={playHover}
              onClick={playClick}
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-500 transition-colors"
            >
              Hero Dossier
            </a>
            <a
              href="/operations"
              onMouseEnter={playHover}
              onClick={playClick}
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-500 transition-colors"
            >
              Defense Grid
            </a>
            <a
              href="/lab"
              onMouseEnter={playHover}
              onClick={playClick}
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-500 transition-colors"
            >
              Shield Simulator
            </a>
          </div>

          {/* Coordinates */}
          <div className="flex flex-col gap-2">
            <h3 className="font-mono font-bold text-slate-900 dark:text-white mb-2 uppercase">
              Current Sector
            </h3>
            <div className="bg-slate-200/50 dark:bg-slate-900 rounded p-3 font-mono text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2 border border-slate-300/50 dark:border-slate-800">
              <TerminalSquare className="h-4 w-4 shrink-0 mt-0.5 text-cyan-500" />
              <div>
                <p>LAT: 10.5276° N</p>
                <p>LNG: 76.2144° E</p>
                <p className="text-cyan-600 dark:text-cyan-400 mt-1">
                  STATUS: SECURE
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-mono">
          <p>
            © {new Date().getFullYear()} AEGIS KINETIC GUARDIAN. ALL SHIELDS
            ACTIVE.
          </p>
          <p>CLASSIFIED LEVEL: ALPHA</p>
        </div>
      </div>
    </footer>
  );
}
