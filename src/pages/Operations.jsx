import React, { useState, useEffect } from "react";
import { Map, AlertTriangle, ShieldCheck, X } from "lucide-react";

const SECTORS = [
  {
    id: "SEC-1",
    name: "Global Grid Alpha",
    threat: "Low",
    status: "Secure",
    units: 12,
  },
  {
    id: "SEC-4",
    name: "New York Node",
    threat: "Elevated",
    status: "Monitoring",
    units: 8,
  },
  {
    id: "SEC-7",
    name: "Thrissur Division",
    threat: "High",
    status: "Intercepting",
    units: 24,
  },
  {
    id: "SEC-12",
    name: "Kochi Port",
    threat: "Critical",
    status: "Lockdown",
    units: 36,
  },
  {
    id: "SEC-15",
    name: "London Central",
    threat: "Low",
    status: "Secure",
    units: 14,
  },
  {
    id: "SEC-22",
    name: "Tokyo Ward",
    threat: "Elevated",
    status: "Monitoring",
    units: 10,
  },
];

const ALERTS = [
  "INCOMING: Anomalous energy spike detected in SEC-12.",
  "UPDATE: Aegis Intercept Team deployed to SEC-7.",
  "ALL CLEAR: SEC-1 Threat neutralized.",
  "WARNING: Kinetic fluctuations in SEC-4.",
  "SYSTEM: Global shield integrity at 99.8%.",
];

export default function Operations() {
  const [selectedSector, setSelectedSector] = useState(null);
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAlertIndex((prev) => (prev + 1) % ALERTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 w-full">
      <div className="flex items-center gap-3 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
        <Map className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
        <h1 className="text-3xl font-bold font-mono text-slate-900 dark:text-white uppercase">
          Defense Grid
        </h1>
      </div>

      {/* Threat Alert Ticker */}
      <div className="bg-slate-900 text-cyan-400 p-3 rounded-lg flex items-center gap-4 mb-8 font-mono text-sm border border-cyan-900 overflow-hidden shadow-lg">
        <AlertTriangle className="h-5 w-5 text-yellow-500 animate-pulse shrink-0" />
        <div className="font-bold shrink-0 text-white">LIVE ALERT:</div>
        <div className="animate-[pulse_2s_ease-in-out_infinite] truncate">
          {ALERTS[currentAlertIndex]}
        </div>
      </div>

      {/* Interactive Sector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SECTORS.map((sector) => (
          <div
            key={sector.id}
            onClick={() => setSelectedSector(sector)}
            className="bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-6 rounded-xl cursor-pointer hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all group relative overflow-hidden"
          >
            {sector.threat === "Critical" && (
              <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-pulse"></div>
            )}

            <h3 className="text-xl font-bold font-mono text-slate-900 dark:text-white mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              {sector.id}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-4 font-sans">
              {sector.name}
            </p>

            <div className="flex justify-between items-center text-sm font-mono">
              <span
                className={`px-2 py-1 rounded font-bold ${
                  sector.threat === "Low"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : sector.threat === "Elevated"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                }`}
              >
                {sector.threat}
              </span>
              <span className="text-slate-600 dark:text-slate-300 flex items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-cyan-500" />{" "}
                {sector.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedSector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-cyan-900 max-w-md w-full rounded-xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedSector(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="p-6 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
                {selectedSector.id}
              </h2>
              <p className="text-slate-500 dark:text-cyan-600">
                {selectedSector.name}
              </p>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-slate-600 dark:text-slate-400 font-mono text-sm uppercase">
                  Threat Level
                </span>
                <span
                  className={`font-bold font-mono ${
                    selectedSector.threat === "Critical" ||
                    selectedSector.threat === "High"
                      ? "text-red-500"
                      : selectedSector.threat === "Elevated"
                        ? "text-yellow-500"
                        : "text-green-500"
                  }`}
                >
                  {selectedSector.threat}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-slate-600 dark:text-slate-400 font-mono text-sm uppercase">
                  Status
                </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {selectedSector.status}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2">
                <span className="text-slate-600 dark:text-slate-400 font-mono text-sm uppercase">
                  Aegis Units Active
                </span>
                <span className="font-bold text-cyan-600 dark:text-cyan-400 font-mono">
                  {selectedSector.units}
                </span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-950 flex justify-end">
              <button
                onClick={() => setSelectedSector(null)}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded font-mono uppercase text-sm font-bold transition-colors"
              >
                Close Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
