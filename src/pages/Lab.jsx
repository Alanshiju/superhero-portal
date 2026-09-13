import React, { useState } from "react";
import ShieldSimulator from "../components/ShieldSimulator";
import { Beaker, Shield, Activity, Zap } from "lucide-react";

export default function Lab() {
  const [powerLevels, setPowerLevels] = useState({
    integrity: 80,
    sensor: 20,
    burst: 60,
  });

  const handleSlider = (e, type) => {
    setPowerLevels({
      ...powerLevels,
      [type]: parseInt(e.target.value, 10),
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 w-full">
      <div className="flex items-center gap-3 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
        <Beaker className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
        <h1 className="text-3xl font-bold font-mono text-slate-900 dark:text-white uppercase">
          Interactive Lab
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-8 bg-white/80 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg">
          <h2 className="font-mono font-bold text-xl text-slate-900 dark:text-white mb-6 uppercase border-b border-slate-200 dark:border-slate-800 pb-2">
            Power Allocation
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm font-mono text-slate-700 dark:text-cyan-400">
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4" /> Shield Integrity
              </span>
              <span>{powerLevels.integrity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={powerLevels.integrity}
              onChange={(e) => handleSlider(e, "integrity")}
              className="w-full accent-blue-600 dark:accent-cyan-500"
            />
            <p className="text-xs text-slate-500 font-sans">
              Determines particle formation rigidity.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm font-mono text-slate-700 dark:text-emerald-400">
              <span className="flex items-center gap-2">
                <Activity className="w-4 h-4" /> Sensor Sweep
              </span>
              <span>{powerLevels.sensor}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={powerLevels.sensor}
              onChange={(e) => handleSlider(e, "sensor")}
              className="w-full accent-emerald-600 dark:accent-emerald-500"
            />
            <p className="text-xs text-slate-500 font-sans">
              Increases ambient particle vibration.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm font-mono text-slate-700 dark:text-amber-400">
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4" /> Kinetic Burst
              </span>
              <span>{powerLevels.burst}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={powerLevels.burst}
              onChange={(e) => handleSlider(e, "burst")}
              className="w-full accent-amber-600 dark:accent-amber-500"
            />
            <p className="text-xs text-slate-500 font-sans">
              Amplifies shockwave repulsion force.
            </p>
          </div>
        </div>

        {/* Canvas */}
        <div className="lg:col-span-3 h-full min-h-[500px]">
          <ShieldSimulator powerLevels={powerLevels} />
        </div>
      </div>
    </div>
  );
}
