import React, { useState, useEffect } from "react";
import {
  Activity,
  Radio,
  ShieldAlert,
  Zap,
  Cpu,
  ArrowRightLeft,
  Crosshair,
} from "lucide-react";
import { useSound } from "../context/SoundContext";

const INITIAL_SECTORS = [
  { id: 1, name: "GRID 01: NORTHERN CORE", load: 92, threat: "LOW", drones: 4 },
  {
    id: 2,
    name: "GRID 02: EAST SEABOARD",
    load: 85,
    threat: "MODERATE",
    drones: 12,
  },
  { id: 3, name: "GRID 03: INDUSTRIAL", load: 60, threat: "HIGH", drones: 35 },
  { id: 4, name: "GRID 04: CENTRAL HUB", load: 95, threat: "LOW", drones: 2 },
  {
    id: 5,
    name: "GRID 05: TRANSIT NEXUS",
    load: 78,
    threat: "MODERATE",
    drones: 18,
  },
  {
    id: 6,
    name: "GRID 06: SOUTHERN RIM",
    load: 45,
    threat: "CRITICAL",
    drones: 42,
  },
];

export default function Operations() {
  const [sectors, setSectors] = useState(INITIAL_SECTORS);
  const [selectedSector, setSelectedSector] = useState(null);
  const { playHover, playClick, playAlert, playResonance } = useSound();

  useEffect(() => {
    const interval = setInterval(() => {
      setSectors((prev) =>
        prev.map((s) => {
          const delta = Math.floor(Math.random() * 7) - 3;
          let newLoad = s.load + delta;
          if (newLoad > 100) newLoad = 100;
          if (newLoad < 10) newLoad = 10;

          let newThreat = "LOW";
          if (newLoad < 50) newThreat = "CRITICAL";
          else if (newLoad < 75) newThreat = "HIGH";
          else if (newLoad < 90) newThreat = "MODERATE";

          return { ...s, load: newLoad, threat: newThreat };
        }),
      );
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleSectorClick = (sector) => {
    playClick();
    setSelectedSector(sector);
    if (sector.threat === "CRITICAL") playAlert();
  };

  const handleReroute = () => {
    playResonance();
    setSectors((prev) =>
      prev.map((s) => {
        if (s.id === selectedSector.id) {
          return { ...s, load: 100, threat: "LOW", drones: s.drones + 20 };
        }
        return s;
      }),
    );
    setSelectedSector((prev) => ({
      ...prev,
      load: 100,
      threat: "LOW",
      drones: prev.drones + 20,
    }));
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 zoom-in-95 duration-700 ease-out max-w-7xl mx-auto px-4 py-8 w-full min-h-[calc(100vh-100px)] flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-slate-300 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Radio className="h-6 w-6 text-sky-600 dark:text-sky-500 font-bold font-mono animate-pulse" />
            <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white uppercase tracking-tight">
              Mission Control
            </h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-mono text-[10px] tracking-widest uppercase">
            LIVE KINETIC GRID STATUS // OMNIPRESENT TELEMETRY
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        {/* Interactive SVG Topology Map */}
        <div className="lg:col-span-8 bg-slate-50/80 dark:bg-[#0d1117]/80 backdrop-blur-md rounded-sm p-1 border border-slate-300 dark:border-slate-800/80 relative flex flex-col min-h-[500px]">
          <div className="absolute top-4 left-4 z-10 font-mono text-[10px] font-bold text-slate-900 dark:text-white tracking-widest uppercase flex items-center gap-2 bg-slate-200 dark:bg-slate-900 px-3 py-1 border border-slate-300 dark:border-slate-800">
            <Activity className="w-3 h-3 text-sky-500" /> TOPOLOGY CANVAS
          </div>

          <div className="absolute top-4 right-4 z-10 font-mono text-[10px] text-slate-400 tracking-widest">
            + HUD_RENDER
          </div>
          <div className="absolute bottom-4 left-4 z-10 font-mono text-[10px] text-slate-400 tracking-widest">
            + GEO_SYNC
          </div>

          <div className="flex-1 relative flex items-center justify-center p-8 bg-slate-100 dark:bg-black/50 border border-slate-200 dark:border-slate-800 m-1">
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            <svg viewBox="0 0 800 600" className="w-full h-full relative z-10">
              {/* Connecting Lines */}
              <g
                stroke="#38bdf8"
                strokeWidth="1"
                fill="none"
                opacity="0.3"
                className="animate-pulse"
              >
                <path d="M 400 150 L 600 250 L 500 450 L 300 450 L 200 250 Z" />
                <path d="M 400 150 L 400 350 L 600 250" />
                <path d="M 300 450 L 400 350 L 500 450" />
                <path d="M 200 250 L 400 350" />
              </g>

              {/* Sector Nodes */}
              {sectors.map((sector, index) => {
                const coords = [
                  { x: 400, y: 150 },
                  { x: 600, y: 250 },
                  { x: 500, y: 450 },
                  { x: 400, y: 350 },
                  { x: 200, y: 250 },
                  { x: 300, y: 450 },
                ];
                const pos = coords[index];
                const isSelected = selectedSector?.id === sector.id;

                let colorHex = "#38bdf8"; // Sky
                if (sector.threat === "CRITICAL")
                  colorHex = "#ef4444"; // Red
                else if (sector.threat === "HIGH")
                  colorHex = "#f59e0b"; // Amber
                else if (sector.threat === "MODERATE") colorHex = "#eab308"; // Yellow

                return (
                  <g
                    key={sector.id}
                    transform={`translate(${pos.x}, ${pos.y})`}
                    onClick={() => handleSectorClick(sector)}
                    onMouseEnter={playHover}
                    className="cursor-pointer group hover:scale-110 transition-transform origin-center"
                  >
                    {/* Targeting reticle if selected */}
                    {isSelected && (
                      <g
                        className="animate-[spin_4s_linear_infinite]"
                        opacity="0.5"
                      >
                        <circle
                          r="60"
                          fill="none"
                          stroke={colorHex}
                          strokeWidth="1"
                          strokeDasharray="4 4"
                        />
                      </g>
                    )}

                    {/* Threat pulse */}
                    {sector.threat === "CRITICAL" && (
                      <circle
                        r="40"
                        className="fill-none stroke-red-500 stroke-[2px] animate-ping opacity-75"
                      />
                    )}

                    <circle
                      r="30"
                      fill={colorHex}
                      opacity="0.1"
                      className="group-hover:opacity-30 transition-opacity"
                    />
                    <circle r="12" fill={colorHex} />
                    <circle
                      r="16"
                      fill="none"
                      stroke={colorHex}
                      strokeWidth="2"
                      opacity="0.5"
                    />

                    <rect
                      x="-55"
                      y="25"
                      width="110"
                      height="20"
                      className="fill-white dark:fill-slate-900 stroke-slate-300 dark:stroke-slate-700"
                    />
                    <text
                      x="0"
                      y="38"
                      textAnchor="middle"
                      className="font-mono text-[9px] font-bold tracking-widest pointer-events-none"
                      fill={colorHex}
                    >
                      {sector.load}% LOAD
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Side Panel: Inspector */}
        <div className="lg:col-span-4 bg-slate-50/80 dark:bg-[#0d1117]/80 backdrop-blur-md rounded-sm p-6 border border-slate-300 dark:border-slate-800/80 flex flex-col h-full min-h-[500px]">
          {selectedSector ? (
            <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="mb-6 pb-4 border-b border-slate-300 dark:border-slate-800">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white font-mono uppercase tracking-tight">
                    {selectedSector.name}
                  </h2>
                  <Crosshair className="w-5 h-5 text-sky-500" />
                </div>

                <span
                  className={`inline-block px-2 py-0.5 rounded-sm text-[10px] font-bold font-mono tracking-widest border uppercase ${
                    selectedSector.threat === "CRITICAL"
                      ? "bg-red-500/10 text-red-600 dark:text-red-500 border-red-500/50"
                      : selectedSector.threat === "HIGH"
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-500/50"
                        : selectedSector.threat === "MODERATE"
                          ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 border-yellow-500/50"
                          : "bg-sky-500/10 text-sky-600 dark:text-sky-500 border-sky-500/50"
                  }`}
                >
                  THREAT: {selectedSector.threat}
                </span>
              </div>

              <div className="space-y-6 flex-1 font-mono text-[10px] uppercase tracking-widest">
                <div>
                  <div className="flex justify-between text-slate-500 mb-2">
                    <span>Kinetic Integrity</span>
                    <span className="text-slate-900 dark:text-white font-bold">
                      {selectedSector.load}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-900 h-1.5 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 ${
                        selectedSector.load < 50
                          ? "bg-red-500"
                          : selectedSector.load < 75
                            ? "bg-amber-500"
                            : "bg-sky-500"
                      }`}
                      style={{ width: `${selectedSector.load}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-100 dark:bg-slate-900 p-4 border border-slate-300 dark:border-slate-800">
                    <div className="text-slate-500 mb-2 flex items-center gap-1">
                      <Cpu className="w-3 h-3" /> ACTIVE DRONES
                    </div>
                    <div className="text-xl font-bold text-slate-900 dark:text-white">
                      {selectedSector.drones}
                    </div>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-900 p-4 border border-slate-300 dark:border-slate-800">
                    <div className="text-slate-500 mb-2 flex items-center gap-1">
                      <Zap className="w-3 h-3" /> RADIATION
                    </div>
                    <div className="text-xl font-bold text-slate-900 dark:text-white">
                      {(100 - selectedSector.load).toFixed(1)}{" "}
                      <span className="text-xs">µSv/h</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-100 dark:bg-slate-900/50 border-l-2 border-slate-400 dark:border-slate-700 text-slate-600 dark:text-slate-400 leading-relaxed text-[9px]">
                  Aegis automated defense matrix is dynamically allocating
                  kinetic dampeners to this region based on localized structural
                  tension.
                </div>
              </div>

              <button
                onClick={handleReroute}
                onMouseEnter={playHover}
                disabled={selectedSector.load === 100}
                className="mt-6 w-full py-4 rounded-sm font-bold font-mono tracking-widest uppercase transition-all flex justify-center items-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-900 dark:border-white"
              >
                <ArrowRightLeft className="w-4 h-4" />
                {selectedSector.load === 100
                  ? "SURPLUS OPTIMIZED"
                  : "DEPLOY KINETIC DAMPENER"}
              </button>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 font-mono text-center">
              <Crosshair className="w-12 h-12 mb-4 opacity-50" />
              <p className="text-[10px] tracking-widest uppercase max-w-[200px]">
                Select a sector from the topology canvas to initialize telemetry
                lock.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
