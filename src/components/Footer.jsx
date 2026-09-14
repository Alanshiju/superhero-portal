import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  ShieldAlert,
  TerminalSquare,
  Clock,
  Cpu,
} from "lucide-react";
import { useSound } from "../context/SoundContext";
import { toast } from "react-toastify";

export default function Footer() {
  const { playHover, playClick } = useSound();
  const [time, setTime] = useState(new Date().toISOString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toISOString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const openCli = () => {
    playClick();
    toast.info("SYS_CLI Access Denied: Requires Omega Clearance.", {
      className: "font-mono text-xs",
    });
  };

  return (
    <footer className="border-t border-slate-300 dark:border-slate-800/80 bg-slate-100/90 dark:bg-[#0d1117]/90 backdrop-blur-md mt-auto z-40 relative">
      <div className="w-full px-4 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          {/* Brand & Status */}
          <div className="flex flex-col gap-3 col-span-1">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-amber-500" />
              <span className="font-mono font-bold text-sm text-slate-900 dark:text-white uppercase tracking-widest">
                AEGIS<span className="text-amber-500">_SYS</span>
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 leading-relaxed uppercase">
              Global Kinetic Defense Network. <br />
              Protecting civilian sectors from anomalous threats.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 mt-2 font-bold tracking-widest">
              <Activity className="h-3.5 w-3.5 animate-pulse" />
              SYSTEM DIAGNOSTIC: OPTIMAL
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2 col-span-1">
            <h3 className="font-mono font-bold text-[10px] text-slate-400 dark:text-slate-500 mb-1 tracking-widest uppercase">
              [ NAV_LINKS ]
            </h3>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1">
              <Link
                to="/"
                onMouseEnter={playHover}
                onClick={playClick}
                className="text-[10px] font-mono text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors uppercase"
              >
                01_BASE
              </Link>
              <Link
                to="/dispatch"
                onMouseEnter={playHover}
                onClick={playClick}
                className="text-[10px] font-mono text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors uppercase"
              >
                02_DISPATCH
              </Link>
              <Link
                to="/intel"
                onMouseEnter={playHover}
                onClick={playClick}
                className="text-[10px] font-mono text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors uppercase"
              >
                03_INTEL
              </Link>
              <Link
                to="/operations"
                onMouseEnter={playHover}
                onClick={playClick}
                className="text-[10px] font-mono text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors uppercase"
              >
                04_OPS
              </Link>
              <Link
                to="/lab"
                onMouseEnter={playHover}
                onClick={playClick}
                className="text-[10px] font-mono text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors uppercase"
              >
                05_LAB
              </Link>
            </div>
          </div>

          {/* Active Telemetry */}
          <div className="flex flex-col gap-2 col-span-1">
            <h3 className="font-mono font-bold text-[10px] text-slate-400 dark:text-slate-500 mb-1 tracking-widest uppercase">
              [ TELEMETRY ]
            </h3>
            <div className="flex flex-col gap-1 font-mono text-[10px] text-slate-600 dark:text-slate-400">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Cpu className="w-3 h-3" /> Core Temp:
                </span>
                <span className="text-sky-600 dark:text-sky-400">0.02K</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Grid Load:</span>
                <span className="text-sky-600 dark:text-sky-400">14.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Dampeners:</span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  NOMINAL
                </span>
              </div>
            </div>
          </div>

          {/* Coordinates & CLI */}
          <div className="flex flex-col gap-2 col-span-1 justify-between h-full">
            <div className="bg-slate-200/50 dark:bg-slate-900/50 rounded-sm p-2 font-mono text-[10px] text-slate-600 dark:text-slate-300 flex items-start gap-2 border border-slate-300 dark:border-slate-800">
              <TerminalSquare className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-500" />
              <div className="flex flex-col w-full">
                <div className="flex justify-between w-full">
                  <span>LAT: 10.5276° N</span>
                  <span>LNG: 76.2144° E</span>
                </div>
                <div className="flex items-center gap-1 text-sky-600 dark:text-sky-400 mt-1 font-bold">
                  <Clock className="w-3 h-3" />
                  {time}
                </div>
              </div>
            </div>

            <button
              onClick={openCli}
              onMouseEnter={playHover}
              className="mt-2 w-full flex items-center justify-center gap-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 py-1.5 px-2 rounded-sm text-[10px] font-mono font-bold tracking-widest uppercase transition-colors border border-slate-300 dark:border-slate-700"
            >
              [OPEN SYS_CLI]
            </button>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-6 pt-4 border-t border-slate-300 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-2 text-[10px] text-slate-400 dark:text-slate-500 font-mono tracking-widest uppercase">
          <p>
            © {new Date().getFullYear()} AEGIS KINETIC GUARDIAN. ALL SHIELDS
            ACTIVE.
          </p>
          <div className="flex items-center gap-4">
            <p>CLASS: OMEGA</p>
            <p>
              STATUS: <span className="text-emerald-500 font-bold">SECURE</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
