import React, { useState } from "react";
import ShieldSimulator from "../components/ShieldSimulator";
import { Beaker, Shield, Activity, Zap, Server } from "lucide-react";
import { useSound } from "../context/SoundContext";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";

export default function Lab() {
  const [powerLevels, setPowerLevels] = useState({
    integrity: 80,
    sensor: 20,
    burst: 60,
  });
  const [stressTestActive, setStressTestActive] = useState(false);

  const { playHover, playAlert } = useSound();
  const { theme } = useTheme();

  const handleSlider = (e, type) => {
    setPowerLevels({
      ...powerLevels,
      [type]: parseInt(e.target.value, 10),
    });
  };

  const triggerStressTest = () => {
    playAlert();
    setStressTestActive(true);
    toast.warning(
      "OVERLOAD SEQUENCE INITIATED: 10 SECONDS TO CONTAINMENT BREACH.",
      { theme },
    );

    setTimeout(() => {
      setStressTestActive(false);
      toast.success("STRESS TEST CONCLUDED: KINETIC SHIELD HOLDING.", {
        theme,
      });
    }, 10000);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 zoom-in-95 duration-700 ease-out max-w-7xl mx-auto px-4 py-8 w-full min-h-[calc(100vh-100px)] flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-slate-300 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Beaker className="h-6 w-6 text-emerald-600 dark:text-emerald-500 font-bold font-mono" />
            <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white uppercase tracking-tight">
              R&D Test Bench
            </h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-mono text-[10px] tracking-widest uppercase">
            OSCILLOSCOPE BAY // KINETIC CONTAINMENT SIMULATION
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        {/* Left: Interactive Canvas Frame */}
        <div className="lg:col-span-8 bg-slate-50/80 dark:bg-[#0d1117]/80 backdrop-blur-md border border-slate-300 dark:border-slate-800/80 rounded-sm p-4 relative min-h-[500px] flex flex-col">
          <div className="absolute top-2 left-2 right-2 flex justify-between px-2 text-[8px] font-mono text-slate-400 uppercase tracking-widest pointer-events-none">
            <span>[ OSCILLATOR: ONLINE ]</span>
            <span>FREQ: 14.2 GHz</span>
          </div>

          <div className="flex-1 relative border-2 border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-black/50 mt-4 overflow-hidden shadow-inner">
            {/* Measurement Ticks (Oscilloscope UI) */}
            <div className="absolute left-0 top-0 bottom-0 w-8 border-r border-slate-300 dark:border-slate-800 flex flex-col justify-between py-4 items-end pr-1 opacity-50 z-20 pointer-events-none">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="flex items-center gap-1">
                  <span className="text-[6px] font-mono text-emerald-600 dark:text-emerald-500">
                    {100 - i * 12}
                  </span>
                  <div className="w-2 h-px bg-emerald-500"></div>
                </div>
              ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-8 border-t border-slate-300 dark:border-slate-800 flex justify-between px-10 items-start pt-1 opacity-50 z-20 pointer-events-none">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="h-2 w-px bg-emerald-500"></div>
                  <span className="text-[6px] font-mono text-emerald-600 dark:text-emerald-500">
                    {i * 10}ms
                  </span>
                </div>
              ))}
            </div>

            <div className="absolute inset-0 z-10">
              <ShieldSimulator
                powerLevels={powerLevels}
                isStressing={stressTestActive}
              />
            </div>
          </div>
        </div>

        {/* Right: Power Allocation Controls */}
        <div className="lg:col-span-4 bg-slate-50/80 dark:bg-[#0d1117]/80 backdrop-blur-md border border-slate-300 dark:border-slate-800/80 rounded-sm p-6 flex flex-col min-h-[500px]">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white font-mono uppercase tracking-widest flex items-center gap-2 border-b border-slate-300 dark:border-slate-800 pb-3 mb-6">
            <Server className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
            Parameter Calibration
          </h2>

          <div className="space-y-8 flex-1 font-mono text-xs uppercase tracking-widest">
            {/* Range Slider 1 */}
            <div>
              <div className="flex justify-between text-slate-500 mb-4">
                <span className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-emerald-500" /> Shield
                  Integrity
                </span>
                <span className="text-slate-900 dark:text-white font-bold bg-slate-200 dark:bg-slate-900 px-2 py-0.5 border border-slate-300 dark:border-slate-700">
                  {powerLevels.integrity}.00
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={powerLevels.integrity}
                onChange={(e) => handleSlider(e, "integrity")}
                className="w-full h-1 bg-slate-300 dark:bg-slate-800 rounded-none appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between mt-1 text-[8px] text-slate-400">
                <span>0</span>
                <span>|</span>
                <span>50</span>
                <span>|</span>
                <span>100</span>
              </div>
            </div>

            {/* Range Slider 2 */}
            <div>
              <div className="flex justify-between text-slate-500 mb-4">
                <span className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-sky-500" /> Sensor
                  Radius
                </span>
                <span className="text-slate-900 dark:text-white font-bold bg-slate-200 dark:bg-slate-900 px-2 py-0.5 border border-slate-300 dark:border-slate-700">
                  {powerLevels.sensor}.00
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={powerLevels.sensor}
                onChange={(e) => handleSlider(e, "sensor")}
                className="w-full h-1 bg-slate-300 dark:bg-slate-800 rounded-none appearance-none cursor-pointer accent-sky-500"
              />
              <div className="flex justify-between mt-1 text-[8px] text-slate-400">
                <span>0</span>
                <span>|</span>
                <span>50</span>
                <span>|</span>
                <span>100</span>
              </div>
            </div>

            {/* Range Slider 3 */}
            <div>
              <div className="flex justify-between text-slate-500 mb-4">
                <span className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-amber-500" /> Kinetic Burst
                  Yield
                </span>
                <span className="text-slate-900 dark:text-white font-bold bg-slate-200 dark:bg-slate-900 px-2 py-0.5 border border-slate-300 dark:border-slate-700">
                  {powerLevels.burst}.00
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={powerLevels.burst}
                onChange={(e) => handleSlider(e, "burst")}
                className="w-full h-1 bg-slate-300 dark:bg-slate-800 rounded-none appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between mt-1 text-[8px] text-slate-400">
                <span>0</span>
                <span>|</span>
                <span>50</span>
                <span>|</span>
                <span>100</span>
              </div>
            </div>
          </div>

          <button
            onClick={triggerStressTest}
            onMouseEnter={playHover}
            disabled={stressTestActive}
            className={`w-full py-4 rounded-sm font-bold font-mono tracking-widest uppercase transition-all flex justify-center items-center gap-2 border ${
              stressTestActive
                ? "bg-red-500/10 text-red-600 dark:text-red-500 border-red-500 cursor-not-allowed animate-pulse"
                : "bg-red-600 hover:bg-red-700 text-white dark:text-slate-950 border-red-600"
            }`}
          >
            <Zap
              className={`w-4 h-4 ${stressTestActive ? "animate-bounce" : ""}`}
            />
            {stressTestActive ? "CRITICAL LOAD..." : "INITIATE STRESS TEST"}
          </button>
        </div>
      </div>
    </div>
  );
}
