import React, { useState, useEffect } from "react";
import {
  Activity,
  Radio,
  ShieldAlert,
  Zap,
  Cpu,
  ArrowRightLeft,
} from "lucide-react";
import { useSound } from "../context/SoundContext";

const INITIAL_SECTORS = [
  { id: 1, name: "Grid 01: Northern Core", load: 92, threat: "LOW", drones: 4 },
  {
    id: 2,
    name: "Grid 02: Eastern Seaboard",
    load: 85,
    threat: "MODERATE",
    drones: 12,
  },
  {
    id: 3,
    name: "Grid 03: Industrial Zone",
    load: 60,
    threat: "HIGH",
    drones: 35,
  },
  { id: 4, name: "Grid 04: Central Hub", load: 95, threat: "LOW", drones: 2 },
  {
    id: 5,
    name: "Grid 05: Transit Nexus",
    load: 78,
    threat: "MODERATE",
    drones: 18,
  },
  {
    id: 6,
    name: "Grid 06: Southern Rim",
    load: 45,
    threat: "CRITICAL",
    drones: 42,
  },
];

export default function Operations() {
  const [sectors, setSectors] = useState(INITIAL_SECTORS);
  const [selectedSector, setSelectedSector] = useState(null);
  const { playHover, playClick, playAlert, playResonance } = useSound();

  // Simulate Load Fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setSectors((prev) =>
        prev.map((s) => {
          // Fluctuate load by -3 to +3
          const delta = Math.floor(Math.random() * 7) - 3;
          let newLoad = s.load + delta;
          if (newLoad > 100) newLoad = 100;
          if (newLoad < 10) newLoad = 10;

          // Update threat based on load
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
    <div className="max-w-7xl mx-auto px-4 py-12 w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-slate-400 dark:border-slate-800 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Radio className="h-8 w-8 text-blue-700 dark:text-cyan-400 font-bold font-mono animate-pulse" />
            <h1 className="text-3xl font-bold font-mono text-slate-950 dark:text-white font-extrabold uppercase">
              Operations & Telemetry
            </h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400 font-mono text-sm">
            LIVE KINETIC GRID STATUS • OMNIPRESENT MONITORING
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Interactive SVG Topology Map */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900/50 backdrop-blur-md rounded-xl p-6 border border-slate-400 dark:border-cyan-900/50 shadow-lg relative overflow-hidden flex flex-col min-h-[500px]">
          <div className="absolute top-4 left-4 z-10 font-mono text-xs text-blue-700 dark:text-cyan-500 font-bold flex items-center gap-2">
            <Activity className="w-4 h-4" /> LIVE KINETIC TOPOLOGY
          </div>

          <div className="flex-1 relative flex items-center justify-center p-8">
            <svg
              viewBox="0 0 800 600"
              className="w-full h-full drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            >
              {/* Grid Background Lines */}
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="rgba(6, 182, 212, 0.1)"
                  strokeWidth="1"
                />
              </pattern>
              <rect width="800" height="600" fill="url(#grid)" />

              {/* Connecting Lines */}
              <g
                stroke="rgba(6, 182, 212, 0.4)"
                strokeWidth="2"
                fill="none"
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
                  { x: 400, y: 150 }, // Grid 01
                  { x: 600, y: 250 }, // Grid 02
                  { x: 500, y: 450 }, // Grid 03
                  { x: 400, y: 350 }, // Grid 04
                  { x: 200, y: 250 }, // Grid 05
                  { x: 300, y: 450 }, // Grid 06
                ];
                const pos = coords[index];

                let colorClass = "fill-cyan-500 stroke-cyan-300";
                let textClass = "fill-cyan-100";
                if (sector.threat === "CRITICAL") {
                  colorClass = "fill-red-500 stroke-red-300";
                  textClass = "fill-red-100";
                } else if (sector.threat === "HIGH") {
                  colorClass = "fill-orange-500 stroke-orange-300";
                  textClass = "fill-orange-100";
                } else if (sector.threat === "MODERATE") {
                  colorClass = "fill-yellow-500 stroke-yellow-300";
                  textClass = "fill-yellow-100";
                }

                return (
                  <g
                    key={sector.id}
                    transform={`translate(${pos.x}, ${pos.y})`}
                    onClick={() => handleSectorClick(sector)}
                    onMouseEnter={playHover}
                    className="cursor-pointer group hover:scale-110 transition-transform origin-center"
                  >
                    <circle
                      r="40"
                      className={`${colorClass} opacity-20 group-hover:opacity-40 transition-opacity`}
                    />
                    <circle
                      r="20"
                      className={`${colorClass} opacity-80`}
                      strokeWidth="3"
                    />

                    {/* Ripple if Critical */}
                    {sector.threat === "CRITICAL" && (
                      <circle
                        r="40"
                        className="fill-none stroke-red-500 stroke-[3px] animate-ping opacity-50"
                      />
                    )}

                    <rect
                      x="-45"
                      y="30"
                      width="90"
                      height="24"
                      rx="4"
                      className="fill-slate-900 stroke-slate-700 stroke-1 opacity-80"
                    />
                    <text
                      x="0"
                      y="46"
                      textAnchor="middle"
                      className={`font-mono text-[10px] font-bold tracking-widest pointer-events-none ${textClass}`}
                    >
                      {sector.load}% LOAD
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Selected Sector Drawer / Inspector */}
        <div className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-md rounded-xl p-6 border border-slate-400 dark:border-slate-800 shadow-lg relative flex flex-col h-full transition-colors min-h-[500px]">
          {selectedSector ? (
            <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-8 duration-300">
              <div className="mb-6 pb-4 border-b border-slate-400 dark:border-slate-800">
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white font-extrabold font-mono uppercase">
                  {selectedSector.name}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-bold font-mono tracking-widest ${
                      selectedSector.threat === "CRITICAL"
                        ? "bg-red-500/20 text-red-500 border border-red-500/50"
                        : selectedSector.threat === "HIGH"
                          ? "bg-orange-500/20 text-orange-500 border border-orange-500/50"
                          : selectedSector.threat === "MODERATE"
                            ? "bg-yellow-500/20 text-yellow-500 border border-yellow-500/50"
                            : "bg-blue-200 dark:bg-cyan-500/20 text-blue-700 dark:text-cyan-500 border border-blue-400 dark:border-cyan-500/50"
                    }`}
                  >
                    THREAT: {selectedSector.threat}
                  </span>
                </div>
              </div>

              <div className="space-y-6 flex-1 font-mono text-sm">
                <div>
                  <div className="flex justify-between text-slate-500 dark:text-slate-400 mb-2">
                    <span>Kinetic Shield Integrity</span>
                    <span className="text-slate-950 dark:text-white font-extrabold font-bold">
                      {selectedSector.load}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 ${
                        selectedSector.load < 50
                          ? "bg-red-500"
                          : selectedSector.load < 75
                            ? "bg-orange-500"
                            : "bg-cyan-500"
                      }`}
                      style={{ width: `${selectedSector.load}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-200 dark:bg-slate-950 p-4 rounded border border-slate-400 dark:border-slate-800">
                    <div className="text-slate-500 mb-1 flex items-center gap-1">
                      <Cpu className="w-4 h-4" /> Drones Active
                    </div>
                    <div className="text-2xl font-bold text-slate-950 dark:text-white font-extrabold">
                      {selectedSector.drones}
                    </div>
                  </div>
                  <div className="bg-slate-200 dark:bg-slate-950 p-4 rounded border border-slate-400 dark:border-slate-800">
                    <div className="text-slate-500 mb-1 flex items-center gap-1">
                      <Zap className="w-4 h-4" /> Amb. Radiation
                    </div>
                    <div className="text-2xl font-bold text-slate-950 dark:text-white font-extrabold">
                      {(100 - selectedSector.load).toFixed(1)} µSv/h
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-cyan-950/30 rounded border border-cyan-900/50 text-slate-700 dark:text-cyan-300 text-xs leading-relaxed">
                  Aegis automated defense matrix is dynamically allocating
                  kinetic dampeners to this region based on localized structural
                  tension.
                </div>
              </div>

              <button
                onClick={handleReroute}
                onMouseEnter={playHover}
                disabled={selectedSector.load === 100}
                className="mt-6 w-full py-4 rounded font-bold font-mono tracking-widest uppercase transition-all flex justify-center items-center gap-2 bg-blue-600 dark:bg-cyan-600 hover:bg-blue-700 dark:hover:bg-cyan-500 text-white dark:text-slate-950 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
              >
                <ArrowRightLeft className="w-5 h-5" />
                {selectedSector.load === 100
                  ? "Surplus Optimized"
                  : "Reroute Shield Surplus"}
              </button>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 font-mono text-center opacity-50">
              <ShieldAlert className="w-16 h-16 mb-4 opacity-50" />
              <p>
                Select a sector from the kinetic topology map to view telemetry
                and deploy surplus shielding.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
