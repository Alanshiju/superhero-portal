import React, { useState } from "react";
import ShieldSimulator from "../components/ShieldSimulator";
import { Beaker, Shield, Activity, Zap, Rocket } from "lucide-react";
import { useSound } from "../context/SoundContext";

export default function Lab() {
  const [powerLevels, setPowerLevels] = useState({
    integrity: 80,
    sensor: 20,
    burst: 60,
  });
  const [stressTestActive, setStressTestActive] = useState(false);

  const { playHover, playAlert } = useSound();

  const handleSlider = (e, type) => {
    setPowerLevels({
      ...powerLevels,
      [type]: parseInt(e.target.value, 10),
    });
  };

  const toggleStressTest = () => {
    playAlert();
    setStressTestActive((prev) => !prev);
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
        <div className="lg:col-span-1 space-y-8 bg-white/80 dark:bg-slate-900/50 backdrop-blur-md p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg">
          <h2 className="font-mono font-bold text-xl text-slate-900 dark:text-white mb-6 uppercase border-b border-slate-200 dark:border-slate-800 pb-2">
            Power Allocation
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm font-mono text-slate-700 dark:text-cyan-400">
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4" /> Kinetic Dampening
              </span>
              <span>{powerLevels.integrity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={powerLevels.integrity}
              onChange={(e) => handleSlider(e, "integrity")}
              onMouseEnter={playHover}
              className="w-full accent-blue-600 dark:accent-cyan-500"
            />
            <p className="text-xs text-slate-500 font-sans">
              Determines particle formation rigidity.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm font-mono text-slate-700 dark:text-emerald-400">
              <span className="flex items-center gap-2">
                <Activity className="w-4 h-4" /> Resonance Frequency
              </span>
              <span>{powerLevels.sensor}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={powerLevels.sensor}
              onChange={(e) => handleSlider(e, "sensor")}
              onMouseEnter={playHover}
              className="w-full accent-emerald-600 dark:accent-emerald-500"
            />
            <p className="text-xs text-slate-500 font-sans">
              Increases ambient particle vibration.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm font-mono text-slate-700 dark:text-amber-400">
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4" /> Field Radius (Burst)
              </span>
              <span>{powerLevels.burst}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={powerLevels.burst}
              onChange={(e) => handleSlider(e, "burst")}
              onMouseEnter={playHover}
              className="w-full accent-amber-600 dark:accent-amber-500"
            />
            <p className="text-xs text-slate-500 font-sans">
              Amplifies shockwave repulsion force.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={toggleStressTest}
              onMouseEnter={playHover}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded uppercase font-bold font-mono transition-all ${
                stressTestActive
                  ? "bg-red-600 hover:bg-red-700 text-white animate-pulse"
                  : "bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white"
              }`}
            >
              <Rocket className="w-5 h-5" />
              {stressTestActive ? "Halt Stress Test" : "Initiate Stress Test"}
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="lg:col-span-3 h-full min-h-[500px]">
          <ShieldSimulator
            powerLevels={powerLevels}
            stressTestActive={stressTestActive}
          />
        </div>
      </div>
    </div>
  );
}
