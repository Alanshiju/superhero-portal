import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import ThreatRadar from "../components/ThreatRadar";
import { Scan, AlertTriangle, ShieldCheck } from "lucide-react";

function SurveillanceTerminal() {
  const [lines, setLines] = useState([]);
  const [isScanning, setIsScanning] = useState(true);

  const scanSequence = [
    "INITIATING KINETIC SWEEP...",
    "HANDSHAKE PROTOCOL: SECURE.",
    "SCANNING VISITOR HARDWARE...",
    "CPU: NOMINAL | GPU TEMPS: STABLE.",
    "ISOLATING BIOMETRIC SIGNATURE...",
    "THREAT LEVEL: CIVILIAN.",
    "AEGIS: 'I see you. You are safe here. State your emergency.'",
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < scanSequence.length) {
        setLines((prev) => [...prev, scanSequence[currentLine]]);
        currentLine++;
      } else {
        setIsScanning(false);
        clearInterval(interval);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white/90 dark:bg-slate-950/80 border border-slate-300 dark:border-cyan-900/50 p-6 rounded-xl font-mono text-sm shadow-xl dark:shadow-[0_0_20px_rgba(6,182,212,0.1)] backdrop-blur-md relative overflow-hidden transition-colors h-full flex flex-col">
      {isScanning && (
        <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/50 dark:bg-cyan-500/50 shadow-[0_0_10px_rgba(59,130,246,1)] dark:shadow-[0_0_10px_rgba(6,182,212,1)] animate-[scan_2s_ease-in-out_infinite]" />
      )}

      <div className="flex items-center gap-2 mb-4 text-blue-700 dark:text-cyan-500 border-b border-slate-200 dark:border-cyan-900/50 pb-2">
        <Scan className={`w-5 h-5 ${isScanning ? "animate-spin" : ""}`} />
        <span className="font-bold tracking-widest uppercase">
          Live Surveillance Feed
        </span>
      </div>

      <div className="space-y-2 text-slate-800 dark:text-cyan-400 flex-1">
        {lines.map((line, idx) => (
          <div key={idx} className="flex gap-2">
            <span className="text-slate-400 dark:text-slate-600">&gt;</span>
            <span
              className={
                idx === scanSequence.length - 1
                  ? "text-emerald-600 dark:text-emerald-400 font-bold"
                  : ""
              }
            >
              {line}
            </span>
          </div>
        ))}
        {isScanning && (
          <span className="animate-pulse inline-block w-2 h-4 bg-blue-600 dark:bg-cyan-500 ml-2" />
        )}
      </div>

      {!isScanning && (
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 animate-in fade-in zoom-in duration-500">
          <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-500 animate-pulse" />
          <Link
            to="/dispatch"
            className="flex-1 text-center bg-blue-600 dark:bg-cyan-600 hover:bg-blue-700 dark:hover:bg-cyan-500 text-white dark:text-slate-950 font-bold px-6 py-3 rounded uppercase tracking-widest transition-all hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] dark:hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]"
          >
            Enter Dispatch Terminal
          </Link>
        </div>
      )}
    </div>
  );
}

function IncidentLog() {
  const logs = [
    {
      id: "AEG-102",
      sector: "Sector 7",
      issue: "Bridge Collapse",
      status: "RESOLVED",
      time: "04:00 PST",
    },
    {
      id: "AEG-404",
      sector: "Sector 3",
      issue: "Energy Overload",
      status: "RESOLVED",
      time: "09:12 EST",
    },
    {
      id: "AEG-999",
      sector: "Sector 12",
      issue: "Kinetic Anomaly",
      status: "CONTAINED",
      time: "22:45 UTC",
    },
  ];

  return (
    <div className="mt-12 mb-8">
      <h2 className="text-2xl font-bold font-mono text-slate-800 dark:text-white mb-6 flex items-center gap-2">
        <ShieldCheck className="text-cyan-500" /> Recent Interventions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {logs.map((log) => (
          <div
            key={log.id}
            className="bg-white/80 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">
                {log.id}
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-bold ${log.status === "RESOLVED" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"}`}
              >
                {log.status}
              </span>
            </div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100">
              {log.issue}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {log.sector} • {log.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="w-full text-slate-900 dark:text-white pb-20">
      <HeroSection />

      <div className="max-w-6xl mx-auto px-4 mt-8" id="surveillance-zone">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          <div className="md:col-span-2">
            <SurveillanceTerminal />
          </div>
          <div className="md:col-span-1 h-full">
            <ThreatRadar />
          </div>
        </div>

        <IncidentLog />
      </div>
    </div>
  );
}
